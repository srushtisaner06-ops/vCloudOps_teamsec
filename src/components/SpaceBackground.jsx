import { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/* ══════════════════════════════════════════════════════════════════════════════
   SpaceBackground — vCloudOps Official Cosmic Theme
   ──────────────────────────────────────────────────────────────────────────────
   Matches the club's signature theme:
     1. Top-Right Icy Lunar Planet with stepped pixel craters and atmosphere.
     2. Bottom-Left Continental Ocean Exoplanet with orbiting satellite moon.
     3. Distant Ringed Gas Giant floating in mid-space.
     4. Pixel-art '+' cross stars and celestial twinkling stars matching the poster.
     5. Deep cosmic navy/midnight void with subtle nebula dust & shooting stars.
══════════════════════════════════════════════════════════════════════════════ */

/* ── Top-Right Moon / Ice Cratered Planet ─────────────────────────────────── */
function TopRightMoon() {
  return (
    <div
      className="absolute -top-8 -right-8 sm:-top-16 sm:-right-16 md:-top-20 md:-right-20 pointer-events-none select-none"
      style={{
        animation: 'planetFloat 13s ease-in-out infinite',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        className="w-44 h-44 sm:w-64 sm:h-64 md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px]"
        style={{
          filter: 'drop-shadow(0 0 18px rgba(125, 211, 252, 0.22))',
          transform: 'translateZ(0)',
        }}
      >
        <defs>
          <clipPath id="moonClip">
            <circle cx="200" cy="200" r="190" />
          </clipPath>

          {/* Primary spherical shading */}
          <radialGradient id="moonBase" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="35%" stopColor="#7DD3FC" />
            <stop offset="65%" stopColor="#38BDF8" />
            <stop offset="85%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#082F59" />
          </radialGradient>

          {/* Shadow limb gradient on the lower right */}
          <linearGradient id="moonShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="40%" stopColor="transparent" />
            <stop offset="80%" stopColor="#03152E" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#020B1A" stopOpacity="0.95" />
          </linearGradient>

          {/* Crater depth gradient */}
          <radialGradient id="craterDark" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#0369A1" />
            <stop offset="70%" stopColor="#073B6C" />
            <stop offset="100%" stopColor="#031A38" />
          </radialGradient>
        </defs>

        {/* Ambient atmospheric outer halo */}
        <circle cx="200" cy="200" r="194" fill="none" stroke="rgba(186, 230, 253, 0.45)" strokeWidth="2.5" />
        <circle cx="200" cy="200" r="198" fill="none" stroke="rgba(56, 189, 248, 0.20)" strokeWidth="4" />

        {/* Planet sphere */}
        <g clipPath="url(#moonClip)">
          {/* Base celestial surface */}
          <circle cx="200" cy="200" r="190" fill="url(#moonBase)" />

          {/* Pixel-art stepped bands for authentic retro texture */}
          <path d="M 0 120 Q 180 80 400 130 L 400 160 Q 200 110 0 150 Z" fill="#60A5FA" opacity="0.25" />
          <path d="M 0 180 Q 210 140 400 200 L 400 235 Q 190 170 0 215 Z" fill="#0284C7" opacity="0.30" />
          <path d="M 0 250 Q 220 210 400 270 L 400 320 Q 200 250 0 295 Z" fill="#0C4A6E" opacity="0.45" />

          {/* ── Craters (matching the theme image craters) ── */}
          {/* Crater 1 (Major basin top-center) */}
          <g transform="translate(130, 110)">
            <ellipse cx="0" cy="0" rx="36" ry="32" fill="#031B3A" />
            <ellipse cx="-2" cy="-2" rx="32" ry="28" fill="url(#craterDark)" />
            <ellipse cx="-6" cy="-6" rx="26" ry="22" fill="#0284C7" opacity="0.4" />
            {/* Crater rim highlight */}
            <path d="M -30 10 A 34 30 0 0 0 34 0" fill="none" stroke="#BAE6FD" strokeWidth="3" opacity="0.85" />
            <circle cx="-3" cy="-3" r="5" fill="#082F59" />
          </g>

          {/* Crater 2 (Mid-right crater) */}
          <g transform="translate(260, 160)">
            <ellipse cx="0" cy="0" rx="44" ry="38" fill="#02142B" />
            <ellipse cx="-3" cy="-3" rx="39" ry="33" fill="url(#craterDark)" />
            <ellipse cx="-8" cy="-6" rx="30" ry="25" fill="#0369A1" opacity="0.35" />
            <path d="M -36 12 A 42 36 0 0 0 40 0" fill="none" stroke="#7DD3FC" strokeWidth="3.5" opacity="0.75" />
            <circle cx="-4" cy="-4" r="6" fill="#031A38" />
          </g>

          {/* Crater 3 (Lower-left medium crater) */}
          <g transform="translate(100, 230)">
            <ellipse cx="0" cy="0" rx="28" ry="24" fill="#021226" />
            <ellipse cx="-2" cy="-2" rx="25" ry="21" fill="url(#craterDark)" />
            <path d="M -24 8 A 26 22 0 0 0 25 0" fill="none" stroke="#BAE6FD" strokeWidth="2.5" opacity="0.8" />
          </g>

          {/* Crater 4 (Bottom shadowed crater) */}
          <g transform="translate(210, 280)">
            <ellipse cx="0" cy="0" rx="34" ry="28" fill="#010B17" />
            <ellipse cx="-2" cy="-2" rx="30" ry="24" fill="#031A38" />
            <path d="M -26 8 A 30 24 0 0 0 28 0" fill="none" stroke="#38BDF8" strokeWidth="2" opacity="0.5" />
          </g>

          {/* Small micro craters / craterlets */}
          <ellipse cx="70" cy="90" rx="14" ry="12" fill="#073B6C" />
          <ellipse cx="190" cy="65" rx="16" ry="14" fill="#073B6C" />
          <ellipse cx="170" cy="180" rx="12" ry="10" fill="#031B3A" />
          <ellipse cx="290" cy="85" rx="18" ry="15" fill="#073B6C" />

          {/* Stepped pixel shadow overlay across the terminator */}
          <circle cx="200" cy="200" r="190" fill="url(#moonShadow)" />

          {/* Top-left specular rim crescent */}
          <path
            d="M 10 200 A 190 190 0 0 1 200 10 A 190 190 0 0 0 35 160 Z"
            fill="#FFFFFF"
            opacity="0.32"
          />
        </g>
      </svg>
    </div>
  )
}

/* ── Bottom-Left Continental Ocean World + Satellite Moon ────────────────── */
function BottomLeftPlanet() {
  return (
    <div
      className="absolute -bottom-10 -left-10 sm:-bottom-16 sm:-left-16 md:-bottom-24 md:-left-24 pointer-events-none select-none"
      style={{
        animation: 'planetFloatSlow 15s ease-in-out infinite',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <div className="relative">
        {/* ── Main Continental Exoplanet ── */}
        <svg
          viewBox="0 0 360 360"
          className="w-44 h-44 sm:w-60 sm:h-60 md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px]"
          style={{
            filter: 'drop-shadow(0 0 18px rgba(56, 189, 248, 0.22))',
            transform: 'translateZ(0)',
          }}
        >
          <defs>
            <clipPath id="earthClip">
              <circle cx="180" cy="180" r="170" />
            </clipPath>

            {/* Deep ocean base */}
            <radialGradient id="oceanGrad" cx="30%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="45%" stopColor="#0369A1" />
              <stop offset="75%" stopColor="#075985" />
              <stop offset="95%" stopColor="#082F59" />
              <stop offset="100%" stopColor="#031838" />
            </radialGradient>

            {/* Continental terrain colors */}
            <linearGradient id="landmassGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>

            <linearGradient id="landmassGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* Shadow overlay */}
            <linearGradient id="earthShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="45%" stopColor="transparent" />
              <stop offset="85%" stopColor="#020617" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Atmosphere rim aura */}
          <circle cx="180" cy="180" r="174" fill="none" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="3" />
          <circle cx="180" cy="180" r="178" fill="none" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="4" />

          {/* Planet body with continents */}
          <g clipPath="url(#earthClip)">
            {/* Ocean globe */}
            <circle cx="180" cy="180" r="170" fill="url(#oceanGrad)" />

            {/* ── Continents & Swirling Landmasses ── */}
            {/* Continent Alpha (Upper-Left to Center) */}
            <path
              d="M 50 110 Q 90 70 140 85 Q 180 100 170 135 Q 190 155 160 185 Q 130 200 90 175 Q 40 160 50 110 Z"
              fill="url(#landmassGrad1)"
            />
            {/* Landmass inner highlights / highlands */}
            <path
              d="M 70 115 Q 110 85 145 105 Q 155 130 135 155 Q 95 165 70 115 Z"
              fill="url(#landmassGrad2)"
              opacity="0.8"
            />
            {/* Coastal shelf glow */}
            <path
              d="M 45 105 Q 90 65 145 80 Q 190 95 178 140 Q 200 160 168 195 Q 130 210 85 182 Q 35 165 45 105 Z"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="2.5"
              opacity="0.4"
            />

            {/* Continent Beta (Lower Center & East) */}
            <path
              d="M 120 220 Q 170 195 220 215 Q 260 230 240 270 Q 210 300 160 290 Q 110 275 120 220 Z"
              fill="url(#landmassGrad1)"
            />
            <path
              d="M 140 230 Q 180 215 220 235 Q 225 265 190 280 Q 145 270 140 230 Z"
              fill="url(#landmassGrad2)"
              opacity="0.75"
            />

            {/* Archipelago / Island chain */}
            <circle cx="195" cy="155" r="9" fill="#38BDF8" />
            <circle cx="215" cy="170" r="7" fill="#22D3EE" />
            <circle cx="232" cy="188" r="8" fill="#38BDF8" />
            <circle cx="250" cy="205" r="6" fill="#67E8F9" />

            {/* Northern continent edge */}
            <path
              d="M 80 40 Q 140 25 190 45 Q 230 65 210 90 Q 170 85 130 65 Q 90 60 80 40 Z"
              fill="url(#landmassGrad1)"
            />

            {/* Dynamic pixel cloud wisps across the planet */}
            <path
              d="M 30 145 Q 120 120 210 140 Q 270 155 330 135"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.28"
            />
            <path
              d="M 80 230 Q 160 210 240 235 Q 290 245 340 225"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.22"
            />

            {/* Spherical shadow overlay */}
            <circle cx="180" cy="180" r="170" fill="url(#earthShadow)" />

            {/* Specular ocean crescent reflection */}
            <path
              d="M 15 180 A 170 170 0 0 1 180 15 A 170 170 0 0 0 35 150 Z"
              fill="#FFFFFF"
              opacity="0.35"
            />
          </g>
        </svg>

        {/* ── Companion Satellite Mini Moon (matching poster) ── */}
        <div
          className="absolute -top-6 right-2 sm:-top-8 sm:right-6 md:-top-10 md:right-10 pointer-events-none"
          style={{
            animation: 'moonOrbit 8.5s ease-in-out infinite',
            willChange: 'transform',
          }}
        >
          <svg
            viewBox="0 0 80 80"
            className="w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.45))',
              transform: 'translateZ(0)',
            }}
          >
            <defs>
              <clipPath id="satClip">
                <circle cx="40" cy="40" r="36" />
              </clipPath>
              <radialGradient id="satBase" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="45%" stopColor="#4F46E5" />
                <stop offset="85%" stopColor="#312E81" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </radialGradient>
            </defs>

            {/* Moon sphere */}
            <g clipPath="url(#satClip)">
              <circle cx="40" cy="40" r="36" fill="url(#satBase)" />
              {/* Moon craters */}
              <circle cx="28" cy="26" r="6" fill="#1E1B4B" opacity="0.6" />
              <circle cx="48" cy="38" r="8" fill="#1E1B4B" opacity="0.6" />
              <circle cx="34" cy="50" r="5" fill="#312E81" opacity="0.5" />
              {/* Specular rim */}
              <path d="M 6 40 A 36 36 0 0 1 40 6 A 36 36 0 0 0 12 34 Z" fill="#C7D2FE" opacity="0.45" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ── Distant Ringed Exoplanet (Mid-space Celestial Accent) ────────────────── */
function RingedPlanet() {
  return (
    <div
      className="absolute top-[44%] right-[3%] sm:right-[6%] md:right-[9%] pointer-events-none select-none hidden sm:block"
      style={{
        animation: 'planetFloat 16s ease-in-out infinite',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 180 120"
        className="w-24 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 opacity-85"
        style={{
          filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.22))',
          transform: 'translateZ(0)',
        }}
      >
        <defs>
          <radialGradient id="ringedPlanetBody" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="40%" stopColor="#6366F1" />
            <stop offset="80%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#0B132B" />
          </radialGradient>
        </defs>

        {/* Back of the planetary ring */}
        <ellipse
          cx="90" cy="60" rx="76" ry="18"
          fill="none"
          stroke="rgba(56, 189, 248, 0.45)"
          strokeWidth="6"
          transform="rotate(-18 90 60)"
        />
        <ellipse
          cx="90" cy="60" rx="82" ry="20"
          fill="none"
          stroke="rgba(125, 211, 252, 0.25)"
          strokeWidth="2.5"
          transform="rotate(-18 90 60)"
        />

        {/* Planet Sphere */}
        <circle cx="90" cy="60" r="32" fill="url(#ringedPlanetBody)" />

        {/* Atmospheric band */}
        <path
          d="M 62 54 Q 90 66 118 54 Q 90 62 62 54 Z"
          fill="#38BDF8"
          opacity="0.4"
        />

        {/* Front of the planetary ring (passes in front of planet) */}
        <path
          d="M 20 62 A 76 18 0 0 0 160 58"
          fill="none"
          stroke="rgba(186, 230, 253, 0.75)"
          strokeWidth="5"
          strokeLinecap="round"
          transform="rotate(-18 90 60)"
        />
        <path
          d="M 14 62 A 82 20 0 0 0 166 58"
          fill="none"
          stroke="rgba(56, 189, 248, 0.55)"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform="rotate(-18 90 60)"
        />
      </svg>
    </div>
  )
}

/* ── 1. Amethyst / Neon Violet Dwarf Planet (Upper Left) ─────────────────── */
function PurpleDwarfPlanet() {
  return (
    <div
      className="absolute top-[17%] left-[6%] sm:left-[11%] pointer-events-none select-none"
      style={{
        animation: 'floatOrbit1 15s ease-in-out infinite',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 80 80"
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.4))',
          transform: 'translateZ(0)',
        }}
      >
        <defs>
          <clipPath id="purpleDwarfClip">
            <circle cx="40" cy="40" r="36" />
          </clipPath>
          <radialGradient id="purpleDwarfGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="35%" stopColor="#C084FC" />
            <stop offset="70%" stopColor="#7E22CE" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="37.5" fill="none" stroke="rgba(192, 132, 252, 0.35)" strokeWidth="1.5" />
        <g clipPath="url(#purpleDwarfClip)">
          <circle cx="40" cy="40" r="36" fill="url(#purpleDwarfGrad)" />
          {/* Craters with pixel depth */}
          <ellipse cx="26" cy="24" rx="7" ry="6" fill="#3B0764" />
          <ellipse cx="24" cy="22" rx="5" ry="4" fill="#6B21A8" opacity="0.6" />
          <path d="M 20 28 A 6 5 0 0 0 32 23" fill="none" stroke="#F3E8FF" strokeWidth="1.5" opacity="0.8" />
          <ellipse cx="46" cy="38" rx="9" ry="8" fill="#2E1065" />
          <path d="M 38 42 A 8 7 0 0 0 54 36" fill="none" stroke="#E9D5FF" strokeWidth="1.5" opacity="0.7" />
          <ellipse cx="32" cy="52" rx="6" ry="5" fill="#1E1B4B" />
          {/* Crescent reflection */}
          <path d="M 6 40 A 36 36 0 0 1 40 6 A 36 36 0 0 0 12 34 Z" fill="#FFFFFF" opacity="0.4" />
        </g>
      </svg>
    </div>
  )
}

/* ── 2. Emerald / Mint Gas Mini-Giant with Rings (Mid Left) ──────────────── */
function TealRingedPlanet() {
  return (
    <div
      className="absolute top-[66%] left-[3%] sm:left-[7%] pointer-events-none select-none"
      style={{
        animation: 'floatOrbit2 19s ease-in-out infinite',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 90"
        className="w-16 h-12 sm:w-20 sm:h-15 md:w-24 md:h-18"
        style={{
          filter: 'drop-shadow(0 0 12px rgba(45, 212, 191, 0.3))',
          transform: 'translateZ(0)',
        }}
      >
        <defs>
          <radialGradient id="tealPlanetGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="35%" stopColor="#2DD4BF" />
            <stop offset="75%" stopColor="#0F766E" />
            <stop offset="100%" stopColor="#042F2E" />
          </radialGradient>
        </defs>
        {/* Back ring */}
        <ellipse
          cx="60" cy="45" rx="50" ry="12"
          fill="none"
          stroke="rgba(45, 212, 191, 0.45)"
          strokeWidth="4"
          transform="rotate(-22 60 45)"
        />
        {/* Planet body */}
        <circle cx="60" cy="45" r="22" fill="url(#tealPlanetGrad)" />
        {/* Banded cloud layer */}
        <path d="M 40 43 Q 60 49 80 43 Q 60 46 40 43 Z" fill="#99F6E4" opacity="0.45" />
        {/* Front ring */}
        <path
          d="M 14 47 A 50 12 0 0 0 106 43"
          fill="none"
          stroke="rgba(153, 246, 228, 0.85)"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform="rotate(-22 60 45)"
        />
      </svg>
    </div>
  )
}

/* ── 3. Coral / Ruby Lava Dwarf Planet (Upper Mid Space) ─────────────────── */
function RubyLavaPlanet() {
  return (
    <div
      className="absolute top-[8%] left-[20%] sm:left-[47%] pointer-events-none select-none hidden sm:block"
      style={{
        animation: 'floatOrbit3 17s ease-in-out infinite',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 60 60"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(244, 63, 94, 0.45))',
          transform: 'translateZ(0)',
        }}
      >
        <defs>
          <clipPath id="rubyClip">
            <circle cx="30" cy="30" r="26" />
          </clipPath>
          <radialGradient id="rubyGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="35%" stopColor="#FB7185" />
            <stop offset="70%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#4C0519" />
          </radialGradient>
        </defs>
        <circle cx="30" cy="30" r="27.5" fill="none" stroke="rgba(251, 113, 133, 0.4)" strokeWidth="1.5" />
        <g clipPath="url(#rubyClip)">
          <circle cx="30" cy="30" r="26" fill="url(#rubyGrad)" />
          {/* Molten magma veins */}
          <path d="M 12 24 Q 24 18 36 28 Q 44 22 48 30" fill="none" stroke="#FFE4E6" strokeWidth="1.5" opacity="0.65" />
          <path d="M 16 34 Q 26 40 38 36" fill="none" stroke="#FDA4AF" strokeWidth="1.2" opacity="0.5" />
          <circle cx="22" cy="18" r="3" fill="#881337" />
          <circle cx="38" cy="38" r="4" fill="#4C0519" />
          <path d="M 5 30 A 26 26 0 0 1 30 5 A 26 26 0 0 0 9 25 Z" fill="#FFFFFF" opacity="0.45" />
        </g>
      </svg>
    </div>
  )
}

/* ── 4. Crystalline Cyan Ice Moon (Lower Right Space) ────────────────────── */
function CyanIceMoon() {
  return (
    <div
      className="absolute top-[75%] right-[9%] sm:right-[15%] pointer-events-none select-none"
      style={{
        animation: 'floatOrbit4 14s ease-in-out infinite',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 70 70"
        className="w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.45))',
          transform: 'translateZ(0)',
        }}
      >
        <defs>
          <clipPath id="iceMoonClip">
            <circle cx="35" cy="35" r="30" />
          </clipPath>
          <radialGradient id="iceMoonGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F0F9FF" />
            <stop offset="40%" stopColor="#7DD3FC" />
            <stop offset="80%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#082F59" />
          </radialGradient>
        </defs>
        <circle cx="35" cy="35" r="31.5" fill="none" stroke="rgba(125, 211, 252, 0.4)" strokeWidth="1.5" />
        <g clipPath="url(#iceMoonClip)">
          <circle cx="35" cy="35" r="30" fill="url(#iceMoonGrad)" />
          {/* Icy polygonal facet patterns */}
          <polygon points="20,18 28,14 36,22 26,25" fill="#BAE6FD" opacity="0.4" />
          <polygon points="32,30 44,26 48,38 36,42" fill="#0369A1" opacity="0.5" />
          <polygon points="16,36 28,32 26,46 14,44" fill="#075985" opacity="0.45" />
          <circle cx="42" cy="20" r="3.5" fill="#0C4A6E" />
          <path d="M 6 35 A 30 30 0 0 1 35 6 A 30 30 0 0 0 10 30 Z" fill="#FFFFFF" opacity="0.5" />
        </g>
      </svg>
    </div>
  )
}

/* ── 5. Golden Pearl Solar Orb (Upper Right Mid Space) ───────────────────── */
function GoldenPearlPlanet() {
  return (
    <div
      className="absolute top-[18%] right-[4%] sm:top-[26%] sm:right-[22%] pointer-events-none select-none"
      style={{
        animation: 'floatOrbit5 21s ease-in-out infinite',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 50 50"
        className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))',
          transform: 'translateZ(0)',
        }}
      >
        <defs>
          <clipPath id="goldClip">
            <circle cx="25" cy="25" r="22" />
          </clipPath>
          <radialGradient id="goldGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="80%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#451A03" />
          </radialGradient>
        </defs>
        <circle cx="25" cy="25" r="23" fill="none" stroke="rgba(253, 230, 138, 0.4)" strokeWidth="1.2" />
        <g clipPath="url(#goldClip)">
          <circle cx="25" cy="25" r="22" fill="url(#goldGrad)" />
          <circle cx="18" cy="18" r="3.5" fill="#78350F" opacity="0.6" />
          <circle cx="30" cy="28" r="4.5" fill="#451A03" opacity="0.5" />
          <path d="M 4 25 A 22 22 0 0 1 25 4 A 22 22 0 0 0 8 21 Z" fill="#FFFBEB" opacity="0.5" />
        </g>
      </svg>
    </div>
  )
}

/* ── Deterministic PRNG for pure celestial star generation ────────────── */
function createPRNG(initialSeed = 1337) {
  let s = initialSeed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/* ── Pixel Star Field & Cross Stars (Matching Club Theme Poster) ──────────── */
function PixelStarField({ count = 130 }) {
  const { pixelCrossStars, dotStars, shootingStars } = useMemo(() => {
    const rand = createPRNG(2026)
    const crosses = []
    const dots = []

    for (let i = 0; i < count; i++) {
      const x = rand() * 100
      const y = rand() * 95

      if (i < 30) {
        // Distinct pixel '+' cross stars as seen in the theme image
        crosses.push({
          id: `pc-${i}`,
          x, y,
          size: i % 3 === 0 ? 8 : 6,
          color: i % 2 === 0 ? '#BAE6FD' : '#38BDF8',
          dur: 2 + rand() * 2.5,
          delay: rand() * 4,
          glow: i % 4 === 0,
        })
      } else {
        // Single and dual pixel dots - selectively animate to save SVG repaint overhead
        const shouldTwinkle = i % 3 === 0
        dots.push({
          id: `pd-${i}`,
          x, y,
          r: i % 4 === 0 ? 1.4 : 0.8,
          color: i % 3 === 0 ? '#38BDF8' : i % 5 === 0 ? '#7DD3FC' : '#FFFFFF',
          dur: 1.6 + rand() * 2.8,
          delay: rand() * 3.5,
          twinkle: shouldTwinkle,
        })
      }
    }

    const shooting = [
      { id: 'ss-1', left: '16%', top: '10%', dur: 7, delay: 1.5 },
      { id: 'ss-2', left: '55%', top: '16%', dur: 9, delay: 5.5 },
      { id: 'ss-3', left: '72%', top: '8%',  dur: 8, delay: 9.5 },
    ]

    return { pixelCrossStars: crosses, dotStars: dots, shootingStars: shooting }
  }, [count])

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* SVG Canvas for Pixel Stars */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Pixel Cross '+' Stars */}
        {pixelCrossStars.map(s => {
          const half = s.size / 2
          return (
            <g
              key={s.id}
              style={{
                animation: s.glow
                  ? `twinkleGlow ${s.dur}s ease-in-out ${s.delay}s infinite`
                  : `twinkleSparkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
                transformOrigin: `${s.x}% ${s.y}%`,
              }}
            >
              {/* '+' Cross shape composed of pixel bars */}
              {/* Vertical arm */}
              <rect
                x={`calc(${s.x}% - 1px)`}
                y={`calc(${s.y}% - ${half}px)`}
                width="2"
                height={s.size}
                fill={s.color}
                rx="0.5"
              />
              {/* Horizontal arm */}
              <rect
                x={`calc(${s.x}% - ${half}px)`}
                y={`calc(${s.y}% - 1px)`}
                width={s.size}
                height="2"
                fill={s.color}
                rx="0.5"
              />
              {/* Center highlight pixel */}
              <rect
                x={`calc(${s.x}% - 1px)`}
                y={`calc(${s.y}% - 1px)`}
                width="2"
                height="2"
                fill="#FFFFFF"
              />
            </g>
          )
        })}

        {/* Regular Celestial Dots */}
        {dotStars.map(d => (
          <circle
            key={d.id}
            cx={`${d.x}%`}
            cy={`${d.y}%`}
            r={d.r}
            fill={d.color}
            style={
              d.twinkle
                ? {
                    animation: `twinkleSoft ${d.dur}s ease-in-out ${d.delay}s infinite`,
                    transformOrigin: `${d.x}% ${d.y}%`,
                  }
                : undefined
            }
          />
        ))}
      </svg>

      {/* Meteors / Shooting Stars */}
      {shootingStars.map(ss => (
        <div
          key={ss.id}
          style={{
            position: 'absolute',
            left: ss.left,
            top: ss.top,
            width: 130,
            height: 2,
            background: 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.6) 40%, #FFFFFF 100%)',
            borderRadius: 999, opacity: 0,
            filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.8))',
            animation: `shootingStar ${ss.dur}s linear ${ss.delay}s infinite`,
            transformOrigin: 'left center',
          }}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   Main SpaceBackground Export
   Replaces all cloud SVGs with the authentic vCloudOps planetary theme!
══════════════════════════════════════════════════════════════════════════ */
export default function SpaceBackground() {
  const reduced = useReducedMotion()

  /* ── Scroll-Linked Parallax System (GPU-accelerated via Lenis smooth scroll) ── */
  const { scrollY } = useScroll()

  // 1. Top-Right Moon: drifts upward and slightly outwards, with subtle counter-clockwise tilt
  const moonY = useTransform(scrollY, [0, 1000], [0, -160])
  const moonX = useTransform(scrollY, [0, 1000], [0, -35])
  const moonRotate = useTransform(scrollY, [0, 1000], [0, -7])

  // 2. Bottom-Left Ocean World: rises into view with clockwise spin as you scroll down
  const oceanPlanetY = useTransform(scrollY, [0, 1000], [0, -130])
  const oceanPlanetX = useTransform(scrollY, [0, 1000], [0, 40])
  const oceanPlanetRotate = useTransform(scrollY, [0, 1000], [0, 6])

  // 3. Ringed Titan: tilts rings and drifts
  const ringedY = useTransform(scrollY, [0, 1000], [0, -90])
  const ringedRotate = useTransform(scrollY, [0, 1000], [0, -12])

  // 4. Purple Dwarf (Upper Left): swift nearby flyby parallax
  const purpleY = useTransform(scrollY, [0, 1000], [0, -220])
  const purpleX = useTransform(scrollY, [0, 1000], [0, -30])

  // 5. Teal Mini-Giant (Mid Left): mid-depth drift
  const tealY = useTransform(scrollY, [0, 1000], [0, -150])
  const tealX = useTransform(scrollY, [0, 1000], [0, 25])
  const tealRotate = useTransform(scrollY, [0, 1000], [0, 10])

  // 6. Ruby Lava Core (Upper Mid Space): rapid upward celestial pass
  const rubyY = useTransform(scrollY, [0, 1000], [0, -250])
  const rubyScale = useTransform(scrollY, [0, 1000], [1, 0.88])

  // 7. Cyan Ice Moon (Lower Right): inward drift
  const iceMoonY = useTransform(scrollY, [0, 1000], [0, -170])
  const iceMoonX = useTransform(scrollY, [0, 1000], [0, -30])

  // 8. Golden Pearl (Upper Right): distant subtle deep space parallax
  const goldY = useTransform(scrollY, [0, 1000], [0, -75])

  // Starfield subtle deep celestial parallax
  const starsY = useTransform(scrollY, [0, 1000], [0, -45])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        overflow: 'hidden',
        /* Midnight void with deep cosmic navy */
        background: 'linear-gradient(180deg, #020612 0%, #04091A 35%, #06112C 70%, #020612 100%)',
        pointerEvents: 'none',
      }}
    >
      {/* ── Nebula Glows / Cosmic Dust ── */}
      {/* Top-Right cyan lunar atmospheric aura */}
      <div
        className="absolute -top-16 -right-16 w-[70vw] h-[60vh] max-w-[700px] max-h-[600px]"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.16) 0%, rgba(14, 165, 233, 0.08) 35%, transparent 70%)',
        }}
      />

      {/* Bottom-Left azure exoplanet aura */}
      <div
        className="absolute -bottom-16 -left-16 w-[65vw] h-[60vh] max-w-[650px] max-h-[600px]"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.18) 0%, rgba(2, 132, 199, 0.09) 40%, transparent 70%)',
        }}
      />

      {/* Center deep celestial blue ambient wash */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[70vh]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(11, 35, 71, 0.22) 0%, transparent 70%)',
        }}
      />

      {/* ── Twinkling Pixel Stars & Shooting Stars with Deep Parallax ── */}
      <motion.div
        style={reduced ? {} : { y: starsY }}
        className="absolute inset-0 pointer-events-none"
      >
        <PixelStarField count={130} />
      </motion.div>

      {/* ── Primary Major Planets (Scroll-linked Parallax) ── */}
      {/* 1. Top-Right Icy Moon / Lunar Cratered Planet */}
      <motion.div
        style={reduced ? {} : { y: moonY, x: moonX, rotate: moonRotate }}
        className="absolute inset-0 pointer-events-none"
      >
        <TopRightMoon />
      </motion.div>

      {/* 2. Bottom-Left Continental Ocean World + Orbiting Mini Moon */}
      <motion.div
        style={reduced ? {} : { y: oceanPlanetY, x: oceanPlanetX, rotate: oceanPlanetRotate }}
        className="absolute inset-0 pointer-events-none"
      >
        <BottomLeftPlanet />
      </motion.div>

      {/* 3. Mid-Distance Ringed Planet */}
      <motion.div
        style={reduced ? {} : { y: ringedY, rotate: ringedRotate }}
        className="absolute inset-0 pointer-events-none"
      >
        <RingedPlanet />
      </motion.div>

      {/* ── Small Moving Planets & Orbs (Scroll-Linked Parallax) ── */}
      {/* 4. Amethyst Dwarf Planet (Upper Left) */}
      <motion.div
        style={reduced ? {} : { y: purpleY, x: purpleX }}
        className="absolute inset-0 pointer-events-none"
      >
        <PurpleDwarfPlanet />
      </motion.div>

      {/* 5. Emerald Gas Mini-Giant with Tilted Rings (Mid Left) */}
      <motion.div
        style={reduced ? {} : { y: tealY, x: tealX, rotate: tealRotate }}
        className="absolute inset-0 pointer-events-none"
      >
        <TealRingedPlanet />
      </motion.div>

      {/* 6. Ruby Lava Molten Dwarf Planet (Upper Mid Space) */}
      <motion.div
        style={reduced ? {} : { y: rubyY, scale: rubyScale }}
        className="absolute inset-0 pointer-events-none"
      >
        <RubyLavaPlanet />
      </motion.div>

      {/* 7. Crystalline Cyan Ice Moon (Lower Right) */}
      <motion.div
        style={reduced ? {} : { y: iceMoonY, x: iceMoonX }}
        className="absolute inset-0 pointer-events-none"
      >
        <CyanIceMoon />
      </motion.div>

      {/* 8. Golden Pearl Solar Orb (Upper Right Mid Space) */}
      <motion.div
        style={reduced ? {} : { y: goldY }}
        className="absolute inset-0 pointer-events-none"
      >
        <GoldenPearlPlanet />
      </motion.div>

      {/* ── Top & Bottom Atmospheric Vignettes ── */}
      <div
        className="absolute top-0 left-0 right-0 h-28"
        style={{
          background: 'linear-gradient(to bottom, #020612 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-36"
        style={{
          background: 'linear-gradient(to top, #020612 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
