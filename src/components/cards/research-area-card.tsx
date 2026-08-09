import Link from "next/link";
import { ReviewMark } from "@/components/ui/review-mark";
import type { LocalisedResearchArea } from "@/types/content";

/**
 * Research direction entry — an indexed editorial row, not a floating card.
 * Hairline-separated rows keep research reading like a programme document
 * rather than a marketing grid. With `href` the title becomes a link (used on
 * the homepage digest).
 *
 * Composition (ADR-0015). The row is a three-track spread at `lg`:
 *
 *   folio  │ the direction: title, then the summary at reading measure
 *          │ keywords, stacked as an index column
 *
 * Previously the topics ran on as one wrapping line of `·`-separated phrases
 * beneath the summary, inside the same narrow measure — the least scannable
 * possible setting for what is, structurally, an index. Standing them in the
 * right margin does three things at once: it uses the width the old row threw
 * away, it lets a reader scan the department's vocabulary down a column without
 * reading the prose, and it separates *apparatus* from *record* the way the
 * rest of the page now does. The separators are gone because a stacked list
 * does not need them.
 */
export function ResearchAreaCard({
  area,
  index,
  href,
  headingLevel = 3,
}: {
  area: LocalisedResearchArea;
  index: number;
  href?: string;
  /**
   * Semantic level of the area title. On /research the directions sit directly
   * under the page <h1>, so they are level 2; on the home digest they sit under
   * a section <h2>, so they stay level 3 (the default). Visual styling is
   * identical either way — this only fixes the document outline.
   */
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  const title = (
    <>
      {area.title}
      <ReviewMark provenance={area.provenance} />
    </>
  );

  return (
    <article
      id={href ? undefined : area.id}
      className="reveal row-engage grid scroll-mt-28 gap-x-8 gap-y-3 border-t border-navy/10 py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)] lg:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,13rem)] lg:gap-x-10 lg:py-10"
    >
      <p
        aria-hidden
        className="font-serif text-lg tabular-nums leading-snug text-copper/80"
      >
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="max-w-2xl lg:max-w-none">
        <Heading className="font-serif text-2xl font-medium leading-snug text-navy">
          {href ? (
            /* Inline (not flex) so the underline device clones under every
               line of a wrapped title. Hover/focus-visible parity, the
               underline growth and the arrow nudge are all driven by the
               shared device rules in motion.css. */
            <Link href={href} className="hover:text-ink">
              <span className="link-underline">{title}</span>
              <span aria-hidden className="link-arrow ml-3 text-base text-copper">
                →
              </span>
            </Link>
          ) : (
            title
          )}
        </Heading>
        <p className="mt-3 text-pretty leading-7 text-slate">{area.summary}</p>
      </div>
      {/* Keyword index. Below `lg` it returns to the measure column as a
          run-on line — a stacked column of eight words would out-shout the
          summary on a phone, where the row is already a single narrow
          measure. The hairline is the margin's own rule, drawn only where
          there is a margin to rule off. */}
      {area.topics.length > 0 ? (
        <ul className="text-sm leading-6 text-slate sm:col-start-2 lg:col-start-3 lg:row-start-1 lg:space-y-1 lg:border-l lg:border-navy/10 lg:pl-6 lg:text-xs lg:leading-5">
          {area.topics.map((topic, i) => (
            <li key={topic} className="inline lg:block">
              {i > 0 ? (
                <span aria-hidden className="mx-2 text-copper/60 lg:hidden">
                  ·
                </span>
              ) : null}
              {topic}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
