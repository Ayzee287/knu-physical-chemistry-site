import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/lib/images";

/**
 * The single portrait treatment of the site: a fixed 3:4 plate rendering a
 * registered local photograph as an archival monochrome print.
 *
 * Render contract (ADR-0009, supersedes the D021 all-or-none section rule):
 * portraits are progressive enhancement — a plate mounts ONLY where a
 * registered asset exists; records without one use the photo-less layout.
 * Reserved frames / "photo coming" placeholders are abolished, so `image`
 * is required here and the conditional lives at the call site.
 *
 * Presentation contract (ADR-0010): the hairline frame stays — it is the
 * same `border-navy/10` rule as the page grid, and it contains light photo
 * edges that would otherwise dissolve into the ivory paper (frameless
 * REJECTED; corner registration marks REJECTED — that was the retired
 * absence device). The grayscale grading is the integration layer: the
 * official source set spans several photographic genres and colour casts,
 * and a uniform monochrome print is what makes mixed-grade portraits read
 * as one institutional register instead of pasted-in colour photos.
 *
 * Width comes from the caller (`className`, e.g. "w-24 sm:w-32"); the aspect
 * ratio is fixed here so every portrait crops identically and mixed
 * photo/photo-less rows stay calm. Pass `alt=""` when the person's name is
 * adjacent in the document flow.
 */
export function Portrait({
  image,
  alt = "",
  className,
  sizes = "(min-width: 640px) 8rem, 6rem",
}: {
  image: SiteImage;
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
      <Image
        src={image.src}
        alt={alt}
        fill
        sizes={sizes}
        className="motion-image-fade object-cover grayscale"
        style={image.position ? { objectPosition: image.position } : undefined}
      />
    </div>
  );
}
