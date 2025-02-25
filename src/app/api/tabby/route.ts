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
    buyer_history,order_history,shipping_address
  } = await req.json();

  try {
    console.log( "amount" ,amount + (totalOrderAmount < 100 ? shippingCharges : 0 ),)
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
          buyer_history,
          order_history,
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
        orderReference:res.payment.order.reference_id
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
