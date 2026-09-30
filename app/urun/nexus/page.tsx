import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChartColumn, ClipboardList, GitBranch, SquareKanban } from "lucide-react";
import { EditorialHero } from "@/components/layout/editorial-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { FeatureGrid } from "@/components/sections/product-sections";
import { Steps } from "@/components/sections/steps";
import { NexusWorkspaceBoard } from "@/components/stages/nexus-workspace-board";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { ProductLogo } from "@/components/ui/product-logo";
import type { Step } from "@/lib/content/company";
import { PRODUCTS } from "@/lib/content/products";
import type { L } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { CONTACT_FORM_HREF, DEMO_HREF } from "@/lib/site";

/**
 * nexus program page — same skeleton as neXa sys: editorial hero with a live
 * stage → how work flows → features → the sister program → call to action.
 * Each flow step restates a feature from lib/content/products.ts (görev,
 * onay, rapor); nothing new is claimed.
 */

type Copy = {
  metaTitle: string;
  aria: string;
  eyebrow: string;
  headline: [string, string, string];
  description: [string, string];
  primary: string;
  secondary: string;
  asideLead: string;
  stageLabel: string;
  caption: [string, string];
  stageDescription: string;
  linksLabel: string;
  links: [string, string, string];
  footer: { left: string; scroll: string; right: string };
  flowEyebrow: string;
  flowTitle: [string, string];
  flowLead: string;
  flow: Step[];
  featuresEyebrow: string;
  featuresTitle: [string, string];
  sisterLabel: string;
  sisterTitle: [string, string];
};

const T: L<Copy> = {
  tr: {
    metaTitle: "nexus — İş Yönetim Sistemi",
    aria: "nexus iş yönetim sistemi",
    eyebrow: "KERİNTİ / NEXUS",
    headline: ["Tüm süreçleriniz,", "tek", "ekranda."],
    description: ["Görev, onay ve rapor.", "Hepsi tek noktada."],
    primary: "Demo talep edin",
    secondary: "Bize ulaşın",
    asideLead: "Sipariş tarafı için neXa sys.",
    stageLabel: "NEXUS / GÖREV PANOSU",
    caption: ["İşin tamamı,", "tek kayıtta."],
    stageDescription: "nexus görev panosu: açık görevler, bekleyen onaylar ve aylık tahsilat özeti.",
    linksLabel: "Sayfa bölümleri",
    links: ["İş akışı", "Özellikler", "İletişim"],
    footer: { left: "KERİNTİ YAZILIM / NEXUS", scroll: "İşin akışını inceleyin", right: "TALEPTEN RAPORA." },
    flowEyebrow: "İş akışı",
    flowTitle: ["Talepten rapora,", "tek akış."],
    flowLead: "Bir iş nexus'ta kayda girer, sorumlusuna atanır, onaydan geçer ve rapora yansır.",
    flow: [
      { title: "Talep", text: "İş bir talep ya da görev olarak kayda girer.", icon: ClipboardList },
      { title: "Görev", text: "Sorumluya atanır, panodan izlenir.", icon: SquareKanban },
      { title: "Onay", text: "Tanımlı adımlarla onaydan geçer.", icon: GitBranch },
      { title: "Rapor", text: "Sonuç yönetim panelinde görünür.", icon: ChartColumn },
    ],
    featuresEyebrow: "Özellikler",
    featuresTitle: ["İşletmenin bütünü,", "tek kayıtta."],
    sisterLabel: "Kardeş program: neXa sys",
    sisterTitle: ["Siparişleriniz için", "neXa sys."],
  },
  en: {
    metaTitle: "nexus — Business Management System",
    aria: "nexus business management system",
    eyebrow: "KERINTI / NEXUS",
    headline: ["All your processes", "on one", "screen."],
    description: ["Tasks, approvals and reports.", "All in one place."],
    primary: "Request a demo",
    secondary: "Contact us",
    asideLead: "For orders, there is neXa sys.",
    stageLabel: "NEXUS / TASK BOARD",
    caption: ["The whole job,", "on one record."],
    stageDescription: "nexus task board: open tasks, pending approvals and a monthly collections summary.",
    linksLabel: "Page sections",
    links: ["Workflow", "Features", "Contact"],
    footer: { left: "KERINTI SOFTWARE / NEXUS", scroll: "See how work flows", right: "FROM REQUEST TO REPORT." },
    flowEyebrow: "Workflow",
    flowTitle: ["From request to report,", "one flow."],
    flowLead: "In nexus a piece of work is recorded, assigned to an owner, approved and shows up in the reports.",
    flow: [
      { title: "Request", text: "The work is recorded as a request or a task.", icon: ClipboardList },
      { title: "Task", text: "It is assigned to an owner and followed on the board.", icon: SquareKanban },
      { title: "Approval", text: "It goes through approval in defined steps.", icon: GitBranch },
      { title: "Report", text: "The result shows on the management panel.", icon: ChartColumn },
    ],
    featuresEyebrow: "Features",
    featuresTitle: ["The whole business,", "on one record."],
    sisterLabel: "Sister program: neXa sys",
    sisterTitle: ["For your orders,", "neXa sys."],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: T[locale].metaTitle, description: PRODUCTS[locale].nexus.lead };
}

