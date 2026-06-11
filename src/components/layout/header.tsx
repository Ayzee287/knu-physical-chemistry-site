"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/container";
import { href, locales, type Locale, type Dictionary } from "@/lib/i18n";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname() || `/${lang}`;
  // Path without the locale prefix, e.g. "/ua/research" → "/research".
  const rest = pathname.replace(/^\/(ua|en)(?=\/|$)/, "");

  const isActive = (path: string) =>
    rest === path || (path !== "" && rest.startsWith(`${path}/`));

  // The header lives in a persistent layout, so an open mobile <details> menu
  // would survive client-side navigation and keep covering the new page.
  // Close it whenever the route changes.
  const menuRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    menuRef.current?.removeAttribute("open");
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-ivory">
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Brand is an identity mark, not a nav item — color shift only,
              no underline device (ADR-0007 exception). */}
          <Link
            href={href(lang, "/")}
            className="font-serif text-lg tracking-tight text-navy hover:text-slate"
          >
            {dict.brand.short}
          </Link>

          <div className="flex items-center gap-6 lg:gap-8">
            <nav className="hidden lg:block" aria-label={dict.ui.primaryNav}>
              <ul className="flex items-center gap-6 text-sm text-slate lg:gap-7">
                {dict.nav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      {/* The shared underline device: grows on hover/focus,
                          stays in place under aria-current (the [aria-current]
                          rule in motion.css). pb-1 sets the underline offset. */}
                      <Link
                        href={href(lang, item.href)}
                        aria-current={active ? "page" : undefined}
                        className={`link-underline pb-1 ${
                          active ? "text-navy" : "hover:text-navy"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Language switcher — preserves the current page */}
            <nav
              aria-label={dict.ui.languageNav}
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.12em] lg:flex"
            >
              {locales.map((loc, i) => (
                <span key={loc} className="flex items-center gap-2">
                  {i > 0 ? <span className="text-navy/25">/</span> : null}
                  {/* Active locale is a static current-state marker (D015);
                      the inactive one carries the shared underline device. */}
                  <Link
                    href={`/${loc}${rest}`}
                    aria-current={loc === lang ? "true" : undefined}
                    className={
                      loc === lang
                        ? "text-navy"
                        : "link-underline text-slate hover:text-navy"
                    }
                  >
                    {loc === "ua" ? "UA" : "EN"}
                  </Link>
                </span>
              ))}
            </nav>

            {/* Mobile */}
            <details ref={menuRef} className="group relative lg:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm text-navy hover:text-slate [&::-webkit-details-marker]:hidden">
                {dict.ui.menu}
                <span
                  aria-hidden
                  className="text-[0.55rem] text-slate transition-transform duration-200 ease-settle group-open:rotate-180"
                >
                  ▼
                </span>
              </summary>
              {/* motion-menu-enter: the panel surfaces when the disclosure
                  opens (fade + 4px drop) instead of toggling into view. Touch
                  rows keep color + press feedback only — a block-level
                  underline would span the panel, not the label. */}
              <nav
                aria-label={dict.ui.primaryNav}
                className="motion-menu-enter absolute right-0 top-full mt-3 w-56 border border-navy/10 bg-ivory p-2 shadow-lg shadow-navy/[0.08]"
              >
                <ul className="flex flex-col">
                  {dict.nav.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={href(lang, item.href)}
                          aria-current={active ? "page" : undefined}
                          className={`block px-3 py-2.5 text-sm ${
                            active
                              ? "font-medium text-navy"
                              : "text-slate hover:text-navy"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="mt-1 flex gap-4 border-t border-navy/10 px-3 pt-3 text-xs uppercase tracking-[0.12em]">
                    {locales.map((loc) => (
                      <Link
                        key={loc}
                        href={`/${loc}${rest}`}
                        className={
                          loc === lang
                            ? "text-navy"
                            : "text-slate hover:text-navy"
                        }
                      >
                        {loc === "ua" ? "UA" : "EN"}
                      </Link>
                    ))}
                  </li>
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </Container>
    </header>
  );
}
