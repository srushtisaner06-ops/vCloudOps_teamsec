import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CircleNotch,
  CloudCheck,
  Lock,
  PaperPlaneTilt,
  Target,
  WarningCircle,
  X,
} from '@phosphor-icons/react'
import PortalShell from '../components/apply/PortalShell'
import JourneyMap from '../components/apply/JourneyMap'
import StepProgress from '../components/apply/StepProgress'
import FormField from '../components/apply/FormField'
import ApplicationSummary from '../components/apply/ApplicationSummary'
import SubmissionSuccess from '../components/apply/SubmissionSuccess'
import {
  DOMAINS,
  JOURNEY,
  MOTIVATION_FIELDS,
  PERSONAL_FIELDS,
  RECRUITMENT,
  STEPS,
  getDomain,
} from '../data/recruitment'
import { validateFields } from '../lib/validation'
import { clearDraft, hasApplied, loadDraft, saveDraft, submitApplication } from '../lib/recruitmentStore'
import { useDeadlinePassed } from '../hooks/useCountdown'
import { timeAgo } from '../lib/format'

const PRIMARY_FIELD = { id: 'primaryDomain', type: 'domain', label: 'Primary domain', required: true }
const DUPLICATE_EMAIL = 'An application already exists for this email in this cycle.'

const fieldsForStep = (step, values) => {
  const domain = getDomain(values.primaryDomain)
  switch (step) {
    case 0:
      return PERSONAL_FIELDS
    case 1:
      return [PRIMARY_FIELD, ...(domain?.questions || [])]
    case 2:
      return domain?.task.fields || []
    case 3:
      return MOTIVATION_FIELDS
    default:
      return []
  }
}

const validateStep = (step, values) => {
  const errs = validateFields(fieldsForStep(step, values), values)
  if (step === 0 && !errs.email && hasApplied(values.email)) errs.email = DUPLICATE_EMAIL
  return errs
}

const journeyStates = (current) => {
  const idx = JOURNEY.findIndex((j) => j.id === current)
  return Object.fromEntries(JOURNEY.map((j, i) => [j.id, i < idx ? 'done' : i === idx ? 'current' : 'upcoming']))
}

/* ── Small pieces ──────────────────────────────────────────────────────────── */
function StepHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-6 sm:mb-8">
      <p className="text-[10px] font-mono uppercase tracking-widest text-sky-400 mb-1.5">{eyebrow}</p>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-xl">{subtitle}</p>}
    </div>
  )
}

function FieldGrid({ fields, values, errors, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
      {fields.map((f) => (
        <FormField key={f.id} field={f} value={values[f.id]} error={errors[f.id]} onChange={onChange} />
      ))}
    </div>
  )
}

