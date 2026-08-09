import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionSpread } from "@/components/layout/section-spread";
import { Portrait } from "@/components/ui/portrait";
import { ReviewMark } from "@/components/ui/review-mark";
import { ExternalLink } from "@/components/ui/external-link";
import { getImage } from "@/lib/images";
import { href, type Dictionary, type Locale } from "@/lib/i18n";
import type { Provenance } from "@/lib/provenance";
import type {
  LocalisedStaffMember,
  LocalisedStaffProfile,
} from "@/types/content";

// The single composition of a `/staff/<slug>` page (ADR-0014). A quiet,
// typography-first reading page: the directory identity in a masthead, then the
// rich profile sections WHERE AUTHORED — overview lede first, structured lists
// for honours and courses, the long biography collapsed into native <details>
// (no walls of text, zero JS), contacts last. A member without a rich profile
// renders the masthead + contacts only — a complete, non-apologetic page.
//
// Provenance: every sourced block carries a development-only ReviewMark next to
// its label (or, for the lede, inline) so unverified facts stay visible in
// review and never reach production.

// Scholarly-service names are proper nouns — not localised.
const SCHOLAR_LABELS: Record<
  LocalisedStaffProfile["links"][number]["label"],
  string
> = {
  scholar: "Google Scholar",
  scopus: "Scopus",
  researchgate: "ResearchGate",
};

/**
 * Section opener: eyebrow label + trailing hairline (the site-wide device),
 * set as a spread (ADR-0015) so the label stands in the margin and the section's
 * content takes the measure. On a profile page this matters more than anywhere
 * else on the site: a reading page of six or seven short sections stacked
 * label-over-content puts a horizontal rule across the page every ~120px, and
 * the eye has to re-find the left edge each time. In the margin, the labels
 * form one quiet index down the side and the record reads as a single column.
 */
function Section({
  title,
  provenance,
  children,
}: {
  title: string;
  provenance?: Provenance;
  children: ReactNode;
}) {
  return (
    <section className="mt-12">
      <SectionSpread
        header={
          <div className="flex items-center gap-4">
            <h2 className="text-xs uppercase tracking-[0.2em] text-copper">
              {title}
              {provenance ? <ReviewMark provenance={provenance} /> : null}
            </h2>
            <span aria-hidden className="h-px flex-1 bg-navy/10" />
          </div>
        }
      >
        {children}
      </SectionSpread>
    </section>
  );
}

