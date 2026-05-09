import { NextResponse } from "next/server";
import { getSiteUrl, requireEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { normalizeEmail } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { email?: string };
    const email = normalizeEmail(body.email);
    const siteUrl = getSiteUrl();

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: requireEnv("STRIPE_PRICE_ID"),
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      customer_email: email || undefined,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      metadata: {
        email: email || "",
        product: "smc_advanced_pdf",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create checkout session." },
      { status: 500 },
    );
  }
}

