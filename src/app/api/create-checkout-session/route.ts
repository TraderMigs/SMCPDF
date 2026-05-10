import { NextResponse } from "next/server";
import { getSiteUrl, requireEnv } from "@/lib/env";
import { isPaidOfferEnabled } from "@/lib/offer-flags";
import { createStripeCheckoutSession } from "@/lib/stripe";
import { normalizeEmail } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    if (!isPaidOfferEnabled()) {
      return NextResponse.json(
        { error: "This offer is not available yet." },
        { status: 403 },
      );
    }

    const body = (await request.json().catch(() => ({}))) as { email?: string };
    const email = normalizeEmail(body.email);
    const siteUrl = getSiteUrl();

    const session = await createStripeCheckoutSession({
      priceId: requireEnv("STRIPE_PRICE_ID"),
      email,
      successUrl: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${siteUrl}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create checkout session." },
      { status: 500 },
    );
  }
}