export function StaffProfileView({
  member,
  profile,
  lang,
  dict,
  officialUrl,
}: {
  member: LocalisedStaffMember;
  profile: LocalisedStaffProfile | null;
  lang: Locale;
  dict: Dictionary;
  officialUrl: string;
}) {
  const t = dict.staff.profile;
  const image = getImage(member.photo);

  return (
    <main className="pb-24">
      <Container>
        {/* Back to the directory */}
        <p className="pt-8 sm:pt-10">
          <Link
            href={href(lang, "/staff")}
            className="inline-flex items-center gap-2 text-sm text-slate hover:text-navy"
          >
            <span aria-hidden>←</span>
            <span className="link-underline">{t.back}</span>
          </Link>
        </p>

        {/* Masthead — directory identity, larger portrait */}
        <header className="mt-8 flex flex-col gap-6 border-b border-navy/10 pb-10 sm:mt-10 sm:flex-row sm:gap-10 sm:pb-12">
          {image ? (
            <Portrait
              image={image}
              className="w-32 flex-shrink-0 self-start sm:w-40"
              sizes="(min-width: 640px) 10rem, 8rem"
            />
          ) : null}
          <div className="min-w-0 self-center">
            <p className="text-xs uppercase tracking-[0.2em] text-copper">
              {member.role}
            </p>
            <h1 className="mt-3 text-balance font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy sm:text-5xl">
              {member.name}
              <ReviewMark provenance={member.provenance} />
            </h1>
            {member.degree ? (
              <p className="mt-3 text-base italic leading-7 text-slate">
                {member.degree}
              </p>
            ) : null}
            {member.honours ? (
              <p className="mt-1 text-sm leading-6 text-slate">
                {member.honours}
              </p>
            ) : null}
            {/* The one-line focus is the masthead subtitle only when no fuller
                overview follows — rich pages must not duplicate it. */}
            {!profile?.overview && member.focus ? (
              <p className="mt-2 text-sm leading-6 text-slate">
                {member.focus}
              </p>
            ) : null}
          </div>
        </header>

        {/* Overview lede — the only prominent prose, shown first */}
        {profile?.overview ? (
          <p className="mt-10 max-w-2xl text-pretty text-lg leading-8 text-slate">
            {profile.overview.text}
            <ReviewMark provenance={profile.overview.provenance} />
          </p>
        ) : null}

        {/* Research interests */}
        {profile?.research ? (
          <Section title={t.researchTitle} provenance={profile.research.provenance}>
            <p className="max-w-2xl text-pretty leading-7 text-slate">
              {profile.research.text}
            </p>
          </Section>
        ) : null}

        {/* Awards and recognition — structured year | distinction rows */}
        {profile?.achievements ? (
          <Section
            title={t.achievementsTitle}
            provenance={profile.achievements.provenance}
          >
            <div className="max-w-2xl border-b border-navy/10">
              {profile.achievements.items.map((a) => (
                <div
                  key={a.text}
                  className="grid grid-cols-[3.5rem_1fr] gap-x-6 border-t border-navy/10 py-3"
                >
                  <span className="font-serif text-sm tabular-nums leading-6 text-copper">
                    {a.year ?? ""}
                  </span>
                  <span className="text-sm leading-6 text-navy">{a.text}</span>
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        {/* Courses taught — quiet hairline list */}
        {profile?.courses ? (
          <Section title={t.coursesTitle} provenance={profile.courses.provenance}>
            <ul className="max-w-2xl border-b border-navy/10">
              {profile.courses.items.map((course) => (
                <li
                  key={course}
                  className="border-t border-navy/10 py-2.5 text-sm leading-6 text-navy"
                >
                  {course}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {/* Biography — long form, collapsed into native <details> sections */}
        {profile?.biography ? (
          <Section
            title={t.biographyTitle}
            provenance={profile.biography.provenance}
          >
            <div className="max-w-2xl border-b border-navy/10">
              {profile.biography.sections.map((s) => (
                <details key={s.heading} className="group border-t border-navy/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-navy [&::-webkit-details-marker]:hidden">
                    <span className="font-serif text-lg leading-snug">
                      {s.heading}
                    </span>
                    <span
                      aria-hidden
                      className="text-copper transition-transform duration-200 group-open:rotate-90 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </summary>
                  <div className="space-y-3 pb-5">
                    {s.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-pretty text-sm leading-7 text-slate"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </Section>
        ) : null}

        {/* Selected publications — verbatim citations (when held) */}
        {profile?.publications ? (
          <Section
            title={t.publicationsTitle}
            provenance={profile.publications.provenance}
          >
            <ol className="max-w-2xl border-b border-navy/10">
              {profile.publications.items.map((pub) => (
                <li
                  key={pub}
                  className="border-t border-navy/10 py-3 text-sm leading-6 text-slate"
                >
                  {pub}
                </li>
              ))}
            </ol>
          </Section>
        ) : null}

        {/* Contacts — directory + profile contact facts */}
        <Section title={t.contactTitle}>
          {/* Every line here is one of the page's few interactive targets, so
              they are spaced (leading-6 + space-y-2 ⇒ ≥24px between centres) to
              satisfy WCAG 2.2 · 2.5.8 by the spacing route. */}
          <div className="max-w-2xl space-y-2 text-sm leading-6">
            {member.email ? (
              <p>
                <a
                  href={`mailto:${member.email}`}
                  className="link-underline text-slate hover:text-navy"
                >
                  {member.email}
                </a>
              </p>
            ) : null}
            {member.orcid ? (
              <p className="text-slate">
                <a
                  href={`https://orcid.org/${member.orcid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-navy"
                >
                  ORCID {member.orcid}
                </a>
              </p>
            ) : null}
            {profile?.links.map((link) => (
              <p key={link.label} className="text-slate">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-navy"
                >
                  {SCHOLAR_LABELS[link.label]}
                </a>
                <ReviewMark provenance={link.provenance} />
              </p>
            ))}
            {/* Label ≠ value is carried by COLOUR WEIGHT (quiet slate label,
                navy value), not by fading the label toward the paper. The
                previous `text-slate/70` label measured 2.93:1 — a distinction
                bought by making one of the two words hard to read. */}
            {profile?.office ? (
              <p className="text-slate">
                {t.officeLabel}:{" "}
                <span className="text-navy">{profile.office.text}</span>
                <ReviewMark provenance={profile.office.provenance} />
              </p>
            ) : null}
            {profile?.phone ? (
              <p className="text-slate">
                {t.phoneLabel}:{" "}
                <span className="text-navy">{profile.phone.text}</span>
                <ReviewMark provenance={profile.phone.provenance} />
              </p>
            ) : null}
          </div>
        </Section>

        {/* The department's own site stays the record of authority */}
        <p className="mt-10">
          <ExternalLink
            href={officialUrl}
            newTabNote={dict.ui.opensInNewTab}
            className="text-sm font-medium text-navy hover:text-slate"
          >
            {t.officialCta}
          </ExternalLink>
        </p>
      </Container>
    </main>
  );
}
