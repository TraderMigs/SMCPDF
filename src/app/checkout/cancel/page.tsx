import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <section className="px-5 py-16">
        <div className="mx-auto max-w-2xl">
          <Link href="/" className="text-sm font-bold text-[#d7ff61]">SMC Guide</Link>
          <div className="glass mt-8 rounded-xl p-6 sm:p-8">
            <h1 className="text-4xl font-black">This page is unavailable right now.</h1>
            <p className="mt-5 leading-8 text-white/70">
              The current launch is focused on the free beginner guide. Start there and use it to build your foundation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#d7ff61] px-5 py-3 text-sm font-bold text-[#10130f] transition hover:bg-[#ecff9d]"
              >
                Get the free guide
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
