"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Pause, Play } from "lucide-react";
import styles from "@/components/layout/editorial-hero.module.css";

/**
 * Shared motion plumbing for the editorial page heroes.
 *
 * Every page hero has a live "stage" that replays a small product moment in a
 * loop. They all follow the same rules, which live here once:
 *
 *   - one step every few seconds, driven by `useStageStep`;
 *   - paused by the visitor (the round button in the caption), by the stage
 *     leaving the viewport, or by the tab going to the background;
 *   - never started under prefers-reduced-motion — the stage shows its first
 *     frame and stays there.
 */

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Server snapshot is "reduced": SSR renders the static first frame. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => true,
  );
}

const PausedContext = createContext(false);

/** True when the stage should hold still (visitor pause or reduced motion). */
export function useStageStill() {
  const paused = useContext(PausedContext);
  const reduced = useReducedMotion();
  return paused || reduced;
}

/**
 * A step counter that advances every `intervalMs` while the stage is moving
 * and visible. Attach the returned ref to the stage's root element.
 */
export function useStageStep(intervalMs: number) {
  const still = useStageStill();
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (still) return;
    const root = ref.current;
    if (!root) return;
    let visible = true;
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      const run = visible && document.visibilityState === "visible";
      if (run && !timer) timer = setInterval(() => setStep((s) => s + 1), intervalMs);
      if (!run && timer) {
        clearInterval(timer);
        timer = undefined;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(root);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (timer) clearInterval(timer);
    };
  }, [still, intervalMs]);

  return { ref, step, still };
}

/** Counts from the previous value to `target` in ~0.8 s. */
export function useCountUp(target: number, enabled: boolean) {
  const [shown, setShown] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (!enabled) return;
    const start = performance.now();
    const origin = from.current;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 800);
      const eased = 1 - (1 - t) ** 3;
      setShown(Math.round(origin + (target - origin) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
      else from.current = target;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled]);
  return enabled ? shown : target;
}

/**
 * The stage figure: the animated board, then a caption with the stage's
 * serif-accented line and the pause/play button that controls every step
 * counter inside it.
 */
export function StageFrame({
  caption,
  description,
  children,
}: {
  caption: React.ReactNode;
  /** Screen-reader description of what the animation shows. */
  description: string;
  children: React.ReactNode;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <figure className={styles.motionFigure}>
      <div className={styles.motionBoard} data-paused={paused}>
        <PausedContext.Provider value={paused}>{children}</PausedContext.Provider>
      </div>
      <figcaption className={styles.motionCaption}>
        <div>
          <p className={styles.flowHeadline}>{caption}</p>
          <span className="sr-only">{description}</span>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Animasyonu oynat" : "Animasyonu duraklat"}
          aria-pressed={paused}
        >
          {paused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
        </button>
      </figcaption>
    </figure>
  );
}
