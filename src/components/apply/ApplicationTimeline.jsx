import { motion } from 'framer-motion'
import { Check } from '@phosphor-icons/react'
import { STATUS_STAGE, TIMELINE_STAGES } from '../../data/recruitment'
import { fmtDate } from '../../lib/format'

const STATE_LABEL = { done: 'Completed', current: 'In Progress', upcoming: 'Upcoming' }

/** Vertical "Your Application Journey" timeline driven by the application status. */
export default function ApplicationTimeline({ status = 'SUBMITTED', submittedAt, delay = 0 }) {
  const active = STATUS_STAGE[status] ?? 1
  const rejected = status === 'NOT_SELECTED'

  return (
    <ol className="relative">
      {TIMELINE_STAGES.map((stage, i) => {
        const state = i < active ? 'done' : i === active && !rejected ? 'current' : 'upcoming'
        const last = i === TIMELINE_STAGES.length - 1
        const t = delay + i * 0.12
        return (
          <motion.li
            key={stage.id}
            className="relative flex gap-4 pb-6 last:pb-0"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: t, duration: 0.35, ease: 'easeOut' }}
          >
            {!last && (
              <span className="absolute left-[13px] top-7 bottom-0 w-px bg-white/10 overflow-hidden" aria-hidden="true">
                <motion.span
                  className="absolute inset-x-0 top-0 bg-emerald-400/70"
                  initial={{ height: 0 }}
                  animate={{ height: state === 'done' ? '100%' : 0 }}
                  transition={{ delay: t + 0.2, duration: 0.5, ease: 'easeOut' }}
                />
              </span>
            )}

            <span
              className={`relative z-10 w-7 h-7 shrink-0 rounded-full flex items-center justify-center border ${
                state === 'done'
                  ? 'bg-emerald-400 border-emerald-300 text-slate-950 shadow-[0_0_14px_rgba(52,211,153,0.45)]'
                  : state === 'current'
                    ? 'bg-sky-400/15 border-sky-400'
                    : 'bg-[#050B18] border-white/15'
              }`}
            >
              {state === 'done' && <Check weight="bold" className="w-3.5 h-3.5" />}
              {state === 'current' && (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className="absolute inset-0 rounded-full border border-sky-400 animate-ping opacity-50" />
                </>
              )}
            </span>

            <div className="pt-0.5 min-w-0">
              <p className={`text-sm font-bold ${state === 'upcoming' ? 'text-slate-400' : 'text-white'}`}>{stage.title}</p>
              <p className="mt-0.5 text-[11px] font-mono uppercase tracking-wider">
                <span
                  className={
                    state === 'done' ? 'text-emerald-300' : state === 'current' ? 'text-sky-300' : 'text-slate-500'
                  }
                >
                  {STATE_LABEL[state]}
                </span>
                {i === 0 && submittedAt && <span className="text-slate-500"> · {fmtDate(submittedAt)}</span>}
              </p>
              {state !== 'done' && <p className="mt-1 text-xs text-slate-400 leading-relaxed">{stage.note}</p>}
            </div>
          </motion.li>
        )
      })}
      {rejected && (
        <p className="mt-4 text-sm text-slate-300 rounded-xl border border-white/10 bg-white/[0.03] p-3">
          Thank you for applying. You weren’t selected this cycle — we’d love to see you apply again next year.
        </p>
      )}
    </ol>
  )
}
