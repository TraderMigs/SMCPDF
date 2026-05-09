"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

type CheckoutButtonProps = {
  email?: string;
  className?: string;
  label?: string;
};

export function CheckoutButton({
  email,
  className = "",
  label = "Get the Full Advanced Version for $37",
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error || "Checkout is unavailable right now.");
      }

      window.location.href = result.url;
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={startCheckout}
        disabled={isLoading}
        className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/14 bg-white px-5 py-3 text-sm font-bold text-[#10130f] transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${className}`}
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <CreditCard className="h-5 w-5" />}
        {label}
      </button>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}

