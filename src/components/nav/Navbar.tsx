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

  useEffect(() => setOpen(false), [pathname, locale]);

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  const pathWithoutLocale = pathname.replace(/^\/(es|en|de)/, "") || "";
  const pathFor = (lc: string) => `/${lc}${pathWithoutLocale}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/85 backdrop-blur border-b border-black/10">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6 h-14 flex items-center gap-4">
        {/* Desktop nav (left) */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className={`text-sm transition-colors ${
                isActive(l.href)
                  ? "text-black font-medium"
                  : "text-black/70 hover:text-black"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop locale (right) */}
        <div className="hidden md:flex items-center gap-2 ml-auto text-xs">
          {locales.map((lc) => (
            <Link
              key={lc}
              href={pathFor(lc)}
              className={`transition-colors ${
                lc === locale
                  ? "text-black"
                  : "text-black/60 hover:text-black"
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
          className="md:hidden ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-black/80 hover:text-black hover:border-black/20"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Mobile panel (absolute; doesn’t push content) */}
        <div
          className={`md:hidden absolute inset-x-0 top-14 z-50 transition-[transform,opacity] duration-200 origin-top ${
            open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
          }`}
        >
          {/* Panel card — ABOVE the overlay */}
          <div className="relative z-50 mx-2 rounded-2xl border border-black/10 bg-white/95 backdrop-blur p-3 shadow-lg pointer-events-auto">
            <nav className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-3 rounded-lg text-base transition-colors ${
                    isActive(l.href)
                      ? "text-black bg-black/5"
                      : "text-black/90 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="mt-2 border-t border-black/10 pt-2 px-1">
              <div className="text-xs text-black/60 mb-1">{t("language")}</div>
              <div className="flex gap-2">
                {locales.map((lc) => (
                  <Link
                    key={lc}
                    href={pathFor(lc)}
                    onClick={() => setOpen(false)}
                    className={`px-2 py-1 rounded-md border text-xs transition-colors ${
                      lc === locale
                        ? "border-black/30 text-black"
                        : "border-black/10 text-black/70 hover:border-black/20 hover:text-black"
                    }`}
                  >
                    {lc.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Tap-to-close overlay — BELOW the panel */}
          {open && (
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-transparent"
            />
          )}
        </div>
      </div>
    </header>
  );
}
