# Visual Asset Architecture

## Objective

The site must look like the approved Kerinti references while remaining sharp and responsive at 1080p, 1440p/2K, and 4K. The solution is compositing, not screenshot scaling.

## The wrong architecture

Do not implement a desktop hero as one image that contains the background, people, dashboard, QR stand, phones, device frames, headings, buttons, labels, and handwritten copy. A single flattened raster forces the browser to crop or upscale the entire composition whenever the viewport changes. Readable UI text degrades first.

Do not fix a soft image by increasing CSS width, forcing `object-cover`, adding sharpening filters, or setting encoder quality to 100. None of these creates missing source pixels.

## The required hero layer model

Use a layered composition with clear responsibilities.

### Layer A — photographic environment

A high-resolution restaurant/office photographic scene. This layer may use controlled `cover` behavior because minor cropping is acceptable. It should not contain important readable product UI.

### Layer B — lighting and contrast overlays

CSS gradients, vignettes, translucent navy overlays, or other non-destructive styling used to guarantee copy contrast and match the reference.

### Layer C — HTML content

The left-side badge, headline, paragraph, CTA buttons, benefits, navigation, and all semantically meaningful copy should be real text in the DOM.

### Layer D — product/device cluster

Dashboard monitor, POS display, kitchen display, tablet, phone, QR stand, and other product visuals should be separate source assets. Device UI must remain readable at its intended size. Prefer transparent PNG/WebP where alpha is needed; use lossless or visually lossless encoding for UI-heavy assets.

### Layer E — decorative brand elements

Kerinti/Nexa logos and line-art decorations should use SVG where source artwork exists. Decorative handwritten phrases may be SVG or real text using an approved font, but should not be embedded into a low-resolution background.

## Safe raster sizing rule

For each UI-heavy raster asset:

`safe_max_css_width ≈ natural_pixel_width / target_density`

Use a target density of about 2 for crisp product UI on high-density displays when file size allows.

Example: a 1800 px wide dashboard screenshot should normally render no wider than about 900 CSS px when it contains small readable text.

Photographic assets can tolerate lower effective density than UI screenshots because they contain no fine text. Logos, icons, QR codes, and vector-like line art should use SVG when available.

## Asset roles

Classify every visual asset as one of:

- `photo-background`
- `product-ui`
- `device-frame`
- `brand-vector`
- `decorative-vector`
- `reference-only`

Anything marked `reference-only` must not be imported by production components.

## Reference screenshot policy

The provided full-page screenshots are 1024 × 1536. They are sufficient for layout comparison but not for a production desktop hero. Store them under a clearly named reference directory such as `references/` or `design/reference/`, and make sure production imports cannot accidentally use them.
