/**
 * The compact member of the page-hero family, for pages that do not need a
 * live stage (products overview, brand guide, legal texts). Same eyebrow,
 * headline scale and serif <em> accent as EditorialHero, same 1280px box, so
 * switching pages never changes the opening's typography — only its height.
 */
export function PageIntro({
  eyebrow,
  title,
  lead,
  accent = "red",
  aside,
  children,
}: {
  eyebrow: string;
  /** Wrap the accent word in <em>. */
  title: React.ReactNode;
  lead?: React.ReactNode;
  accent?: "red" | "nexa" | "nexus";
  /** Optional right-hand column (a mark, a small visual). */
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const glow = { red: "var(--k-glow-red)", nexa: "var(--k-glow-nexa)", nexus: "var(--k-glow-nexus)" }[accent];

  return (
    <section className="relative isolate overflow-hidden border-b border-line text-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: `radial-gradient(50% 90% at 90% 0%, ${glow}, transparent 70%), var(--k-hero-bg)` }}
      />
      <div className="mx-auto grid w-full max-w-page-max items-end gap-10 px-5 pb-10 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-10 lg:pb-14 lg:pt-14">
        <div>
          <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-2">
            <span aria-hidden="true" className="h-0.5 w-[22px] bg-red" />
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.25rem,4.4vw,3.625rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-xl text-pretty text-[clamp(1.0625rem,1.25vw,1.25rem)] leading-relaxed text-ink-2">{lead}</p>}
          {children}
        </div>
        {aside && <div className="hidden lg:block">{aside}</div>}
      </div>
    </section>
  );
}
