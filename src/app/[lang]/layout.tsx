import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getDictionary, hreflang, isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Note: canonical / hreflang / OpenGraph are intentionally NOT set here. Layout
// metadata is inherited wholesale by child pages, which would make every sub-page
// claim the home page as its canonical. Each page sets its own via `buildMetadata`.

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div lang={hreflang[lang]} className="flex min-h-full flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        {dict.ui.skip}
      </a>
      <Header lang={lang} dict={dict} />
      <div id="main" className="flex-1">
        {children}
      </div>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
