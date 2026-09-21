"use client";

import { useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { ProductVisualCluster } from "../product-visual-cluster";

/**
 * Chooses between the WebGL product scene and the static DOM cluster.
 *
 * The static cluster is not a stub — it is the full Phase 01F composition, and
 * it is what the server renders. The 3D scene only takes over on the client,
 * and only once WebGL2 has actually been proven to work. That gives three
 * things for free:
 *
 *   - no hydration mismatch, because the first client render matches the
 *     server's;
 *   - a real hero for anyone with WebGL disabled, blocked by policy, or on a
 *     machine where context creation fails;
 *   - something meaningful on screen while the scene's textures load, since
 *     the same cluster is the Suspense fallback.
 *
 * The scene is imported with `ssr: false` so three.js never reaches the server
 * bundle or the initial payload.
 */

const ProductScene = dynamic(() => import("./product-scene"), {
  ssr: false,
  loading: () => <ProductVisualCluster />,
});

/**
 * Probe for a usable WebGL2 context.
 *
 * Creating a throwaway context is the only reliable test: `WebGL2RenderingContext`
 * can exist on the window while context creation still fails — a blocklisted
 * driver, a headless environment, or too many live contexts on the page.
 *
 * The probe is deliberately *not* released with `WEBGL_lose_context`. Forcing a
 * loss here was observed to take the scene's real context down with it a couple
 * of seconds later; dropping the reference and letting the canvas be collected
 * is both safer and enough.
 */
let probed: boolean | undefined;

function hasWebGL2(): boolean {
  // Cached: `useSyncExternalStore` calls the snapshot on every render and
  // requires a stable result, and creating a GL context per render would be
  // both wasteful and a good way to exhaust the browser's context budget.
  if (probed === undefined) {
    try {
      probed = !!document.createElement("canvas").getContext("webgl2");
    } catch {
      probed = false;
    }
  }
  return probed;
}

/** Nothing to subscribe to: WebGL support does not change within a session. */
const noSubscribe = () => () => {};

export function HeroProductStage() {
  /*
   * `useSyncExternalStore` rather than state set from an effect: the server
   * snapshot is `false`, so the server and the hydration pass both render the
   * static cluster and there is no mismatch, and the client switches to the
   * probed value on the first post-hydration render without a second commit.
   */
  const supported = useSyncExternalStore(noSubscribe, hasWebGL2, () => false);
  const [contextLost, setContextLost] = useState(false);

  /**
   * A lost context is not recoverable here — the scene's render targets go with
   * it — so the hero drops back to the static cluster instead of leaving a dead
   * canvas on the page. This is the same fallback the no-WebGL path uses, so
   * there is no second code path to keep working.
   */
  if (!supported || contextLost) return <ProductVisualCluster />;
  return <ProductScene onContextLost={() => setContextLost(true)} />;
}
