import CelestialObject from './CelestialObject'

/**
 * TerrestrialPlanet — Midground Inner-System World: "Ares Prime"
 * (z = -150px / Speed: 0.18x / Active: 15% - 45%)
 *
 * Emerges from the right lateral edge as the user transitions from Hero into the
 * About section. Features realistic terminator shadow curves, canyon rift systems,
 * impact crater rims, polar frost caps, and atmospheric limb scattering.
 */
export default function TerrestrialPlanet({ progress, reduced = false }) {
  return (
    <CelestialObject
      progress={progress}
      range={[0.13, 0.22, 0.36, 0.46]}
      yRange={[240, 40, -60, -260]}
      xRange={[50, 0, -15, -45]}
      opacityRange={[0, 0.95, 0.95, 0]}
      rotateRange={[0, 4, 8, 12]}
      scaleRange={[0.9, 1, 1, 0.92]}
      className="absolute top-[28%] right-[1%] sm:right-[5%] md:right-[7%]"
      reduced={reduced}
    >
      <div
        className="relative"
        style={{
          animation: 'planetFloat 14s ease-in-out infinite',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 280 280"
          className="w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64"
          style={{
            filter: 'drop-shadow(0 0 22px rgba(244, 63, 94, 0.25))',
            transform: 'translateZ(0)',
          }}
        >
          <defs>
            <clipPath id="aresClip">
              <circle cx="140" cy="140" r="130" />
            </clipPath>

            {/* Base spherical terrain gradient */}
            <radialGradient id="aresTerrain" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="25%" stopColor="#FB923C" />
              <stop offset="55%" stopColor="#EA580C" />
              <stop offset="80%" stopColor="#9A3412" />
              <stop offset="100%" stopColor="#431407" />
            </radialGradient>

            {/* Deep terminator shadow curve */}
            <linearGradient id="aresShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="42%" stopColor="transparent" />
              <stop offset="78%" stopColor="#1E0A05" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#0B0301" stopOpacity="0.96" />
            </linearGradient>

            {/* Canyon tectonic fracture glow */}
            <linearGradient id="canyonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C2D12" />
              <stop offset="50%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
          </defs>

          {/* Outer atmospheric Rayleigh scattering halo */}
          <circle
            cx="140"
            cy="140"
            r="133"
            fill="none"
            stroke="rgba(251, 146, 60, 0.45)"
            strokeWidth="2.5"
          />
          <circle
            cx="140"
            cy="140"
            r="136"
            fill="none"
            stroke="rgba(56, 189, 248, 0.22)"
            strokeWidth="3.5"
          />

          {/* Planet Body */}
          <g clipPath="url(#aresClip)">
            {/* Base spherical terrain */}
            <circle cx="140" cy="140" r="130" fill="url(#aresTerrain)" />

            {/* Polar Ice / Frost Cap (Top-Left) */}
            <path
              d="M 90 14 Q 140 32 190 14 Q 165 42 120 40 Q 95 35 90 14 Z"
              fill="#E0F2FE"
              opacity="0.88"
            />
            <path
              d="M 110 32 Q 140 44 170 32"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Major Canyon System: "Valles Borealis" (Winding rift network) */}
            <path
              d="M 50 120 Q 90 105 130 125 T 210 115 Q 240 130 270 120"
              fill="none"
              stroke="url(#canyonGlow)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M 55 121 Q 92 107 132 126 T 212 116 Q 242 131 268 121"
              fill="none"
              stroke="#2A0B03"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Canyon tributary branch */}
            <path
              d="M 125 125 Q 145 155 180 165"
              fill="none"
              stroke="#2A0B03"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Secondary Southern Tectonic Chasm */}
            <path
              d="M 80 185 Q 120 170 170 190 Q 210 195 240 180"
              fill="none"
              stroke="#7C2D12"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* ── Impact Basins & Retro Pixel Craters ── */}
            {/* Crater 1 (Upper central plateau) */}
            <g transform="translate(105, 80)">
              <ellipse cx="0" cy="0" rx="22" ry="18" fill="#3D1206" />
              <ellipse cx="-2" cy="-2" rx="19" ry="15" fill="#7C2D12" />
              <circle cx="-1" cy="-1" r="3.5" fill="#431407" />
              <path
                d="M -16 6 A 18 14 0 0 0 17 0"
                fill="none"
                stroke="#FED7AA"
                strokeWidth="2"
                opacity="0.85"
              />
            </g>

            {/* Crater 2 (Mid-lower right basin) */}
            <g transform="translate(195, 155)">
              <ellipse cx="0" cy="0" rx="26" ry="21" fill="#280B04" />
              <ellipse cx="-2" cy="-2" rx="23" ry="18" fill="#5E1D08" />
              <path
                d="M -20 7 A 22 17 0 0 0 21 0"
                fill="none"
                stroke="#FDBA74"
                strokeWidth="2.2"
                opacity="0.8"
              />
            </g>

            {/* Minor crater cluster */}
            <circle cx="65" cy="70" r="6" fill="#431407" />
            <circle cx="160" cy="60" r="7" fill="#431407" />
            <circle cx="85" cy="155" r="8" fill="#360E04" />

            {/* Terminator night shadow */}
            <circle cx="140" cy="140" r="130" fill="url(#aresShadow)" />

            {/* Specular sunlight crescent rim */}
            <path
              d="M 12 140 A 130 130 0 0 1 140 12 A 130 130 0 0 0 28 105 Z"
              fill="#FFFFFF"
              opacity="0.32"
            />
          </g>
        </svg>
      </div>
    </CelestialObject>
  )
}
