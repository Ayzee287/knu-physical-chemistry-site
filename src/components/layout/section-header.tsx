/**
 * Editorial section opener: small-caps eyebrow over a hairline, serif title,
 * optional lead held to a comfortable reading measure. The single way a section
 * announces itself across the site.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4">
        <p className="text-xs uppercase tracking-[0.2em] text-copper">
          {eyebrow}
        </p>
        <span aria-hidden className="h-px flex-1 bg-navy/10" />
      </div>
      <h2 className="mt-4 text-balance font-serif text-3xl font-medium leading-tight tracking-tight text-navy sm:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-xl text-pretty leading-7 text-slate">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
