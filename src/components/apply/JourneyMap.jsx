import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from '@phosphor-icons/react'
import { JOURNEY } from '../../data/recruitment'

/**
 * Seven-stage recruitment journey. `states` maps each JOURNEY id to
 * 'done' | 'current' | 'upcoming'. Tapping a stage explains it.
 */
export default function JourneyMap({ states }) {
  const currentIdx = Math.max(0, JOURNEY.findIndex((j) => states[j.id] === 'current'))
  const [focused, setFocused] = useState(null)
  const shown = JOURNEY[focused ?? currentIdx]
  const shownState = states[shown.id]
  const railRef = useRef(null)

  // Keep the current stage visible when the rail overflows (mobile).
  useEffect(() => {
    const rail = railRef.current
    const node = rail?.children[currentIdx]
    if (!rail || !node || rail.scrollWidth <= rail.clientWidth) return
    rail.scrollTo({ left: node.offsetLeft - rail.clientWidth / 2 + node.offsetWidth / 2, behavior: 'smooth' })
  }, [currentIdx])

  return (
    <div className="w-full">
      <ol ref={railRef} className="relative flex items-center overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
        {JOURNEY.map((step, i) => {
          const state = states[step.id]
          const isFocused = (focused ?? currentIdx) === i
          return (
            <li key={step.id} className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setFocused(i === focused ? null : i)}
                onMouseEnter={() => setFocused(i)}
                onMouseLeave={() => setFocused(null)}
                aria-current={state === 'current' ? 'step' : undefined}
                className={`group flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-colors ${
                  isFocused ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'
                }`}
              >
                <span
                  className={`relative w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border transition-colors ${
                    state === 'done'
                      ? 'bg-emerald-400 border-emerald-300 text-slate-950'
                      : state === 'current'
                        ? 'bg-sky-400/15 border-sky-400 text-sky-200'
                        : 'bg-transparent border-white/15 text-slate-500'
                  }`}
                >
                  {state === 'done' ? <Check weight="bold" className="w-3.5 h-3.5" /> : i + 1}
                  {state === 'current' && (
                    <span className="absolute inset-0 rounded-full border border-sky-400 animate-ping opacity-40" />
                  )}
                </span>
                <span
                  className={`text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider whitespace-nowrap ${
                    state === 'done' ? 'text-emerald-300/90' : state === 'current' ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </button>
              {i < JOURNEY.length - 1 && (
                <span className="relative mx-1 w-5 sm:w-6 lg:w-8 h-px bg-white/10 overflow-hidden" aria-hidden="true">
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-emerald-400/70"
                    initial={false}
                    animate={{ width: state === 'done' ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </span>
              )}
            </li>
          )
        })}
      </ol>
      <p className="mt-2 text-xs text-slate-400 min-h-[1.25rem]" aria-live="polite">
        <span
          className={`font-mono uppercase tracking-wider mr-2 ${
            shownState === 'done' ? 'text-emerald-300' : shownState === 'current' ? 'text-sky-300' : 'text-slate-500'
          }`}
        >
          {shownState === 'done' ? 'Completed' : shownState === 'current' ? 'You are here' : 'Up next'}
        </span>
        {shown.hint}
      </p>
    </div>
  )
}
