import Link from "next/link";
import { Portrait } from "@/components/ui/portrait";
import { ReviewMark } from "@/components/ui/review-mark";
import { getImage } from "@/lib/images";
import { href, type Locale } from "@/lib/i18n";
import type { LocalisedStaffMember } from "@/types/content";

/**
 * Editorial staff entry. Honesty contract: this card renders exactly what
 * the staff collection resolves — a withheld (unverified) person arrives
 * with a pending name and null detail lines, and the card simply drops
 * those lines.
 *
 * Portrait contract (ADR-0009, supersedes D021's all-or-none section rule):
 * portraits are progressive enhancement. The plate renders ONLY where a
 * registered asset exists; a record without one is a typographic row —
 * absence stated as typography, never as a reserved frame. Mixed
 * photo/photo-less sections are the normal state while the portrait set
 * completes (grades + held assets: source-materials/photo-inventory.md).
 *
 * Composition (ADR-0015). The row is a two-track spread at `lg`: the RECORD
 * (who this person is) in the measure, and ACCESS (how to reach them, where
 * their full page is) in the right margin behind the margin's hairline — the
 * same record/apparatus split the research and leader rows use. Previously all
 * seven lines stacked in one narrow column, so a directory of eleven people ran
 * to eleven screens of a half-empty page and the profile link — the row's real
 * action — was the last of seven equal-weight lines.
 *
 * `density` is the page's hierarchy, expressed as scale rather than as ornament:
 *
 *   "lead"     — the head of department, who stands alone in the first tier.
 *                Largest plate, serif name at 3xl (the page's only record set
 *                at heading scale). The 792px source carries it.
 *   "full"     — the leading faculty. Large plate, serif name at 2xl, every
 *                detail line.
 *   "register" — the rest of the teaching staff, where /staff is the COMPLETE
 *                directory (ADR-0012). Smaller plate, name at xl, tighter
 *                leading. Still a hairline row, never a card grid: the tier
 *                reads as a register you scan, not as a wall of tiles.
 *
 * Plate sizes are capped by the SOURCES, not by taste: the official portrait set
 * runs from 137×147 to 1200×1600 (see the notes in lib/images.ts), so the `full`
 * tier holds at 128px — several files already upscale there on a 2× display, and
 * the muted grading is what keeps that honest. Only the head's square 792px
 * source can carry the `lead` plate. Enlarging the rest would trade real detail
 * for apparent importance.
 *
 * Each card carries one quiet link into the person's dedicated profile page
 * (`/staff/<slug>`, ADR-0014).
 */
export function StaffCard({
  member,
  lang,
  cta,
  density = "full",
}: {
  member: LocalisedStaffMember;
  lang: Locale;
  cta: string;
  density?: "lead" | "full" | "register";
}) {
  const image = getImage(member.photo);
  const compact = density === "register";
  const lead = density === "lead";

  const plate = {
    lead: "w-28 flex-shrink-0 self-start sm:w-40",
    full: "w-24 flex-shrink-0 self-start sm:w-32",
    register: "w-16 flex-shrink-0 self-start sm:w-20",
  }[density];
  const plateSizes = {
    lead: "(min-width: 640px) 10rem, 7rem",
    full: "(min-width: 640px) 8rem, 6rem",
    register: "(min-width: 640px) 5rem, 4rem",
  }[density];

  return (
    /* id = collection id: the homepage research-leaders section deep-links
       to people here; scroll-mt keeps the landing below the sticky header. */
    <article
      id={member.id}
      /* 15rem, not the 13rem the research/leader margins use: this margin
         carries e-mail addresses, and at 13rem the longest of them
         (maria_malysheva@univ.kiev.ua) broke across two lines. A track width is
         a means, not a value — a wrapped address is a worse failure than a
         two-pixel inconsistency between two different kinds of margin. */
      className={`reveal row-engage scroll-mt-28 border-t border-navy/10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] lg:gap-x-10 ${
        compact ? "py-6 sm:py-7" : "py-8 sm:py-10"
      }`}
    >
      <div className={`flex ${compact ? "gap-5 sm:gap-6" : "gap-6 sm:gap-10"}`}>
        {image ? (
          <Portrait image={image} className={plate} sizes={plateSizes} />
        ) : null}
        <div className="min-w-0 self-center">
          <p className="text-xs uppercase tracking-[0.18em] text-copper">
            {member.role}
          </p>
          <h3
            className={`mt-2 text-balance font-serif font-medium leading-snug text-navy ${
              lead ? "text-2xl sm:text-3xl" : compact ? "text-xl" : "text-2xl"
            }`}
          >
            {member.name}
            <ReviewMark provenance={member.provenance} />
          </h3>
          {member.degree ? (
            <p className="mt-1.5 text-sm italic leading-6 text-slate">
              {member.degree}
            </p>
          ) : null}
          {member.honours ? (
            <p className="mt-1 text-sm leading-6 text-slate">{member.honours}</p>
          ) : null}
          {member.focus ? (
            <p className="mt-1 text-sm leading-6 text-slate">{member.focus}</p>
          ) : null}
        </div>
      </div>

      {/* Access margin: contact channels and the way into the full record. On a
          phone these fall under the record in document order, which is the
          order they are wanted in.

          Target spacing (WCAG 2.2 · 2.5.8, ADR-0015). These are three stacked
          text links roughly 16px tall — under the 24×24 minimum, which the
          success criterion also lets you meet by SPACING: a 24px circle centred
          on each target must not reach its neighbour. Measured, the stack was
          20.6px apart and failed. `leading-6` on every line and `mt-2`/`mt-3`
          between them puts the centres ≥24px apart, which satisfies it without
          padding the links — padding would drag `.link-underline` (positioned
          against the padding box) away from the text it underlines. */}
      <div className="mt-4 text-sm lg:mt-0 lg:self-center lg:border-l lg:border-navy/10 lg:pl-6">
        {member.email ? (
          <p className="break-words leading-6">
            <a
              href={`mailto:${member.email}`}
              className="link-underline text-slate hover:text-navy lg:text-[0.8125rem]"
            >
              {member.email}
            </a>
          </p>
        ) : null}
        {member.orcid ? (
          <p className="mt-2 break-words text-xs leading-6 text-slate">
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
        <p className="mt-3 leading-6">
          <Link
            href={`${href(lang, "/staff")}/${member.slug}`}
            className="font-medium text-navy hover:text-slate lg:text-[0.8125rem]"
          >
            <span className="link-underline">{cta}</span>
            <span aria-hidden className="link-arrow ml-2">
              →
            </span>
          </Link>
        </p>
      </div>
    </article>
  );
}
