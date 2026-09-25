import { useId } from "react";
import { NexusMark } from "@/components/ui/nexus-mark";

/**
 * nexus workspace — drawn in code, not a screenshot.
 *
 * ASSET GAP: the repo has no nexus captures (the live site uses
 * nexus-panel-1400.webp / nexus-login-1400.webp, which were not supplied).
 * Until real ≥1800px captures arrive, this DOM rendition stands in: it stays
 * sharp at any size and every label is real text. Data is illustrative.
 *
 * Static by design (CLAUDE.md: no new animation before static QA passes).
 */

const KPIS = [
  { label: "Açık görev", value: "48", delta: "−6 bu hafta" },
  { label: "Bekleyen onay", value: "7", delta: "2 acil" },
  { label: "Aylık tahsilat", value: "₺1,24 M", delta: "+12%" },
];

const COLUMNS = [
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
      { t: "Yeni müşteri sözleşmesi", tag: "Satış", who: "SD" },
    ],
  },
  {
    title: "Onayda",
    cards: [{ t: "Ekipman satın alma talebi", tag: "Onay · 2/3", who: "HK" }],
  },
];

const BARS = [42, 58, 51, 66, 72, 64, 81, 77, 88, 84, 93, 100];

export function NexusWorkspaceBoard({ className = "" }: { className?: string }) {
  const barsId = `${useId().replace(/:/g, "")}-bars`;
  return (
    <figure
      role="img"
      aria-label="nexus yönetim paneli örneği: görev panosu, bekleyen onaylar ve aylık tahsilat grafiği"
      className={`@container w-full overflow-hidden rounded-[var(--radius-md)] bg-surface text-ink shadow-[0_30px_80px_-30px_rgb(30_27_75/0.55)] ring-1 ring-line ${className}`}
    >
      <div aria-hidden="true" className="flex text-[11px] leading-tight">
        {/* Sidebar */}
        <div className="hidden w-36 shrink-0 flex-col gap-1 border-r border-line bg-surface-2 p-3 @xl:flex">
          <NexusMark size={18} title="" className="mb-3" />
          {["Genel bakış", "Görevler", "Onaylar", "Müşteriler", "Faturalar", "Raporlar"].map((item, i) => (
            <span
              key={item}
              className={`rounded-md px-2 py-1.5 ${i === 1 ? "bg-nexus-soft font-semibold text-nexus" : "text-ink-2"}`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1 p-3 @lg:p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">Görevler</p>
            <span className="rounded-md bg-nexus-fill px-2 py-1 font-semibold text-white">+ Yeni görev</span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {KPIS.map((k) => (
              <div key={k.label} className="rounded-lg border border-line p-2">
                <p className="text-ink-3">{k.label}</p>
                <p className="mt-0.5 text-base font-extrabold tracking-tight">{k.value}</p>
                <p className="text-[10px] font-medium text-nexus">{k.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 @md:grid-cols-3">
            {COLUMNS.map((col, i) => (
              <div key={col.title} className={`rounded-lg bg-surface-2 p-2 ${i === 2 ? "hidden @md:block" : ""}`}>
                <p className="mb-1.5 font-semibold text-ink-2">
                  {col.title} <span className="text-ink-3">{col.cards.length}</span>
                </p>
                <div className="space-y-1.5">
                  {col.cards.map((c) => (
                    <div key={c.t} className="rounded-md border border-line bg-surface p-2">
                      <p className="font-semibold">{c.t}</p>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="rounded bg-nexus-soft px-1.5 py-0.5 text-[10px] font-medium text-nexus">
                          {c.tag}
                        </span>
                        <span className="flex size-5 items-center justify-center rounded-full bg-ink text-[9px] font-bold text-surface">
                          {c.who}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-lg border border-line p-2">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Aylık tahsilat</p>
              <p className="text-ink-3">Son 12 ay</p>
            </div>
            <svg viewBox="0 0 240 48" className="mt-2 h-12 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id={barsId} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" style={{ stopColor: "var(--k-ink-3)" }} />
                  <stop offset="1" style={{ stopColor: "var(--k-ink)" }} />
                </linearGradient>
              </defs>
              {BARS.map((v, i) => (
                <rect key={i} x={i * 20 + 3} y={48 - v * 0.46} width="14" height={v * 0.46} rx="2" fill={`url(#${barsId})`} />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </figure>
  );
}
