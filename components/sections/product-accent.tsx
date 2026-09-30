import { SectionHeader } from "@/components/ui/primitives";
import { NexaMark } from "@/components/ui/nexa-mark";
import { NexusMark } from "@/components/ui/nexus-mark";
import type { ProductSlug } from "@/lib/content/products";

/**
 * Pieces shared by server and client product sections (no server-only
 * imports here, so client components such as product-bento can use them).
 *
 * Each product carries its own accent (neXa red, nexus graphite; see the
 * tokens in app/globals.css). Tailwind only generates classes it can see as
 * literals, so the per-product class sets live in ACCENT.
 */

export const ACCENT: Record<ProductSlug, { text: string; soft: string; button: string; Mark: typeof NexaMark }> = {
  nexa: {
    text: "text-nexa",
    soft: "bg-nexa-soft",
    button: "bg-nexa-fill text-white hover:bg-nexa-fill-strong",
    Mark: NexaMark,
  },
  nexus: {
    text: "text-nexus",
    soft: "bg-nexus-soft",
    button: "bg-nexus-fill text-white hover:bg-nexus-fill-strong",
    Mark: NexusMark,
  },
};

/**
 * Section heading for the product sections: the shared SectionHeader, with a
 * [before, accent] title pair from the content files (accent in red).
 */
export function SectionTitle({
  id,
  eyebrow,
  title,
  lead,
  action,
  as = "h2",
}: {
  id: string;
  eyebrow: string;
  title: [string, string] | string;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  as?: "h1" | "h2";
}) {
  const node = typeof title === "string" ? title : (
    <>
      {title[0]} <em>{title[1]}</em>
    </>
  );
  return <SectionHeader id={id} eyebrow={eyebrow} title={node} lead={lead} action={action} as={as} />;
}
