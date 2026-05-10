import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Footer } from "@/components/Footer";
import { isPaidOfferEnabled } from "@/lib/offer-flags";
import { verifyPaidPurchase } from "@/lib/purchases";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const purchase = isPaidOfferEnabled() ? await verifyPaidPurchase(params.session_id || null) : null;

  return (
    <main className="min-h-screen bg-background text-white">
      <section className="px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm font-bold text-[#d7ff61]">SMC Guide</Link>
          <div className="glass mt-8 rounded-xl p-6 sm:p-8">
            <ShieldCheck className="mb-5 h-10 w-10 text-[#d7ff61]" />
            <h1 className="text-4xl font-black sm:text-5xl">
              {purchase ? "Your download is ready." : "This page is unavailable right now."}
            </h1>
            {purchase ? (
              <>
                <p className="mt-5 leading-8 text-white/70">
                  Your access was verified. A secure link was also emailed to you.
                </p>
                <a
                  href={`/api/paid-download?session_id=${encodeURIComponent(purchase.sessionId)}`}
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#d7ff61] px-5 py-3 text-sm font-bold text-[#10130f] transition hover:bg-[#ecff9d]"
                >
                  Download PDF
                </a>
              </>
            ) : (
              <>
                <p className="mt-5 leading-8 text-white/70">
                  The current launch is focused on the free beginner guide. Return to the main page to get your copy.
                </p>
                <Link
                  href="/"
                  className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg border border-white/14 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/8"
                >
                  Return to the guide
                </Link>
              </>
            )}
          </div>
          <p className="mt-6 text-sm leading-6 text-white/45">
            Educational content only. Not financial advice. No guaranteed profits. Trading involves substantial risk.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
