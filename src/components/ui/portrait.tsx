import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/lib/images";

/**
 * The single portrait treatment of the site: a fixed 3:4 plate that renders a
 * registered local photograph, or — until one is cleared — an archival
 * reserve with corner registration marks, matching the Figure language.
 *
 * Width comes from the caller (`className`, e.g. "w-24 sm:w-32"); the aspect
 * ratio is fixed here so real photography drops in with zero layout shift.
 * Pass `alt=""` when the person's name is adjacent in the document flow.
 */
export function Portrait({
  image,
  alt = "",
  className,
  sizes = "(min-width: 640px) 8rem, 6rem",
}: {
  image?: SiteImage;
  alt?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[3/4] overflow-hidden border border-navy/10 bg-navy/[0.04]",
        className,
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      ) : (
        <span aria-hidden className="pointer-events-none">
          <span className="absolute left-2 top-2 h-2 w-2 border-l border-t border-navy/25" />
          <span className="absolute right-2 top-2 h-2 w-2 border-r border-t border-navy/25" />
          <span className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-navy/25" />
          <span className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-navy/25" />
        </span>
      )}
    </div>
  );
}
