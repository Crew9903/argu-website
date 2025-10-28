// src/components/footer/Footer.tsx
"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-black/70 backdrop-blur-md border-t border-neutral-800 text-white text-sm">
      <div className="mx-auto max-w-5xl p-4 flex items-center justify-between">
        <span>{t("copyright", { year })}</span>

        <nav className="flex gap-6">
          <Link href={`/${locale}/legal/privacy`} className="hover:underline" aria-label={t("privacy")}>
            {t("privacy")}
          </Link>
          <Link href={`/${locale}/legal/imprint`} className="hover:underline" aria-label={t("imprint")}>
            {t("imprint")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
