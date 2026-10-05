# Scroll-Driven Deep-Space Parallax Journey Architecture

This document details the architecture, configuration, and extension guidelines for the continuous deep-space parallax journey in `vCloudOps`.

---

## 1. System Architecture Overview

The deep-space background system extends the signature vCloudOps cosmic theme downward across all page sections (`Hero`, `AboutTeaser`, `EventsSection`, `TeamSection`, `CommunitySection`, and `Footer`). As the user scrolls, they experience a continuous journey deeper into outer space.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Home.jsx Scroll Viewport                        │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 3: Near Foreground (z = 0 to +100px, Speed: 0.35x–0.60x)         │
│    • ClosePassPlanet (Skimming dark planetoid with razor rim light)    │
│    • SpacecraftRocket (Vector-thrust spacecraft with plasma wake)      │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 2: Midground (z = -100px to -200px, Speed: 0.10x–0.25x)         │
│    • Hero Planets exit into upper orbit (0% - 18%)                     │
│    • TerrestrialPlanet "Ares Prime" with canyon rifts (15% - 45%)      │
│    • AsteroidCluster with 3D faceted tumble (15% - 45%)                │
│    • OrbitalProbe telemetry relay satellite (15% - 45%)                │
│    • ChronosGasGiant with shadow-cast rings & Hyperion moon (45% - 75%)│
│    • BinaryStars mutual barycenter pair (75% - 100%)                   │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 1: Far Background (z = -300px to -500px, Speed: 0.02x–0.05x)    │
│    • WebGL 3D Interactive Cosmic Starfield (OGL Shader Particles)      │
│    • NebulaDustClouds (Cyan -> Indigo -> Ultraviolet -> Magenta Core)  │
│    • DistantGalaxy (Barred spiral galaxy with dust lanes)              │
│    • ShootingStars & Twinkling micro-stars                             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Scroll Choreography & Narrative Staging

The journey is parameterized along normalized document scroll progress $p \in [0.0, 1.0]$:

| Phase | Scroll Range | Narrative Milestone | Key Celestial Events | Color Shift / Atmosphere |
|---|---|---|---|---|
| **Phase 1** | `0.00 – 0.18` | **Hero Exit** | Top-Right Moon & Bottom-Left Ocean World drift upward and exit into upper orbit at natural parallax speeds. | Signature Electric Cyan (`#38BDF8`) & Azure (`#0EA5E9`) |
| **Phase 2** | `0.15 – 0.45` | **Inner System & Asteroids** | Ares Prime (canyon/crater terrestrial world) emerges from the right edge; tumbling asteroid field passes; telemetry relay probe glides by; distant spiral galaxy emerges. | Electric Cobalt (`#2563EB`) & Indigo (`#4F46E5`) dust lanes |
| **Phase 3** | `0.45 – 0.75` | **Deep Void & Gas Giant** | Grand Chronos Gas Giant floats into view with multi-tier rings, atmospheric storm eye, and escort moon; monumental Close-Pass dark planetoid skims foreground right edge. | Deep Void Ultraviolet (`#7C3AED`) & Midnight Cyan (`#0891B2`) |
| **Phase 4** | `0.75 – 1.00` | **Outer Frontier / Nebula Core** | Luminous high-density cosmic nursery; futuristic Spacecraft Rocket with directional vector thrust cruises diagonally toward the footer; shimmering binary star pair anchors outer frontier. | Radiant Cosmic Magenta (`#D946EF`) & Vivid Cyan (`#06B6D4`) |

---

## 3. Component Architecture & Props

All journey components reside under `src/components/space/` and are coordinated by `SpaceJourneyCanvas.jsx`:

### 1. `CelestialObject.jsx` (Core Parallax Primitive)
Hardware-accelerated layout wrapper driving all translations, scales, rotations, and opacities strictly via GPU compositor layers.

