import CelestialObject from './CelestialObject'

/**
 * SpacecraftRocket — Near Foreground Directional Vector Thrust Vessel
 * (z = +80px / Speed: 0.52x / Active: 72% - 98%)
 *
 * Futuristic deep-space rocket / reconnaissance craft traveling along an eased diagonal
 * path toward the operational footer. Features a directional vector thruster with
 * brilliant cyan plasma core, engine bloom, and throttled exhaust plume.
 */
export default function SpacecraftRocket({ progress, isMobile = false, reduced = false }) {
  return (
    <CelestialObject
      progress={progress}
      range={[0.72, 0.80, 0.92, 0.99]}
      yRange={[320, 40, -90, -340]}
      xRange={[-100, 10, 80, 160]}
      opacityRange={[0, 0.95, 0.95, 0]}
      rotateRange={[-32, -30, -28, -26]}
      scaleRange={[0.88, 1, 1, 0.92]}
      className="absolute top-[68%] left-[8%] sm:left-[16%] md:left-[22%]"
      reduced={reduced}
    >
      <div className="relative pointer-events-none select-none flex items-center">
        {/* ── 1. Throttled Directional Vector Thrust Exhaust Wake ── */}
        {!reduced && (
          <div
            className="absolute -left-28 sm:-left-36 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              animation: 'enginePlasmaPulse 1.8s ease-in-out infinite',
              willChange: 'transform, opacity',
            }}
          >
            <svg
              viewBox="0 0 160 50"
              className="w-28 h-8 sm:w-36 sm:h-11"
              style={{ filter: 'drop-shadow(0 0 14px rgba(56, 189, 248, 0.85))' }}
            >
              <defs>
                <linearGradient id="exhaustGrad" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="20%" stopColor="#67E8F9" />
                  <stop offset="55%" stopColor="#0284C7" stopOpacity="0.7" />
                  <stop offset="85%" stopColor="#1D4ED8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="shockDiamond" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Main Plasma Thrust Cone */}
              <polygon points="160,25 0,16 0,34" fill="url(#exhaustGrad)" />

              {/* Supersonic Shock Diamonds (Omitted on mobile) */}
              {!isMobile && (
                <>
                  <polygon points="152,25 138,20 128,25 138,30" fill="url(#shockDiamond)" />
                  <polygon points="120,25 108,21 98,25 108,29" fill="url(#shockDiamond)" opacity="0.8" />
                  <polygon points="90,25 80,22 72,25 80,28" fill="url(#shockDiamond)" opacity="0.6" />
                </>
              )}
            </svg>
          </div>
        )}

        {/* ── 2. Spacecraft Hull & Cockpit ── */}
        <svg
          viewBox="0 0 200 100"
          className="w-32 h-16 sm:w-44 sm:h-22 md:w-52 md:h-26"
          style={{
            filter: 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.4))',
            transform: 'translateZ(0)',
          }}
        >
          <defs>
            <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="40%" stopColor="#1E293B" />
              <stop offset="80%" stopColor="#334155" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="60%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            <linearGradient id="canopyGrad" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="45%" stopColor="#38BDF8" />
              <stop offset="85%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>

          {/* Port Swept Sensor Wing (Upper) */}
          <polygon
            points="50,44 10,18 75,42"
            fill="url(#wingGrad)"
            stroke="#38BDF8"
            strokeWidth="0.8"
            opacity="0.9"
          />
          {/* Wingtip strobe light */}
          <circle cx="10" cy="18" r="2.5" fill="#EF4444" />

          {/* Starboard Swept Sensor Wing (Lower) */}
          <polygon
            points="50,56 10,82 75,58"
            fill="url(#wingGrad)"
            stroke="#38BDF8"
            strokeWidth="0.8"
            opacity="0.9"
          />
          {/* Wingtip strobe light */}
          <circle cx="10" cy="82" r="2.5" fill="#10B981" />

          {/* Main Fuselage Body */}
          <polygon
            points="35,42 160,45 190,50 160,55 35,58"
            fill="url(#fuselageGrad)"
            stroke="#64748B"
            strokeWidth="1"
          />

          {/* Titanium Hull Panel Seam Insets */}
          <line x1="75" y1="43" x2="75" y2="57" stroke="#0F172A" strokeWidth="1.2" />
          <line x1="120" y1="44" x2="120" y2="56" stroke="#0F172A" strokeWidth="1.2" />
          <line x1="35" y1="42" x2="190" y2="50" stroke="#BAE6FD" strokeWidth="0.8" opacity="0.6" />

          {/* Avionics Cockpit Canopy */}
          <polygon
            points="125,47 165,48 178,50 165,52 125,53"
            fill="url(#canopyGrad)"
            stroke="#BAE6FD"
            strokeWidth="1"
          />

          {/* Vector Thruster Engine Bell Nozzle */}
          <polygon
            points="35,40 22,36 22,64 35,60"
            fill="#0F172A"
            stroke="#0284C7"
            strokeWidth="1.5"
          />

          {/* Brilliant Plasma Throat Core */}
          <ellipse cx="23" cy="50" rx="3.5" ry="11" fill="#FFFFFF" />
          <ellipse cx="25" cy="50" rx="2" ry="8" fill="#67E8F9" />
        </svg>
      </div>
    </CelestialObject>
  )
}
