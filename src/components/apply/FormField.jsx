import { useId, useRef, useState } from 'react'
import {
  BehanceLogo,
  CaretDown,
  CheckCircle,
  DribbbleLogo,
  FileText,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  LinkSimple,
  Plus,
  Trash,
  UploadSimple,
  WarningCircle,
} from '@phosphor-icons/react'
import { FILE_RULES, LEVELS } from '../../data/recruitment'
import { isVitEmail } from '../../lib/validation'
import { fmtSize } from '../../lib/format'

const FULL_WIDTH = new Set(['textarea', 'chips', 'level', 'radio', 'file'])

const URL_ICONS = {
  github: GithubLogo,
  taskRepo: GithubLogo,
  linkedin: LinkedinLogo,
  behance: BehanceLogo,
  dribbble: DribbbleLogo,
  instagram: InstagramLogo,
}

const inputCls = (error) =>
  `w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white text-sm placeholder:text-slate-500 focus:outline-none focus:bg-white/[0.06] transition-colors ${
    error ? 'border-rose-400/60 focus:border-rose-400' : 'border-white/10 hover:border-white/20 focus:border-sky-400'
  }`

/* ── Sub-controls ──────────────────────────────────────────────────────────── */
function Chips({ field, value = [], onChange }) {
  const [custom, setCustom] = useState('')
  const toggle = (opt) => onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])
  const addCustom = () => {
    const v = custom.trim()
    if (v && !value.some((x) => x.toLowerCase() === v.toLowerCase())) onChange([...value, v])
    setCustom('')
  }
  const extras = value.filter((v) => !field.options.includes(v))

  return (
    <div className="flex flex-wrap gap-2">
      {[...field.options, ...extras].map((opt) => {
        const on = value.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(opt)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
              on
                ? 'bg-sky-400/15 border-sky-400/50 text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.15)]'
                : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
            }`}
          >
            {on && <span className="mr-1">✓</span>}
            {opt}
          </button>
        )
      })}
      <div className="inline-flex items-center rounded-full border border-dashed border-white/15 focus-within:border-sky-400/60 pl-3 pr-1">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addCustom()
            }
          }}
          placeholder="Add other"
          aria-label={`Add another ${field.label.toLowerCase()}`}
          className="w-24 bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none py-1.5"
        />
        <button type="button" onClick={addCustom} aria-label="Add" className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-sky-300">
          <Plus weight="bold" className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

function Segmented({ options, value, onChange, name }) {
  return (
    <div role="radiogroup" aria-label={name} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(options.length, 4)}, minmax(0, 1fr))` }}>
      {options.map((opt) => {
        const on = value === opt
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(opt)}
            className={`relative py-3 px-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all active:scale-[0.97] ${
              on
                ? 'bg-sky-400/15 border-sky-400/60 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_0_18px_rgba(56,189,248,0.15)]'
                : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function FileDrop({ field, value, onChange, error }) {
  const inputRef = useRef(null)
  const [drag, setDrag] = useState(false)
  const rule = FILE_RULES[field.rule]

  const pick = (file) => file && onChange(file)

  if (value) {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-xl border ${error ? 'border-rose-400/50 bg-rose-500/5' : 'border-sky-400/30 bg-sky-500/[0.06]'}`}>
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
          <FileText weight="duotone" className="w-5 h-5 text-sky-300" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-white font-semibold truncate">{value.name}</p>
          <p className="text-[11px] font-mono text-slate-400">{fmtSize(value.size)}</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label={`Remove ${value.name}`}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
        >
          <Trash weight="bold" className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setDrag(true)
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDrag(false)
        pick(e.dataTransfer.files?.[0])
      }}
      className={`w-full flex flex-col items-center justify-center gap-1.5 py-6 px-4 rounded-xl border border-dashed transition-all ${
        drag
          ? 'border-sky-400 bg-sky-500/10'
          : error
            ? 'border-rose-400/50 bg-rose-500/5'
            : 'border-white/15 bg-white/[0.02] hover:border-sky-400/50 hover:bg-white/[0.04]'
      }`}
    >
      <UploadSimple weight="bold" className={`w-5 h-5 ${drag ? 'text-sky-300' : 'text-slate-400'}`} />
      <span className="text-sm text-slate-200 font-semibold">
        Drop a file or <span className="text-sky-300">browse</span>
      </span>
      <span className="text-[11px] font-mono text-slate-500">{rule?.label}</span>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={rule?.accept.join(',')}
        onChange={(e) => {
          pick(e.target.files?.[0])
          e.target.value = ''
        }}
      />
    </button>
  )
}

