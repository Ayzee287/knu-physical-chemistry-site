import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { InstitutionalHero } from "@/components/layout/institutional-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { ResearchAreaCard } from "@/components/cards/research-area-card";
import { ReviewMark } from "@/components/ui/review-mark";
import { getResearchAreas } from "@content/research/research";
import { getResearchGroups } from "@content/research/groups";
import { getRecognition } from "@content/research/recognition";
import { schoolDissertationsCount, schoolFounded } from "@content/research/school";
import { getResearchLeaders } from "@content/staff/staff";
import { founded, getHistory } from "@content/history/history";
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

      {/* Research digest — the page's intellectual core */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeader
            eyebrow={t.research.eyebrow}
            title={t.research.title}
            lead={t.research.lead}
          />
          <div className="mt-10 border-b border-navy/10 lg:mt-12">
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
        </Container>
      </section>

      {/* Research leaders — the people carrying the directions (ADR-0008).
          Typographic rows, no portrait plates: photography stays gated on
          Phase B consent, and the reserved-plate device is deliberately not
          multiplied on the homepage. Each leader joins to their direction's
          anchor on /research — people ↔ programme, not a directory. */}
      <section className="border-t border-navy/10 py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeader
            eyebrow={t.leaders.eyebrow}
            title={t.leaders.title}
            lead={t.leaders.lead}
          />
          <div className="mt-10 border-b border-navy/10 lg:mt-12">
            {leaders.map((leader) => (
              <article
                key={leader.id}
                className="grid gap-x-8 gap-y-3 border-t border-navy/10 py-8 sm:grid-cols-[2fr_3fr] lg:py-10"
              >
                <div>
                  <h3 className="text-balance font-serif text-2xl font-medium leading-snug text-navy">
                    {/* The name is the way to the person: deep-link to the
                        record on /staff (anchor = collection id). Quiet
                        underline device only — the arrow stays reserved for
                        programme links. */}
                    <Link
                      href={`${href(lang, "/staff")}#${leader.id}`}
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
                </div>
                <div className="max-w-xl sm:pt-1.5">
                  {leader.focus ? (
                    <p className="text-pretty leading-7 text-slate">
                      {leader.focus}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm">
                    <Link
                      href={`${href(lang, "/research")}#${leader.areaId}`}
                      className="inline-flex items-center gap-2 font-medium text-navy hover:text-slate"
                    >
                      <span className="link-underline">
                        {areaTitleById.get(leader.areaId)}
                      </span>
                      <span aria-hidden className="link-arrow">
                        →
                      </span>
                    </Link>
                  </p>
                </div>
              </article>
            ))}
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
        </Container>
      </section>

      {/* Recognition record — dated results and honours (ADR-0008), set in
          the same year|content archival rows as the history and bibliography
          surfaces. Chronological, sourced, review-marked: a record, not a
          highlights reel. */}
      <section className="border-t border-navy/10 py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeader
            eyebrow={t.recognition.eyebrow}
            title={t.recognition.title}
            lead={t.recognition.lead}
          />
          <div className="mt-10 max-w-3xl border-b border-navy/10 lg:mt-12">
            {recognition.map((entry) => (
              <article
                key={entry.id}
                className="grid gap-x-8 gap-y-1 border-t border-navy/10 py-6 sm:grid-cols-[7rem_1fr] sm:py-7"
              >
                <p className="font-serif text-lg tabular-nums leading-snug text-copper">
                  {entry.years}
                </p>
                <div>
                  <h3 className="font-medium leading-6 text-navy">
                    {entry.title}
                    <ReviewMark provenance={entry.provenance} />
                  </h3>
                  <p className="mt-1.5 max-w-xl text-pretty text-sm leading-6 text-slate">
                    {entry.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
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

          {/* The department in numbers — quiet typographic figures (no
              counters, by design language). Every figure is a claim already
              published elsewhere on the site; see the `record` assembly. */}
          <div className="mt-12 lg:mt-14">
            <h3 className="text-xs uppercase tracking-[0.18em] text-copper">
              {t.department.numbers.title}
            </h3>
            <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-navy/10 pt-6 sm:grid-cols-4">
              {record.map((figure) => (
                <div key={figure.id}>
                  <dt className="text-xs leading-5 text-slate/90">
                    {figure.label}
                  </dt>
                  <dd className="mt-1.5 font-serif text-3xl font-medium leading-none tracking-tight text-navy tabular-nums sm:text-4xl">
                    {figure.value}
                    <ReviewMark provenance={figure.provenance} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Closer — the page's single navy band, bookending the ink masthead */}
      <section className="dark-surface bg-navy py-16 text-ivory sm:py-20 lg:py-24">
        <Container>
          <SectionHeader
            tone="dark"
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            lead={t.contact.lead}
          />
          <p className="mt-9">
            <Link
              href={href(lang, "/contacts")}
              className="btn-fill inline-block border border-ivory/80 px-6 py-3 text-sm font-medium hover:text-navy"
            >
              {t.contact.cta}
            </Link>
          </p>
        </Container>
      </section>
    </main>
  );
}
