import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image (see Dockerfile): only
  // the files the server needs are traced into .next/standalone.
  output: "standalone",

  // Next 16 appends a managed block to AGENTS.md on every `next dev`.
  // AGENTS.md is a protected project file here (see prompts/PHASE_00_5),
  // so the generator stays off.
  agentRules: false,

  images: {
    // Breakpoints chosen to match the display matrix in docs/VISUAL_QA.md
    // (1366 / 1440 / 1920 / 2560 / 3840) plus tablet and mobile widths.
    // The browser picks a candidate from srcset using the `sizes` value that
    // each component must supply; see docs/IMAGE_PIPELINE.md.
    deviceSizes: [390, 640, 768, 1024, 1366, 1440, 1920, 2560, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384, 470, 724, 836],
    // UI screenshots contain small text and hard edges. AVIF's aggressive
    // compression smears those, so WebP is the only negotiated format here.
    formats: ["image/webp"],
    // Next 16 only honours quality values listed here; anything else silently
    // falls back to 75. Without this, every `quality={90}` on the product UI
    // and `quality={88}` on the background was being ignored — which is
    // exactly the softness those values exist to prevent.
    qualities: [75, 88, 90],
  },
};

export default nextConfig;
