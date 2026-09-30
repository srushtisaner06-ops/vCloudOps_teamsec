import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────
   AboutTeaser
   A scroll-triggered mission-briefing strip.
   Monospace accent font, reveal on enter viewport.
───────────────────────────────────────────── */

const MISSION_WORDS = [
  { text: 'We', accent: false },
  { text: "don't", accent: false },
  { text: 'just',   accent: false },
  { text: 'learn', accent: true  },
  { text: 'the',    accent: false },
  { text: 'cloud',  accent: true  },
  { text: '—',      accent: false },
  { text: 'we',     accent: false },
  { text: 'build',  accent: true  },
  { text: 'it.',    accent: false },
]

export default function AboutTeaser() {
  return (
    <section
      id="about"
      className="relative py-32 px-5 sm:px-8 flex flex-col items-center text-center scroll-mt-24"
      style={{ zIndex: 1 }}
    >
      {/* Separator line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-px h-16 mx-auto mb-16 origin-top"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(76,214,255,0.4), transparent)' }}
      />

      {/* Mission label */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-[0.22em] uppercase font-semibold backdrop-blur-md"
        style={{
          fontFamily: 'var(--font-mono)',
          color: '#38BDF8',
          background: 'rgba(10, 22, 44, 0.75)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
        }}
      >
        [ Mission Statement ]
      </motion.span>

      {/* Large mission statement — word-by-word reveal */}
      <motion.p
        className="max-w-3xl leading-tight"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.7rem, 4.2vw, 3.15rem)',
          fontWeight: 600,
          color: '#F8FAFC',
        }}
      >
        {MISSION_WORDS.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.6,
              delay: i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block mr-[0.3em]"
            style={{
              color: w.accent ? '#38BDF8' : '#F8FAFC',
              textShadow: w.accent
                ? '0 2px 10px rgba(0, 0, 0, 0.95), 0 0 25px rgba(56, 189, 248, 0.75), 0 0 50px rgba(56, 189, 248, 0.4)'
                : '0 2px 10px rgba(0, 0, 0, 0.95), 0 4px 20px rgba(2, 6, 23, 0.9)',
            }}
          >
            {w.text}
          </motion.span>
        ))}
      </motion.p>

      {/* Sub-copy */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed"
        style={{
          fontFamily: 'var(--font-main)',
          color: '#E2E8F0',
          fontWeight: 400,
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)',
        }}
      >
        vCloudOps is a student-led technical community at the intersection of
        cloud infrastructure, DevOps automation, and open-source contribution.
        From Kubernetes clusters to CI/CD pipelines — we ship real things.
      </motion.p>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="mt-10 flex flex-wrap justify-center gap-3"
      >
        {[
          '☁️  Cloud Architecture',
          '⚙️  CI/CD Automation',
          '🐳  Containers & Kubernetes',
          '🔐  DevSecOps',
          '📊  Observability & Monitoring',
          '🚀  Hackathons & Workshops',
        ].map((tag) => (
          <span
            key={tag}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(10, 22, 44, 0.75)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#F0F9FF',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
