# Kerinti Website — Claude Code Instructions

## Mission

Implement the Kerinti website as a production-quality responsive site while preserving visual fidelity to the approved references. Do not solve visual matching by stretching, cropping, or flattening the reference screenshots.

## Mandatory reading before visual work

Read these files before editing homepage visual code:

- `docs/VISUAL_ASSET_ARCHITECTURE.md`
- `docs/HERO_RESPONSIVE_SPEC.md`
- `docs/IMAGE_PIPELINE.md`
- `docs/VISUAL_QA.md`

For hero/media tasks, also use the `kerinti-visual-quality` skill.

## Core rules

- Treat full-page screenshots as references, never production assets.
- Render headings, body copy, buttons, badges, navigation, feature labels, and handwritten-style decorative copy as DOM text or SVG where practical.
- Do not bake readable product UI text into a large photographic background.
- Build the hero from independent layers: background/photo, gradient/lighting overlays, copy/CTA layer, device/product UI assets, decorative assets.
- Never upscale a raster UI asset beyond its safe display size. For UI screenshots, target roughly 2 source pixels per CSS pixel where practical.
- If an asset is too small, stop and report the exact missing resolution instead of silently stretching it.
- Preserve original aspect ratios unless the spec explicitly calls for art-directed cropping.
- Use separate responsive compositions when one crop cannot work at desktop, tablet, and mobile sizes.
- Do not redesign approved copy or visual hierarchy unless asked.
- Do not add animation until the static hero passes visual QA.

## Framework behavior

Inspect `package.json` before choosing framework-specific APIs. If this is Next.js, use `next/image` appropriately and provide a correct `sizes` value for responsive images. If the installed version is Next.js 16+, prefer the current image-loading API (`preload`/`fetchPriority` as appropriate) rather than deprecated `priority`. Do not blindly set image quality to 100; preserve sharpness through correct source dimensions first.

## Workflow

Before editing, inventory all hero-related images and record filename, pixel dimensions, format, file size, transparency, intended role, and maximum expected CSS display width. Then identify which visible elements currently come from a flattened image and which should become independent layers.

Implement one milestone at a time. For Phase 1, change only the homepage hero and any shared image infrastructure strictly required by it. Do not refactor unrelated sections.

After implementation, verify at the required viewport matrix in `docs/VISUAL_QA.md`. Do not claim the result is finished without checking multiple desktop resolutions.

## Stop conditions

Stop and report instead of guessing when:

- a required high-resolution source asset is missing;
- a source image would need significant upscaling;
- the approved composition is ambiguous at a breakpoint;
- an implementation choice would materially change the approved design;
- visual verification cannot be performed.

When stopping, state exactly what asset or decision is needed and why.
