import CelestialObject from './CelestialObject'

/**
 * DistantGalaxy — Far Background Barred Spiral Galaxy (z = -400px / Speed: 0.03x)
 *
 * Renders a distant spiral galaxy with a radiant central galactic core,
 * spiraling stellar arms, and inter-arm dust lanes in deep mid-space.
 */
export default function DistantGalaxy({ progress, reduced = false }) {
  return (
    <CelestialObject
      progress={progress}
      range={[0.16, 0.26, 0.54, 0.68]}
      yRange={[70, 0, -40, -100]}
      xRange={[10, 0, -10, -25]}
      opacityRange={[0, 0.85, 0.85, 0]}
      scaleRange={[0.92, 1, 1, 0.94]}
      className="absolute top-[22%] left-[4%] sm:left-[9%] hidden sm:block"
      reduced={reduced}
    >
      <div
        className="relative"
        style={{
          animation: 'galaxyShimmer 12s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}
      >
        <svg
          viewBox="0 0 200 120"
          className="w-28 h-18 sm:w-36 sm:h-22 md:w-44 md:h-28"
          style={{
            filter: 'drop-shadow(0 0 16px rgba(125, 211, 252, 0.28))',
            transform: 'rotate(-28deg)',
          }}
        >
          <defs>
            {/* Radiant Galactic Nucleus Gradient */}
            <radialGradient id="galaxyCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#BAE6FD" />
              <stop offset="55%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#818CF8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Spiral Arm Haze Gradient */}
            <linearGradient id="armGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#818CF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <linearGradient id="armGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#C084FC" stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Diffuse Outer Stellar Disk */}
          <ellipse
            cx="100"
            cy="60"
            rx="85"
            ry="24"
            fill="none"
            stroke="rgba(125, 211, 252, 0.15)"
            strokeWidth="14"
            filter="blur(4px)"
          />

          {/* Spiral Arm Alpha */}
          <path
            d="M 100 60 Q 140 40 165 45 Q 185 55 175 75 Q 160 90 120 85"
            fill="none"
            stroke="url(#armGrad1)"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 100 60 Q 135 45 155 50 Q 170 60 160 72"
            fill="none"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Spiral Arm Beta (Opposite symmetric arm) */}
          <path
            d="M 100 60 Q 60 80 35 75 Q 15 65 25 45 Q 40 30 80 35"
            fill="none"
            stroke="url(#armGrad2)"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 100 60 Q 65 75 45 70 Q 30 60 40 48"
            fill="none"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Dark Dust Lanes between arms */}
          <path
            d="M 108 58 Q 145 42 160 52"
            fill="none"
            stroke="#050B18"
            strokeWidth="1.8"
            opacity="0.75"
          />
          <path
            d="M 92 62 Q 55 78 40 68"
            fill="none"
            stroke="#050B18"
            strokeWidth="1.8"
            opacity="0.75"
          />

          {/* Galactic Core Halo & Star Burst */}
          <ellipse cx="100" cy="60" rx="34" ry="18" fill="url(#galaxyCore)" />
          <ellipse cx="100" cy="60" rx="14" ry="7" fill="#FFFFFF" opacity="0.95" />

          {/* Satellite Globular Star Clusters */}
          <circle cx="168" cy="46" r="1.5" fill="#FFFFFF" opacity="0.8" />
          <circle cx="152" cy="74" r="1.2" fill="#BAE6FD" opacity="0.7" />
          <circle cx="32" cy="74" r="1.5" fill="#FFFFFF" opacity="0.8" />
          <circle cx="48" cy="46" r="1.2" fill="#BAE6FD" opacity="0.7" />
        </svg>
      </div>
    </CelestialObject>
  )
}
