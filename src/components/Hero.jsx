import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import ScrollCue from './ScrollCue'

/* ─────────────────────────────────────────────
   Hero
   Full-viewport section with:
   - Word-by-word staggered headline animation
   - Tagline fade-in
   - Primary CTA with glow pulse
   - Floating badge
───────────────────────────────────────────── */

const HEADLINE_WORDS = ['Architect', 'The', 'Cloud.', 'Command', 'The', 'Future.']

/* Container variants for staggered children */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

const wordVariants = {
  hidden:  { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center text-center min-h-screen px-5 sm:px-8 pt-32 sm:pt-36 md:pt-40 pb-20 sm:pb-24 scroll-mt-28"
      style={{ zIndex: 1 }}
    >
      {/* ── Floating Community Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md"
        style={{
          background: 'rgba(10, 22, 44, 0.75)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(56, 189, 248, 0.15)',
        }}
      >
        <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse shadow-[0_0_8px_#38BDF8]" />
        <span
          className="text-xs sm:text-sm font-semibold tracking-wider uppercase"
          style={{
            color: '#E0F2FE',
            fontFamily: 'var(--font-mono)',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
          }}
        >
          Official Cloud &amp; DevOps Club
        </span>
      </motion.div>

      {/* ── Headline ── */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate={reduced ? 'visible' : 'visible'}
        className="font-extrabold leading-[1.08] tracking-tight max-w-5xl"
        style={{
          fontFamily: 'var(--font-main)',
          fontSize: 'clamp(2.1rem, 6.5vw, 4.85rem)',
          color: '#FFFFFF',
        }}
      >
        {HEADLINE_WORDS.map((word, i) => {
          const isAccent = word === 'Cloud.' || word === 'Future.'
          return (
            <motion.span
              key={i}
              variants={reduced ? {} : wordVariants}
              className="inline-block mr-[0.25em]"
              style={{
                color: isAccent ? '#38BDF8' : '#FFFFFF',
                textShadow: isAccent
                  ? '0 2px 10px rgba(0, 0, 0, 0.95), 0 0 30px rgba(56, 189, 248, 0.75), 0 0 60px rgba(56, 189, 248, 0.35)'
                  : '0 2px 10px rgba(0, 0, 0, 0.95), 0 4px 24px rgba(2, 6, 23, 0.9), 0 0 35px rgba(0, 0, 0, 0.75)',
              }}
            >
              {word}
            </motion.span>
          )
        })}
      </motion.h1>

      {/* ── Tagline ── */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.1 }}
        className="mt-7 max-w-xl text-lg sm:text-xl leading-relaxed"
        style={{
          fontFamily: 'var(--font-main)',
          color: '#F1F5F9',
          fontWeight: 450,
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.95)',
        }}
      >
        Where student engineers build, deploy, and scale — real infrastructure,
        real pipelines, real community.
      </motion.p>

      {/* ── CTA buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.7, ease: 'easeOut' }}
        className="mt-12 flex flex-col sm:flex-row items-center gap-4"
      >
        {/* Primary CTA */}
        <motion.a
          href="#events"
          whileHover={reduced ? {} : { scale: 1.04 }}
          whileTap={reduced  ? {} : { scale: 0.97 }}
          className="relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-300"
          style={{
            fontFamily: 'var(--font-main)',
            background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
            color: '#030B18',
            boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4), 0 0 0 0 rgba(56, 189, 248, 0.5)',
            textShadow: '0 1px 1px rgba(255, 255, 255, 0.4)',
            animation: reduced ? 'none' : 'ctaPulse 2.5s ease-in-out infinite',
          }}
        >
          {/* Arrow icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          Explore Events
        </motion.a>

        {/* Secondary CTA */}
        <motion.a
          href="#about"
          whileHover={reduced ? {} : { scale: 1.04 }}
          whileTap={reduced  ? {} : { scale: 0.97 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 backdrop-blur-md"
          style={{
            fontFamily: 'var(--font-main)',
            background: 'rgba(10, 22, 44, 0.75)',
            border: '1px solid rgba(125, 211, 252, 0.35)',
            color: '#F0F9FF',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.65)'
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.background = 'rgba(14, 34, 66, 0.85)'
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(56, 189, 248, 0.25)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(125, 211, 252, 0.35)'
            e.currentTarget.style.color = '#F0F9FF'
            e.currentTarget.style.background = 'rgba(10, 22, 44, 0.75)'
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.5)'
          }}
        >
          About the Club
        </motion.a>
      </motion.div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="mt-16 flex items-center gap-8 sm:gap-14 flex-wrap justify-center"
      >
        {[
          { value: '40+', label: 'Members' },
          { value: '0',   label: 'Events Hosted' },
          { value: '0',   label: 'Projects Live' },
          { value: '0',   label: 'Years Strong' },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl backdrop-blur-sm"
            style={{
              background: 'rgba(5, 12, 28, 0.45)',
              border: '1px solid rgba(56, 189, 248, 0.15)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
            }}
          >
            <span
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{
                color: '#38BDF8',
                fontFamily: 'var(--font-main)',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(56, 189, 248, 0.5)',
              }}
            >
              {value}
            </span>
            <span
              className="text-xs sm:text-sm tracking-wider uppercase font-semibold"
              style={{
                color: '#BAE6FD',
                fontFamily: 'var(--font-mono)',
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <ScrollCue />

      {/* Inline keyframe for CTA pulse (can't be done via Tailwind/Framer here) */}
      <style>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(76,214,255,0.45), 0 8px 32px rgba(76,214,255,0.25); }
          50%       { box-shadow: 0 0 0 12px rgba(76,214,255,0), 0 8px 40px rgba(76,214,255,0.35); }
        }
      `}</style>
    </section>
  )
}
