import { Portrait } from "@/components/ui/portrait";
import { ReviewMark } from "@/components/ui/review-mark";
import { getImage } from "@/lib/images";
import type { LocalisedStaffMember } from "@/types/content";

/**
 * Editorial staff entry: the shared Portrait plate beside the person's
 * record. Honesty contract: this card renders exactly what the staff
 * collection resolves — a withheld (unverified) person arrives with a
 * pending name and null detail lines, and the card simply drops those lines.
 */
export function StaffCard({ member }: { member: LocalisedStaffMember }) {
  const image = getImage(member.photo);

  return (
    <article className="flex gap-6 border-t border-navy/10 py-8 sm:gap-10 sm:py-10">
      <Portrait
        image={image}
        className="w-24 flex-shrink-0 self-start sm:w-32"
      />
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
        {member.email ? (
          <p className="mt-3 text-sm">
            <a
              href={`mailto:${member.email}`}
              className="text-slate transition-colors hover:text-navy"
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
              className="transition-colors hover:text-navy"
            >
              ORCID {member.orcid}
            </a>
          </p>
        ) : null}
      </div>
    </article>
  );
}
