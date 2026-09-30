# vCloudOps Design Consistency Guide

## 1. Visual Archetype: Ethereal Glass
The webpage employs an "Ethereal Glass" visual archetype, designed to convey a premium, production-grade cloud infrastructure aesthetic without looking "AI-generated".

### Core Principles
- **Deep Void Backgrounds**: The base color is a deep OLED cosmic navy/midnight (`#050505`, `#020612`).
- **Minimalist Geometry**: Avoid basic heavy shadows. Rely on custom cubic-bezier animations, ultra-light strokes, and strategic glowing accents.
- **Vantablack Surfaces**: Floating elements use dark, semi-transparent backgrounds with heavy backdrop blurs (e.g., `backdrop-blur-2xl`, `bg-[#050505]/90`).

## 2. Typography
- **Primary Font**: `Plus Jakarta Sans`
  - Replaces generic defaults (like Inter or Arial).
  - Used for massive Grotesk headlines and UI elements.
- **Hierarchy**:
  - **Headlines**: Massive, high-contrast, `font-extrabold`. Uses precise letter-spacing (`tracking-tight`).
  - **Accents/Eyebrows**: Uppercase, heavily tracked (`tracking-[0.25em]`), often using `font-medium` or `font-bold`.
  - **Subtext**: Slate colors (`text-slate-300`, `text-slate-400`), highly readable `font-medium`.

## 3. Component Architecture
- **Fluid Island Navbar**: 
  - A detached glass pill floating at the top.
  - Interactive states use custom GSAP morphs.
- **Double-Bezel Cards (Doppelrand)**:
  - An outer shell: `p-1.5`, `rounded-[2rem]`, `bg-white/5`, `border border-white/10`.
  - An inner core: tighter radius (`rounded-[calc(2rem-0.375rem)]`), nested background `bg-[#050505]/90`, and an inner highlight `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`.
- **Button-in-Button CTA**:
  - Primary actions feature a nested circular icon wrapper that translates and scales independently on hover.
- **Typography Badges**:
  - Uncontained, clean floating text with custom glows (e.g., `drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]`).

## 4. Motion & Animation (GSAP)
- **Zero Static Entry**: No elements statically exist on page load. Everything must resolve into view.
- **Cinematic Interpolation**: Standard linear/ease-in-out CSS transitions are avoided. Use custom `cubic-bezier(0.32,0.72,0,1)` or GSAP `power4.out`.
- **ScrollTrigger Kinetics**: Elements (like the AboutTeaser Bento Grid) trigger sequentially with `y` translation and `blur` resolution as they enter the viewport.

## 5. Iconography
- **Phosphor Icons**: Standard thick SVGs (like Lucide) are banned. Use `@phosphor-icons/react` for ultra-fine, premium linework.

By adhering to these rules, the vCloudOps website maintains a bespoke, high-end feel that stands out from generic UI templates.
