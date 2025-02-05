import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount, currency, buyer, products } = await req.json();

  try {
    const response = await fetch("https://api.tabby.ai/api/v2/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sk_test_0194abd1-a09c-daac-b768-110e5afd7624`, // Replace with your Tabby Secret Key
      },
      body: JSON.stringify({
        payment: {
          amount,
          currency,
          description: "Your order description",
          buyer,
          order: {
            reference_id: `ORDER-${Date.now()}`,
            items: products,
          },
          capture: true
        },
        merchant_code: "HomeCene Home Decor and Accessories Tradingare",
        lang: "en",
        merchant_urls: {
            "success": "http://localhost:3000/success",
            "cancel": "https://your-store/cancel",
            "failure": "https://your-store/failure"
        }
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating Tabby session:", error);
    return NextResponse.json({ error: "Tabby session creation failed" }, { status: 500 });
  }
}
