import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Small shared building blocks for every page below the hero.
 *
 * `Container` is the single reading width of the site (--spacing-page-max,
 * 1280px) with the same gutters as the header, so every hero, section and the
 * footer share one left edge at every viewport width.
 */

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`mx-auto w-full max-w-page-max px-5 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

/**
 * One section rhythm for every page: the same vertical padding, an optional
 * tinted band with hairline borders, and the Container inside.
 */
export function Section({
  id,
  labelledBy,
  label,
  tone = "plain",
  size = "md",
  className = "",
  containerClassName = "",
  children,
}: {
  id?: string;
  labelledBy?: string;
  label?: string;
  tone?: "plain" | "tint";
  size?: "sm" | "md";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  const pad = size === "sm" ? "py-10 lg:py-12" : "py-12 lg:py-16";
  const band = tone === "tint" ? "border-y border-line bg-surface-2" : "";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={`scroll-mt-[calc(var(--header-h)+16px)] ${pad} ${band} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

type ButtonVariant = "primary" | "outline-light" | "outline-dark" | "light";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-red text-white shadow-lg shadow-brand-red/20 hover:bg-brand-red-strong",
  // Both outline variants follow the theme now that every surface does.
  "outline-light": "border border-line-2 text-ink hover:border-ink-3 hover:bg-surface-2",
  "outline-dark":
    "border border-line-2 text-ink hover:border-ink-3 hover:bg-surface-2",
  light: "bg-surface text-ink ring-1 ring-line hover:bg-surface-2",
};

/** A link styled as a button. Every call to action on the site is navigation. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  icon,
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  arrow?: boolean;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  const sizing =
    size === "lg" ? "px-5 py-3 text-[0.9375rem]" : "px-4 py-2.5 text-sm";
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red ${sizing} ${BUTTON_VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {icon}
      {children}
      {arrow && <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.25} />}
    </>
  );

  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/** The red "Tüm … →" text link used beside section headings. */
export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-red hover:text-red-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform group-hover:translate-x-0.5"
        strokeWidth={2.25}
      />
    </Link>
  );
}

/**
 * Section heading block: optional red eyebrow, the title (wrap one accent
 * word in <em> for the red accent), a muted lead, and an optional action
 * that sits on the right from `md` up.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
  id,
  as: Heading = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10 ${className}`}
    >
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-3 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink-2">
            <span aria-hidden="true" className="h-0.5 w-5 bg-red" />
            {eyebrow}
          </p>
        )}
        <Heading
          id={id}
          className="text-balance text-[clamp(1.75rem,3vw,2.625rem)] font-bold leading-[1.08] tracking-[-0.035em] text-ink"
        >
          {title}
        </Heading>
        {lead && <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-ink-2 lg:text-[1.0625rem]">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Red-tinted icon tile used by module, contact and value cards. */
export function IconTile({
  children,
  tone = "plain",
}: {
  children: React.ReactNode;
  tone?: "plain" | "tint";
}) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-red ${
        tone === "tint" ? "bg-brand-red/8" : ""
      }`}
    >
      {children}
    </span>
  );
}
