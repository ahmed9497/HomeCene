import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();
    console.log(amount ," ------------")


    const paymentIntents = await stripe.paymentIntents.list({
      limit: 1, // Get the latest payment intent
    });
    
    const lastPaymentIntent = paymentIntents?.data[0];
    
    if (lastPaymentIntent && lastPaymentIntent.status === "requires_payment_method") {
      // Reuse this payment intent ID
      console.log("Reusing PaymentIntent ID:", lastPaymentIntent.id);
      return NextResponse.json({ clientSecret: lastPaymentIntent.client_secret,paymentIntentId :lastPaymentIntent.id  });
    } else {


    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "aed",
      automatic_payment_methods: { enabled: true },
      
    });


return NextResponse.json({ clientSecret: paymentIntent.client_secret,paymentIntentId :paymentIntent.id  });
  }
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}