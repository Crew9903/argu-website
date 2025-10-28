import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend Next.js + TypeScript defaults
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // ✅ Ignore build output, generated folders, and env files
    ignores: [
      "node_modules/**",
      ".next/**",
      ".vercel/**",
      ".content-collections/**",
      "out/**",
      "build/**",
      "coverage/**",
      "next-env.d.ts",
      "*.d.ts",
      "*.js",
      "*.cjs",
      "*.mjs",
    ],
  },
];

export default eslintConfig;
