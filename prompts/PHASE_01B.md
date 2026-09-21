# PHASE 01B — HERO VISUAL QA AND CORRECTION

Phase 01 is complete.

This phase is NOT for adding new homepage sections.

Do NOT continue below the hero.

Do NOT add animations.

Do NOT add scroll effects.

Do NOT redesign the site.

The only goal of this phase is to visually compare the existing static hero
against:

`reference/kerinti-homepage-final-reference.png`

and correct the existing hero composition.

---

## BROWSER POLICY

Perform all browser visual verification using Google Chrome.

Use Claude in Chrome.

Do NOT use Brave.

Do NOT silently switch to another browser.

Do NOT close the entire Chrome browser when testing is complete.
You may close only the tabs created for testing.

If Chrome verification is unavailable, report the blocker.

---

# PRIMARY TARGET

Use:

1920×1080

as the main visual tuning viewport.

Also verify:

1366×768
2560×1440

3840 width should be checked for layout integrity,
but do not spend time fighting the browser renderer if a full 3840×2160 capture
is unstable.

The primary approval screenshot for this phase must be:

1920×1080

---

# STEP 1 — OPEN THE REAL PAGE

Start the existing application.

Open the homepage in Google Chrome.

Wait until:

- all images are fully painted,
- next/image has loaded,
- fonts are loaded,
- there are no transient black image placeholders.

Do not judge screenshots captured during image paint/loading.

---

# STEP 2 — COMPARE AGAINST THE REFERENCE

Compare ONLY the first-screen hero against:

`reference/kerinti-homepage-final-reference.png`

Evaluate the following visually:

### Header
- overall height,
- logo position,
- navigation spacing,
- CTA size,
- language selector position,
- distance from viewport edges.

### Hero copy
- NeXa mark position,
- headline width,
- headline line breaks,
- paragraph width,
- CTA alignment,
- feature/benefit spacing,
- vertical placement.

### Product composition
- primary dashboard size,
- dashboard position,
- kitchen display position,
- mobile device position,
- QR card position,
- overlap relationships,
- visual hierarchy,
- distance from hero copy.

### Background
- crop,
- focal point,
- restaurant visibility,
- darkness,
- contrast behind copy,
- contrast behind product screens.

### Hero composition
- left/right visual balance,
- empty space,
- vertical center,
- overall density,
- bottom boundary.

### Hero → white transition
- hero must end cleanly,
- no white strip inside hero,
- no dark background leaking into white page.

---

# STEP 3 — FIX ONLY VERIFIED VISUAL MISMATCHES

Do not change things merely because you personally prefer another style.

Only fix differences that materially improve similarity to the reference
or visual quality.

Examples:

- content slightly too high/low,
- dashboard too far right,
- phone covering kitchen display,
- headline width incorrect,
- background crop incorrect,
- overlay too dark,
- CTA proportions incorrect,
- hero content too compressed,
- cluster visually too small,
- navigation spacing inconsistent.

Do not exceed documented raster safe-size limits while doing this.

---

# IMPORTANT PRODUCT UI RULE

Do NOT make the POS screenshot larger than its established safe range
just to imitate the reference.

The current implementation achieved approximately:

POS rendered width: ~681 CSS px
source width: 1448 px
density: ~2.13×

Preserve approximately 2× source density.

A visually larger cluster should come from:

- composition,
- spacing,
- frame proportions,
- relative placement,

not uncontrolled raster enlargement.

---

# BACKGROUND RULE

The current hero background is known to be resolution-limited.

Do NOT attempt to fix this using:

- CSS blur,
- sharpening filters,
- transform scale hacks,
- AI upscaling,
- canvas resampling.

However, you MAY tune:

- object-position,
- overlay opacity,
- gradient placement,
- background darkness,

if doing so improves visual similarity.

The actual high-resolution replacement will come later.

---

# PLACEHOLDER RULE

Do NOT spend this phase creating fake final branding.

Keep known temporary elements isolated:

- Kerinti wordmark,
- NeXa mark,
- QR placeholder,
- custom feature icons,
- handwritten decorative script.

Do not fabricate vector assets.

Do not trace raster logos.

If their placeholder appearance distracts from visual evaluation,
make them neutral and unobtrusive.

---

# STEP 4 — TAKE REAL CHROME SCREENSHOTS

After corrections, capture:

1. 1366×768
2. 1920×1080
3. 2560×1440

The 1920×1080 screenshot is the approval image.

Make sure each capture occurs AFTER image paint is complete.

Report the screenshot file paths.

---

# STEP 5 — VERIFY TECHNICAL QUALITY

Inspect the 1920×1080 result.

Confirm:

- NeXa POS text remains readable,
- no raster UI is visibly blurred,
- no aspect ratio distortion exists,
- no screenshot is stretched,
- no unexpected cropping affects product UI,
- no horizontal overflow,
- no accidental white band,
- no image loading artifact.

---

# STEP 6 — RUN VALIDATION

Run:

npm run lint
npm run typecheck
npm run build

All must pass.

---

# DO NOT

Do NOT implement:

- the next homepage section,
- cards,
- features,
- "Kimler için?",
- scroll animation,
- parallax,
- GSAP,
- Framer Motion,
- portals,
- video,
- Three.js,
- cinematic transitions.

Do not touch anything below the hero except the minimal white boundary section.

---

# FINAL REPORT

Return:

### Visual changes made

### Header adjustments

### Hero copy adjustments

### Product cluster adjustments

### Background adjustments

### Raster density status

### Chrome screenshots

### Remaining differences from reference

### Remaining asset blockers

### Validation results

Finish with:

`PHASE 01B COMPLETE — HERO VISUAL QA ONLY`