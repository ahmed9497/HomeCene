import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import * as admin from "firebase-admin";
import { sendConfirmationEmail, sendOrderEmailToAdmins } from "../../lib/sendEmail";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS!)
    ),
  });
}

const db = admin.firestore();

export const config = {
  api: {
    bodyParser: false, // Disable automatic body parsing
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    console.error("Stripe signature header is missing");
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch (err) {
    console.error("Error reading raw body:", err);
    return NextResponse.json(
      { error: "Error reading raw body" },
      { status: 500 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // console.log("Stripe Event:", event);
  let orderDetails: any = {};

  // Handle the event (example: payment_intent.succeeded)
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.log("PaymentIntent was successful:", paymentIntent);

    let orderObj = {
      userId: paymentIntent.metadata?.userId || "unknown", // Extract from metadata
      items: JSON.parse(paymentIntent.metadata?.orderDetails || "[]"), // Parse items from metadata
      total: paymentIntent.amount_received / 100, // Convert cents to currency
      status: "paid",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      ...paymentIntent.metadata,
    };
    orderDetails = { ...orderObj };
    try {
      const orderRef = db.collection("orders").doc();
      orderDetails.id = orderRef.id;
      await orderRef.set(orderDetails);

      console.log("Order Details:", orderDetails);
      console.log("Order saved successfully to Firestore.");

      await sendConfirmationEmail(orderDetails);
      await sendOrderEmailToAdmins(orderDetails);
    } catch (err: any) {
      console.error("Error saving order to Firestore:", err.message);
      return NextResponse.json(
        { error: "Error saving order to Firestore" },
        { status: 500 }
      );
    }
  }
  // if (event.type === "checkout.session.completed") {
  //   const session = event;
  //   console.log("****************");
  //   console.log(session)
  //   console.log(orderDetails)
  //   console.log("****************");
  //   orderDetails.sessionId = event.data.object.id;
  //   // Update the Firestore document
  //   // await db.collection('orders').doc(session.id).update({
  //   //   status: 'paid',
  //   // });
  // }

  return NextResponse.json({ received: true }, { status: 200 });
}
