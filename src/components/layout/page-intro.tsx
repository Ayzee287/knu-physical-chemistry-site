import { Container } from "@/components/layout/container";

/** Standard sub-page opening: eyebrow, serif H1, lead in reading measure. */
export function PageIntro({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <Container>
      <div className="max-w-3xl pt-16 sm:pt-20 lg:pt-24">
        <p className="text-xs uppercase tracking-[0.2em] text-copper">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-balance font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy sm:text-5xl">
          {title}
        </h1>
        {/* max-w-xl keeps the lead inside a comfortable reading measure
            (~65–70 characters) under the wider title. */}
        <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-slate">
          {lead}
        </p>
      </div>
    </Container>
  );
}
