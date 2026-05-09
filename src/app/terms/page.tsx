import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return <LegalPage title="Terms of Use" paragraphs={[
    "This website provides trading education materials, including free and paid PDF guides. By using this site, you agree to use the content for personal educational purposes only.",
    "The content is not financial, investment, tax, or legal advice. You are responsible for your own trading decisions, risk management, and results.",
    "Digital purchases are delivered through secure access links. Because PDF products are digital and immediately accessible, all sales are final unless required otherwise by applicable law.",
    "You may not resell, redistribute, upload, or share the paid PDF or private download links. Access can be revoked if abuse, fraud, or unauthorized distribution is detected.",
    "We may update this site, offer, price, terms, or policies at any time. Continued use of the site means you accept the current terms.",
  ]} />;
}

function LegalPage({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <main className="min-h-screen bg-background text-white">
      <section className="px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black">{title}</h1>
          <div className="mt-8 space-y-5 leading-8 text-white/70">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

