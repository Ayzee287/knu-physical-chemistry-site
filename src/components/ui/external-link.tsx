import type { AnchorHTMLAttributes } from "react";

/**
 * The single way an external link renders on the site. External references
 * (official departmental, faculty and university sites) are supplementary
 * authority cues — they open in a new tab, carry safe rel attributes, and are
 * marked with a restrained ↗ glyph so the departure from the site is visible.
 *
 * `newTabNote` is the localised screen-reader-only hint ("opens in a new tab");
 * pass `dict.ui.opensInNewTab` from the calling component.
 */
export function ExternalLink({
  href,
  newTabNote,
  children,
  className = "",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  newTabNote: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/ext inline-flex items-baseline gap-1 ${className}`}
      {...rest}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="text-[0.8em] transition-transform duration-200 group-hover/ext:-translate-y-px group-hover/ext:translate-x-px"
      >
        ↗
      </span>
      <span className="sr-only">({newTabNote})</span>
    </a>
  );
}
