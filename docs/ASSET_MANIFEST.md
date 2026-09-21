# Asset Manifest

Generated during Phase 00.5. Dimensions read directly from each PNG's IHDR
header; alpha determined from the colour-type byte. No source file was opened
for writing, re-encoded, resized, or moved.

Sizing vocabulary comes from `docs/VISUAL_ASSET_ARCHITECTURE.md`; the
arithmetic is implemented in `lib/assets.ts`.

```
safe max CSS width = natural width / target density
target density     = 2.0 for product UI, 1.5 for photography
```

## Directory responsibilities

| Directory | Status | May production code import it? |
| --- | --- | --- |
| `/reference` | Design comparison material | **No** — blocked by ESLint |
| `/static_design` | Untouched source masters | **No** — export to `/public` first |
| `/public` | Web-delivery assets | Yes |

`/reference` and `/static_design` are both tracked and both protected. The
ESLint rule `kerinti/asset-safety` in `eslint.config.mjs` fails the build on
any import from either path.

## Production candidates — `/static_design`

All files are PNG, colour-type 2 (RGB). **No file in this directory has an
alpha channel.**

### Photographic background

| File | Natural | Role | Master | Recommended use | Safe scaling |
| --- | --- | --- | --- | --- | --- |
| `ChatGPT Image 20 Eyl 2026 13_58_18.png` | 1672x941 | `photo-background` | Source | Hero background. Dark navy fine-dining interior, 16:9, with an empty left third that suits the headline block. | Safe to **1672 CSS px** at 1.0x, **1114 px** at 1.5x. Native at 1366x768 only. Needs larger exports for 1920 and above — see Gaps. |

### Product UI — flat, straight-on screenshots

These are the assets that belong inside device frames. They are the highest
quality material in the project for their purpose because they carry no
perspective transform and no baked-in background.

| File | Natural | Role | Master | Recommended use | Safe scaling |
| --- | --- | --- | --- | --- | --- |
| `nexa_ekrani_ss.png` | 1448x1086 | `product-ui` | Source | NeXa POS / order screen | **724 CSS px** max at 2x. Rendering at the ~900 px the reference implies gives only 1.61x and softens the price text. |
| `nexa_mutfak_ekrani_ss.png` | 1672x941 | `product-ui` | Source | NeXa kitchen display | **836 CSS px** max at 2x. Comfortable for its slot. |
| `nexa_ekrani_mobil_ss.png` | 941x1672 | `product-ui` | Source | NeXa mobile QR menu | **470 CSS px** max at 2x. Ample — the phone renders at roughly 200-260 px. |

### Photographic product scenes — opaque, self-contained

Each of these is a complete restaurant photograph with the device already in
it, at its own angle and its own lighting. They are **not** device cut-outs
and cannot be layered over a different background.

| File | Natural | Role | Master | Recommended use | Safe scaling |
| --- | --- | --- | --- | --- | --- |
| `nexa_ekrani.png` | 1448x1086 | `photo-background` | Source | Bounded feature tile. Desktop POS on marble. | Whole image to 965 px at 1.5x. The embedded UI region is only ~1000 px wide, so do not render the frame wider than **~500 px** if that UI must read. |
| `nexa_ekrani_2.png` | 1122x1402 | `photo-background` | Source | Bounded feature tile. Angled POS terminal. | **748 CSS px** at 1.5x. |
| `nexa_ekrani_mobil.png` | 1122x1402 | `photo-background` | Source | Bounded feature tile. Phone showing QR menu. | **748 CSS px** at 1.5x. |
| `nexa_qr.png` | 1122x1402 | `photo-background` | Source | Bounded feature tile. QR table stand. | **748 CSS px** at 1.5x. |
| `mutfak_ekrani.png` | 1122x1402 | — | **Duplicate** | **Do not use.** Byte-identical to `nexa_qr.png` (md5 `52a27e7066409253857dd907114d4fbf`) and misnamed — it shows a QR stand, not a kitchen screen. | Rename or delete once confirmed with the design owner. |

### Sector photography — "Kimler için?"

