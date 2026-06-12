import { Portrait } from "@/components/ui/portrait";
import { ReviewMark } from "@/components/ui/review-mark";
import { getImage } from "@/lib/images";
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
 */
export function StaffCard({ member }: { member: LocalisedStaffMember }) {
  const image = getImage(member.photo);

  return (
    /* id = collection id: the homepage research-leaders section deep-links
       to people here; scroll-mt keeps the landing below the sticky header. */
    <article
      id={member.id}
      className="flex scroll-mt-24 gap-6 border-t border-navy/10 py-8 sm:gap-10 sm:py-10"
    >
      {image ? (
        <Portrait
          image={image}
          className="w-24 flex-shrink-0 self-start sm:w-32"
        />
      ) : null}
      <div className="min-w-0 self-center">
        <p className="text-xs uppercase tracking-[0.18em] text-copper">
          {member.role}
        </p>
        <h3 className="mt-2.5 text-balance font-serif text-2xl font-medium leading-snug text-navy">
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
          <p className="mt-1 text-sm leading-6 text-slate/90">{member.focus}</p>
        ) : null}
        {member.email ? (
          <p className="mt-3 text-sm">
            <a
              href={`mailto:${member.email}`}
              className="link-underline text-slate hover:text-navy"
            >
              {member.email}
            </a>
          </p>
        ) : null}
        {member.orcid ? (
          <p className="mt-1 text-xs text-slate/90">
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
      </div>
    </article>
  );
}
