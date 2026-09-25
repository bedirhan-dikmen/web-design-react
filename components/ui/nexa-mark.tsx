import { MARK_STROKE, ProductMark, type MarkProps, type MarkSpec } from "./product-mark";

/**
 * neXa sys — order management.
 *
 * The X is the focal glyph: two orders crossing, and the rising stroke ends
 * in an arrowhead because every order is going somewhere (table → kitchen →
 * report). Teal→cyan tile; the capital X is the accented letter.
 */
const NEXA: MarkSpec = {
  defaultTitle: "neXa sys",
  gradient: ["#0f766e", "#22d3ee"],
  accent: { light: "#0f766e", dark: "#5eead4" },
  accentVar: "--k-nexa",
  glyph: (
    <g fill="none" stroke="currentColor" strokeWidth={MARK_STROKE} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 9 23 23" />
      <path d="M9 23 22.5 9.5" />
      <path d="M16.5 9h6.5v6.5" />
    </g>
  ),
  word: ["ne", "X", "a"],
  wordLength: 54,
  suffix: { text: "sys", length: 24 },
};

export function NexaMark(props: MarkProps) {
  return <ProductMark spec={NEXA} {...props} />;
}
