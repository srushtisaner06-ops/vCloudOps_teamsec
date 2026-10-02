import { motion } from 'framer-motion'
import { Check } from '@phosphor-icons/react'
import { STEPS } from '../../data/recruitment'

const pad = (n) => String(n).padStart(2, '0')

/** 01 Personal → 05 Review stepper with animated fill. Completed steps are clickable. */
export default function StepProgress({ step, maxReached, onJump }) {
  const pct = Math.round(((step + 1) / STEPS.length) * 100)

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-xs font-mono text-slate-400">
          <span className="text-white font-semibold">Step {step + 1} of {STEPS.length}</span>
          <span className="mx-2 text-slate-600">·</span>
          <span className="tabular-nums text-sky-300">{pct}% Complete</span>
        </p>
        <p className="text-xs font-semibold text-white sm:hidden">{STEPS[step].label}</p>
      </div>

      <div className="relative h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-4" aria-hidden="true">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
        />
      </div>

      <ol className="hidden sm:grid grid-cols-5 gap-2">
        {STEPS.map((s, i) => {
          const done = i < step
          const current = i === step
          const reachable = i <= maxReached && !current
          return (
            <li key={s.id}>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => onJump(i)}
                aria-current={current ? 'step' : undefined}
                className={`w-full flex items-center gap-2 text-left rounded-lg py-1 transition-opacity ${
                  reachable ? 'hover:opacity-80 cursor-pointer' : 'cursor-default'
                }`}
              >
                <span
                  className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border transition-colors ${
                    done
                      ? 'bg-sky-400 border-sky-300 text-slate-950'
                      : current
                        ? 'border-sky-400 text-sky-200 bg-sky-400/10'
                        : 'border-white/15 text-slate-500'
                  }`}
                >
                  {done ? <Check weight="bold" className="w-3 h-3" /> : pad(i + 1)}
                </span>
                <span className={`text-xs font-semibold truncate ${current ? 'text-white' : done ? 'text-slate-300' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
