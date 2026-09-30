import Image from "next/image";
import type { ProductSlug } from "@/lib/content/products";

/**
 * The official neXa sys and nexus logos, as used on web.kerinti.com.tr
 * (public/images/brand/products, see docs/ASSET_MANIFEST.md). Each comes in
 * a light-background and a dark-background version; the theme picks one
 * (or `ground` forces one). The alt text is the product name, the same in
 * both languages, so the component works in server and client trees alike.
 *
 * Sizing: pass the rendered height. Sources are 520×274 (neXa) and 313×292
 * (nexus), so keep neXa ≤ 137px and nexus ≤ 146px tall to stay at 2x.
 */

const LOGOS: Record<ProductSlug, { alt: string; width: number; height: number }> = {
  nexa: { alt: "neXa sys", width: 520, height: 274 },
  nexus: { alt: "nexus", width: 313, height: 292 },
};

export function ProductLogo({
  product,
  height,
  className = "",
  ground,
  eager = false,
}: {
  product: ProductSlug;
  height: number;
  className?: string;
  /** Force the version for a known ground instead of following the theme. */
  ground?: "light" | "dark";
  /** Above-the-fold logos load without waiting for the viewport. */
  eager?: boolean;
}) {
  const l = LOGOS[product];
  const width = Math.round((l.width / l.height) * height);
  const common = {
    width: l.width,
    height: l.height,
    sizes: `${width}px`,
    style: { height, width },
    loading: eager ? ("eager" as const) : ("lazy" as const),
  };
  if (ground) {
    return (
      <span className={`inline-flex ${className}`}>
        <Image src={`/images/brand/products/${product}-logo-${ground}.png`} alt={l.alt} {...common} />
      </span>
    );
  }
  return (
    <span className={`inline-flex ${className}`}>
      <Image src={`/images/brand/products/${product}-logo-light.png`} alt={l.alt} {...common} className="dark:hidden" />
      <Image src={`/images/brand/products/${product}-logo-dark.png`} alt={l.alt} {...common} className="hidden dark:block" />
    </span>
  );
}
