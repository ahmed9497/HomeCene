import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import * as admin from "firebase-admin";
import {
  sendConfirmationEmail,
  sendOrderEmailToAdmins,
} from "../../lib/sendEmail";

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
  console.log("__________Tabby____________");
  console.log(data);
  console.log("__________Tabby____________");

  const { id, amount, status } = data; // Get payment details from request

  if (!id || !amount) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }
  if (status === "closed") {
    const paymentRef = db.collection("orders"); // Collection name
    const querySnapshot = await paymentRef.where("paymentId", "==", id).get();
    if (querySnapshot.empty) {
      return NextResponse.json({ received: true }, { status: 400 });
    }
    const firstDoc = querySnapshot.docs[0];
    console.log(firstDoc, "firstDoc");

    await firstDoc.ref.set(
      {
        status: "paid",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        total:amount
      },
      { merge: true }
    );

  
    
    const orderData =  firstDoc.data();
    console.log(orderData,"orderData----")
    if(orderData){

      await sendConfirmationEmail(orderData);
      await sendOrderEmailToAdmins(orderData);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  }

  try {
    const response = await fetch(
      `https://api.tabby.ai/api/v2/payments/${id}/captures`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk_test_0194abd1-a09c-daac-b768-110e5afd7624`, // Replace with your Tabby Secret Key
        },
        body: JSON.stringify({
          amount,
        }),
      }
    );
    const res = await response.json();
    console.log(res, "-----capture-------");

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.log("Error capturing payment:", error);

    return NextResponse.json(
      { error: "Error capturing payment:" },
      { status: 500 }
    );
  }

  // return NextResponse.json({ received: true }, { status: 200 });
}
