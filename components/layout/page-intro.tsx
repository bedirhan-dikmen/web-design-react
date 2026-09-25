/**
 * A short opening band for utility pages (products overview, nexus, brand)
 * that do not need the full editorial hero: eyebrow, title, lead and an
 * optional action row. Follows the theme through the --k-hero-* tokens; the
 * accent only tints the glow and the eyebrow rule.
 */
export function PageIntro({
  eyebrow,
  title,
  lead,
  accent = "red",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  accent?: "red" | "nexa" | "nexus";
  children?: React.ReactNode;
}) {
  const glow = { red: "var(--k-glow-red)", nexa: "var(--k-glow-nexa)", nexus: "var(--k-glow-nexus)" }[accent];
  const rule = { red: "bg-red", nexa: "bg-nexa", nexus: "bg-nexus" }[accent];

  return (
    <section className="relative isolate overflow-hidden border-b border-line text-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: `radial-gradient(60% 90% at 85% 0%, ${glow}, transparent 70%), var(--k-hero-bg)` }}
      />
      <div className="mx-auto w-full max-w-page-max px-5 pb-12 pt-12 sm:px-6 lg:px-10 lg:pb-16 lg:pt-16">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs font-semibold text-ink-2">
          <span aria-hidden="true" className={`size-1.5 rounded-full ${rule}`} />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-2xl text-balance text-[clamp(2rem,3.4vw,2.875rem)] font-extrabold leading-[1.08] tracking-[-0.035em]">
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-xl text-pretty leading-relaxed text-ink-2">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
