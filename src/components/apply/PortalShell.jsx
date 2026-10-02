import { MotionConfig } from 'framer-motion'
import { ArrowLeft, Clock } from '@phosphor-icons/react'
import SpaceBackground from '../SpaceBackground'
import Countdown from '../join/Countdown'
import { RECRUITMENT } from '../../data/recruitment'
import { useDeadlinePassed } from '../../hooks/useCountdown'

/** Shared chrome for the application portal pages: backdrop, top bar, container. */
export default function PortalShell({ children, showCountdown = true, backHref = '#/join', backLabel = 'Back to recruitment' }) {
  const closed = useDeadlinePassed(RECRUITMENT.deadline)

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-[100dvh] bg-[#050B18] text-[#F8FAFC] selection:bg-sky-500/30 selection:text-sky-200">
        <SpaceBackground />

        <header className="sticky top-0 z-40 px-3 sm:px-6 pt-3 sm:pt-4">
          <div className="mx-auto max-w-4xl flex items-center justify-between gap-3 rounded-full px-3 sm:px-4 py-2 bg-[#050B18]/85 border border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <a href={backHref} className="flex items-center gap-2 pl-1 pr-2 py-1 group min-w-0" aria-label={backLabel}>
              <ArrowLeft weight="bold" className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors shrink-0" />
              <img src="/Logo/logo-icon.png" alt="" className="h-6 w-auto object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] shrink-0" />
              <span className="hidden min-[400px]:inline font-extrabold text-white text-sm sm:text-base tracking-tight whitespace-nowrap">
                vCloud<span className="text-sky-400">Ops</span>
              </span>
              <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1 whitespace-nowrap">
                {RECRUITMENT.cycle}
              </span>
            </a>
            {showCountdown && !closed && (
              <div className="flex items-center gap-2 pr-1 sm:pr-2 min-w-0">
                <Clock weight="bold" className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="hidden md:inline text-[11px] text-slate-400 whitespace-nowrap">Closes in</span>
                <Countdown compact />
              </div>
            )}
          </div>
        </header>

        <main className="relative z-10 px-4 sm:px-6 pt-8 sm:pt-12 pb-24">{children}</main>
      </div>
    </MotionConfig>
  )
}
