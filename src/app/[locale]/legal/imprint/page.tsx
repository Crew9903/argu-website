// src/app/[locale]/legal/imprint/page.tsx
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
  const doc = await getLegalBySlug("imprint", locale);
  if (!doc) return {};
  return {
    title: doc.seoTitle ?? doc.title ?? "Imprint — argü",
    description:
      doc.seoDescription ??
      doc.description ??
      "Legal disclosure and contact details for argü collective.",
  };
}

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const doc = await getLegalBySlug("imprint", locale);
  if (!doc) return notFound();
  return <Mdx code={doc.mdx} />;
}
