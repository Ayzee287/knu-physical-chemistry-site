import { ExternalLink } from "@/components/ui/external-link";
import { ReviewMark } from "@/components/ui/review-mark";
import { getContact } from "@content/contacts/contacts";
import type { Locale, Dictionary } from "@/lib/i18n";

/**
 * The department's contact record: departmental phone/email (v3 profile),
 * the building address, faculty-level fallback channels, and the official
 * sites of record. Every fact renders with its provenance mark in review mode.
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
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        {/* h2 labels (eyebrow-scale, like /staff): the page outline is
            h1 → one h2 per contact record. */}
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
      </div>

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

      <div>
        <h2 className="text-xs uppercase tracking-[0.18em] text-copper">
          {labels.official}
        </h2>
        <ul className="mt-3 space-y-2.5">
          {contact.links.map((link) => (
            <li key={link.id}>
              <ExternalLink
                href={link.url}
                newTabNote={dict.ui.opensInNewTab}
                className="text-sm text-navy hover:text-slate"
              >
                {link.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
