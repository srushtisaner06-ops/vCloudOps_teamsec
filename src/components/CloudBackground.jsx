import { useState, useEffect, useId, useMemo } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/* ══════════════════════════════════════════════════════════════════════════════
   CloudBackground — Pure SVG Perlin-Noise Edition
   ──────────────────────────────────────────────────────────────────────────────

   HOW IT WORKS — 5-step SVG filter chain per cloud:

   ① feGaussianBlur      → Softly merges overlapping gradient-filled ellipses
                           into smooth, connected cloud mass (metaball effect).

   ② feColorMatrix       → Alpha-threshold: A′ = 22·A − 9
                           Pixels with A > 0.41 survive; below = transparent.
                           Result: an organic, merged cloud silhouette.

   ③ feTurbulence        → Generates fractal Perlin noise (type="fractalNoise").
                           Each cloud variant uses a unique `seed` so every cloud
                           has a completely different organic shape from the noise.

   ④ feDisplacementMap   → Uses the Perlin noise to physically warp (displace)
                           the cloud silhouette — this is EXACTLY the same
                           algorithm used in film VFX (Houdini, Nuke) for
                           cloud edge generation. Creates bumpy, non-geometric
                           natural cloud edges.

   ⑤ feGaussianBlur      → Final 2px soft blur to smooth the displaced edges.

   Result: genuinely organic cloud shapes that look hand-painted / photographic.

   PARALLAX: Three layers (far/mid/near) animate a 200%-wide seamless strip
   using CSS translateX (GPU-only) at different speeds for depth illusion.
══════════════════════════════════════════════════════════════════════════════ */

