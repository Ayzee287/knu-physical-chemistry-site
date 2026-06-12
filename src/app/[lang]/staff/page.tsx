import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { StaffCard } from "@/components/cards/staff-card";
import { ExternalLink } from "@/components/ui/external-link";
import { getHead, getStaff } from "@content/staff/staff";
import { SOURCES } from "@/lib/provenance";
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
    path: "/staff",
    title: dict.staff.meta.title,
    description: dict.staff.meta.description,
  });
}

export default async function StaffPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const head = getHead(lang);
  // Curated public set (ADR-0004/0005); the head renders in its own section.
  const featured = getStaff(lang).filter((member) => member.id !== "head");
  const t = dict.staff;

  return (
    <main className="pb-24">
      <PageIntro
        eyebrow={t.intro.eyebrow}
        title={t.intro.title}
        lead={t.intro.lead}
      />

      <Container>
        {/* Section labels carry the eyebrow + trailing-hairline device
            (SectionHeader's opening row, D023). Why: after D017's spacing fix
            the label still read as stranded — the void above it is dominated
            by the previous card's internal bottom padding (~40px that spacing
            cannot remove without breaking row rhythm), so measured text to
            text the label sat nearly centered between sections. The trailing
            rule ties the label into the page grid: it reads as the opening
            rule of its own record box, not as floating text. These were the
            only section labels on the site without the device. The D017
            two-tier rhythm stands (mt-14/16 after prose, mt-12 between card
            sections). */}

        {/* Head of department — rendered through the same publication policy as
            every staff record: unverified person → honest pending placeholder. */}
        <section className="mt-14 sm:mt-16" aria-labelledby="staff-head">
          <div className="flex items-center gap-4">
            <h2
              id="staff-head"
              className="text-xs uppercase tracking-[0.2em] text-copper"
            >
              {t.headSection}
            </h2>
            <span aria-hidden className="h-px flex-1 bg-navy/10" />
          </div>
          <div className="mt-6 border-b border-navy/10">
            <StaffCard member={head} />
          </div>
        </section>

        {/* Leading faculty — the curated set, not a directory. */}
        {featured.length > 0 ? (
          <section className="mt-12" aria-labelledby="staff-featured">
            <div className="flex items-center gap-4">
              <h2
                id="staff-featured"
                className="text-xs uppercase tracking-[0.2em] text-copper"
              >
                {t.featuredSection}
              </h2>
              <span aria-hidden className="h-px flex-1 bg-navy/10" />
            </div>
            <div className="mt-6 border-b border-navy/10">
              {featured.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Remaining roster — published only as records are confirmed; point
            to the record of authority rather than padding the page. */}
        <section className="mt-12" aria-labelledby="staff-roster">
          <div className="flex items-center gap-4">
            <h2
              id="staff-roster"
              className="text-xs uppercase tracking-[0.2em] text-copper"
            >
              {t.rosterSection}
            </h2>
            <span aria-hidden className="h-px flex-1 bg-navy/10" />
          </div>
          <div className="mt-6 max-w-2xl border-l-2 border-copper/50 pl-6">
            <p className="text-pretty leading-7 text-slate">{t.rosterPending}</p>
            <p className="mt-4">
              <ExternalLink
                href={SOURCES.physchemKnu.url}
                newTabNote={dict.ui.opensInNewTab}
                className="text-sm font-medium text-navy hover:text-slate"
              >
                {t.rosterCta}
              </ExternalLink>
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