/* ── Field ─────────────────────────────────────────────────────────────────── */
export default function FormField({ field, value, error, onChange }) {
  const id = useId()
  const set = (v) => onChange(field.id, v)
  const errId = `${id}-err`
  const aria = { id, 'aria-invalid': !!error, 'aria-describedby': error ? errId : undefined }
  const textLen = typeof value === 'string' ? value.trim().length : 0

  let control
  switch (field.type) {
    case 'textarea':
      control = (
        <textarea
          {...aria}
          rows={field.rows || 4}
          value={value || ''}
          placeholder={field.placeholder}
          onChange={(e) => set(e.target.value)}
          className={`${inputCls(error)} resize-y min-h-[88px] leading-relaxed`}
        />
      )
      break
    case 'select':
      control = (
        <div className="relative">
          <select
            {...aria}
            value={value || ''}
            onChange={(e) => set(e.target.value)}
            className={`${inputCls(error)} appearance-none pr-10 ${value ? '' : 'text-slate-500'} [&>option]:bg-[#081226] [&>option]:text-white`}
          >
            <option value="" disabled>
              Select {field.label.toLowerCase()}
            </option>
            {field.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <CaretDown weight="bold" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      )
      break
    case 'chips':
      control = <Chips field={field} value={value} onChange={set} />
      break
    case 'level':
      control = <Segmented name={field.label} options={LEVELS} value={value} onChange={set} />
      break
    case 'radio':
      control = <Segmented name={field.label} options={field.options} value={value} onChange={set} />
      break
    case 'file':
      control = <FileDrop field={field} value={value} onChange={set} error={error} />
      break
    case 'url': {
      const Icon = URL_ICONS[field.id] || LinkSimple
      control = (
        <div className="relative">
          <Icon weight="bold" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            {...aria}
            type="url"
            inputMode="url"
            value={value || ''}
            placeholder={field.placeholder}
            onChange={(e) => set(e.target.value)}
            className={`${inputCls(error)} pl-11`}
          />
        </div>
      )
      break
    }
    default: {
      const emailOk = field.type === 'email' && isVitEmail(value)
      control = (
        <div className="relative">
          <input
            {...aria}
            type={field.type}
            value={value || ''}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            inputMode={field.type === 'tel' ? 'tel' : undefined}
            onChange={(e) => set(e.target.value)}
            className={`${inputCls(error)} ${emailOk ? 'pr-28' : ''}`}
          />
          {emailOk && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-2 py-0.5">
              <CheckCircle weight="fill" className="w-3 h-3" />
              VIT ID
            </span>
          )}
        </div>
      )
    }
  }

  const showCounter = field.type === 'textarea' && (field.minLength || field.maxLength)

  return (
    <div className={FULL_WIDTH.has(field.type) ? 'sm:col-span-2' : ''}>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <label htmlFor={id} className="text-[13px] font-semibold text-slate-200 leading-snug">
          {field.label}
          {field.required ? <span className="text-sky-400 ml-0.5">*</span> : <span className="ml-1.5 text-[11px] font-normal text-slate-500">optional</span>}
        </label>
        {showCounter && (
          <span
            className={`text-[10px] font-mono tabular-nums shrink-0 ${
              field.minLength && textLen < field.minLength ? 'text-slate-500' : 'text-emerald-400/80'
            }`}
          >
            {textLen}
            {field.maxLength ? ` / ${field.maxLength}` : field.minLength ? ` / ${field.minLength}+` : ''}
          </span>
        )}
      </div>
      {control}
      {error && (
        <p id={errId} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-rose-300">
          <WarningCircle weight="fill" className="w-3.5 h-3.5 mt-px shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