Seven landscape photographs at 1448x1086, mapping one-to-one onto the card row
in the homepage reference. Rendered at roughly 155 CSS px in a six-up row,
these sit near 9x density — the only assets in the project with room to spare.

| File | Natural | Role | Master | Recommended use | Safe scaling |
| --- | --- | --- | --- | --- | --- |
| `ChatGPT Image 20 Eyl 2026 13_57_42.png` | 1448x1086 | `photo-background` | Source | Restoranlar | 965 px at 1.5x |
| `ChatGPT Image 20 Eyl 2026 13_57_31.png` | 1448x1086 | `photo-background` | Source | Kafeler | 965 px at 1.5x |
| `ChatGPT Image 20 Eyl 2026 13_57_48.png` | 1448x1086 | `photo-background` | Source | Pastaneler | 965 px at 1.5x |
| `ChatGPT Image 20 Eyl 2026 13_57_53.png` | 1448x1086 | `photo-background` | Source | Fast Food Zincirleri | 965 px at 1.5x |
| `ChatGPT Image 20 Eyl 2026 13_58_01.png` | 1448x1086 | `photo-background` | Source | Oteller | 965 px at 1.5x |
| `ChatGPT Image 20 Eyl 2026 13_58_06.png` | 1448x1086 | `photo-background` | Source | Yeme-İçme Grupları | 965 px at 1.5x |
| `ChatGPT Image 20 Eyl 2026 13_58_12.png` | 1448x1086 | `photo-background` | Source | Plated main course; CTA band candidate | 965 px at 1.5x |

## Published web assets — `/public`

Byte-identical lossless copies of their masters (md5 verified at copy time).
Nothing was resized, upscaled or recompressed on disk. Delivery-time encoding
is handled by `next/image`, which negotiates WebP per `next.config.ts`; AVIF
is excluded because it muddies small UI text.

| Published path | Master | Natural | Role | Rendered (1920+) | Density | Cap |
| --- | --- | --- | --- | --- | --- | --- |
| `images/hero/hero-restaurant-1672x941.png` | `ChatGPT Image 20 Eyl 2026 13_58_18.png` | 1672x941 | `photo-background` | full-bleed | <1x above 1672px | none (atmosphere) |
| `images/product/nexa-dashboard-1442x1091.png` | `nexa_ana_ekrani_ss.png` | 1442x1091 | `product-ui` | 393 CSS px | **3.67x** | 721 px |
| `images/product/nexa-pos-1448x1086.png` | `nexa_ekrani_ss.png` | 1448x1086 | `product-ui` | 681 CSS px | **2.13x** | 724 px |
| `images/product/nexa-kitchen-1672x941.png` | `nexa_mutfak_ekrani_ss.png` | 1672x941 | `product-ui` | 307 CSS px | **5.4x** | 330 px |
| `images/product/nexa-mobile-941x1672.png` | `nexa_ekrani_mobil_ss.png` | 941x1672 | `product-ui` | 168 CSS px | **5.6x** | 200 px |

The three product screens render inside CSS/DOM bezels
(`components/home/hero/product-screen.tsx`) with `object-contain`, no transform
and no perspective. Their rendered widths are identical at 1920, 2560 and 3840:
the cluster stops growing at 787 CSS px, so a larger monitor buys negative
space, not enlarged raster UI.

Not yet published: the seven sector photographs (their section is out of Phase
01 scope) and the four opaque photographic product scenes.

### Phase 01D notes

`nexa_ana_ekrani_ss.png` (added 2026-09-21) is the flat NeXa dashboard and is
now the primary hero monitor, replacing the order screen in that slot. It
closes the blocker logged in Phase 01B.

**Tablet is a stand-in.** The hero needs three displays plus a tablet, but only
four flat screenshots exist. The tablet therefore renders
`nexa-mobile-941x1672.png` inside a tablet frame — plausible as a table-side
ordering tablet, and the same asset the phone uses. A dedicated tablet-format
screenshot would remove that duplication.

**Background is still the dining-room frame.** `object-position` moved to 76%
so the crop favours the lit back bar rather than a dinner table, which reads
closer to a service point. A purpose-shot cashier/counter photograph remains
the real fix.

