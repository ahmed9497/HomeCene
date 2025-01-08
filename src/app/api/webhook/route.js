import { buffer } from 'micro';
import * as admin from 'firebase-admin'; // For Firestore
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

// Initialize Firebase Admin
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)),
    })
  : admin.app();

const db = app.firestore();

export const config = {
  api: {
    bodyParser: false, // Disable body parser for Stripe raw body
  },
};

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    // Get raw request body
    const rawBody = await req.text();

    // Verify Stripe signature
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook error:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log(event, "-----event-----");

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // Extract metadata and payment details
    const orderDetails = {
      userId: "2312asd"||paymentIntent.metadata?.userId || 'unknown',
      items: JSON.parse(paymentIntent.metadata?.items || '[]'),
      total: paymentIntent.amount_received / 100, // Stripe stores in cents
      status: 'paid',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    console.log(orderDetails, "orderdetails********");

    // Save order to Firestore
    try {
      await db.collection('orders').add(orderDetails);
      console.log('Order saved successfully');
    } catch (err) {
      console.error('Error saving order to Firestore:', err.message);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }

  // Respond to Stripe
  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
