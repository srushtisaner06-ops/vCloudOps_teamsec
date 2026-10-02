import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Copy, House } from '@phosphor-icons/react'
import ApplicationTimeline from './ApplicationTimeline'
import { getDomain } from '../../data/recruitment'
import { fmtTimestamp } from '../../lib/format'

const CONFETTI_COLORS = ['#34D399', '#6EE7B7', '#38BDF8', '#BAE6FD', '#A78BFA', '#FFFFFF']

const makeConfetti = () =>
  Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
    const dist = 70 + Math.random() * 90
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      rotate: Math.random() * 360,
      size: 4 + Math.random() * 5,
      round: Math.random() > 0.5,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 0.12,
    }
  })

function AnimatedCheck() {
  const [confetti] = useState(makeConfetti)
  return (
    <div className="relative w-24 h-24 mx-auto">
      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-400/30 blur-2xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 1, 0.55], scale: [0.6, 1.3, 1.1] }}
        transition={{ delay: 0.55, duration: 0.9, ease: 'easeOut' }}
      />

      {/* Confetti burst */}
      <div className="absolute left-1/2 top-1/2" aria-hidden="true">
        {confetti.map((c, i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{
              width: c.size,
              height: c.round ? c.size : c.size * 0.45,
              background: c.color,
              borderRadius: c.round ? 9999 : 1.5,
              marginLeft: -c.size / 2,
              marginTop: -c.size / 2,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
            animate={{ x: c.x, y: c.y + 24, opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.8], rotate: c.rotate }}
            transition={{ delay: 0.85 + c.delay, duration: 1.1, ease: [0.2, 0.7, 0.3, 1], times: [0, 0.15, 0.7, 1] }}
          />
        ))}
      </div>

      <svg viewBox="0 0 96 96" className="relative w-24 h-24" aria-hidden="true">
        <motion.circle
          cx="48"
          cy="48"
          r="44"
          fill="none"
          stroke="#34D399"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ rotate: -90, transformOrigin: '50% 50%' }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.circle
          cx="48"
          cy="48"
          r="40"
          fill="#34D399"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.14 }}
          style={{ transformOrigin: '50% 50%' }}
          transition={{ delay: 0.5, duration: 0.35, ease: 'easeOut' }}
        />
        <motion.path
          d="M30 49 L43 62 L67 36"
          fill="none"
          stroke="#34D399"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.35, ease: 'easeOut' }}
        />
      </svg>
    </div>
  )
}

function CopyId({ id }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(id)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 group"
      aria-label={copied ? 'Application ID copied' : 'Copy application ID'}
    >
      <span className="font-mono font-bold text-white text-base sm:text-lg tracking-wide">{id}</span>
      <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
        {copied ? <Check weight="bold" className="w-3.5 h-3.5 text-emerald-300" /> : <Copy weight="bold" className="w-3.5 h-3.5" />}
      </span>
    </button>
  )
}

/**
 * The centrepiece moment: circle draws → check → confetti → card expands
 * → "Application Submitted" → details → recruitment timeline.
 */
export default function SubmissionSuccess({ application }) {
  const domain = getDomain(application.primaryDomain)
  const secondary = getDomain(application.secondaryDomain)
  const rows = [
    { label: 'Domain applied for', value: domain?.name + (secondary ? ` · ${secondary.name} (secondary)` : '') },
    { label: 'Submitted', value: fmtTimestamp(application.submittedAt) },
    { label: 'Registered email', value: application.email },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className="p-1 rounded-3xl bg-gradient-to-b from-emerald-400/30 via-white/5 to-white/5 border border-emerald-400/25 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(52,211,153,0.12)]"
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rounded-[calc(1.5rem-2px)] bg-[#050B18]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] px-6 sm:px-10 pt-10 pb-8 text-center overflow-hidden">
          <AnimatedCheck />

          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1.05, duration: 0.45 }}
          >
            <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Application Submitted</h1>
            <p className="mt-2 text-slate-300">You’re officially in the process.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 1.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] text-left divide-y divide-white/[0.06]">
              <div className="px-5 py-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">Application ID</p>
                <CopyId id={application.id} />
              </div>
              {rows.map((r) => (
                <div key={r.label} className="px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-4">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{r.label}</p>
                  <p className="text-sm text-white font-semibold break-all sm:text-right">{r.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#/application"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300 text-slate-950 font-bold text-sm shadow-[0_0_24px_rgba(52,211,153,0.35)] hover:shadow-[0_0_32px_rgba(52,211,153,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Track Application
                <ArrowRight weight="bold" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#home"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <House weight="bold" className="w-4 h-4" />
                Back to site
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.section
        className="mt-6 p-6 sm:p-8 rounded-3xl bg-[#050505]/70 border border-white/10 backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.5 }}
      >
        <p className="text-[10px] font-mono uppercase tracking-widest text-sky-400 mb-1">What happens next</p>
        <h2 className="text-xl font-bold text-white mb-6">Your Application Journey</h2>
        <ApplicationTimeline status={application.status} submittedAt={application.submittedAt} delay={1.85} />
      </motion.section>
    </div>
  )
}
