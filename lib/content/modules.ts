import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  CalendarCheck,
  ChartColumn,
  ChefHat,
  Clock,
  FileText,
  Package,
  PhoneIncoming,
  QrCode,
  ReceiptText,
  Users,
} from "lucide-react";

/**
 * The NeXa module catalogue.
 *
 * Source of truth for the homepage feature grid, the Modüller page, the
 * product page and the about page. Wording is transcribed from the approved
 * references (homepage and about mockups), with the mockups' garbled strings
 * corrected by hand.
 *
 * `points` must stay grounded. Each one either restates the reference copy or
 * describes something visible in a real NeXa screenshot in /static_design
 * (the dashboard, POS, kitchen display and QR menu captures). Modules with no
 * screenshot therefore have short lists — that is deliberate, not unfinished.
 * Do not add capabilities here that the product owner has not confirmed.
 */
export type Module = {
  slug: string;
  title: string;
  /** One line, for the compact cards. */
  summary: string;
  /** Short paragraph for the Modüller page. */
  description: string;
  points: string[];
  icon: LucideIcon;
};

export const MODULES: Module[] = [
  {
    slug: "qr-menu",
    title: "QR Menü ve Sipariş",
    summary: "Temassız, hızlı ve pratik sipariş deneyimi.",
    description:
      "Misafirleriniz masadaki QR kodu okutarak menünüze ulaşır, ürünleri inceler ve siparişini telefonundan verir.",
    points: [
      "Masadaki QR kodla menüye anında erişim",
      "Kategorilere ayrılmış, görselli menü",
      "Sepete ekleyerek temassız sipariş",
    ],
    icon: QrCode,
  },
  {
    slug: "kasa-pos",
    title: "Kasa (POS)",
    summary: "Hızlı, güvenilir ve esnek ödeme çözümleri.",
    description:
      "Masa ve ürün seçimiyle adisyonu saniyeler içinde oluşturun, siparişi takip edin ve ödemeyi aynı ekrandan alın.",
    points: [
      "Masa bazlı sipariş girişi",
      "Kategori ve ürün seçimiyle hızlı adisyon",
      "Sipariş listesinden tek adımda ödemeye geçiş",
    ],
    icon: ReceiptText,
  },
  {
    slug: "mutfak-ekrani",
    title: "Mutfak Ekranı",
    summary: "Siparişler anında mutfağa iletilir, servis hızınız artar.",
    description:
      "Salondan ya da QR menüden gelen her sipariş anında mutfak ekranına düşer; ekip neyin hazırlandığını ve neyin beklediğini tek bakışta görür.",
    points: [
      "Siparişlerin anında mutfağa iletilmesi",
      "Hazırlanıyor, Pişiyor ve Hazır durumlarıyla takip",
      "Her siparişin bekleme süresi ekranda",
    ],
    icon: ChefHat,
  },
  {
    slug: "rezervasyon",
    title: "Rezervasyon",
    summary: "Online ve masa rezervasyon yönetimi.",
    description:
      "Online gelen ve masa bazlı rezervasyonları tek yerden yönetin.",
    points: ["Online rezervasyon yönetimi", "Masa rezervasyonu"],
    icon: CalendarCheck,
  },
  {
    slug: "stok-depo",
    title: "Stok ve Depo",
    summary: "Malzeme takibi ve akıllı stok yönetimi.",
    description:
      "Malzemelerinizi takip edin, stok ve depo süreçlerinizi tek panelden yönetin.",
    points: ["Malzeme takibi", "Akıllı stok yönetimi"],
    icon: Package,
  },
  {
    slug: "e-fatura",
    title: "E-Fatura",
    summary: "Gelir İdaresi uyumlu e-fatura ve e-arşiv.",
    description:
      "Faturalarınızı Gelir İdaresi Başkanlığı'na uyumlu e-fatura ve e-arşiv olarak düzenleyin.",
    points: ["Gelir İdaresi uyumlu e-fatura", "E-arşiv fatura"],
    icon: FileText,
  },
  {
    slug: "cari-takip",
    title: "Cari Takip",
    summary: "Müşteri ve tedarikçi hesap yönetimi.",
    description:
      "Müşteri ve tedarikçi hesaplarınızı düzenli tutun, bakiyeleri tek yerden izleyin.",
    points: ["Müşteri hesapları", "Tedarikçi hesapları"],
    icon: Users,
  },
  {
    slug: "raporlama",
    title: "Raporlama",
    summary: "Detaylı analizlerle daha doğru kararlar.",
    description:
      "Günün satışlarını, sipariş sayısını ve sipariş kanallarını anlık izleyin; kararlarınızı veriye dayandırın.",
    points: [
      "Günlük satış, toplam sipariş ve ortalama hesap",
      "Satış grafiği ve sipariş dağılımı",
      "Salon, paket, gel-al ve online kanal kırılımı",
    ],
    icon: ChartColumn,
  },
  {
    slug: "vardiya",
    title: "Vardiya Yönetimi",
    summary: "Personel vardiya ve puan takibi.",
    description: "Personelinizin vardiyalarını ve puanlarını düzenli takip edin.",
    points: ["Personel vardiya takibi", "Puan takibi"],
    icon: Clock,
  },
  {
    slug: "caller-id",
    title: "Caller ID",
    summary: "Gelen çağrılarda müşteri tanıma.",
    description:
      "Telefonla sipariş veren müşterinizi çağrı geldiği anda tanıyın.",
    points: ["Gelen çağrıda müşteri tanıma"],
    icon: PhoneIncoming,
  },
  {
    slug: "masa-yonetimi",
    title: "Masa Yönetimi",
    summary: "Masa planı, durum takibi ve esnek düzen.",
    description:
      "Salonunuzun masa planını oluşturun, masaların durumunu anlık takip edin ve düzeni ihtiyaca göre değiştirin.",
    points: ["Masa planı", "Masa durum takibi", "Esnek salon düzeni"],
    icon: Armchair,
  },
];

/** The modules the about page's "Ne Geliştiriyoruz?" grid shows. */
export const ABOUT_MODULE_SLUGS = [
  "qr-menu",
  "kasa-pos",
  "mutfak-ekrani",
  "rezervasyon",
  "stok-depo",
  "raporlama",
  "cari-takip",
  "masa-yonetimi",
];

export function modulesBySlug(slugs: string[]): Module[] {
  return slugs
    .map((slug) => MODULES.find((m) => m.slug === slug))
    .filter((m): m is Module => Boolean(m));
}
