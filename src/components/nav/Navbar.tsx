// src/components/nav/Navbar.tsx
"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale(); // get current locale automatically
  const languages = ["es", "en", "de"];

  return (
    <header className="fixed top-0 left-0 w-full border-b border-neutral-800 bg-black/70 backdrop-blur-md z-10">
      <nav className="mx-auto max-w-5xl p-4 flex items-center justify-between text-sm text-white">
        {/* Translated links */}
        <div className="flex gap-6">
          <Link href={`/${locale}`}>{t("home")}</Link>
          <Link href={`/${locale}/about`}>{t("about")}</Link>
          <Link href={`/${locale}/archive`}>{t("archive")}</Link>
          <Link href={`/${locale}/services`}>{t("services")}</Link>
        </div>

        {/* Language switcher */}
        <div className="flex gap-3 text-white/80">
          {languages.map((lng) => (
            <Link
              key={lng}
              href={`/${lng}`}
              className={`hover:text-white transition ${
                lng === locale ? "underline text-white" : ""
              }`}
            >
              {lng.toUpperCase()}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
