import { scrollToTarget } from '../utils/smoothScroll'
import {
  GithubLogo,
  DiscordLogo,
  LinkedinLogo,
  ArrowUpRight,
} from '@phosphor-icons/react'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events & Sprints', href: '#events' },
  { label: 'Leadership', href: '#team' },
  { label: 'Community', href: '#contact' },
]

export default function Footer() {
  const handleNav = (e, href) => {
    e.preventDefault()
    scrollToTarget(href, -85)
  }

  return (
    <footer
      className="relative z-10 border-t border-sky-500/20 bg-[#050B18]/90 backdrop-blur-2xl py-12 sm:py-16 px-4 sm:px-6 md:px-8 text-left"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Top Tier: Logo, Description & Links */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand info */}
          <div className="max-w-md">
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/logo-mark.png"
                alt="vCloudOps Logo"
                className="h-7 w-auto object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]"
              />
              <span className="font-extrabold text-white text-xl tracking-tight">
                vCloud<span className="text-sky-400">Ops</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              Student-led engineering collective dedicated to cloud architecture, DevOps pipelines, container systems, and open-source infrastructure.
            </p>
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All Cloud Systems Operational</span>
            </div>
          </div>

          {/* Quick links & socials */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-14">
            <div>
              <p className="text-xs font-mono font-bold tracking-widest uppercase text-sky-400 mb-3">
                Navigation
              </p>
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                {QUICK_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => handleNav(e, href)}
                      className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-mono font-bold tracking-widest uppercase text-sky-400 mb-3">
                Connect
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <GithubLogo weight="fill" className="w-5 h-5" />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Discord"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <DiscordLogo weight="fill" className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <LinkedinLogo weight="fill" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} vCloudOps. Built by students, for students.</p>
          <a
            href="#home"
            onClick={(e) => handleNav(e, '#home')}
            className="flex items-center gap-1 text-slate-400 hover:text-sky-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
