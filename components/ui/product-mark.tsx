import { useId } from "react";

/**
 * Shared construction for the Kerinti product marks (neXa, nexus).
 *
 * Both marks sit on the same 32-unit grid: a 32×32 tile with an 8-unit
 * corner radius, a glyph drawn with a 3.5-unit round-capped stroke inside a
 * 7–25 safe area, and a wordmark set in Manrope at 22 units. Keeping these in
 * one place is what makes the two logos read as one family; each product only
 * supplies its glyph, its gradient and its word.
 *
 * Everything is inline SVG. The wordmark uses <text> locked with
 * `textLength`, so its width is fixed even before the web font loads.
 */

export type MarkVariant = "full" | "symbol" | "mono" | "on-dark";

export type MarkProps = {
  /** Rendered height in CSS px. Width follows from the aspect ratio. */
  size?: number;
  variant?: MarkVariant;
  /** Accessible name. Pass an empty string when the mark is decorative. */
  title?: string;
  className?: string;
};

export type MarkSpec = {
  defaultTitle: string;
  /** Gradient stops for the tile, start → end (top-left → bottom-right). */
  gradient: [string, string];
  /** Accent used for the highlighted letter on light and dark grounds. */
  accent: { light: string; dark: string };
  /** Theme token for the accent; lets the "full" variant follow the site theme. */
  accentVar: string;
  /** Glyph strokes/fills in the 32-unit grid; drawn in `currentColor`. */
  glyph: React.ReactNode;
  /** Wordmark pieces: [before, highlighted, after]. */
  word: [string, string, string];
  /** Width in grid units that the main word occupies. */
  wordLength: number;
  /** Optional light suffix, e.g. "sys". */
  suffix?: { text: string; length: number };
};

export const MARK_STROKE = 3.5;
const TILE = 32;
const GAP = 9;
const SUFFIX_GAP = 5;

export function ProductMark({ spec, size = 32, variant = "full", title, className = "" }: MarkProps & { spec: MarkSpec }) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `${uid}-g`;
  const maskId = `${uid}-m`;
  const name = title ?? spec.defaultTitle;

  const symbolOnly = variant === "symbol";
  const mono = variant === "mono";
  const dark = variant === "on-dark";

  const wordX = TILE + GAP;
  const suffixX = wordX + spec.wordLength + SUFFIX_GAP;
  const width = symbolOnly
    ? TILE
    : spec.suffix
      ? suffixX + spec.suffix.length
      : wordX + spec.wordLength;

  const inkColor = mono ? "currentColor" : dark ? "#ffffff" : "var(--k-ink, #16161a)";
  // "full" follows the site theme through CSS variables (fallbacks = light).
  const accentColor = mono ? "currentColor" : dark ? spec.accent.dark : `var(${spec.accentVar}, ${spec.accent.light})`;
  const suffixColor = mono ? "currentColor" : dark ? "rgb(255 255 255 / 0.7)" : "var(--k-ink-2, #4a4a55)";

  return (
    <svg
      viewBox={`0 0 ${width} ${TILE}`}
      height={size}
      width={(size * width) / TILE}
      role={name ? "img" : undefined}
      aria-hidden={name ? undefined : true}
      aria-label={name || undefined}
      className={`inline-block shrink-0 ${className}`}
      focusable="false"
    >
      {name && <title>{name}</title>}
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={spec.gradient[0]} />
          <stop offset="1" stopColor={spec.gradient[1]} />
        </linearGradient>
        {mono && (
          // Mono cuts the glyph out of the tile so the mark works as a single
          // ink on any ground (stamps, embossing, one-colour print).
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={TILE} height={TILE}>
            <rect width={TILE} height={TILE} fill="#fff" />
            <g color="#000">{spec.glyph}</g>
          </mask>
        )}
      </defs>

      {mono ? (
        <rect width={TILE} height={TILE} rx="8" fill="currentColor" mask={`url(#${maskId})`} />
      ) : (
        <>
          <rect width={TILE} height={TILE} rx="8" fill={`url(#${gradientId})`} />
          {/* Soft top light, same on both products. */}
          <rect x="1" y="1" width={TILE - 2} height="14" rx="7" fill="#fff" opacity="0.12" />
          {/* Hairline: invisible on light grounds, keeps the graphite tile
              readable on dark ones. */}
          <rect x="0.5" y="0.5" width={TILE - 1} height={TILE - 1} rx="7.5" fill="none" stroke="#fff" strokeOpacity="0.16" />
          <g color="#ffffff">{spec.glyph}</g>
        </>
      )}

      {!symbolOnly && (
        <text
          x={wordX}
          y="23.5"
          fontFamily="var(--font-manrope), Manrope, system-ui, sans-serif"
          fontSize="22"
          fontWeight="800"
          letterSpacing="-0.5"
          textLength={spec.wordLength}
          lengthAdjust="spacingAndGlyphs"
          fill={inkColor}
        >
          {spec.word[0]}
          <tspan fill={accentColor}>{spec.word[1]}</tspan>
          {spec.word[2]}
        </text>
      )}
      {!symbolOnly && spec.suffix && (
        <text
          x={suffixX}
          y="23.5"
          fontFamily="var(--font-manrope), Manrope, system-ui, sans-serif"
          fontSize="15"
          fontWeight="600"
          textLength={spec.suffix.length}
          lengthAdjust="spacingAndGlyphs"
          fill={suffixColor}
        >
          {spec.suffix.text}
        </text>
      )}
    </svg>
  );
}
