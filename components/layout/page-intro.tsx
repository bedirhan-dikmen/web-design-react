import { SiteHeader } from "./site-header";

/**
 * A short dark opening band for utility pages (brand, dealer login) that do
 * not need the full editorial hero. It carries the transparent SiteHeader,
 * which is designed for a dark ground, plus an eyebrow, title and lead.
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
  const glow = {
    red: "rgb(216 0 23 / 0.35)",
    nexa: "rgb(34 211 238 / 0.28)",
    nexus: "rgb(139 92 246 / 0.32)",
  }[accent];
  const rule = { red: "bg-red", nexa: "bg-nexa-glow", nexus: "bg-nexus-glow" }[accent];

  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 90% at 85% 0%, ${glow}, transparent 70%), linear-gradient(180deg, #16161c 0%, #0c0c10 100%)`,
        }}
      />
      <SiteHeader />
      <div className="mx-auto w-full max-w-page-max px-5 pb-14 pt-8 sm:px-6 lg:px-10 lg:pb-20 lg:pt-12">
        <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
          <span aria-hidden="true" className={`h-0.5 w-6 ${rule}`} />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.25rem,4.4vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/75">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
