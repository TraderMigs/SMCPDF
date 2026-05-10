import Link from "next/link";
import { ArrowDownToLine, CheckCircle2 } from "lucide-react";
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

          <p className="mt-6 text-sm leading-6 text-white/45">
            Educational content only. Not financial advice. No guaranteed profits. Trading involves substantial risk, and you are responsible for your own trading decisions.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
