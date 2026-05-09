import { BarChart3 } from "lucide-react";

export function PdfPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute inset-x-10 top-12 h-64 rounded-full bg-[#d7ff61]/10 blur-3xl" />
      <div className="relative rotate-[-2deg] rounded-xl border border-white/14 bg-[#11161c] p-4 shadow-2xl">
        <div className="rounded-lg border border-white/10 bg-black/45 p-6">
          <div className="mb-12 flex items-center justify-between">
            <span className="rounded-full border border-[#d7ff61]/30 px-3 py-1 text-xs font-semibold text-[#d7ff61]">
              FREE PDF
            </span>
            <BarChart3 className="h-6 w-6 text-white/70" />
          </div>
          <h2 className="text-4xl font-black leading-none text-white">
            Smart Money Concepts
          </h2>
          <p className="mt-4 text-sm text-white/62">
            Basic guide in plain English for learning structure before entries.
          </p>
          <div className="mt-10 space-y-3">
            <div className="h-3 w-4/5 rounded bg-white/16" />
            <div className="h-3 w-3/5 rounded bg-white/12" />
            <div className="h-3 w-5/6 rounded bg-[#d7ff61]/30" />
          </div>
        </div>
      </div>
      <div className="absolute -right-2 bottom-7 hidden w-36 rotate-6 rounded-lg border border-white/12 bg-white/8 p-3 blur-[0.2px] sm:block">
        <div className="h-16 rounded bg-white/10" />
        <div className="mt-3 h-2 rounded bg-white/20" />
        <div className="mt-2 h-2 w-2/3 rounded bg-white/10" />
      </div>
      <div className="absolute -left-2 bottom-20 hidden w-32 rotate-[-7deg] rounded-lg border border-white/12 bg-white/8 p-3 blur-[0.3px] sm:block">
        <div className="h-12 rounded bg-[#d7ff61]/10" />
        <div className="mt-3 h-2 rounded bg-white/18" />
        <div className="mt-2 h-2 w-1/2 rounded bg-white/10" />
      </div>
    </div>
  );
}

