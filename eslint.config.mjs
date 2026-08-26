import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".firecrawl/**",
    "_next/**",
    "writing/**",
    "_not-found/**",
    "out/**",
    "build/**",
    "*.html",
    "*.txt",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
