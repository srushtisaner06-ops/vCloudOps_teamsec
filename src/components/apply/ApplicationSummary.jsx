import { ArrowLeft, FileText } from '@phosphor-icons/react'
import { MOTIVATION_FIELDS, PERSONAL_FIELDS, getDomain } from '../../data/recruitment'
import { fmtSize } from '../../lib/format'

const isLinkOrFile = (f) => f.type === 'url' || f.type === 'file'

function Value({ field, value }) {
  if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) {
    return <span className="text-slate-600">—</span>
  }
  if (field.type === 'chips') {
    return (
      <span className="flex flex-wrap gap-1.5">
        {value.map((v) => (
          <span key={v} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-sky-400/10 text-sky-200 border border-sky-400/20">
            {v}
          </span>
        ))}
      </span>
    )
  }
  if (field.type === 'file') {
    return (
      <span className="inline-flex items-center gap-1.5 text-slate-200">
        <FileText weight="duotone" className="w-4 h-4 text-sky-300 shrink-0" />
        <span className="truncate">{value.name}</span>
        <span className="text-[11px] font-mono text-slate-500 shrink-0">{fmtSize(value.size)}</span>
      </span>
    )
  }
  if (field.type === 'url') {
    return (
      <a href={value} target="_blank" rel="noreferrer noopener" className="text-sky-300 hover:text-sky-200 underline decoration-sky-400/30 underline-offset-2 break-all">
        {value.replace(/^https?:\/\/(www\.)?/, '')}
      </a>
    )
  }
  return <span className="text-slate-200 whitespace-pre-line break-words line-clamp-6">{value}</span>
}

function Section({ title, step, onEdit, fields, values }) {
  const shown = fields.filter((f) => f.required || values[f.id])
  if (shown.length === 0) return null
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <header className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-sky-300">{title}</h3>
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(step)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
            Edit
          </button>
        )}
      </header>
      <dl className="divide-y divide-white/[0.05]">
        {shown.map((f) => (
          <div key={f.id} className="grid sm:grid-cols-[minmax(0,13rem)_1fr] gap-1 sm:gap-4 px-4 sm:px-5 py-3 text-sm">
            <dt className="text-slate-400 text-xs sm:text-sm">{f.label}</dt>
            <dd className="min-w-0">
              <Value field={f} value={values[f.id]} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/** Full application preview. Pass `onEdit(stepIndex)` to show "← Edit" links. */
export default function ApplicationSummary({ values, onEdit }) {
  const domain = getDomain(values.primaryDomain)
  const secondary = getDomain(values.secondaryDomain)
  const questions = domain?.questions || []
  const domainFields = [
    { id: '_primary', label: 'Primary domain', required: true },
    { id: '_secondary', label: 'Secondary domain', required: true },
  ]
  const domainValues = { _primary: domain?.name, _secondary: secondary?.name || 'None' }

  return (
    <div className="flex flex-col gap-4">
      <Section title="Personal Information" step={0} onEdit={onEdit} fields={PERSONAL_FIELDS} values={values} />
      <Section title="Selected Domain" step={1} onEdit={onEdit} fields={domainFields} values={domainValues} />
      <Section title="Skills & Experience" step={1} onEdit={onEdit} fields={questions.filter((f) => !isLinkOrFile(f))} values={values} />
      <Section title="Profiles & Documents" step={1} onEdit={onEdit} fields={questions.filter(isLinkOrFile)} values={values} />
      {domain && (
        <Section title={`Task · ${domain.task.title}`} step={2} onEdit={onEdit} fields={domain.task.fields} values={values} />
      )}
      <Section title="Motivation & Availability" step={3} onEdit={onEdit} fields={MOTIVATION_FIELDS} values={values} />
    </div>
  )
}