export default async function NexusPage() {
  const locale = await getLocale();
  const t = T[locale];
  const nexa = PRODUCTS[locale].nexa;

  return (
    <>
      <EditorialHero
        ariaLabel={t.aria}
        eyebrow={t.eyebrow}
        headline={
          <>
            {t.headline[0]}
            <br />
            {t.headline[1]} <em>{t.headline[2]}</em>
          </>
        }
        description={
          <>
            {t.description[0]}
            <br />
            {t.description[1]}
          </>
        }
        primary={{ label: t.primary, href: DEMO_HREF }}
        secondary={{ label: t.secondary, href: CONTACT_FORM_HREF }}
        aside={{ lead: t.asideLead, label: nexa.cta, href: "/urun/nexa" }}
        stageLabel={t.stageLabel}
        stage={<NexusWorkspaceBoard locale={locale} />}
        caption={
          <>
            {t.caption[0]} <em>{t.caption[1]}</em>
          </>
        }
        stageDescription={t.stageDescription}
        linksLabel={t.linksLabel}
        links={[
          { label: t.links[0], href: "#nexus-akis" },
          { label: t.links[1], href: "#nexus-ozellik" },
          { label: t.links[2], href: "/iletisim" },
        ]}
        footer={{ left: t.footer.left, scrollHref: "#nexus-akis", scrollLabel: t.footer.scroll, right: t.footer.right }}
      />

      <Section labelledBy="nexus-akis" id="nexus-akis-bolum">
        <SectionHeader
          id="nexus-akis"
          eyebrow={t.flowEyebrow}
          title={
            <>
              {t.flowTitle[0]} <em>{t.flowTitle[1]}</em>
            </>
          }
          lead={t.flowLead}
        />
        <div data-reveal className="mt-10 rounded-[var(--radius-lg)] border border-line p-6 sm:p-8">
          <Steps steps={t.flow} />
        </div>
      </Section>

      <Section labelledBy="nexus-ozellik" tone="tint">
        <SectionHeader
          id="nexus-ozellik"
          eyebrow={t.featuresEyebrow}
          title={
            <>
              {t.featuresTitle[0]} <em>{t.featuresTitle[1]}</em>
            </>
          }
        />
        <div className="mt-10">
          <FeatureGrid slug="nexus" />
        </div>
      </Section>

      <Section label={t.sisterLabel} size="sm">
        <Link
          href="/urun/nexa"
          data-reveal
          data-spotlight
          className="group flex flex-col gap-6 rounded-[var(--radius-lg)] border border-line bg-surface-2 p-8 transition-colors hover:border-line-2 sm:flex-row sm:items-center sm:justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <div>
            <ProductLogo product="nexa" height={36} />
            <p className="k-accent mt-4 text-[clamp(1.375rem,2.2vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
              {t.sisterTitle[0]} <em>{t.sisterTitle[1]}</em>
            </p>
            <p className="mt-2 text-ink-2">{nexa.lead}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-nexa-fill px-4 py-2.5 text-sm font-semibold text-white group-hover:bg-nexa-fill-strong">
            {nexa.cta}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </Section>

      <CtaBand />
    </>
  );
}
