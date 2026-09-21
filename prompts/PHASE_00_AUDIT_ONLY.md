# IMPORTANT ASSET SOURCE RULE

The project contains two different visual source directories:

- `/reference`
  Visual references only. These define composition, proportions,
  hierarchy, visual direction and desired page appearance.

- `/static_design`
  High-resolution production assets created specifically for the website.

Never substitute a `/reference` screenshot for an available
`/static_design` production asset.

Do not recreate, upscale, crop, or stretch reference screenshots
to simulate production artwork.

Before proposing implementation, compare the reference composition
against the available production assets.

You are auditing and planning the visual implementation of the Kerinti website hero and related image-heavy sections.

IMPORTANT:
- Do NOT modify any files yet.
- Do NOT implement anything yet.
- This is an audit, planning, and architecture task only.
- Your output must be a structured report.
- End your response with: AUDIT COMPLETE — NO FILES MODIFIED

## Project context

This project contains two important asset folders:

1. `reference/`
   - These files are visual reference materials.
   - They show the intended composition, section layout, visual language, and target appearance.
   - They are NOT necessarily production-ready background assets.
   - Do NOT assume these should be stretched directly into the live site.

2. `static_design/`
   - These files are the high-quality source visuals prepared for production use.
   - These are the primary design assets that should be considered for actual implementation.
   - These should be treated as the authoritative source for sharp UI/device visuals where applicable.

## Main problem to solve

The homepage hero and similar image-heavy sections are currently failing in quality.

Observed issues:
- the first-screen hero area does not scale properly across large displays,
- NeXa app/device visuals lose clarity,
- embedded UI text inside images becomes blurry or unreadable,
- images are enlarged, cropped, or stretched incorrectly,
- the white section below the hero should appear cleanly after scroll / below the fold,
- image-heavy sections look low quality compared to the clean white sections.

## Target expectation

We want:
- a professional, responsive hero section,
- full-width first-screen visual coverage on desktop,
- the hero to feel immersive horizontally,
- the section below to transition into a clean white content area,
- no blurry UI screens,
- no unreadable dashboard text,
- no low-quality stretched mockups,
- proper behavior on 1080p, 1440p / 2K, and 4K displays.

## Critical implementation principles

You must evaluate the project according to these rules:

1. Do NOT solve hero quality by simply enlarging one flat composite image.
2. Separate the hero into layers where appropriate:
   - background / atmosphere image,
   - overlay / gradient,
   - HTML text content,
   - CTA buttons,
   - device or app visuals,
   - optional decorative elements.
3. Any text that can be HTML should remain HTML, not baked into bitmap assets.
4. Device or dashboard visuals must remain sharp and should not be scaled beyond safe limits.
5. If an asset is too small for its intended display size, explicitly report it.
6. Do NOT hide quality problems with CSS scaling tricks.
7. Evaluate whether the hero should use:
   - multiple layered assets,
   - art-directed responsive variants,
   - separate assets for different breakpoints,
   - max-width constraints for device compositions.
8. The `reference/` folder should guide layout/composition/style.
9. The `static_design/` folder should guide production-quality image usage.
10. If there are sections beyond the hero that suffer from the same issue, include them in the audit.

## Your tasks

Please inspect the repository and report on the following:

### 1. Current implementation summary
- Which files currently define the homepage hero and image-heavy sections?
- How is the hero currently built?
- Is it using one composite image, multiple images, CSS background-image, Next.js Image, absolutely positioned assets, or something else?

### 2. Asset inventory
Inspect both:
- `reference/`
- `static_design/`

For each important asset, report:
- filename/path,
- apparent role,
- pixel dimensions if discoverable,
- likely intended usage,
- whether it is suitable as:
  - full background,
  - partial composition asset,
  - device screen/mockup,
  - section illustration,
  - reference only.

### 3. Root-cause analysis
Identify exactly why the current implementation loses quality.
Examples:
- source file too small,
- wrong use of object-cover,
- cropping a screenshot-based layout,
- scaling a detailed UI image too large,
- using a composited design image where real HTML should be used,
- missing responsive art direction,
- poor sizing rules,
- wrong container strategy,
- incorrect Next.js Image usage,
- wrong `sizes` behavior.

### 4. Asset classification
Create three groups:

A. Safe to use directly in production  
B. Usable only with constraints  
C. Should be reference-only / should not be directly stretched in production

### 5. Recommended hero architecture
Propose the best implementation structure for the homepage hero.

Your proposal must describe:
- what should be background,
- what should be real HTML content,
- what should be separate image layers,
- what should have max-width or clamp limits,
- what should remain sharp at large resolutions,
- how to make the hero span the full opening screen width without destroying image quality,
- how the transition into the white section should work.

### 6. Breakpoint strategy
Give recommended behavior for:
- 1080p desktop,
- 1440p / 2K desktop,
- 4K desktop,
- tablet,
- mobile.

Especially explain:
- what scales,
- what should not scale too much,
- what can crop safely,
- what must remain fully visible,
- whether different visual compositions are needed at different breakpoints.

### 7. Files likely to change in Phase 1
List the files that would likely be changed during implementation.

### 8. Risks / blockers / missing assets
Explicitly mention:
- if any asset is insufficient resolution,
- if any section cannot be made high quality with the current files,
- if additional exports or re-creation are needed,
- if some visuals should be rebuilt from components instead of using flat screenshots.

## Output format

Use this exact structure:

### Current implementation summary
...

### Asset inventory
...

### Confirmed root causes
...

### Safe to use directly
...

### Usable with constraints
...

### Reference-only / not for direct production stretching
...

### Proposed hero architecture
...

### Breakpoint behavior
...

### Files that would change in Phase 1
...

### Risks / blockers / missing assets
...

AUDIT COMPLETE — NO FILES MODIFIED