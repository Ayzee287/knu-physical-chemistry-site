/**
 * Locale template — unlike the layout, a template remounts on every route
 * render, which is exactly the scope of the page-entrance motion: the page
 * content arrives composed (opacity + 8px rise, once, ~380ms) while the
 * sticky header and footer in the persistent layout stay still.
 *
 * The motion class is defined in src/styles/motion.css (ADR-0006); this file
 * only applies it. Server component; the animation is pure CSS, so the
 * entrance works without JavaScript and never gates content.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="motion-page-enter">{children}</div>;
}
