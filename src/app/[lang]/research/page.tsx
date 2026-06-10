import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { ResearchAreaCard } from "@/components/cards/research-area-card";
import { getResearchAreas } from "@content/research/research";
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
      </Container>
    </main>
  );
}
