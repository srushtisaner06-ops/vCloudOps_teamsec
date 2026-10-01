# Antigravity Handoff & Architecture Log

This document tracks modifications made to the `vCloudOps` repository by the Antigravity agent, outlining architecture decisions, performance optimizations, and integration guidelines for future sessions.

---

## 1. Key Architectural Implementations

### A. Dynamic Particle Typography (`ParticleText.jsx` & `ParticleText.css`)
- **Canvas Particle Physics Engine**: Replaced static headline text with an interactive 2D canvas particle system.
- **360° Screen-Wide Scatter**: Particles originate across the entire screen perimeter rather than a localized box, converging along sinusoidal trajectory arcs into letter target coordinates.
- **Color Segmentation**:
  - Foundational words (*"Architect the"*, *"Deploy the"*) render in **Pure White** (`#FFFFFF`).
  - Tech accents (*"Cloud."*, *"Future."*) render in **Electric Blue** (`#0088FF`).
- **Mobile Responsive Adaptation**:
  - Automatically reformats to a 4-line layout on screens `<640px` (`"Architect the \n Cloud. \n Deploy the \n Future."`).
  - Upscaled font sizing (`clamp(1.9rem, 7.8vw, 2.5rem)`) with dense 2px sampling ensures solid, readable letter strokes on small screens.
  - Idle drift dampened on mobile (0.12px) to prevent small glyph distortion.
- **Interactive Physics**: Cursor/touch repulsion with rotational swirl and subtle Brownian harmonic idle drift.

### B. Cinematic Hero Entrance & Rolling Counters (`Hero.jsx`)
- **Synchronized Choreography**: The timeline begins as particle text settles (~1.75s), avoiding dead delay and orchestrating:
  - Floating island navbar slide-in with optical focus (`y: -24 -> 0`, blur clearing).
  - Tagline fade and blur resolution (`y: 18 -> 0`).
  - CTA buttons spring-in (`y: 26 -> 0`, `scale: 0.92 -> 1`, `back.out(1.18)`).
  - Primary CTA luminous cyan bloom (`0 0 35px rgba(56, 189, 248, 0.65)`).
  - Stats cards cascade with spring overshoot (`back.out(1.25)`) and illuminated neon border boot-up flash.
- **Live Metric Rolling Counters**:
  - Metrics animate dynamically on card arrival: `0 -> 40+`, `0 -> 12+`, `0 -> 6+`, `0 -> 100%`.
  - Formatted with `tabular-nums font-mono` to prevent width jitter during roll-up.

### C. Performance & Frame Rate Engineering (60+ FPS)
- **Eliminated CPU `shadowBlur`**: Replaced per-frame `ctx.shadowBlur` with pre-rendered offscreen GPU texture sprites (`createParticleSprite` + `ctx.drawImage`), eliminating canvas frame drop.
- **IntersectionObserver Suspension**: The particle animation loop pauses completely when scrolled offscreen.
- **Scroll Throttling**: Navbar scroll position detection is throttled with `window.requestAnimationFrame`.
- **Lenis Smooth Scroll Synchronization**: GSAP ticker coupled with Lenis smooth scroll and lag smoothing (`gsap.ticker.lagSmoothing(500, 33)`).

---

## 2. Upstream Git & Pull Request Status

- **Branch**: `sanskar`
- **Upstream Synchronization**: Pulled and merged `origin/main` (`fe12a17 feat: update the logo`), incorporating all new brand assets in `public/Logo/`, updating component logos, and cleanly resolving merge conflicts in `Hero.jsx`.
- **Pull Request**: Open and active on GitHub:
  - **PR Link**: [vCloudOps Pull Request #5](https://github.com/vCloudOps-x-AWS/vCloudOps/pull/5)
  - **Head**: `sanskar`
  - **Base**: `main`
  - **Merge State**: `mergeable: true` (0 conflicts)

---

## 3. Tooling & Development Standards

- **Dev Server**: Run on port 3000 (`npm run dev`) configured in `vite.config.js` to avoid PWA port 5173 collisions.
- **Linter**: Run `npm run lint` (`oxlint`). Must maintain 0 errors and 0 warnings.
- **Design Guidelines**: Always reference `design.md` for the *Ethereal Glass* design system (Double-Bezel architecture, Phosphor Icons, and color palettes).
