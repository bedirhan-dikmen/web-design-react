import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Small shared building blocks for every page below the hero.
 *
 * `Container` uses the same max width and gutters as the hero's content row,
 * so section headings line up with the hero headline's left edge at every
 * viewport width.
 */

export function Container({
  className = "",
  width = "content",
  children,
}: {
  className?: string;
  /** "page" is the 1240px reading width used by the redesigned sections. */
  width?: "content" | "page";
  children: React.ReactNode;
}) {
  const max = width === "page" ? "max-w-page-max" : "max-w-content-max";
  return (
    <div className={`mx-auto w-full ${max} px-5 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
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
    size === "lg" ? "px-7 py-3.5 text-base sm:px-8 sm:py-4" : "px-5 py-2.5 text-[0.9375rem]";
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red ${sizing} ${BUTTON_VARIANTS[variant]} ${className}`;
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
 * Section heading block: optional red eyebrow, navy title, muted lead, and an
 * optional action link that sits on the right from `md` up.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
  id,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10 ${className}`}
    >
      <div className="max-w-5xl">
        {eyebrow && (
          <p className="mb-2 border-l-2 border-brand-red pl-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-red">
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className="text-balance text-[clamp(1.75rem,2.4vw,2.5rem)] font-bold leading-tight tracking-tight text-ink"
        >
          {title}
        </h2>
        {lead && (
          <p className="mt-2 text-pretty text-base text-slate-600 lg:text-[1.0625rem]">{lead}</p>
        )}
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
