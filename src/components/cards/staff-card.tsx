import Image from "next/image";
import { ReviewMark } from "@/components/ui/review-mark";
import { getImage } from "@/lib/images";
import type { LocalisedStaffMember } from "@/types/content";

/**
 * Editorial staff entry: a restrained portrait zone beside the person's record.
 * Without a registered local photograph the portrait renders as a designed,
 * matted reserve — never a broken image, never a hotlinked legacy URL. The
 * portrait keeps a fixed 3:4 plate so real photography drops in without
 * shifting the layout.
 *
 * Honesty contract: this card renders exactly what the staff collection
 * resolves. A withheld (unverified) person arrives with a pending name and
 * null degree/honours lines, and the card simply drops those lines.
 */
export function StaffCard({ member }: { member: LocalisedStaffMember }) {
  const image = getImage(member.photo);

  return (
    <article className="flex gap-6 border-t border-navy/10 py-8 sm:gap-10 sm:py-10">
      <div className="relative aspect-[3/4] w-24 flex-shrink-0 self-start overflow-hidden border border-navy/10 bg-navy/[0.04] sm:w-32">
        {image ? (
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-2 border border-navy/[0.07]"
          />
        )}
      </div>
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
      </div>
    </article>
  );
}
