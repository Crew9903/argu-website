// src/lib/content.ts
export type Locale = "es" | "en" | "de";

type Doc = {
  slug: string;
  locale: Locale;
  status?: "draft" | "published";
  mdx: string;
  title?: string;
  description?: string;
  url?: string;
};

async function loadCollections() {
  const mod: any = await import("content-collections");

  // Collect every exported array, flatten it, keep only objects that look like content entries
  const arrays = Object.values(mod).filter(Array.isArray) as any[][];
  const entries = arrays.flat().filter(
    (x) => x && typeof x === "object" && "slug" in x && "locale" in x
  ) as Doc[];

  // Split by legal vs general using the computed url from transform()
  const legal = entries.filter((e) => e.url?.includes("/legal/"));
  const pages = entries.filter((e) => !e.url?.includes("/legal/"));

  return { pages, legal };
}

export async function getPageBySlug(slug: string, locale: Locale) {
  const { pages } = await loadCollections();
  return pages.find(
    (p) => p.slug === slug && p.locale === locale && p.status !== "draft"
  );
}

export async function getLegalBySlug(slug: string, locale: Locale) {
  const { legal } = await loadCollections();
  return legal.find(
    (p) => p.slug === slug && p.locale === locale && p.status !== "draft"
  );
}
