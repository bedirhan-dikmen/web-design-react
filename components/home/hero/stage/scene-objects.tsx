"use client";

import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import {
  bodyHeight,
  screenHeight,
  screenWidth,
  type DeviceSpec,
  KITCHEN,
  KITCHEN_STAND,
  MONITOR_STAND,
  POS_BASE,
  QR_STAND,
} from "./scene-layout";
import {
  createGlassSheenTexture,
  createQrCardTexture,
  createRoundedRectAlpha,
  createWordmarkTexture,
} from "./canvas-textures";

type Material = { color: string; roughness: number; metalness: number };

/**
 * The physical objects in the hero scene.
 *
 * ## Modelling approach
 *
 * Deliberately simple product-display geometry — rounded boxes for shells,
 * short necks and bases for stands, one tapered frustum for the POS wedge.
 * The brief asks for a premium product presentation, not industrial design
 * modelling, and light geometry keeps the scene cheap enough to render a
 * handful of frames and then stop.
 *
 * ## Why screens are unlit
 *
 * Every screen uses `meshBasicMaterial` with `toneMapped={false}`. A lit
 * material would push the UI through the scene's key light and ACES tone
 * mapping, shifting its colours and crushing the small text — exactly the
 * legibility failure docs/VISUAL_QA.md rejects. Real product photography has
 * emissive screens anyway. The glass reads as glass through the black glass
 * border, rounded panel corners and a faint additive sheen, not by dimming
 * the UI.
 *
 * ## Why the screen sits proud of the shell
 *
 * The screen plane is offset to `depth/2 + 0.003`, just in front of the
 * shell's front face, so there is no z-fighting between the two at any camera
 * angle.
 */

const SHELL_DARK = {
  color: "#14171c",
  roughness: 0.38,
  metalness: 0.62,
} as const;

const SHELL_LIGHT = {
  color: "#d9dee6",
  roughness: 0.34,
  metalness: 0.55,
} as const;

/** Phone front: black glass, glossy. */
const GLASS_BLACK = {
  color: "#07080a",
  roughness: 0.12,
  metalness: 0.4,
} as const;

/** Phone side band: brushed natural titanium, as the iPhone in image.png. */
const TITANIUM = {
  color: "#b9b8b3",
  roughness: 0.28,
  metalness: 0.9,
} as const;

const STAND_METAL = {
  color: "#8b929d",
  roughness: 0.3,
  metalness: 0.8,
} as const;

/**
 * A canvas texture that contains type, redrawn once webfonts have settled.
 *
 * `ctx.font` fails silently when the requested face has not loaded: the draw
 * happens in whatever fallback is available and the result is baked into the
 * texture forever. Inter arrives with `display: swap`, so the first paint of
 * the wordmark or the QR card can easily land before it. Redrawing once on
 * `document.fonts.ready` costs one extra canvas pass and guarantees the 3D
 * type matches the DOM type.
 */
