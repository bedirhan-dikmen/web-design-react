# Homepage Hero Responsive Specification

## Product intent

On first load in landscape desktop use, the navigation plus hero should occupy the first viewport as a deliberate opening scene. The next section must begin as a clean white surface immediately after the hero. The hero must not become a giant zoomed screenshot.

## Structural model

Use a semantic structure equivalent to:

```text
SiteHeader
HeroSection
  PhotoBackground
  ContrastOverlay
  HeroContentGrid
    HeroCopy
    HeroDeviceCluster
WhiteMainContent
```

The copy and the product/device cluster are layout siblings, not pixels baked into one background image.

## Desktop behavior

For typical desktop landscape sizes, the hero should visually occupy the first screen. Use viewport-aware sizing such as `100svh` or a header-aware equivalent, while enforcing reasonable minimum and maximum heights so ultrawide and short laptop screens remain usable.

Do not use a fixed pixel height copied from the 1024 px reference image.

The white content section must start directly after the hero; it must not appear inside the hero because the background image ran out of pixels.

## Composition

The photographic scene can fill the entire hero. Keep its focal subjects stable with explicit `object-position`/background positioning per breakpoint.

Place the product/device cluster in a bounded wrapper whose width scales using `clamp()` or equivalent. The cluster should not scale indefinitely with viewport width. Define a maximum physical composition width.

Keep all major visual elements within a safe area. Avoid positioning critical content using percentages copied from the reference screenshot without constraints.

## Breakpoints and art direction

At minimum, design and verify separate behavior for:

- mobile portrait: around 390 px wide;
- tablet: around 768–1024 px;
- desktop FHD: 1920 × 1080;
- desktop QHD/2K: 2560 × 1440;
- desktop UHD/4K: 3840 × 2160.

A single crop is not required to serve every breakpoint. Use art-directed background variants when the focal composition changes. It is better to use a dedicated mobile/tablet crop than to zoom the desktop image until subjects disappear.

## Text fidelity

Headline, paragraph, CTA labels, navigation labels, small benefits, and accessible product descriptions must remain DOM text. Product UI text visible inside dashboard screenshots may remain raster only if the source screenshot has enough native resolution to stay readable at the intended rendered size.

## 4K behavior

Do not let the device cluster expand proportionally all the way to 3840 px. On large screens, increase negative space and background coverage while keeping the product composition at a deliberate capped size. This avoids forcing 2K assets to become 4K-sized UI elements.

## Mobile behavior

Do not simply scale the desktop scene down. Reduce visual density. Reorder copy and device assets as needed, hide non-essential decorative pieces, and use a mobile-specific background crop if necessary. Maintain real text and primary CTA visibility above the fold.
