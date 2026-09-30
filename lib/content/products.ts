import {
  ChartColumn,
  Boxes,
  ChefHat,
  ClipboardCheck,
  FileSpreadsheet,
  GitBranch,
  SquareKanban,
  QrCode,
  ReceiptText,
  ShieldCheck,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { L } from "@/lib/i18n";

/**
 * The two Kerinti programs and the company-level homepage copy, in Turkish
 * and English.
 *
 * Headlines, leads and the three differentiators are taken from the live
 * reference site (web.kerinti.com.tr). neXa's feature list is backed by the
 * existing module catalogue (lib/content/modules.ts).
 *
 * TODO(content): nexus has no feature catalogue or screenshots in this repo
 * yet. Its feature list below is derived from the reference line "işlerinizi,
 * görevlerinizi ve raporlarınızı tek noktadan takip edin" and must be
 * confirmed by the product owner before launch. The English copy is a
 * translation of the Turkish and awaits the same confirmation.
 */

export type ProductSlug = "nexa" | "nexus";

export type ProductFeature = { title: string; text: string; icon: LucideIcon };

export type Product = {
  slug: ProductSlug;
  name: string;
  /** Call to action to the product page ("neXa sys'i İnceleyin"). */
  cta: string;
  category: string;
  headline: [string, string];
  lead: string;
  href: string;
  features: ProductFeature[];
  /** Short tags for the product cards. */
  highlights: string[];
  idealFor: string;
};

export const PRODUCTS: L<Record<ProductSlug, Product>> = {
  tr: {
    nexa: {
      slug: "nexa",
      name: "neXa sys",
      cta: "neXa sys’i İnceleyin",
      category: "Sipariş yönetimi",
      headline: ["Siparişten teslimata", "her adım kontrolünüzde."],
      lead: "Sipariş, ürün ve müşteri tek panelde.",
      href: "/urun/nexa",
      features: [
        { title: "QR menü ve sipariş", text: "Masadan anında sipariş.", icon: QrCode },
        { title: "Kasa ve adisyon", text: "Masa, paket ve gel-al tek kasada.", icon: ReceiptText },
        { title: "Mutfak ekranı", text: "Kâğıtsız, sıralı hazırlık.", icon: ChefHat },
        { title: "Teslimat takibi", text: "Paketin yeri her an belli.", icon: Truck },
        { title: "Stok ve ürün", text: "Satışla düşen, uyaran stok.", icon: Boxes },
        { title: "Anlık raporlar", text: "Ciro ve satış, anlık.", icon: ChartColumn },
      ],
      highlights: ["QR menü", "Kasa", "Mutfak ekranı", "Stok", "Raporlar"],
      idealFor: "Restoran, kafe ve sipariş yoğun işletmeler",
    },
    nexus: {
      slug: "nexus",
      name: "nexus",
      cta: "nexus’u İnceleyin",
      category: "Yönetim sistemi",
      headline: ["Tüm iş süreçleriniz", "tek ekranda."],
      lead: "Görev, onay ve rapor tek noktada.",
      href: "/urun/nexus",
      features: [
        { title: "Görev ve iş takibi", text: "Atayın, panodan izleyin.", icon: SquareKanban },
        { title: "Onay akışları", text: "Talepler tanımlı adımlarla ilerler.", icon: GitBranch },
        { title: "Müşteri ve cari", text: "Kayıt, görüşme, bakiye tek kartta.", icon: Users },
        { title: "Teklif ve fatura", text: "Tekliften faturaya tek kayıt.", icon: FileSpreadsheet },
        { title: "Yönetim raporları", text: "Tüm göstergeler tek panelde.", icon: ChartColumn },
        { title: "Rol ve yetki", text: "Herkes yalnızca işini görür.", icon: ShieldCheck },
      ],
      highlights: ["Görevler", "Onaylar", "Müşteriler", "Faturalar", "Raporlar"],
      idealFor: "Ekipleri ve süreçleri büyüyen işletmeler",
    },
  },
  en: {
    nexa: {
      slug: "nexa",
      name: "neXa sys",
      cta: "Explore neXa sys",
      category: "Order management",
      headline: ["From order to delivery,", "every step in your hands."],
      lead: "Orders, products and customers on one panel.",
      href: "/urun/nexa",
      features: [
        { title: "QR menu and ordering", text: "Orders straight from the table.", icon: QrCode },
        { title: "Till and bills", text: "Dine-in, delivery and takeaway on one till.", icon: ReceiptText },
        { title: "Kitchen display", text: "Paperless, ordered preparation.", icon: ChefHat },
        { title: "Delivery tracking", text: "Always know where an order is.", icon: Truck },
        { title: "Stock and products", text: "Stock that drops with sales and warns you.", icon: Boxes },
        { title: "Live reports", text: "Revenue and sales as they happen.", icon: ChartColumn },
      ],
      highlights: ["QR menu", "Till", "Kitchen display", "Stock", "Reports"],
      idealFor: "Restaurants, cafés and order-heavy businesses",
    },
    nexus: {
      slug: "nexus",
      name: "nexus",
      cta: "Explore nexus",
      category: "Business management",
      headline: ["All your work processes", "on one screen."],
      lead: "Tasks, approvals and reports in one place.",
      href: "/urun/nexus",
      features: [
        { title: "Tasks and work tracking", text: "Assign work, follow it on a board.", icon: SquareKanban },
        { title: "Approval flows", text: "Requests move through defined steps.", icon: GitBranch },
        { title: "Customers and accounts", text: "Record, meetings and balance on one card.", icon: Users },
        { title: "Quotes and invoices", text: "One record from quote to invoice.", icon: FileSpreadsheet },
        { title: "Management reports", text: "Every indicator on one panel.", icon: ChartColumn },
        { title: "Roles and permissions", text: "Everyone sees only their own work.", icon: ShieldCheck },
      ],
      highlights: ["Tasks", "Approvals", "Customers", "Invoices", "Reports"],
      idealFor: "Businesses whose teams and processes are growing",
    },
  },
};

export const HOME: L<{
  eyebrow: string;
  /** [before, accent (red), after]. */
  headline: [string, string, string];
  lead: string;
  primary: string;
  secondary: string;
}> = {
  tr: {
    eyebrow: "Kerinti Yazılım",
    headline: ["İşinizin akışına", "güç veren", "yazılımlar."],
    lead: "Sipariş ve iş yönetimini sadeleştiren yazılımlar. Kurulumdan desteğe tek ekip.",
    primary: "Demo Talep Et",
    secondary: "Programları İnceleyin",
  },
  en: {
    eyebrow: "Kerinti Software",
    headline: ["Software that", "powers", "the flow of your business."],
    lead: "Software that simplifies order and business management. One team from setup to support.",
    primary: "Request a demo",
    secondary: "See the programs",
  },
};

export const DIFFERENCE: L<{
  eyebrow: string;
  title: [string, string];
  lead: string;
  /** When each step happens, shown in place of a step number. */
  when: [string, string, string];
  steps: { title: string; text: string; icon: LucideIcon }[];
}> = {
  tr: {
    eyebrow: "Yaklaşımımız",
    title: ["Teknolojiye değil,", "işinize odaklanın."],
    lead: "Her kurulumda aynı üç adımı izleriz: önce işinizi dinleriz, sonra ekranları ona göre kurarız, devreye aldıktan sonra da yanınızda kalırız.",
    when: ["Önce", "Ardından", "Sonrasında da"],
    steps: [
      { title: "Anlıyoruz", text: "Önce işinizi dinliyoruz.", icon: ClipboardCheck },
      { title: "Kuruyoruz", text: "Ekranları iş akışınıza göre kurguluyoruz.", icon: GitBranch },
      { title: "Destekliyoruz", text: "Kurulumdan sonra da yanınızdayız.", icon: ShieldCheck },
    ],
  },
  en: {
    eyebrow: "Our approach",
    title: ["Focus on your business,", "not the technology."],
    lead: "Every setup follows the same three steps: we listen to how you work, set the screens up around it, and stay with you after go-live.",
    when: ["First", "Then", "After that"],
    steps: [
      { title: "We listen", text: "We start by understanding your business.", icon: ClipboardCheck },
      { title: "We set it up", text: "We configure the screens around your workflow.", icon: GitBranch },
      { title: "We support", text: "We stay with you after setup.", icon: ShieldCheck },
    ],
  },
};

export const COMPARISON: L<{ eyebrow: string; title: [string, string] }> = {
  tr: { eyebrow: "Programlar", title: ["İki program,", "tek ekip."] },
  en: { eyebrow: "Programs", title: ["Two programs,", "one team."] },
};
