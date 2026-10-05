import { usePageTransition } from '../hooks/usePageTransition'
import './CosmicWarpTransition.css'

export default function CosmicWarpTransition() {
  const { isWarping, warpPhase } = usePageTransition()

  if (!isWarping && warpPhase === 'idle') return null

  const isEntering = warpPhase === 'enter'

  return (
    <div
      className={`fixed inset-0 z-[999] pointer-events-none flex items-center justify-center overflow-hidden transition-opacity duration-300 ${
        isEntering ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: isEntering
          ? 'radial-gradient(circle at center, rgba(56, 189, 248, 0.22) 0%, rgba(5, 11, 24, 0.88) 65%, rgba(5, 11, 24, 0.98) 100%)'
          : 'transparent',
        backdropFilter: isEntering ? 'blur(16px)' : 'blur(0px)',
        WebkitBackdropFilter: isEntering ? 'blur(16px)' : 'blur(0px)',
      }}
      aria-hidden="true"
    >
      {/* Central Luminous Portal Flash */}
      <div
        className={`absolute w-[450px] h-[450px] rounded-full blur-[80px] pointer-events-none transition-transform duration-300 ${
          isEntering ? 'scale-150 opacity-90' : 'scale-50 opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.7) 0%, rgba(245, 158, 11, 0.45) 45%, transparent 75%)',
        }}
      />

      {/* Expanding Cosmic Shockwave Rings */}
      <div
        className={`absolute rounded-full border border-sky-400/80 shadow-[0_0_40px_rgba(56,189,248,0.8),inset_0_0_25px_rgba(56,189,248,0.4)] ${
          isEntering ? 'cosmic-ring-expand' : ''
        }`}
      />
      <div
        className={`absolute rounded-full border border-amber-400/70 shadow-[0_0_35px_rgba(245,158,11,0.6)] ${
          isEntering ? 'cosmic-ring-expand-delayed' : ''
        }`}
      />

      {/* Radial Warp Streak Beams */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <div
            key={deg}
            className={`absolute h-[2px] bg-gradient-to-r from-transparent via-sky-300 to-transparent ${
              isEntering ? 'warp-streak-active' : ''
            }`}
            style={{
              width: '120vw',
              transform: `rotate(${deg}deg)`,
              transformOrigin: 'center center',
              opacity: 0.65,
            }}
          />
        ))}
      </div>

      {/* Center Quantum Gateway Core */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
          isEntering ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-950/80 border border-sky-400/50 shadow-[0_0_30px_rgba(56,189,248,0.6)] backdrop-blur-md">
          <img
            src="/Logo/aws-logo-white.png"
            alt="AWS SBG"
            className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(255,153,0,0.8)] animate-pulse"
          />
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-sky-300 font-bold drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]">
          Entering AWS SBG x VIT
        </span>
      </div>
    </div>
  )
}
