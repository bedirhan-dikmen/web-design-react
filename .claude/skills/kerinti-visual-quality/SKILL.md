---
name: kerinti-visual-quality
description: Implements and reviews Kerinti website hero sections, responsive imagery, device mockups, product UI screenshots, and visual fidelity. Use for homepage visuals, image sharpness, responsive hero composition, asset sizing, art direction, or screenshot-to-code work.
---

# Kerinti Visual Quality

Use this skill whenever a Kerinti website task involves visual assets, hero composition, responsive imagery, device/product screenshots, or matching approved design references.

## Required workflow

Read these project references before editing:

- `docs/VISUAL_ASSET_ARCHITECTURE.md`
- `docs/HERO_RESPONSIVE_SPEC.md`
- `docs/IMAGE_PIPELINE.md`
- `docs/VISUAL_QA.md`

Then inspect the repository and inventory the actual image files before changing layout code.

## Rules

Never use a full-page reference screenshot as a production background or hero image.

Separate content into photo, overlay, DOM copy, product/device assets, and vector decoration layers.

Do not upscale raster product UI beyond its safe display size. For fine UI text, aim for about 2 source pixels per rendered CSS pixel where practical.

When one composition cannot serve multiple viewport shapes, use art direction rather than destructive cropping.

If an asset is undersized, stop and report the minimum replacement dimensions required.

Do not add animation until static visual QA passes.

## Completion

Validate the required viewport matrix from `docs/VISUAL_QA.md` and report the exact files changed, asset sizing decisions, viewports checked, and known differences.

## Browser Testing Policy

For all browser-based development verification and visual QA:

- Use Google Chrome only.
- Use the Claude in Chrome integration when available.
- Do NOT use Brave.
- Do NOT silently fall back to Brave or another Chromium browser.
- Reuse the active Chrome browser when possible.
- You may open and close tabs created for testing.
- Do NOT close the entire Chrome browser after testing.
- Test localhost pages in Chrome.
- Use Chrome DevTools/DOM/console/network inspection when browser debugging is required.

If Google Chrome / Claude in Chrome is unavailable, stop browser verification
and report the blocker instead of switching to Brave automatically.