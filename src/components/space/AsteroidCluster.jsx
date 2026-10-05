import CelestialObject from './CelestialObject'

/**
 * AsteroidCluster — Midground Asteroid Drift (z = -120px / Speed: 0.22x / Active: 15% - 45%)
 *
 * Faceted rocky asteroid bodies drifting through the inner system with continuous axial
 * tumble keyframes. Drops to 3 bodies on mobile (<768px) to satisfy the 50% performance budget.
 */
export default function AsteroidCluster({ progress, isMobile = false, reduced = false }) {
  return (
    <CelestialObject
      progress={progress}
      range={[0.14, 0.22, 0.38, 0.46]}
      yRange={[260, 40, -80, -290]}
      xRange={[-40, 0, 30, 60]}
      opacityRange={[0, 0.9, 0.9, 0]}
      className="absolute top-[32%] left-[3%] sm:left-[6%] md:left-[9%]"
      reduced={reduced}
    >
      <div className="relative w-64 h-56 sm:w-80 sm:h-64 pointer-events-none">
        {/* ── Asteroid 1 (Primary Large Faceted Rocky Body) ── */}
        <div
          className="absolute top-4 left-6"
          style={{
            animation: reduced ? 'none' : 'asteroidTumble1 28s linear infinite',
            willChange: 'transform',
          }}
        >
          <svg viewBox="0 0 70 60" className="w-12 h-10 sm:w-16 sm:h-14">
            <defs>
              <linearGradient id="astGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
            </defs>
            {/* Faceted polygonal geometry */}
            <polygon points="25,5 50,12 65,30 55,50 30,55 10,42 5,22" fill="url(#astGrad1)" />
            {/* Light facet */}
            <polygon points="25,5 50,12 38,28 18,22 5,22" fill="#CBD5E1" opacity="0.45" />
            {/* Dark shadow facet */}
            <polygon points="50,12 65,30 55,50 38,28" fill="#0F172A" opacity="0.65" />
            <polygon points="55,50 30,55 38,28" fill="#020617" opacity="0.75" />
            {/* Small crater on sunlit facet */}
            <circle cx="24" cy="18" r="3.5" fill="#334155" />
            <circle cx="23" cy="17" r="2" fill="#1E293B" />
          </svg>
        </div>

        {/* ── Asteroid 2 (Medium Elongated Tumbler) ── */}
        <div
          className="absolute top-28 left-28"
          style={{
            animation: reduced ? 'none' : 'asteroidTumble2 22s linear infinite',
            willChange: 'transform',
          }}
        >
          <svg viewBox="0 0 50 40" className="w-9 h-7 sm:w-12 sm:h-10">
            <polygon points="18,4 38,8 46,24 34,36 12,34 4,20" fill="#64748B" />
            <polygon points="18,4 38,8 28,20 10,16 4,20" fill="#94A3B8" opacity="0.55" />
            <polygon points="38,8 46,24 34,36 28,20" fill="#0F172A" opacity="0.7" />
            <circle cx="20" cy="12" r="2.5" fill="#334155" />
          </svg>
        </div>

        {/* ── Asteroid 3 (Small Distant Chunks) ── */}
        <div
          className="absolute top-16 left-48"
          style={{
            animation: reduced ? 'none' : 'asteroidTumble1 18s linear infinite',
            willChange: 'transform',
          }}
        >
          <svg viewBox="0 0 35 30" className="w-6 h-5 sm:w-8 sm:h-7">
            <polygon points="12,3 26,7 32,18 22,27 7,24 2,13" fill="#475569" />
            <polygon points="12,3 26,7 18,16 2,13" fill="#94A3B8" opacity="0.5" />
            <polygon points="26,7 32,18 22,27 18,16" fill="#0F172A" opacity="0.7" />
          </svg>
        </div>

        {/* ── Desktop-Only Asteroids (Omitted on mobile to drop count by 50%) ── */}
        {!isMobile && (
          <>
            {/* Asteroid 4 */}
            <div
              className="absolute top-40 left-12"
              style={{
                animation: reduced ? 'none' : 'asteroidTumble2 32s linear infinite',
                willChange: 'transform',
              }}
            >
              <svg viewBox="0 0 45 35" className="w-8 h-6 sm:w-10 sm:h-8">
                <polygon points="15,4 35,9 42,22 28,32 10,28 3,16" fill="#334155" />
                <polygon points="15,4 35,9 24,18 3,16" fill="#64748B" opacity="0.5" />
                <polygon points="35,9 42,22 28,32 24,18" fill="#020617" opacity="0.75" />
              </svg>
            </div>

            {/* Asteroid 5 (Micro pebble) */}
            <div
              className="absolute top-2 left-40"
              style={{
                animation: reduced ? 'none' : 'asteroidTumble1 15s linear infinite',
                willChange: 'transform',
              }}
            >
              <svg viewBox="0 0 24 20" className="w-5 h-4">
                <polygon points="8,2 18,5 22,12 14,18 4,15 1,8" fill="#64748B" />
                <polygon points="8,2 18,5 12,10 1,8" fill="#94A3B8" opacity="0.5" />
                <polygon points="18,5 22,12 14,18 12,10" fill="#0F172A" opacity="0.7" />
              </svg>
            </div>

            {/* Asteroid 6 (Distant micro pebble) */}
            <div
              className="absolute top-48 left-36"
              style={{
                animation: reduced ? 'none' : 'asteroidTumble2 20s linear infinite',
                willChange: 'transform',
              }}
            >
              <svg viewBox="0 0 20 18" className="w-4 h-3 opacity-75">
                <polygon points="7,2 15,4 18,11 12,16 3,14 1,7" fill="#475569" />
              </svg>
            </div>
          </>
        )}
      </div>
    </CelestialObject>
  )
}
