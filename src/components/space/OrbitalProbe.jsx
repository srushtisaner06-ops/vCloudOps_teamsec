import CelestialObject from './CelestialObject'

/**
 * OrbitalProbe — Passing Deep-Space Telemetry Relay Satellite (z = -100px / Speed: 0.18x / Active: 15% - 45%)
 *
 * Detailed orbital probe with gold foil thermal shielding, bilateral photovoltaic solar arrays,
 * parabolic high-gain communication dish, and an active pulsing telemetry LED beacon.
 */
export default function OrbitalProbe({ progress, reduced = false }) {
  return (
    <CelestialObject
      progress={progress}
      range={[0.16, 0.24, 0.38, 0.45]}
      yRange={[210, 30, -50, -250]}
      xRange={[60, 10, -25, -70]}
      opacityRange={[0, 0.95, 0.95, 0]}
      rotateRange={[-8, -5, -2, 2]}
      className="absolute top-[20%] right-[10%] sm:right-[20%] md:right-[26%]"
      reduced={reduced}
    >
      <div
        className="relative"
        style={{
          animation: reduced ? 'none' : 'floatOrbit3 18s ease-in-out infinite',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 140 90"
          className="w-20 h-14 sm:w-28 sm:h-18 md:w-32 md:h-22"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.35))',
            transform: 'translateZ(0)',
          }}
        >
          <defs>
            {/* Gold MLI Insulation Gradient */}
            <linearGradient id="goldMli" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="80%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Solar Array Cell Gradient */}
            <linearGradient id="solarPanel" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>

          {/* ── Solar Array Left Wing ── */}
          <g transform="translate(10, 35)">
            <rect
              x="0"
              y="0"
              width="36"
              height="20"
              rx="2"
              fill="url(#solarPanel)"
              stroke="#0369A1"
              strokeWidth="1.2"
            />
            {/* Grid dividers */}
            <line x1="12" y1="0" x2="12" y2="20" stroke="#0C4A6E" strokeWidth="1" />
            <line x1="24" y1="0" x2="24" y2="20" stroke="#0C4A6E" strokeWidth="1" />
            <line x1="0" y1="10" x2="36" y2="10" stroke="#0C4A6E" strokeWidth="1" />
            {/* Specular panel rim */}
            <line x1="0" y1="1" x2="36" y2="1" stroke="#BAE6FD" strokeWidth="1" opacity="0.7" />
            {/* Wing boom mount */}
            <line x1="36" y1="10" x2="45" y2="10" stroke="#94A3B8" strokeWidth="2.5" />
          </g>

          {/* ── Solar Array Right Wing ── */}
          <g transform="translate(94, 35)">
            <line x1="0" y1="10" x2="9" y2="10" stroke="#94A3B8" strokeWidth="2.5" />
            <rect
              x="9"
              y="0"
              width="36"
              height="20"
              rx="2"
              fill="url(#solarPanel)"
              stroke="#0369A1"
              strokeWidth="1.2"
            />
            <line x1="21" y1="0" x2="21" y2="20" stroke="#0C4A6E" strokeWidth="1" />
            <line x1="33" y1="0" x2="33" y2="20" stroke="#0C4A6E" strokeWidth="1" />
            <line x1="9" y1="10" x2="45" y2="10" stroke="#0C4A6E" strokeWidth="1" />
            <line x1="9" y1="1" x2="45" y2="1" stroke="#BAE6FD" strokeWidth="1" opacity="0.7" />
          </g>

          {/* ── Main Avionics Satellite Bus (Center) ── */}
          <polygon
            points="58,30 82,30 90,45 82,60 58,60 50,45"
            fill="url(#goldMli)"
            stroke="#FDE68A"
            strokeWidth="1.2"
          />
          {/* Internal panel lines */}
          <line x1="58" y1="30" x2="82" y2="60" stroke="#78350F" strokeWidth="0.8" opacity="0.6" />
          <line x1="82" y1="30" x2="58" y2="60" stroke="#78350F" strokeWidth="0.8" opacity="0.6" />

          {/* ── Parabolic High-Gain Dish Antenna (Facing Earth) ── */}
          <path
            d="M 60 22 Q 70 12 80 22"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line x1="70" y1="17" x2="70" y2="30" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="70" cy="16" r="2.5" fill="#38BDF8" />

          {/* ── Telemetry LED Status Beacon ── */}
          <circle
            cx="70"
            cy="45"
            r="3"
            fill="#38BDF8"
            style={{
              animation: reduced ? 'none' : 'telemetryPulse 2.2s infinite ease-in-out',
            }}
          />
          <circle cx="70" cy="45" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>
    </CelestialObject>
  )
}
