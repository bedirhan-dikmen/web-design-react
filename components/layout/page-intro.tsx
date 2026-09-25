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
      <div className="mx-auto w-full max-w-page-max px-5 pb-14 pt-12 sm:px-6 lg:px-10 lg:pb-20 lg:pt-20">
        <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink-2">
          <span aria-hidden="true" className={`h-0.5 w-6 ${rule}`} />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.25rem,4.4vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-2">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
