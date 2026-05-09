import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { requireEnv } from "@/lib/env";
import { sendPaidPdfEmail } from "@/lib/email";
import { recordPurchaseFromSession } from "@/lib/purchases";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      signature,
      requireEnv("STRIPE_WEBHOOK_SECRET"),
    );
  } catch {
    return NextResponse.json({ error: "Invalid Stripe webhook signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const purchase = await recordPurchaseFromSession(session);

      if (purchase) {
        await sendPaidPdfEmail(purchase.email, purchase.sessionId);
        await getSupabaseAdmin()
          .from("purchases")
          .update({ paid_pdf_sent: true })
          .eq("stripe_session_id", purchase.sessionId);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook fulfillment failed." },
      { status: 500 },
    );
  }
}

