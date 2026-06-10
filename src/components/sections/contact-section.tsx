import { ExternalLink } from "@/components/ui/external-link";
import { ReviewMark } from "@/components/ui/review-mark";
import { getContact } from "@content/contacts/contacts";
import type { Locale, Dictionary } from "@/lib/i18n";

/**
 * The department's contact record: faculty-level address, email and phone
 * (clearly labelled as such — see content/contacts) plus the official sites of
 * record. Every fact renders with its provenance mark in review mode.
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
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-copper">
          {labels.address}
        </p>
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
          <p className="text-xs uppercase tracking-[0.18em] text-copper">
            {labels.email}
          </p>
          <p className="mt-3 text-sm leading-6">
            <a
              href={`mailto:${contact.email.value}`}
              className="text-navy transition-colors hover:text-slate"
            >
              {contact.email.value}
            </a>
            <ReviewMark provenance={contact.email.provenance} />
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-copper">
            {labels.phone}
          </p>
          <p className="mt-3 text-sm leading-6 text-navy">
            {contact.phone.value}
            <ReviewMark provenance={contact.phone.provenance} />
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-copper">
          {labels.official}
        </p>
        <ul className="mt-3 space-y-2.5">
          {contact.links.map((link) => (
            <li key={link.id}>
              <ExternalLink
                href={link.url}
                newTabNote={dict.ui.opensInNewTab}
                className="text-sm text-navy transition-colors hover:text-slate"
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
