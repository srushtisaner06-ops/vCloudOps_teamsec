import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  ArrowUpRight,
  At,
  CheckCircle,
  Clock,
  Lock,
  SquaresFour,
  Target,
  X,
} from '@phosphor-icons/react'
import Countdown from './Countdown'
import LevelMeter from './LevelMeter'
import { DOMAINS, RECRUITMENT } from '../../data/recruitment'
import { useDeadlinePassed } from '../../hooks/useCountdown'
import { getLenis } from '../../utils/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

const applyHref = (domainId) => (domainId ? `#/apply/${domainId}` : '#/apply')

function ClosedPill({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 font-semibold text-sm cursor-not-allowed ${className}`}
    >
      <Lock weight="bold" className="w-4 h-4" />
      Applications Closed
    </span>
  )
}

/* ── Role details modal ────────────────────────────────────────────────────── */
function RoleModal({ domain, closed, onClose }) {
  useEffect(() => {
    getLenis()?.stop()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      // Re-read: the instance is gone if we're unmounting because the page changed.
      getLenis()?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const Icon = domain.icon
  // Portalled to <body> so it sits above the fixed navbar (main is its own stacking context).
  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="role-modal-title"
    >
      <div
        data-lenis-prevent
        className="relative w-full sm:max-w-2xl max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#081226] border border-sky-400/25 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.15)] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X weight="bold" className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/25 flex items-center justify-center">
              <Icon weight="duotone" className="w-6 h-6 text-sky-300" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-sky-400">{RECRUITMENT.cycle}</p>
              <h3 id="role-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {domain.name}
              </h3>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">{domain.description}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-3">Skills we look for</p>
              <ul className="flex flex-col gap-2">
                {domain.skills.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-slate-200">
                    <CheckCircle weight="fill" className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-3">What you’ll work on</p>
              <ul className="flex flex-col gap-2">
                {domain.expectedWork.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-slate-200">
                    <Target weight="bold" className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-white/10">
                <LevelMeter level={domain.level} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-400/20 bg-sky-500/[0.06] p-4 sm:p-5 mb-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-sky-300 mb-1">Recruitment task</p>
            <p className="text-base font-bold text-white mb-1.5">{domain.task.title}</p>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{domain.task.brief}</p>
            <div className="flex flex-wrap gap-1.5">
              {domain.task.deliverables.map((d) => (
                <span key={d} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {closed ? (
            <ClosedPill className="w-full" />
          ) : (
            <a
              href={applyHref(domain.id)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-300 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_28px_rgba(56,189,248,0.5)] active:scale-[0.98] transition-all"
            >
              Apply for {domain.name}
              <ArrowUpRight weight="bold" className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ── Domain card ───────────────────────────────────────────────────────────── */
function DomainCard({ domain, closed, onView }) {
  const Icon = domain.icon
  const extra = domain.skills.length - 3
  return (
    <article className="join-domain-card group p-1 rounded-3xl bg-white/5 border border-white/10 hover:border-sky-400/35 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(56,189,248,0.12)] flex">
      <div className="flex flex-col w-full p-5 rounded-[calc(1.5rem-2px)] bg-[#050505]/85 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-left">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
            <Icon weight="duotone" className="w-[22px] h-[22px] text-sky-300" />
          </div>
          <LevelMeter level={domain.level} />
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight mb-1">{domain.name}</h3>
        <p className="text-[13px] text-slate-400 leading-relaxed mb-4">{domain.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {domain.skills.slice(0, 3).map((s) => (
            <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
              {s}
            </span>
          ))}
          {extra > 0 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md text-sky-300 border border-sky-400/20">+{extra}</span>
          )}
        </div>

        <ul className="flex flex-col gap-1.5 mb-5 text-xs text-slate-300">
          {domain.expectedWork.slice(0, 2).map((w) => (
            <li key={w} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-sky-400 shrink-0" />
              {w}
            </li>
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onView(domain)}
            className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold hover:bg-white/10 hover:border-white/20 active:scale-[0.97] transition-all"
          >
            View Role
          </button>
          {closed ? (
            <span className="py-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-500 text-xs font-semibold text-center cursor-not-allowed">
              Closed
            </span>
          ) : (
            <a
              href={applyHref(domain.id)}
              className="py-2.5 rounded-xl bg-white text-slate-950 text-xs font-bold text-center hover:bg-sky-100 hover:shadow-[0_4px_18px_rgba(56,189,248,0.3)] active:scale-[0.97] transition-all inline-flex items-center justify-center gap-1"
              aria-label={`Apply for ${domain.name}`}
            >
              Apply
              <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/* ── Section ───────────────────────────────────────────────────────────────── */
export default function JoinSection({ standalone = false }) {
  const containerRef = useRef(null)
  const [viewing, setViewing] = useState(null)
  const closed = useDeadlinePassed(RECRUITMENT.deadline)
  const closeModal = useCallback(() => setViewing(null), [])

  useGSAP(() => {
    gsap.from('.join-reveal', {
      y: 28,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.join-header', start: 'top 85%' },
    })
    gsap.from('.join-domain-card', {
      y: 36,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.join-domain-grid', start: 'top 85%' },
    })
  }, { scope: containerRef })

  return (
    <section
      id={standalone ? undefined : 'join'}
      ref={containerRef}
      className={`relative flex flex-col items-center text-center scroll-mt-24 z-10 ${
        standalone ? 'pt-4 sm:pt-8 pb-8' : 'py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8'
      }`}
    >
      {/* Header */}
      <div className="join-header flex flex-col items-center max-w-3xl mb-10 sm:mb-12">
        <div className="join-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-sky-400/20 backdrop-blur-xl mb-6">
          <span className="relative flex h-2 w-2">
            {!closed && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${closed ? 'bg-slate-500' : 'bg-emerald-400'}`} />
          </span>
          <span className="text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold text-sky-300">{RECRUITMENT.cycle}</span>
        </div>

        <h2
          className="join-reveal font-extrabold text-white leading-[1.05] tracking-tight mb-5"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4.25rem)' }}
        >
          Build. Create. Lead.
          <br />
          <span className="text-[#0099FF]">Join Us.</span>
        </h2>

        <p className="join-reveal text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
          Your skills can become something bigger. Choose your domain, complete the application process, and become a part of our community.
        </p>
      </div>

      {/* Bento stats */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 mb-8 text-left">
        <div className="join-reveal md:col-span-2 p-1 rounded-3xl bg-gradient-to-b from-sky-500/25 via-white/5 to-white/5 border border-sky-400/25">
          <div className="h-full p-5 sm:p-6 rounded-[calc(1.5rem-2px)] bg-[#050B18]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
            <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-sky-400 mb-4">
              <Clock weight="bold" className="w-3.5 h-3.5" />
              {closed ? 'Status' : 'Applications close in'}
            </p>
            <Countdown />
          </div>
        </div>

        <div className="join-reveal p-1 rounded-3xl bg-white/5 border border-white/10">
          <div className="h-full p-5 sm:p-6 rounded-[calc(1.5rem-2px)] bg-[#050505]/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex md:flex-col items-center md:items-start justify-between gap-3">
            <SquaresFour weight="duotone" className="w-6 h-6 text-sky-300" />
            <div>
              <p className="font-mono tabular-nums font-extrabold text-white text-3xl leading-none">{String(DOMAINS.length).padStart(2, '0')}</p>
              <p className="mt-1.5 text-[11px] uppercase tracking-wider font-semibold text-slate-400">Open domains</p>
            </div>
          </div>
        </div>

        <div className="join-reveal p-1 rounded-3xl bg-white/5 border border-white/10">
          <div className="h-full p-5 sm:p-6 rounded-[calc(1.5rem-2px)] bg-[#050505]/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex md:flex-col items-center md:items-start justify-between gap-3">
            <At weight="bold" className="w-6 h-6 text-emerald-300" />
            <div>
              <p className="font-mono font-bold text-emerald-300 text-lg leading-none">{RECRUITMENT.emailDomain}</p>
              <p className="mt-1.5 text-[11px] uppercase tracking-wider font-semibold text-slate-400">Eligible students only</p>
            </div>
          </div>
        </div>
      </div>

      {/* Urgency CTA */}
      {closed ? (
        <div className="join-reveal flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-16 sm:mb-20">
          <ClosedPill />
        </div>
      ) : (
        <div className="join-reveal w-full max-w-5xl mb-6 p-1 rounded-3xl bg-gradient-to-r from-sky-500/30 via-white/5 to-violet-500/20 border border-sky-400/25">
          <div className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5 px-6 py-6 sm:px-8 sm:py-7 rounded-[calc(1.5rem-2px)] bg-[#050B18]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] text-center md:text-left">
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-56 h-56 bg-sky-500/15 rounded-full blur-[70px] pointer-events-none" />
            <div className="relative">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Don’t miss the chance.</p>
              <p className="mt-1.5 text-sm sm:text-base text-slate-300">
                <span className="font-semibold text-sky-300">Learn, Code &amp; Deploy</span> with us — you’ll regret it later.
              </p>
            </div>
            <a
              href={applyHref()}
              className="relative group shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-3 pl-6 pr-2 py-2 rounded-full font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-sky-400 via-sky-300 to-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.4)] hover:shadow-[0_0_36px_rgba(56,189,248,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Apply Now
              <span className="w-8 h-8 rounded-full bg-slate-950/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight weight="bold" className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      )}

      <a
        href="#/application"
        className="join-reveal mb-16 sm:mb-20 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
      >
        Already applied? Track my application
        <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
      </a>

      {/* Domains */}
      <div className="w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 text-left">
          <div>
            <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-sky-400 font-bold">Choose your domain</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">Where do you fit in?</h3>
          </div>
          <p className="text-sm text-slate-400">Pick a primary domain — you can add a secondary one in the form.</p>
        </div>

        <div className="join-domain-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DOMAINS.map((d) => (
            <DomainCard key={d.id} domain={d} closed={closed} onView={setViewing} />
          ))}
        </div>
      </div>

      {viewing && <RoleModal domain={viewing} closed={closed} onClose={closeModal} />}
    </section>
  )
}
