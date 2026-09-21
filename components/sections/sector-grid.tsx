import Image from "next/image";
import Link from "next/link";
import { SECTOR_IMAGE_SIZE, type Sector } from "@/lib/content/sectors";

/**
 * Sector card: a 4:3 photograph over a title and tagline.
 *
 * The sources are 4:3 already (1448x1086), so `object-cover` inside a 4:3 box
 * crops nothing; it only guards against sub-pixel rounding. `sizes` mirrors
 * the grid below, so the browser picks a candidate near 2x the rendered width.
 */
export function SectorCard({
  sector,
  href,
  showTagline = true,
}: {
  sector: Sector;
  href?: string;
  showTagline?: boolean;
}) {
  const body = (
    <>
      <div className="overflow-hidden rounded-xl">
        <Image
          src={sector.image}
          width={SECTOR_IMAGE_SIZE.width}
          height={SECTOR_IMAGE_SIZE.height}
          alt={sector.imageAlt}
          sizes="(min-width: 1800px) 290px, (min-width: 1280px) 16vw, (min-width: 768px) 32vw, 48vw"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-3 text-[0.9375rem] font-bold text-brand-navy-deep">{sector.title}</h3>
      {showTagline && <p className="mt-0.5 text-sm text-slate-600">{sector.tagline}</p>}
    </>
  );

  return (
    <li>
      {href ? (
        <Link
          href={href}
          className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
        >
          {body}
        </Link>
      ) : (
        <div className="group">{body}</div>
      )}
    </li>
  );
}

export function SectorGrid({
  sectors,
  linkToSolutions = true,
  showTagline = true,
}: {
  sectors: Sector[];
  linkToSolutions?: boolean;
  showTagline?: boolean;
}) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-6">
      {sectors.map((s) => (
        <SectorCard
          key={s.slug}
          sector={s}
          showTagline={showTagline}
          href={linkToSolutions ? `/cozumler#${s.slug}` : undefined}
        />
      ))}
    </ul>
  );
}
