/**
 * The handwritten wall script from the approved target.
 *
 * TEMPORARY BRAND STAND-IN. No brand handwriting artwork exists in the repo,
 * so this renders DOM text in a marker face (Caveat) with an SVG brush
 * underline. Being live text rather than a raster, it stays crisp at every
 * resolution and zoom level — but the letterforms are not Kerinti's own hand.
 * Replace with the real lettering as SVG when it arrives.
 */

function BrushUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 16"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
    >
      {/* Tapered stroke: thin on entry, swelling mid-sweep, flicking out — a
          marker pulled left-to-right rather than a uniform rule. */}
      <path
        d="M3 11.5c34-5.2 71-8.1 108-8.6 33-.4 66 1.3 106 5.9-38-1.2-72-1.2-104-.4-37 .9-74 3.4-110 8.1z"
        fill="var(--color-brand-red)"
      />
    </svg>
  );
}

export function HeroScriptText() {
  return (
    <div
      aria-hidden="true"
      // Placed and turned by .hs-script (hero-stage.css): x 1452, y ~236, -13deg.
      className="hs-script pointer-events-none z-30 hidden select-none"
    >
      <p className="font-script font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
        Lezzetle
        <br />
        işletmeler için
        <br />
        Akıllı Çözümler
      </p>
      {/* Under the last line, running a little past it, as in the target. */}
      <BrushUnderline className="mt-[2%] ml-[3%] h-[0.5em] w-[96%]" />
    </div>
  );
}

/**
 * The second script line from the target, low on the right beside the kitchen
 * display. Same stand-in caveat as above.
 */
export function HeroScriptTextSecondary() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[19%] right-[3%] z-30 hidden w-[15%] select-none xl:block"
    >
      <p className="font-script text-[clamp(0.95rem,1.25vw,1.45rem)] font-semibold leading-[1.25] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
        Daha fazlası
        <br />
        mümkün...
      </p>
    </div>
  );
}
