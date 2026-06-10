import { ReviewMark } from "@/components/ui/review-mark";
import type { LocalisedResearchArea } from "@/types/content";

/**
 * Research direction entry — an indexed editorial row, not a floating card.
 * Hairline-separated rows keep the research page reading like a programme
 * document rather than a marketing grid.
 */
export function ResearchAreaCard({
  area,
  index,
}: {
  area: LocalisedResearchArea;
  index: number;
}) {
  return (
    <article
      id={area.id}
      className="grid gap-4 border-t border-navy/10 py-8 sm:grid-cols-[4rem_1fr] sm:gap-8"
    >
      <p
        aria-hidden
        className="font-serif text-lg tabular-nums leading-snug text-navy/35"
      >
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="max-w-2xl">
        <h3 className="font-serif text-2xl font-medium leading-snug text-navy">
          {area.title}
          <ReviewMark provenance={area.provenance} />
        </h3>
        <p className="mt-3 text-pretty leading-7 text-slate">{area.summary}</p>
      </div>
    </article>
  );
}
