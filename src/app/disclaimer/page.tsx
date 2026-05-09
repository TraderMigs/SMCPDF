import { Footer } from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <section className="px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black">Trading Disclaimer</h1>
          <div className="mt-8 space-y-5 leading-8 text-white/70">
            <p>This website and its PDF materials are provided for educational purposes only. Nothing on this site is financial advice, investment advice, trading advice, or a recommendation to buy or sell any asset.</p>
            <p>Trading involves substantial risk. You can lose money, including more than you expect. You are fully responsible for your own trading decisions, position sizing, risk management, and results.</p>
            <p>No profits are guaranteed. No win rate, income, funding, account growth, or trading success is promised or implied. Past examples, chart illustrations, or educational scenarios do not guarantee future results.</p>
            <p>This offer does not provide trade signals, copy trading, account management, or personalized financial recommendations. Study, practice, and consult qualified professionals where appropriate.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

