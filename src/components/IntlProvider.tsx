// src/components/IntlProvider.tsx
"use client";

import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/content";

// Recursive type for nested translation JSON
export type IntlMessages = {
  [key: string]: string | IntlMessages;
};

type Props = {
  locale: Locale;
  messages: IntlMessages;
  children: ReactNode;
};

export default function IntlProvider({ locale, messages, children }: Props) {
  // Pick one timezone or map per locale if you want
  const tzByLocale: Record<Locale, string> = {
    es: "Europe/Madrid",
    en: "Europe/London",
    de: "Europe/Berlin",
  };
  const timeZone = tzByLocale[locale] ?? "UTC";

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
