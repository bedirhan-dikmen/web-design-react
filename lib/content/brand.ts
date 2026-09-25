/**
 * Copy and swatches for the /marka (brand guidelines) page.
 *
 * Hex values mirror the --k-* variables in app/globals.css; if a token
 * changes there, change it here too. Contrast figures are measured against
 * white (WCAG 2.x relative luminance).
 */

export type Swatch = { name: string; token: string; hex: string; note: string };

export const SWATCH_GROUPS: { title: string; lead: string; swatches: Swatch[] }[] = [
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
    lead: "Kerinti kırmızısının ürünü: enerji ve hız. Sembol kırmızı tonlarından oluşur.",
    swatches: [
      { name: "neXa Kırmızı", token: "nexa", hex: "#D80017", note: "Metin ve ikon, 5.3:1" },
      { name: "neXa Koyu", token: "nexa-strong", hex: "#B00013", note: "Üzerine gelme" },
      { name: "neXa Işıltı", token: "nexa-glow", hex: "#FF3A4A", note: "Yalnızca dekoratif" },
      { name: "neXa Açık", token: "nexa-soft", hex: "#FDECEE", note: "Kart ve rozet zemini" },
    ],
  },
  {
    title: "nexus",
    lead: "Grafit ürün: sakin, kurumsal ve dengeli. Sembol siyah ve gri tonlarından oluşur.",
    swatches: [
      { name: "nexus Grafit", token: "nexus", hex: "#16161A", note: "Metin ve ikon, 18:1" },
      { name: "nexus Koyu Gri", token: "nexus-fill-strong", hex: "#2E2E36", note: "Üzerine gelme" },
      { name: "nexus Gri", token: "nexus-glow", hex: "#6B6B76", note: "İkincil öğeler, 5.3:1" },
      { name: "nexus Açık", token: "nexus-soft", hex: "#EEEEF1", note: "Kart ve rozet zemini" },
    ],
  },
];

export const LOGO_RULES = {
  do: [
    "Ürün adlarını her zaman “neXa” ve “nexus” biçiminde yazın.",
    "Logonun çevresinde en az sembol yüksekliğinin yarısı kadar boşluk bırakın.",
    "Koyu zeminlerde “koyu zemin” varyantını, tek renk baskıda “tek renk” varyantını kullanın.",
    "Sembolü 16 px altında kullanmayın; daha küçük alanlarda yalnızca sembol varyantını seçin.",
  ],
  dont: [
    "Logoyu esnetmeyin, döndürmeyin veya gölge eklemeyin.",
    "neXa kırmızı, nexus grafittir; ürün renklerini birbirinin yerine kullanmayın.",
    "Palette mavi, yeşil veya başka bir renk eklemeyin: yalnızca siyah, beyaz, gri tonları ve Kerinti kırmızısı.",
    "Logoyu fotoğraf üzerine, kontrastı düşük bir alana yerleştirmeyin.",
  ],
};
