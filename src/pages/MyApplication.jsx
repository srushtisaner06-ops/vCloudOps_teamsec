import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Bell,
  CalendarBlank,
  CaretDown,
  ChatsCircle,
  CircleNotch,
  Clock,
  SignOut,
  Target,
  WarningCircle,
} from '@phosphor-icons/react'
import PortalShell from '../components/apply/PortalShell'
import ApplicationTimeline from '../components/apply/ApplicationTimeline'
import ApplicationSummary from '../components/apply/ApplicationSummary'
import FormField from '../components/apply/FormField'
import Countdown from '../components/join/Countdown'
import { PERSONAL_FIELDS, RECRUITMENT, STATUS_STAGE, TIMELINE_STAGES, getDomain } from '../data/recruitment'
import { clearSession, findApplication, getSession, setSession } from '../lib/recruitmentStore'
import { isVitEmail } from '../lib/validation'
import { fmtDate, fmtTimestamp, timeAgo } from '../lib/format'

const STATUS_META = {
  SUBMITTED: { label: 'Submitted', tone: 'sky', banner: null },
  UNDER_REVIEW: { label: 'Under Review', tone: 'sky', banner: 'Your application is being reviewed by the core team.' },
  SHORTLISTED: { label: 'Shortlisted', tone: 'emerald', banner: '🎉 You’ve been shortlisted!' },
  TASK_ASSIGNED: { label: 'Task Assigned', tone: 'violet', banner: 'Your domain task has been assigned.' },
  TASK_SUBMITTED: { label: 'Task Submitted', tone: 'sky', banner: 'Task received — evaluation in progress.' },
  INTERVIEW_SCHEDULED: { label: 'Interview Scheduled', tone: 'violet', banner: 'Your interview has been scheduled.' },
  SELECTED: { label: 'Selected', tone: 'emerald', banner: '🎉 Welcome to vCloudOps!' },
  NOT_SELECTED: { label: 'Not Selected', tone: 'slate', banner: null },
}

const TONE = {
  sky: 'bg-sky-400/10 border-sky-400/30 text-sky-200',
  emerald: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-200',
  violet: 'bg-violet-400/10 border-violet-400/30 text-violet-200',
  slate: 'bg-white/5 border-white/15 text-slate-300',
}

const EMAIL_FIELD = PERSONAL_FIELDS.find((f) => f.id === 'email')

