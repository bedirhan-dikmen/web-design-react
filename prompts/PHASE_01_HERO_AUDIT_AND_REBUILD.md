# PHASE 01 — HOMEPAGE HERO CONSTRUCTION

You are working inside the established Kerinti website project.

PHASE 00 and PHASE 00.5 are complete.

The application foundation is already working.

Do NOT scaffold the project again.

Do NOT change the framework.

Do NOT modify the protected source artwork.

Read and obey:

- `CLAUDE.md`
- `AGENTS.md`
- `START_HERE.md`
- `.claude/skills/kerinti-visual-quality/SKILL.md`
- `docs/VISUAL_ASSET_ARCHITECTURE.md`
- `docs/HERO_RESPONSIVE_SPEC.md`
- `docs/IMAGE_PIPELINE.md`
- `docs/VISUAL_QA.md`
- `docs/ASSET_MANIFEST.md`

Use:

`reference/kerinti-homepage-final-reference.png`

ONLY as a visual/composition reference.

Use `/static_design` only as protected source/master artwork.

Production components must consume deliberate web-delivery assets from `/public`.

---

# PHASE GOAL

Implement ONLY the first-screen homepage experience:

1. site header / navigation,
2. homepage hero,
3. NeXa product visual composition,
4. clean hard transition into the white page below.

DO NOT implement the rest of the homepage.

DO NOT implement the "Kimler için?" section.

DO NOT implement feature sections.

DO NOT implement animations yet.

DO NOT implement scroll storytelling yet.

DO NOT implement cinematic transitions yet.

This phase is a STATIC VISUAL FOUNDATION.

We will animate it only after the static composition is correct.

---

# PRIMARY VISUAL REFERENCE

Use:

`reference/kerinti-homepage-final-reference.png`

The reference defines:

- composition,
- visual hierarchy,
- relative proportions,
- positioning,
- atmosphere,
- spacing,
- overall art direction.

It does NOT define:

- production image dimensions,
- final breakpoint behavior,
- implementation technique,
- raster assets to stretch.

Never render the reference image itself on the website.

---

# CRITICAL QUALITY RULE

The hero MUST NOT be implemented as one flattened screenshot.

It must be constructed from independent layers.

Expected conceptual structure:

HeroSection
├── BackgroundLayer
├── ContrastLayer
├── Header
├── HeroContent
│   ├── NeXa branding
│   ├── Heading
│   ├── Description
│   ├── benefit labels
│   ├── CTA buttons
│   └── secondary feature line
└── ProductVisualCluster
    ├── PrimaryDashboard
    ├── MobileScreen
    ├── KitchenScreen
    └── optional QR/product element

Everything that can be HTML must be HTML.

Do not rasterize typography.

Do not use text captured from the reference screenshot.

---

# STEP 1 — INSPECT BEFORE EDITING

Before modifying code:

1. inspect the current repository,
2. inspect `docs/ASSET_MANIFEST.md`,
3. inspect all relevant production candidates in `/static_design`,
4. inspect the homepage reference,
5. identify the actual existing filenames.

Then create a short implementation plan.

Do not invent file paths.

---

# STEP 2 — PREPARE WEB ASSETS

Create deliberate copies/exports under:

`public/images/hero/`
`public/images/product/`
`public/brand/`

Do not alter the source files inside `/static_design`.

Do not upscale any image.

Do not destructively recompress detailed UI screenshots.

For this phase:

- use lossless PNG for detailed product UI screenshots unless there is a verified reason not to,
- do not convert UI screenshots to aggressive JPEG/WebP,
- background photography may use an optimized web format if visual comparison confirms no visible degradation.

Document every production asset copied into `/public`
inside `docs/ASSET_MANIFEST.md`.

---

# STEP 3 — HEADER

Implement the header as real HTML.

The header should visually follow the reference:

- Kerinti branding on the left,
- navigation centered/right,
- language selector,
- prominent demo CTA.

Do NOT crop the header from the reference.

Do NOT use a screenshot for navigation.

If the real Kerinti logo does not exist as SVG:

- do not trace a fake vector from the raster reference,
- use the best available temporary representation,
- isolate it in its own component,
- clearly mark the vector logo as an asset blocker.

The header should visually integrate into the hero,
not look like an unrelated white application navbar.

---

