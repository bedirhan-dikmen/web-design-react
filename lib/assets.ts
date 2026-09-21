/**
 * Asset sizing rules for the Kerinti website.
 *
 * These encode docs/VISUAL_ASSET_ARCHITECTURE.md so that later phases can
 * check a decision in code review instead of eyeballing it. Nothing here
 * loads or transforms an image — it is arithmetic and vocabulary only.
 */

/** Classification every visual asset must carry. See the architecture doc. */
export type AssetRole =
  | "photo-background"
  | "product-ui"
  | "device-frame"
  | "brand-vector"
  | "decorative-vector"
  | "reference-only";

/**
 * Target source-pixels per rendered CSS pixel.
 *
 * Product UI carries small text and hard 1px borders, so it needs 2x to stay
 * legible on high-density displays. Photographic layers have no fine text and
 * survive 1.5x; pushing them to 2x costs bandwidth for no visible gain.
 */
export const TARGET_DENSITY = {
  productUi: 2,
  photo: 1.5,
} as const;

/**
 * Largest CSS width an asset may be rendered at before it is being upscaled
 * past its safe limit.
 *
 *   safe_max_css_width = natural_pixel_width / target_density
 *
 * If a design calls for more than this, the asset is too small — request a
 * larger export rather than stretching it (docs/IMAGE_PIPELINE.md).
 */
export function safeMaxCssWidth(
  naturalWidth: number,
  density: number = TARGET_DENSITY.productUi,
): number {
  if (naturalWidth <= 0) throw new Error("naturalWidth must be positive");
  if (density <= 0) throw new Error("density must be positive");
  return Math.floor(naturalWidth / density);
}

/**
 * How far beyond its safe size an asset would be stretched at a given render
 * width. Returns 1 when the asset is comfortably large enough; anything above
 * 1 is upscaling and must be reported, not hidden.
 */
export function upscaleFactor(
  naturalWidth: number,
  renderedCssWidth: number,
  density: number = TARGET_DENSITY.productUi,
): number {
  const safe = safeMaxCssWidth(naturalWidth, density);
  return renderedCssWidth <= safe ? 1 : renderedCssWidth / safe;
}
