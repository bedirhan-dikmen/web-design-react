import type { L } from "@/lib/i18n";

/**
 * Who each program is for, in Turkish and English.
 *
 * neXa sys — the business types it is built for. Images are byte-identical
 * copies of the /static_design masters, published under /public/images/
 * sectors (see docs/ASSET_MANIFEST.md, Phase 02). All are 1448x1086
 * photographs, so `width`/`height` are shared. Titles and taglines are
 * transcribed from the homepage reference; the `focus` lines and module
 * picks claim nothing lib/content/modules.ts does not already list.
 *
 * nexus — by team rather than by industry: the site states no industries for
 * nexus, only that it serves "ekipleri ve süreçleri büyüyen işletmeler"
 * (products.ts). Each team is served by features nexus already lists
 * (`features` are indexes into PRODUCTS[locale].nexus.features); the copy
 * restates those features, nothing more.
 *
 * TODO(content): confirm the nexus team list and all English copy with the
 * product owner.
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

export const SECTORS: L<Sector[]> = {
  tr: [
    {
      slug: "restoranlar",
      title: "Restoranlar",
      tagline: "Fine dining'den yerel restoranlara.",
      image: "/images/sectors/restoranlar-1448x1086.png",
      imageAlt: "Kurulmuş masalarıyla loş ışıklı bir restoran salonu",
      description: "Salon, mutfak ve kasa arasındaki akışı tek sistemde toplayın; siparişten ödemeye her adımı tek ekrandan izleyin.",
      focus: ["Masa ve salon düzeninin yönetimi", "Siparişin mutfağa anında iletilmesi", "Günlük satış takibi"],
      moduleSlugs: ["masa-yonetimi", "kasa-pos", "mutfak-ekrani", "rezervasyon", "raporlama"],
    },
    {
      slug: "kafeler",
      title: "Kafeler",
      tagline: "Yoğun saatlerde hızlı servis.",
      image: "/images/sectors/kafeler-1448x1086.png",
      imageAlt: "Mermer masada latte ve kruvasan",
      description: "Yoğun saatlerde misafir siparişini QR menüyle kendisi versin, kasa ödemeye odaklansın.",
      focus: ["Yoğun saatlerde hızlı sipariş", "Temassız QR menü", "Pratik kasa ve ödeme akışı"],
      moduleSlugs: ["qr-menu", "kasa-pos", "stok-depo", "raporlama"],
    },
    {
      slug: "pastaneler",
      title: "Pastaneler",
      tagline: "Vitrin, sipariş ve malzeme bir arada.",
      image: "/images/sectors/pastaneler-1448x1086.png",
      imageAlt: "Çilekli pasta dilimi ve vitrin",
      description: "Vitrin satışını, siparişleri ve malzeme takibini aynı yerden yönetin.",
      focus: ["Vitrin ve masa satışının birlikte yönetimi", "Malzeme ve stok takibi", "Müşteri hesaplarının takibi"],
      moduleSlugs: ["kasa-pos", "stok-depo", "cari-takip", "raporlama"],
    },
    {
      slug: "fast-food",
      title: "Fast Food Zincirleri",
      tagline: "Yüksek hacimde kesintisiz akış.",
      image: "/images/sectors/fast-food-1448x1086.png",
      imageAlt: "Hamburger ve patates kızartması",
      description: "Siparişi kasadan mutfağa kesintisiz taşıyın, telefon siparişlerinde müşteriyi çağrı geldiği anda tanıyın.",
      focus: ["Yüksek sipariş hacminde akış", "Kasa ile mutfak arasında kesintisiz iletim", "Telefon siparişlerinde müşteri tanıma"],
      moduleSlugs: ["kasa-pos", "mutfak-ekrani", "caller-id", "vardiya", "raporlama"],
    },
    {
      slug: "oteller",
      title: "Oteller",
      tagline: "Restoran, bar ve oda servisi.",
      image: "/images/sectors/oteller-1448x1086.png",
      imageAlt: "Deniz manzaralı bir otel restoranı",
      description: "Otelinizin restoran ve bar noktalarını tek sistemde yönetin; rezervasyon ve hesap takibini düzenli tutun.",
      focus: ["Restoran ve bar noktalarının yönetimi", "Rezervasyon takibi", "Cari hesap ve faturalandırma"],
      moduleSlugs: ["rezervasyon", "masa-yonetimi", "kasa-pos", "cari-takip", "e-fatura"],
    },
    {
      slug: "yeme-icme-gruplari",
      title: "Yeme-İçme Grupları",
      tagline: "Birden fazla şube, tek merkez.",
      image: "/images/sectors/yeme-icme-gruplari-1448x1086.png",
      imageAlt: "Geniş ve kalabalık bir restoran salonu",
      description: "Şubeleri merkezden izleyin; satış, stok ve personel süreçlerini tek sistemde toplayın.",
      focus: ["Şubelerin merkezi takibi", "Satış raporları", "Ortak stok ve personel süreçleri"],
      moduleSlugs: ["raporlama", "stok-depo", "vardiya", "e-fatura", "cari-takip"],
    },
  ],
  en: [
    {
      slug: "restoranlar",
      title: "Restaurants",
      tagline: "From fine dining to the local restaurant.",
      image: "/images/sectors/restoranlar-1448x1086.png",
      imageAlt: "A dimly lit restaurant dining room with set tables",
      description: "Bring the floor, the kitchen and the till into one system and follow every step from order to payment on one screen.",
      focus: ["Tables and floor layout", "Orders sent to the kitchen instantly", "Daily sales tracking"],
      moduleSlugs: ["masa-yonetimi", "kasa-pos", "mutfak-ekrani", "rezervasyon", "raporlama"],
    },
    {
      slug: "kafeler",
      title: "Cafés",
      tagline: "Quick service at busy hours.",
      image: "/images/sectors/kafeler-1448x1086.png",
      imageAlt: "Latte and croissant on a marble table",
      description: "At busy hours guests order themselves with the QR menu, and the till can focus on payment.",
      focus: ["Quick ordering at busy hours", "Contactless QR menu", "Simple till and payment flow"],
      moduleSlugs: ["qr-menu", "kasa-pos", "stok-depo", "raporlama"],
    },
    {
      slug: "pastaneler",
      title: "Patisseries",
      tagline: "Counter, orders and ingredients together.",
      image: "/images/sectors/pastaneler-1448x1086.png",
      imageAlt: "A slice of strawberry cake and a display counter",
      description: "Run counter sales, orders and ingredient tracking from the same place.",
      focus: ["Counter and table sales together", "Ingredient and stock tracking", "Customer accounts"],
      moduleSlugs: ["kasa-pos", "stok-depo", "cari-takip", "raporlama"],
    },
    {
      slug: "fast-food",
      title: "Fast Food Chains",
      tagline: "A steady flow at high volume.",
      image: "/images/sectors/fast-food-1448x1086.png",
      imageAlt: "Burger and fries",
      description: "Move each order from the till to the kitchen without breaks, and recognise phone customers as the call comes in.",
      focus: ["Flow at high order volume", "Till to kitchen without breaks", "Customer recognition on phone orders"],
      moduleSlugs: ["kasa-pos", "mutfak-ekrani", "caller-id", "vardiya", "raporlama"],
    },
    {
      slug: "oteller",
      title: "Hotels",
      tagline: "Restaurant, bar and room service.",
      image: "/images/sectors/oteller-1448x1086.png",
      imageAlt: "A hotel restaurant with a sea view",
      description: "Run your hotel's restaurant and bar outlets in one system and keep reservations and accounts in order.",
      focus: ["Restaurant and bar outlets", "Reservation tracking", "Accounts and invoicing"],
      moduleSlugs: ["rezervasyon", "masa-yonetimi", "kasa-pos", "cari-takip", "e-fatura"],
    },
    {
      slug: "yeme-icme-gruplari",
      title: "Food & Beverage Groups",
      tagline: "Many branches, one centre.",
      image: "/images/sectors/yeme-icme-gruplari-1448x1086.png",
      imageAlt: "A large, busy restaurant dining room",
      description: "Follow your branches from one place and bring sales, stock and staff processes into one system.",
      focus: ["Central view of all branches", "Sales reports", "Shared stock and staff processes"],
      moduleSlugs: ["raporlama", "stok-depo", "vardiya", "e-fatura", "cari-takip"],
    },
  ],
};

export type NexusTeam = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  focus: string[];
  /** Indexes into PRODUCTS[locale].nexus.features. */
  features: number[];
};

