import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "404" };

// Root-level 404 — an unmatched URL carries no reliable locale, so the page is
// bilingual by design: Ukrainian first, English second, matching the site's
// UA-primary identity. It renders inside the root layout (ivory, site fonts)
// but outside the [lang] shell, so it stays deliberately minimal.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-slate">404</p>
      <h1 className="mt-5 text-balance font-serif text-3xl text-navy sm:text-4xl">
        Сторінку не знайдено
      </h1>
      <p className="mt-2 font-serif text-xl italic text-navy/55 sm:text-2xl">
        Page not found
      </p>
      <nav
        aria-label="404"
        className="mt-10 flex items-center gap-5 text-sm font-medium"
      >
        <Link
          href="/ua"
          className="text-slate transition-colors hover:text-navy"
        >
          На головну →
        </Link>
        <span aria-hidden className="text-navy/25">
          /
        </span>
        <Link
          href="/en"
          className="text-slate transition-colors hover:text-navy"
        >
          Home page →
        </Link>
      </nav>
    </main>
  );
}
