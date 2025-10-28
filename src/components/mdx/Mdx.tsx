// src/components/mdx/Mdx.tsx
"use client";

import { MDXContent } from "@content-collections/mdx/react";
import Hero from "./Hero";
import Callout from "./Callout";
import TwoCol from "./TwoCol";
import Gallery from "./Gallery";

const components = {
  Hero,
  Callout,
  TwoCol,
  Gallery,
};

export function Mdx({ code }: { code: string }) {
  return (
    <article className="prose dark:prose-invert max-w-3xl md:max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <MDXContent code={code} components={components} />
    </article>
  );
}

export default Mdx;
