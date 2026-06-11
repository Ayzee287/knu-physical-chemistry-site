import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { InstitutionalHero } from "@/components/layout/institutional-hero";
import { SectionHeader } from "@/components/layout/section-header";
import { ResearchAreaCard } from "@/components/cards/research-area-card";
import { CenturyRule } from "@/components/ui/century-rule";
import { Figure } from "@/components/ui/figure";
import { ReviewMark } from "@/components/ui/review-mark";
import { getResearchAreas } from "@content/research/research";
import { founded, periods } from "@content/history/history";
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

          {/* The century, as a rule: one tick per era of the record. */}
          <CenturyRule
            className="mt-14 lg:mt-16"
            years={periods.map((p, i) => ({
              year: p.years.slice(0, 4),
              major: i === 0 || i === 2 || i === 6 || i === 7,
            }))}
          />
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
              className="inline-block border border-ivory/80 px-6 py-3 text-sm font-medium transition-colors hover:bg-ivory hover:text-navy"
            >
              {t.contact.cta}
            </Link>
          </p>
        </Container>
      </section>
    </main>
  );
}
