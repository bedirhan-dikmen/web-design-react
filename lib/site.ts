import type { L, Locale } from "./i18n";

/**
 * Site-wide facts: routes and company contact details.
 *
 * Contact details were confirmed by the site owner on 2026-09-21 as the
 * Giresun set shown in the contact-page reference. The reference mockups
 * contradict each other (the homepage mockup shows an İstanbul address and a
 * different phone and domain); those values are AI-render filler and must not
 * be used. Change contact data here only — every page reads it from this file.
 *
 * Words that change with the language are `L<T>` pairs; the postal address
 * stays in Turkish in both languages (it is an address).
 */

export const SITE = {
  name: "Kerinti Soft",
  tagline: {
    tr: "İşinizin akışına güç veren yazılımlar.",
    en: "Software that powers the flow of your business.",
  } as L<string>,
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
    hours: { tr: "Hafta içi 09:00 – 18:00", en: "Weekdays 09:00 – 18:00" } as L<string>,
  },
  /**
   * Social profiles. Empty on purpose: no real URLs have been supplied, and
   * the footer renders nothing rather than dead icons. Add `{ label, href }`
   * entries once the profiles are confirmed.
   */
  social: [] as { label: string; href: string }[],
} as const;

const ADDRESS_QUERY = encodeURIComponent([...SITE.contact.address.lines].join(", "));

/** Google Maps directions to the office, built from the address above. */
export const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`;

/** Keyless Google Maps embed of the same address (contact page). */
export const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${ADDRESS_QUERY}&z=15&output=embed`;

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
      /** Product cards shown in the dropdown's main column (Programlar only). */
      products?: { slug: "nexa" | "nexus"; href: string; description: string }[];
      links: NavMenuLink[];
      /** Paths that mark the trigger as active. */
      match: string[];
      /** Optional photo card in the dropdown's last column. */
      feature?: { title: string; text: string; href: string; image: string; width: number; height: number; alt: string };
    };

/** Every "Demo Talep Et" on the site lands on the contact form, topic preset. */
export const DEMO_HREF = "/iletisim?konu=demo#iletisim-formu";
export const CONTACT_FORM_HREF = "/iletisim#iletisim-formu";
export const DEALER_LOGIN_HREF = "/bayi-girisi";
/** Dealer applications go through the contact form with the topic preset. */
export const DEALER_APPLY_HREF = "/iletisim?konu=is-ortakligi#iletisim-formu";

/**
 * Header navigation. Four top-level entries: the home page, the two
 * programs and the company pages in dropdowns, and contact. "Ana Sayfa" is
 * both the logo and the first entry.
 */
