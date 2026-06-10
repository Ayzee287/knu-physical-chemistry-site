/**
 * Editorial epigraph: a serif statement set off by a copper rule. Use ONLY for
 * original editorial framing or quotes with confirmed attribution — never
 * fabricate or loosely attribute quotations (see AGENTS.md). `cite` is optional
 * precisely so unattributed editorial statements stay honest.
 */
export function QuoteBlock({ text, cite }: { text: string; cite?: string }) {
  return (
    <blockquote className="border-l-2 border-copper/70 pl-6 sm:pl-8">
      <p className="text-pretty font-serif text-2xl font-medium italic leading-snug text-navy sm:text-[1.7rem]">
        {text}
      </p>
      {cite ? (
        <footer className="mt-4 text-sm uppercase tracking-[0.14em] text-slate">
          — {cite}
        </footer>
      ) : null}
    </blockquote>
  );
}