**Rendered sizes are unchanged by the tilt.** Devices carry a small rotateY
for staging; all six share one perspective context declared on the cluster.

### Phase 01E blocker — exact target match is asset-limited

The approved target's right-side scene is a **photograph of physical
hardware**: a monitor, a POS terminal with a branded wedge base, a phone and
an acrylic QR stand, all lit by one light source, casting real reflections on
a marble counter, with real depth-of-field.

Our assets are **raw screen captures with no device bodies and no alpha**.
Two measurable consequences:

**1. No transparent hardware renders exist.** Every file in `/static_design`
is colour-type 2 (opaque). The four photographic mockups (`nexa_ekrani.png`,
`nexa_ekrani_2.png`, `nexa_ekrani_mobil.png`, `nexa_qr.png`) each show the
right hardware on marble — but each carries its own baked-in background, so
compositing them into one scene would show four rectangle seams. Device
bodies are therefore built in CSS, which cannot reproduce photographic
material shading, reflections on the counter, or focal falloff.

**2. Screen aspect ratios do not match the target's device shapes.**
Measured from the target hero (1024x406 crop) against our intrinsic ratios:

| Element | Target shape | Our asset | Delta |
| --- | --- | --- | --- |
| Main monitor | 1.69 | 1.32 | **-22%** |
| POS terminal | 0.76 | 1.33 | **+76%** |
| Kitchen display | 1.60 | 1.78 | +11% |
| Phone | 0.41 | 0.56 | +36% |

Filling the target's footprints exactly would require cropping or stretching
these screenshots. Both are forbidden, so each asset keeps its true ratio and
occupies a differently-shaped footprint than the target. This is a deliberate
deviation, not an oversight.

**To close it, one of:**

- transparent-background PNG/WebP renders of each device (monitor, POS with
  base, phone, QR stand) at 2x their maximum rendered size, with the screen
  area empty so the live UI composites in; or
- screen captures authored at the target device ratios (main 16:10, POS
  portrait-with-base, phone 0.41).

Also still open: the background is 1672px against a 3840px target, so it
softens above 1672 CSS px. `next/image` never upscales past the source, so
the pipeline adds no resampling — this is a pure source-resolution limit and
is not masked with filters.

**Handwritten script is a temporary stand-in.** Rendered as live DOM text in
Caveat with an SVG brush underline — crisp at any resolution, but not
Kerinti's own lettering. Replace with real SVG artwork when available.

## Reference material — `/reference`

**Role: `reference-only` for every file. None may be imported, copied into
`/public`, or used as a temporary background.**

All four are 1024x1536 portrait, opaque, AI-rendered full-page mockups. A
1024 px wide flattened image would need 1.88x at 1920, 2.50x at 2560 and
3.75x at 3840, and every one of them is portrait against landscape targets.

| File | Shows |
| --- | --- |
| `kerinti-homepage-final-reference.png` | Homepage — the Phase 1 target composition |
| `ChatGPT Image 20 Eyl 2026 11_54_47.png` | Contact page |
| `ChatGPT Image 20 Eyl 2026 11_54_40.png` | Contact page with the demo-request modal open |
| `ChatGPT Image 20 Eyl 2026 11_54_54.png` | About ("Hakkımızda") page |

These mockups also contain garbled auto-generated text in places. Transcribe
copy deliberately; never trust a string read off the raster.

## Gaps blocking later phases

1. **Hero background undersized.** 1672 px against a 3840 px target. Need a
   3840x2160 export of the same scene, same camera, same left-side negative
   space.
2. **No alpha anywhere.** The layered device model in
   `docs/VISUAL_ASSET_ARCHITECTURE.md` cannot be built from opaque rectangles.
   Either commission cut-outs, or build device bezels in CSS/SVG and drop the
   flat `_ss` screenshots into them.
3. **POS screenshot below 2x.** 1448 px against a ~900 px slot. Need
   1800x1350, or cap the render at 724 px.
4. **No vector artwork at all.** The Kerinti wordmark, the NeXa "K" mark, the
   twelve feature icons, the handwritten script phrases and the QR code exist
   only as pixels. Request source SVGs. The QR in particular must be
   regenerated as true vector — an upscaled raster QR may fail to scan.
