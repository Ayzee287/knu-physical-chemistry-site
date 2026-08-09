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
 * review mode.
 *
 * Composition (ADR-0015). That hierarchy was documented above and then rendered
 * as three EQUAL columns of identical 14px type — address, department, faculty
 * read as peers, and "department before faculty" survived only as reading order,
 * which no one reads in a three-column grid. The tiers are now stated:
 *
 *   the address is the page's anchor and is set at serif display scale;
 *   the department's own channels are set large, as the answer to "how";
 *   the faculty channels stand in the margin, quieter, behind their hairline —
 *   present, labelled, and visibly the fallback.
 *
 * No fact was added, removed, reworded or re-attributed; only the scale and the
 * position changed. The phone numbers are `tel:` links now, which they always
 * should have been on the surface whose entire purpose is being contacted.
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
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] lg:gap-x-16">
      <div>
        {/* Where — the address anchors the record, so it is set at the scale of
            an anchor. h2 labels (eyebrow-scale, like /staff): the page outline
            is h1 → one h2 per contact field. */}
        <section>
          <div className="flex items-center gap-4">
            <h2 className="text-xs uppercase tracking-[0.18em] text-copper">
              {labels.address}
            </h2>
            <span aria-hidden className="h-px flex-1 bg-navy/10" />
          </div>
          <address className="mt-5 font-serif text-2xl not-italic leading-snug text-navy sm:text-3xl">
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
          <p className="mt-5 text-sm">
            <ExternalLink
              href={contact.mapUrl}
              newTabNote={dict.ui.opensInNewTab}
              className="font-medium text-navy hover:text-slate"
            >
              {dict.contacts.mapLabel}
            </ExternalLink>
          </p>
        </section>

        {/* How — the department's own channels, the primary way to reach it. */}
        <div className="mt-12 grid gap-8 border-t border-navy/15 pt-8 sm:grid-cols-2 sm:gap-10">
          <section>
            <h2 className="text-xs uppercase tracking-[0.18em] text-copper">
              {labels.departmentPhone}
            </h2>
            <p className="mt-3 text-lg leading-7 text-navy">
              <a
                href={`tel:${contact.departmentPhone.value.replace(/[^+\d]/g, "")}`}
                className="link-underline hover:text-slate"
              >
                {contact.departmentPhone.value}
              </a>
              <ReviewMark provenance={contact.departmentPhone.provenance} />
            </p>
          </section>
          <section>
            <h2 className="text-xs uppercase tracking-[0.18em] text-copper">
              {labels.departmentEmail}
            </h2>
            <p className="mt-3 break-words text-lg leading-7">
              <a
                href={`mailto:${contact.departmentEmail.value}`}
                className="link-underline text-navy hover:text-slate"
              >
                {contact.departmentEmail.value}
              </a>
              <ReviewMark provenance={contact.departmentEmail.provenance} />
            </p>
          </section>
        </div>
      </div>

      {/* Who — the faculty channels, the institutional fallback. Set in the
          margin behind the margin's hairline and one type step down: still
          published, still labelled, visibly the second answer. */}
      {/* `self-end` sets the fallback beside the department's own channels
          rather than beside the address, so the margin reads as "…and if not,
          the faculty" instead of as a third peer column. */}
      <div className="mt-12 space-y-6 border-t border-navy/10 pt-8 lg:mt-0 lg:self-end lg:border-l lg:border-t-0 lg:pb-1 lg:pl-8 lg:pt-0">
        <section>
          <h2 className="text-xs uppercase tracking-[0.18em] text-slate">
            {labels.phone}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate">
            <a
              href={`tel:${contact.phone.value.replace(/[^+\d]/g, "")}`}
              className="link-underline hover:text-navy"
            >
              {contact.phone.value}
            </a>
            <ReviewMark provenance={contact.phone.provenance} />
          </p>
        </section>
        <section>
          <h2 className="text-xs uppercase tracking-[0.18em] text-slate">
            {labels.email}
          </h2>
          <p className="mt-2 break-words text-sm leading-6">
            <a
              href={`mailto:${contact.email.value}`}
              className="link-underline text-slate hover:text-navy"
            >
              {contact.email.value}
            </a>
            <ReviewMark provenance={contact.email.provenance} />
          </p>
        </section>
      </div>
    </div>
  );
}
