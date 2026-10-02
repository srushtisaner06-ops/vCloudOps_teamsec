import { LEVELS } from '../../data/recruitment'

const TONE = {
  Beginner: { bar: 'bg-emerald-400', text: 'text-emerald-300' },
  Intermediate: { bar: 'bg-sky-400', text: 'text-sky-300' },
  Advanced: { bar: 'bg-violet-400', text: 'text-violet-300' },
}

/** Three-bar difficulty indicator: Beginner / Intermediate / Advanced. */
export default function LevelMeter({ level }) {
  const filled = LEVELS.indexOf(level) + 1
  const tone = TONE[level] || TONE.Beginner
  return (
    <div className="inline-flex items-center gap-2" title={`${level} friendly`}>
      <div className="flex items-end gap-[3px]" aria-hidden="true">
        {LEVELS.map((l, i) => (
          <span
            key={l}
            className={`w-[4px] rounded-full ${i < filled ? tone.bar : 'bg-white/15'}`}
            style={{ height: 6 + i * 4 }}
          />
        ))}
      </div>
      <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${tone.text}`}>{level}</span>
    </div>
  )
}
