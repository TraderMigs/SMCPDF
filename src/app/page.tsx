import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CandlestickChart,
  Check,
  ShieldCheck,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { PdfPreview } from "@/components/PdfPreview";

const learnItems = [
  "Market structure",
  "Liquidity",
  "Order blocks",
  "Fair value gaps",
  "Entries and confirmations",
  "Risk management",
  "How to stop chasing random candles",
];

const faqs = [
  ["Is this financial advice?", "No. This is educational content only and does not replace licensed financial advice."],
  ["Do I need experience?", "The free guide is beginner-friendly and written in plain English."],
  ["Do I get instant access?", "Yes. The free guide will be sent to the email address you enter. Enter a valid email to receive any future free content as the guide is updated."],
  ["Will this guarantee profits?", "No. There are no guaranteed results in trading. You still have to study, practice, manage risk, and make your own decisions."],
];

const previewCards = [
  {
    title: "What day trading really is",
    image: "/smc-previews/lesson-1-day-trading.webp",
    alt: "Preview page from the SMC Decoded guide showing lesson one about day trading",
  },
  {
    title: "Liquidity sweeps",
    image: "/smc-previews/lesson-8-liquidity-sweeps.webp",
    alt: "Preview page from the SMC Decoded guide showing liquidity sweeps",
  },
  {
    title: "Order blocks",
    image: "/smc-previews/lesson-11-order-blocks.webp",
    alt: "Preview page from the SMC Decoded guide showing order blocks",
  },
  {
    title: "Fair value gaps",
    image: "/smc-previews/lesson-12-fair-value-gaps.webp",
    alt: "Preview page from the SMC Decoded guide showing fair value gaps",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="relative overflow-hidden bg-background text-white">
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(215,255,97,0.13),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(76,132,255,0.12),transparent_24%)]" />

      <section className="relative px-5 pb-20 pt-8 sm:pt-12">
        <nav className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-wide">
            <CandlestickChart className="h-5 w-5 text-[#d7ff61]" />
            SMC Guide
          </Link>
          <Link
            href="/disclaimer"
            className="rounded-lg border border-white/12 px-3 py-2 text-xs font-semibold text-white/72 transition hover:text-white"
          >
            Risk disclaimer
          </Link>
        </nav>

        <div className="mx-auto grid max-w-6xl items-center gap-10 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pt-18">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d7ff61]/25 bg-[#d7ff61]/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#d7ff61]">
              Free basic Smart Money Concepts PDF
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-normal text-white sm:text-5xl lg:text-6xl">
              Learn Smart Money Concepts Without the Confusing Trader Jargon
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Get the free basic guide first. Learn the foundation in plain English before going deeper.
            </p>

            <div className="glass mt-8 rounded-xl p-4 sm:p-5">
              <LeadForm defaultEmail={params.email || ""} />
              <p className="mt-3 text-xs leading-5 text-white/48">
                No signals. No income promises. Just structured education and a clear next step.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#preview"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/8"
              >
                Preview the guide <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <PdfPreview />
        </div>
      </section>

      <section id="preview" className="relative border-y border-white/10 bg-white/[0.035] px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-4">
            {previewCards.map((preview) => (
              <div key={preview.title} className="glass rounded-xl p-3">
                <img
                  src={preview.image}
                  alt={preview.alt}
                  className="aspect-[1191/1684] w-full rounded-lg border border-white/10 object-cover shadow-xl"
                />
                <p className="mt-4 font-bold text-white">{preview.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-18">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <BookOpen className="mb-4 h-9 w-9 text-[#d7ff61]" />
            <h2 className="text-3xl font-black sm:text-4xl">What You’ll Learn</h2>
            <p className="mt-4 leading-7 text-white/62">
              The goal is to make the concepts easier to organize, not to promise outcomes.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {learnItems.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4">
                <Check className="h-5 w-5 shrink-0 text-[#d7ff61]" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-18">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-xl border border-amber-300/25 bg-amber-300/8 p-6">
            <AlertTriangle className="mb-4 h-8 w-8 text-amber-200" />
            <h2 className="text-2xl font-black">Realistic Trading Disclaimer</h2>
            <p className="mt-4 leading-7 text-white/68">
              This is education only. There are no guaranteed profits, no signals, no trade copying promises, and no financial advice. Trading involves substantial risk, and you are responsible for your own decisions.
            </p>
          </div>
          <div>
            <ShieldCheck className="mb-4 h-8 w-8 text-[#d7ff61]" />
            <h2 className="text-3xl font-black">FAQ</h2>
            <div className="mt-5 space-y-3">
              {faqs.map(([question, answer]) => (
                <details key={question} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
                  <summary className="cursor-pointer font-bold">{question}</summary>
                  <p className="mt-3 leading-7 text-white/62">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
