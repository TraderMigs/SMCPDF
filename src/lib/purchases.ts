import type Stripe from "stripe";
import { retrieveStripeCheckoutSession } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";

export type VerifiedPurchase = {
  email: string;
  sessionId: string;
};

export async function recordPurchaseFromSession(session: Stripe.Checkout.Session) {
  const email =
    session.customer_details?.email ||
    session.customer_email ||
    session.metadata?.email ||
    "";

  if (!email || session.payment_status !== "paid") {
    return null;
  }

  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id || null;
  const customer =
    typeof session.customer === "string" ? session.customer : session.customer?.id || null;

  const { error } = await getSupabaseAdmin().from("purchases").upsert(
    {
      email: email.toLowerCase(),
      stripe_customer_id: customer,
      stripe_session_id: session.id,
      stripe_payment_intent_id: paymentIntent,
      amount: session.amount_total || 3700,
      currency: session.currency || "usd",
      product: "smc_advanced_pdf",
      status: session.payment_status,
    },
    {
      onConflict: "stripe_session_id",
    },
  );

  if (error) {
    throw new Error(error.message);
  }

  return { email: email.toLowerCase(), sessionId: session.id };
}

export async function verifyPaidPurchase(sessionId: string | null) {
  if (!sessionId) {
    return null;
  }

  const { data } = await getSupabaseAdmin()
    .from("purchases")
    .select("email, stripe_session_id, status")
    .eq("stripe_session_id", sessionId)
    .eq("status", "paid")
    .maybeSingle();

  if (data) {
    return {
      email: data.email,
      sessionId: data.stripe_session_id,
    } satisfies VerifiedPurchase;
  }

  const session = await retrieveStripeCheckoutSession(sessionId);

  if (session.payment_status !== "paid") {
    return null;
  }

  return recordPurchaseFromSession(session);
}
