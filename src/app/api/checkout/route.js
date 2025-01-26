// src/app/api/checkout/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const shippingCharges = process.env.NEXT_PUBLIC_SHIPPING_CHARGES;

export async function POST(req) {
console.log(shippingCharges,"shippingCharges---------")
  const host = req.headers.get("host");
  const protocol = req.headers.get('x-forwarded-proto') || req.protocol;
  const baseUrl = `${protocol}://${host}`;

  try {
    const { items,data,totalAmount } = await req.json(); // Retrieve the cart from the request body
console.log(items)
    const lineItems = [...items.map(item => ({
      price_data: {
        currency: 'aed',
        product_data: {
          name: item.title,
          description: item?.description,
          images: [item?.image]
        },
        unit_amount: Math.round(parseFloat(item.price) * 100),
      },
      quantity: parseInt(item.quantity),
     
    })),
    ];
     totalAmount <100 &&lineItems.push({
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


    const orderMetadata = {
      items: items.map(item => ({
        title: item.title,
        size: item?.selectedSize || 'N/A',
        feature: item?.selectedFeature || 'N/A',
        color: item?.selectedColor || 'N/A',
        quantity: item.quantity,
        description: item?.description,
        images: item?.image,
        unit_amount: Math.round(parseFloat(item.price) * 100),
        productId:item.id
      })),
    };
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: data.email,
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email:data.email,
      payment_intent_data: {
        metadata: {
         ...data,
         orderDetails:JSON.stringify(orderMetadata),
        },
      },
     
    });
    console.log('Created session metadata:', session.metadata);

    // // Retrieve the session to validate metadata
    // const retrievedSession = await stripe.checkout.sessions.retrieve(session.id);
    // console.log('Retrieved session metadata:', retrievedSession);

    // Check the associated paymentIntent metadata
    // if (retrievedSession.payment_intent) {
    //   const paymentIntent = await stripe.paymentIntents.retrieve(retrievedSession.payment_intent);
    //   console.log('PaymentIntent metadata:', paymentIntent.metadata);
    // }

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/checkout:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
