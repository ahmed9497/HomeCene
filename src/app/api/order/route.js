// src/app/api/checkout/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const shippingCharges = process.env.SHIPPING_CHARGES;
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
    ),
  });
}

const db = admin.firestore();


export async function POST(req) {



  try {
    const { items,data,totalAmount } = await req.json(); // Retrieve the cart from the request body

    // const lineItems = [...items.map(item => ({
    //   price_data: {
    //     currency: 'aed',
    //     product_data: {
    //       name: item.title,
    //       description: item?.description,
    //       images: item?.image
    //     },
    //     unit_amount: Math.round(parseFloat(item.price) * 100),
    //   },
    //   quantity: parseInt(item.quantity),
     
    // })),
    // {
    //   price_data: {
    //     currency: 'aed',
    //     product_data: {
    //       name: 'Shipping Charges',
    //       description: 'Flat shipping rate',
    //     },
    //     unit_amount: Math.round(parseFloat(shippingCharges) * 100),
    //   },
    //   quantity: 1,
    // }];


    const orderMetadata = {
      items: items.map(item => ({
        title: item.title,
        size: item?.selectedSize || 'N/A',
        feature: item?.selectedFeature || 'N/A',
        color: item?.selectedColor || 'N/A',
        quantity: item.quantity,
        description: item?.description||"",
        images: item?.image || "",
        unit_amount: Math.round(parseFloat(item.price) * 100),
        productId:item.id
      })),
    };
  

    const orderDetails = {
     
      items: orderMetadata || "[]", // Parse items from metadata
      orderDetails:JSON.stringify(orderMetadata),
      total: totalAmount, // Convert cents to currency
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      ...data
    };

    console.log("Order Details:", orderDetails);
    try {
      await db.collection("orders").add(orderDetails);
      console.log("Order saved successfully to Firestore.");
    } catch (err) {
      console.error("Error saving order to Firestore:", err.message);
      return new Response(JSON.stringify(
        { error: "Error saving order to Firestore" },
        { status: 500 }
      ));
    }


    return new Response(JSON.stringify({ message:'Order placed' }), { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/order:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
