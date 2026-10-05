import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { List, X, ArrowUpRight, DiscordLogo, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { scrollToTarget } from '../utils/smoothScroll'
import { useScrolled } from '../hooks/useScrolled'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Team', href: '#team' },
  { label: 'Community', href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const isScrolled = useScrolled(25)

  // Scroll active detection throttled with requestAnimationFrame
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 140
          for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
            const sec = document.querySelector(NAV_LINKS[i].href)
            if (sec) {
              const top = sec.offsetTop
              const height = sec.offsetHeight
              if (scrollPos >= top && scrollPos < top + height) {
                setActive(NAV_LINKS[i].href)
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMenuOpen(false)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // GSAP Mobile Menu Animation
  useGSAP(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.45,
        ease: 'power3.out',
      })
      gsap.fromTo(
        '.mobile-nav-item',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out', delay: 0.1 }
      )
    } else {
      gsap.to(menuRef.current, {
        y: -10,
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setActive(href)
    setMenuOpen(false)
    scrollToTarget(href, -85)
  }

  return (
    <>
      <header className="main-nav-header fixed top-0 left-0 w-full z-50 pt-3 sm:pt-5 px-3 sm:px-6 pointer-events-none">
        <nav
          className={`pointer-events-auto mx-auto w-full md:w-max rounded-full px-3 sm:px-4 py-2 border transition-all duration-500 flex items-center justify-between md:justify-center gap-2 sm:gap-4 flex-nowrap nav-blur-island ${
            isScrolled
              ? 'bg-[#050B18]/70 border-sky-500/30 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(56,189,248,0.15),inset_0_1px_1px_rgba(255,255,255,0.18)]'
              : 'bg-[#050B18]/50 border-white/12 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)]'
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 pl-1.5 sm:pl-2.5 pr-2 py-1 select-none group shrink-0 whitespace-nowrap min-w-0"
          >
            <img
              src="/Logo/logo-icon.png"
              alt="vCloudOps Logo"
              className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)] shrink-0"
            />
            <span className="font-extrabold text-white text-base sm:text-lg tracking-tight whitespace-nowrap">
              vCloud<span className="text-sky-400">Ops</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 px-3 border-l border-white/10 list-none m-0">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === href
              return (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                    }`}
                  >
                    <span className="relative z-10">{label}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-white/10 border border-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] pointer-events-none" />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex pl-2 pr-1">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="group flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-sky-200 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Join Us
              <div className="w-6 h-6 rounded-full bg-slate-950/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>

          {/* Mobile Right Controls: Hamburger Toggle (+ optional tablet Join) */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            {/* Tablet-only quick Join button; hidden on narrow mobile (<640px) to prevent overlap */}
            {!menuOpen && (
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-sky-300 text-slate-950 font-bold text-xs items-center gap-1 active:scale-95 transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)] shrink-0 whitespace-nowrap"
              >
                <span>Join</span>
                <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={menuOpen}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white active:scale-95 transition-all hover:bg-white/15 shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X weight="bold" className="w-5 h-5 text-sky-400" /> : <List weight="bold" className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Modern Accessible Mobile Drawer */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#050B18]/85 backdrop-blur-2xl nav-blur-island pt-28 pb-8 px-6 opacity-0 pointer-events-none flex flex-col justify-between overflow-y-auto"
        onClick={(e) => {
          if (e.target === menuRef.current) setMenuOpen(false)
        }}
      >
        <div className="flex flex-col gap-2 max-w-sm mx-auto w-full pt-2">
          <p className="text-[11px] font-mono tracking-widest text-sky-400 uppercase mb-2 px-2">Navigation</p>
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = active === href
            return (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`mobile-nav-item flex items-center justify-between py-3 px-4 rounded-2xl text-xl sm:text-2xl font-bold transition-all ${
                  isActive
                    ? 'text-white bg-white/10 border border-white/15'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{label}</span>
                {isActive && <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />}
              </a>
            )
          })}

          <div className="mobile-nav-item pt-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-200 text-slate-950 font-bold text-base shadow-[0_0_25px_rgba(56,189,248,0.35)] active:scale-98 transition-transform"
            >
              <span>Join Community</span>
              <ArrowUpRight weight="bold" className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile footer within drawer */}
        <div className="max-w-sm mx-auto w-full pt-8 border-t border-white/10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full bg-white/5 text-slate-300 hover:text-white transition-colors"
            >
              <GithubLogo weight="fill" className="w-6 h-6" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="p-2 rounded-full bg-white/5 text-slate-300 hover:text-white transition-colors"
            >
              <DiscordLogo weight="fill" className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full bg-white/5 text-slate-300 hover:text-white transition-colors"
            >
              <LinkedinLogo weight="fill" className="w-6 h-6" />
            </a>
          </div>
          <span className="text-xs font-mono text-slate-500">vCloudOps • Official Student Chapter</span>
        </div>
      </div>
    </>
  )
}
