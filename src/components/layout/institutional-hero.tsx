import Link from "next/link";
import { Container } from "@/components/layout/container";

type HeroCta = { label: string; href: string };
type HeroMeta = { label: string; value: string };

/**
 * Full-bleed institutional opening on the deep `ink` surface — the one
 * deliberately atmospheric moment of the site. Identity is carried by
 * typography and a copper hairline, not by imagery or animation; the meta rail
 * grounds the statement in institutional fact.
 */
export function InstitutionalHero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  meta,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  primary: HeroCta;
  secondary?: HeroCta;
  meta: HeroMeta[];
}) {
  return (
    <section className="bg-ink text-ivory">
      <Container>
        <div className="max-w-3xl pb-16 pt-20 sm:pt-24 lg:pb-20 lg:pt-32">
          <div className="flex items-center gap-4">
            <p className="text-xs uppercase tracking-[0.2em] text-sand/70">
              {eyebrow}
            </p>
            <span aria-hidden className="h-px w-16 bg-copper/70" />
          </div>
          <h1 className="mt-6 text-balance font-serif text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-sand/85">
            {lead}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium">
            <Link
              href={primary.href}
              className="border border-ivory/80 px-6 py-3 transition-colors hover:bg-ivory hover:text-ink"
            >
              {primary.label}
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="group inline-flex items-center gap-2 text-sand/85 transition-colors hover:text-ivory"
              >
                {secondary.label}
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            ) : null}
          </div>
        </div>

        <dl className="grid gap-6 border-t border-ivory/15 py-8 sm:grid-cols-3 sm:gap-8">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-xs uppercase tracking-[0.18em] text-sand/55">
                {item.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-sand/90">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
