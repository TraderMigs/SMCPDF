export function PdfPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute inset-x-10 top-12 h-64 rounded-full bg-[#d7ff61]/10 blur-3xl" />
      <div className="relative rotate-[-2deg] rounded-xl border border-white/14 bg-[#11161c] p-4 shadow-2xl">
        <img
          src="/smc-previews/cover.webp"
          alt="SMC Decoded Beginner Starter Guide preview"
          className="aspect-[1191/1684] w-full rounded-lg border border-white/10 object-cover shadow-2xl"
        />
      </div>
    </div>
  );
}
