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
 * photograph; without one it renders an intentional, captioned reserved zone —
 * a matted frame awaiting photography — so missing imagery never looks broken.
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
        // Architectural mat frame — signals a designed, reserved plate, not an empty box.
        <span
          aria-hidden
          className="pointer-events-none absolute inset-4 bottom-[3.25rem] border border-navy/[0.07]"
        />
      )}
      {index && !image ? (
        <span className="absolute left-7 top-7 font-serif text-sm tabular-nums text-navy/40">
          {index}
        </span>
      ) : null}
      <figcaption className="absolute inset-x-0 bottom-0 border-t border-navy/10 bg-ivory px-5 py-3 text-xs uppercase leading-tight tracking-[0.16em] text-slate break-words">
        {caption}
      </figcaption>
    </figure>
  );
}
