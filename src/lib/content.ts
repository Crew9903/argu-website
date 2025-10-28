// src/lib/content.ts

// ---- Public types & constants ----
export type Locale = "es" | "en" | "de";
export const locales: Locale[] = ["es", "en", "de"];

export type PageSlug = "about" | "services";
export type LegalSlug = "privacy" | "imprint";

export type BaseDocMeta = {
  title?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  slug: PageSlug | LegalSlug;
  locale: Locale;
  status?: "draft" | "published";
  url?: string; // content-collections transform usually provides this
};

export type LoadedDoc = BaseDocMeta & {
  mdx: string; // what your Mdx renderer expects as "code"
};

// ---- Runtime type guard to safely narrow unknown values to LoadedDoc ----
function isLoadedDoc(x: unknown): x is LoadedDoc {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o["slug"] === "string" &&
    typeof o["locale"] === "string" &&
    (o["status"] === undefined || o["status"] === "draft" || o["status"] === "published") &&
    typeof o["mdx"] === "string"
  );
}

// ---- Internal loader (kept dynamic) ----
async function loadCollections(): Promise<{ pages: LoadedDoc[]; legal: LoadedDoc[] }> {
  // Import as unknown and narrow manually to avoid 'any'
  const mod: unknown = await import("content-collections");

  // Get all exported arrays from the module
  const arrays = Object.values(mod as Record<string, unknown>).filter(Array.isArray) as unknown[];

  // Flatten and keep only entries that look like our docs
  const entries: LoadedDoc[] = (arrays as unknown[][])
    .flat()
    .filter(isLoadedDoc);

  // Split by legal vs general using the computed url from transform()
  const legal = entries.filter((e) => e.url?.includes("/legal/"));
  const pages = entries.filter((e) => !e.url?.includes("/legal/"));

  return { pages, legal };
}

// ---- Public helpers used by pages ----
export async function getPageBySlug(
  slug: PageSlug,
  locale: Locale
): Promise<LoadedDoc | null> {
  const { pages } = await loadCollections();
  return (
    pages.find(
      (p) => p.slug === slug && p.locale === locale && p.status !== "draft"
    ) ?? null
  );
}

export async function getLegalBySlug(
  slug: LegalSlug,
  locale: Locale
): Promise<LoadedDoc | null> {
  const { legal } = await loadCollections();
  return (
    legal.find(
      (p) => p.slug === slug && p.locale === locale && p.status !== "draft"
    ) ?? null
  );
}
