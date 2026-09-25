"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide, attribute-driven motion. Rendered once in the layout.
 *
 *  - [data-reveal]     fades/slides in when it enters the viewport. Children
 *                      of a [data-reveal-group] get a small stagger.
 *  - [data-spotlight]  gets --mx/--my custom properties that follow the
 *                      pointer, which the CSS turns into a soft light.
 *
 * Content is only hidden after this script marks <html class="motion">, so
 * without JavaScript everything is visible. Under prefers-reduced-motion the
 * class is never set and nothing moves.
 */
export function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          if (!child.hasAttribute("data-reveal")) child.setAttribute("data-reveal", "");
          (child as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(i, 6) * 70}ms`);
        });
      });
      document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => {
        // Already on screen at load: show without animating, so nothing
        // that was painted by the server blinks out.
        if (!document.documentElement.classList.contains("motion") && el.getBoundingClientRect().top < window.innerHeight) {
          el.setAttribute("data-shown", "");
        } else {
          observer.observe(el);
        }
      });
    };
    scan();
    document.documentElement.classList.add("motion");

    const onPointer = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("pointermove", onPointer);
    };
  }, [pathname]);

  return null;
}
