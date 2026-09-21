# Kerinti Website — AI Handoff v1

This package is the operating contract for Claude Code and Codex while rebuilding the Kerinti website from visual references.

## Goal

Build the site as a real responsive interface, not as a collection of stretched screenshots. The first milestone is the homepage hero only. The hero must remain crisp at 1080p, 1440p/2K, and 4K, then transition cleanly into the white content section below.

## Read order

1. `CLAUDE.md` when using Claude Code.
2. `AGENTS.md` when using Codex.
3. `docs/VISUAL_ASSET_ARCHITECTURE.md`.
4. `docs/HERO_RESPONSIVE_SPEC.md`.
5. `docs/IMAGE_PIPELINE.md`.
6. `docs/VISUAL_QA.md`.
7. Run the task in `prompts/PHASE_01_HERO_AUDIT_AND_REBUILD.md`.

## Important principle

The supplied full-page reference screenshots are design references only. They must never be used as production hero backgrounds or enlarged to fill a desktop viewport. Recreate layout and typography in HTML/CSS. Use the supplied high-resolution visual assets as independent layers.

## Current reference capture note

The three reference images supplied for this review are 1024 × 1536 pixels. A 1024 px wide flattened screenshot would have to be enlarged about 1.88× on a 1920 px viewport, 2.5× on a 2560 px viewport, and 3.75× on a 3840 px viewport. Text and application UI baked into that raster image will inevitably lose sharpness. This is why the production implementation must be composited from separate assets and DOM layers.
