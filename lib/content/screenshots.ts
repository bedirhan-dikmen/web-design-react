/**
 * Real neXa screenshots, framed.
 *
 * Every entry here is a flat capture from /static_design, published under
 * /public/images/product. `maxCss` is the safe rendered width at 2x density
 * (docs/VISUAL_ASSET_ARCHITECTURE.md): the frame never grows past it, so UI
 * text stays sharp on high-DPR screens. Layouts may render smaller, never
 * larger.
 */
export const SCREENSHOTS = {
  dashboard: {
    src: "/images/product/nexa-dashboard-1442x1091.png",
    width: 1442,
    height: 1091,
    maxCss: 721,
    alt: {
      tr: "neXa yönetim paneli: günlük satış, sipariş sayısı, satış grafiği ve sipariş dağılımı",
      en: "neXa management panel: daily sales, order count, sales chart and order split",
    },
  },
  pos: {
    src: "/images/product/nexa-pos-1448x1086.png",
    width: 1448,
    height: 1086,
    maxCss: 724,
    alt: {
      tr: "neXa kasa ekranı: kategori ve ürün seçimi ile masa sipariş listesi",
      en: "neXa till screen: category and item selection with the table order list",
    },
  },
  kitchen: {
    src: "/images/product/nexa-kitchen-1672x941.png",
    width: 1672,
    height: 941,
    maxCss: 836,
    alt: {
      tr: "neXa mutfak ekranı: Hazırlanıyor, Pişiyor ve Hazır sütunlarında siparişler",
      en: "neXa kitchen display: orders in the Preparing, Cooking and Ready columns",
    },
  },
  mobile: {
    src: "/images/product/nexa-mobile-941x1672.png",
    width: 941,
    height: 1672,
    maxCss: 470,
    alt: {
      tr: "neXa QR menü: kategoriler ve sepete eklenebilen ürünler",
      en: "neXa QR menu: categories and items that can be added to the basket",
    },
  },
} as const;

export type ScreenshotKey = keyof typeof SCREENSHOTS;