5. **No mobile or tablet background crops.** One 16:9 landscape photo cannot
   serve 390x844.

### Phase 01G — counter scene rebuilt to image.png

The hero product scene was re-staged against `image.png` (1045x803), the
approved composite for this cluster. Geometry was measured with a 25px grid
overlaid on that file and expressed as fractions of the scene box
x 35..1015, y 55..745 (980 x 690, aspect **1.42** — the cluster's new aspect,
down from 1.65).

| Object | left | width | measured box in image.png | rotateY |
| --- | --- | --- | --- | --- |
| Monitor (dashboard) | 23.2% | 53.9% | 262..790 x 80..385 | -7° |
| POS (incl. wedge base) | 25.9% | 33.7% | 289..619 x 359..649 | +6° |
| Kitchen display | 59.9% | 39.8% | 622..1012 x 370..660 | -11° |
| Phone | 11.9% | 15.5% | 154..287 x 306..629 | +5° |
| QR stand | 0.6% | 11.2% | 42..149 x 455..645 | +9° |

Angles were derived by comparing each device's left and right edge heights in
the reference — the taller edge is the nearer one.

**Delivered density, measured in Chrome at 2560 CSS px / DPR 1:**

| Asset | Rendered | Served | Density |
| --- | --- | --- | --- |
| `nexa-dashboard-1442x1091.png` | 510 px | 1028 px | **2.02x** |
| `nexa-kitchen-1672x941.png` | 371 px | 755 px | **2.03x** |
| `nexa-pos-1448x1086.png` | 314 px | 629 px | **2.00x** |
| `nexa-mobile-941x1672.png` | 137 px | 276 px | **2.01x** |

`sizes` requests 2x the maximum rendered width and next/image serves the
narrowest candidate that satisfies it, so 2.0x is the delivered figure at
DPR 1 and the browser multiplies again on high-DPR displays, capped by the
source. Rendered widths are identical at 1920, 2560 and 3840: the cluster
stops growing at 1000 CSS px, so a larger monitor buys negative space, not
enlarged raster UI.

**Device bodies are CSS, and use container query units.** `product-screen.tsx`
declares `container-type: inline-size` on each device root, so every bezel,
radius, stand and base dimension is written in `cqw` — literally "percent of
this device's width", which is how they were measured. Percentage padding would
have worked; percentage `border-radius` would not, because it resolves per-axis
and turns corners into ellipses.

**The counter is new and is also pure CSS** (`counter-surface.tsx`): a top
plane, a bullnose rim and a front face, with veining, broad clouding, warm
light pools from the bar and a specular sweep. Its key tonal rule is that the
stone is *darkest under the devices and brightens toward the viewer*, matching
the light direction in the photograph; the first pass had this inverted and
read as grey fog. Each object also casts a mirror reflection
(`Grounded` in `product-visual-cluster.tsx`: `scaleY(-1)` about the bottom
edge plus a mask). The monitor is the one exception — it is anchored by its
top edge, so its box ends well above the stone and a mirror struck from there
would hang in mid-air.

**Deviations from image.png that remain asset-limited.** Our screenshots keep
their true aspect ratios and are never cropped or stretched, and three of them
are shaped differently from the reference hardware:

| Element | image.png ratio | Our asset | Delta |
| --- | --- | --- | --- |
| Main monitor | 1.75 | 1.32 | **-25%** |
| POS terminal | 1.45 | 1.33 | -8% |
| Kitchen display | 1.71 | 1.78 | +4% |
| Phone body | 0.41 | 0.56 (screen) | **+37%** |

Each object therefore matches the reference's measured *width* and *contact
point*, and its height falls where the asset's real ratio puts it. For the
monitor that means the body runs about 15% of the cluster height lower than the
reference's — invisible, because the phone, POS and kitchen display already
span its full width and all reach further down the frame. For the phone it
means a visibly stockier device than the reference's. Closing these needs
screen captures authored at the target device ratios, or transparent hardware
renders with empty screen areas.

