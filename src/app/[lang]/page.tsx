import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { InstitutionalHero } from "@/components/layout/institutional-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { SectionSpread } from "@/components/layout/section-spread";
import { ResearchAreaCard } from "@/components/cards/research-area-card";
import { Portrait } from "@/components/ui/portrait";
import { ReviewMark } from "@/components/ui/review-mark";
import { getResearchAreas } from "@content/research/research";
import { getResearchGroups } from "@content/research/groups";
import { getRecognition } from "@content/research/recognition";
import { schoolDissertationsCount, schoolFounded } from "@content/research/school";
import { getResearchLeaders } from "@content/staff/staff";
import { founded, getHistory } from "@content/history/history";
import { getImage } from "@/lib/images";
import { site } from "@/content/site";
import { getDictionary, href, isLocale } from "@/lib/i18n";
import { editorial } from "@/lib/provenance";
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
    path: "",
    title: dict.meta.title,
    description: dict.meta.description,
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const areas = getResearchAreas(lang);
  const leaders = getResearchLeaders(lang);
  const recognition = getRecognition(lang);
  const history = getHistory(lang);
  const areaTitleById = new Map(areas.map((area) => [area.id, area.title]));
  const t = dict.home;

  // The record strip («Кафедра у цифрах», ADR-0008): published figures only,
  // each already carried elsewhere on the site — the strip elevates the
  // record, it does not extend the verification surface.
  const record = [
    {
      id: "founded",
      label: t.department.numbers.founded,
      value: founded.value,
      provenance: founded.provenance,
    },
    {
      id: "school",
      label: t.department.numbers.school,
      value: schoolFounded.value,
      provenance: schoolFounded.provenance,
    },
    {
      id: "groups",
      label: t.department.numbers.groups,
      value: String(getResearchGroups(lang).length),
      provenance: editorial("Derived: count of the published research-group list."),
    },
    {
      id: "dissertations",
      label: t.department.numbers.dissertations,
      value: schoolDissertationsCount.value,
      provenance: schoolDissertationsCount.provenance,
    },
  ];

  return (
    <main>
      <InstitutionalHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        statement={t.hero.statement}
        lead={t.hero.lead}
        primary={{ label: t.hero.ctaResearch, href: href(lang, "/research") }}
        secondary={{ label: t.hero.ctaStaff, href: href(lang, "/staff") }}
        keystone={{
          label: t.hero.foundedLabel,
          value: founded.value,
          provenance: founded.provenance,
        }}
        facts={[
          { label: t.hero.metaFacultyLabel, value: site.faculty[lang] },
          { label: t.hero.metaUniversityLabel, value: site.university[lang] },
          { label: t.hero.metaLocationLabel, value: site.location[lang] },
        ]}
      />

      {/* ————————————————————————————————————————————————————————————————
          The register (ADR-0015). The three list sections — people, programme,
          record — are set as editorial SPREADS: the section's identity holds in
          a sticky left rail while its rows travel past in the wide column. They
          share one shape on purpose. The page's variety is at page scale (ink
          masthead → quiet register → sand century band → navy closer), not at
          section scale; three list sections that each invented their own
          geometry would be noise, and the old flat stack — five sections of a
          narrow left column adrift in a wide container — was the actual problem.
          ———————————————————————————————————————————————————————————————— */}

      {/* Research leaders — the people carrying the directions (ADR-0008).
          FIRST content section since the presence sprint (D023): the page
          answers "who are the scientists behind this department" before it
          catalogues the programme — the hero states the institution, this
          section gives it faces. Portrait plates joined the rows under
          ADR-0010 (hairline plate, progressive enhancement — a row without a
          registered asset stays typographic); the muted-colour grading is
          ADR-0011, and it relaxes to full colour when the row is engaged
          (`row-engage`, ADR-0015).
          Each leader joins to their direction's anchor on /research —
          people ↔ programme, not a directory. */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionSpread
            header={
              <SectionHeader
                size="rail"
                eyebrow={t.leaders.eyebrow}
                title={t.leaders.title}
                lead={t.leaders.lead}
              />
            }
          >
            <div className="border-b border-navy/10">
              {leaders.map((leader) => {
                const image = getImage(leader.photo);
                return (
                  /* Same grammar as the research row: the record in the measure,
                     the cross-reference in the margin. Portrait, identity and
                     focus belong to the person and stay together; the direction
                     link points OUT of the row, so it is set as marginal
                     apparatus behind the margin's own hairline. Below `lg` the
                     tracks collapse and the link falls under the record, where
                     a phone reads it in document order. */
                  <article
                    key={leader.id}
                    className="reveal row-engage border-t border-navy/10 py-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,13rem)] lg:gap-x-10 lg:py-10"
                  >
                    <div className="flex gap-5 sm:gap-6">
                      {/* Author-portrait scale (smaller than the /staff plates):
                          the row stays an editorial row, not a profile card. */}
                      {image ? (
                        <Portrait
                          image={image}
                          className="w-16 flex-shrink-0 self-start sm:w-20"
                          sizes="(min-width: 640px) 5rem, 4rem"
                        />
                      ) : null}
                      <div className="min-w-0">
                      <h3 className="text-balance font-serif text-2xl font-medium leading-snug text-navy">
                        {/* The name is the way to the person: it lands on
                            their dedicated profile page (ADR-0014), the canonical
                            home for the record. Quiet underline device only — the
                            arrow stays reserved for programme links. */}
                        <Link
                          href={`${href(lang, "/staff")}/${leader.slug}`}
                          className="hover:text-ink"
                        >
                          <span className="link-underline">{leader.name}</span>
                        </Link>
                        <ReviewMark provenance={leader.provenance} />
                      </h3>
                      {leader.degree ? (
                        <p className="mt-1.5 text-sm italic leading-6 text-slate">
                          {leader.degree}
                        </p>
                      ) : null}
                      {leader.honours ? (
                        <p className="mt-1 text-sm leading-6 text-slate">
                          {leader.honours}
                        </p>
                      ) : null}
                        {leader.focus ? (
                          <p className="mt-3 max-w-xl text-pretty leading-7 text-slate">
                            {leader.focus}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    {/* Inline (not flex) so the arrow follows the last word of a
                        wrapped title instead of being pushed to the margin's
                        right edge, and so the underline device clones under every
                        line. Sentence case on purpose: Ukrainian set in caps runs
                        ~15% wider and this is a LINK, not one of the small-caps
                        labels — the margin's hairline already says "apparatus". */}
                    <p className="mt-4 text-sm leading-6 lg:mt-0 lg:border-l lg:border-navy/10 lg:pl-6 lg:pt-1 lg:text-[0.8125rem] lg:leading-5">
                      <Link
                        href={`${href(lang, "/research")}#${leader.areaId}`}
                        className="font-medium text-navy hover:text-slate"
                      >
                        <span className="link-underline">
                          {areaTitleById.get(leader.areaId)}
                        </span>
                        <span aria-hidden className="link-arrow ml-2">
                          →
                        </span>
                      </Link>
                    </p>
                  </article>
                );
              })}
            </div>
            <p className="mt-8">
              <Link
                href={href(lang, "/staff")}
                className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-slate"
              >
                <span className="link-underline">{t.leaders.cta}</span>
                <span aria-hidden className="link-arrow">
                  →
                </span>
              </Link>
            </p>
          </SectionSpread>
        </Container>
      </section>

      {/* Research digest — the programme the leaders above carry */}
      <section className="border-t border-navy/10 py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionSpread
            header={
              <SectionHeader
                size="rail"
                eyebrow={t.research.eyebrow}
                title={t.research.title}
                lead={t.research.lead}
              />
            }
          >
            <div className="border-b border-navy/10">
              {areas.map((area, i) => (
                <ResearchAreaCard
                  key={area.id}
                  area={area}
                  index={i}
                  href={`${href(lang, "/research")}#${area.id}`}
                />
              ))}
            </div>
            <p className="mt-8">
              <Link
                href={href(lang, "/research")}
                className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-slate"
              >
                <span className="link-underline">{t.research.cta}</span>
                <span aria-hidden className="link-arrow">
                  →
                </span>
              </Link>
            </p>
          </SectionSpread>
        </Container>
      </section>

      {/* Recognition record — dated results and honours (ADR-0008), set in
          the same year|content archival rows as the history and bibliography
          surfaces. Chronological, sourced, review-marked: a record, not a
          highlights reel. The years sit in their own folio column so the record
          can be read as a chronology without reading the entries. */}
      <section className="border-t border-navy/10 py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionSpread
            header={
              <SectionHeader
                size="rail"
                eyebrow={t.recognition.eyebrow}
                title={t.recognition.title}
                lead={t.recognition.lead}
              />
            }
          >
            <div className="border-b border-navy/10">
              {recognition.map((entry) => (
                <article
                  key={entry.id}
                  className="reveal row-engage grid gap-x-8 gap-y-1 border-t border-navy/10 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:py-7"
                >
                  <p className="font-serif text-lg tabular-nums leading-snug text-copper">
                    {entry.years}
                  </p>
                  <div>
                    <h3 className="font-medium leading-6 text-navy">
                      {entry.title}
                      <ReviewMark provenance={entry.provenance} />
                    </h3>
                    <p className="mt-1.5 max-w-2xl text-pretty text-sm leading-6 text-slate">
                      {entry.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </SectionSpread>
        </Container>
      </section>

      {/* A century of the department — warm band */}
      <section className="border-t border-navy/10 bg-sand/40 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <div>
              <SectionHeader
                eyebrow={t.department.eyebrow}
                title={t.department.title}
              />
              <div className="mt-6 max-w-xl space-y-4">
                {t.department.body.map((paragraph, i) => (
                  <p key={paragraph} className="text-pretty leading-7 text-slate">
                    {paragraph}
                    {/* The founding/history sentence summarises the sourced
                        record — carry its provenance in review mode. */}
                    {i === 0 ? <ReviewMark provenance={founded.provenance} /> : null}
                  </p>
                ))}
              </div>
              <p className="mt-8">
                <Link
                  href={`${href(lang, "/about")}#history`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-slate"
                >
                  <span className="link-underline">{t.department.cta}</span>
                  <span aria-hidden className="link-arrow">
                    →
                  </span>
                </Link>
              </p>
            </div>
            {/* Head lineage register — the century rendered as the
                succession of the scientists who led it (D020). Same record
                as /about#history, compact register form; it replaces the
                reserved Figure plate (the page's one empty surface) and the
                CenturyRule ticks (same era years, but with the people). When
                Phase B photography clears, the documentary photograph lands
                back in this column — see vault homepage-direction. */}
            <div className="self-start">
              <h3 className="text-xs uppercase tracking-[0.18em] text-copper">
                {t.department.lineageTitle}
              </h3>
              <ol className="mt-4 border-b border-navy/10">
                {history.map((period) => (
                  <li
                    key={period.id}
                    className="flex items-baseline gap-5 border-t border-navy/10 py-2.5"
                  >
                    <span className="w-[5.25rem] flex-shrink-0 font-serif text-sm tabular-nums leading-snug text-copper">
                      {period.years}
                    </span>
                    <span className="text-sm leading-snug text-navy">
                      {period.head}
                      <ReviewMark provenance={period.provenance} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* The department in numbers — quiet typographic figures (no counters,
              by design language). Every figure is a claim already published
              elsewhere on the site; see the `record` assembly.

              Set as a RULED REGISTER (ADR-0015). Four figures floating in a bare
              grid read as a footnote: the labels were the same size as the
              figures' own review marks, the values were ragged (1905 beside 6),
              and nothing tied a value to its label except proximity. Now each
              entry is a cell of an engraved plinth — hairline-divided at `sm`,
              label above rule, figure below, everything baseline-consistent. The
              figures carry the page's largest non-heading serif because they are
              the department's strongest quantitative claims and they should
              close the century band with weight. Still no counters: a figure
              that counts up is a figure performing, and these are records. */}
          <div className="mt-14 lg:mt-16">
            <div className="flex items-center gap-4">
              <h3 className="text-xs uppercase tracking-[0.18em] text-copper">
                {t.department.numbers.title}
              </h3>
              <span aria-hidden className="h-px flex-1 bg-navy/10" />
            </div>
            <dl className="mt-6 grid grid-cols-2 border-t border-navy/15 sm:grid-cols-4">
              {record.map((figure) => (
                <div
                  key={figure.id}
                  className="reveal border-navy/10 px-0 py-6 sm:border-l sm:px-7 sm:first:border-l-0 sm:first:pl-0"
                >
                  <dt className="text-xs leading-5 text-slate">
                    {figure.label}
                  </dt>
                  <dd className="mt-3 font-serif text-4xl font-medium leading-none tracking-tight text-navy tabular-nums sm:text-[2.75rem]">
                    {figure.value}
                    <ReviewMark provenance={figure.provenance} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Closer — the page's single navy band, bookending the ink masthead.
          Composed as a balance rather than a stack (ADR-0015): the invitation
          holds the measure on the left and the action stands as a counterweight
          in the right margin, aligned to the same rail edge the register
          sections use. Stacked left-aligned, this band was three short lines and
          a small button adrift in a very large field of navy — the emptiest
          surface on the site, at the moment the page is asking for contact. No
          contact FACT is repeated here: the footer owns identity and /contacts
          owns the record (D025); this band owns the invitation only. */}
      <section className="dark-surface bg-navy py-16 text-ivory sm:py-20 lg:py-24">
        <Container>
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-16">
            <SectionHeader
              tone="dark"
              eyebrow={t.contact.eyebrow}
              title={t.contact.title}
              lead={t.contact.lead}
            />
            <p className="mt-9 lg:mt-0">
              <Link
                href={href(lang, "/contacts")}
                className="btn-fill inline-block border border-ivory/80 px-6 py-3 text-sm font-medium hover:text-navy"
              >
                {t.contact.cta}
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
