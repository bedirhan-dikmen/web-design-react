/**
 * ASSET BLOCKER — temporary NeXa mark.
 *
 * Same situation as the Kerinti wordmark: no vector source exists. Rendered as
 * DOM text, isolated for a one-file swap when the real SVG arrives.
 */

export function NexaMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1 leading-none ${className}`}>
      <span className="font-black text-brand-red">K</span>
      <span className="font-semibold text-white">NeXa</span>
    </span>
  );
}
