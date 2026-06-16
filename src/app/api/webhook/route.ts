import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Use service-role key here so the webhook can bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.metadata?.email ?? session.customer_email;
    const planId = session.metadata?.planId;
    const customerId =
      typeof session.customer === "string" ? session.customer : null;

    if (email) {
      await supabase
        .from("users")
        .update({
          paid: true,
          plan: planId,
          stripe_customer_id: customerId,
        })
        .eq("email", email);
    }
  }

  return NextResponse.json({ received: true });
}

// Required: disable Next.js body parsing so Stripe signature verification works
export const config = { api: { bodyParser: false } };
