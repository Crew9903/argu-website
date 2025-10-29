// src/components/nav/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname() || `/${locale}`;

  const links = [
    { href: `/${locale}`, key: "home", label: t("home") },
    { href: `/${locale}/about`, key: "about", label: t("about") },
    { href: `/${locale}/archive`, key: "archive", label: t("archive") },
    { href: `/${locale}/services`, key: "services", label: t("services") },
  ];

  const locales = ["es", "en", "de"] as const;

  // close on route / locale change
  useEffect(() => setOpen(false), [pathname, locale]);

  // helper: active link styling
  const isActive = (href: string) => {
    // exact match for home; startsWith for sections
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  // compute same-path link for locale switcher
  const pathWithoutLocale = pathname.replace(/^\/(es|en|de)/, "") || "";
  const pathFor = (lc: string) => `/${lc}${pathWithoutLocale}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-14 flex items-center gap-4">
        {/* Desktop nav (left-aligned) */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className={`text-sm hover:text-white ${
                isActive(l.href) ? "text-white" : "text-white/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Push locale switcher to the far right on desktop */}
        <div className="hidden md:flex items-center gap-2 ml-auto text-xs">
          {locales.map((lc) => (
            <Link
              key={lc}
              href={pathFor(lc)}
              className={`hover:text-white ${
                lc === locale ? "text-white" : "text-white/60"
              }`}
            >
              {lc.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Mobile burger (right) */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-white/20"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden transition-[transform,opacity] duration-200 origin-top ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
      >
        <div className="mx-2 rounded-2xl border border-white/10 bg-black/80 backdrop-blur p-3">
          <nav className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-3 rounded-lg text-base hover:bg-white/10 ${
                  isActive(l.href) ? "text-white" : "text-white/90"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-2 border-t border-white/10 pt-2 px-1">
            <div className="text-xs text-white/60 mb-1">Language</div>
            <div className="flex gap-2">
              {locales.map((lc) => (
                <Link
                  key={lc}
                  href={pathFor(lc)}
                  onClick={() => setOpen(false)}
                  className={`px-2 py-1 rounded-md border text-xs ${
                    lc === locale
                      ? "border-white/30 text-white"
                      : "border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {lc.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Tap-to-close overlay */}
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`fixed inset-0 -z-10 ${open ? "block" : "hidden"}`}
        />
      </div>
    </header>
  );
}
