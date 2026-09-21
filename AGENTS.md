# Kerinti Website — Codex Instructions

This file is the project-level operating contract for Codex. Keep it concise and use the linked documents as the source of truth.

## Required context

Before modifying homepage visuals, read:

- `docs/VISUAL_ASSET_ARCHITECTURE.md`
- `docs/HERO_RESPONSIVE_SPEC.md`
- `docs/IMAGE_PIPELINE.md`
- `docs/VISUAL_QA.md`

## Non-negotiable visual rules

- Reference screenshots are for comparison only; never ship them as full-screen images.
- Recreate text, controls, navigation, and layout in code.
- Compose the hero from separate visual layers instead of one flattened raster.
- Do not enlarge low-resolution raster UI assets to make them fit.
- For readable application screenshots, prefer approximately 2× source pixel density relative to the maximum rendered CSS size.
- If source resolution is insufficient, report it instead of masking the problem with CSS, blur, sharpening, or `quality=100`.
- Use art direction across breakpoints when one crop cannot preserve the composition.
- Preserve aspect ratios and intended focal points.
- Finish static fidelity before adding motion.

## Execution style

Treat each request like a focused GitHub issue. Inspect the repo and assets first, state the exact files you intend to change, implement the smallest coherent patch, run the available validation commands, and report changed files plus remaining risks.

For Phase 1, touch only the homepage hero and directly required shared media infrastructure. Do not redesign lower white sections.
