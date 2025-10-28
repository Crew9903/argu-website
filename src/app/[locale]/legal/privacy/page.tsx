// src/app/[locale]/legal/privacy/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalBySlug, type Locale } from "@/lib/content";
import Mdx from "@/components/mdx/Mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = await getLegalBySlug("privacy", locale);
  if (!doc) return {};
  return {
    title: doc.seoTitle ?? doc.title ?? "Privacy Policy — argü",
    description:
      doc.seoDescription ??
      doc.description ??
      "How argü handles personal data, cookies, and communications.",
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const doc = await getLegalBySlug("privacy", locale);
  if (!doc) return notFound();
  return <Mdx code={doc.mdx} />;
}
