"use client";

import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useTexture } from "@react-three/drei";
import {
  CAMERA,
  KITCHEN,
  MONITOR,
  PHONE,
  POS,
  TEXTURES,
} from "./scene-layout";
import {
  GLASS_BLACK,
  KitchenStand,
  MonitorStand,
  PosBase,
  QrTableStand,
  ScreenDevice,
  SHELL_LIGHT,
  TITANIUM,
} from "./scene-objects";
import { Counter } from "./counter";

/**
 * The 3D hero product scene.
 *
 * The devices are staged in real space — real depth on z, real rotations, one
 * perspective camera — rather than faked with 2D transforms. That is the whole
 * point of this phase: the side angles, the overlaps and the way the counter
 * recedes all fall out of the camera rather than being drawn by hand.
 *
 * ## Canvas framing
 *
 * The canvas is rendered 14% wider than the cluster box on each side and then
 * masked back, so the counter genuinely runs out of frame instead of stopping
 * at a rectangle edge. The extra width comes from the container's aspect ratio;
 * the field of view is unchanged, so the vertical framing still matches
 * image.png exactly.
 *
 * ## Render budget
 *
 * `frameloop="demand"` — nothing in the scene moves, so it is pointless to
 * render it 60 times a second. `SettleFrames` invalidates for a fixed number of
 * frames after mount, which is long enough for the reflection pass, the
 * environment and the contact shadows to resolve, and then the loop stops
 * completely. Steady-state GPU cost after that is zero.
 */

/** Drawing-buffer ratio: never below 1.5x (see the Canvas), never above 2x. */
const SCENE_DPR: [number, number] = [1.5, 2];

/** How many frames to render before the scene is allowed to go idle. */
const SETTLE_FRAMES = 45;

function SettleFrames() {
  const rendered = useRef(0);
  const invalidate = useThree((s) => s.invalidate);
  const canvas = useThree((s) => s.gl.domElement);

  useFrame(() => {
    rendered.current += 1;
    if (rendered.current < SETTLE_FRAMES) invalidate();
  });

  /**
   * Everything that should put a *different* picture on the canvas wakes the
   * loop back up.
   *
   * The visibility and intersection cases are not theoretical. A backgrounded
   * or occluded tab throttles rAF, so the settle frames can all be spent while
   * the page is not being composited; with `frameloop="demand"` the scene would
   * then never draw again and the hero would stay blank for the rest of the
   * session. Both observers cost nothing and close that hole.
   */
  useEffect(() => {
    const wake = () => {
      rendered.current = 0;
      invalidate();
    };

    window.addEventListener("resize", wake);
    document.addEventListener("visibilitychange", wake);
    // Fonts affect the canvas-drawn wordmark and QR card.
    document.fonts?.ready.then(wake).catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) wake();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", wake);
      document.removeEventListener("visibilitychange", wake);
      observer.disconnect();
    };
  }, [invalidate, canvas]);

  return null;
}

/**
 * Keeps the drawing buffer the same size as the element it lives in.
 *
 * R3F sizes itself from a ResizeObserver on its container, and a
 * ResizeObserver only delivers while the page is actually being rendered. A
 * window that is occluded, minimised or in a background tab is not, so the
 * observation never arrives, the renderer stays at the HTML default 300x150
 * and the hero is a small blank rectangle until something forces a rendering
 * update. That is not a hypothetical: it reproduced consistently on a Chrome
 * window sitting behind another one, where a freshly created ResizeObserver on
 * the very same element also never fired once.
 *
 * `getBoundingClientRect` has no such dependency — layout is up to date
 * whether or not a frame is being produced. So the size is read synchronously
 * in a layout effect, and the observer is kept only to follow later changes.
 */
