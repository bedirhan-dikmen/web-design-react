import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { CtaBand } from "@/components/sections/cta-band";
import { FeatureGrid, SectionTitle } from "@/components/sections/product-sections";
import { NexusWorkspaceBoard } from "@/components/stages/nexus-workspace-board";
import { NexusMark } from "@/components/ui/nexus-mark";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { PRODUCTS } from "@/lib/content/products";
import { CONTACT_FORM_HREF, DEMO_HREF } from "@/lib/site";

const NEXUS = PRODUCTS.nexus;

export const metadata: Metadata = {
  title: "nexus — İş Yönetim Platformu",
  description: NEXUS.lead,
};

export default function NexusPage() {
  return (
    <>
      <PageIntro
        accent="nexus"
        eyebrow={NEXUS.category}
        title={
          <>
            {NEXUS.headline[0]} <span className="text-ink-3">{NEXUS.headline[1]}</span>
          </>
        }
        lead={NEXUS.lead}
      >
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <ButtonLink href={DEMO_HREF} size="lg" arrow>
            Demo Talep Et
          </ButtonLink>
          <ButtonLink href={CONTACT_FORM_HREF} size="lg" variant="outline-light">
            Bize Ulaşın
          </ButtonLink>
          <NexusMark size={26} className="ml-auto hidden md:block" />
        </div>
      </PageIntro>

      <section aria-label="nexus arayüzü" className="border-y border-line bg-surface-2 py-12 lg:py-16">
        <Container width="page" className="flex justify-center">
          <div data-reveal className="w-full max-w-[760px]">
            <NexusWorkspaceBoard />
          </div>
        </Container>
      </section>

      <section aria-labelledby="nexus-ozellik" className="py-16 lg:py-20">
        <Container width="page">
          <SectionTitle id="nexus-ozellik" eyebrow="Özellikler" title="İşletmenin bütünü, tek kayıtta." />
          <div className="mt-8">
            <FeatureGrid slug="nexus" />
          </div>
        </Container>
      </section>

      <CtaBand title="nexus’u işletmenizde görün." />
    </>
  );
}