const HEADER_NAV: L<NavEntry[]> = {
  tr: [
    { kind: "link", label: "Ana Sayfa", href: "/" },
    {
      kind: "menu",
      id: "programlar",
      label: "Programlar",
      match: ["/urun"],
      products: [
        { slug: "nexa", href: "/urun/nexa", description: "Sipariş yönetimi: masa, mutfak, kasa ve rapor." },
        { slug: "nexus", href: "/urun/nexus", description: "İş yönetimi: görev, onay, cari ve rapor." },
      ],
      links: [{ label: "Tüm programlar", href: "/urun", description: "neXa sys ve nexus bir arada" }],
      feature: {
        title: "neXa sys'i yakından görün",
        text: "QR menüden rapora, siparişin her adımı.",
        href: "/urun/nexa",
        image: "/images/scenes/qr-table-stand-1122x1402.png",
        width: 1122,
        height: 1402,
        alt: "Restoran masasında Kerinti QR menü standı",
      },
    },
    {
      kind: "menu",
      id: "kurumsal",
      label: "Kurumsal",
      match: ["/hakkimizda", "/misyon", "/vizyon", "/surdurulebilirlik", "/marka"],
      links: [
        { label: "Hakkımızda", href: "/hakkimizda", description: "Biz kimiz, ne geliştiriyoruz" },
        { label: "Misyonumuz", href: "/misyon", description: "Ne için çalışıyoruz" },
        { label: "Vizyonumuz", href: "/vizyon", description: "Nereye gidiyoruz" },
        { label: "Sürdürülebilirlik", href: "/surdurulebilirlik", description: "Daha az kâğıt, daha az israf" },
      ],
    },
    { kind: "link", label: "İletişim", href: "/iletisim" },
  ],
  en: [
    { kind: "link", label: "Home", href: "/" },
    {
      kind: "menu",
      id: "programlar",
      label: "Programs",
      match: ["/urun"],
      products: [
        { slug: "nexa", href: "/urun/nexa", description: "Order management: tables, kitchen, till and reports." },
        { slug: "nexus", href: "/urun/nexus", description: "Business management: tasks, approvals, accounts and reports." },
      ],
      links: [{ label: "All programs", href: "/urun", description: "neXa sys and nexus side by side" }],
      feature: {
        title: "See neXa sys up close",
        text: "From the QR menu to the report, every step of an order.",
        href: "/urun/nexa",
        image: "/images/scenes/qr-table-stand-1122x1402.png",
        width: 1122,
        height: 1402,
        alt: "Kerinti QR menu stand on a restaurant table",
      },
    },
    {
      kind: "menu",
      id: "kurumsal",
      label: "Company",
      match: ["/hakkimizda", "/misyon", "/vizyon", "/surdurulebilirlik", "/marka"],
      links: [
        { label: "About us", href: "/hakkimizda", description: "Who we are, what we build" },
        { label: "Our mission", href: "/misyon", description: "What we work for" },
        { label: "Our vision", href: "/vizyon", description: "Where we are heading" },
        { label: "Sustainability", href: "/surdurulebilirlik", description: "Less paper, less waste" },
      ],
    },
    { kind: "link", label: "Contact", href: "/iletisim" },
  ],
};

export const headerNav = (locale: Locale) => HEADER_NAV[locale];

/**
 * Footer groups. Only routes that exist are linked: the reference footer also
 * lists Fiyatlandırma, Kariyer, Blog and Yardım Merkezi, which have no pages
 * or content yet, so they are left out rather than pointed at nothing.
 */
const FOOTER_GROUPS: L<{ title: string; links: NavItem[] }[]> = {
  tr: [
    {
      title: "Programlar",
      links: [
        { label: "neXa sys", href: "/urun/nexa" },
        { label: "nexus", href: "/urun/nexus" },
        { label: "Tüm programlar", href: "/urun" },
      ],
    },
    {
      title: "Kurumsal",
      links: [
        { label: "Hakkımızda", href: "/hakkimizda" },
        { label: "Misyonumuz", href: "/misyon" },
        { label: "Vizyonumuz", href: "/vizyon" },
        { label: "Sürdürülebilirlik", href: "/surdurulebilirlik" },
        { label: "İletişim", href: "/iletisim" },
        { label: "Demo Talebi", href: DEMO_HREF },
        { label: "Bayi Girişi", href: DEALER_LOGIN_HREF },
        { label: "Marka Rehberi", href: "/marka" },
      ],
    },
  ],
  en: [
    {
      title: "Programs",
      links: [
        { label: "neXa sys", href: "/urun/nexa" },
        { label: "nexus", href: "/urun/nexus" },
        { label: "All programs", href: "/urun" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "/hakkimizda" },
        { label: "Our mission", href: "/misyon" },
        { label: "Our vision", href: "/vizyon" },
        { label: "Sustainability", href: "/surdurulebilirlik" },
        { label: "Contact", href: "/iletisim" },
        { label: "Request a demo", href: DEMO_HREF },
        { label: "Dealer login", href: DEALER_LOGIN_HREF },
        { label: "Brand guide", href: "/marka" },
      ],
    },
  ],
};

export const footerGroups = (locale: Locale) => FOOTER_GROUPS[locale];

/** Legal texts, linked from the footer bar and the contact form's consent. */
const LEGAL_LINKS: L<NavItem[]> = {
  tr: [
    { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
    { label: "Çerez Politikası", href: "/cerez-politikasi" },
  ],
  en: [
    { label: "Privacy notice (KVKK)", href: "/kvkk" },
    { label: "Cookie policy", href: "/cerez-politikasi" },
  ],
};

export const legalLinks = (locale: Locale) => LEGAL_LINKS[locale];
