/**
 * Editorial section opener: small-caps eyebrow over a hairline, serif title,
 * optional lead held to a comfortable reading measure. The single way a
 * section announces itself across the site. `tone="dark"` adapts it to the
 * site's deep surfaces (ink/navy bands).
 *
 * `size` (ADR-0015) selects the two places a section header can stand:
 *
 *   "band" (default) — the header runs across the top of a full-width band and
 *                      carries band-scale type (3xl → 4xl).
 *   "rail"           — the header stands in a `SectionSpread` margin rail. It
 *                      holds one size (3xl) and drops the responsive bump: in a
 *                      19rem column the larger step wraps to four lines and
 *                      starts competing with the page h1 instead of subordinating
 *                      to it. The trailing hairline stops at the rail edge, which
 *                      is what turns the header into a margin marker rather than
 *                      a banner.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "light",
  size = "band",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  size?: "band" | "rail";
}) {
  const dark = tone === "dark";
  const rail = size === "rail";
  return (
    <div className={rail ? undefined : "max-w-3xl"}>
      <div className="flex items-center gap-4">
        <p
          className={`text-xs uppercase tracking-[0.2em] ${
            dark ? "text-sand/70" : "text-copper"
          }`}
        >
          {eyebrow}
        </p>
        <span
          aria-hidden
          className={`h-px flex-1 ${dark ? "bg-ivory/15" : "bg-navy/10"}`}
        />
      </div>
      <h2
        className={`mt-5 text-balance font-serif font-medium leading-tight tracking-tight ${
          rail ? "text-3xl" : "text-3xl sm:text-4xl"
        } ${dark ? "text-ivory" : "text-navy"}`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-4 text-pretty leading-7 ${rail ? "text-sm" : "max-w-xl"} ${
            dark ? "text-sand/80" : "text-slate"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
