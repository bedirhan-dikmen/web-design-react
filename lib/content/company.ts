import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ChartNoAxesColumn,
  Eye,
  GraduationCap,
  Handshake,
  Headset,
  Lightbulb,
  Monitor,
  Play,
  Rocket,
  Search,
  Settings,
  Target,
  UsersRound,
  Wrench,
} from "lucide-react";

/**
 * Company and process copy, transcribed from the approved reference mockups
 * (homepage, about and contact). Nothing here states a date, a customer
 * count, an award or any other fact that was not in the references.
 */

export type Step = { title: string; text: string; icon: LucideIcon };

/** Homepage "Nasıl Çalışır?". */
export const HOW_IT_WORKS: Step[] = [
  {
    title: "Keşfedin",
    text: "İhtiyaçlarınızı birlikte analiz edelim, size en uygun çözümü planlayalım.",
    icon: Search,
  },
  {
    title: "Kurulum",
    text: "Hızlı ve sorunsuz kurulumla sisteminizi hazır hale getirelim.",
    icon: Settings,
  },
  {
    title: "Kullanın",
    text: "Ekibinize kısa bir eğitimle hemen kullanmaya başlayın.",
    icon: Play,
  },
  {
    title: "Büyüyün",
    text: "Verimliliğinizi artırın, misafir memnuniyetinizi ve kârlılığınızı yükseltin.",
    icon: ChartNoAxesColumn,
  },
];

/** About page "Çalışma Yaklaşımımız". */
export const APPROACH: Step[] = [
  {
    title: "İhtiyacı Analiz Ediyoruz",
    text: "İşletmenizi ve hedeflerinizi dinliyor, doğru çözüm için ihtiyaçları birlikte belirliyoruz.",
    icon: Search,
  },
  {
    title: "Süreçleri Tasarlıyoruz",
    text: "İş akışınıza en uygun yapıyı planlıyor, NeXa'yı size özel şekilde kurguluyoruz.",
    icon: Settings,
  },
  {
    title: "Kuruyor ve Eğitiyoruz",
    text: "Sistemi hızlıca devreye alıyor, ekibinize kapsamlı eğitimler veriyoruz.",
    icon: GraduationCap,
  },
  {
    title: "Sürekli Geliştiriyoruz",
    text: "Kullanıcı geri bildirimleriyle sistemi birlikte iyileştiriyor, her zaman yanınızda oluyoruz.",
    icon: ChartNoAxesColumn,
  },
];

/** About page "Yolculuğumuz" — a story in four stages, deliberately undated. */
export const JOURNEY: Step[] = [
  { title: "Fikir", text: "Sektörün gerçek ihtiyaçlarından yola çıktık.", icon: Lightbulb },
  { title: "Ürünleşme", text: "NeXa'yı geliştirerek sahaya sunduk.", icon: Boxes },
  {
    title: "Saha Deneyimi",
    text: "Farklı işletmelerle çalışarak ürünümüzü olgunlaştırdık.",
    icon: UsersRound,
  },
  {
    title: "Sürekli İyileştirme",
    text: "Bugün de yarın da daha iyi çözümler için çalışıyoruz.",
    icon: Rocket,
  },
];

export type Value = { title: string; text: string; icon: LucideIcon };

export const VALUES: Value[] = [
  {
    title: "Misyonumuz",
    text: "Restoran ve yeme-içme sektörünün dijital dönüşümünü kolaylaştıran, pratik ve etkili çözümlerle işletmelerin başarısına katkı sağlamak.",
    icon: Target,
  },
  {
    title: "Vizyonumuz",
    text: "Türkiye'nin ve bölgenin restoran yazılımları alanında en çok tercih edilen, en güvenilen teknoloji markası olmak.",
    icon: Eye,
  },
  {
    title: "Müşteri Odaklılık",
    text: "Müşterilerimizin ihtiyaçlarını dinleyen, saha gerçeklerine uygun, hızlı ve kalıcı çözümler üretiyoruz.",
    icon: UsersRound,
  },
  {
    title: "Sürekli Gelişim",
    text: "Teknolojiyi, sektörü ve kullanıcı deneyimini sürekli takip ediyor, ürünümüzü ve hizmetlerimizi durmadan geliştiriyoruz.",
    icon: ChartNoAxesColumn,
  },
];

