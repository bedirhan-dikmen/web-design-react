"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/components/i18n/locale-provider";
import { useReducedMotion } from "@/components/motion/stage-motion";
import { SCREENSHOTS } from "@/lib/content/screenshots";
import type { L } from "@/lib/i18n";

/**
 * Live product screens for the program cards.
 *
 * A scene is either a real neXa capture (moved by a slow push-in or a pan,
 * see .k-screen-* in globals.css) or a nexus screen drawn in DOM. nexus has
 * no captures in the repo yet (see components/stages/nexus-workspace-board),
 * so its screens are code: sharp at any size, every label real text in the
 * page's language, data illustrative. Scenes stack in one box and
 * cross-fade through .k-scene.
 *
 * Sizing: screens render in a 16:10 box at most 560 CSS px wide.
 * dashboard/pos (1442–1448px) stay ≥ 2.1x even at the 1.06 push-in; the
 * kitchen capture (1672x941) is panned at box height (≥ 1.96x).
 */

export type SceneKind = "dashboard" | "pos" | "kitchen" | "nexus-tasks" | "nexus-report";

export function ProductScreen({ kind, sizes, eager = false }: { kind: SceneKind; sizes: string; eager?: boolean }) {
  if (kind === "nexus-tasks") return <NexusTasksScreen />;
  if (kind === "nexus-report") return <NexusReportScreen />;
  return <Capture kind={kind} sizes={sizes} eager={eager} />;
}

function Capture({ kind, sizes, eager }: { kind: "dashboard" | "pos" | "kitchen"; sizes: string; eager: boolean }) {
  const locale = useLocale();
  const s = SCREENSHOTS[kind];
  return (
    <Image
      src={s.src}
      width={s.width}
      height={s.height}
      alt={s.alt[locale]}
      sizes={sizes}
      quality={90}
      {...(eager ? { fetchPriority: "high" as const, loading: "eager" as const } : {})}
      className={`h-full w-full object-cover ${kind === "kitchen" ? "k-screen-pan object-left-top" : "k-screen-zoom origin-top object-top"}`}
    />
  );
}

/**
 * Advances an index every `ms` while the element is on screen, the tab is
 * visible, nothing holds it and reduced motion is off. Changing the index by
 * hand restarts the countdown.
 */
export function useAutoCycle(count: number, ms: number, hold = false, startDelay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const running = !reduced && !hold && visible && pageVisible;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(
      () => {
        setFirst(false);
        setIndex((i) => (i + 1) % count);
      },
      ms + (first ? startDelay : 0),
    );
    return () => clearTimeout(t);
  }, [running, index, count, ms, first, startDelay]);

  return { ref, index, setIndex, running, reduced };
}

/* ------------------------------------------------------------------ nexus */

type Card = { t: string; tag: string; who: string; hop?: true };

type NexusCopy = {
  nav: string[];
  tasks: string;
  add: string;
  taskKpis: [string, string, string][];
  columns: { title: string; cards: Card[] }[];
  report: string;
  range: string;
  reportKpis: [string, string, string][];
  chart: string;
  branches: string;
  branchNames: string[];
};

const NEXUS: L<NexusCopy> = {
  tr: {
    nav: ["Genel bakış", "Görevler", "Onaylar", "Müşteriler", "Faturalar", "Raporlar"],
    tasks: "Görevler",
    add: "+ Yeni görev",
    taskKpis: [
      ["Açık görev", "48", "−6 bu hafta"],
      ["Bekleyen onay", "7", "2 acil"],
      ["Bu hafta biten", "31", "+9"],
    ],
    columns: [
      {
        title: "Yapılacak",
        cards: [
          { t: "Tedarikçi teklifi karşılaştır", tag: "Satın alma", who: "AY" },
          { t: "Mart dönemi KDV kontrolü", tag: "Finans", who: "MK" },
        ],
      },
      {
        title: "Devam ediyor",
        cards: [
          { t: "Şube 3 personel planı", tag: "İK", who: "EB" },
          { t: "Ekipman satın alma talebi", tag: "Onaya gidiyor", who: "HK", hop: true },
        ],
      },
      { title: "Onayda", cards: [{ t: "Yeni müşteri sözleşmesi", tag: "Onay · 2/3", who: "SD" }] },
    ],
    report: "Yönetim raporu",
    range: "Son 12 ay",
    reportKpis: [
      ["Tahsilat", "₺1,24 M", "+12%"],
      ["Açık fatura", "23", "₺186 B"],
      ["Tamamlanan iş", "%94", "+3 puan"],
    ],
    chart: "Aylık tahsilat",
    branches: "Şube performansı",
    branchNames: ["Merkez", "Şube 2", "Şube 3", "Şube 4"],
  },
  en: {
    nav: ["Overview", "Tasks", "Approvals", "Customers", "Invoices", "Reports"],
    tasks: "Tasks",
    add: "+ New task",
    taskKpis: [
      ["Open tasks", "48", "−6 this week"],
      ["Pending approvals", "7", "2 urgent"],
      ["Done this week", "31", "+9"],
    ],
    columns: [
      {
        title: "To do",
        cards: [
          { t: "Compare supplier quotes", tag: "Purchasing", who: "AY" },
          { t: "March VAT check", tag: "Finance", who: "MK" },
        ],
      },
      {
        title: "In progress",
        cards: [
          { t: "Branch 3 staff plan", tag: "HR", who: "EB" },
          { t: "Equipment purchase request", tag: "Going to approval", who: "HK", hop: true },
        ],
      },
      { title: "In approval", cards: [{ t: "New customer contract", tag: "Approval · 2/3", who: "SD" }] },
    ],
    report: "Management report",
    range: "Last 12 months",
    reportKpis: [
      ["Collections", "₺1.24 M", "+12%"],
      ["Open invoices", "23", "₺186 K"],
      ["Work completed", "94%", "+3 pts"],
    ],
    chart: "Monthly collections",
    branches: "Branch performance",
    branchNames: ["Head office", "Branch 2", "Branch 3", "Branch 4"],
  },
};

