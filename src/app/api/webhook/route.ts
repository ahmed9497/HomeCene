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

  console.log("Stripe Event:", event);


  // Handle the event (example: payment_intent.succeeded)
  // if (event.type === "payment_intent.succeeded") {
  //  console.log('Payment--Intent' ,event.data.object)
  // }
  if (event.type === "checkout.session.completed") {
    
    
    // console.log(event.data.object.metadata,"****************");
    
    // Update the Firestore document
    // await db.collection('orders').doc(session.id).update({
    //   status: 'paid',
    // });

    const paymentIntent = event.data.object;
    // console.log("PaymentIntent was successful:", event);
    
    try {
      if (typeof paymentIntent.payment_intent === "string") {
        const retrieve = await stripe.paymentIntents.retrieve(paymentIntent.payment_intent, {
          expand: ["charges"],
        });
        // console.log(retrieve,"Reterive------")
        const latestChargeId:any = retrieve.latest_charge ; 
        const charge = await stripe.charges.retrieve(latestChargeId);
        // console.log(charge)

        const orderId:any =paymentIntent.metadata?.orderId ;
       
        console.log( paymentIntent.metadata)
        console.log(paymentIntent.metadata?.paymentMethod,"***********")

        // userId: paymentIntent.metadata?.userId || "unknown", // Extract from metadata
        // items: JSON.parse(paymentIntent.metadata?.orderDetails || "[]"), // Parse items from metadata
        // items: JSON.parse(existingData?.orderDetails) ,
        let orderObj:any = {
          total: paymentIntent.amount_total! / 100, // Convert cents to currency
          status: (paymentIntent.payment_status === "paid" && paymentIntent.metadata?.paymentMethod ==='cod') ? "partial" : paymentIntent.payment_status,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          // ...paymentIntent.metadata,
          paymentIntentId:paymentIntent.payment_intent,
          sessionId:paymentIntent.id,
          receiptUrl: charge.receipt_url,
          last4:charge.payment_method_details?.card?.last4,
          brand:charge.payment_method_details?.card?.brand
        };
       
        console.log(orderId,"orderID")
        console.log(orderObj,"orderObj")

        await db.collection("orders").doc(orderId).set(orderObj,{merge:true})
        const order =await db.collection("orders").doc(orderId);
        const existingOrder = await order.get();
        
        const orderData =  existingOrder.data();
        console.log(orderData,"orderData----")
        if(orderData){

          await sendConfirmationEmail(orderData);
          await sendOrderEmailToAdmins(orderData);
        }
        // await db.collection("orders").doc(paymentIntent.payment_intent).set(orderObj);
      }

      
      // const orderRef = db.collection("orders").doc();
      // orderObj.id = orderRef.id;
      // await orderRef.set(orderObj);

      // console.log("Order Details:", orderDetails);
      console.log("Order saved successfully to Firestore.");

     
    } catch (err: any) {
      console.error("Error saving order to Firestore:", err.message);
      return NextResponse.json(
        { error: "Error saving order to Firestore" },
        { status: 500 }
      );
    }

  }
  if (event.type === 'checkout.session.async_payment_failed') {
    const session = event.data.object;
    console.log(session,"------------")
    // const orderId = session.metadata.orderId;
  
    // // Delete the order if payment failed
    // await db.collection("orders").doc(orderId).delete();
  
    // res.status(200).send({ received: true });
  }


  return NextResponse.json({ received: true }, { status: 200 });
}
