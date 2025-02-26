// src/app/api/checkout/route.js
import Stripe from 'stripe';
import * as admin from "firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const shippingCharges = process.env.NEXT_PUBLIC_SHIPPING_CHARGES;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
    ),
  });
}

const db = admin.firestore();

export async function POST(req) {

  const host = req.headers.get("host");
  const protocol = req.headers.get('x-forwarded-proto') || req.protocol;
  const baseUrl = `${protocol}://${host}`;

  try {
    const { items, data, totalAmount:totalOrderAmount, selectedMethod } = await req.json(); // Retrieve the cart from the request body

    const lineItems = [...items.map(item => ({
      price_data: {
        currency: 'aed',
        product_data: {
          name: item.title,
          images: [item?.image]
        },
        unit_amount: selectedMethod === "cod" ? Math.round(parseFloat(item.price) * 100 * 0.5) : Math.round(parseFloat(item.price) * 100), 
      },
      quantity: parseInt(item.quantity),

    })),
    ];
    totalOrderAmount < 100 && lineItems.push({
      price_data: {
        currency: 'aed',
        product_data: {
          name: 'Shipping Charges',
          description: 'Flat shipping rate',
        },
        unit_amount: Math.round(parseFloat(shippingCharges) * 100),
      },
      quantity: 1,
    });

    let productItems = items.map(item => ({
      title: item.title,
      size: item?.selectedSize || '',
      feature: item?.selectedFeature || '',
      color: item?.selectedColor || '',
      quantity: item.quantity,
      // description: item?.description,
      images: item?.image,
      unit_amount: Math.round(parseFloat(item.price) * 100), // Full Price
      half_amount: selectedMethod === "cod" ? Math.round(parseFloat(item.price) * 100 * 0.5) : Math.round(parseFloat(item.price) * 100), // 50% for COD, 100% for others
      productId: item.id
    }));

    const totalAmount = productItems.reduce((acc, item) => acc + item.unit_amount * item.quantity, 0);
    const  upfrontAmount = selectedMethod === "cod"
    ? productItems.reduce((acc, item) => acc + item.half_amount * item.quantity, 0) // 50% for COD
    : productItems.reduce((acc, item) => acc + item.unit_amount * item.quantity, 0);
    const remainingAmount = totalAmount - upfrontAmount ;

    const orderMetadata = {
      ...data,
      status: 'pending',
      paymentMethod: selectedMethod,
      orderDetails: productItems,
      totalAmount,// Full Amount
      upfrontAmount,// 100% for other methods
      remainingAmount,
      shippingFee: totalOrderAmount < 100 ? shippingCharges : 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const orderRef = db.collection("orders").doc();
    orderMetadata.id = orderRef.id;
    await orderRef.set(orderMetadata);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: data.email,
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: data.email,
      metadata: {
        // ...data,
        orderId: orderRef.id,
        paymentMethod:selectedMethod
        // orderDetails:JSON.stringify(orderMetadata),
      },
      payment_intent_data: {
        metadata: {
          //  ...data,
          paymentMethod:selectedMethod,
          orderId: orderRef.id
          //  orderDetails:JSON.stringify(orderMetadata),
        },
      },

    });


    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/checkout:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
