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

/**
 * The two Kerinti products and the company-level homepage copy.
 *
 * Headlines, leads and the three differentiators are taken from the live
 * reference site (web.kerinti.com.tr). neXa's feature list is backed by the
 * existing module catalogue (lib/content/modules.ts).
 *
 * TODO(content): nexus has no feature catalogue or screenshots in this repo
 * yet. Its feature list below is derived from the reference line "işlerinizi,
 * görevlerinizi ve raporlarınızı tek noktadan takip edin" and must be
 * confirmed by the product owner before launch.
 */

export type ProductSlug = "nexa" | "nexus";

export type ProductFeature = { title: string; text: string; icon: LucideIcon };

export type Product = {
  slug: ProductSlug;
  name: string;
  /** Accusative form for CTAs (Turkish suffix follows the vowel). */
  nameAcc: string;
  category: string;
  headline: [string, string];
  lead: string;
  href: string;
  features: ProductFeature[];
  /** Short tags for the product cards. */
  highlights: string[];
  idealFor: string;
};

export const PRODUCTS: Record<ProductSlug, Product> = {
  nexa: {
    slug: "nexa",
    name: "neXa sys",
    nameAcc: "neXa sys’i",
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
    nameAcc: "nexus’u",
    category: "Yönetim sistemi",
    headline: ["Tüm iş süreçleriniz", "tek ekranda, daha ileriye."],
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
};

export const HOME = {
  eyebrow: "Kerinti Yazılım",
  headline: ["İşinizin akışına", "güç veren yazılımlar."],
  lead: "Sipariş ve iş yönetimini sadeleştiren yazılımlar. Kurulumdan desteğe tek ekip.",
  primary: "Demo Talep Et",
  secondary: "Ürünleri İncele",
};

export const DIFFERENCE = {
  eyebrow: "Yaklaşımımız",
  title: "Teknolojiye değil, işinize odaklanın.",
  steps: [
    { title: "Anlıyoruz", text: "Önce işinizi dinliyoruz.", icon: ClipboardCheck },
    { title: "Geliştiriyoruz", text: "Karmaşık süreci sade ekranlara çeviriyoruz.", icon: GitBranch },
    { title: "Devreye alıyoruz", text: "Kurulumdan sonra da yanınızdayız.", icon: ShieldCheck },
  ],
};

export const COMPARISON = {
  eyebrow: "Ürünler",
  title: "İki ürün, tek ekip.",
};

export const GALLERY = {
  eyebrow: "İşlerimiz",
  title: "Ürünlerimizden ekranlar.",
};
