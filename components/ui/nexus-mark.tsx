import { MARK_STROKE, ProductMark, type MarkProps, type MarkSpec } from "./product-mark";

/**
 * nexus — end-to-end business management.
 *
 * A hub: one ring in the centre with four nodes wired to it on the straight
 * axes. neXa's X runs on the diagonals and this runs on the orthogonals, so
 * the two glyphs share a grid and a stroke but never look alike, even at
 * favicon size. Indigo→violet tile; the "x" is the accented letter, echoing
 * neXa.
 */
const NEXUS: MarkSpec = {
  defaultTitle: "nexus",
  gradient: ["#4338ca", "#8b5cf6"],
  accent: { light: "#4338ca", dark: "#a5b4fc" },
  accentVar: "--k-nexus",
  glyph: (
    <g stroke="currentColor" strokeWidth={MARK_STROKE} strokeLinecap="round">
      <circle cx="16" cy="16" r="3.75" fill="none" />
      <path d="M16 8.25v4M16 19.75v4M8.25 16h4M19.75 16h4" />
      <g fill="currentColor" stroke="none">
        <circle cx="16" cy="7.5" r="2.5" />
        <circle cx="16" cy="24.5" r="2.5" />
        <circle cx="7.5" cy="16" r="2.5" />
        <circle cx="24.5" cy="16" r="2.5" />
      </g>
    </g>
  ),
  word: ["ne", "x", "us"],
  wordLength: 66,
};

export function NexusMark(props: MarkProps) {
  return <ProductMark spec={NEXUS} {...props} />;
}
