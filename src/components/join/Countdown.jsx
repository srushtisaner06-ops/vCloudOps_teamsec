import { useCountdown } from '../../hooks/useCountdown'
import { RECRUITMENT } from '../../data/recruitment'

const pad = (n) => String(n).padStart(2, '0')

/** Live "Applications close in" timer. Renders a closed notice after the deadline. */
export default function Countdown({ compact = false }) {
  const { days, hours, minutes, seconds, closed } = useCountdown(RECRUITMENT.deadline)

  if (closed) {
    return (
      <p className="font-mono text-sm text-rose-300">
        Applications for {RECRUITMENT.cycle} are currently closed.
      </p>
    )
  }

  const units = [
    { v: days, l: 'Days' },
    { v: hours, l: 'Hours' },
    { v: minutes, l: 'Minutes' },
    { v: seconds, l: 'Seconds' },
  ]

  if (compact) {
    return (
      <span className="font-mono tabular-nums text-xs sm:text-sm text-white whitespace-nowrap" aria-label={`${days} days ${hours} hours ${minutes} minutes left`}>
        {pad(days)}d : {pad(hours)}h : {pad(minutes)}m : {pad(seconds)}s
      </span>
    )
  }

  return (
    <div className="flex items-start gap-2 sm:gap-3" role="timer" aria-live="off">
      {units.map(({ v, l }, i) => (
        <div key={l} className="flex items-start gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <span className="font-mono tabular-nums font-extrabold text-white text-3xl sm:text-4xl md:text-5xl leading-none tracking-tight">
              {pad(v)}
            </span>
            <span className="mt-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {l}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-mono text-2xl sm:text-3xl md:text-4xl leading-none text-sky-400/50">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
