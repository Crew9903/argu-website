// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const Base = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  slug: z.string(),                         // "about" | "services" | "privacy" | "imprint"
  locale: z.enum(["es", "en", "de"]),
  status: z.enum(["draft", "published"]).default("published"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

// Pages live under /content/pages/**/<slug>.<locale>.mdx
const pages = defineCollection({
  name: "pages",
  directory: "content/pages",               // 👈 matches your tree
  include: "**/*.mdx",                      // 👈 allow nested folders (about/*.mdx, services/*.mdx)
  schema: Base,
  transform: async (doc, ctx) => ({
    ...doc,
    url: `/${doc.locale}/${doc.slug}`,
    mdx: await compileMDX(ctx, doc),
  }),
});

// Legal lives under /content/legal/**/<slug>.<locale>.mdx
const legal = defineCollection({
  name: "legal",
  directory: "content/legal",               // 👈 matches your tree
  include: "**/*.mdx",
  schema: Base.extend({ type: z.string().optional() }),
  transform: async (doc, ctx) => ({
    ...doc,
    url: `/${doc.locale}/legal/${doc.slug}`,
    mdx: await compileMDX(ctx, doc),
  }),
});

export default defineConfig({ collections: [pages, legal] });
