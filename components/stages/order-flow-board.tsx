"use client";

import Image from "next/image";
import { ChartColumn, ChefHat, QrCode, ReceiptText } from "lucide-react";
import { useStageStep } from "@/components/motion/stage-motion";

/**
 * /urun stage — one order's journey through NeXa.
 *
 * The real POS capture floats in the back; in front, a four-station track
 * (QR Menü → Kasa → Mutfak → Rapor) with a marker that moves one station per
 * step, and a card describing what happens to the order at that station.
 * Orders are illustrative.
 */

const STEP_MS = 2600;

const ORDERS = [
  { table: "Masa 12", items: "2× Izgara Tavuk, 1× Çoban Salata", total: 640, minutes: 12 },
  { table: "Masa 4", items: "1× Mantı, 2× Ayran", total: 390, minutes: 9 },
  { table: "Paket #208", items: "2× Cheeseburger, 1× Patates", total: 720, minutes: 7 },
] as const;

const STATIONS = [
  { label: "QR Menü", icon: QrCode },
  { label: "Kasa", icon: ReceiptText },
  { label: "Mutfak", icon: ChefHat },
  { label: "Rapor", icon: ChartColumn },
] as const;

const tl = new Intl.NumberFormat("tr-TR");

function stationCopy(station: number, order: (typeof ORDERS)[number]) {
  switch (station) {
    case 0:
      return { title: `Sipariş alındı · ${order.table}`, body: order.items };
    case 1:
      return { title: "Adisyon açıldı", body: `${order.table} · ₺${tl.format(order.total)}` };
    case 2:
      return { title: "Mutfakta hazırlanıyor", body: `Tahmini ${order.minutes} dk · ${order.items.split(",")[0]}` };
    default:
      return { title: "Ciroya işlendi", body: `+₺${tl.format(order.total)} · günün raporunda` };
  }
}

export function OrderFlowBoard() {
  const { ref, step } = useStageStep(STEP_MS);
  const station = step % STATIONS.length;
  const order = ORDERS[Math.floor(step / STATIONS.length) % ORDERS.length];
  const copy = stationCopy(station, order);
  const Icon = STATIONS[station].icon;

  return (
    <div ref={ref} data-board="flow" aria-hidden="true" className="relative mx-auto w-full max-w-[640px] select-none pb-16 pt-4">
      <div className="animate-float-slow">
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-30px_rgba(0,8,30,0.85)] ring-1 ring-white/15">
          <Image
            src="/images/product/nexa-pos-1448x1086.png"
            width={1448}
            height={1086}
            alt=""
            sizes="(min-width: 1024px) 560px, 88vw"
            quality={90}
            fetchPriority="high"
            loading="eager"
            className="w-full"
          />
        </div>
      </div>

      {/* What is happening at this station. */}
      <div
        key={`copy-${step}`}
        className="absolute -left-2 top-[18%] flex w-[15rem] animate-card-in items-start gap-3 rounded-2xl bg-white p-4 shadow-2xl shadow-black/30 sm:-left-6"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-brand-navy-deep">{copy.title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{copy.body}</p>
        </div>
      </div>

      {/* The track. */}
      <div className="absolute inset-x-2 bottom-0 rounded-2xl bg-brand-navy-deep/95 p-4 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur sm:inset-x-6">
        <div className="relative flex items-start justify-between">
          <div className="absolute left-[12.5%] right-[12.5%] top-[18px] h-0.5 bg-white/15" />
          <div
            className="absolute left-[12.5%] top-[18px] h-0.5 bg-brand-red transition-[width] duration-700 ease-out"
            style={{ width: `${(station / (STATIONS.length - 1)) * 75}%` }}
          />
          {STATIONS.map((s, i) => {
            const StationIcon = s.icon;
            const done = i < station;
            const active = i === station;
            return (
              <div key={s.label} className="relative z-10 flex w-1/4 flex-col items-center gap-1.5">
                <span
                  className={`flex size-9 items-center justify-center rounded-full transition-colors duration-500 ${
                    active
                      ? "bg-brand-red text-white shadow-lg shadow-brand-red/40"
                      : done
                        ? "bg-white text-brand-red"
                        : "bg-white/10 text-white/50"
                  }`}
                >
                  <StationIcon className="size-4" />
                </span>
                <span className={`text-[0.7rem] font-medium ${active ? "text-white" : "text-white/55"}`}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
