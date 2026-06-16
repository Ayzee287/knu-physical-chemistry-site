import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { StaffCard } from "@/components/cards/staff-card";
import { ExternalLink } from "@/components/ui/external-link";
import { getHead, getStaff, getTeachingStaff } from "@content/staff/staff";
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
  // Curated leadership set (ADR-0004/0005); the head renders in its own section.
  const featured = getStaff(lang).filter((member) => member.id !== "head");
  // The department's other teaching & research staff — /staff is the COMPLETE
  // teaching-staff directory (ADR-0012); the homepage stays curated.
  const teaching = getTeachingStaff(lang);
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
            (SectionHeader's opening row, D023): the trailing rule ties a label
            into the page grid so it reads as the opening rule of its own record
            box, not as floating text. These were the only section labels on the
            site without the device.

            Vertical rhythm (D024, supersedes D017's flat mt-12 tier). The gap
            from the preceding content to a section label must be UNIFORM down
            the page; a fixed margin can't deliver that, because what precedes a
            label differs. After the intro PROSE (no trailing padding) the label
            needs the full gap, so the head section keeps `mt-14 sm:mt-16`
            (56/64px). After a CARD LIST the previous card already contributes
            its own bottom padding (`py-8 sm:py-10` = 32/40px), so the margin is
            the REMAINDER: `mt-6` (24px) + that padding = 56/64px — the same
            perceived gap. The flat `mt-12` ignored the card padding, so the
            card→label gap measured ~80/88px and the label floated. mt-6 is
            derived, not nudged: prose-gap − card-padding. Both breakpoints land
            because the card padding (py-8→py-10) tracks the intro margin
            (mt-14→mt-16). Keep the two values distinct — collapsing them to one
            margin re-breaks the rhythm. */}

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
            <StaffCard member={head} lang={lang} cta={t.card.profileCta} />
          </div>
        </section>

        {/* Leading faculty — the curated leadership subset (also the homepage
            set). The complete teaching staff follows in section 3. */}
        {featured.length > 0 ? (
          <section className="mt-6" aria-labelledby="staff-featured">
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
                <StaffCard
                  key={member.id}
                  member={member}
                  lang={lang}
                  cta={t.card.profileCta}
                />
              ))}
            </div>
          </section>
        ) : null}

        {/* Teaching & research staff — the rest of the department's teaching
            staff, so /staff is the COMPLETE directory (ADR-0012). Same
            StaffCard as the sections above; these records carry no registered
            portrait yet, so each is a typography-only card (the portrait plate
            mounts only with an asset — ADR-0009). Same mt-6 card-section
            rhythm (D024). */}
        {teaching.length > 0 ? (
          <section className="mt-6" aria-labelledby="staff-roster">
            <div className="flex items-center gap-4">
              <h2
                id="staff-roster"
                className="text-xs uppercase tracking-[0.2em] text-copper"
              >
                {t.rosterSection}
              </h2>
              <span aria-hidden className="h-px flex-1 bg-navy/10" />
            </div>
            <div className="mt-6 border-b border-navy/10">
              {teaching.map((member) => (
                <StaffCard
                  key={member.id}
                  member={member}
                  lang={lang}
                  cta={t.card.profileCta}
                />
              ))}
            </div>
            {/* The teaching staff is complete; the official site remains the
                record of authority for any research staff beyond it. */}
            <p className="mt-6 max-w-2xl text-sm leading-6 text-slate">
              {t.rosterNote}
            </p>
            <p className="mt-3">
              <ExternalLink
                href={SOURCES.physchemKnu.url}
                newTabNote={dict.ui.opensInNewTab}
                className="text-sm font-medium text-navy hover:text-slate"
              >
                {t.rosterCta}
              </ExternalLink>
            </p>
          </section>
        ) : null}
      </Container>
    </main>
  );
}
