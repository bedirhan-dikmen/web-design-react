import Link from "next/link";
import { Check, Ellipsis } from "lucide-react";
import type { Module } from "@/lib/content/modules";
import { IconTile } from "@/components/ui/primitives";

/**
 * Compact module card: icon, title, one-line summary. On narrow phones (one
 * column) the icon moves beside the text, which roughly halves each card's
 * height — twelve stacked full cards made the section a long scroll.
 */
export function ModuleCard({ module }: { module: Module }) {
  const Icon = module.icon;
  return (
    <li className="flex h-full gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(0,31,82,0.25)] min-[420px]:flex-col min-[420px]:gap-0 min-[420px]:p-5">
      <IconTile>
        <Icon className="size-8" strokeWidth={1.6} />
      </IconTile>
      <div>
        <h3 className="text-base font-bold text-brand-navy-deep min-[420px]:mt-3">{module.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 min-[420px]:mt-1.5">
          {module.summary}
        </p>
      </div>
    </li>
  );
}

/**
 * The homepage grid: every module, closed by a tinted "Ve Çok Daha Fazlası"
 * card that links to the full Modüller page, as in the reference.
 */
export function ModuleGrid({
  modules,
  moreHref,
  columns = "home",
}: {
  modules: Module[];
  moreHref?: string;
  columns?: "home" | "compact";
}) {
  const grid =
    columns === "home"
      ? "grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
      : "grid-cols-1 min-[420px]:grid-cols-2 xl:grid-cols-4";
  return (
    <ul className={`grid gap-3 sm:gap-4 ${grid}`}>
      {modules.map((m) => (
        <ModuleCard key={m.slug} module={m} />
      ))}
      {moreHref && (
        <li className="h-full">
          <Link
            href={moreHref}
            className="flex h-full gap-4 rounded-xl border border-brand-red/20 bg-brand-red/[0.06] p-4 transition-colors hover:bg-brand-red/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red min-[420px]:flex-col min-[420px]:gap-0 min-[420px]:p-5"
          >
            <IconTile>
              <Ellipsis aria-hidden="true" className="size-8" strokeWidth={1.8} />
            </IconTile>
            <span>
              <span className="block text-base font-bold text-brand-navy-deep min-[420px]:mt-3">
                Ve Çok Daha Fazlası
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-600 min-[420px]:mt-1.5">
                İşletmenize özel çözümlerimizle yanınızdayız.
              </span>
            </span>
          </Link>
        </li>
      )}
    </ul>
  );
}

/** Full module card for the Modüller page, with its grounded capability list. */
export function ModuleDetailCard({ module }: { module: Module }) {
  const Icon = module.icon;
  return (
    <article
      id={module.slug}
      className="flex h-full scroll-mt-6 flex-col rounded-2xl border border-slate-200 bg-white p-6 lg:p-7"
    >
      <div className="flex items-center gap-4">
        <IconTile tone="tint">
          <Icon className="size-6" strokeWidth={1.8} />
        </IconTile>
        <h3 className="text-lg font-bold text-brand-navy-deep">{module.title}</h3>
      </div>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate-600">{module.description}</p>
      <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-700">
        {module.points.map((p) => (
          <li key={p} className="flex gap-2.5">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-red" strokeWidth={2.5} />
            {p}
          </li>
        ))}
      </ul>
    </article>
  );
}
