import type { Metadata } from "next";
import { getLegalBySlug, type Locale } from "@/lib/content";
import Mdx from "@/components/mdx/Mdx";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = await getLegalBySlug("imprint", locale);
  if (!doc) return {};
  return {
    title: (doc as any).seoTitle ?? (doc as any).title ?? "Imprint — ARGU",
    description:
      (doc as any).seoDescription ??
      (doc as any).description ??
      "View ARGU’s legal imprint.",
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
