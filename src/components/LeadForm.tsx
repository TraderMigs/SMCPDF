"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Mail } from "lucide-react";

type LeadFormProps = {
  defaultEmail?: string;
  compact?: boolean;
};

export function LeadForm({ defaultEmail = "", compact = false }: LeadFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 12000);
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);
      const result = (await response.json()) as {
        ok?: boolean;
        redirectTo?: string;
        error?: string;
      };

      if (!response.ok || !result.ok || !result.redirectTo) {
        throw new Error(result.error || "Unable to send the guide right now.");
      }

      window.location.href = result.redirectTo;
    } catch (caught) {
      setError(
        caught instanceof DOMException && caught.name === "AbortError"
          ? "The request timed out. Check the local env values for Supabase and Resend, then try again."
          : caught instanceof Error
            ? caught.message
            : "Something went wrong.",
      );
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-3">
      <label className="sr-only" htmlFor={compact ? "email-compact" : "email"}>
        Email address
      </label>
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        name="website"
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/38" />
          <input
            id={compact ? "email-compact" : "email"}
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 w-full rounded-lg border border-white/14 bg-black/35 pl-12 pr-4 text-base text-white outline-none transition focus:border-[#d7ff61] focus:ring-2 focus:ring-[#d7ff61]/20"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[#d7ff61] px-5 text-sm font-bold text-[#10130f] transition hover:bg-[#ecff9d] disabled:cursor-not-allowed disabled:opacity-70 sm:min-w-52"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
          Send Me the Free Guide
        </button>
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  );
}
