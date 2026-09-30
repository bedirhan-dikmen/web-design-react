import type { L } from "@/lib/i18n";

/**
 * Copy and swatches for the /marka (brand guidelines) page, in Turkish and
 * English.
 *
 * Hex values mirror the --k-* variables in app/globals.css; if a token
 * changes there, change it here too. Contrast figures are measured against
 * white (WCAG 2.x relative luminance).
 */

export type Swatch = { name: string; token: string; hex: string; note: string };

export const SWATCH_GROUPS: L<{ title: string; lead: string; swatches: Swatch[] }[]> = {
  tr: [
    {
      title: "Kerinti temel renkleri",
      lead: "Kurumsal kimliğin taşıyıcısı. Kırmızı yalnızca vurgu ve birincil eylemler içindir.",
      swatches: [
        { name: "Kerinti Kırmızı", token: "red", hex: "#D80017", note: "Beyaz üzerinde 5.3:1" },
        { name: "Kırmızı Koyu", token: "red-strong", hex: "#B00013", note: "Üzerine gelme durumu" },
        { name: "Gece", token: "night", hex: "#111116", note: "Koyu bantlar ve altbilgi" },
        { name: "Mürekkep", token: "ink", hex: "#16161A", note: "Başlık ve gövde, 18:1" },
        { name: "Mürekkep 2", token: "ink-2", hex: "#4A4A55", note: "İkincil metin, 8.7:1" },
        { name: "Mürekkep 3", token: "ink-3", hex: "#6B6B76", note: "Yardımcı metin, 5.3:1" },
        { name: "Zemin 2", token: "surface-2", hex: "#F6F6F8", note: "Bölüm zemini" },
        { name: "Çizgi", token: "line", hex: "#E7E7EC", note: "Kenarlık ve ayraç" },
      ],
    },
    {
      title: "neXa sys",
      lead: "Kerinti kırmızısının programı.",
      swatches: [
        { name: "neXa Kırmızı", token: "nexa", hex: "#D80017", note: "Metin ve ikon, 5.3:1" },
        { name: "neXa Koyu", token: "nexa-strong", hex: "#B00013", note: "Üzerine gelme" },
        { name: "neXa Işıltı", token: "nexa-glow", hex: "#FF3A4A", note: "Yalnızca dekoratif" },
        { name: "neXa Açık", token: "nexa-soft", hex: "#FDECEE", note: "Kart ve rozet zemini" },
      ],
    },
    {
      title: "nexus",
      lead: "Grafit program: sakin ve kurumsal.",
      swatches: [
        { name: "nexus Grafit", token: "nexus", hex: "#16161A", note: "Metin ve ikon, 18:1" },
        { name: "nexus Koyu Gri", token: "nexus-fill-strong", hex: "#2E2E36", note: "Üzerine gelme" },
        { name: "nexus Gri", token: "nexus-glow", hex: "#6B6B76", note: "İkincil öğeler, 5.3:1" },
        { name: "nexus Açık", token: "nexus-soft", hex: "#EEEEF1", note: "Kart ve rozet zemini" },
      ],
    },
  ],
  en: [
    {
      title: "Kerinti core colours",
      lead: "The carriers of the corporate identity. Red is for emphasis and primary actions only.",
      swatches: [
        { name: "Kerinti Red", token: "red", hex: "#D80017", note: "5.3:1 on white" },
        { name: "Dark Red", token: "red-strong", hex: "#B00013", note: "Hover state" },
        { name: "Night", token: "night", hex: "#111116", note: "Dark bands and footer" },
        { name: "Ink", token: "ink", hex: "#16161A", note: "Headings and body, 18:1" },
        { name: "Ink 2", token: "ink-2", hex: "#4A4A55", note: "Secondary text, 8.7:1" },
        { name: "Ink 3", token: "ink-3", hex: "#6B6B76", note: "Supporting text, 5.3:1" },
        { name: "Surface 2", token: "surface-2", hex: "#F6F6F8", note: "Section background" },
        { name: "Line", token: "line", hex: "#E7E7EC", note: "Borders and dividers" },
      ],
    },
    {
      title: "neXa sys",
      lead: "The Kerinti-red program.",
      swatches: [
        { name: "neXa Red", token: "nexa", hex: "#D80017", note: "Text and icons, 5.3:1" },
        { name: "neXa Dark", token: "nexa-strong", hex: "#B00013", note: "Hover" },
        { name: "neXa Glow", token: "nexa-glow", hex: "#FF3A4A", note: "Decorative only" },
        { name: "neXa Light", token: "nexa-soft", hex: "#FDECEE", note: "Card and badge background" },
      ],
    },
    {
      title: "nexus",
      lead: "The graphite program: calm and corporate.",
      swatches: [
        { name: "nexus Graphite", token: "nexus", hex: "#16161A", note: "Text and icons, 18:1" },
        { name: "nexus Dark Grey", token: "nexus-fill-strong", hex: "#2E2E36", note: "Hover" },
        { name: "nexus Grey", token: "nexus-glow", hex: "#6B6B76", note: "Secondary elements, 5.3:1" },
        { name: "nexus Light", token: "nexus-soft", hex: "#EEEEF1", note: "Card and badge background" },
      ],
    },
  ],
};

export const LOGO_RULES: L<{ do: string[]; dont: string[] }> = {
  tr: {
    do: [
      "Program adlarını her zaman “neXa sys” ve “nexus” biçiminde yazın.",
      "Logonun çevresinde en az logo yüksekliğinin yarısı kadar boşluk bırakın.",
      "Açık zeminde açık zemin, koyu zeminde koyu zemin sürümünü kullanın.",
      "Logoyu okunaklı kalacak boyutta kullanın; alt yazı seçilmiyorsa daha büyük gösterin.",
    ],
    dont: [
      "Logoyu esnetmeyin, döndürmeyin veya gölge eklemeyin.",
      "neXa kırmızı, nexus grafittir; program renklerini birbirinin yerine kullanmayın.",
      "Palete mavi, yeşil veya başka bir renk eklemeyin: yalnızca siyah, beyaz, gri tonları ve Kerinti kırmızısı.",
      "Logoyu fotoğraf üzerine, kontrastı düşük bir alana yerleştirmeyin.",
    ],
  },
  en: {
    do: [
      "Always write the program names as “neXa sys” and “nexus”.",
      "Leave clear space around the logo of at least half its height.",
      "Use the light-ground version on light backgrounds and the dark-ground version on dark ones.",
      "Use the logo at a size where it stays legible; show it larger if the tagline cannot be read.",
    ],
    dont: [
      "Do not stretch, rotate or add shadows to the logo.",
      "neXa is red, nexus is graphite; do not swap the program colours.",
      "Do not add blue, green or any other colour: only black, white, greys and Kerinti red.",
      "Do not place the logo over photos or low-contrast areas.",
    ],
  },
};
