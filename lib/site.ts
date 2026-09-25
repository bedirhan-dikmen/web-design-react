/**
 * Site-wide facts: routes and company contact details.
 *
 * Contact details were confirmed by the site owner on 2026-09-21 as the
 * Giresun set shown in the contact-page reference. The reference mockups
 * contradict each other (the homepage mockup shows an İstanbul address and a
 * different phone and domain); those values are AI-render filler and must not
 * be used. Change contact data here only — every page reads it from this file.
 */

export const SITE = {
  name: "Kerinti Soft",
  tagline: "İşinizin akışına güç veren yazılımlar.",
  contact: {
    phoneDisplay: "0532 460 74 47",
    /** E.164, for `tel:` links. */
    phoneHref: "tel:+905324607447",
    email: "info@kerinti.com.tr",
    address: {
      lines: [
        "Giresun Teknopark II OSB Mevkii",
        "4. Cadde Sk. No: 5 İç Kapı No: Z03",
        "Pazarsuyu Köyü / Bulancak / Giresun",
      ],
      short: "Giresun Teknopark, Bulancak / Giresun",
    },
    hours: "Hafta içi 09:00 – 18:00",
  },
  /**
   * Social profiles. Empty on purpose: no real URLs have been supplied, and
   * the footer renders nothing rather than dead icons. Add `{ label, href }`
   * entries once the profiles are confirmed.
   */
  social: [] as { label: string; href: string }[],
} as const;

/** Google Maps directions to the office, built from the address above. */
export const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  [...SITE.contact.address.lines].join(", "),
)}`;

export type NavItem = { label: string; href: string };

/** A link inside a header dropdown. */
export type NavMenuLink = NavItem & { description?: string };

/** Header entries: a direct link, or a dropdown group. */
export type NavEntry =
  | ({ kind: "link" } & NavItem)
  | {
      kind: "menu";
      id: string;
      label: string;
      /** Product cards shown in the dropdown's main column (Ürünler only). */
      products?: { slug: "nexa" | "nexus"; href: string; description: string }[];
      links: NavMenuLink[];
      /** Paths that mark the trigger as active. */
      match: string[];
    };

/**
 * Header navigation (2026-09 redesign). Five top-level entries instead of
 * seven flat links: the two products and the company pages sit in
 * dropdowns, the most visited pages stay one click away. "Ana Sayfa" is the
 * logo.
 */
export const HEADER_NAV: NavEntry[] = [
  {
    kind: "menu",
    id: "urunler",
    label: "Ürünler",
    match: ["/urun", "/moduller"],
    products: [
      { slug: "nexa", href: "/urun/nexa", description: "Siparişten teslimata, her adım kontrolünüzde." },
      { slug: "nexus", href: "/urun/nexus", description: "Tüm iş süreçleriniz tek ekranda." },
    ],
    links: [
      { label: "neXa modülleri", href: "/moduller", description: "QR menüden e-faturaya tüm modüller" },
      { label: "Ürünleri karşılaştır", href: "/urun#programlar", description: "Hangisi işinize uygun?" },
      { label: "Tasarım örnekleri", href: "/urun#islerimiz", description: "Gerçek arayüzlerden örnekler" },
    ],
  },
  { kind: "link", label: "Çözümler", href: "/cozumler" },
  { kind: "link", label: "Referanslar", href: "/referanslar" },
  {
    kind: "menu",
    id: "kurumsal",
    label: "Kurumsal",
    match: ["/hakkimizda", "/marka"],
    links: [
      { label: "Hakkımızda", href: "/hakkimizda", description: "Ekibimiz ve yaklaşımımız" },
      { label: "Marka rehberi", href: "/marka", description: "Logolar, renkler ve kullanım" },
      { label: "Bayilik başvurusu", href: "/iletisim?konu=is-ortakligi#iletisim-formu", description: "İş ortağımız olun" },
    ],
  },
  { kind: "link", label: "İletişim", href: "/iletisim" },
];

/** Every "Demo Talep Et" on the site lands on the contact form, topic preset. */
export const DEMO_HREF = "/iletisim?konu=demo#iletisim-formu";
export const CONTACT_FORM_HREF = "/iletisim#iletisim-formu";
export const DEALER_LOGIN_HREF = "/bayi-girisi";
/** Dealer applications go through the contact form with the topic preset. */
export const DEALER_APPLY_HREF = "/iletisim?konu=is-ortakligi#iletisim-formu";

/**
 * Footer groups. Only routes that exist are linked: the reference footer also
 * lists Fiyatlandırma, Kariyer, Blog and Yardım Merkezi, which have no pages
 * or content yet, so they are left out rather than pointed at nothing.
 */
export const FOOTER_GROUPS: { title: string; links: NavItem[] }[] = [
  {
    title: "Ürünler",
    links: [
      { label: "neXa sys", href: "/urun/nexa" },
      { label: "nexus", href: "/urun/nexus" },
      { label: "neXa Modülleri", href: "/moduller" },
    ],
  },
  {
    title: "Çözümler",
    links: [
      { label: "Sektörler", href: "/cozumler" },
      { label: "Referanslar", href: "/referanslar" },
    ],
  },
  {
    title: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "İletişim", href: "/iletisim" },
      { label: "Demo Talebi", href: DEMO_HREF },
      { label: "Bayi Girişi", href: DEALER_LOGIN_HREF },
      { label: "Marka Rehberi", href: "/marka" },
    ],
  },
];
