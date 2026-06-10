import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/lib/images";
import type { Locale } from "@/lib/i18n";

type FigureProps = {
  /** Subject label shown in the caption bar — reads as a documentary figure caption. */
  caption: string;
  /** Registered local image; when absent the figure renders as a reserved plate. */
  image?: SiteImage;
  lang: Locale;
  /** Optional plate index, e.g. "01". */
  index?: string;
  /** Tailwind aspect-ratio class. */
  ratio?: string;
  className?: string;
};

/**
 * Documentary plate. With a registered image it renders an optimised local
 * photograph; without one it renders an intentional archival reserve: corner
 * registration marks (a print-production cue) and a serif plate index inside
 * a captioned frame. The absence reads as "plate reserved in the record",
 * not "image missing" — and real photography drops in without layout shift.
 */
export function Figure({
  caption,
  image,
  lang,
  index,
  ratio = "aspect-[4/3]",
  className,
}: FigureProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden border border-navy/10 bg-navy/[0.04] transition-colors hover:border-navy/20",
        ratio,
        className,
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt[lang]}
          width={image.width}
          height={image.height}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        // Archival reserve: four registration marks at the plate corners.
        <span aria-hidden className="pointer-events-none">
          <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-navy/25" />
          <span className="absolute right-4 top-4 h-3 w-3 border-r border-t border-navy/25" />
          <span className="absolute bottom-[4.25rem] left-4 h-3 w-3 border-b border-l border-navy/25" />
          <span className="absolute bottom-[4.25rem] right-4 h-3 w-3 border-b border-r border-navy/25" />
        </span>
      )}
      {index && !image ? (
        <span className="absolute left-7 top-7 font-serif text-sm tabular-nums text-navy/45">
          {index}
        </span>
      ) : null}
      <figcaption className="absolute inset-x-0 bottom-0 border-t border-navy/10 bg-ivory px-5 py-3 text-xs uppercase leading-tight tracking-[0.16em] text-slate break-words">
        {caption}
      </figcaption>
    </figure>
  );
}
