import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ChefHat,
  Ear,
  FileText,
  GitBranch,
  Handshake,
  Layers,
  MapPin,
  QrCode,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { L, Locale } from "@/lib/i18n";
import { VALUES } from "./company";

/**
 * Kurumsal pages: Misyonumuz, Vizyonumuz, Sürdürülebilirlik, in Turkish and
 * English.
 *
 * Kept short on purpose (owner request, 2026-09: "laf gereksiz"): a title,
 * one statement and three pillars. The statements are the VALUES copy
 * (company.ts); the pillars restate what the site already says about how
 * the team works. The earlier "steps" and "journey" sections are gone.
 *
 * TODO(content): the sustainability page has no approved source copy. It
 * only describes effects of features the programs already list (kitchen
 * display, QR menu, e-invoice, stock, nexus approvals) and the team's local
 * presence. It states no target, figure or certification. Have the site
 * owner confirm the wording before launch.
 */

export type Pillar = { title: string; text: string; icon: LucideIcon };

export type CorporatePage = {
  href: string;
  /** Menu label. */
  label: string;
  eyebrow: string;
  /** [before, accent (red)]. */
  title: [string, string];
  lead: string;
  statement: string;
  pillarsTitle: string;
  pillars: Pillar[];
};

const value = (locale: Locale, i: number) => VALUES[locale][i].text;

export const MISSION: L<CorporatePage> = {
  tr: {
    href: "/misyon",
    label: "Misyonumuz",
    eyebrow: "Kurumsal / Misyonumuz",
    title: ["İşletmelerin işini", "kolaylaştırmak."],
    lead: "Ne için çalışıyoruz.",
    statement: value("tr", 0),
    pillarsTitle: "Nasıl yapıyoruz?",
    pillars: [
      { title: "Dinlemek", text: "Doğru çözüm, ihtiyaçları birlikte belirlemekle başlar.", icon: Ear },
      { title: "Sadeleştirmek", text: "Süreci, ekibin kısa bir eğitimle kullanabileceği ekranlara çeviriyoruz.", icon: Layers },
      { title: "Yanınızda kalmak", text: "Kurulumdan sonra da destek veriyor, sistemi birlikte iyileştiriyoruz.", icon: Handshake },
    ],
  },
  en: {
    href: "/misyon",
    label: "Our mission",
    eyebrow: "Company / Our mission",
    title: ["Making business work", "easier."],
    lead: "What we work for.",
    statement: value("en", 0),
    pillarsTitle: "How we do it",
    pillars: [
      { title: "Listening", text: "The right solution starts with defining the needs together.", icon: Ear },
      { title: "Simplifying", text: "We turn the process into screens a team can use after a short training.", icon: Layers },
      { title: "Staying with you", text: "We keep supporting you after setup and improve the system together.", icon: Handshake },
    ],
  },
};

export const VISION: L<CorporatePage> = {
  tr: {
    href: "/vizyon",
    label: "Vizyonumuz",
    eyebrow: "Kurumsal / Vizyonumuz",
    title: ["Yıllarca güvenle", "kullanılan yazılımlar."],
    lead: "Nereye gidiyoruz.",
    statement: value("tr", 1),
    pillarsTitle: "Neye önem veriyoruz?",
    pillars: [
      { title: "Güven", text: "Sahaya yakın, uzun vadeli bir iş ortağı olmak.", icon: ShieldCheck },
      { title: "Sadelik", text: "Pratik ve kullanımı kolay yazılımlar geliştirmek.", icon: Sparkles },
      { title: "Sürekli gelişim", text: value("tr", 3), icon: Rocket },
    ],
  },
  en: {
    href: "/vizyon",
    label: "Our vision",
    eyebrow: "Company / Our vision",
    title: ["Software people rely on", "for years."],
    lead: "Where we are heading.",
    statement: value("en", 1),
    pillarsTitle: "What matters to us",
    pillars: [
      { title: "Trust", text: "To be a long-term partner that stays close to the field.", icon: ShieldCheck },
      { title: "Simplicity", text: "To build practical software that is easy to use.", icon: Sparkles },
      { title: "Continuous improvement", text: value("en", 3), icon: Rocket },
    ],
  },
};

export const SUSTAINABILITY: L<CorporatePage> = {
  tr: {
    href: "/surdurulebilirlik",
    label: "Sürdürülebilirlik",
    eyebrow: "Kurumsal / Sürdürülebilirlik",
    title: ["Daha az kâğıt,", "daha az israf."],
    lead: "Yazılımlarımızın günlük kullanımının doğal sonucu.",
    statement: "Kâğıdı, israfı ve gereksiz tekrarı azaltan ekranlar; uzun vadeli, yerinde destek.",
    pillarsTitle: "Günlük işin içinden",
    pillars: [
      { title: "Kâğıtsız mutfak", text: "neXa sys'te siparişler mutfak ekranına düşer; hazırlık kâğıt fiş yerine ekranda ilerler.", icon: ChefHat },
      { title: "Basılı menü yerine QR", text: "Misafir menüyü masadaki QR kodla telefonundan açar.", icon: QrCode },
      { title: "Dijital fatura", text: "E-fatura ve e-arşiv ile faturalar kâğıda dökülmeden kesilir.", icon: FileText },
      { title: "Kâğıtsız onay", text: "nexus'ta talepler ve onaylar çıktı almadan, tanımlı adımlarla ilerler.", icon: GitBranch },
      { title: "Stokta daha az fire", text: "Satışla düşen ve azaldığında uyaran stok, malzemenin zamanında yönetilmesine yardım eder.", icon: Boxes },
      { title: "Yerel ekip", text: "Giresun Teknopark'taki ekibimizle kurulumdan desteğe tek muhatap oluyoruz.", icon: MapPin },
    ],
  },
  en: {
    href: "/surdurulebilirlik",
    label: "Sustainability",
    eyebrow: "Company / Sustainability",
    title: ["Less paper,", "less waste."],
    lead: "A natural result of using our software every day.",
    statement: "Screens that cut paper, waste and needless repetition; long-term, local support.",
    pillarsTitle: "From everyday work",
    pillars: [
      { title: "Paperless kitchen", text: "In neXa sys orders land on the kitchen display; preparation runs on screen instead of paper tickets.", icon: ChefHat },
      { title: "QR instead of printed menus", text: "Guests open the menu on their phone from the QR code on the table.", icon: QrCode },
      { title: "Digital invoices", text: "E-invoices and e-archive invoices are issued without printing.", icon: FileText },
      { title: "Paperless approvals", text: "In nexus, requests and approvals move through defined steps without printouts.", icon: GitBranch },
      { title: "Less stock waste", text: "Stock that drops with sales and warns when low helps use ingredients on time.", icon: Boxes },
      { title: "Local team", text: "Our team at Giresun Teknopark is your single contact from setup to support.", icon: MapPin },
    ],
  },
};

export const CORPORATE_PAGES: L<CorporatePage[]> = {
  tr: [MISSION.tr, VISION.tr, SUSTAINABILITY.tr],
  en: [MISSION.en, VISION.en, SUSTAINABILITY.en],
};
