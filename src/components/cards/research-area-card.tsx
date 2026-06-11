import Link from "next/link";
import { ReviewMark } from "@/components/ui/review-mark";
import type { LocalisedResearchArea } from "@/types/content";

/**
 * Research direction entry — an indexed editorial row, not a floating card.
 * Hairline-separated rows keep research reading like a programme document
 * rather than a marketing grid. Topics render as a restrained keyword line;
 * with `href` the title becomes a link (used on the homepage digest).
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
      className="grid scroll-mt-24 gap-x-8 gap-y-3 border-t border-navy/10 py-8 sm:grid-cols-[3.5rem_1fr] lg:py-10"
    >
      <p
        aria-hidden
        className="font-serif text-lg tabular-nums leading-snug text-copper/80"
      >
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="max-w-2xl">
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
        {area.topics.length > 0 ? (
          <p className="mt-3 text-sm leading-6 text-slate/90">
            {area.topics.map((topic, i) => (
              <span key={topic}>
                {i > 0 ? (
                  <span aria-hidden className="mx-2 text-copper/60">
                    ·
                  </span>
                ) : null}
                {topic}
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </article>
  );
}