/* ── Cloud shape definitions ────────────────────────────────────────────────
   Each variant = a different arrangement of ellipses.
   The turbulence (unique seed per variant) warps them into distinct shapes.
   Carefully tuned ellipse positions to produce realistic cumulus formations.
─────────────────────────────────────────────────────────────────────────── */
const CLOUD_VARIANTS = [
  // ── 0: Large Dramatic Cumulus ──────────────────────────────────────────────
  {
    vw: 420, vh: 200,
    seed: 42, dispScale: 24,
    els: [
      { cx: 210, cy: 150, rx: 188, ry: 60 },  // sprawling base
      { cx: 200, cy: 112, rx: 112, ry: 86 },  // main dome
      { cx: 128, cy: 122, rx: 82,  ry: 70 },  // left lobe
      { cx: 278, cy: 120, rx: 90,  ry: 66 },  // right lobe
      { cx: 152, cy: 90,  rx: 66,  ry: 60 },  // left upper dome
      { cx: 255, cy: 92,  rx: 72,  ry: 58 },  // right upper dome
      { cx: 200, cy: 70,  rx: 54,  ry: 54 },  // center peak
      { cx: 168, cy: 52,  rx: 38,  ry: 36 },  // left mini-peak
      { cx: 230, cy: 55,  rx: 40,  ry: 36 },  // right mini-peak
      { cx: 200, cy: 36,  rx: 26,  ry: 28 },  // apex
    ],
    hl: { cx: 162, cy: 72, rx: 74, ry: 40 },
  },

  // ── 1: Wide Stratus-Cumulus ───────────────────────────────────────────────
  {
    vw: 560, vh: 168,
    seed: 17, dispScale: 20,
    els: [
      { cx: 280, cy: 120, rx: 255, ry: 52 },  // sprawling base
      { cx: 162, cy: 94,  rx: 104, ry: 68 },  // left dome
      { cx: 340, cy: 90,  rx: 112, ry: 66 },  // right dome
      { cx: 58,  cy: 110, rx: 60,  ry: 44 },  // far left lobe
      { cx: 495, cy: 108, rx: 65,  ry: 42 },  // far right lobe
      { cx: 160, cy: 70,  rx: 74,  ry: 48 },  // left peak
      { cx: 342, cy: 67,  rx: 78,  ry: 46 },  // right peak
      { cx: 252, cy: 60,  rx: 58,  ry: 40 },  // center peak
      { cx: 200, cy: 46,  rx: 40,  ry: 30 },  // left upper
      { cx: 308, cy: 45,  rx: 42,  ry: 30 },  // right upper
    ],
    hl: { cx: 218, cy: 64, rx: 122, ry: 34 },
  },

  // ── 2: Compact Fluffy Puff ────────────────────────────────────────────────
  {
    vw: 290, vh: 160,
    seed: 31, dispScale: 22,
    els: [
      { cx: 145, cy: 114, rx: 120, ry: 50 },  // base
      { cx: 140, cy: 84,  rx: 78,  ry: 64 },  // dome
      { cx: 84,  cy: 96,  rx: 58,  ry: 48 },  // left lobe
      { cx: 196, cy: 94,  rx: 62,  ry: 46 },  // right lobe
      { cx: 102, cy: 68,  rx: 50,  ry: 44 },  // left upper
      { cx: 180, cy: 70,  rx: 54,  ry: 42 },  // right upper
      { cx: 142, cy: 54,  rx: 44,  ry: 40 },  // top
      { cx: 118, cy: 40,  rx: 30,  ry: 28 },  // left peak
      { cx: 164, cy: 42,  rx: 32,  ry: 28 },  // right peak
    ],
    hl: { cx: 120, cy: 64, rx: 54, ry: 30 },
  },

  // ── 3: Multi-Tower Cumulonimbus ───────────────────────────────────────────
  {
    vw: 410, vh: 265,
    seed: 58, dispScale: 28,
    els: [
      { cx: 205, cy: 196, rx: 182, ry: 64 },  // wide base
      { cx: 120, cy: 154, rx: 86,  ry: 78 },  // left tower
      { cx: 205, cy: 145, rx: 80,  ry: 88 },  // center tower
      { cx: 288, cy: 155, rx: 84,  ry: 74 },  // right tower
      { cx: 120, cy: 110, rx: 60,  ry: 58 },  // left tower mid
      { cx: 205, cy: 98,  rx: 58,  ry: 68 },  // center tower mid
      { cx: 286, cy: 112, rx: 58,  ry: 52 },  // right tower mid
      { cx: 120, cy: 72,  rx: 44,  ry: 46 },  // left tower top
      { cx: 205, cy: 60,  rx: 42,  ry: 55 },  // center tower top
      { cx: 284, cy: 78,  rx: 44,  ry: 42 },  // right tower top
      { cx: 205, cy: 28,  rx: 30,  ry: 38 },  // apex
      { cx: 178, cy: 20,  rx: 22,  ry: 22 },  // left apex
      { cx: 232, cy: 22,  rx: 24,  ry: 22 },  // right apex
    ],
    hl: { cx: 168, cy: 64, rx: 68, ry: 38 },
  },

  // ── 4: Wispy Cirrus Streaks ───────────────────────────────────────────────
  {
    vw: 540, vh: 110,
    seed: 73, dispScale: 14,
    els: [
      { cx: 270, cy: 72,  rx: 248, ry: 36 },  // elongated base
      { cx: 145, cy: 58,  rx: 88,  ry: 42 },  // left lobe
      { cx: 375, cy: 56,  rx: 94,  ry: 40 },  // right lobe
      { cx: 52,  cy: 68,  rx: 52,  ry: 28 },  // far left wisp
      { cx: 482, cy: 66,  rx: 56,  ry: 26 },  // far right wisp
      { cx: 142, cy: 44,  rx: 58,  ry: 30 },  // left crest
      { cx: 378, cy: 42,  rx: 62,  ry: 28 },  // right crest
      { cx: 265, cy: 38,  rx: 46,  ry: 24 },  // center crest
    ],
    hl: { cx: 215, cy: 46, rx: 106, ry: 22 },
  },
]

