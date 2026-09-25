import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PageIntro } from "@/components/layout/page-intro";
import { NexaMark } from "@/components/ui/nexa-mark";
import { NexusMark } from "@/components/ui/nexus-mark";
import { Container } from "@/components/ui/primitives";
import { LOGO_RULES, SWATCH_GROUPS } from "@/lib/content/brand";

export const metadata: Metadata = {
  title: "Marka Rehberi",
  description: "neXa sys ve nexus logoları, Kerinti renk paleti ve kullanım kuralları.",
};

const PRODUCTS = [
  {
    Mark: NexaMark,
    name: "neXa sys",
    role: "Sipariş yönetim sistemi",
    story:
      "X, birbirini kesen siparişleri temsil eder. Yükselen kol bir okla biter: her sipariş masadan mutfağa, oradan rapora doğru ilerler.",
  },
  {
    Mark: NexusMark,
    name: "nexus",
    role: "Uçtan uca iş yönetim platformu",
    story:
      "Merkezdeki halka ve ona bağlı dört düğüm, her şeyin tek noktada buluştuğunu anlatır. neXa köşegenlerde, nexus eksenlerde çizilir.",
  },
] as const;

const VARIANTS = [
  { variant: "full", label: "Tam logo", ground: "bg-surface border border-line" },
  { variant: "symbol", label: "Yalnızca sembol", ground: "bg-surface-2" },
  { variant: "mono", label: "Tek renk", ground: "bg-surface border border-line text-ink" },
  { variant: "on-dark", label: "Koyu zemin", ground: "bg-night" },
] as const;

export default function BrandPage() {
  return (
    <>
      <PageIntro
        eyebrow="Kerinti / Marka"
        title="İki ürün, tek bir aile."
        lead="neXa sys ve nexus aynı ızgara, aynı çizgi kalınlığı ve aynı köşe mantığıyla çizildi. Birlikte durduklarında akraba, yan yana geldiklerinde bir bakışta ayırt edilir."
      />

      <section aria-labelledby="logolar-baslik" className="py-16 lg:py-24">
        <Container width="page">
          <h2 id="logolar-baslik" className="text-3xl font-extrabold tracking-tight text-ink">
            Logolar
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {PRODUCTS.map(({ Mark, name, role, story }) => (
              <article key={name} className="rounded-[var(--radius-lg)] border border-line p-6 sm:p-8">
                <div className="flex min-h-40 items-center justify-center rounded-[var(--radius-md)] bg-surface-2 p-6">
                  <Mark size={56} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink">{name}</h3>
                <p className="text-sm font-medium text-ink-3">{role}</p>
                <p className="mt-3 leading-relaxed text-ink-2">{story}</p>

                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {VARIANTS.map((v) => (
                    <li key={v.variant}>
                      <div className={`flex h-24 items-center justify-center rounded-[var(--radius-sm)] ${v.ground}`}>
                        <Mark size={v.variant === "symbol" ? 40 : 28} variant={v.variant} title={`${name} — ${v.label}`} />
                      </div>
                      <p className="mt-1.5 text-xs font-medium text-ink-3">{v.label}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-end gap-8 rounded-[var(--radius-lg)] border border-line p-6 sm:p-8">
            <p className="w-full text-sm font-semibold text-ink">Ölçek testi</p>
            {[16, 24, 32, 48].map((s) => (
              <div key={s} className="flex items-end gap-3">
                <NexaMark size={s} variant="symbol" title={`neXa sembol ${s} piksel`} />
                <NexusMark size={s} variant="symbol" title={`nexus sembol ${s} piksel`} />
                <span className="text-xs text-ink-3">{s} px</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="renk-baslik" className="bg-surface-2 py-16 lg:py-24">
        <Container width="page">
          <h2 id="renk-baslik" className="text-3xl font-extrabold tracking-tight text-ink">
            Renk paleti
          </h2>
          <div className="mt-10 space-y-12">
            {SWATCH_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-bold text-ink">{group.title}</h3>
                <p className="mt-1 text-ink-2">{group.lead}</p>
                <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {group.swatches.map((s) => (
                    <li key={s.token} className="overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface">
                      <div aria-hidden="true" className="h-20" style={{ background: s.hex }} />
                      <div className="p-3">
                        <p className="text-sm font-semibold text-ink">{s.name}</p>
                        <p className="font-mono text-xs text-ink-2">{s.hex}</p>
                        <p className="mt-1 text-xs text-ink-3">
                          <code>--color-{s.token}</code>
                        </p>
                        <p className="mt-1 text-xs text-ink-3">{s.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="kural-baslik" className="py-16 lg:py-24">
        <Container width="page">
          <h2 id="kural-baslik" className="text-3xl font-extrabold tracking-tight text-ink">
            Kullanım kuralları
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-line p-6">
              <h3 className="flex items-center gap-2 font-bold text-success">
                <Check aria-hidden="true" className="size-5" /> Yapın
              </h3>
              <ul className="mt-4 space-y-3 text-ink-2">
                {LOGO_RULES.do.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-line p-6">
              <h3 className="flex items-center gap-2 font-bold text-danger">
                <X aria-hidden="true" className="size-5" /> Yapmayın
              </h3>
              <ul className="mt-4 space-y-3 text-ink-2">
                {LOGO_RULES.dont.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
