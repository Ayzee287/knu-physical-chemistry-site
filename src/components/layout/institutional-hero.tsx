import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ReviewMark } from "@/components/ui/review-mark";
import type { Provenance } from "@/lib/provenance";

type HeroCta = { label: string; href: string };
export type HeroFact = { label: string; value: string; provenance?: Provenance };

/**
 * Institutional masthead on the deep `ink` surface — the site's one
 * deliberately atmospheric moment. Composition: an editorial title block
 * (eyebrow → masthead title → serif statement → lead → CTAs) beside an
 * institutional fact rail whose keystone is the department's strongest single
 * fact (the founding year), set as a large serif numeral.
 *
 * Identity is carried by typography, hairlines and one copper accent — no
 * imagery, no gradients. Motion is limited to the composed arrival (the
 * masthead column leads, the nameplate rule is struck, the fact rail follows
 * a beat later — ADR-0007) plus the shared hover devices. When real
 * photography arrives, it belongs in the page sections below, not here: the
 * masthead stays typographic.
 */
export function InstitutionalHero({
  eyebrow,
  title,
  statement,
  lead,
  primary,
  secondary,
  keystone,
  facts,
}: {
  eyebrow: string;
  /** Masthead line — the institution's name, not a slogan. */
  title: string;
  /** Serif-italic editorial statement under the masthead. */
  statement: string;
  lead: string;
  primary: HeroCta;
  secondary?: HeroCta;
  /** The focal fact, set large (e.g. founding year). */
  keystone?: HeroFact;
  facts: HeroFact[];
}) {
  return (
    <section className="dark-surface bg-ink text-ivory">
      <Container>
        <div className="grid gap-x-16 gap-y-12 pb-16 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:pb-24 lg:pt-28">
          {/* Title block */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-copper/80" />
              <p className="text-xs uppercase tracking-[0.22em] text-sand/70">
                {eyebrow}
              </p>
            </div>
            {/* Masthead rule — the print-nameplate cue, struck once left to
                right as the page arrives. A single hairline: the former
                double rule read as a redundant double divider in real
                browsing (operator review, ADR-0007). */}
            <div
              aria-hidden
              className="motion-rule-draw mt-8 border-t border-ivory/25"
            />
            <h1 className="mt-7 text-balance font-serif text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-pretty font-serif text-xl italic leading-snug text-sand/90 sm:text-2xl">
              {statement}
            </p>
            <p className="mt-6 max-w-xl text-pretty leading-7 text-sand/75">
              {lead}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium">
              {/* btn-fill: the ivory plate rises into the bordered frame on
                  hover/focus (motion.css) — the button becomes active rather
                  than switching. */}
              <Link
                href={primary.href}
                className="btn-fill border border-ivory/80 px-6 py-3 hover:text-ink"
              >
                {primary.label}
              </Link>
              {secondary ? (
                <Link
                  href={secondary.href}
                  className="inline-flex items-center gap-2 py-3 text-sand/85 hover:text-ivory"
                >
                  <span className="link-underline">{secondary.label}</span>
                  <span aria-hidden className="link-arrow">
                    →
                  </span>
                </Link>
              ) : null}
            </div>
          </div>

          {/* Institutional fact rail — arrives one beat after the masthead
              column (motion-hero-rail): a composed presentation, not a
              simultaneous render. */}
          <dl className="motion-hero-rail grid content-start gap-x-8 sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-ivory/15 lg:pl-10">
            {keystone ? (
              <div className="border-t border-ivory/15 py-5 sm:col-span-2 lg:col-span-1 lg:border-t-0 lg:pt-0">
                <dt className="text-xs uppercase tracking-[0.18em] text-sand/55">
                  {keystone.label}
                </dt>
                <dd className="mt-2 font-serif text-5xl font-medium tabular-nums text-ivory sm:text-6xl">
                  {keystone.value}
                  {keystone.provenance ? (
                    <ReviewMark provenance={keystone.provenance} />
                  ) : null}
                </dd>
              </div>
            ) : null}
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-ivory/15 py-5">
                <dt className="text-xs uppercase tracking-[0.18em] text-sand/55">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-sand/90">
                  {fact.value}
                  {fact.provenance ? (
                    <ReviewMark provenance={fact.provenance} />
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
