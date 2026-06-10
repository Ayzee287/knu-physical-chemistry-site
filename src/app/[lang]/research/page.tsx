import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { SectionHeader } from "@/components/layout/section-header";
import { ResearchAreaCard } from "@/components/cards/research-area-card";
import { ReviewMark } from "@/components/ui/review-mark";
import { getResearchAreas } from "@content/research/research";
import { getResearchGroups } from "@content/research/groups";
import { getSchool } from "@content/research/school";
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
    path: "/research",
    title: dict.research.meta.title,
    description: dict.research.meta.description,
  });
}

export default async function ResearchPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const areas = getResearchAreas(lang);
  const groups = getResearchGroups(lang);
  const school = getSchool(lang);
  const t = dict.research;

  return (
    <main>
      <PageIntro
        eyebrow={t.intro.eyebrow}
        title={t.intro.title}
        lead={t.intro.lead}
      />

      <Container>
        {/* Scope note — the honest boundary of what these directions claim. */}
        <p className="mt-10 max-w-2xl border-l-2 border-copper/50 pl-6 text-pretty text-sm leading-6 text-slate sm:mt-12">
          {t.profileNote}
        </p>

        <div className="mt-12 border-b border-navy/10">
          {areas.map((area, i) => (
            <ResearchAreaCard key={area.id} area={area} index={i} />
          ))}
        </div>

        {/* Research groups — the department's own group designations: leader,
            programme line, keywords. Quiet rows; identity, not a directory. */}
        <section
          id="groups"
          className="mb-16 mt-16 scroll-mt-24 sm:mb-20 sm:mt-20"
          aria-labelledby="research-groups"
        >
          <SectionHeader
            eyebrow={t.groups.eyebrow}
            title={t.groups.title}
            lead={t.groups.lead}
          />
          <div className="mt-10 max-w-3xl border-b border-navy/10">
            {groups.map((group) => (
              <article
                key={group.id}
                className="border-t border-navy/10 py-6 sm:py-7"
              >
                <h3 className="font-medium leading-6 text-navy">
                  <a
                    href={`#${group.areaId}`}
                    className="transition-colors hover:text-ink"
                  >
                    {group.name}
                  </a>
                  <ReviewMark provenance={group.provenance} />
                </h3>
                <p className="mt-1.5 max-w-2xl text-pretty text-sm leading-6 text-slate">
                  {group.focus}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate/90">
                  {group.keywords.map((keyword, i) => (
                    <span key={keyword}>
                      {i > 0 ? (
                        <span aria-hidden className="mx-2 text-copper/60">
                          ·
                        </span>
                      ) : null}
                      {keyword}
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </section>
      </Container>

      {/* Scientific school — the page's archival close: the department's
          registered school, its 1944 lineage, and a journal-style selected
          bibliography. Current school leadership deliberately not stated. */}
      <section
        id="school"
        className="relative scroll-mt-24 overflow-hidden border-t border-navy/10 bg-sand/40 py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <div className="relative">
            <p
              aria-hidden
              className="pointer-events-none absolute -top-8 right-0 hidden select-none font-serif text-[8rem] leading-none tracking-tight text-navy/[0.07] tabular-nums lg:block"
            >
              1944
            </p>
            <SectionHeader eyebrow={t.school.eyebrow} title={school.name} />
            <p className="mt-6 max-w-2xl text-pretty leading-7 text-slate">
              {school.lineage}
              <ReviewMark provenance={school.provenance.lineage} />
            </p>
            <p className="mt-3 max-w-2xl text-pretty leading-7 text-slate">
              {school.dissertations}
              <ReviewMark provenance={school.provenance.dissertations} />
            </p>

            <div className="mt-10 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.18em] text-copper">
                {t.school.worksTitle}
                <ReviewMark provenance={school.provenance.works} />
              </p>
              <ul className="mt-4 border-b border-navy/10">
                {school.works.map((work) => (
                  <li
                    key={work.citation}
                    className="grid gap-x-8 gap-y-1 border-t border-navy/10 py-4 sm:grid-cols-[4rem_1fr]"
                  >
                    <span className="font-serif text-lg tabular-nums leading-snug text-copper">
                      {work.year}
                    </span>
                    <span className="max-w-2xl text-pretty text-sm leading-6 text-slate">
                      {work.citation}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-xl text-xs leading-5 text-slate/80">
                {t.school.worksNote}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
