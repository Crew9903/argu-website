// next.config.ts
import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  experimental: { mdxRs: true },
  // You can still add custom webpack rules later if needed,
  // but the old Contentlayer alias is no longer required.
};

export default withContentCollections(nextConfig);
