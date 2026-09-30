import type { LucideIcon } from "lucide-react";
import {
  ChartNoAxesColumn,
  Eye,
  GraduationCap,
  Handshake,
  Headset,
  Lightbulb,
  Monitor,
  Search,
  Settings,
  Target,
  UsersRound,
  Wrench,
} from "lucide-react";
import type { L } from "@/lib/i18n";

/**
 * Company and process copy, in Turkish and English.
 *
 * Based on the approved reference mockups (about and contact), rewritten in
 * 2026-09 to cover both programs (neXa sys and nexus) and to drop
 * superlatives. Nothing here states a date, a customer count, an award or
 * any other fact that was not in the references.
 */

export type Step = { title: string; text: string; icon: LucideIcon };

/** How every project runs (about page). */
export const APPROACH: L<Step[]> = {
  tr: [
    { title: "İhtiyacı dinliyoruz", text: "İşletmenizi ve hedeflerinizi dinliyor, ihtiyaçları birlikte belirliyoruz.", icon: Search },
    { title: "Kurguluyoruz", text: "neXa sys ya da nexus'u iş akışınıza göre yapılandırıyoruz.", icon: Settings },
    { title: "Kuruyor ve eğitiyoruz", text: "Sistemi devreye alıyor, ekibinize kullanım eğitimi veriyoruz.", icon: GraduationCap },
    { title: "Destekliyoruz", text: "Kurulumdan sonra da geri bildirimlerinizle sistemi birlikte iyileştiriyoruz.", icon: ChartNoAxesColumn },
  ],
  en: [
    { title: "We listen", text: "We listen to your business and goals, and define the needs together.", icon: Search },
    { title: "We configure", text: "We set neXa sys or nexus up around your workflow.", icon: Settings },
    { title: "We install and train", text: "We put the system into use and train your team on it.", icon: GraduationCap },
    { title: "We support", text: "After setup we keep improving the system with your feedback.", icon: ChartNoAxesColumn },
  ],
};

export type Value = { title: string; text: string; icon: LucideIcon };

/** Mission, vision and two working values (about page). */
export const VALUES: L<Value[]> = {
  tr: [
    { title: "Misyonumuz", text: "İşletmelerin sipariş ve iş süreçlerini sade, pratik yazılımlarla kolaylaştırmak.", icon: Target },
    { title: "Vizyonumuz", text: "İşletmelerin uzun yıllar güvenle kullandığı yazılımları geliştiren bir ekip olmak.", icon: Eye },
    { title: "Müşteri odaklılık", text: "Önce dinliyor, sahanın gerçeklerine uygun çözümler kuruyoruz.", icon: UsersRound },
    { title: "Sürekli gelişim", text: "Ürünlerimizi kullanıcı geri bildirimleriyle düzenli olarak geliştiriyoruz.", icon: ChartNoAxesColumn },
  ],
  en: [
    { title: "Our mission", text: "To make order and business processes easier with simple, practical software.", icon: Target },
    { title: "Our vision", text: "To be the team behind software businesses rely on for years.", icon: Eye },
    { title: "Customer focus", text: "We listen first and build solutions that fit how the work really runs.", icon: UsersRound },
    { title: "Continuous improvement", text: "We improve our products regularly with feedback from their users.", icon: ChartNoAxesColumn },
  ],
};

/** About page "Neden Kerinti?" — plain statements, no superlatives. */
export const REASONS: L<{ title: string; text: string }[]> = {
  tr: [
    { title: "Kurulumdan desteğe tek ekip", text: "Konuştuğunuz ekip, sistemi kuran ve destekleyen ekiptir." },
    { title: "Sahaya yakınlık", text: "Giresun Teknopark'tan kurulum ve yerinde görüşme." },
    { title: "Modüler yapı", text: "İhtiyacınız olan modüllerle başlar, zamanla eklersiniz." },
    { title: "Sade ekranlar", text: "Ekibinizin kısa bir eğitimle kullanabileceği arayüzler." },
  ],
  en: [
    { title: "One team, setup to support", text: "The team you talk to is the team that installs and supports it." },
    { title: "Close to the field", text: "Setup and on-site meetings from Giresun Teknopark." },
    { title: "Modular", text: "Start with the modules you need and add more over time." },
    { title: "Simple screens", text: "Interfaces your team can use after a short training." },
  ],
};