/* ── Single Cloud SVG ────────────────────────────────────────────────────── */
function Cloud({ variant = 0, scale = 1, opacity = 0.85, dimmed = false }) {
  const rawId  = useId()
  const uid    = rawId.replace(/[^a-z0-9]/gi, 'x')
  const def    = CLOUD_VARIANTS[variant % CLOUD_VARIANTS.length]
  const { vw, vh, els, hl, seed, dispScale } = def

  const fid  = `f${uid}`   // filter
  const bgid = `b${uid}`   // body gradient
  const hlid = `h${uid}`   // highlight gradient
  const shid = `s${uid}`   // shadow gradient

  /* Gradient colour palette:
     dimmed = far-layer clouds — cool, muted, desaturated
     normal = mid/near clouds  — bright blue-white atmospheric */
  const stops = dimmed
    ? [
        { off: '0%',   col: '#B8CCEC', op: 0.65 },
        { off: '28%',  col: '#8AAED0', op: 0.50 },
        { off: '62%',  col: '#5880A8', op: 0.32 },
        { off: '100%', col: '#2E4868', op: 0.08 },
      ]
    : [
        { off: '0%',   col: '#EEF7FF', op: 0.96 },
        { off: '18%',  col: '#D2E8FF', op: 0.90 },
        { off: '45%',  col: '#98C2E2', op: 0.76 },
        { off: '74%',  col: '#5888B8', op: 0.48 },
        { off: '100%', col: '#365E88', op: 0.16 },
      ]

  return (
    <svg
      width={vw * scale}
      height={vh * scale}
      viewBox={`0 0 ${vw} ${vh}`}
      style={{ overflow: 'visible', opacity, display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        {/* ╔════════════════════════════════════════════════════════════╗
            ║  5-STEP CLOUD FILTER CHAIN                                ║
            ╠════════════════════════════════════════════════════════════╣
            ║  ① Blur  — merge ellipses into smooth blob               ║
            ║  ② Threshold — clean silhouette from merged blob         ║
            ║  ③ Turbulence — Perlin fractal noise (unique per variant) ║
            ║  ④ Displace — warp silhouette with noise = bumpy edges   ║
            ║  ⑤ Blur  — final edge smoothing                          ║
            ╚════════════════════════════════════════════════════════════╝ */}
        <filter
          id={fid}
          x="-30%" y="-35%"
          width="160%" height="170%"
          colorInterpolationFilters="sRGB"
        >
          {/* ① Merge overlapping ellipses into smooth cloud mass */}
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="12"
            result="blob"
          />

          {/* ② Alpha-threshold: A′ = 22·A − 9 → silhouette with soft falloff */}
          <feColorMatrix
            in="blob"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 22 -9"
            result="silhouette"
          />

          {/* ③ Perlin fractal noise — unique seed per cloud variant */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022 0.015"
            numOctaves="4"
            seed={seed}
            result="noise"
          />

          {/* ④ Displace the silhouette using the noise → organic bumpy edges */}
          <feDisplacementMap
            in="silhouette"
            in2="noise"
            scale={dispScale}
            xChannelSelector="R"
            yChannelSelector="G"
            result="warped"
          />

          {/* ⑤ Smooth the displaced edges */}
          <feGaussianBlur
            in="warped"
            stdDeviation="2.2"
          />
        </filter>

        {/* Body gradient — lit from upper-left (moon/ambient light source) */}
        <radialGradient
          id={bgid}
          cx={vw * 0.36} cy={vh * 0.24}
          r={vw * 0.76}
          fx={vw * 0.30} fy={vh * 0.17}
          gradientUnits="userSpaceOnUse"
        >
          {stops.map(s => (
            <stop key={s.off} offset={s.off} stopColor={s.col} stopOpacity={s.op} />
          ))}
        </radialGradient>

        {/* Highlight — white screen-blend on the lit upper face */}
        <radialGradient id={hlid} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="white" stopOpacity={dimmed ? 0.22 : 0.52} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Drop shadow beneath the cloud */}
        <radialGradient id={shid} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#020912" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#020912" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Cast shadow below cloud */}
      <ellipse
        cx={vw * 0.50} cy={vh * 0.97}
        rx={vw * 0.44} ry={vh * 0.11}
        fill={`url(#${shid})`}
      />

      {/* ── Cloud body ──
          Gradient-filled ellipses → blur (merge) → threshold (silhouette)
          → Perlin displacement (organic bumps) → final smooth            */}
      <g filter={`url(#${fid})`}>
        {els.map((e, i) => (
          <ellipse
            key={i}
            cx={e.cx} cy={e.cy}
            rx={e.rx} ry={e.ry}
            fill={`url(#${bgid})`}
          />
        ))}
      </g>

      {/* Top-face highlight — simulates moonlight catching the cloud dome */}
      <ellipse
        cx={hl.cx} cy={hl.cy}
        rx={hl.rx} ry={hl.ry}
        fill={`url(#${hlid})`}
        style={{ mixBlendMode: 'screen' }}
      />
    </svg>
  )
}

/* ── Seamless parallax drift strip ──────────────────────────────────────────
   200%-wide div animates from translateX(0) → translateX(−50%).
   Two identical half-tiles fill the full viewport at all times → zero jump.
─────────────────────────────────────────────────────────────────────────── */
function CloudStrip({ clouds, animName, duration }) {
  return (
    <div
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '200%', height: '100%',
        display: 'flex',
        animation: `${animName} ${duration}s linear infinite`,
        willChange: 'transform',
      }}
    >
      {[0, 1].map(pass => (
        <div
          key={pass}
          style={{ position: 'relative', width: '50%', height: '100%', flexShrink: 0 }}
        >
          {clouds.map((c, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: c.left,
                top: c.top,
                filter: c.blur ? `blur(${c.blur}px)` : undefined,
                pointerEvents: 'none',
              }}
            >
              <Cloud
                variant={c.variant}
                scale={c.scale}
                opacity={c.opacity}
                dimmed={c.dimmed ?? false}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ── Twinkling celestial star field & shooting stars ──────────────────────── */
function StarField({ count = 400 }) {
  const { microStars, midStars, flareStars, shootingStars } = useMemo(() => {
    const micro = []
    const mid = []
    const flare = []

    for (let i = 0; i < count; i++) {
      // Natural sky distribution: spans atmosphere with organic falloff
      const rawY = Math.random()
      const y = Math.pow(rawY, 1.22) * 84
      const x = Math.random() * 100

      if (i < 165) {
        // Micro stardust — soft, ambient celestial shimmer
        micro.push({
          id: `m-${i}`,
          x, y,
          r: 0.35 + Math.random() * 0.45,
          delay: Math.random() * 4,
          dur: 2.2 + Math.random() * 2.8,
          color: Math.random() > 0.4 ? '#FFFFFF' : '#8EC5FF',
        })
      } else if (i < 242) {
        // Medium stars — crisp sparkling celestial points
        const colorPalette = ['#FFFFFF', '#E6F3FF', '#B8D4FF', '#4CD6FF', '#FFF8E7']
        mid.push({
          id: `mid-${i}`,
          x, y,
          r: 0.75 + Math.random() * 0.7,
          delay: Math.random() * 3.5,
          dur: 1.8 + Math.random() * 2.2,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          anim: Math.random() > 0.45 ? 'twinkleSparkle' : 'twinkle',
        })
      } else {
        // Beacon flare stars — clean high-magnitude stars with 4-point cross diffraction
        flare.push({
          id: `f-${i}`,
          x, y,
          r: 1.6 + Math.random() * 0.7,
          delay: Math.random() * 4,
          dur: 2.2 + Math.random() * 2.5,
          color: Math.random() > 0.35 ? '#FFFFFF' : '#4CD6FF',
        })
      }
    }

    // 3 elegant shooting stars with calm, spaced intervals
    const shooting = [
      { id: 'ss-1', left: '12%', top: '7%',  dur: 8,  delay: 2 },
      { id: 'ss-2', left: '50%', top: '14%', dur: 11, delay: 6.5 },
      { id: 'ss-3', left: '76%', top: '5%',  dur: 9,  delay: 11 },
    ]

    return { microStars: micro, midStars: mid, flareStars: flare, shootingStars: shooting }
  }, [count])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* ── SVG Star Field ── */}
      <svg
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Radial flare glow for prominent stars */}
          <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4CD6FF" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#8EC5FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4CD6FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layer 1: Micro stardust */}
        {microStars.map(s => (
          <circle
            key={s.id}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill={s.color}
            style={{
              animation: `twinkleSoft ${s.dur}s ease-in-out ${s.delay}s infinite`,
              transformOrigin: `${s.x}% ${s.y}%`,
            }}
          />
        ))}

        {/* Layer 2: Medium sparkling stars */}
        {midStars.map(s => (
          <circle
            key={s.id}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill={s.color}
            style={{
              animation: `${s.anim} ${s.dur}s ease-in-out ${s.delay}s infinite`,
              transformOrigin: `${s.x}% ${s.y}%`,
            }}
          />
        ))}

        {/* Layer 3: High-magnitude flare stars with 4-point diffraction cross */}
        {flareStars.map(s => (
          <g
            key={s.id}
            style={{
              animation: `twinkleGlow ${s.dur}s ease-in-out ${s.delay}s infinite`,
              transformOrigin: `${s.x}% ${s.y}%`,
            }}
          >
            {/* Halo glow */}
            <circle
              cx={`${s.x}%`}
              cy={`${s.y}%`}
              r={s.r * 3.8}
              fill="url(#beaconGlow)"
            />

            {/* 4-point cross diffraction spikes */}
            <line
              x1={`calc(${s.x}% - ${s.r * 3.2}px)`}
              y1={`${s.y}%`}
              x2={`calc(${s.x}% + ${s.r * 3.2}px)`}
              y2={`${s.y}%`}
              stroke={s.color}
              strokeWidth="0.8"
              strokeOpacity="0.75"
              strokeLinecap="round"
            />
            <line
              x1={`${s.x}%`}
              y1={`calc(${s.y}% - ${s.r * 3.2}px)`}
              x2={`${s.x}%`}
              y2={`calc(${s.y}% + ${s.r * 3.2}px)`}
              stroke={s.color}
              strokeWidth="0.8"
              strokeOpacity="0.75"
              strokeLinecap="round"
            />

            {/* Core star center */}
            <circle
              cx={`${s.x}%`}
              cy={`${s.y}%`}
              r={s.r}
              fill="#FFFFFF"
            />
          </g>
        ))}
      </svg>

      {/* ── Shooting Stars ── */}
      {shootingStars.map(ss => (
        <div
          key={ss.id}
          style={{
            position: 'absolute',
            left: ss.left,
            top: ss.top,
            width: 140,
            height: 2,
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(76,214,255,0.6) 40%, rgba(255,255,255,0.95) 100%)',
            borderRadius: 999,
            filter: 'drop-shadow(0 0 6px rgba(76,214,255,0.8))',
            animation: `shootingStar ${ss.dur}s linear ${ss.delay}s infinite`,
            transformOrigin: 'left center',
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   Main CloudBackground export
   Three parallax layers:
     FAR  — slow 80s, CSS-blurred, dimmed palette  → hazy distant clouds
     MID  — medium 50s, slight blur                → main cloud mass
     NEAR — fast 30s, sharp, full opacity          → foreground clouds
══════════════════════════════════════════════════════════════════════════ */
export default function CloudBackground() {
  const reduced = useReducedMotion()

  /* Reactive screen width detection to adapt cloud size, distance & speed */
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  useEffect(() => {
    let timeoutId
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth)
      }, 60)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isMobile = windowWidth < 640
  const isTablet = windowWidth >= 640 && windowWidth < 1024

  /* ══════════════════════════════════════════════════════════════════════
     RESPONSIVE CLOUD ARCHITECTURE:
     - On mobile (<640px): 2 clouds per layer, scaled down ~50%, spaced
       wide apart (50%+ distance = 200px+ gap) so they NEVER overlap.
     - On tablet (640-1024px): 3 clouds with balanced separation.
     - On desktop (>=1024px): 4 cinematic multi-layer cloud formations.
  ══════════════════════════════════════════════════════════════════════ */

  /* FAR clouds — hazy distant atmosphere */
  const farClouds = useMemo(() => {
    if (isMobile) {
      return [
        { variant: 1, scale: 0.65, opacity: 0.28, blur: 5, dimmed: true, left: '6%',  top: '4%'  },
        { variant: 0, scale: 0.60, opacity: 0.25, blur: 5, dimmed: true, left: '60%', top: '10%' },
      ]
    }
    if (isTablet) {
      return [
        { variant: 1, scale: 1.05, opacity: 0.30, blur: 6, dimmed: true, left: '4%',  top: '4%' },
        { variant: 4, scale: 0.85, opacity: 0.22, blur: 7, dimmed: true, left: '40%', top: '2%' },
        { variant: 0, scale: 1.15, opacity: 0.26, blur: 6, dimmed: true, left: '74%', top: '6%' },
      ]
    }
    return [
      { variant: 1, scale: 1.50, opacity: 0.30, blur: 6, dimmed: true,  left: '0%',  top: '4%'  },
      { variant: 4, scale: 1.20, opacity: 0.22, blur: 8, dimmed: true,  left: '30%', top: '1%'  },
      { variant: 0, scale: 1.75, opacity: 0.28, blur: 6, dimmed: true,  left: '56%', top: '7%'  },
      { variant: 2, scale: 1.10, opacity: 0.18, blur: 9, dimmed: true,  left: '82%', top: '2%'  },
    ]
  }, [isMobile, isTablet])

  /* MID clouds — main cloud body */
  const midClouds = useMemo(() => {
    if (isMobile) {
      return [
        { variant: 0, scale: 0.52, opacity: 0.58, blur: 1.5, dimmed: false, left: '8%',  top: '26%' },
        { variant: 3, scale: 0.46, opacity: 0.50, blur: 1.5, dimmed: false, left: '62%', top: '32%' },
      ]
    }
    if (isTablet) {
      return [
        { variant: 0, scale: 0.80, opacity: 0.60, blur: 2, dimmed: false, left: '6%',  top: '22%' },
        { variant: 1, scale: 0.70, opacity: 0.52, blur: 2, dimmed: false, left: '42%', top: '18%' },
        { variant: 3, scale: 0.65, opacity: 0.48, blur: 1.5, dimmed: false, left: '76%', top: '26%' },
      ]
    }
    return [
      { variant: 0, scale: 1.12, opacity: 0.62, blur: 2, dimmed: false, left: '2%',  top: '24%' },
      { variant: 1, scale: 0.92, opacity: 0.55, blur: 2, dimmed: false, left: '32%', top: '16%' },
      { variant: 3, scale: 0.82, opacity: 0.52, blur: 1, dimmed: false, left: '60%', top: '28%' },
      { variant: 4, scale: 1.05, opacity: 0.45, blur: 2, dimmed: false, left: '84%', top: '18%' },
    ]
  }, [isMobile, isTablet])

  /* NEAR clouds — foreground drift */
  const nearClouds = useMemo(() => {
    if (isMobile) {
      return [
        { variant: 2, scale: 0.42, opacity: 0.82, blur: 0, dimmed: false, left: '4%',  top: '56%' },
        { variant: 1, scale: 0.38, opacity: 0.72, blur: 0, dimmed: false, left: '56%', top: '64%' },
      ]
    }
    if (isTablet) {
      return [
        { variant: 2, scale: 0.58, opacity: 0.82, blur: 0, dimmed: false, left: '2%',  top: '52%' },
        { variant: 0, scale: 0.54, opacity: 0.76, blur: 0, dimmed: false, left: '38%', top: '58%' },
        { variant: 1, scale: 0.50, opacity: 0.70, blur: 0, dimmed: false, left: '72%', top: '50%' },
      ]
    }
    return [
      { variant: 2, scale: 0.76, opacity: 0.85, blur: 0, dimmed: false, left: '-1%', top: '50%' },
      { variant: 0, scale: 0.70, opacity: 0.78, blur: 0, dimmed: false, left: '26%', top: '58%' },
      { variant: 1, scale: 0.65, opacity: 0.72, blur: 0, dimmed: false, left: '56%', top: '48%' },
      { variant: 2, scale: 0.74, opacity: 0.80, blur: 0, dimmed: false, left: '83%', top: '54%' },
    ]
  }, [isMobile, isTablet])

  /* Drift speeds tuned per viewport:
     On mobile, durations are adjusted to 55s / 36s / 22s for smooth,
     cinematic motion across smaller viewports */
  const dur = reduced
    ? { far: 99999, mid: 99999, near: 99999 }
    : isMobile
    ? { far: 55, mid: 36, near: 22 }
    : isTablet
    ? { far: 68, mid: 44, near: 26 }
    : { far: 80, mid: 50, near: 30 }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #020912 0%, #050B18 28%, #0A1730 62%, #071020 100%)',
        pointerEvents: 'none',
      }}
    >
      {/* Stars */}
      <StarField count={260} />

      {/* Ambient moon-glow from top */}
      <div style={{
        position: 'absolute', top: '-6%', left: '50%',
        transform: 'translateX(-50%)',
        width: '90vw', height: '65vh',
        background: 'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(142,197,255,0.09) 0%, transparent 100%)',
      }} />

      {/* Horizon atmospheric cyan glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        width: '130vw', height: '45vh',
        background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(76,214,255,0.035) 0%, transparent 100%)',
      }} />

      {/* Layer 1 — Far */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <CloudStrip clouds={farClouds}  animName="driftSlow" duration={dur.far}  />
      </div>

      {/* Layer 2 — Mid */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <CloudStrip clouds={midClouds}  animName="driftMid"  duration={dur.mid}  />
      </div>

      {/* Layer 3 — Near */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <CloudStrip clouds={nearClouds} animName="driftFast" duration={dur.near} />
      </div>

      {/* Bottom vignette */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '38vh',
        background: 'linear-gradient(to top, #020912 0%, transparent 100%)',
      }} />

      {/* Top vignette */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '12vh',
        background: 'linear-gradient(to bottom, #020912 0%, transparent 100%)',
      }} />
    </div>
  )
}
