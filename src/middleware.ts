// src/middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["es", "en", "de"],
  defaultLocale: "es",
  // Force locale prefix on every path so URLs are always /{locale}/...
  localePrefix: "always",
});

export const config = {
  // Match everything except Next internals, API routes, and files
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
