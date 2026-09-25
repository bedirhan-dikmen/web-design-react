import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { StageFrame } from "@/components/motion/stage-motion";
import styles from "./editorial-hero.module.css";

/**
 * The editorial page hero — the homepage's opening, generalised so every page
 * in the navigation opens the same way while telling its own story.
 *
 * Left: red-ruled eyebrow, large light headline with a serif-italic accent
 * (<em>), a two-line statement, a short detail, the primary/secondary
 * actions and a small aside link. Right: a live stage (each page supplies its
 * own animated board) with its caption and pause button, then three numbered
 * links into the page. A thin footer strip closes the hero.
 *
 * All styling is editorial-hero.module.css; the stage motion rules are in
 * components/motion/stage-motion.tsx.
 */

type LinkItem = { label: string; href: string };

export type EditorialHeroProps = {
  ariaLabel: string;
  eyebrow: string;
  /** Headline; wrap the accent word in <em>. */
  headline: React.ReactNode;
  description: React.ReactNode;
  detail: React.ReactNode;
  primary: LinkItem;
  secondary: LinkItem;
  aside?: { lead: string; label: string; href: string };
  stageLabel: string;
  stage: React.ReactNode;
  caption: React.ReactNode;
  /** What the animation shows, for screen readers. */
  stageDescription: string;
  links: LinkItem[];
  linksLabel: string;
  footer: { left: string; scrollHref: string; scrollLabel: string; right: string };
};

function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (/^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function EditorialHero(props: EditorialHeroProps) {
  const {
    ariaLabel,
    eyebrow,
    headline,
    description,
    detail,
    primary,
    secondary,
    aside,
    stageLabel,
    stage,
    caption,
    stageDescription,
    links,
    linksLabel,
    footer,
  } = props;

  return (
    <section className={styles.hero} aria-label={ariaLabel}>
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span /> {eyebrow}
          </p>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.description}>{description}</p>
          <p className={styles.detail}>{detail}</p>
          <div className={styles.actions}>
            <SmartLink href={primary.href} className={styles.primary}>
              {primary.label} <ArrowUpRight size={20} aria-hidden="true" />
            </SmartLink>
            <SmartLink href={secondary.href} className={styles.secondary}>
              {secondary.label} <ArrowUpRight size={17} aria-hidden="true" />
            </SmartLink>
          </div>
          {aside && (
            <SmartLink href={aside.href} className={styles.sectorLink}>
              {aside.lead}
              <br />
              <span>
                {aside.label} <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </SmartLink>
          )}
        </div>

        <div className={styles.stage}>
          <div className={styles.stageTop}>
            <span>{stageLabel}</span>
          </div>
          <StageFrame caption={caption} description={stageDescription}>
            {stage}
          </StageFrame>
          <nav className={styles.moduleLinks} aria-label={linksLabel}>
            {links.map((link, index) => (
              <SmartLink key={link.href} href={link.href}>
                <span className={styles.moduleNumber} aria-hidden="true">
                  0{index + 1}
                </span>
                <span>{link.label}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </SmartLink>
            ))}
          </nav>
        </div>
      </div>
      <div className={styles.footer}>
        <span>{footer.left}</span>
        <a href={footer.scrollHref}>
          {footer.scrollLabel} <ArrowDown size={16} aria-hidden="true" />
        </a>
        <span className={styles.footerIndex}>{footer.right}</span>
      </div>
    </section>
  );
}
