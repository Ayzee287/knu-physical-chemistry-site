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

  // min-h-dvh, not min-h-full: a percentage min-height cannot resolve against
  // body (its height property is auto even with min-height set), so the old
  // chain silently collapsed and the footer contract depended on content
  // height. Dynamic viewport units resolve unconditionally and track the real
  // visible viewport on mobile — short pages fill exactly, the footer pins,
  // and there is no phantom scroll from URL-bar sizing.
  return (
    <div lang={hreflang[lang]} className="flex min-h-dvh flex-col">
      {/* transition-none: the skip link must appear instantly on focus — a
          focus jump never animates (D015), so it opts out of the shared
          interaction clock. */}
      <a
        href="#main"
        className="sr-only transition-none focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        {dict.ui.skip}
      </a>
      <Header lang={lang} dict={dict} />
      {/* key={lang} makes a UA↔EN switch replay the composed page arrival
          (`.motion-page-enter`, ADR-0007). Page-to-page navigation already
          remounts the [lang] template, but switching only the locale keeps
          the same downstream route, so the content container was reused and
          the swap read as an instant replacement — the one navigation that
          felt like a redirect. Re-keying on the locale remounts this subtree
          (header/footer stay put, outside it), so the switch arrives like
          moving between rooms, not teleporting. No state is lost: nothing
          inside #main is a client component. */}
      <div id="main" key={lang} className="flex-1">
        {children}
      </div>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
