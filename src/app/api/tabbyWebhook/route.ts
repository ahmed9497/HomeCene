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




export async function POST(req: NextRequest) {
  
const data = await req.json();
console.log("__________Tabby____________")
console.log(data)
console.log("__________Tabby____________")
  // return NextResponse.json({ received: true }, { status: 200 });
}
