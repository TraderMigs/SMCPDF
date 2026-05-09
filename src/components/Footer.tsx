import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 text-sm text-white/58">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>Smart Money Concepts Guide. Educational content only.</p>
        <nav className="flex flex-wrap gap-4">
          <Link className="hover:text-white" href="/terms">
            Terms
          </Link>
          <Link className="hover:text-white" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-white" href="/disclaimer">
            Disclaimer
          </Link>
        </nav>
      </div>
    </footer>
  );
}