function useTypeTexture(draw: () => THREE.CanvasTexture): THREE.CanvasTexture {
  const [fontsSettled, setFontsSettled] = useState(false);

  const texture = useMemo(() => {
    // `fontsSettled` is the redraw trigger, not an input to the drawing.
    void fontsSettled;
    return draw();
  }, [draw, fontsSettled]);

  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready
      .then(() => {
        if (!cancelled) setFontsSettled(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
}

/**
 * One screen device: shell, glass border, rounded screen, and glass sheen.
 *
 * `spec.position` is the point where the object touches the counter, so the
 * group sits on y = 0 and the shell is raised by `lift + bodyHeight/2`. The
 * stand passed as `children` then draws from the group's own origin *upward*
 * through 0..lift, which is what actually connects the shell to the stone.
 *
 * Getting this wrong is not subtle and it is easy to do: an earlier pass put
 * the group at the shell's base height, so every stand was drawn starting from
 * there and floated a full stand-height above the counter with the device
 * hanging off nothing.
 *
 * ## What makes it read as hardware rather than a pasted screenshot
 *
 *   - rounded screen corners at the panel's real radius (`screenRadius`);
 *   - a black glass border between shell and pixels (`glassBorder`);
 *   - an optional metal side band (`frame`), the phone's titanium edge,
 *     modelled as a slightly larger, thinner shell behind the glass front;
 *   - a faint diagonal sheen across the glass, the reflection of the room.
 */
export function ScreenDevice({
  spec,
  map,
  shell = SHELL_DARK,
  frame,
  island = false,
  children,
}: {
  spec: DeviceSpec;
  map: THREE.Texture;
  shell?: Material;
  frame?: Material;
  /** Phone camera cut-out at the top of the screen. */
  island?: boolean;
  children?: React.ReactNode;
}) {
  const sw = screenWidth(spec);
  const sh = screenHeight(spec);
  const bh = bodyHeight(spec);
  const border = spec.glassBorder ?? 0.018;
  const radius = spec.screenRadius ?? 0.01;
  // Screen centre relative to the shell centre: the chin is deeper than the
  // top bezel, so the screen sits slightly high.
  const screenY = (spec.chin - spec.top) / 2;
  const front = spec.depth / 2;

  const screenAlpha = useMemo(
    () => createRoundedRectAlpha(sw / sh, radius),
    [sw, sh, radius],
  );
  const borderAlpha = useMemo(() => {
    const bw = sw + 2 * border;
    const bhh = sh + 2 * border;
    // Keep the border's outer corner concentric with the screen's.
    return createRoundedRectAlpha(
      bw / bhh,
      (radius * Math.min(sw, sh) + border) / Math.min(bw, bhh),
    );
  }, [sw, sh, border, radius]);
  const sheen = useMemo(() => createGlassSheenTexture(), []);
  const islandAlpha = useMemo(() => createRoundedRectAlpha(3.6, 0.5), []);

  useEffect(
    () => () => {
      screenAlpha.dispose();
      borderAlpha.dispose();
      sheen.dispose();
      islandAlpha.dispose();
    },
    [screenAlpha, borderAlpha, sheen, islandAlpha],
  );

  const shellRadius = Math.min(spec.bodyWidth, bh, spec.depth) * 0.16;
  const islandWidth = sw * 0.3;

  return (
    <group position={spec.position} rotation={spec.rotation}>
      <group position={[0, spec.lift + bh / 2, 0]}>
        <RoundedBox
          args={[spec.bodyWidth, bh, spec.depth]}
          radius={frame ? spec.depth * 0.45 : shellRadius}
          smoothness={4}
          castShadow
        >
          <meshStandardMaterial {...shell} envMapIntensity={1.1} />
        </RoundedBox>

        {frame && (
          <RoundedBox
            args={[spec.bodyWidth + 0.03, bh + 0.03, spec.depth * 0.7]}
            radius={spec.depth * 0.34}
            smoothness={4}
          >
            <meshStandardMaterial {...frame} envMapIntensity={1.4} />
          </RoundedBox>
        )}

        {/* Black glass border. Its edge is where the glass drops into the
            frame; without it the screenshot reads as a printed sticker. */}
        <mesh position={[0, screenY, front + 0.001]}>
          <planeGeometry args={[sw + 2 * border, sh + 2 * border]} />
          <meshStandardMaterial
            color="#050608"
            roughness={0.18}
            metalness={0.3}
            alphaMap={borderAlpha}
            transparent
          />
        </mesh>

        <mesh position={[0, screenY, front + 0.003]}>
          <planeGeometry args={[sw, sh]} />
          <meshBasicMaterial
            map={map}
            alphaMap={screenAlpha}
            transparent
            toneMapped={false}
          />
        </mesh>

        {island && (
          <mesh position={[0, screenY + sh / 2 - sw * 0.07, front + 0.004]}>
            <planeGeometry args={[islandWidth, islandWidth / 3.6]} />
            <meshBasicMaterial color="#000000" alphaMap={islandAlpha} transparent />
          </mesh>
        )}

        {/* Glass. A soft diagonal sheen, the room reflected in the pane:
            weak and additive, so it never washes out the UI beneath it. */}
        <mesh position={[0, screenY, front + 0.005]}>
          <planeGeometry args={[sw, sh]} />
          <meshBasicMaterial
            map={sheen}
            alphaMap={screenAlpha}
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
      {children}
    </group>
  );
}

/** Slim neck and squashed round foot, as the reference monitor has. */
export function MonitorStand() {
  const { neck, base } = MONITOR_STAND;
  return (
    <group>
      <mesh position={[0, base.height + neck.height / 2, -0.04]} castShadow>
        <boxGeometry args={[neck.width, neck.height, neck.depth]} />
        <meshStandardMaterial {...STAND_METAL} />
      </mesh>
      <mesh
        position={[0, base.height / 2, 0]}
        scale={[1, 1, base.squash]}
        castShadow
      >
        <cylinderGeometry args={[base.radius, base.radius, base.height, 40]} />
        <meshStandardMaterial {...STAND_METAL} roughness={0.36} />
      </mesh>
    </group>
  );
}

/**
 * What the kitchen tablet rests on: a rubber lip under its bottom edge, and a
 * folding kickstand plate behind it reaching back down to the stone. Both
 * live in the tablet's own frame (it is leaned back by `KITCHEN.rotation.x`).
 */
export function KitchenStand() {
  const { lip, plate } = KITCHEN_STAND;
  const bh = bodyHeight(KITCHEN);
  return (
    <group>
      <mesh position={[0, lip.height / 2, 0.02]} castShadow>
        <boxGeometry args={[lip.width, lip.height, lip.depth]} />
        <meshStandardMaterial color="#101114" roughness={0.8} metalness={0} />
      </mesh>
      {/* Hinged a third of the way down the back, swung out to the stone. */}
      <group
        position={[0, KITCHEN.lift + bh * 0.62, -KITCHEN.depth / 2]}
        // Positive x rotation swings the free end backward, behind the slate.
        rotation={[0.42, 0, 0]}
      >
        <mesh position={[0, -plate.height / 2, -plate.depth / 2]} castShadow>
          <boxGeometry args={[plate.width, plate.height, plate.depth]} />
          <meshStandardMaterial {...SHELL_DARK} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * The POS wedge, carrying the Kerinti wordmark on its front face.
 *
 * A four-sided `cylinderGeometry` rotated 45 degrees is a rectangular frustum,
 * which is the tapered silhouette the reference base has — narrower on top,
 * flaring to the counter. Scaling it non-uniformly gives the rectangular
 * footprint without authoring a custom geometry.
 */
export function PosBase() {
  const wordmark = useTypeTexture(createWordmarkTexture);
  const { topWidth, bottomWidth, height, depth } = POS_BASE;
  const taper = topWidth / bottomWidth;

  return (
    <group>
      {/*
        Scale on the group, rotation on the mesh — in that order, and not the
        other way round.

        A four-segment cylinder is a diamond in plan, with its corners on the
        axes. Turning it 45 degrees makes it an axis-aligned square, which
        non-uniform scaling then turns into the rectangle we want. A mesh's own
        matrix is T * R * S, so putting both on one mesh applies the scale
        *first* and the rotation stretches a skewed diamond instead — which is
        exactly the mangled wedge this replaces. Nesting forces the order:
        the child rotates, then the parent scales the result.
      */}
      <group scale={[bottomWidth / Math.SQRT2, 1, depth / Math.SQRT2]}>
        <mesh position={[0, height / 2, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <cylinderGeometry args={[taper, 1, height, 4, 1]} />
          <meshStandardMaterial color="#1b1f26" roughness={0.42} metalness={0.5} />
        </mesh>
      </group>

      {/* Wordmark, standing off the sloped front face so it never z-fights.
          The face leans back about 4.6 degrees over the wedge's height. */}
      <mesh
        position={[0, height * 0.5, depth / 2 - 0.02]}
        rotation={[-0.08, 0, 0]}
      >
        <planeGeometry args={[1.15, 0.33]} />
        <meshBasicMaterial
          map={wordmark}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** Acrylic table stand holding the printed QR card. */
export function QrTableStand() {
  const card = useTypeTexture(createQrCardTexture);
  const { width, height, depth, position, rotation, lift, foot } = QR_STAND;

  return (
    <group position={position} rotation={rotation}>
      <group position={[0, lift + height / 2, 0]}>
        <RoundedBox
          args={[width, height, depth]}
          radius={0.03}
          smoothness={3}
          castShadow
        >
          <meshStandardMaterial color="#f2f3f5" roughness={0.55} metalness={0.05} />
        </RoundedBox>
        <mesh position={[0, 0, depth / 2 + 0.002]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={card} toneMapped={false} />
        </mesh>
      </group>

      {/* Foot: the clear acrylic sleeve's base plate. */}
      <mesh position={[0, foot.height / 2, 0.06]} castShadow>
        <boxGeometry args={[foot.width, foot.height, foot.depth]} />
        <meshStandardMaterial
          color="#cfd8e6"
          roughness={0.18}
          metalness={0.1}
          transparent
          opacity={0.72}
        />
      </mesh>
    </group>
  );
}

export { GLASS_BLACK, SHELL_DARK, SHELL_LIGHT, TITANIUM };
