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
  /** Short bullet list for the comparison cards. */
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
    lead: "neXa sys ile siparişlerinizi, ürünlerinizi ve müşterilerinizi tek panelden yönetin.",
    href: "/urun/nexa",
    features: [
      { title: "QR menü ve sipariş", text: "Misafir masadan sipariş verir, sipariş anında sisteme düşer.", icon: QrCode },
      { title: "Kasa ve adisyon", text: "Masa, paket ve gel-al siparişleri tek kasada kapanır.", icon: ReceiptText },
      { title: "Mutfak ekranı", text: "Siparişler hazırlık sırasıyla mutfağa akar, kâğıt fiş gerekmez.", icon: ChefHat },
      { title: "Teslimat takibi", text: "Paket siparişin hangi aşamada olduğunu herkes aynı ekranda görür.", icon: Truck },
      { title: "Stok ve ürün", text: "Satılan her ürün stoktan düşer, kritik seviyede uyarı verir.", icon: Boxes },
      { title: "Anlık raporlar", text: "Ciro, sipariş ve ürün performansı gün içinde güncellenir.", icon: ChartColumn },
    ],
    highlights: [
      "QR menü, kasa ve mutfak ekranı",
      "Paket ve teslimat takibi",
      "Stok, ürün ve müşteri yönetimi",
      "Anlık satış raporları",
    ],
    idealFor: "Restoran, kafe ve sipariş yoğun işletmeler",
  },
  nexus: {
    slug: "nexus",
    name: "nexus",
    nameAcc: "nexus’u",
    category: "Yönetim sistemi",
    headline: ["Tüm iş süreçleriniz", "tek ekranda, daha ileriye."],
    lead: "nexus ile işlerinizi, görevlerinizi ve raporlarınızı tek noktadan takip edin.",
    href: "/urun/nexus",
    features: [
      { title: "Görev ve iş takibi", text: "İşleri ekiplere atayın, durumunu panodan izleyin.", icon: SquareKanban },
      { title: "Onay akışları", text: "Talep, satın alma ve izin süreçleri tanımlı adımlarla ilerler.", icon: GitBranch },
      { title: "Müşteri ve cari", text: "Müşteri kayıtları, görüşmeler ve bakiyeler tek kartta.", icon: Users },
      { title: "Teklif ve fatura", text: "Tekliften faturaya belgeler aynı kayıt üzerinden hazırlanır.", icon: FileSpreadsheet },
      { title: "Yönetim raporları", text: "Birim ve dönem bazlı göstergeler tek panelde toplanır.", icon: ChartColumn },
      { title: "Rol ve yetki", text: "Herkes yalnızca işi için gereken ekranları görür.", icon: ShieldCheck },
    ],
    highlights: [
      "Görev, proje ve iş takibi",
      "Onay ve talep akışları",
      "Müşteri, teklif ve fatura",
      "Yönetim paneli ve raporlar",
    ],
    idealFor: "Ekipleri ve süreçleri büyüyen işletmeler",
  },
};

export const HOME = {
  eyebrow: "Daha verimli yarınlar için",
  headline: ["İşinizin akışına", "güç veren yazılımlar."],
  lead: "İşletmeniz için geliştirilen akıllı yazılım çözümleri. Siparişten yönetime, her süreç tek bir ekip tarafından tasarlanır, kurulur ve desteklenir.",
  primary: "Programlarımızı Keşfedin",
  secondary: "Bize Ulaşın",
};

export const DIFFERENCE = {
  eyebrow: "Bizim Farkımız",
  title: "Teknolojiye değil, işinize odaklanın.",
  lead: "Karmaşık süreçleri sizin için basitleştiriyor, işinize değer katan yazılımlar geliştiriyoruz.",
  steps: [
    { title: "Anlıyoruz", text: "İşinizi ve ihtiyaçlarınızı anlamadan çözüm önermiyoruz.", icon: ClipboardCheck },
    { title: "Geliştiriyoruz", text: "Karmaşık süreçleri anlaşılır ve kolay kullanılan ekranlara dönüştürüyoruz.", icon: GitBranch },
    { title: "Devreye alıyoruz", text: "Kurulumdan sonra da güncelleme ve destekle yanınızdayız.", icon: ShieldCheck },
  ],
};

export const COMPARISON = {
  eyebrow: "Programlarımız",
  title: "İşinize uygun çözümü keşfedin.",
  lead: "Farklı ihtiyaçlara, aynı kalite anlayışıyla. İşinizi büyüten iki güçlü çözüm.",
};

export const GALLERY = {
  eyebrow: "İşlerimiz",
  title: "Tasarım örnekleri",
  lead: "Ekranlarımızı kullanan kişiyi düşünerek tasarlıyoruz. Aşağıdakiler ürünlerimizin gerçek arayüzlerinden ve canlı bileşenlerinden örnekler.",
};
