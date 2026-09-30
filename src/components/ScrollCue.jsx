import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/* ─────────────────────────────────────────────
   ScrollCue
   Animated mouse + scroll-wheel icon + chevrons,
   gently bouncing at the bottom of the Hero.
───────────────────────────────────────────── */
export default function ScrollCue() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      aria-label="Scroll down"
    >
      {/* Mouse icon */}
      <motion.div
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 26,
          height: 40,
          borderRadius: 13,
          border: '2px solid rgba(56, 189, 248, 0.65)',
          boxShadow: '0 0 14px rgba(56, 189, 248, 0.3), inset 0 0 8px rgba(56, 189, 248, 0.15)',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 7,
          background: 'rgba(5, 12, 28, 0.4)',
        }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 4,
            height: 8,
            borderRadius: 2,
            background: '#38BDF8',
            boxShadow: '0 0 8px #38BDF8',
          }}
        />
      </motion.div>

      {/* Chevrons */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={reduced ? {} : { opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          style={{
            width: 10,
            height: 10,
            borderRight: '2.5px solid #38BDF8',
            borderBottom: '2.5px solid #38BDF8',
            transform: 'rotate(45deg)',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))',
          }}
        />
      ))}
    </motion.div>
  )
}