**Breakpoint change.** The cluster now appears at `xl` (1280px) rather than
`lg` (1024px). The copy column has a 540px floor, so at 1024 the cluster was
left 381px and the dashboard rendered 178 CSS px wide — its UI text stopped
being readable. At 1280 the cluster gets 605px and the dashboard 309 px.
Below `xl` the hero is copy over photograph.

## Phase 01G — hero product scene moved to WebGL

The right-hand product cluster is now a real 3D scene (React Three Fiber +
drei). The left copy column, the header, the hero structure and the
hero-to-white boundary are untouched.

### Screen textures — `/public/textures`

`next/image` cannot serve these: three.js loads a URL directly, outside the
optimizer. `scripts/build-textures.mjs` (`npm run textures`) prepares them from
the masters in `/static_design`. It refuses to upscale — the script throws if a
target width exceeds its master — and derives height from width so aspect is
preserved exactly.

| Texture | Master | Master size | Delivered | Scale | Size |
| --- | --- | --- | --- | --- | --- |
| `nexa-dashboard.webp` | `nexa_ana_ekrani_ss.png` | 1442x1091 | 1442x1091 | 1.000x | 145 KB |
| `nexa-kitchen.webp` | `nexa_mutfak_ekrani_ss.png` | 1672x941 | 1280x720 | 0.766x | 90 KB |
| `nexa-pos.webp` | `nexa_ekrani_ss.png` | 1448x1086 | 1024x768 | 0.707x | 150 KB |
| `nexa-mobile.webp` | `nexa_ekrani_mobil_ss.png` | 941x1672 | 512x910 | 0.544x | 84 KB |

469 KB total. Target widths come from each screen's share of the 1000 CSS px
cluster doubled for a DPR-2 drawing buffer. WebP q=90, lanczos3, which is the
same quality tier the DOM hero negotiates through next/image.

Every screen renders with `meshBasicMaterial` and `toneMapped={false}`: a lit
material would push the UI through the key light and ACES tone mapping and
crush the small text. Textures get sRGB decode, a full mip chain and maximum
anisotropy — anisotropy matters most, because without it the angled screens
smear along the direction of the turn, which is exactly where UI text has to
stay readable.

**The tablet texture is a stand-in.** The phase brief requires a tablet in the
cluster and there is no tablet capture in the project, so it renders
`nexa-pos.webp` — the order screen, which is at least the plausible thing on a
table-side tablet. It is also the one object not present in image.png; it is
placed back-left, where the reference leaves empty background, so it fills that
gap rather than disturbing the approved silhouette.

### Scene geometry

All measured numbers live in `components/home/hero/stage/scene-layout.ts`.
One world unit = 100 px of image.png, and the counter's surface is the y = 0
plane, so "this device stands on the counter" is structural: every object's
`position.y` is 0 and a `lift` field says how far its stand raises the shell.

Camera: fov 17.5 at ~23 units, pitched 11.2 degrees down — roughly a 135mm
equivalent. A first pass used fov 30 at 12.6 units and the perspective
divergence was wrong: the POS sits two units in front of the monitor and
projected 21% larger relative to it than the reference shows, burying more than
half the dashboard. A longer lens keeps the same field while compressing
near-to-far size differences, so the measured proportions survive without
flattening the staging.

### What is not raster

The Kerinti wordmark on the POS base and the printed face of the QR stand are
drawn at runtime with the 2D canvas API
(`components/home/hero/stage/canvas-textures.ts`), so nothing is traced from a
reference screenshot and both inherit the site's own typeface. The QR area
stays a deliberately inert checker placeholder — not scannable, encoding
nothing. The counter's marble and its fade-out mask are generated the same way.

### Fallback

`hero-product-stage.tsx` renders the Phase 01F DOM cluster on the server and
until WebGL2 is proven on the client, and falls back to it permanently if the
GL context is lost. There is no second code path to keep working: the fallback
is the full static composition.

### Known issue found during QA — not a site bug

