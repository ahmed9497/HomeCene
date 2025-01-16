import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import * as admin from "firebase-admin";


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
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch (err) {
    console.error("Error reading raw body:", err);
    return NextResponse.json({ error: "Error reading raw body" }, { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err:any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  // console.log("Stripe Event:", event);

  // Handle the event (example: payment_intent.succeeded)
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.log("PaymentIntent was successful:", paymentIntent);

    const orderDetails = {
      userId: paymentIntent.metadata?.userId || "unknown", // Extract from metadata
      items: JSON.parse(paymentIntent.metadata?.orderDetails || "[]"), // Parse items from metadata
      total: paymentIntent.amount_received / 100, // Convert cents to currency
      status: "paid",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      ...paymentIntent.metadata
    };

    console.log("Order Details:", orderDetails);
    try {
      await db.collection("orders").add(orderDetails);
      console.log("Order saved successfully to Firestore.");
    } catch (err:any) {
      console.error("Error saving order to Firestore:", err.message);
      return NextResponse.json(
        { error: "Error saving order to Firestore" },
        { status: 500 }
      );
    }
    
  }


  return NextResponse.json({ received: true }, { status: 200 });
}
