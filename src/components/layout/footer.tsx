import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ExternalLink } from "@/components/ui/external-link";
import { ReviewMark } from "@/components/ui/review-mark";
import { getContact } from "@content/contacts/contacts";
import { founded } from "@content/history/history";
import { site } from "@/content/site";
import { href, type Locale, type Dictionary } from "@/lib/i18n";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const contact = getContact(lang);

  return (
    <footer className="border-t border-navy/10 bg-ivory">
      <Container>
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            {/* Footer identity line — rendered from the brand block (the one
                place the full brand name appears as identity, closing the
                former dict.brand.full orphan). Slightly larger serif than the
                body columns: the page should END on the institution's name. */}
            <p className="font-serif text-xl text-navy">{dict.brand.full}</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate">
              {site.faculty[lang]} · {site.university[lang]}
            </p>
            <address className="mt-5 text-sm not-italic leading-6 text-slate">
              {contact.address.value.map((line, i) => (
                <span key={line} className="block">
                  {line}
                  {i === contact.address.value.length - 1 && (
                    <ReviewMark provenance={contact.address.provenance} />
                  )}
                </span>
              ))}
              {/* inline-block (between block siblings): the underline device
                  hugs the address text instead of the full column width. */}
              <a
                href={`mailto:${contact.email.value}`}
                className="link-underline mt-1 inline-block hover:text-navy"
              >
                {contact.email.value}
              </a>
              <ReviewMark provenance={contact.email.provenance} />
              <span className="block">
                {contact.phone.value}
                <ReviewMark provenance={contact.phone.provenance} />
              </span>
            </address>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate">
              {dict.footer.navTitle}
            </p>
            <ul className="mt-4 space-y-2.5">
              {dict.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(lang, item.href)}
                    className="link-underline text-sm text-slate hover:text-navy"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate">
              {dict.footer.officialTitle}
            </p>
            <ul className="mt-4 space-y-2.5">
              {contact.links.map((link) => (
                <li key={link.id}>
                  <ExternalLink
                    href={link.url}
                    newTabNote={dict.ui.opensInNewTab}
                    className="text-sm text-slate hover:text-navy"
                  >
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-navy/10 py-6 text-xs text-slate sm:flex-row sm:justify-between">
          <span>
            {site.department[lang]} · {dict.footer.founded}
            <ReviewMark provenance={founded.provenance} />
          </span>
          <span>{site.location[lang]}</span>
        </div>
      </Container>
    </footer>
  );
}