function DomainPicker({ value, secondary, onChange, error }) {
  return (
    <div className="mb-8">
      <p className="text-[13px] font-semibold text-slate-200 mb-2">
        Which domain are you applying for?<span className="text-sky-400 ml-0.5">*</span>
      </p>
      <div role="radiogroup" aria-label="Primary domain" className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {DOMAINS.map((d) => {
          const on = value === d.id
          const Icon = d.icon
          return (
            <button
              key={d.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange('primaryDomain', d.id)}
              className={`relative flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all active:scale-[0.97] ${
                on
                  ? 'bg-sky-400/10 border-sky-400/60 shadow-[0_0_20px_rgba(56,189,248,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]'
                  : 'bg-white/[0.03] border-white/10 hover:border-white/25'
              }`}
            >
              <Icon weight="duotone" className={`w-5 h-5 shrink-0 ${on ? 'text-sky-300' : 'text-slate-400'}`} />
              <span className={`text-xs sm:text-[13px] font-semibold leading-tight ${on ? 'text-white' : 'text-slate-300'}`}>{d.name}</span>
            </button>
          )
        })}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300">
          <WarningCircle weight="fill" className="w-3.5 h-3.5" />
          Pick the domain you want to apply for.
        </p>
      )}

      {value && (
        <div className="mt-5">
          <p className="text-[13px] font-semibold text-slate-200 mb-2">
            Secondary domain <span className="ml-1 text-[11px] font-normal text-slate-500">optional</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {[{ id: '', name: 'None' }, ...DOMAINS.filter((d) => d.id !== value)].map((d) => {
              const on = (secondary || '') === d.id
              return (
                <button
                  key={d.id || 'none'}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onChange('secondaryDomain', d.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
                    on
                      ? 'bg-violet-400/15 border-violet-400/50 text-violet-200'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                  }`}
                >
                  {d.name}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function Checkbox({ checked, onChange, children, error }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span
        className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-sky-400/60 ${
          checked ? 'bg-sky-400 border-sky-300' : error ? 'border-rose-400/70' : 'border-white/25 group-hover:border-white/40'
        }`}
        aria-hidden="true"
      >
        <motion.svg viewBox="0 0 16 16" className="w-3.5 h-3.5">
          <motion.path
            d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
            fill="none"
            stroke="#020617"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: checked ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.svg>
      </span>
      <span className="text-sm text-slate-300 leading-relaxed">{children}</span>
    </label>
  )
}

/** "Progress saved · 2 min ago" — refreshes itself so the form doesn't re-render on a timer. */
function SavedStatus({ savedAt }) {
  const [, tick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-500 truncate" aria-live="polite">
      <CloudCheck weight="bold" className="w-3.5 h-3.5 text-emerald-400/80 shrink-0" />
      {savedAt ? `Progress saved automatically · ${timeAgo(savedAt)}` : 'Your progress is saved automatically'}
    </span>
  )
}

function ClosedNotice() {
  return (
    <div className="max-w-xl mx-auto text-center p-1 rounded-3xl bg-white/5 border border-white/10">
      <div className="rounded-[calc(1.5rem-2px)] bg-[#050505]/85 px-6 py-12">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
          <Lock weight="duotone" className="w-7 h-7 text-slate-300" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Applications Closed</h1>
        <p className="mt-3 text-slate-400">Applications for {RECRUITMENT.cycle} are currently closed.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#/application" className="px-6 py-3 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-sky-100 transition-colors">
            Track my application
          </a>
          <a href="#home" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
            Back to site
          </a>
        </div>
      </div>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function ApplyPortal({ initialDomain }) {
  const [draft] = useState(loadDraft)
  const [values, setValues] = useState(() => {
    const base = draft?.values || {}
    const domain = getDomain(initialDomain) ? initialDomain : base.primaryDomain
    return { ...base, primaryDomain: domain || '', secondaryDomain: base.secondaryDomain === domain ? '' : base.secondaryDomain || '' }
  })
  const [step, setStep] = useState(() => draft?.step ?? 0)
  const [maxReached, setMaxReached] = useState(() => draft?.maxReached ?? 0)
  const [direction, setDirection] = useState(1)
  const [attempted, setAttempted] = useState({})
  const [declarations, setDeclarations] = useState({ accurate: false, noGuarantee: false })
  const [savedAt, setSavedAt] = useState(draft?.savedAt || null)
  const [showRestored, setShowRestored] = useState(!!draft)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [application, setApplication] = useState(null)
  const closed = useDeadlinePassed(RECRUITMENT.deadline)
  const topRef = useRef(null)

  const domain = getDomain(values.primaryDomain)
  const errors = useMemo(() => (attempted[step] ? validateStep(step, values) : {}), [attempted, step, values])

  // Autosave — debounced so typing doesn't hammer storage.
  useEffect(() => {
    if (application) return
    const t = setTimeout(() => {
      const at = saveDraft({ values, step, maxReached })
      if (at) setSavedAt(at)
    }, 600)
    return () => clearTimeout(t)
  }, [values, step, maxReached, application])

  const onChange = (id, v) =>
    setValues((prev) => {
      const next = { ...prev, [id]: v }
      if (id === 'primaryDomain' && prev.primaryDomain !== v) {
        // Skill chips are domain-specific; free-text answers carry over.
        next.skills = []
        if (prev.secondaryDomain === v) next.secondaryDomain = ''
      }
      return next
    })

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const goTo = (i) => {
    setDirection(i > step ? 1 : -1)
    setStep(i)
    setSubmitError(null)
    scrollTop()
  }

  const focusFirstError = () =>
    requestAnimationFrame(() => {
      const el = document.querySelector('[aria-invalid="true"], [role="alert"]')
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      if (el?.matches('input, textarea, select')) el.focus({ preventScroll: true })
    })

  const next = () => {
    setAttempted((a) => ({ ...a, [step]: true }))
    if (Object.keys(validateStep(step, values)).length) return focusFirstError()
    const n = step + 1
    setMaxReached((m) => Math.max(m, n))
    goTo(n)
  }

  const submit = async () => {
    setAttempted((a) => ({ ...a, [step]: true }))
    if (!declarations.accurate || !declarations.noGuarantee) return
    // Re-validate everything in case an earlier step was edited into an invalid state.
    for (let i = 0; i < STEPS.length - 1; i++) {
      if (Object.keys(validateFields(fieldsForStep(i, values), values)).length) {
        setAttempted((a) => ({ ...a, [i]: true }))
        return goTo(i)
      }
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      const record = await submitApplication(values)
      // Jump (not smooth-scroll) to the top so the checkmark animation plays in view.
      window.scrollTo({ top: 0, behavior: 'instant' })
      setApplication(record)
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const startOver = () => {
    clearDraft()
    setValues({ primaryDomain: '', secondaryDomain: '' })
    setStep(0)
    setMaxReached(0)
    setAttempted({})
    setShowRestored(false)
  }

  const journey = journeyStates(
    application ? 'shortlist' : !values.primaryDomain ? 'choose' : step >= 2 ? 'task' : 'apply'
  )

  if (closed && !application) {
    return (
      <PortalShell showCountdown={false}>
        <ClosedNotice />
      </PortalShell>
    )
  }

  return (
    <PortalShell showCountdown={!application}>
      <div ref={topRef} className="max-w-4xl mx-auto scroll-mt-28">
        {/* Journey */}
        <div className="mb-6 sm:mb-8 px-1">
          <JourneyMap states={journey} />
        </div>

        {application ? (
          <SubmissionSuccess application={application} />
        ) : (
          <>
            <AnimatePresence>
              {showRestored && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-4 flex items-center gap-3 rounded-2xl border border-sky-400/25 bg-sky-500/[0.07] px-4 py-3"
                >
                  <CloudCheck weight="duotone" className="w-5 h-5 text-sky-300 shrink-0" />
                  <p className="text-sm text-slate-200 flex-1 min-w-0">
                    Welcome back{values.fullName ? `, ${values.fullName.split(' ')[0]}` : ''} — we restored your saved progress.
                    <button type="button" onClick={startOver} className="ml-2 text-sky-300 hover:text-sky-200 font-semibold underline underline-offset-2">
                      Start over
                    </button>
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowRestored(false)}
                    aria-label="Dismiss"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 shrink-0"
                  >
                    <X weight="bold" className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-1 rounded-3xl bg-white/5 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
              <div className="rounded-[calc(1.5rem-2px)] bg-[#050B18]/92 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                {/* Progress */}
                <div className="px-5 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-white/[0.06]">
                  <StepProgress step={step} maxReached={maxReached} onJump={goTo} />
                </div>

                {/* Step body */}
                <div className="relative px-5 sm:px-8 py-7 sm:py-9 overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={step}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -28 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      {step === 0 && (
                        <>
                          <StepHeading
                            eyebrow="Phase 01 · Personal"
                            title="Let’s start with you"
                            subtitle={`Only students with a valid ${RECRUITMENT.emailDomain} email are eligible. We’ll use it for all updates.`}
                          />
                          <FieldGrid fields={PERSONAL_FIELDS} values={values} errors={errors} onChange={onChange} />
                          {errors.email === DUPLICATE_EMAIL && (
                            <a href="#/application" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200">
                              Track your existing application <ArrowRight weight="bold" className="w-4 h-4" />
                            </a>
                          )}
                        </>
                      )}

                      {step === 1 && (
                        <>
                          <StepHeading
                            eyebrow="Phase 02 · Domain & Skills"
                            title="Pick your path"
                            subtitle="The questions below adapt to the domain you choose — only what’s relevant."
                          />
                          <DomainPicker
                            value={values.primaryDomain}
                            secondary={values.secondaryDomain}
                            onChange={onChange}
                            error={errors.primaryDomain}
                          />
                          <AnimatePresence mode="wait" initial={false}>
                            {domain && (
                              <motion.div
                                key={domain.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.22 }}
                              >
                                <div className="flex items-center gap-3 mb-5 pt-6 border-t border-white/[0.06]">
                                  <domain.icon weight="duotone" className="w-5 h-5 text-sky-300" />
                                  <h3 className="text-base font-bold text-white">{domain.name} questions</h3>
                                </div>
                                <FieldGrid fields={domain.questions} values={values} errors={errors} onChange={onChange} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}

                      {step === 2 && domain && (
                        <>
                          <StepHeading
                            eyebrow={`Phase 03 · ${domain.name} Task`}
                            title={domain.task.title}
                            subtitle="This is the most important part of your application. Quality over polish — show us how you think."
                          />
                          <div className="mb-8 rounded-2xl border border-sky-400/20 bg-gradient-to-br from-sky-500/[0.08] to-transparent p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Target weight="bold" className="w-4 h-4 text-sky-300" />
                              <p className="text-[11px] font-mono uppercase tracking-widest text-sky-300">The brief</p>
                            </div>
                            <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed">{domain.task.brief}</p>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mr-1 self-center">Submit</span>
                              {domain.task.deliverables.map((d) => (
                                <span key={d} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">
                                  {d}
                                </span>
                              ))}
                            </div>
                          </div>
                          <FieldGrid fields={domain.task.fields} values={values} errors={errors} onChange={onChange} />
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <StepHeading
                            eyebrow="Phase 04 · Motivation"
                            title="Why you, why us?"
                            subtitle="No right answers. Be specific and be yourself."
                          />
                          <FieldGrid fields={MOTIVATION_FIELDS} values={values} errors={errors} onChange={onChange} />
                        </>
                      )}

                      {step === 4 && (
                        <>
                          <StepHeading
                            eyebrow="Phase 05 · Review & Submit"
                            title="One last look"
                            subtitle="Check everything below. You can jump back and edit any section."
                          />
                          <ApplicationSummary values={values} onEdit={goTo} />

                          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col gap-4">
                            <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">Declaration</p>
                            <Checkbox
                              checked={declarations.accurate}
                              error={attempted[4] && !declarations.accurate}
                              onChange={(v) => setDeclarations((d) => ({ ...d, accurate: v }))}
                            >
                              I confirm that the information provided is accurate.
                            </Checkbox>
                            <Checkbox
                              checked={declarations.noGuarantee}
                              error={attempted[4] && !declarations.noGuarantee}
                              onChange={(v) => setDeclarations((d) => ({ ...d, noGuarantee: v }))}
                            >
                              I understand that submitting the application does not guarantee selection.
                            </Checkbox>
                            {attempted[4] && !(declarations.accurate && declarations.noGuarantee) && (
                              <p role="alert" className="flex items-center gap-1.5 text-xs text-rose-300">
                                <WarningCircle weight="fill" className="w-3.5 h-3.5" />
                                Please accept both declarations to submit.
                              </p>
                            )}
                          </div>

                          {submitError && (
                            <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-rose-300 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3">
                              <WarningCircle weight="fill" className="w-4 h-4 mt-0.5 shrink-0" />
                              {submitError}
                            </p>
                          )}
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer nav */}
                <div className="flex items-center justify-between gap-3 px-5 sm:px-8 py-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3 min-w-0">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => goTo(step - 1)}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <ArrowLeft weight="bold" className="w-4 h-4" />
                        Back
                      </button>
                    )}
                    <SavedStatus savedAt={savedAt} />
                  </div>

                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="group shrink-0 whitespace-nowrap inline-flex items-center gap-2 pl-5 pr-4 py-2.5 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-sky-100 hover:shadow-[0_4px_24px_rgba(56,189,248,0.35)] active:scale-[0.97] transition-all"
                    >
                      Continue
                      <ArrowRight weight="bold" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      disabled={submitting}
                      className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-sky-200 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_24px_rgba(56,189,248,0.4)] hover:shadow-[0_0_36px_rgba(56,189,248,0.6)] active:scale-[0.97] transition-all disabled:opacity-70 disabled:cursor-wait"
                    >
                      {submitting ? (
                        <>
                          <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit Application
                          <PaperPlaneTilt weight="fill" className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <p className="sm:hidden mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <CloudCheck weight="bold" className="w-3.5 h-3.5 text-emerald-400/80" />
              Your progress is saved automatically
            </p>
          </>
        )}
      </div>
    </PortalShell>
  )
}
