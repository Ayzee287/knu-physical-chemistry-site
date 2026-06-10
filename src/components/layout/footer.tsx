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
            <p className="font-serif text-lg text-navy">
              {site.department[lang]}
            </p>
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
              <a
                href={`mailto:${contact.email.value}`}
                className="mt-1 block transition-colors hover:text-navy"
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
                  <a
                    href={href(lang, item.href)}
                    className="text-sm text-slate transition-colors hover:text-navy"
                  >
                    {item.label}
                  </a>
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
                    className="text-sm text-slate transition-colors hover:text-navy"
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
