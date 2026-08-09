import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { SectionSpread } from "@/components/layout/section-spread";
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
        {/* Directory composition (ADR-0015). The page has always had three
            publication tiers — head, leading faculty, the complete teaching
            staff — and rendered all three identically, as one eleven-deep stack
            of the same card in a half-width column. The tiers were an assertion
            in the section labels and nowhere in the design.

            They are now stated the way a printed directory states them: as
            SCALE. The head is a full record standing alone; the leading faculty
            are full records; the teaching staff is a compact register. Each tier
            is quieter than the one above it, so a visitor reads the department's
            structure before reading a single name. Nothing is demoted in
            substance — every record carries the same fields, the same
            provenance and the same route into its full page.

            The section label stands in the margin rail (`SectionSpread`), which
            also retires the D024 label-rhythm problem: a rail label has no
            "gap to the previous card" to tune, because it is not stacked on
            one. D024's derived `mt-6`/`mt-14` pair applied to a stacked label
            that no longer exists above `lg`; below `lg` the spread collapses and
            the original rhythm is preserved by the same margins. */}

        {/* Head of department — rendered through the same publication policy as
            every staff record: unverified person → honest pending placeholder. */}
        <section className="mt-14 sm:mt-16" aria-labelledby="staff-head">
          <SectionSpread
            header={
              <div className="flex items-center gap-4">
                <h2
                  id="staff-head"
                  className="text-xs uppercase tracking-[0.2em] text-copper"
                >
                  {t.headSection}
                </h2>
                <span aria-hidden className="h-px flex-1 bg-navy/10" />
              </div>
            }
          >
            <div className="border-b border-navy/10">
              <StaffCard
                member={head}
                lang={lang}
                cta={t.card.profileCta}
                density="lead"
              />
            </div>
          </SectionSpread>
        </section>

        {/* Leading faculty — the curated leadership subset (also the homepage
            set). The complete teaching staff follows in section 3. */}
        {featured.length > 0 ? (
          <section className="mt-14 sm:mt-16" aria-labelledby="staff-featured">
            <SectionSpread
              header={
                <div className="flex items-center gap-4">
                  <h2
                    id="staff-featured"
                    className="text-xs uppercase tracking-[0.2em] text-copper"
                  >
                    {t.featuredSection}
                  </h2>
                  <span aria-hidden className="h-px flex-1 bg-navy/10" />
                </div>
              }
            >
              <div className="border-b border-navy/10">
                {featured.map((member) => (
                  <StaffCard
                    key={member.id}
                    member={member}
                    lang={lang}
                    cta={t.card.profileCta}
                  />
                ))}
              </div>
            </SectionSpread>
          </section>
        ) : null}

        {/* Teaching & research staff — the rest of the department's teaching
            staff, so /staff is the COMPLETE directory (ADR-0012). Register
            density: the same card, one step quieter. The closing note and the
            link to the department's own site are the tier's marginalia and stand
            in the rail with its label — they qualify the whole tier, so they
            belong beside it rather than after its last row. */}
        {teaching.length > 0 ? (
          <section className="mt-14 sm:mt-16" aria-labelledby="staff-roster">
            <SectionSpread
              header={
                <>
                  <div className="flex items-center gap-4">
                    <h2
                      id="staff-roster"
                      className="text-xs uppercase tracking-[0.2em] text-copper"
                    >
                      {t.rosterSection}
                    </h2>
                    <span aria-hidden className="h-px flex-1 bg-navy/10" />
                  </div>
                  {/* The teaching staff is complete; the official site remains
                      the record of authority for any research staff beyond it. */}
                  <p className="mt-5 max-w-2xl text-sm leading-6 text-slate">
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
                </>
              }
            >
              <div className="border-b border-navy/10">
                {teaching.map((member) => (
                  <StaffCard
                    key={member.id}
                    member={member}
                    lang={lang}
                    cta={t.card.profileCta}
                    density="register"
                  />
                ))}
              </div>
            </SectionSpread>
          </section>
        ) : null}
      </Container>
    </main>
  );
}
