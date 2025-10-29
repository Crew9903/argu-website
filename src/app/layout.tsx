import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google"; // ← NEW
import "./globals.css";

// Replace Geist with Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "argü",
  description: "Creative collective — art, streetwear, and cultural storytelling.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "es";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
