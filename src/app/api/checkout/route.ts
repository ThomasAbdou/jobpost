import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_MAP: Record<string, string> = {
  lifetime: process.env.STRIPE_PRICE_LIFETIME!,
  year: process.env.STRIPE_PRICE_YEAR!,
  month: process.env.STRIPE_PRICE_MONTH!,
};

export async function POST(req: NextRequest) {
  try {
    const { planId, email } = await req.json();

    const priceId = PRICE_MAP[planId];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: planId === "lifetime" ? "payment" : "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email || undefined,
      metadata: { planId, email: email ?? "" },
      success_url: `${origin}/quiz/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/quiz`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
