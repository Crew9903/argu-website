// src/components/footer/Footer.tsx
"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/10 bg-white text-black text-sm mt-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="opacity-70">
          {t("copyright", { year })}
        </span>

        <nav className="flex gap-6 opacity-80 hover:[&>*]:opacity-100 transition">
          <Link
            href={`/${locale}/legal/privacy`}
            className="hover:underline"
            aria-label={t("privacy")}
          >
            {t("privacy")}
          </Link>
          <Link
            href={`/${locale}/legal/imprint`}
            className="hover:underline"
            aria-label={t("imprint")}
          >
            {t("imprint")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
