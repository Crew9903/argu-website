// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
var Base = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  slug: z.string(),
  // e.g., "about", "services", "privacy", "imprint"
  locale: z.enum(["es", "en", "de"]),
  status: z.enum(["draft", "published"]).default("published"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});
var pages = defineCollection({
  name: "pages",
  directory: "content/pages",
  // ⬅️ moved under /content/pages
  include: "**/*.mdx",
  // ⬅️ allow nested folders per page
  schema: Base,
  transform: async (doc, ctx) => ({
    ...doc,
    url: `/${doc.locale}/${doc.slug}`,
    mdx: await compileMDX(ctx, doc)
  })
});
var legal = defineCollection({
  name: "legal",
  directory: "content/legal",
  // keep legal under /content/legal
  include: "**/*.mdx",
  // nested like legal/privacy/privacy.es.mdx
  schema: Base.extend({ type: z.string().optional() }),
  transform: async (doc, ctx) => ({
    ...doc,
    url: `/${doc.locale}/legal/${doc.slug}`,
    mdx: await compileMDX(ctx, doc)
  })
});
var content_collections_default = defineConfig({ collections: [pages, legal] });
export {
  content_collections_default as default
};
