import { ExternalLink } from "@/components/ui/external-link";
import { Portrait } from "@/components/ui/portrait";
import { ReviewMark } from "@/components/ui/review-mark";
import { getDean } from "@content/staff/leadership";
import { officialLinks } from "@content/contacts/contacts";
import { getImage } from "@/lib/images";
import type { Locale, Dictionary } from "@/lib/i18n";

/**
 * Faculty leadership block — a QUIET institutional context section, not a
 * staff card and not a hero. The department situates itself within the
 * faculty: structural statement, the dean's record (portrait plate, role,
 * name through the verified-or-withheld gate), and the faculty link.
 * Deliberately restrained: this block must read as institutional fact,
 * never as promotion.
 */
export function LeadershipSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const t = dict.about.leadership;
  const dean = getDean(lang);
  const deanImage = getImage(dean.photo);
  const facultyLink =
    officialLinks.find((link) => link.id === "faculty")?.url ??
    "https://chem.knu.ua/";

  return (
    <section className="max-w-3xl border-t border-navy/10 pt-10">
      <p className="text-xs uppercase tracking-[0.18em] text-copper">
        {t.eyebrow}
      </p>
      <h2 className="mt-4 text-balance font-serif text-2xl font-medium leading-snug text-navy sm:text-3xl">
        {t.title}
      </h2>
      <p className="mt-4 max-w-xl text-pretty leading-7 text-slate">{t.body}</p>

      <div className="mt-8 flex items-center gap-6 border-t border-navy/10 pt-8 sm:gap-8">
        {/* Progressive-enhancement contract (ADR-0009): plate renders only
            with a registered asset. The dean's only available official file
            is 100×150 (grade F) — held until an original arrives. */}
        {deanImage ? (
          <Portrait
            image={deanImage}
            className="w-20 flex-shrink-0 sm:w-24"
            sizes="(min-width: 640px) 6rem, 5rem"
          />
        ) : null}
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-slate">
            {dean.role}
          </p>
          <p className="mt-2 font-serif text-xl font-medium leading-snug text-navy">
            {dean.name}
            <ReviewMark provenance={dean.provenance} />
          </p>
          {dean.degree ? (
            <p className="mt-1 text-sm italic leading-6 text-slate">
              {dean.degree}
            </p>
          ) : null}
          <p className="mt-3 text-sm">
            <ExternalLink
              href={facultyLink}
              newTabNote={dict.ui.opensInNewTab}
              className="text-slate hover:text-navy"
            >
              {t.facultyCta}
            </ExternalLink>
          </p>
        </div>
      </div>
    </section>
  );
}