A `ResizeObserver` only delivers while the page is being rendered. A Chrome
window that is occluded or minimised is not, so R3F's container measurement
never arrives and the renderer sits at the HTML default 300x150. This
reproduced consistently on a Chrome window behind another one, where a freshly
created ResizeObserver on the same element also never fired once. `ResizeGuard`
in `product-scene.tsx` reads the size synchronously with
`getBoundingClientRect` in a layout effect for this reason, and `SettleFrames`
wakes the render loop on `visibilitychange` and on intersection. Anyone doing
visual QA on this hero should make sure the browser window is actually visible.

### Remaining blockers, unchanged from Phase 01F

The device *shapes* are still constrained by the screenshot aspect ratios; see
the Phase 01G table above for the deltas. A dedicated tablet capture, and
screen captures authored at the reference device ratios, remain the two assets
that would close the gap. The hero background is still 1672 px against a 3840
px target, and the Kerinti wordmark, the NeXa mark and the QR code still exist
only as pixels.

## Phase 01H — marble counter, image.png device line-up, native textures

### Counter stone — `/public/textures/counter-marble-4096x2048.webp`

| Field | Value |
| --- | --- |
| Role | material texture (generated, not photographic) |
| Natural | 4096x2048, seamless tile, RGB |
| Size | ~540 KB WebP q88 |
| Source | `scripts/build-marble.mjs` (`npm run marble`), deterministic seed |
| Density | one tile = 9 x 4.5 world units, ~455 texels per unit |

The stone was requested "exactly as in image.png". It was **not** cut out of
image.png, for two measurable reasons:

- image.png is 1045x803 in total; the counter strip is ~1045x200 px in steep
  perspective. Spreading it over the ~1300 CSS px counter would need a 3-4x
  upscale at 1920 and more at 2560+, which `docs/IMAGE_PIPELINE.md` forbids.
- The strip carries baked-in mirror reflections of image.png's own devices
  (the red "kerinti" base, the kitchen tickets, the QR card). Those would
  appear in our counter under objects that are not there.

Instead the same stone is synthesised at 4096 px with its character measured
off image.png: cool grey-white ground (luminance median ~99 under the
reference lighting), charcoal veins drawn as zero-crossings of domain-warped
noise so they are continuous and branching, faint white quartz veins and
granular speckle.

The earlier counter read brown because of a beige base colour, `metalness`
0.45 and an orange point light at intensity 90 filling the slab. All three
are gone; the bar's warmth is now a highlight and a small amber pool.

The counter now has a **bullnose front edge** and a dark front face, as in
image.png. The canvas is drawn 1.3x taller than the measured scene box
(`CANVAS_EXTEND`), with a camera view offset, so the rim and face are drawn
below the box without changing how the devices are framed.

### Device line-up now matches image.png

The back-left tablet (a Phase 01G addition not present in image.png) is
removed. The five objects are exactly image.png's: QR stand, phone, POS on
the kerinti wedge, dashboard monitor, kitchen tablet.

- **Kitchen display** is now a slim black tablet with even thin bezels,
  leaning back 12 degrees on a rear kickstand and a rubber lip, instead of a
  monitor on a neck.
- **Phone** has thin even bezels, a black glass front, a titanium side band
  and a camera cut-out. The cut-out sits in empty space at the top of our
  capture, between the logo and the search button.
- **All screens** have rounded panel corners, a black glass border and a
  faint additive sheen. The monitor's border is 0.07 units, which separates the
  silver frame from the UI as in image.png.
- **QR card** now shows a QR-structured module grid (finder squares, timing,
  alignment) instead of a checkerboard. It is still **decorative and not
  scannable**. Replace it with a real vector code once the table URL is
  decided.

### Screen textures now at native resolution

`scripts/build-textures.mjs` now delivers every screen at its master's native
width (WebP q92). Nothing is upscaled.

| Texture | Master | Delivered | Size |
| --- | --- | --- | --- |
| `nexa-dashboard.webp` | 1442x1091 | 1442x1091 | 167 KB |
| `nexa-kitchen.webp` | 1672x941 | 1672x941 (was 1280) | 150 KB |
| `nexa-pos.webp` | 1448x1086 | 1448x1086 (was 1024) | 283 KB |
| `nexa-mobile.webp` | 941x1672 | 941x1672 (was 512) | 228 KB |

