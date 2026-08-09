import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { SectionHeader } from "@/components/layout/section-header";
import { SectionSpread } from "@/components/layout/section-spread";
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
          information elsewhere, atmosphere here.

          overflow-CLIP, not hidden (ADR-0015): `overflow: hidden` makes a box a
          scroll container, which would bind every `view()` timeline inside it to
          a container that never scrolls and would cut the sticky rail off at the
          band edge. `clip` clips the watermark identically without that.

          Set as a spread (ADR-0015): the succession is a long register, so its
          heading holds in the rail while the century travels past — the one
          place on the site where the sticky rail is doing real navigational
          work rather than compositional work. The source note joins it there;
          it qualifies the whole record, not the last row of it. */}
      <section
        id="history"
        className="relative scroll-mt-28 overflow-clip border-t border-navy/10 bg-sand/40 py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <div className="relative">
            <SectionSpread
              header={
                <>
                  <SectionHeader
                    size="rail"
                    eyebrow={t.history.eyebrow}
                    title={t.history.title}
                    lead={t.history.lead}
                  />
                  <p className="mt-5 max-w-xl text-xs leading-5 text-slate">
                    {t.history.sourceNote}
                  </p>
                  {/* The founding year, set as an archival watermark. It used to
                      be absolutely positioned at the band's top-right, where it
                      sat harmlessly behind a `max-w-3xl` record. Now that the
                      record uses the full column it landed BEHIND live text —
                      7% navy under body copy is faint but it is still contrast
                      taken away from a reader who gains nothing for it. The
                      margin is where an archival numeral belongs anyway: the
                      century stands beside its own register, in the empty rail
                      below the heading, competing with nothing. */}
                  <p
                    aria-hidden
                    className="pointer-events-none mt-10 hidden select-none font-serif text-[7rem] leading-none tracking-tight text-navy/[0.09] tabular-nums lg:block"
                  >
                    1905
                  </p>
                </>
              }
            >
              <div className="border-b border-navy/10">
                {history.map((period) => (
                  <article
                    key={period.id}
                    className="reveal row-engage grid gap-x-8 gap-y-1 border-t border-navy/10 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:py-7"
                  >
                    <p className="font-serif text-lg tabular-nums leading-snug text-copper">
                      {period.years}
                    </p>
                    <div>
                      <h3 className="font-medium leading-6 text-navy">
                        {period.head}
                        <ReviewMark provenance={period.provenance} />
                      </h3>
                      <p className="mt-1.5 max-w-2xl text-pretty text-sm leading-6 text-slate">
                        {period.focus}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </SectionSpread>
          </div>
        </Container>
      </section>

      <Container>
        <div className="max-w-2xl py-16 sm:py-20">
          {/* Same h2-as-quiet-label pattern as /staff: real heading semantics,
              eyebrow-scale visual. */}
          <h2 className="text-xs uppercase tracking-[0.18em] text-copper">
            {t.linksTitle}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {contact.links.map((link) => (
              <li key={link.id}>
                <ExternalLink
                  href={link.url}
                  newTabNote={dict.ui.opensInNewTab}
                  className="text-sm text-navy hover:text-slate"
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
