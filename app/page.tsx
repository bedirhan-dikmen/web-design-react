import { HomeHero } from "@/components/home/home-hero";
import { ProductShowcase } from "@/components/home/product-showcase";
import { SectorShowcase } from "@/components/home/sector-showcase";
import { XStarfield } from "@/components/home/x-starfield";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { DifferenceBlock } from "@/components/sections/product-sections";
import { ArrowLink, Container, Section, SectionHeader } from "@/components/ui/primitives";
import { HOME_FAQS } from "@/lib/content/journey";
import type { L } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

/**
 * Homepage. The story runs top to bottom:
 *
 *   hero (¾ screen) → how we work → "Programlarımız" → neXa and nexus
 *   (mirrored, one screen together) → solutions → questions → call to action.
 *
 * x marks (XStarfield, one canvas under the content): a field in the hero
 * and, sparser, in "Yaklaşımımız" ([data-starfield]); around neXa and nexus
 * only the marks streaming out of each big brand X.
 */

const T: L<{ programs: string; programsLead: string; faqEyebrow: string; faqTitle: [string, string]; faqLead: string; faqLink: string }> = {
  tr: {
    programs: "Programlarımız",
    programsLead: "Farklı ihtiyaçlara, aynı kalite anlayışıyla. İşinizi büyüten iki çözüm.",
    faqEyebrow: "Sık sorulanlar",
    faqTitle: ["Aklınıza", "takılanlar."],
    faqLead: "Bulamadığınız bir soru varsa ekibimize doğrudan yazın.",
    faqLink: "İletişime geçin",
  },
  en: {
    programs: "Our programs",
    programsLead: "Different needs, the same standard of care. Two solutions for your business.",
    faqEyebrow: "FAQ",
    faqTitle: ["Questions you", "may have."],
    faqLead: "If your question is not here, write to our team directly.",
    faqLink: "Get in touch",
  },
};

export default async function HomePage() {
  const locale = await getLocale();
  const t = T[locale];

  return (
    <>
      <XStarfield />
      <div className="relative z-[1]">
        <HomeHero />
        <DifferenceBlock />

        {/* "Programlarımız" as a subheading: small caps between two rules, in
            the ink colour (clean white on the dark theme). */}
        <div id="programlar" className="scroll-mt-[calc(var(--header-h)+16px)] pt-4 lg:pt-6">
          <Container className="text-center">
            <h2 id="programlar-baslik" data-reveal className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-ink">
              <span aria-hidden="true" className="h-0.5 w-8 bg-ink" />
              {t.programs}
              <span aria-hidden="true" className="h-0.5 w-8 bg-ink" />
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-ink-2 lg:text-[1.0625rem]">{t.programsLead}</p>
          </Container>
        </div>
        <ProductShowcase product="nexa" side="left" index={1} />
        <ProductShowcase product="nexus" side="right" index={2} />

        <SectorShowcase />
        <Section labelledBy="sss-baslik" containerClassName="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-16">
          <SectionHeader
            id="sss-baslik"
            eyebrow={t.faqEyebrow}
            title={
              <>
                {t.faqTitle[0]} <em>{t.faqTitle[1]}</em>
              </>
            }
            lead={
              <>
                {t.faqLead}
                <span className="mt-5 block">
                  <ArrowLink href="/iletisim">{t.faqLink}</ArrowLink>
                </span>
              </>
            }
            className="lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start"
          />
          <FaqAccordion items={HOME_FAQS[locale]} />
        </Section>
        <CtaBand />
      </div>
    </>
  );
}
