"use client";
import {useTranslations} from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-lg md:text-xl opacity-80">{t("tagline")}</p>
        <p className="text-sm opacity-60">v0.1 • Next.js + Tailwind on Vercel</p>
      </div>
    </main>
  );
}