This is the ceiling: going sharper at 4K needs larger **source captures**,
not a different pipeline.

### Verified in Chrome (AMD RX 7800 XT, DPR 1)

1920x945 (live window), 1366x768, 2560x1440 and 3840x2160 (fixed-size
iframes). No horizontal overflow at any size. Cluster capped at 1000 CSS px
at 1920 and above, per `HERO_RESPONSIVE_SPEC.md`. Below 1280 the cluster is
hidden, which is unchanged by this phase.

## Phase 02 — rest of the site (hero frozen)

### New published assets

Byte-identical copies of their `/static_design` masters (md5 verified at copy
time). Nothing was resized or re-encoded on disk; `next/image` negotiates
WebP at request time. Masters are untouched.

| Published path | Master | Natural | Role | Used at (max CSS) | Density |
| --- | --- | --- | --- | --- | --- |
| `images/sectors/restoranlar-1448x1086.png` | `ChatGPT Image 20 Eyl 2026 13_57_42.png` | 1448x1086 | `photo-background` | 360 px (Çözümler), ~290 px (grids), 620 px (Referanslar hero) | ≥2.3x |
| `images/sectors/kafeler-1448x1086.png` | `… 13_57_31.png` | 1448x1086 | `photo-background` | same; 620 px on İletişim hero | ≥2.3x |
| `images/sectors/pastaneler-1448x1086.png` | `… 13_57_48.png` | 1448x1086 | `photo-background` | ≤360 px | ≥4x |
| `images/sectors/fast-food-1448x1086.png` | `… 13_57_53.png` | 1448x1086 | `photo-background` | ≤360 px | ≥4x |
| `images/sectors/oteller-1448x1086.png` | `… 13_58_01.png` | 1448x1086 | `photo-background` | ≤360 px | ≥4x |
| `images/sectors/yeme-icme-gruplari-1448x1086.png` | `… 13_58_06.png` | 1448x1086 | `photo-background` | ≤620 px (Çözümler hero) | ≥2.3x |
| `images/cta/plated-dish-1448x1086.png` | `… 13_58_12.png` | 1448x1086 | `photo-background` | 560 px (CTA band, masked) | 2.6x |
| `images/scenes/pos-on-marble-1448x1086.png` | `nexa_ekrani.png` | 1448x1086 | `photo-background` | 620 px (Modüller hero) | 2.3x |
| `images/scenes/pos-angled-1122x1402.png` | `nexa_ekrani_2.png` | 1122x1402 | `photo-background` | published, not yet used | — |
| `images/scenes/phone-qr-menu-1122x1402.png` | `nexa_ekrani_mobil.png` | 1122x1402 | `photo-background` | published, not yet used | — |
| `images/scenes/qr-table-stand-1122x1402.png` | `nexa_qr.png` | 1122x1402 | `photo-background` | published, not yet used | — |

Existing product UI reused on `/urun`, each capped by `components/ui/screenshot.tsx`
at 640 CSS px (dashboard 2.25x, POS 2.26x, kitchen 2.6x) and the phone frame
at 290 px (3.2x). Page-hero photographs are capped at 620 CSS px by
`components/ui/photo-card.tsx` (≥1.5x photo target).

Sector mapping (checked visually against the contact sheet): Restoranlar →
13_57_42, Kafeler → 13_57_31, Pastaneler → 13_57_48, Fast Food → 13_57_53,
Oteller → 13_58_01, Yeme-İçme Grupları → 13_58_06.

### Content decisions

- **Contact data**: the Giresun set from the contact-page reference, confirmed
  by the site owner on 2026-09-21. The homepage mockup's İstanbul address, phone
  and domain are AI filler and are not used. Single source: `lib/site.ts`.
- **Testimonials**: demo, anonymous, visibly labelled "Örnek yorum"
  (`lib/content/social-proof.ts`). The reference's named people are not used.
- **Brand logos**: none. The reference shows real third-party trademarks with
  no permission or files. `BRANDS` is empty; the section renders only in
  development (as labelled empty slots) and is absent from production HTML.
