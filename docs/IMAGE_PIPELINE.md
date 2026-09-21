# Image Pipeline and Delivery Rules

## Principle

Image quality is determined first by source resolution and rendering size, then by encoding and delivery. Optimization must not mean destructive quality loss.

## Format guidance

Use SVG for logos, icons, line art, simple decorative marks, and QR artwork when possible.

Use PNG or lossless/high-quality WebP for application screenshots and other assets containing small text, fine lines, or hard UI edges. AVIF can work for UI only after visual inspection; aggressive compression can make small text and thin borders look muddy.

Use AVIF/WebP/JPEG for photographic backgrounds. Export multiple widths rather than serving one enormous file to every device.

## Source variants

For a full-width photographic hero, prepare art-directed sources appropriate to the design, for example:

```text
hero-bg-mobile.*
hero-bg-tablet.*
hero-bg-desktop-1920.*
hero-bg-desktop-2560.*
hero-bg-desktop-3840.*
```

Exact widths should be chosen after inspecting the actual image and the site breakpoints. Do not generate giant variants without a real display need.

For product UI layers, size source files relative to the maximum rendered component size. A component expected to render at 900 CSS px should ideally have around 1800 source pixels when fine UI text must stay crisp.

## Next.js guidance

If the project uses Next.js, inspect the installed version first.

For responsive images, provide a correct `sizes` value so the browser can choose an appropriate candidate from `srcset`. A `fill` image without a meaningful `sizes` declaration can make the browser assume a much larger display width than necessary.

For a hero/LCP image, use the image-loading mechanism supported by the installed Next.js version. In Next.js 16+, `priority` is deprecated in favor of newer loading controls; do not copy old snippets without checking the installed version.

Do not globally set `unoptimized` to avoid solving the underlying sizing issue. Do not set `quality=100` as a substitute for adequate source dimensions.

## CSS rules

Use `object-fit: cover` only for photographic layers where controlled cropping is acceptable.

Use `object-fit: contain` or intrinsic sizing for product UI/device compositions when the full asset must remain visible.

Always preserve aspect ratio. If CSS sets a custom width on an image, ensure height remains automatic unless an intentional crop container is used.

## Asset manifest requirement

Create or maintain an asset manifest containing:

```text
filename
role
natural width × height
format
file size
alpha yes/no
intended breakpoint(s)
max CSS width
required density
status: usable / replace / reference-only
```

The implementation agent must consult this manifest before choosing a source image.

## Missing-resolution rule

If a required device/UI asset is not large enough for the intended display size, do not upscale it and do not invent detail with filters. Report the target rendered size and the minimum requested source dimensions. Wait for a replacement asset or reduce the designed rendered size.
