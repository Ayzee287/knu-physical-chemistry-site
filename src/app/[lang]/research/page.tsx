import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { SectionHeader } from "@/components/layout/section-header";
import { ResearchAreaCard } from "@/components/cards/research-area-card";
import { ReviewMark } from "@/components/ui/review-mark";
import { getResearchAreas } from "@content/research/research";
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
  const school = getSchool(lang);
  const t = dict.research;

  return (
    <main className="pb-24">
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

        {/* Scientific school — the department's registered school: name,
            1944 lineage, and a publication-style selected bibliography.
            Current school leadership is deliberately not stated (backlog). */}
        <section id="school" className="mt-16 scroll-mt-24 sm:mt-20">
          <SectionHeader eyebrow={t.school.eyebrow} title={school.name} />
          <p className="mt-6 max-w-2xl text-pretty leading-7 text-slate">
            {school.lineage}
            <ReviewMark provenance={school.provenance.lineage} />
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
        </section>
      </Container>
    </main>
  );
}
