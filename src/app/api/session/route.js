// src/app/api/checkout/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {

  
  try {
    const { session_id } = await req.json(); // Retrieve the cart from the request body

   

if (!session_id) {
    return res.status(400).json({ error: "Missing session_id" });
  }
  const stripeSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items"],
  });

  

    return new Response(JSON.stringify({ stripeSession: stripeSession }), { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/session:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
