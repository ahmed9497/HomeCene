import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import * as admin from "firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const shippingCharges = process.env.NEXT_PUBLIC_SHIPPING_CHARGES!;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS!)
    ),
  });
}

const db = admin.firestore();
export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: `Method Not Allowed` }, { status: 405 });
  }

  try {
    const {
      paymentIntentId,
      items,
      data,
      totalAmount: totalOrderAmount,
      selectedMethod,
    } = await req.json(); 

    const lineItems = [
      ...items.map((item: any) => ({
        price_data: {
          currency: "aed",
          product_data: {
            name: item.title,
            images: [item?.image],
          },
          unit_amount:
            selectedMethod === "cod"
              ? Math.round(parseFloat(item.price) * 100 * 0.5)
              : Math.round(parseFloat(item.price) * 100),
        },
        quantity: parseInt(item.quantity),
      })),
    ];
    totalOrderAmount < 100 &&
      lineItems.push({
        price_data: {
          currency: "aed",
          product_data: {
            name: "Shipping Charges",
            description: "Flat shipping rate",
          },
          unit_amount: Math.round(parseFloat(shippingCharges) * 100),
        },
        quantity: 1,
      });

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
      orderStatus:'processing',
      orderDetails: productItems,
      totalAmount, // Full Amount
      upfrontAmount, // 100% for other methods
      remainingAmount,
      shippingFee: totalOrderAmount < 100 ? shippingCharges : 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const orderRef = db.collection("orders").doc();
    orderMetadata.id = orderRef.id;
    await orderRef.set(orderMetadata);

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "PaymentIntent ID is required" },
        { status: 400 }
      );
    }
   
    const updatedPaymentIntent = await stripe.paymentIntents.update(
        paymentIntentId,
        {
          amount:totalAmount,
          metadata: {
            orderId: orderRef.id,
            paymentMethod:selectedMethod
          },
        }
      );
  
      console.log("Updated PaymentIntent:", updatedPaymentIntent);

    return NextResponse.json(updatedPaymentIntent,{status:200});
  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
