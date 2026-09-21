/**
 * The business types NeXa is built for ("Kimler için?").
 *
 * Images are byte-identical copies of the /static_design masters, published
 * under /public/images/sectors (see docs/ASSET_MANIFEST.md, Phase 02). All are
 * 1448x1086 photographs, so `width`/`height` are shared.
 *
 * Titles and taglines are transcribed from the homepage reference. The
 * `focus` lines and module picks on the Çözümler page are recommendations
 * built from the module catalogue — they claim no capability that
 * lib/content/modules.ts does not already list.
 */
export type Sector = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  description: string;
  focus: string[];
  moduleSlugs: string[];
};

export const SECTOR_IMAGE_SIZE = { width: 1448, height: 1086 } as const;

export const SECTORS: Sector[] = [
  {
    slug: "restoranlar",
    title: "Restoranlar",
    tagline: "Fine dining'den yerel restoranlara.",
    image: "/images/sectors/restoranlar-1448x1086.png",
    imageAlt: "Kurulmuş masalarıyla loş ışıklı bir restoran salonu",
    description:
      "Salon, mutfak ve kasa arasındaki akışı tek sistemde toplayın; siparişten ödemeye her adımı hızlandırın.",
    focus: [
      "Masa ve salon düzeninin yönetimi",
      "Siparişin mutfağa anında iletilmesi",
      "Günlük satış ve performans takibi",
    ],
    moduleSlugs: ["masa-yonetimi", "kasa-pos", "mutfak-ekrani", "rezervasyon", "raporlama"],
  },
  {
    slug: "kafeler",
    title: "Kafeler",
    tagline: "Daha hızlı servis, daha mutlu misafirler.",
    image: "/images/sectors/kafeler-1448x1086.png",
    imageAlt: "Mermer masada latte ve kruvasan",
    description:
      "Yoğun saatlerde kuyruğu kısaltın: QR menüyle misafir siparişini kendisi versin, kasa ödemeye odaklansın.",
    focus: [
      "Yoğun saatlerde hızlı sipariş",
      "Temassız QR menü deneyimi",
      "Pratik kasa ve ödeme akışı",
    ],
    moduleSlugs: ["qr-menu", "kasa-pos", "stok-depo", "raporlama"],
  },
  {
    slug: "pastaneler",
    title: "Pastaneler",
    tagline: "Tatlı işletmeleri için özel çözümler.",
    image: "/images/sectors/pastaneler-1448x1086.png",
    imageAlt: "Çilekli pasta dilimi ve vitrin",
    description:
      "Vitrin satışını, siparişleri ve malzeme takibini aynı yerden yönetin.",
    focus: [
      "Vitrin ve masa satışının birlikte yönetimi",
      "Malzeme ve stok takibi",
      "Müşteri hesaplarının düzenli takibi",
    ],
    moduleSlugs: ["kasa-pos", "stok-depo", "cari-takip", "raporlama"],
  },
  {
    slug: "fast-food",
    title: "Fast Food Zincirleri",
    tagline: "Hızlı servis, yüksek verimlilik.",
    image: "/images/sectors/fast-food-1448x1086.png",
    imageAlt: "Hamburger ve patates kızartması",
    description:
      "Saniyelerin önemli olduğu serviste siparişi kasadan mutfağa kesintisiz taşıyın, telefon siparişlerinde müşteriyi anında tanıyın.",
    focus: [
      "Yüksek sipariş hacminde hız",
      "Kasa ve mutfak arasında kesintisiz akış",
      "Telefon siparişlerinde müşteri tanıma",
    ],
    moduleSlugs: ["kasa-pos", "mutfak-ekrani", "caller-id", "vardiya", "raporlama"],
  },
  {
    slug: "oteller",
    title: "Oteller",
    tagline: "Restoran, bar ve oda servisi yönetimi.",
    image: "/images/sectors/oteller-1448x1086.png",
    imageAlt: "Deniz manzaralı bir otel restoranı",
    description:
      "Otelinizin restoran ve bar noktalarını tek sistemde yönetin; rezervasyon ve hesap takibini düzenli tutun.",
    focus: [
      "Restoran ve bar noktalarının yönetimi",
      "Rezervasyon takibi",
      "Cari hesap ve faturalandırma",
    ],
    moduleSlugs: ["rezervasyon", "masa-yonetimi", "kasa-pos", "cari-takip", "e-fatura"],
  },
  {
    slug: "yeme-icme-gruplari",
    title: "Yeme-İçme Grupları",
    tagline: "Birden fazla şube için merkezi yönetim.",
    image: "/images/sectors/yeme-icme-gruplari-1448x1086.png",
    imageAlt: "Geniş ve kalabalık bir restoran salonu",
    description:
      "Birden fazla şubeyi merkezi olarak izleyin; satış, stok ve personel süreçlerini tek ekosistemde toplayın.",
    focus: [
      "Şubelerin merkezi takibi",
      "Satış ve performans raporları",
      "Stok ve personel süreçlerinin standardı",
    ],
    moduleSlugs: ["raporlama", "stok-depo", "vardiya", "e-fatura", "cari-takip"],
  },
];
