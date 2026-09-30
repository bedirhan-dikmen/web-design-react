"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChartColumn,
  Check,
  Handshake,
  ShoppingCart,
  SquareKanban,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/primitives";
import { modulesBySlug } from "@/lib/content/modules";
import { useLocale } from "@/components/i18n/locale-provider";
import { PRODUCTS, type ProductSlug } from "@/lib/content/products";
import { NEXUS_TEAMS, SECTOR_IMAGE_SIZE, SECTORS } from "@/lib/content/sectors";
import type { L, Locale } from "@/lib/i18n";
import { useAutoCycle } from "./product-screens";

/**
 * "Çözümler": who each product is for, under one heading with a product
 * switch. neXa sys lists the six business types it is built for (with a
 * photo and the modules it starts with); nexus lists the teams it serves
 * (with an icon panel and the features they use; nexus has no industry
 * list or photography, see lib/content/sectors.ts).
 *
 * The list advances on its own (story-style progress line under the active
 * row) while in view; hovering the section or choosing a row holds it.
 * Switching product starts its list from the top. Below lg the list becomes
 * a horizontal chip row above the panel; from md up the panel is one low
 * row, visual left and text right.
 *
 * Sizing: photos are 1448px wide and render at most ~360 CSS px (≥ 4x).
 */

const CYCLE_MS = 5500;
const FOCUS_RING = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

type Chip = { key: string; title: string; icon: LucideIcon };
type Item = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  focus: string[];
  chips: Chip[];
  visual: { image: string; alt: string } | { icon: LucideIcon };
};

const TEAM_ICONS: Record<string, LucideIcon> = {
  "satin-alma": ShoppingCart,
  finans: Wallet,
  satis: Handshake,
  operasyon: SquareKanban,
  "insan-kaynaklari": Users,
  yonetim: ChartColumn,
};

function lists(locale: Locale): Record<ProductSlug, Item[]> {
  const nexusFeatures = PRODUCTS[locale].nexus.features;
  return {
    nexa: SECTORS[locale].map((s) => ({
      slug: s.slug,
      title: s.title,
      tagline: s.tagline,
      description: s.description,
      focus: s.focus,
      chips: modulesBySlug(s.moduleSlugs, locale).map((m) => ({ key: m.slug, title: m.title, icon: m.icon })),
      visual: { image: s.image, alt: s.imageAlt },
    })),
    nexus: NEXUS_TEAMS[locale].map((t) => ({
      slug: t.slug,
      title: t.title,
      tagline: t.tagline,
      description: t.description,
      focus: t.focus,
      chips: t.features.map((i) => nexusFeatures[i]).filter(Boolean).map((f) => ({ key: f.title, title: f.title, icon: f.icon })),
      visual: { icon: TEAM_ICONS[t.slug] ?? SquareKanban },
    })),
  };
}

type Copy = {
  eyebrow: string;
  title: [string, string, string];
  lead: string;
  choose: string;
  byProduct: Record<ProductSlug, { list: string; kind: string; chips: string; link: { href: string; label: string } }>;
};

const COPY: L<Copy> = {
  tr: {
    eyebrow: "Çözümler",
    title: ["İşletmenize", "doğru", "kurgu."],
    lead: "neXa sys yeme-içme işletmelerinin, nexus ekiplerin akışına göre kurulur.",
    choose: "Program seçin",
    byProduct: {
      nexa: { list: "Sektörler", kind: "Sektör", chips: "Başlangıç modülleri", link: { href: "/urun/nexa#moduller", label: "Modülleri inceleyin" } },
      nexus: { list: "Ekipler", kind: "Ekip", chips: "Kullandığı özellikler", link: { href: "/urun/nexus#nexus-ozellik", label: "Özellikleri inceleyin" } },
    },
  },
  en: {
    eyebrow: "Solutions",
    title: ["Set up", "right", "for your business."],
    lead: "neXa sys is set up around food and beverage businesses, nexus around teams.",
    choose: "Choose a program",
    byProduct: {
      nexa: { list: "Sectors", kind: "Sector", chips: "Starter modules", link: { href: "/urun/nexa#moduller", label: "See the modules" } },
      nexus: { list: "Teams", kind: "Team", chips: "Features used", link: { href: "/urun/nexus#nexus-ozellik", label: "See the features" } },
    },
  },
};

