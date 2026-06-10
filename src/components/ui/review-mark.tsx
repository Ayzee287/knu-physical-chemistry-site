import {
  isReviewMode,
  STATE_LABELS,
  STATE_TAGS,
  type Provenance,
} from "@/lib/provenance";

/**
 * Inline provenance marker for editors. Renders a small tag next to any claim
 * whose trust state is not "verified", so unverified facts and placeholders are
 * obvious during review. It is gated by isReviewMode(): in production builds it
 * renders nothing, so it never reaches the public site.
 *
 * Intentionally outside the institutional palette (amber, not navy/slate) — it
 * reads as tooling, not as content.
 */
export function ReviewMark({ provenance }: { provenance: Provenance }) {
  if (!isReviewMode()) return null;
  if (provenance.state === "verified") return null;

  const { state, source, retrieved, note } = provenance;
  const title = [
    STATE_LABELS[state],
    source && `source: ${source}`,
    retrieved && `retrieved: ${retrieved}`,
    note,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <sup
      data-review-mark={state}
      title={title}
      aria-hidden="true"
      className="ms-1 select-none align-super whitespace-nowrap rounded-sm border border-amber-600/40 bg-amber-50 px-1 py-px text-[0.5625rem] font-medium uppercase tracking-wide leading-none text-amber-700/90"
    >
      {STATE_TAGS[state]}
    </sup>
  );
}
