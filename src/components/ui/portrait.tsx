import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/lib/images";

/**
 * The single portrait treatment of the site: a fixed 3:4 plate rendering a
 * registered local photograph as a gently muted colour print.
 *
 * Render contract (ADR-0009, supersedes the D021 all-or-none section rule):
 * portraits are progressive enhancement — a plate mounts ONLY where a
 * registered asset exists; records without one use the photo-less layout.
 * Reserved frames / "photo coming" placeholders are abolished, so `image`
 * is required here and the conditional lives at the call site.
 *
 * Presentation contract (ADR-0011, supersedes ADR-0010 clause 3): the
 * hairline frame stays — it is the same `border-navy/10` rule as the page
 * grid, and it contains light photo edges that would otherwise dissolve into
 * the ivory paper (frameless REJECTED; corner registration marks REJECTED —
 * that was the retired absence device). The grading is the integration layer
 * but it is now COLOUR, not monochrome: full desaturation read as archival
 * and funerary and drained the people of presence. The colour is restored and
 * pulled back a little — `saturate-[0.85]` (≈15% down) with a barely-there
 * `contrast-[0.97]` — so portraits read like a printed university brochure
 * (warm, alive, one register) rather than social-media profiles (raw colour
 * casts) or a memorial wall (full monochrome). The treatment lives only here:
 * one shared layer, no per-image filter overrides in the registry.
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
        className="motion-image-fade object-cover saturate-[0.85] contrast-[0.97]"
        style={image.position ? { objectPosition: image.position } : undefined}
      />
    </div>
  );
}