function ProductSwitch({ value, onChange, label }: { value: ProductSlug; onChange: (p: ProductSlug) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full border border-line bg-surface-2 p-1">
      {(["nexa", "nexus"] as const).map((p) => {
        const on = p === value;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-pressed={on}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${FOCUS_RING} ${
              on ? (p === "nexa" ? "bg-red-fill text-white" : "bg-nexus-fill text-white") : "text-ink-2 hover:text-ink"
            }`}
          >
            {PRODUCTS.tr[p].name}
          </button>
        );
      })}
    </div>
  );
}

export function SectorShowcase() {
  const [product, setProduct] = useState<ProductSlug>("nexa");
  const [hold, setHold] = useState(false);
  const locale = useLocale();
  const t = COPY[locale];
  const list = lists(locale)[product];
  const copy = t.byProduct[product];
  const { ref, index, setIndex, running } = useAutoCycle(list.length, CYCLE_MS, hold);
  const active = list[Math.min(index, list.length - 1)];
  const accent = product === "nexa" ? "text-red" : "text-ink";

  const choose = (p: ProductSlug) => {
    if (p === product) return;
    setProduct(p);
    setIndex(0);
  };

  return (
    <section aria-labelledby="sektor-baslik" className="py-12 lg:py-16">
      <div className="mx-auto w-full max-w-page-max px-5 sm:px-6 lg:px-10">
        <SectionHeader
          id="sektor-baslik"
          eyebrow={t.eyebrow}
          title={
            <>
              {t.title[0]} <em>{t.title[1]}</em> {t.title[2]}
            </>
          }
          lead={t.lead}
          action={<ProductSwitch value={product} onChange={choose} label={t.choose} />}
        />

        <div
          ref={ref}
          onPointerEnter={() => setHold(true)}
          onPointerLeave={() => setHold(false)}
          className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-6"
        >
          {/* List */}
          <ul
            key={product}
            aria-label={copy.list}
            className="k-rail -mx-5 flex gap-2 overflow-x-auto px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
          >
            {list.map((s, i) => {
              const on = i === index;
              return (
                <li key={s.slug} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-pressed={on}
                    className={`group/row relative w-full overflow-hidden rounded-full border px-4 py-2 text-left transition-[background-color,border-color,box-shadow] duration-300 ${FOCUS_RING} lg:rounded-[var(--radius-md)] lg:px-4 lg:py-2.5 ${
                      on
                        ? "border-line bg-surface shadow-[0_16px_40px_-28px_rgb(0_0_0/0.45)]"
                        : "border-transparent bg-surface-2 hover:bg-surface-3 lg:bg-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span aria-hidden="true" className={`hidden font-mono text-xs font-semibold transition-colors lg:block ${on ? accent : "text-ink-3"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block whitespace-nowrap text-sm font-semibold transition-colors lg:text-base lg:tracking-[-0.02em] ${
                            on ? "text-ink" : "text-ink-2 group-hover/row:text-ink"
                          }`}
                        >
                          {s.title}
                        </span>
                        <span
                          className={`hidden overflow-hidden text-sm text-ink-3 transition-[max-height,opacity,margin] duration-500 lg:block ${
                            on ? "mt-0.5 max-h-10 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          {s.tagline}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className={`hidden size-4 shrink-0 transition-[opacity,transform] duration-300 lg:block ${
                          on ? `${accent} opacity-100` : "-translate-x-1 opacity-0"
                        }`}
                      />
                    </span>
                    {on && (
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-0.5 bg-line lg:block">
                        <span
                          key={`${product}-${index}-${running}`}
                          data-state={running ? "run" : "hold"}
                          style={{ "--seg-ms": `${CYCLE_MS}ms` } as React.CSSProperties}
                          className={`k-seg-fill block h-full ${product === "nexa" ? "bg-red-fill" : "bg-ink"}`}
                        />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Panel */}
          <div className="grid overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-2 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[300px]">
              {list.map((s, i) => (
                <div key={`${product}-${s.slug}`} data-on={i === index} aria-hidden={i !== index} className="k-scene absolute inset-0">
                  {"image" in s.visual ? (
                    <Image
                      src={s.visual.image}
                      width={SECTOR_IMAGE_SIZE.width}
                      height={SECTOR_IMAGE_SIZE.height}
                      alt={s.visual.alt}
                      sizes="(min-width: 1280px) 340px, (min-width: 768px) 32vw, 92vw"
                      className="k-screen-zoom h-full w-full object-cover"
                    />
                  ) : (
                    // nexus: an icon panel in the product's graphite, no photo.
                    <div
                      className="flex h-full w-full items-center justify-center bg-[#16161a]"
                      style={{
                        backgroundImage:
                          "radial-gradient(60% 60% at 70% 30%, rgb(216 0 23 / 0.22), transparent 70%), linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
                        backgroundSize: "auto, 28px 28px, 28px 28px",
                      }}
                    >
                      <span className="k-screen-zoom flex size-24 items-center justify-center rounded-3xl bg-white/5 text-white ring-1 ring-white/15 backdrop-blur">
                        <s.visual.icon aria-hidden="true" className="size-10" strokeWidth={1.5} />
                      </span>
                    </div>
                  )}
                </div>
              ))}
              <span aria-hidden="true" className="absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-[3] flex items-end justify-between gap-4 p-5 text-white sm:p-6">
                <div key={`${product}-${active.slug}`} className="animate-card-in">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{copy.kind}</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight">{active.title}</h3>
                </div>
                <span className="font-mono text-xs text-white/70">
                  {String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div key={`${product}-${active.slug}`} className="flex flex-col justify-center gap-5 p-5 sm:p-6">
              <div className="animate-card-in">
                <p className="text-pretty text-sm leading-relaxed text-ink-2">{active.description}</p>
                <ul className="mt-3 space-y-1.5">
                  {active.focus.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-ink">
                      <Check aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${accent}`} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-card-in [animation-delay:90ms]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">{copy.chips}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {active.chips.map((m) => (
                    <li key={m.key} className="flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1.5 text-xs font-medium text-ink-2 ring-1 ring-line">
                      <m.icon aria-hidden="true" className={`size-3.5 ${accent}`} strokeWidth={2} />
                      {m.title}
                    </li>
                  ))}
                </ul>
                <Link
                  href={copy.link.href}
                  className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:text-red hover:underline ${FOCUS_RING}`}
                >
                  {copy.link.label}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
