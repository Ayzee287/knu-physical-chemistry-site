/**
 * Archival century rule — a hairline timeline with serif year markers, one
 * tick per era of the department's record. A quiet, print-atlas device: it
 * lets a reader FEEL the span 1905 → today without a single sentence. Years
 * come from the history collection (real period starts), never invented.
 *
 * Mobile shows only the era-defining ticks (`compact: false` entries hide);
 * desktop shows the full record.
 */
export function CenturyRule({
  years,
  className = "",
}: {
  /** Period start years in order; `major` ticks survive on small screens. */
  years: Array<{ year: string; major?: boolean }>;
  className?: string;
}) {
  return (
    <ol
      aria-label={years.map((y) => y.year).join(" · ")}
      className={`flex justify-between border-t border-navy/15 ${className}`}
    >
      {years.map((item, i) => (
        <li
          key={item.year}
          className={`relative pt-3.5 ${item.major ? "flex" : "hidden sm:flex"}`}
        >
          <span
            aria-hidden
            className="absolute top-0 h-2.5 w-px bg-copper/70"
          />
          <span
            className={`font-serif text-sm tabular-nums leading-none ${
              i === 0 ? "text-copper" : "text-slate/80"
            }`}
          >
            {item.year}
          </span>
        </li>
      ))}
    </ol>
  );
}
