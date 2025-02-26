import { NextResponse } from "next/server";
import * as admin from "firebase-admin";

const shippingCharges = process.env.NEXT_PUBLIC_SHIPPING_CHARGES;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TABBY = process.env.TABBY_SECRET_KEY;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS!)
    ),
  });
}

const db = admin.firestore();

export async function POST(req: Request) {
  const {
    amount,
    currency,
    buyer,
    products,
    items,
    data,
    totalAmount: totalOrderAmount,
    selectedMethod,
    // buyer_history,order_history,
    shipping_address
  } = await req.json();

  try {




      // Fetch last 10 orders of the user
      const ordersRef = db.collection("orders");
      const ordersSnapshot = await ordersRef
        .where("userId", "==", data.userId)
        // .orderBy("createdAt", "desc")
        .limit(10)
        .get();
  
      const orderHistory = ordersSnapshot.docs.map((doc) => {
        const data = doc.data();
        // console.log(data,"---dater")
        const date = new Date(data?.createdAt._seconds * 1000 + data?.createdAt._nanoseconds / 1e6);
      const isoString = date.toISOString();
        return {
          purchased_at: isoString || "",
          amount: `${data.totalAmount/100}.00`,
          payment_method: data.paymentMethod || "card",
          status: data.status || "completed",
          buyer: {
            email: data?.email || "",
            phone: data?.phone || "",
            name: data?.name || "",
          },
          shipping_address: {
            city: data.state || "",
            address: data?.address || "",
            zip: data?.zip || "",
          },
          items: data.orderDetails.map((i:any) => ({
            title: i.title,
            category: i?.category || "",
            quantity: i.quantity,
            unit_price: i.unit_amount/100,
          })),
        };
      });
  
      const loyalityLevel = orderHistory.filter(i=>i.status === "paid").length;
      // Fetch buyer details
      const userRef = db.collection("users").doc(data.userId);
      const userSnapshot = await userRef.get();
  
      
  
      const userData = userSnapshot.data();
      // console.log(userData)
      const date = new Date(userData?.createdAt._seconds * 1000 + userData?.createdAt._nanoseconds / 1e6);
      const isoString = date.toISOString();
      const buyerHistory = {
        registered_since: isoString || new Date().toISOString(),
        loyalty_level: loyalityLevel || 0,
        wishlist_count: 0,
        is_social_networks_connected: false,
        is_phone_number_verified: true,
        is_email_verified: true,
      };
  
     

      // console.log(orderHistory,"Order History")
      // console.log(buyerHistory,"Buyer History")
      // console.log(loyalityLevel,"loyal level")








    // console.log( "amount" ,amount + (totalOrderAmount < 100 ? shippingCharges : 0 ),)
    const response = await fetch("https://api.tabby.ai/api/v2/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TABBY}`, // Replace with your Tabby Secret Key
      },
      body: JSON.stringify({
        payment: {
          amount:amount + (totalOrderAmount < 100 ? parseInt(shippingCharges!) : 0 ),
          currency,
          description: "Your order description",
          buyer,
          buyer_history:buyerHistory,
          order_history:orderHistory,
          shipping_address,
          order: {
            shipping_amount: totalOrderAmount < 100 ? shippingCharges : 0,
            reference_id: `order-${Date.now()}`,
            items: products,
          },
          // capture: true,
        },
        
        merchant_code: "HCHARE",
        lang: "en",
        merchant_urls: {
          success: `${BASE_URL}/success`,
          cancel: `${BASE_URL}/checkout?cancel=true`,
          failure: `${BASE_URL}/checkout`,
        },
      }),
    });
    const res = await response.json();
    console.log(res, "****");
    if (res.status === "created") {
      let productItems = items.map((item: any) => ({
        title: item.title,
        size: item?.selectedSize || "",
        feature: item?.selectedFeature || "",
        color: item?.selectedColor || "",
        quantity: item.quantity,
        // description: item?.description,
        images: item?.image,
        unit_amount: Math.round(parseFloat(item.price) * 100), // Full Price
        half_amount:
          selectedMethod === "cod"
            ? Math.round(parseFloat(item.price) * 100 * 0.5)
            : Math.round(parseFloat(item.price) * 100), // 50% for COD, 100% for others
        productId: item.id,
      }));

      const totalAmount = productItems.reduce(
        (acc: any, item: any) => acc + item.unit_amount * item.quantity,
        0
      );
      const upfrontAmount =
        selectedMethod === "cod"
          ? productItems.reduce(
              (acc: any, item: any) => acc + item.half_amount * item.quantity,
              0
            ) // 50% for COD
          : productItems.reduce(
              (acc: any, item: any) => acc + item.unit_amount * item.quantity,
              0
            );
      const remainingAmount = totalAmount - upfrontAmount;

      const orderMetadata = {
        ...data,
        status: "pending",
        paymentMethod: selectedMethod,
        orderDetails: productItems,
        totalAmount, // Full Amount
        upfrontAmount, // 100% for other methods
        remainingAmount,
        shippingFee: totalOrderAmount < 100 ? shippingCharges : 0,
        paymentId:res.payment.id,
        orderReference:res.payment.order.reference_id,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };
      const orderRef = db.collection("orders").doc();
      orderMetadata.id = orderRef.id;
      await orderRef.set(orderMetadata);
      return NextResponse.json(res);
    }
    return NextResponse.json(res);
  } catch (error) {
    console.error("Error creating Tabby session:", error);
    return NextResponse.json(
      { error: "Tabby session creation failed" },
      { status: 500 }
    );
  }
}