- **Props:**
  - `progress` (*MotionValue*): Document scroll progress ($0.0 \to 1.0$).
  - `range` (*number[]*): Breakpoints `[enterStart, peakStart, peakEnd, exitEnd]`, e.g. `[0.15, 0.22, 0.38, 0.46]`.
  - `yRange` (*number[]*): Vertical GPU translation array, e.g. `[240, 40, -60, -260]`.
  - `xRange` (*number[]*, optional): Horizontal GPU translation array.
  - `scaleRange` (*number[]*, optional): Scale transformation array.
  - `rotateRange` (*number[]*, optional): Rotational transformation array (degrees).
  - `opacityRange` (*number[]*, optional): Opacity curve (defaults to `[0, 1, 1, 0]`).
  - `className` (*string*): Positioning utility classes (e.g. `absolute top-[28%] right-[5%]`).
  - `style` (*CSSProperties*): Additional inline styles.
  - `reduced` (*boolean*): Freezes all motion offsets when `prefers-reduced-motion` is active.

### 2. `NebulaDustClouds.jsx`
Far-background soft multi-stop radial gradient clouds that smoothly interpolate color temperatures across the 4 stages.

### 3. `DistantGalaxy.jsx`
Far-background barred spiral galaxy featuring a starlight galactic nucleus, dual spiraling stellar arms, and inter-arm dust lanes.

### 4. `TerrestrialPlanet.jsx`
Midground terrestrial desert/canyon world "Ares Prime" with spherical terrain shading, Valles Borealis rift chasms, retro pixel crater basins, and polar ice caps.

### 5. `AsteroidCluster.jsx`
Midground cluster of faceted, crystalline asteroids with continuous tumble animations. Automatically drops from 6 to 3 asteroids on screens `< 768px` to satisfy the mobile GPU budget.

### 6. `OrbitalProbe.jsx`
Deep-space telemetry relay probe featuring gold MLI thermal insulation, dual deployable photovoltaic solar panels, parabolic communication dish, and a pulsing status LED beacon.

### 7. `ChronosGasGiant.jsx`
Large banded gas giant featuring chromatic storm belts, the "Azure Eye" storm vortex, north pole hexagonal cyclone, multi-tier rings with Cassini Division and cast shadow wedge, and orbiting moon "Hyperion".

Near-foreground monumental Amethyst & Neon Violet exoplanet skimming the right viewport edge. Features rich volumetric spherical radial gradients (`#FAF5FF` to `#160424`), flowing atmospheric cloud wisps in iridescent lavender, signature vCloudOps stepped retro bands (`#A855F7` to `#4C1D95`), realistically shadowed impact crater basins with delicate rim highlights, smooth day/night terminator gradient, and an elegant specular starlight crescent horizon (no harsh 360° stroke rings or googly-eye crater artifacts). Provides rich dual-tone contrast with the companion cyan moon.

### 9. Companion Satellite Moon (`CyanIceMoon` in `SpaceBackground.jsx`)
Volumetric companion satellite moon orbiting in upper-mid space (`top: 28%, right: 16%–26%`) with matching spherical shading, delicate impact crater basins, stepped pixel band accents, and day/night terminator shadow curve.

### 10. `SpacecraftRocket.jsx`
Futuristic exploration vessel with directional vector thruster nozzle, brilliant plasma core, engine bloom, and throttled exhaust wake.

### 11. `BinaryStars.jsx`
Outer-frontier mutual barycenter stellar pair shimmering with 4-point diffraction spikes and starlight halos.

### 12. `SpaceJourneyCanvas.jsx`
Master orchestrator component that organizes depth layers, passes viewport state, and mounts all journey entities.

---

## 4. Parallax Driver & Scroll Synchronization

- **Scroll Source**: Framer Motion's `useScroll()` tracks the smooth inertial scroll driven by Lenis and GSAP ticker synchronization (`gsap.ticker.add(lenis.raf)`).
- **Reactive MotionValues**: `scrollYProgress` updates without triggering React component re-renders. `useTransform` computes direct GPU transforms (`translate3d(x, y, 0)`, `scale()`, `rotate()`, `opacity`) that are written directly to DOM style properties by the animation engine.
- **Z-Index Convention**:
  - `SpaceBackground` / `SpaceJourneyCanvas`: `z-index: 0` (with `position: fixed, inset: 0, pointer-events: none`).
  - Page Content (`<main>`): `position: relative, z-index: 1`.
  - Sections: Transparent/glass card containers (`backdrop-blur-xl`, `bg-[#050505]/80`, `bg-white/5`).
  - Floating Island Navigation: `position: fixed, top-6, z-index: 50`.
  - GlowCursor: Fixed overlay, `pointer-events: none, z-index: 50+`.