function ResizeGuard() {
  const gl = useThree((s) => s.gl);
  const size = useThree((s) => s.size);
  const setSize = useThree((s) => s.setSize);
  const invalidate = useThree((s) => s.invalidate);

  useLayoutEffect(() => {
    const host = gl.domElement.parentElement;
    if (!host) return;

    const sync = () => {
      const { width, height } = host.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      if (Math.abs(width - size.width) > 1 || Math.abs(height - size.height) > 1) {
        setSize(width, height);
        invalidate();
      }
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(host);
    return () => observer.disconnect();
  }, [gl, size.width, size.height, setSize, invalidate]);

  return null;
}

/**
 * Aim the camera and frame the measured device box inside a full-bleed canvas.
 * No orbit controls: this is a hero, not a viewer.
 *
 * The canvas covers the whole hero, so the marble counter runs its full width
 * as in the reference. The camera's frustum is still defined for the device
 * box alone (fov, and the box's aspect); a view offset then renders the whole
 * canvas around it, with the box landing exactly on the `.hs-device-box`
 * element the stage CSS positions at x 649, y 173, 980 x 690 reference px.
 * Reading that rectangle from the DOM means CSS and camera cannot disagree.
 *
 * The camera is `manual`, so R3F does not overwrite this aspect on resize.
 */
function CameraRig() {
  // The camera is read from the store inside the effect rather than taken
  // from a selector: three.js cameras are mutated imperatively, and the React
  // Compiler (correctly) rejects assigning to a value a hook returned.
  const get = useThree((s) => s.get);
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);
  const canvas = useThree((s) => s.gl.domElement);

  useLayoutEffect(() => {
    const frame = () => {
      const camera = get().camera as THREE.PerspectiveCamera;
      camera.position.set(...CAMERA.position);
      camera.lookAt(new THREE.Vector3(...CAMERA.target));
      const box = canvas.closest(".hs-device-box")?.getBoundingClientRect();
      const view = canvas.getBoundingClientRect();
      if (box && box.width > 0 && box.height > 0 && view.width > 0) {
        camera.aspect = box.width / box.height;
        camera.setViewOffset(
          box.width,
          box.height,
          view.left - box.left,
          view.top - box.top,
          view.width,
          view.height,
        );
      }
      camera.updateProjectionMatrix();
      invalidate();
    };
    frame();
    const box = canvas.closest(".hs-device-box");
    if (!box) return;
    const observer = new ResizeObserver(frame);
    observer.observe(box);
    return () => observer.disconnect();
  }, [get, canvas, size.width, size.height, invalidate]);
  return null;
}

/**
 * Crispness settings applied as each texture loads.
 *
 * sRGB decode, a full mip chain and maximum anisotropy. Anisotropy is the one
 * that matters most here: without it the angled screens smear badly along the
 * direction of the turn, which is precisely where UI text has to stay readable.
 *
 * This runs in drei's `onLoad` callback rather than an effect over the returned
 * textures — three.js is imperative and these objects must be mutated, but
 * doing it to a value returned from a hook is what the React Compiler rules
 * (correctly) reject.
 */
function configureScreenTexture(texture: THREE.Texture, maxAnisotropy: number) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
}

function Devices() {
  const maxAnisotropy = useThree((s) => s.gl.capabilities.getMaxAnisotropy());
  const [dashboard, kitchen, pos, mobile] = useTexture(
    [TEXTURES.dashboard, TEXTURES.kitchen, TEXTURES.pos, TEXTURES.mobile],
    (loaded) => {
      const list = Array.isArray(loaded) ? loaded : [loaded];
      for (const texture of list) configureScreenTexture(texture, maxAnisotropy);
    },
  );

  return (
    <>
      {/* Rear monitor — dominant, furthest back, right edge turned toward us. */}
      <ScreenDevice spec={MONITOR} map={dashboard} shell={SHELL_LIGHT}>
        <MonitorStand />
      </ScreenDevice>

      {/* Kitchen display — a large tablet on a kickstand, right of frame. */}
      <ScreenDevice spec={KITCHEN} map={kitchen}>
        <KitchenStand />
      </ScreenDevice>

      {/* POS terminal — front and centre on its branded wedge base. */}
      <ScreenDevice spec={POS} map={pos}>
        <PosBase />
      </ScreenDevice>

      {/* Phone — front left, paired with the QR stand. */}
      <ScreenDevice
        spec={PHONE}
        map={mobile}
        shell={GLASS_BLACK}
        frame={TITANIUM}
        island
      />

      <QrTableStand />
    </>
  );
}