/**
 * Contact form topics. `value` is the form's topic option and the `konu`
 * query parameter, so it stays the same in both languages.
 */
export const CONTACT_TOPICS: L<{ value: string; title: string; text: string; icon: LucideIcon }[]> = {
  tr: [
    { value: "demo", title: "Demo Talebi", text: "neXa sys veya nexus için demo talep etmek istiyorum.", icon: Monitor },
    { value: "satis", title: "Satış Öncesi Bilgi", text: "Ürün, fiyatlandırma ve paketler hakkında bilgi almak istiyorum.", icon: UsersRound },
    { value: "destek", title: "Teknik Destek", text: "Mevcut sistemimle ilgili destek talebinde bulunmak istiyorum.", icon: Headset },
    { value: "is-ortakligi", title: "İş Ortaklığı", text: "Bayilik ve iş birliği fırsatlarını değerlendirmek istiyorum.", icon: Handshake },
    { value: "danismanlik", title: "Ürün Danışmanlığı", text: "İşletmem için uygun çözüm hakkında danışmanlık almak istiyorum.", icon: Wrench },
    { value: "genel", title: "Genel Bilgilendirme", text: "Diğer sorularım için ekibinizle iletişime geçmek istiyorum.", icon: Lightbulb },
  ],
  en: [
    { value: "demo", title: "Demo request", text: "I would like a demo of neXa sys or nexus.", icon: Monitor },
    { value: "satis", title: "Pre-sales information", text: "I would like information on the products, pricing and packages.", icon: UsersRound },
    { value: "destek", title: "Technical support", text: "I need support with my current system.", icon: Headset },
    { value: "is-ortakligi", title: "Partnership", text: "I would like to discuss dealership and partnership options.", icon: Handshake },
    { value: "danismanlik", title: "Product advice", text: "I would like advice on the right solution for my business.", icon: Wrench },
    { value: "genel", title: "General enquiry", text: "I have another question for your team.", icon: Lightbulb },
  ],
};

/**
 * Contact page FAQ, covering both programs. Answers use only facts the site
 * already states (process, sectors and teams, contact channels, the
 * reference's note that face-to-face and online meetings can be booked).
 */
export const FAQS: L<{ question: string; answer: string }[]> = {
  tr: [
    {
      question: "Demo talebinden sonra süreç nasıl ilerliyor?",
      answer: "Talebiniz bize ulaştıktan sonra ekibimiz sizinle iletişime geçer, ihtiyaçlarınızı dinler ve ilgilendiğiniz programı (neXa sys ya da nexus) göstermek için bir görüşme planlar.",
    },
    {
      question: "neXa sys ve nexus hangi işletmeler için uygun?",
      answer: "neXa sys; restoran, kafe, pastane, fast food zinciri, otel ve çok şubeli yeme-içme işletmeleri içindir. nexus ise görev, onay, cari, teklif ve fatura süreçlerini tek yerden yönetmek isteyen, ekipleri büyüyen işletmeler içindir.",
    },
    {
      question: "Teknik destek için nasıl iletişime geçebilirim?",
      answer: "Bizi telefonla arayabilir, e-posta gönderebilir ya da bu sayfadaki formda konu olarak “Teknik Destek”i seçerek talebinizi iletebilirsiniz.",
    },
    {
      question: "Yüz yüze görüşme yapıyor musunuz?",
      answer: "Evet. Yüz yüze veya online görüşme için randevu alabilirsiniz; ofisimiz Giresun Teknopark'tadır.",
    },
  ],
  en: [
    {
      question: "What happens after a demo request?",
      answer: "Once your request reaches us, our team contacts you, listens to your needs and schedules a meeting to show you the program you are interested in (neXa sys or nexus).",
    },
    {
      question: "Which businesses are neXa sys and nexus for?",
      answer: "neXa sys is for restaurants, cafés, patisseries, fast food chains, hotels and multi-branch food and beverage businesses. nexus is for businesses with growing teams that want to manage tasks, approvals, accounts, quotes and invoices in one place.",
    },
    {
      question: "How do I reach technical support?",
      answer: "Call us, send an e-mail, or use the form on this page and choose “Technical support” as the topic.",
    },
    {
      question: "Do you meet in person?",
      answer: "Yes. You can book a face-to-face or online meeting; our office is at Giresun Teknopark.",
    },
  ],
};
