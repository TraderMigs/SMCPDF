import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <section className="px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black">Privacy Policy</h1>
          <div className="mt-8 space-y-5 leading-8 text-white/70">
            <p>We collect your email address when you request the free guide or complete a purchase. We use it to deliver the PDF, send purchase access, and communicate directly about this offer.</p>
            <p>Payments are processed by Stripe. We do not store your full card number. Stripe may process payment information according to its own terms and privacy policy.</p>
            <p>Lead and purchase records are stored in Supabase. PDF files are stored in private Supabase Storage buckets and delivered through expiring signed links.</p>
            <p>We do not sell your personal data. We may use service providers such as Supabase, Stripe, Resend, GitHub, and Vercel to operate the website and fulfill delivery.</p>
            <p>You can request removal of your email records by contacting the site owner. Some purchase records may need to be retained for legal, tax, fraud prevention, or accounting reasons.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

