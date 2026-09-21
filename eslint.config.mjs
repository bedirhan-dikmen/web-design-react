import coreWebVitals from "eslint-config-next/core-web-vitals";
import next from "eslint-config-next";

/**
 * Asset safety (see prompts/PHASE_00_5_PROJECT_SETUP.md, Task 5).
 *
 * `/reference` holds full-page design mockups (1024x1536). They exist for
 * visual comparison only. `/static_design` holds untouched source masters.
 * Neither directory may be imported by application code: production assets
 * are deliberately prepared into `/public` first. See docs/ASSET_MANIFEST.md.
 */
const assetSafety = {
  name: "kerinti/asset-safety",
  files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["**/reference/*", "@/reference/*"],
            message:
              "`/reference` is design-comparison material, never a production asset. Prepare a real asset into /public instead.",
          },
          {
            group: ["**/static_design/*", "@/static_design/*"],
            message:
              "`/static_design` holds source masters. Export an optimized copy into /public/images and import that.",
          },
        ],
      },
    ],
  },
};

const config = [
  ...next,
  ...coreWebVitals,
  assetSafety,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default config;