// Feature indexes: 0 tasks, 1 approvals, 2 customers/accounts,
// 3 quotes/invoices, 4 reports, 5 roles/permissions.
export const NEXUS_TEAMS: L<NexusTeam[]> = {
  tr: [
    {
      slug: "satin-alma",
      title: "Satın Alma",
      tagline: "Talepten onaya, izlenebilir alımlar.",
      description: "Satın alma taleplerini kayda alın, teklifleri tek kayıtta toplayın ve onaydan tanımlı adımlarla geçirin.",
      focus: ["Talepler tanımlı onay adımlarıyla ilerler", "Tekliften faturaya tek kayıt", "Her talebin durumu panodan izlenir"],
      features: [1, 3, 0],
    },
    {
      slug: "finans",
      title: "Finans ve Muhasebe",
      tagline: "Cari, fatura ve tahsilat bir arada.",
      description: "Müşteri ve cari kayıtlarını, faturaları ve tahsilatı aynı yerden izleyin; göstergeler yönetim panelinde.",
      focus: ["Kayıt, görüşme ve bakiye tek kartta", "Tekliften faturaya kesintisiz akış", "Tahsilat göstergeleri tek panelde"],
      features: [2, 3, 4],
    },
    {
      slug: "satis",
      title: "Satış ve Müşteri",
      tagline: "Her müşteri tek kartta.",
      description: "Müşteri kaydını, görüşmeleri ve teklifleri tek kartta tutun; takip işlerini ekibe görev olarak atayın.",
      focus: ["Müşteri geçmişi tek kartta", "Teklifler kayıttan çıkar", "Takip işleri görev olarak atanır"],
      features: [2, 3, 0],
    },
    {
      slug: "operasyon",
      title: "Operasyon ve Proje",
      tagline: "Kim, neyi, ne zaman yapıyor?",
      description: "İşleri sorumlusuna atayın, panodan izleyin; herkes yalnızca kendi işini görsün.",
      focus: ["Görev atama ve pano takibi", "Rol ve yetkiye göre görünüm", "İlerleme yönetim panelinde"],
      features: [0, 5, 4],
    },
    {
      slug: "insan-kaynaklari",
      title: "İnsan Kaynakları",
      tagline: "Talepler kayıtlı, onaylar tanımlı.",
      description: "Personel taleplerini tanımlı onay adımlarıyla yürütün; kimin neye eriştiğini rol ve yetkiyle belirleyin.",
      focus: ["Talepler onay adımlarıyla ilerler", "Erişim rol ve yetkiyle sınırlı", "Açık işler panodan izlenir"],
      features: [1, 5, 0],
    },
    {
      slug: "yonetim",
      title: "Yönetim",
      tagline: "Tüm göstergeler tek panelde.",
      description: "Ekiplerin, onayların ve finansın durumunu tek panelden izleyin.",
      focus: ["Tüm göstergeler tek panelde", "Bekleyen onaylar bir bakışta", "Ekip bazında ilerleme"],
      features: [4, 1, 5],
    },
  ],
  en: [
    {
      slug: "satin-alma",
      title: "Purchasing",
      tagline: "Traceable buying, from request to approval.",
      description: "Record purchase requests, keep the quotes on one record and take them through approval in defined steps.",
      focus: ["Requests follow defined approval steps", "One record from quote to invoice", "Every request's status on the board"],
      features: [1, 3, 0],
    },
    {
      slug: "finans",
      title: "Finance and Accounting",
      tagline: "Accounts, invoices and collections together.",
      description: "Follow customer accounts, invoices and collections in one place, with the indicators on the management panel.",
      focus: ["Record, meetings and balance on one card", "Quote to invoice without breaks", "Collection indicators on one panel"],
      features: [2, 3, 4],
    },
    {
      slug: "satis",
      title: "Sales and Customers",
      tagline: "Every customer on one card.",
      description: "Keep the customer record, meetings and quotes on one card, and assign follow-ups to the team as tasks.",
      focus: ["Customer history on one card", "Quotes come from the record", "Follow-ups assigned as tasks"],
      features: [2, 3, 0],
    },
    {
      slug: "operasyon",
      title: "Operations and Projects",
      tagline: "Who is doing what, and when?",
      description: "Assign work to an owner and follow it on a board; everyone sees only their own work.",
      focus: ["Task assignment and board tracking", "Views by role and permission", "Progress on the management panel"],
      features: [0, 5, 4],
    },
    {
      slug: "insan-kaynaklari",
      title: "Human Resources",
      tagline: "Requests on record, approvals defined.",
      description: "Run staff requests through defined approval steps and set who can access what with roles and permissions.",
      focus: ["Requests follow approval steps", "Access limited by role and permission", "Open work followed on the board"],
      features: [1, 5, 0],
    },
    {
      slug: "yonetim",
      title: "Management",
      tagline: "Every indicator on one panel.",
      description: "Follow the state of teams, approvals and finance from one panel.",
      focus: ["Every indicator on one panel", "Pending approvals at a glance", "Progress by team"],
      features: [4, 1, 5],
    },
  ],
};
