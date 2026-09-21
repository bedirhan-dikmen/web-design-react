/**
 * Customer feedback and brand references.
 *
 * DEMO CONTENT — NOT REAL CUSTOMERS.
 *
 * The homepage reference shows named customers with photos and named
 * businesses, and a row of well-known restaurant brand logos. None of those are
 * verified: the reference is an AI-rendered mockup and the project holds no
 * testimonials, customer consent or logo files. Presenting them as real would
 * be a false customer claim, and using the brand marks would be trademark use
 * without permission.
 *
 * So:
 *   - testimonials are generic, anonymous and flagged `demo: true`; the UI
 *     labels every demo card as an example. Replace with real, consented
 *     quotes and set `demo: false`.
 *   - `BRANDS` is empty. The brand strip renders nothing in production while
 *     it is empty. Add entries only with logo files the customer has approved.
 */

export type Testimonial = {
  quote: string;
  /** Role and business type only — never a real person's name while demo. */
  author: string;
  context: string;
  demo: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Sipariş yönetimimiz çok daha hızlı ve düzenli hale geldi; salon ile mutfak arasındaki kopukluk ortadan kalktı.",
    author: "İşletme Sahibi",
    context: "Restoran",
    demo: true,
  },
  {
    quote:
      "QR menü ve mutfak ekranıyla yoğun saatlerdeki iş yükümüz belirgin şekilde azaldı.",
    author: "Operasyon Müdürü",
    context: "Kafe",
    demo: true,
  },
  {
    quote:
      "Birden fazla şubemizi tek ekrandan izleyebilmek günlük yönetimi büyük ölçüde kolaylaştırdı.",
    author: "Genel Müdür",
    context: "Yeme-İçme Grubu",
    demo: true,
  },
];

export type Brand = { name: string; logo: string; width: number; height: number };

/** Approved customer logos. Empty until real, permitted assets are supplied. */
export const BRANDS: Brand[] = [];
