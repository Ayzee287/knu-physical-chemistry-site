import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { InstitutionalHero } from "@/components/layout/institutional-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { ResearchAreaCard } from "@/components/cards/research-area-card";
import { Figure } from "@/components/ui/figure";
import { getResearchAreas } from "@content/research/research";
import { site } from "@/content/site";
import { getDictionary, href, isLocale } from "@/lib/i18n";
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
  const t = dict.home;

  return (
    <main>
      <InstitutionalHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        primary={{ label: t.hero.ctaResearch, href: href(lang, "/research") }}
        secondary={{ label: t.hero.ctaStaff, href: href(lang, "/staff") }}
        meta={[
          { label: t.hero.metaFacultyLabel, value: site.faculty[lang] },
          { label: t.hero.metaUniversityLabel, value: site.university[lang] },
          { label: t.hero.metaLocationLabel, value: site.location[lang] },
        ]}
      />

      {/* Research directions */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow={t.research.eyebrow}
            title={t.research.title}
            lead={t.research.lead}
          />
          <div className="mt-12 border-b border-navy/10">
            {areas.map((area, i) => (
              <ResearchAreaCard key={area.id} area={area} index={i} />
            ))}
          </div>
          <p className="mt-8">
            <Link
              href={href(lang, "/research")}
              className="group inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-slate"
            >
              {t.research.cta}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </p>
        </Container>
      </section>

      {/* The department in its faculty */}
      <section className="border-t border-navy/10 bg-sand/40 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <div>
              <SectionHeader
                eyebrow={t.department.eyebrow}
                title={t.department.title}
              />
              <div className="mt-6 max-w-xl space-y-4">
                {t.department.body.map((paragraph) => (
                  <p key={paragraph} className="text-pretty leading-7 text-slate">
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="mt-8">
                <Link
                  href={href(lang, "/about")}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-slate"
                >
                  {t.department.cta}
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </p>
            </div>
            <Figure
              caption={t.department.figureCaption}
              lang={lang}
              index="01"
              className="self-start"
            />
          </div>
        </Container>
      </section>

      {/* Contact strip */}
      <section className="border-t border-navy/10 py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            lead={t.contact.lead}
          />
          <p className="mt-8">
            <Link
              href={href(lang, "/contacts")}
              className="inline-block border border-navy/70 px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-ivory"
            >
              {t.contact.cta}
            </Link>
          </p>
        </Container>
      </section>
    </main>
  );
}
