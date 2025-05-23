import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import * as admin from "firebase-admin";
import {
  sendConfirmationEmail,
  sendOrderEmailToAdmins,
} from "../../lib/sendEmail";


const TABBY = process.env.TABBY_SECRET_KEY;
// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS!)
    ),
  });
}

const db = admin.firestore();

export async function POST(req: Request) {
  const data = await req.json();
  console.log("__________Tabby____________");
  console.log(data);
  console.log("__________Tabby____________");

  const { id, amount, status,captures } = data; // Get payment details from request

  if (!id || !amount) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }
  if (status.toLowerCase() === "closed") {
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

  
    
    let orderData =  firstDoc.data();
    console.log(orderData,"orderData----")
    if(orderData){
      orderData.total = amount;
      await sendConfirmationEmail(orderData);
      await sendOrderEmailToAdmins(orderData);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  }
 
  try {
    if(status === 'authorized' && captures === null){
    const response = await fetch(
      `https://api.tabby.ai/api/v2/payments/${id}/captures`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TABBY}`, // Replace with your Tabby Secret Key
        },
        body: JSON.stringify({
          amount:amount,
        }),
      }
    );
    const res = await response.json();
    console.log(res, "-----capture-------");
  }
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