function Card({ icon: Icon, title, children, className = '' }) {
  return (
    <section className={`p-1 rounded-3xl bg-white/5 border border-white/10 ${className}`}>
      <div className="h-full rounded-[calc(1.5rem-2px)] bg-[#050505]/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-4">
          <Icon weight="bold" className="w-4 h-4 text-sky-400" />
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

/* ── Sign-in (VIT email lookup) ────────────────────────────────────────────── */
function Lookup({ onFound }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setNotFound(false)
    if (!isVitEmail(email)) return setError(`Use your college email ending in ${RECRUITMENT.emailDomain}`)
    setError(null)
    setLoading(true)
    const app = await findApplication(email)
    setLoading(false)
    if (!app) return setNotFound(true)
    setSession(app.email)
    onFound(app)
  }

  return (
    <div className="max-w-md mx-auto p-1 rounded-3xl bg-white/5 border border-white/10">
      <form onSubmit={submit} noValidate className="rounded-[calc(1.5rem-2px)] bg-[#050B18]/92 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-6 sm:p-8">
        <p className="text-[10px] font-mono uppercase tracking-widest text-sky-400 mb-1.5">{RECRUITMENT.cycle}</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">My Application</h1>
        <p className="mt-2 mb-6 text-sm text-slate-400">Sign in with the VIT email you applied with to track your status.</p>

        <FormField field={EMAIL_FIELD} value={email} error={error} onChange={(_, v) => setEmail(v)} />

        {notFound && (
          <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-slate-300 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <WarningCircle weight="fill" className="w-4 h-4 mt-0.5 text-amber-300 shrink-0" />
            <span>
              No application found for this email.{' '}
              <a href="#/apply" className="text-sky-300 font-semibold hover:text-sky-200">Start one now →</a>
            </span>
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-slate-950 font-bold text-sm hover:bg-sky-100 active:scale-[0.98] transition-all disabled:opacity-70"
        >
          {loading ? <CircleNotch weight="bold" className="w-4 h-4 animate-spin" /> : <ArrowRight weight="bold" className="w-4 h-4" />}
          {loading ? 'Looking up…' : 'View my application'}
        </button>
        <p className="mt-4 text-[11px] text-slate-500 text-center">
          Applications are currently stored on this device only.
        </p>
      </form>
    </div>
  )
}

/* ── Dashboard ─────────────────────────────────────────────────────────────── */
function Dashboard({ app, onSignOut }) {
  const [showDetails, setShowDetails] = useState(false)
  const domain = getDomain(app.primaryDomain)
  const secondary = getDomain(app.secondaryDomain)
  const meta = STATUS_META[app.status] || STATUS_META.SUBMITTED
  const stage = TIMELINE_STAGES[Math.min(STATUS_STAGE[app.status] ?? 1, TIMELINE_STAGES.length - 1)]
  const taskLinks = (domain?.task.fields || []).filter((f) => app.data[f.id])

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-1 rounded-3xl bg-gradient-to-b from-sky-500/25 via-white/5 to-white/5 border border-sky-400/25">
        <div className="rounded-[calc(1.5rem-2px)] bg-[#050B18]/92 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-widest text-sky-400 mb-1.5">My Application</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Hi, {app.name.split(' ')[0]}</h1>
              <p className="mt-1 font-mono text-sm text-slate-300 break-all">{app.id}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono font-bold uppercase tracking-wider ${TONE[meta.tone]}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {meta.label}
              </span>
              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <SignOut weight="bold" className="w-3.5 h-3.5" />
                Sign out
              </button>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { k: 'Domain', v: domain?.name },
              { k: 'Secondary', v: secondary?.name || '—' },
              { k: 'Submitted', v: fmtDate(app.submittedAt) },
              { k: 'Current phase', v: stage.title },
            ].map(({ k, v }) => (
              <div key={k} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 min-w-0">
                <dt className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{k}</dt>
                <dd className="mt-1 text-sm font-semibold text-white truncate">{v}</dd>
              </div>
            ))}
          </dl>

          {meta.banner && (
            <p className="mt-4 rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.08] px-4 py-3 text-sm font-semibold text-emerald-200">
              {meta.banner}
            </p>
          )}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-4">
        <Card icon={Target} title="Your Application Journey" className="lg:col-span-3">
          <ApplicationTimeline status={app.status} submittedAt={app.submittedAt} />
        </Card>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card icon={Clock} title="Recruitment deadline">
            <p className="text-sm text-slate-300 mb-3">
              Applications close on <span className="text-white font-semibold">{fmtTimestamp(RECRUITMENT.deadline)}</span>
            </p>
            <Countdown compact />
          </Card>

          <Card icon={Bell} title="Notifications">
            <ul className="flex flex-col gap-3">
              {[...(app.notifications || [])].reverse().map((n) => (
                <li key={n.id} className="flex gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{n.title}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{n.body}</p>
                    <p className="mt-0.5 text-[10px] font-mono text-slate-500">{timeAgo(n.at)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card icon={Target} title="Task">
          <p className="text-base font-bold text-white">{domain?.task.title}</p>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">{domain?.task.brief}</p>
          {taskLinks.length > 0 && (
            <ul className="mt-4 flex flex-col gap-1.5 text-sm">
              {taskLinks.map((f) => (
                <li key={f.id} className="flex items-baseline gap-2 min-w-0">
                  <span className="text-slate-500 text-xs shrink-0">{f.label}:</span>
                  {f.type === 'url' ? (
                    <a href={app.data[f.id]} target="_blank" rel="noreferrer noopener" className="text-sky-300 hover:text-sky-200 truncate">
                      {app.data[f.id].replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  ) : f.type === 'file' ? (
                    <span className="text-slate-200 truncate">{app.data[f.id].name}</span>
                  ) : (
                    <span className="text-emerald-300 text-xs">Submitted</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card icon={ChatsCircle} title="Interview details">
          {app.interview ? (
            <div className="text-sm text-slate-200 flex flex-col gap-1.5">
              <p className="flex items-center gap-2"><CalendarBlank weight="bold" className="w-4 h-4 text-sky-400" />{fmtTimestamp(app.interview.at)}</p>
              <p className="text-slate-400">{app.interview.mode}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-400 leading-relaxed">
              Interview slots are shared with shortlisted candidates. You’ll get a notification here and on your VIT email.
            </p>
          )}
        </Card>
      </div>

      {/* Submitted information */}
      <section className="rounded-3xl border border-white/10 bg-[#050505]/70 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowDetails((s) => !s)}
          aria-expanded={showDetails}
          className="w-full flex items-center justify-between gap-3 px-5 sm:px-6 py-4 text-left"
        >
          <span className="text-sm font-bold text-white">Submitted information</span>
          <CaretDown weight="bold" className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence initial={false}>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-6 pb-6">
                <ApplicationSummary values={app.data} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

export default function MyApplication() {
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(() => !!getSession())

  useEffect(() => {
    let alive = true
    const load = () => {
      const email = getSession()
      ;(email ? findApplication(email) : Promise.resolve(null)).then((found) => {
        if (!alive) return
        setApp(found)
        setLoading(false)
      })
    }
    load()
    // Pick up status changes written from another tab (stand-in for realtime backend updates).
    const onStorage = (e) => e.key?.startsWith('vcloudops.recruitment') && load()
    window.addEventListener('storage', onStorage)
    return () => {
      alive = false
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const signOut = () => {
    clearSession()
    setApp(null)
  }

  return (
    <PortalShell showCountdown={false}>
      {loading ? (
        <div className="flex justify-center py-24">
          <CircleNotch weight="bold" className="w-6 h-6 text-sky-400 animate-spin" />
        </div>
      ) : app ? (
        <Dashboard app={app} onSignOut={signOut} />
      ) : (
        <Lookup onFound={setApp} />
      )}
    </PortalShell>
  )
}
