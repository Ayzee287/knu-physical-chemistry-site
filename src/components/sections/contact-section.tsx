import { ExternalLink } from "@/components/ui/external-link";
import { ReviewMark } from "@/components/ui/review-mark";
import { getContact } from "@content/contacts/contacts";
import type { Locale, Dictionary } from "@/lib/i18n";

/**
 * The department's contact record — the page's UNIQUE value over the footer
 * (Task B / D025). The footer is the site-wide ambient surface: identity,
 * address, navigation, official resources. This page is the authoritative
 * record of HOW and WHO, ordered by hierarchy rather than mirrored from the
 * footer grid:
 *
 *   where  → the building address (also the footer's identity address, but
 *            here it is the page's anchor, not a chrome line);
 *   how    → the DEPARTMENT channels first (phone, head's-office mailbox) —
 *            the primary way to reach the department;
 *   who    → the FACULTY channels as the labelled fallback.
 *
 * The official-resources column was REMOVED: it duplicated the footer block
 * that renders directly below this page (D025) — the footer owns site-wide
 * external links, and /about carries them too. The address carries a "view on
 * the map" external link (OpenStreetMap, ADR-0013) — the location experience
 * is a privacy-respecting link, not an embed. Office hours are not in any
 * source, so none is invented (no "coming soon" placeholders — the
 * curation-is-deliberate posture). Every fact keeps its provenance mark in
 * review mode. Department before faculty is the whole hierarchy device — no
 * new visual element, just order and the labels that already name each tier.
 */
export function ContactSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const contact = getContact(lang);
  const labels = dict.contacts.labels;

  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
      {/* Where — the address anchors the record. h2 labels (eyebrow-scale,
          like /staff): the page outline is h1 → one h2 per contact field. */}
      <div>
        <h2 className="text-xs uppercase tracking-[0.18em] text-copper">
          {labels.address}
        </h2>
        <address className="mt-3 text-sm not-italic leading-6 text-navy">
          {contact.address.value.map((line, i) => (
            <span key={line} className="block">
              {line}
              {i === contact.address.value.length - 1 && (
                <ReviewMark provenance={contact.address.provenance} />
              )}
            </span>
          ))}
        </address>
        {/* Location experience (ADR-0013): a privacy-respecting external map
            link, not an embed. The query is the address itself — OSM geocodes
            it, so no unverified coordinates are asserted. */}
        <p className="mt-3 text-sm">
          <ExternalLink
            href={contact.mapUrl}
            newTabNote={dict.ui.opensInNewTab}
            className="text-navy hover:text-slate"
          >
            {dict.contacts.mapLabel}
          </ExternalLink>
        </p>
      </div>

      {/* How — the department's own channels, the primary way to reach it. */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xs uppercase tracking-[0.18em] text-copper">
            {labels.departmentPhone}
          </h2>
          <p className="mt-3 text-sm leading-6 text-navy">
            {contact.departmentPhone.value}
            <ReviewMark provenance={contact.departmentPhone.provenance} />
          </p>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.18em] text-copper">
            {labels.departmentEmail}
          </h2>
          <p className="mt-3 text-sm leading-6">
            <a
              href={`mailto:${contact.departmentEmail.value}`}
              className="link-underline text-navy hover:text-slate"
            >
              {contact.departmentEmail.value}
            </a>
            <ReviewMark provenance={contact.departmentEmail.provenance} />
          </p>
        </div>
      </div>

      {/* Who — the faculty channels, the institutional fallback (labelled). */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xs uppercase tracking-[0.18em] text-copper">
            {labels.phone}
          </h2>
          <p className="mt-3 text-sm leading-6 text-navy">
            {contact.phone.value}
            <ReviewMark provenance={contact.phone.provenance} />
          </p>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.18em] text-copper">
            {labels.email}
          </h2>
          <p className="mt-3 text-sm leading-6">
            <a
              href={`mailto:${contact.email.value}`}
              className="link-underline text-navy hover:text-slate"
            >
              {contact.email.value}
            </a>
            <ReviewMark provenance={contact.email.provenance} />
          </p>
        </div>
      </div>
    </div>
  );
}