/** About page "Neden Kerinti?". */
export const REASONS: { title: string; text: string }[] = [
  {
    title: "Restoran operasyonlarına odaklı uzmanlık",
    text: "Sektörü bilen, sahayı tanıyan bir ekip.",
  },
  { title: "Tek platform yaklaşımı", text: "Tüm operasyonlar tek ekosistemde." },
  { title: "Sahaya yakın çözüm geliştirme", text: "Gerçek ihtiyaçlara, gerçek çözümler." },
  { title: "Kolay kullanım", text: "Hızlı öğrenilen, pratik arayüzler." },
  { title: "Esnek yapı", text: "Her ölçek ve konsepte uygun." },
  { title: "Uzun vadeli destek", text: "Kurulumdan sonra da daima yanınızda." },
];

/**
 * Contact page "Size Nasıl Yardımcı Olabiliriz?". `value` is the form's topic
 * option; each card links to the form with that topic preselected.
 */
export const CONTACT_TOPICS: {
  value: string;
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    value: "demo",
    title: "Demo Talebi",
    text: "NeXa'yı yakından tanımak ve demo talep etmek istiyorum.",
    icon: Monitor,
  },
  {
    value: "satis",
    title: "Satış Öncesi Bilgi",
    text: "Ürün, fiyatlandırma ve paketler hakkında bilgi almak istiyorum.",
    icon: UsersRound,
  },
  {
    value: "destek",
    title: "Teknik Destek",
    text: "Mevcut sistemimle ilgili destek talebinde bulunmak istiyorum.",
    icon: Headset,
  },
  {
    value: "is-ortakligi",
    title: "İş Ortaklığı",
    text: "Bayilik ve iş birliği fırsatlarını değerlendirmek istiyorum.",
    icon: Handshake,
  },
  {
    value: "danismanlik",
    title: "Ürün Danışmanlığı",
    text: "İşletmem için en uygun çözüm hakkında danışmanlık almak istiyorum.",
    icon: Wrench,
  },
  {
    value: "genel",
    title: "Genel Bilgilendirme",
    text: "Diğer sorularım için ekibinizle iletişime geçmek istiyorum.",
    icon: Lightbulb,
  },
];

/**
 * Contact page FAQ. The questions are from the reference; the answers are
 * written only from facts the site already states elsewhere (the process
 * steps, the sector list, the contact channels and the reference's note that
 * face-to-face and online meetings can be booked).
 */
export const FAQS: { question: string; answer: string }[] = [
  {
    question: "Demo talebi sonrası süreç nasıl ilerliyor?",
    answer:
      "Talebiniz bize ulaştıktan sonra ekibimiz sizinle iletişime geçer, işletmenizin ihtiyaçlarını dinler ve NeXa'yı size göstermek için uygun bir görüşme zamanı planlar.",
  },
  {
    question: "NeXa hangi işletmeler için uygundur?",
    answer:
      "NeXa; restoranlar, kafeler, pastaneler, fast food zincirleri, oteller ve birden fazla şubesi olan yeme-içme grupları için tasarlandı. Modüler yapısı sayesinde işletmenizin ihtiyacı olan modüllerle başlayabilirsiniz.",
  },
  {
    question: "Teknik destek için nasıl iletişime geçebilirim?",
    answer:
      "Bizi telefonla arayabilir, e-posta gönderebilir ya da bu sayfadaki formda konu olarak “Teknik Destek”i seçerek talebinizi iletebilirsiniz.",
  },
  {
    question: "Yerinde görüşme yapıyor musunuz?",
    answer:
      "Evet. Yüz yüze veya online toplantı için randevu alabilirsiniz; sizi ofisimizde ağırlamaktan memnuniyet duyarız.",
  },
];
