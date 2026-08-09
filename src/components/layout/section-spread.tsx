import type { ReactNode } from "react";

/**
 * The page's desktop composition (ADR-0015): a section is set as an editorial
 * SPREAD — its identity in a left margin rail, its record in the wide column
 * beside it.
 *
 * The problem this solves. Every list on the site was a single left-aligned
 * column of prose measure (`max-w-2xl`/`max-w-3xl`) inside a 75rem container,
 * with the section header stacked above it in the same narrow measure. On a
 * desktop viewport that left roughly 40% of every line — every row, on every
 * page — as dead paper, and it made five consecutive sections read as one
 * undifferentiated ribbon. The site was set as a phone page rendered wide.
 *
 * The rail is how an academic publication has always solved this: running heads
 * and apparatus live in the margin, the record lives in the measure. It uses
 * the width without inflating the type, and it gives the reader a fixed place
 * to look for "where am I".
 *
 * The rail is STICKY. This is the section's quietest interaction and the one
 * that does the most work: the section's identity holds in the margin while its
 * rows travel past, so a long register never loses its heading and the page
 * acquires two planes of movement from a single CSS property — no JavaScript,
 * no scroll listener, no reflow. `--rail-top` (globals.css) clears the sticky
 * masthead at both header heights.
 *
 * Below `lg` the spread collapses to the original stack: header, then record.
 * Nothing about the mobile composition changes.
 */
export function SectionSpread({
  header,
  children,
}: {
  /** Usually a `<SectionHeader>` — anything that names the section. */
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-x-16">
      <div className="lg:sticky lg:top-[var(--rail-top)] lg:self-start">
        {header}
      </div>
      <div className="mt-10 lg:mt-0">{children}</div>
    </div>
  );
}
