// src/app/[locale]/services/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, type Locale } from "@/lib/content";
import Mdx from "@/components/mdx/Mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = await getPageBySlug("services", locale);
  if (!doc) return {};
  return {
    title: doc.seoTitle ?? doc.title ?? "argü — Services",
    description:
      doc.seoDescription ??
      doc.description ??
      "Custom pieces, collaborations, and creative production by argü.",
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const doc = await getPageBySlug("services", locale);
  if (!doc) return notFound();
  return <Mdx code={doc.mdx} />;
}
