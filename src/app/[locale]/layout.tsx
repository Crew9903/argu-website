// src/app/[locale]/layout.tsx
import IntlProvider from "@/components/IntlProvider";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // ✅ await the promise

  // Load messages statically (no dynamic strings)
  let messages: Record<string, any>;
  if (locale === "en") {
    messages = (await import("@/messages/en.json")).default;
  } else if (locale === "de") {
    messages = (await import("@/messages/de.json")).default;
  } else {
    messages = (await import("@/messages/es.json")).default;
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </IntlProvider>
  );
}
