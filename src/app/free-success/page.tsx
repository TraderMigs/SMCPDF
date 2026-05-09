import Link from "next/link";
import { ArrowDownToLine, BadgeDollarSign, Check, CheckCircle2 } from "lucide-react";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Footer } from "@/components/Footer";

export default async function FreeSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const params = await searchParams;
  const downloadUrl = params.token
    ? `/api/free-download?token=${encodeURIComponent(params.token)}`
    : null;

  return (
    <main className="min-h-screen bg-background text-white">
      <section className="px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm font-bold text-[#d7ff61]">SMC Guide</Link>
          <div className="glass mt-8 rounded-xl p-6 sm:p-8">
            <CheckCircle2 className="mb-5 h-10 w-10 text-[#d7ff61]" />
            <h1 className="text-4xl font-black sm:text-5xl">Congratulations on taking the first step.</h1>
            <p className="mt-5 leading-8 text-white/70">
              This free Smart Money Concepts basic guide can help you understand the foundation and start seeing the market with more structure. I cannot promise or guarantee trading success because you still have to study, practice, manage risk, and do the work. That part is on you. But starting to learn the right way is the first real step.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {downloadUrl ? (
                <a
                  href={downloadUrl}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#d7ff61] px-5 py-3 text-sm font-bold text-[#10130f] transition hover:bg-[#ecff9d]"
                >
                  <ArrowDownToLine className="h-5 w-5" />
                  Download Free PDF
                </a>
              ) : null}
              <form action="/">
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-white/14 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/8 sm:w-auto"
                >
                  Back to landing page
                </button>
              </form>
            </div>
            <p className="mt-4 text-sm text-white/55">Your free copy was also sent to your email.</p>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.045] p-6">
            <h2 className="text-2xl font-black">When you are ready to go deeper</h2>
            <p className="mt-3 leading-7 text-white/68">
              Start with the free guide first. Make sure you understand the basics. When you are ready to go deeper, the full intermediate/advanced version is available as a one-time $37 purchase during this launch price.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CheckoutButton email={params.email} label="Get the Full Advanced Version for $37" />
              <a
                href="#advanced"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/14 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/8"
              >
                Compare both versions
              </a>
            </div>
          </div>

          <section id="advanced" className="mt-6 rounded-xl border border-[#d7ff61]/20 bg-[#0d1117] p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <BadgeDollarSign className="mb-4 h-9 w-9 text-[#d7ff61]" />
                <h2 className="text-3xl font-black">Free vs Advanced</h2>
                <p className="mt-3 leading-7 text-white/62">
                  Use the free guide to lock in the foundation. If you want the deeper breakdown, you can upgrade now or come back after studying the basics.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.045] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/45">Free guide</p>
                <h3 className="mt-3 text-2xl font-black">Basic foundation</h3>
                <ul className="mt-5 space-y-3 text-white/70">
                  {["Basic foundation", "Simple explanations", "Beginner-friendly", "Core concepts"].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#d7ff61]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-[#d7ff61]/30 bg-[#d7ff61]/8 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#d7ff61]">Advanced guide</p>
                <h3 className="mt-3 text-2xl font-black">Intermediate and advanced</h3>
                <ul className="mt-5 space-y-3 text-white/78">
                  {[
                    "Intermediate/advanced breakdowns",
                    "Deeper examples",
                    "More complete SMC structure",
                    "Built for traders ready to study harder",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#d7ff61]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <CheckoutButton email={params.email} label="Buy the Advanced Version for $37" />
                </div>
                <p className="mt-3 text-sm leading-6 text-white/52">
                  One-time payment. No subscription. No guaranteed trading results.
                </p>
              </div>
            </div>
          </section>

          <p className="mt-6 text-sm leading-6 text-white/45">
            Educational content only. Not financial advice. No guaranteed profits. Trading involves substantial risk, and you are responsible for your own trading decisions.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
