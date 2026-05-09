import Stripe from "stripe";
import { requireEnv } from "@/lib/env";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(requireEnv("STRIPE_SECRET_KEY"), {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    });
  }

  return stripeClient;
}

export async function createStripeCheckoutSession(params: {
  priceId: string;
  email: string | null;
  successUrl: string;
  cancelUrl: string;
}) {
  const body = new URLSearchParams({
    mode: "payment",
    "payment_method_types[0]": "card",
    "line_items[0][price]": params.priceId,
    "line_items[0][quantity]": "1",
    allow_promotion_codes: "true",
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    "metadata[email]": params.email || "",
    "metadata[product]": "smc_advanced_pdf",
  });

  if (params.email) {
    body.set("customer_email", params.email);
  }

  return stripeRequest<Stripe.Checkout.Session>("/v1/checkout/sessions", {
    method: "POST",
    body,
  });
}

export async function retrieveStripeCheckoutSession(sessionId: string) {
  return stripeRequest<Stripe.Checkout.Session>(
    `/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    { method: "GET" },
  );
}

async function stripeRequest<T>(path: string, init: RequestInit) {
  const response = await fetch(`https://api.stripe.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${requireEnv("STRIPE_SECRET_KEY")}`,
      "Content-Type": "application/x-www-form-urlencoded",
      ...init.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      typeof data?.error?.message === "string"
        ? data.error.message
        : "Stripe request failed.";
    throw new Error(message);
  }

  return data as T;
}