- **Icons**: `lucide-react` is the single icon system for everything outside
  the frozen hero (the hero keeps its Phase 01 glyphs).

### Missing assets / pending items

1. **Customer testimonials** — real, consented quotes (name/business as agreed).
2. **Customer logos** — approved SVG/PNG files with permission to display.
3. **KVKK aydınlatma metni** — the consent checkbox text refers to it; there is
   no page to link to yet.
4. **Contact form backend** — none exists. Set `NEXT_PUBLIC_CONTACT_ENDPOINT`
   (JSON POST) or replace `submitContactForm` in `lib/contact-service.ts`.
   Until then the form tells the visitor the message was *not* sent and offers
   a prefilled e-mail and the phone number.
5. **Social profile URLs** — footer renders none until `SITE.social` is filled.
6. **Team / office photography** — the about and contact references show
   team photos that do not exist in the project; those heroes use restaurant
   and product photography instead.
7. **Footer links in the reference with no page**: Fiyatlandırma, Kariyer,
   Blog, Yardım Merkezi, Uzaktan Destek — omitted rather than linked to nothing.

## Phase 03 — homepage hero matched to the full reference

Target: `ChatGPT Image 20 Eyl 2026 13_11_31.png` (1672x941, project root), the
whole first screen. `image.png` was verified to be an unscaled crop of it at
offset (614, 118), so the 3D scene measurements carried over directly: the
device box is x 649..1629, y 173..863 of the full reference.

**Nothing from the reference is rendered.** It is used for measurement and
for overlay QA only (a temporary copy in /public was deleted after QA).

### How the match is built

- `components/home/hero/hero-stage.css` lays the desktop hero (xl+) out in the
  reference's own coordinates, scaled by `--u` = min(width/1672,
  height/941, 2560px/1672). `--u` is a registered `<length>` (globals.css).
  Below xl the same DOM is the ordinary flow layout.
- Header, badge, headline, lead, benefits, CTAs, checks and wall script are
  live DOM text at measured positions. Type is Inter (the site face); the
  reference face is narrower, so sizes/tracking are calibrated to measured
  widths (headline line 1: 622px in the reference, 632px ours).
- The 3D canvas is full-bleed so the counter spans the hero; the camera frames
  the `.hs-device-box` element with a view offset (read from the DOM).
- Device widths/positions are now depth-corrected: "1 unit = 100px" only
  holds at z = 0, so objects further back were ~10% small. QR stand and phone
  moved to z -2.0 / -2.2 to sit on the reference's contact line; the counter
  is bar-depth (back edge z -3.0, ~y 740).
- Background: the restaurant photo zoomed 1.35x from its top-right corner so
  its back bar fills the right of the hero; 3px blur as depth of field. Left
  side is the sampled reference navy #002459.
- Canvas drawing buffer is at least 1.5x (supersampling) so the screenshot
  UI stays clean on DPR-1 monitors.

### Remaining differences (asset-limited)

- Phone is shorter than the reference iPhone (capture ratio 0.56 vs 0.41);
  kitchen tablet is shorter (1.78 vs ~1.43). Needs captures at those ratios.
- Screens show our real NeXa captures, not the reference's mock UI.
- Reference typeface is not Inter; widths match, glyph shapes differ.
- "Ürün Videosunu İzle" links to /urun — no product video exists yet.
- At 2560 the dashboard renders ~760 CSS px (1.9x at DPR 1). A ~1600px
  dashboard master would restore 2x there.

## Official Kerinti logo — 2026-09-21

- Source: https://kerinti.com.tr/assets/logo.png (linked by https://kerinti.com.tr/).
- Local file: `public/images/brand/kerinti-logo.png`.
- Role: brand artwork (official raster; vector source not supplied).
- Natural dimensions: 1600 × 803; PNG; 286727 bytes; alpha yes.
- Breakpoints: all; max CSS width 152px; target density 2; status usable.
- Used unmodified by the shared header/footer wordmark; original embedded slogan retained.
- Homepage POS preview: `nexa-pos-1448x1086.png`, product-ui; max CSS width 698px, density 2.07×. No photographic background or generated backdrop is added.
