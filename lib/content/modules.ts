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
import type { L, Locale } from "@/lib/i18n";

/**
 * The neXa module catalogue, in Turkish and English.
 *
 * Source of truth for the product page, the about page and the homepage
 * sectors panel. Wording is transcribed from the approved references
 * (homepage and about mockups), with the mockups' garbled strings corrected
 * by hand and a few claims toned down ("akıllı", "servis hızınız artar").
 *
 * `points` must stay grounded. Each one either restates the reference copy or
 * describes something visible in a real neXa screenshot in /static_design
 * (the dashboard, POS, kitchen display and QR menu captures). Modules with no
 * screenshot therefore have short lists — that is deliberate, not unfinished.
 * Do not add capabilities here that the product owner has not confirmed.
 */
export type Module = {
  slug: string;
  title: string;
  /** One line, for the compact cards. */
  summary: string;
  /** Short paragraph for the modules section. */
  description: string;
  points: string[];
  icon: LucideIcon;
};

type Copy = Omit<Module, "slug" | "icon">;

const CATALOGUE: { slug: string; icon: LucideIcon; copy: L<Copy> }[] = [
  {
    slug: "qr-menu",
    icon: QrCode,
    copy: {
      tr: {
        title: "QR Menü ve Sipariş",
        summary: "Masadan telefonla, temassız sipariş.",
        description: "Misafirleriniz masadaki QR kodu okutarak menünüze ulaşır, ürünleri inceler ve siparişini telefonundan verir.",
        points: ["Masadaki QR kodla menüye anında erişim", "Kategorilere ayrılmış, görselli menü", "Sepete ekleyerek temassız sipariş"],
      },
      en: {
        title: "QR Menu and Ordering",
        summary: "Contactless ordering from the table, by phone.",
        description: "Guests scan the QR code on the table to open your menu, browse the items and order from their phone.",
        points: ["Instant menu access from the table's QR code", "Menu organised by category, with photos", "Contactless ordering through a basket"],
      },
    },
  },
  {
    slug: "kasa-pos",
    icon: ReceiptText,
    copy: {
      tr: {
        title: "Kasa (POS)",
        summary: "Adisyon ve ödeme aynı ekranda.",
        description: "Masa ve ürün seçimiyle adisyonu oluşturun, siparişi takip edin ve ödemeyi aynı ekrandan alın.",
        points: ["Masa bazlı sipariş girişi", "Kategori ve ürün seçimiyle hızlı adisyon", "Sipariş listesinden tek adımda ödemeye geçiş"],
      },
      en: {
        title: "Till (POS)",
        summary: "Bills and payment on one screen.",
        description: "Build the bill by picking the table and items, follow the order and take payment from the same screen.",
        points: ["Order entry by table", "Quick bills by category and item", "One step from the order list to payment"],
      },
    },
  },
  {
    slug: "mutfak-ekrani",
    icon: ChefHat,
    copy: {
      tr: {
        title: "Mutfak Ekranı",
        summary: "Siparişler anında mutfağa iletilir.",
        description: "Salondan ya da QR menüden gelen her sipariş anında mutfak ekranına düşer; ekip neyin hazırlandığını ve neyin beklediğini tek bakışta görür.",
        points: ["Siparişlerin anında mutfağa iletilmesi", "Hazırlanıyor, Pişiyor ve Hazır durumlarıyla takip", "Her siparişin bekleme süresi ekranda"],
      },
      en: {
        title: "Kitchen Display",
        summary: "Orders reach the kitchen instantly.",
        description: "Every order from the floor or the QR menu lands on the kitchen display at once; the team sees what is being prepared and what is waiting at a glance.",
        points: ["Orders sent to the kitchen instantly", "Tracked as Preparing, Cooking and Ready", "Each order's waiting time on screen"],
      },
    },
  },
  {
    slug: "rezervasyon",
    icon: CalendarCheck,
    copy: {
      tr: {
        title: "Rezervasyon",
        summary: "Online ve masa rezervasyon yönetimi.",
        description: "Online gelen ve masa bazlı rezervasyonları tek yerden yönetin.",
        points: ["Online rezervasyon yönetimi", "Masa rezervasyonu"],
      },
      en: {
        title: "Reservations",
        summary: "Online and table reservations.",
        description: "Manage online and table reservations in one place.",
        points: ["Online reservation management", "Table reservations"],
      },
    },
  },
  {
    slug: "stok-depo",
    icon: Package,
    copy: {
      tr: {
        title: "Stok ve Depo",
        summary: "Malzeme ve stok takibi.",
        description: "Malzemelerinizi takip edin, stok ve depo süreçlerinizi tek panelden yönetin.",
        points: ["Malzeme takibi", "Stok ve depo yönetimi"],
      },
      en: {
        title: "Stock and Storage",
        summary: "Ingredient and stock tracking.",
        description: "Track your ingredients and manage stock and storage from one panel.",
        points: ["Ingredient tracking", "Stock and storage management"],
      },
    },
  },
  {
    slug: "e-fatura",
    icon: FileText,
    copy: {
      tr: {
        title: "E-Fatura",
        summary: "Gelir İdaresi uyumlu e-fatura ve e-arşiv.",
        description: "Faturalarınızı Gelir İdaresi Başkanlığı'na uyumlu e-fatura ve e-arşiv olarak düzenleyin.",
        points: ["Gelir İdaresi uyumlu e-fatura", "E-arşiv fatura"],
      },
      en: {
        title: "E-Invoice",
        summary: "E-invoices and e-archive, compliant with the Turkish Revenue Administration.",
        description: "Issue your invoices as e-invoices and e-archive invoices compliant with the Turkish Revenue Administration.",
        points: ["Revenue Administration compliant e-invoice", "E-archive invoice"],
      },
    },
  },
  {
    slug: "cari-takip",
    icon: Users,
    copy: {
      tr: {
        title: "Cari Takip",
        summary: "Müşteri ve tedarikçi hesapları.",
        description: "Müşteri ve tedarikçi hesaplarınızı düzenli tutun, bakiyeleri tek yerden izleyin.",
        points: ["Müşteri hesapları", "Tedarikçi hesapları"],
      },
      en: {
        title: "Accounts",
        summary: "Customer and supplier accounts.",
        description: "Keep customer and supplier accounts in order and follow balances in one place.",
        points: ["Customer accounts", "Supplier accounts"],
      },
    },
  },
  {
    slug: "raporlama",
    icon: ChartColumn,
    copy: {
      tr: {
        title: "Raporlama",
        summary: "Satış ve siparişler anlık raporda.",
        description: "Günün satışlarını, sipariş sayısını ve sipariş kanallarını anlık izleyin.",
        points: ["Günlük satış, toplam sipariş ve ortalama hesap", "Satış grafiği ve sipariş dağılımı", "Salon, paket, gel-al ve online kanal kırılımı"],
      },
      en: {
        title: "Reporting",
        summary: "Sales and orders in a live report.",
        description: "Follow the day's sales, order count and order channels as they happen.",
        points: ["Daily sales, total orders and average bill", "Sales chart and order split", "Breakdown by dine-in, delivery, takeaway and online"],
      },
    },
  },
  {
    slug: "vardiya",
    icon: Clock,
    copy: {
      tr: {
        title: "Vardiya Yönetimi",
        summary: "Personel vardiya ve puan takibi.",
        description: "Personelinizin vardiyalarını ve puanlarını düzenli takip edin.",
        points: ["Personel vardiya takibi", "Puan takibi"],
      },
      en: {
        title: "Shift Management",
        summary: "Staff shifts and scores.",
        description: "Keep track of your staff's shifts and scores.",
        points: ["Staff shift tracking", "Score tracking"],
      },
    },
  },
  {
    slug: "caller-id",
    icon: PhoneIncoming,
    copy: {
      tr: {
        title: "Caller ID",
        summary: "Gelen çağrılarda müşteri tanıma.",
        description: "Telefonla sipariş veren müşterinizi çağrı geldiği anda tanıyın.",
        points: ["Gelen çağrıda müşteri tanıma"],
      },
      en: {
        title: "Caller ID",
        summary: "Recognise customers on incoming calls.",
        description: "Recognise a customer ordering by phone as soon as the call comes in.",
        points: ["Customer recognition on incoming calls"],
      },
    },
  },
  {
    slug: "masa-yonetimi",
    icon: Armchair,
    copy: {
      tr: {
        title: "Masa Yönetimi",
        summary: "Masa planı ve durum takibi.",
        description: "Salonunuzun masa planını oluşturun, masaların durumunu anlık takip edin ve düzeni ihtiyaca göre değiştirin.",
        points: ["Masa planı", "Masa durum takibi", "Esnek salon düzeni"],
      },
      en: {
        title: "Table Management",
        summary: "Floor plan and table status.",
        description: "Build your floor plan, follow each table's status live and change the layout as needed.",
        points: ["Floor plan", "Table status tracking", "Flexible floor layout"],
      },
    },
  },
];

export function modules(locale: Locale): Module[] {
  return CATALOGUE.map((m) => ({ slug: m.slug, icon: m.icon, ...m.copy[locale] }));
}

export function modulesBySlug(slugs: string[], locale: Locale): Module[] {
  const all = modules(locale);
  return slugs.map((slug) => all.find((m) => m.slug === slug)).filter((m): m is Module => Boolean(m));
}
