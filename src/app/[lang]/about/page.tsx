import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { SectionHeader } from "@/components/layout/section-header";
import { LeadershipSection } from "@/components/sections/leadership-section";
import { QuoteBlock } from "@/components/ui/quote-block";
import { ExternalLink } from "@/components/ui/external-link";
import { ReviewMark } from "@/components/ui/review-mark";
import { getContact } from "@content/contacts/contacts";
import { getHistory } from "@content/history/history";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/about",
    title: dict.about.meta.title,
    description: dict.about.meta.description,
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const contact = getContact(lang);
  const history = getHistory(lang);
  const t = dict.about;

  return (
    <main>
      <PageIntro
        eyebrow={t.intro.eyebrow}
        title={t.intro.title}
        lead={t.intro.lead}
      />

      <Container>
        <div className="mt-14 max-w-2xl sm:mt-16">
          <QuoteBlock text={t.epigraph} />

          <div className="mt-12 space-y-5">
            {t.body.map((paragraph) => (
              <p key={paragraph} className="text-pretty leading-7 text-slate">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Faculty leadership — quiet institutional context, before the
            page's monumental history band. */}
        <div className="mt-14 pb-16 sm:mt-16 sm:pb-20">
          <LeadershipSection lang={lang} dict={dict} />
        </div>
      </Container>

      {/* History — the page's monumental moment: a full-bleed archival band.
          The founding year is set as a watermark numeral behind the record —
          information elsewhere, atmosphere here. */}
      <section
        id="history"
        className="relative scroll-mt-24 overflow-hidden border-t border-navy/10 bg-sand/40 py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <div className="relative">
            <p
              aria-hidden
              className="pointer-events-none absolute -top-10 right-0 hidden select-none font-serif text-[9rem] leading-none tracking-tight text-navy/[0.07] tabular-nums sm:block lg:text-[13rem]"
            >
              1905
            </p>
            <SectionHeader
              eyebrow={t.history.eyebrow}
              title={t.history.title}
              lead={t.history.lead}
            />
            <div className="mt-10 max-w-3xl border-b border-navy/10 lg:mt-12">
              {history.map((period) => (
                <article
                  key={period.id}
                  className="grid gap-x-8 gap-y-1 border-t border-navy/10 py-6 sm:grid-cols-[7rem_1fr] sm:py-7"
                >
                  <p className="font-serif text-lg tabular-nums leading-snug text-copper">
                    {period.years}
                  </p>
                  <div>
                    <h3 className="font-medium leading-6 text-navy">
                      {period.head}
                      <ReviewMark provenance={period.provenance} />
                    </h3>
                    <p className="mt-1.5 max-w-xl text-pretty text-sm leading-6 text-slate">
                      {period.focus}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-5 max-w-xl text-xs leading-5 text-slate/80">
              {t.history.sourceNote}
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <div className="max-w-2xl py-16 sm:py-20">
          <p className="text-xs uppercase tracking-[0.18em] text-copper">
            {t.linksTitle}
          </p>
          <ul className="mt-4 space-y-2.5">
            {contact.links.map((link) => (
              <li key={link.id}>
                <ExternalLink
                  href={link.url}
                  newTabNote={dict.ui.opensInNewTab}
                  className="text-sm text-navy transition-colors hover:text-slate"
                >
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  );
}
