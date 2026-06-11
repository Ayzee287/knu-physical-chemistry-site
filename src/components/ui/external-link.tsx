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
    /* Inline flow (not flex) so the label's underline device clones under
       every line if the link wraps; the ↗ nudge and underline growth come
       from the shared device rules in motion.css. */
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      <span className="link-underline">{children}</span>
      <span aria-hidden="true" className="link-arrow-ext ml-1 text-[0.8em]">
        ↗
      </span>
      <span className="sr-only">({newTabNote})</span>
    </a>
  );
}