function NexusChrome({ active, children }: { active: number; children: React.ReactNode }) {
  const c = NEXUS[useLocale()];
  return (
    <div aria-hidden="true" className="@container flex h-full bg-surface text-[11px] leading-tight text-ink">
      <div className="hidden w-32 shrink-0 flex-col gap-1 border-r border-line bg-surface-2 p-3 @lg:flex">
        <span className="mb-2 flex items-center gap-1.5 text-xs font-bold">
          <span className="size-2.5 rounded-sm bg-nexus-fill" />
          nexus
        </span>
        {c.nav.map((item, i) => (
          <span key={item} className={`rounded-md px-2 py-1.5 ${i === active ? "bg-nexus-soft font-semibold text-nexus" : "text-ink-2"}`}>
            {item}
          </span>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3 @lg:p-4">{children}</div>
    </div>
  );
}

function Kpis({ items }: { items: [string, string, string][] }) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {items.map(([l, v, d], i) => (
        <div key={l} data-build style={{ "--d": i } as React.CSSProperties} className="rounded-lg border border-line p-2">
          <p className="text-ink-3">{l}</p>
          <p className="mt-0.5 text-base font-extrabold tracking-tight">{v}</p>
          <p className="text-[10px] font-medium text-ink-2">{d}</p>
        </div>
      ))}
    </div>
  );
}

export function NexusTasksScreen() {
  const c = NEXUS[useLocale()];
  return (
    <NexusChrome active={1}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{c.tasks}</p>
        <span className="rounded-md bg-nexus-fill px-2 py-1 font-semibold text-white">{c.add}</span>
      </div>
      <Kpis items={c.taskKpis} />
      <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
        {c.columns.map((col, ci) => (
          <div key={col.title} data-build style={{ "--d": ci + 3 } as React.CSSProperties} className="rounded-lg bg-surface-2 p-2">
            <p className="mb-1.5 font-semibold text-ink-2">
              {col.title} <span className="text-ink-3">{col.cards.length}</span>
            </p>
            <div className="space-y-1.5">
              {col.cards.map((card) => (
                <div
                  key={card.t}
                  {...(card.hop ? { "data-hop": true } : {})}
                  className={`relative rounded-md border bg-surface p-2 ${card.hop ? "z-10 border-nexus/40" : "border-line"}`}
                >
                  <p className="font-semibold">{card.t}</p>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="rounded bg-nexus-soft px-1.5 py-0.5 text-[10px] font-medium text-nexus">{card.tag}</span>
                    <span className="flex size-5 items-center justify-center rounded-full bg-ink text-[9px] font-bold text-surface">{card.who}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </NexusChrome>
  );
}

const REVENUE = [38, 44, 41, 52, 49, 58, 63, 60, 71, 69, 80, 88];
const BRANCH_VALUES = [92, 74, 58, 41];

export function NexusReportScreen() {
  const c = NEXUS[useLocale()];
  const pts = REVENUE.map((v, i) => `${(i / (REVENUE.length - 1)) * 300},${90 - (v / 100) * 80}`).join(" ");
  return (
    <NexusChrome active={5}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{c.report}</p>
        <span className="rounded-md border border-line px-2 py-1 text-ink-2">{c.range}</span>
      </div>
      <Kpis items={c.reportKpis} />
      <div className="mt-3 grid flex-1 grid-cols-5 gap-2">
        <div data-build style={{ "--d": 3 } as React.CSSProperties} className="col-span-3 flex flex-col rounded-lg border border-line p-2">
          <p className="font-semibold">{c.chart}</p>
          <svg data-draw viewBox="0 0 300 96" preserveAspectRatio="none" className="mt-2 min-h-16 w-full flex-1 overflow-visible">
            <polygon points={`0,96 ${pts} 300,96`} className="fill-ink/[0.06]" />
            <polyline
              points={pts}
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="stroke-ink"
            />
          </svg>
        </div>
        <div data-build style={{ "--d": 4 } as React.CSSProperties} className="col-span-2 flex flex-col rounded-lg border border-line p-2">
          <p className="font-semibold">{c.branches}</p>
          <div className="mt-2 flex flex-1 items-end justify-between gap-1.5">
            {BRANCH_VALUES.map((v, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <div
                  data-grow
                  style={{ "--d": i, height: `${v}%` } as React.CSSProperties}
                  className={`w-full rounded-sm ${i === 0 ? "bg-red-fill" : "bg-ink/70"}`}
                />
                <span className="text-[9px] text-ink-3">{c.branchNames[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </NexusChrome>
  );
}