# STEP 4 — HERO BACKGROUND

Use the available restaurant/interior background candidate deliberately.

Important:

The current source is only approximately 1672×941.

Therefore:

- do NOT scale it infinitely,
- do NOT claim native 4K quality,
- do NOT blur it to hide insufficient resolution,
- do NOT add fake sharpness filters,
- do NOT use `transform: scale()` as a quality workaround.

For the current implementation:

- treat it as atmosphere,
- position it intentionally,
- preserve the visually useful restaurant area,
- ensure the left copy remains readable,
- allow dark CSS overlays/gradients where required,
- keep all important product UI independent of the background.

The eventual high-resolution background replacement must be swappable
without rewriting the hero layout.

Create the component architecture accordingly.

---

# STEP 5 — HERO COPY

Rebuild all hero copy as semantic HTML.

Use the wording visible/intended in the design,
but never OCR garbled reference text blindly.

The main hierarchy should visually resemble:

NeXa

Restoran operasyonlarını
tek platformdan yönetin.

Supporting paragraph.

Benefit/status items.

Primary CTA:
Demo Talep Et

Secondary CTA:
Ürün Videosunu İzle

And the smaller supporting feature items below.

Keep Turkish typography correct.

Use real characters:

ş ğ ı İ ç ö ü

---

# STEP 6 — PRODUCT VISUAL CLUSTER

This is the most important technical part of Phase 1.

DO NOT use the opaque photographic mockups as overlapping hero cutouts.

Prefer the flat product UI screenshots:

- NeXa POS/dashboard screen,
- kitchen screen,
- mobile screen.

Build device framing with HTML/CSS where appropriate.

The UI screenshot itself should remain untransformed internally.

Avoid:

- perspective distortion,
- excessive rotation,
- 3D transforms,
- CSS scale-up beyond safe dimensions,
- image-rendering hacks.

---

# PRIMARY DASHBOARD QUALITY LIMIT

The current main POS screenshot is approximately:

1448×1086

The current project density guideline gives it a preferred maximum
of approximately:

724 CSS px

for true 2× source density.

Treat that as a quality constraint.

Do NOT make the dashboard 900–1100 CSS px simply because there is
space on a 2K or 4K monitor.

Large monitors should gain:

- negative space,
- atmosphere,
- breathing room,

not endlessly enlarged raster UI.

---

# PRODUCT CLUSTER RULE

The entire product visual cluster must have a bounded maximum size.

Target direction:

desktop cluster:
approximately 760–860 CSS px maximum

not:

50vw forever

not:

1200+ CSS px on 4K

The exact final value should be chosen by visual comparison.

Use `clamp()` where appropriate.

---

# STEP 7 — DEVICE FRAMES

If a device bezel/frame is required:

Prefer:

- CSS,
- simple DOM,
- simple SVG primitives.

Do not bake another screenshot around the screenshot.

Keep borders, radii, shadows and bezels subtle.

The visual priority is the NeXa software UI,
not oversized fake hardware.

---

# STEP 8 — QR ELEMENT

Do not enlarge a raster QR code extracted from the reference.

If there is no proper QR asset yet:

- create the surrounding visual/card structure,
- use a clearly identified temporary placeholder area,
- record the real QR/vector requirement as an asset blocker.

Do NOT create a random live QR code representing production Kerinti data.

---

# STEP 9 — HERO HEIGHT

The desktop hero should behave like the complete first visual chapter.

Target behavior:

- on common desktop screens, the hero fills approximately the initial viewport,
- once the hero ends, the page becomes white,
- no accidental white strip should appear inside the hero,
- no fixed pixel height that only works on one monitor.

Prefer viewport-aware sizing.

For example conceptually:

min-height around 100svh

with sensible minimum and maximum protection.

Do not blindly copy this value if the actual header/layout requires adjustment.

---

# STEP 10 — WHITE SECTION BOUNDARY

After the hero, render only a minimal white continuation section.

It may contain a temporary invisible/minimal marker if necessary.

Its purpose in Phase 1 is only to verify:

DARK HERO
↓
CLEAN HARD SECTION BOUNDARY
↓
WHITE PAGE

No overlapping raster background.

No accidental gradient continuation.

No negative-margin trick.

No homepage section implementation yet.

---

# DESKTOP TARGETS

