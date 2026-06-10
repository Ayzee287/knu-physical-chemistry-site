/**
 * Editorial section opener: small-caps eyebrow over a hairline, serif title,
 * optional lead held to a comfortable reading measure. The single way a
 * section announces itself across the site. `tone="dark"` adapts it to the
 * site's deep surfaces (ink/navy bands).
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="max-w-3xl">
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
        className={`mt-5 text-balance font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl ${
          dark ? "text-ivory" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-4 max-w-xl text-pretty leading-7 ${
            dark ? "text-sand/80" : "text-slate"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
