import Image from "next/image";

/** Official, unmodified artwork from https://kerinti.com.tr/assets/logo.png. */
export function KerintiWordmark({
  className = "",
  widthClass = "w-[132px] sm:w-[152px]",
}: {
  className?: string;
  widthClass?: string;
}) {
  return (
    <Image
      src="/images/brand/kerinti-logo.png"
      width={1600}
      height={803}
      alt="Kerinti — bu işler bitecek"
      sizes="152px"
      className={`h-auto ${widthClass} ${className}`}
    />
  );
}