function SceneLighting() {
  return (
    <>
      {/* Base fill so nothing reads as a black silhouette. */}
      <ambientLight intensity={0.5} color="#d6dcea" />

      {/* Key: soft, high and slightly to the left, matching the way the DOM
          hero's stone brightens toward the viewer. */}
      <directionalLight
        position={[-7, 11, 9]}
        intensity={2.3}
        color="#fbf7f1"
        castShadow={false}
      />

      {/* The bar behind the scene: warm, low, from the right. It is what
          makes the devices feel like they belong to the photograph — but at
          the earlier intensity of 90 it flooded the stone and read as brown
          wood. Now it gives warm rim light and highlights, not a fill. */}
      <pointLight position={[9, 4.5, -7]} intensity={38} distance={30} decay={2} color="#ffac66" />

      {/* A low warm lamp behind the kitchen display: the amber pool that
          image.png shows on the right half of the stone. */}
      <pointLight position={[6.5, 1.4, -3.5]} intensity={16} distance={11} decay={2} color="#ffb574" />

      {/* Cool front fill so the dark shells keep their edges. */}
      <directionalLight position={[6, 3, 12]} intensity={0.55} color="#bcd4ff" />

      {/* Procedural environment — no HDRI download. Gives the bezels and the
          stone something real to reflect. */}
      <Environment resolution={256}>
        <Lightformer
          intensity={2.4}
          position={[-6, 6, 6]}
          scale={[12, 12, 1]}
          color="#fff4e4"
        />
        {/* Bar lamps: a few small warm sources, which is what streaks as
            warm highlights across the polished stone in image.png. */}
        <Lightformer
          intensity={2.2}
          position={[7, 5, -8]}
          scale={[3, 1.2, 1]}
          color="#ffc48a"
        />
        <Lightformer
          intensity={1.6}
          position={[-3, 5, -9]}
          scale={[2.4, 1, 1]}
          color="#ffd2a0"
        />
        {/* Ceiling softbox: the broad neutral reflection in the stone. */}
        <Lightformer
          intensity={1.2}
          position={[0, 9, -2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[16, 6, 1]}
          color="#f2f4f8"
        />
        <Lightformer
          intensity={0.7}
          position={[0, -4, 9]}
          scale={[14, 5, 1]}
          color="#93b6ff"
        />
      </Environment>
    </>
  );
}

export default function ProductScene({
  onContextLost,
}: {
  onContextLost?: () => void;
}) {
  return (
    <div className="absolute inset-0">
      {/*
        Mounted inside the device box, but sized to the whole hero: it steps
        back to the hero's top-left corner (the stage is centred, so its left
        offset is half the spare width) and takes the hero container's full
        size. The counter therefore spans the hero edge to edge.
      */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: "calc(-649 * var(--u) - (100cqw - 1672 * var(--u)) / 2)",
          top: "calc(-173 * var(--u))",
          width: "100cqw",
          height: "100cqh",
        }}
      >
        <Canvas
          frameloop="demand"
          // At least 1.5x, even on DPR-1 screens: the browser then downsamples
          // the drawing buffer, which is supersampling for the UI screenshots —
          // small text on the angled, minified screens stops aliasing. The
          // scene renders a few dozen frames and then idles, so the cost is a
          // one-off. Capped at 2 for high-DPR displays.
          dpr={SCENE_DPR}
          // No debounce: the delay is where the first measurement gets lost.
          resize={{ scroll: false, debounce: 0 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{
            fov: CAMERA.fov,
            near: 0.5,
            far: 120,
            position: CAMERA.position,
            manual: true,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              "webglcontextlost",
              (event) => {
                // Stop the browser attempting a restore we cannot service:
                // the reflector and shadow render targets are gone with it.
                event.preventDefault();
                onContextLost?.();
              },
              { once: true },
            );
          }}
          // The hero photograph is the background; the canvas only paints the
          // product scene over it.
          style={{ background: "transparent" }}
        >
          <ResizeGuard />
          <CameraRig />
          <SettleFrames />
          <SceneLighting />

          {/*
            `useTexture` suspends, so `Devices` needs its own boundary. Without
            one it suspends everything beside it — including ResizeGuard and
            CameraRig, whose effects then do not run until the textures land.

            The second `SettleFrames` is not a duplicate. The outer one has
            already spent its frames by the time four textures finish decoding,
            and `frameloop="demand"` means the scene would never draw again:
            the devices appeared as black rectangles because their screens were
            first rendered with no map and never rendered a second time. This
            one starts counting when the textures are actually in.
          */}
          <Suspense fallback={null}>
            <Counter />
            <Devices />
            <SettleFrames />
          </Suspense>

          {/* Grounding. Cheap, and far more convincing at this scale than a
              shadow-mapped directional light would be. */}
          <ContactShadows
            position={[0, 0.012, 0]}
            scale={26}
            resolution={512}
            blur={2.4}
            opacity={0.62}
            far={5}
            color="#08111f"
          />
        </Canvas>
      </div>
    </div>
  );
}
