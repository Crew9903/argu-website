import type { Metadata } from "next";
import { getPageBySlug, type Locale } from "@/lib/content";
import Mdx from "@/components/mdx/Mdx";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = await getPageBySlug("services", locale);
  if (!doc) return {};
  return {
    title: (doc as any).seoTitle ?? (doc as any).title ?? "ARGU — Services",
    description:
      (doc as any).seoDescription ??
      (doc as any).description ??
      "Explore ARGU’s digital operations & content systems",
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
