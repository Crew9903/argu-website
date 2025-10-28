"use client";
import {NextIntlClientProvider} from "next-intl";

type Props = {
  locale: string;
  messages: Record<string, any>;
  children: React.ReactNode;
};

export default function IntlProvider({locale, messages, children}: Props) {
  // Pick one timezone or map per locale if you want
  const tzByLocale: Record<string, string> = {
    es: "Europe/Madrid",     // or "America/Mexico_City" / your choice
    en: "Europe/London",
    de: "Europe/Berlin"
  };
  const timeZone = tzByLocale[locale] ?? "UTC";

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