You must validate the static composition at:

1366×768
1920×1080
2560×1440
3840×2160

## 1366×768

The composition may be denser.

Ensure:

- navigation fits,
- headline fits,
- CTAs fit,
- product cluster does not collide with text.

## 1920×1080

This is the primary desktop design target.

Use it as the main visual tuning viewport.

## 2560×1440

Do not simply multiply every dimension.

Increase negative space.

Keep content centered/bounded.

Do not enlarge raster UI indefinitely.

## 3840×2160

This is a layout integrity target.

With the CURRENT background asset,
do NOT claim final photographic 4K fidelity.

The hero architecture must nevertheless remain correct:

- content stays bounded,
- product UI remains sharp because it does not grow beyond safe limits,
- copy does not become absurdly large,
- spacing grows instead of UI raster scale.

Record the high-resolution background replacement as an outstanding asset task.

---

# CONTENT WIDTH

Use a bounded central layout.

Do not allow hero content to stretch arbitrarily across 4K displays.

Target direction:

content max width approximately 1500–1700 CSS px

depending on visual comparison.

Determine the best value from the reference.

---

# RESPONSIVE SCOPE FOR THIS PHASE

Primary goal:
desktop.

However, the implementation must not catastrophically fail on tablet/mobile.

For now:

- avoid horizontal overflow,
- allow content stacking,
- keep screenshots contained,
- do not attempt final mobile art direction.

Full mobile tuning is a later phase.

Do not spend Phase 1 perfecting phone layout.

---

# IMAGE RENDERING RULES

For every raster image:

- intrinsic aspect ratio must be preserved,
- no uncontrolled stretching,
- no width/height distortion,
- no unnecessary transforms,
- no rendering above documented safe maximum unless explicitly justified,
- detailed UI screenshots use contain behavior,
- atmospheric photography may crop intentionally.

If using `next/image`:

- provide correct dimensions or fill parent rules,
- provide accurate `sizes`,
- do not write `sizes="100vw"` for a small dashboard,
- do not use low quality settings for UI screenshots.

---

# DO NOT ADD YET

Do not install or implement:

- GSAP,
- Framer Motion,
- Lenis,
- Three.js,
- WebGL,
- scroll triggers,
- portals,
- parallax,
- cinematic camera moves,
- transitions between restaurant spaces.

Static layout first.

---

# COMPONENT STRUCTURE

Create a clean component structure based on the existing conventions.

A reasonable direction is:

components/
  layout/
    site-header.tsx

  home/
    hero/
      hero-section.tsx
      hero-background.tsx
      hero-copy.tsx
      product-visual-cluster.tsx
      product-screen.tsx

But do not force these names if the actual project structure suggests a better equivalent.

Avoid one giant 500-line hero component.

Also avoid meaningless over-abstraction.

---

# VISUAL COMPARISON

After implementation:

Compare the running homepage against:

`reference/kerinti-homepage-final-reference.png`

Focus ONLY on the first-screen composition.

Check:

- overall visual hierarchy,
- relative left/right proportions,
- vertical alignment,
- visual mass,
- headline position,
- product cluster position,
- background crop,
- header spacing,
- CTA hierarchy,
- hero/white boundary.

Do not chase pixel-perfect reproduction of raster artifacts.

Reproduce DESIGN INTENT,
not image defects.

---

# VERIFICATION

Run:

npm run lint
npm run typecheck
npm run build

All must pass.

Also run the application and inspect at least:

- 1366×768
- 1920×1080
- 2560×1440
- 3840×2160

If browser screenshot tooling is available,
capture comparison screenshots.

Do not hide overflow bugs with `overflow-x: hidden`.

Fix their real cause.

---

# STOP CONDITION

Do NOT continue below the hero.

Once:

- header exists,
- hero exists,
- product composition exists,
- hard white boundary exists,
- desktop layout is structurally stable,
- validation passes,

STOP.

Do not "helpfully" build the rest of the page.

---

# FINAL REPORT FORMAT

### Files created

### Files modified

### Production assets prepared

### Hero component architecture

### Image sizing decisions

### Desktop breakpoint behavior

### Visual differences from reference

### Known asset limitations

### Validation results

### Remaining Phase 01 blockers

Finish with:

`PHASE 01 COMPLETE — STATIC HERO ONLY`