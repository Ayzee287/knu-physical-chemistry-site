import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { QuoteBlock } from "@/components/ui/quote-block";
import { ExternalLink } from "@/components/ui/external-link";
import { getContact } from "@content/contacts/contacts";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/about",
    title: dict.about.meta.title,
    description: dict.about.meta.description,
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const contact = getContact(lang);
  const t = dict.about;

  return (
    <main className="pb-24">
      <PageIntro
        eyebrow={t.intro.eyebrow}
        title={t.intro.title}
        lead={t.intro.lead}
      />

      <Container>
        <div className="mt-14 max-w-2xl sm:mt-16">
          <QuoteBlock text={t.epigraph} />

          <div className="mt-12 space-y-5">
            {t.body.map((paragraph) => (
              <p key={paragraph} className="text-pretty leading-7 text-slate">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 border-t border-navy/10 pt-8">
            <p className="text-xs uppercase tracking-[0.18em] text-copper">
              {t.linksTitle}
            </p>
            <ul className="mt-4 space-y-2.5">
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
      </Container>
    </main>
  );
}
