// src/app/[locale]/layout.tsx
import IntlProvider, { IntlMessages } from "@/components/IntlProvider";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/content";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // ✅ Next 15 validator wants `string` here
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // ✅ Validate and narrow to your Locale union
  if (!locales.includes(locale as Locale)) {
    return notFound();
  }
  const typedLocale = locale as Locale;

  // Load messages statically (no dynamic strings)
  let messages: IntlMessages;
  if (typedLocale === "en") {
    messages = (await import("@/messages/en.json")).default as IntlMessages;
  } else if (typedLocale === "de") {
    messages = (await import("@/messages/de.json")).default as IntlMessages;
  } else {
    messages = (await import("@/messages/es.json")).default as IntlMessages;
  }

  return (
    <IntlProvider locale={typedLocale} messages={messages}>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </IntlProvider>
  );
}