---

## 5. Technical Constraints & Performance Engineering

1. **GPU-Accelerated Compositing**:
   - Only `transform: translate3d(...)`, `scale()`, and `opacity` are animated.
   - `top`, `left`, `margin`, `width`, and `height` are strictly static.
2. **Layer Containment**:
   - `contain: paint` is applied to all background and celestial object containers to isolate browser repaint zones.
   - `pointer-events: none` on all background layers prevents scroll or click interception.
3. **Accessibility (`prefers-reduced-motion`)**:
   - Handled via `useReducedMotion()` and `@media (prefers-reduced-motion: reduce)`.
   - When motion reduction is active:
     - Orbital paths and scroll-driven translations freeze at neutral coordinates (`translate3d(0, 0, 0)`).
     - CSS continuous rotational tumble animations are suppressed.
     - Static planetary positioning and visual styling are preserved.
4. **Mobile & Tablet Budget (< 768px)**:
   - Dynamic viewport detection (`window.innerWidth < 768`).
   - Object count is reduced by 50% (e.g. AsteroidCluster drops secondary pebbles; shock diamonds on spacecraft exhaust are omitted; surface mare lines on close-pass planet are stripped).
   - Planet radii and ring widths scale down automatically via Tailwind responsive classes (`sm:`, `md:`, `lg:`).
5. **Zero Layout Shifts (CLS) & Zero Overflow**:
   - SVGs have explicit `viewBox` coordinates and proportional sizing.
   - Background container enforces `overflow: hidden`, `width: 100%`, and `contain: paint`, preventing horizontal scrollbars on all device viewports.

---

## 6. How-To Guide: Adding New Space Entities & Tuning Speeds

### Adding a New Celestial Entity

1. **Create the Entity Component in `src/components/space/YourEntity.jsx`**:
   ```jsx
   import CelestialObject from './CelestialObject'

   export default function YourEntity({ progress, reduced = false }) {
     return (
       <CelestialObject
         progress={progress}
         // Set the scroll window [start, peakIn, peakOut, exit]
         range={[0.30, 0.40, 0.55, 0.65]}
         // Set the vertical parallax distance (GPU translate3d)
         yRange={[220, 20, -40, -240]}
         // Optional horizontal sway
         xRange={[40, 0, -20, -50]}
         // Optional opacity curve
         opacityRange={[0, 1, 1, 0]}
         className="absolute top-[35%] left-[8%]"
         reduced={reduced}
       >
         <svg viewBox="0 0 100 100" className="w-24 h-24">
           {/* Your SVG paths & gradients here */}
         </svg>
       </CelestialObject>
     )
   }
   ```

2. **Mount the Entity in `SpaceJourneyCanvas.jsx`**:
   Place it in the appropriate depth layer (Layer 1 Far Background, Layer 2 Midground, or Layer 3 Near Foreground):
   ```jsx
   import YourEntity from './YourEntity'

   // Inside SpaceJourneyCanvas:
   <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
     {/* ... */}
     <YourEntity progress={scrollYProgress} reduced={reduced} />
   </div>
   ```

### Tuning Parallax Speeds

Parallax speed is controlled by the ratio of vertical translation (`yRange`) to scroll range (`range`):
- **Far Background (0.02x – 0.05x)**: Translation of $\Delta y \approx 60\text{px} - 120\text{px}$ over a large range ($\Delta p \approx 0.50$).
- **Midground (0.10x – 0.25x)**: Translation of $\Delta y \approx 400\text{px} - 550\text{px}$ across an active range ($\Delta p \approx 0.30$).
- **Near Foreground (0.35x – 0.60x)**: Translation of $\Delta y \approx 700\text{px} - 900\text{px}$ across an active range ($\Delta p \approx 0.25$).

Adjust `yRange` and `range` in any entity to accelerate or decelerate its drift through the viewport.
