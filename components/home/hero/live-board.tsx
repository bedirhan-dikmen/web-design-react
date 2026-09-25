"use client";

import Image from "next/image";
import { BellRing, ChefHat, CreditCard, QrCode, TrendingUp } from "lucide-react";
import { useCountUp, useStageStep } from "@/components/motion/stage-motion";

/**
 * The homepage hero's "live operations" board.
 *
 * A real neXa dashboard capture, floating, with live DOM cards around it that
 * replay one service in a loop: a QR order lands, the kitchen ticket moves
 * Hazırlanıyor → Pişiyor → Hazır, the payment is taken and the day's revenue
 * and sales chart tick up. It shows the product *working* rather than posing
 * as a poster.
 *
 * Everything moving is DOM or CSS — no GIF, no video — so it is sharp at any
 * resolution and weighs nothing. The dashboard capture is 1442px and renders
 * at most 720 CSS px (2.0x).
 *
 * Motion discipline:
 *   - one event every 3.2 s, small translations only;
 *   - pause, off-screen, hidden-tab and reduced-motion handling come from
 *     the shared stage hooks (components/motion/stage-motion.tsx).
 *
 * The order data is illustrative, like the numbers inside the capture itself.
 */

const STEP_MS = 3200;

const ORDERS = [
  { table: "Masa 12", source: "QR Menü", items: ["2× Izgara Tavuk", "1× Çoban Salata"], total: 640 },
  { table: "Masa 4", source: "Garson", items: ["1× Mantı", "2× Ayran"], total: 390 },
  { table: "Paket #208", source: "Online", items: ["2× Cheeseburger", "1× Patates"], total: 720 },
  { table: "Masa 7", source: "QR Menü", items: ["1× Somon Izgara", "1× Limonata"], total: 585 },
] as const;

const KITCHEN = [
  { label: "Hazırlanıyor", tone: "bg-rose-100 text-rose-700", bar: "bg-rose-500", width: "30%" },
  { label: "Pişiyor", tone: "bg-amber-100 text-amber-700", bar: "bg-amber-500", width: "68%" },
  { label: "Hazır", tone: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500", width: "100%" },
] as const;

const BASE_REVENUE = 24750;
const INITIAL_BARS = [38, 52, 44, 61, 48, 70, 57, 66, 74, 62, 80, 72];

const DASHBOARD = {
  src: "/images/product/nexa-dashboard-1442x1091.png",
  width: 1442,
  height: 1091,
};

const tl = new Intl.NumberFormat("tr-TR");

export function LiveBoard() {
  const { ref: rootRef, step, still } = useStageStep(STEP_MS);

  const completedOrders = Math.floor(step / 4);
  const phase = step % 4;
  const order = ORDERS[completedOrders % ORDERS.length];
  const kitchen = KITCHEN[Math.min(phase, 2)];
  // Each completed order adds its total to the day.
  let revenueTarget = BASE_REVENUE;
  const paidCount = completedOrders + (phase === 3 ? 1 : 0);
  const cycleTotal = ORDERS.reduce((total, item) => total + item.total, 0);
  revenueTarget += Math.floor(paidCount / ORDERS.length) * cycleTotal;
  for (let i = 0; i < paidCount % ORDERS.length; i++) revenueTarget += ORDERS[i].total;
  const revenue = useCountUp(revenueTarget, !still);
  const ordersToday = 128 + paidCount;
  const bars = [...INITIAL_BARS.slice(step % INITIAL_BARS.length), ...INITIAL_BARS.slice(0, step % INITIAL_BARS.length)];
  const paid = phase === 3 ? order : null;

  return (
    <div
      ref={rootRef}
      data-board="live"
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[720px] select-none pt-6 pb-10 sm:pt-8 sm:pb-12"
    >
      {/* The real dashboard, floating. */}
      <div className="animate-float-slow">
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-30px_rgba(0,8,30,0.85)] ring-1 ring-white/15">
          <Image
            src={DASHBOARD.src}
            width={DASHBOARD.width}
            height={DASHBOARD.height}
            alt=""
            sizes="(min-width: 1600px) 608px, (min-width: 1024px) 40vw, (min-width: 768px) 544px, 80vw"
            quality={90}
            fetchPriority="high"
            loading="eager"
            className="w-full"
          />
        </div>
      </div>

      {/* Live revenue — top right. */}
      <div className="absolute -right-2 top-0 w-[13.5rem] animate-float rounded-2xl bg-white p-4 shadow-2xl shadow-black/30 sm:-right-4 lg:-right-10">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="size-2 animate-live-dot rounded-full bg-emerald-500" />
            Canlı ciro
          </span>
          <TrendingUp className="size-4 text-emerald-600" />
        </div>
        <p className="mt-1.5 text-2xl font-bold tabular-nums tracking-tight text-brand-navy-deep">
          ₺{tl.format(revenue)}
        </p>
        <p className="text-xs text-slate-500">
          Bugün <span className="font-semibold tabular-nums text-slate-700">{ordersToday}</span> sipariş
        </p>
        <div className="mt-3 flex h-10 items-end gap-1">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-sm transition-[height] duration-700 ease-out ${
                i === bars.length - 1 ? "bg-brand-red" : "bg-brand-red/25"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* New QR order — left. Re-mounts per order, so it slides in again. */}
      <div
        key={`order-${completedOrders}`}
        className="absolute -left-2 top-[34%] w-[14.5rem] animate-card-in rounded-2xl bg-white p-4 shadow-2xl shadow-black/30 sm:-left-4 lg:-left-14"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
            <QrCode className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-brand-navy-deep">Yeni sipariş · {order.table}</p>
            <p className="text-xs text-slate-500">{order.source} üzerinden</p>
          </div>
        </div>
        <ul className="mt-3 space-y-1 border-t border-slate-100 pt-2.5 text-xs text-slate-600">
          {order.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-2 flex items-center justify-between text-xs">
          <span className="text-slate-500">Toplam</span>
          <span className="font-bold tabular-nums text-brand-navy-deep">₺{tl.format(order.total)}</span>
        </p>
      </div>

      {/* Kitchen ticket — bottom right, walking through its states. */}
      <div className="absolute -right-2 bottom-0 w-[15rem] rounded-2xl bg-brand-navy-deep p-4 text-white shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:-right-4 lg:-right-8">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <ChefHat className="size-4 text-brand-red" />
            Mutfak Ekranı
          </p>
          <span
            key={`k-${step}`}
            className={`animate-card-in rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold ${kitchen.tone}`}
          >
            {kitchen.label}
          </span>
        </div>
        <p className="mt-2 text-xs text-white/70">
          #0{17 + (completedOrders % 9)} · {order.items[0]}
        </p>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${kitchen.bar}`}
            style={{ width: kitchen.width }}
          />
        </div>
      </div>

      {/* Payment toast — bottom left, from the second step on. */}
      {paid && (
        <div
          key={`pay-${step}`}
          className="absolute bottom-6 left-4 flex animate-card-in items-center gap-3 rounded-xl bg-white/95 py-2.5 pl-3 pr-4 shadow-xl shadow-black/30 backdrop-blur sm:left-0 lg:-left-6"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CreditCard className="size-4" />
          </span>
          <div className="text-xs">
            <p className="font-semibold text-brand-navy-deep">Ödeme alındı</p>
            <p className="tabular-nums text-slate-500">
              {paid.table} · ₺{tl.format(paid.total)}
            </p>
          </div>
          <BellRing className="ml-1 size-4 text-slate-400" />
        </div>
      )}
    </div>
  );
}
