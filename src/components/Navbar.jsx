import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { List, X, ArrowUpRight } from '@phosphor-icons/react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Events', href: '#events' },
  { label: 'Team', href: '#team' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Scroll active detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => document.querySelector(link.href))
      const scrollPos = window.scrollY + 200
      sections.forEach((sec) => {
        if (sec && sec.offsetTop <= scrollPos && (sec.offsetTop + sec.offsetHeight) > scrollPos) {
          setActive('#' + sec.id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP Menu Animation
  useGSAP(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.6,
        ease: 'power4.out',
      })
      gsap.fromTo(
        '.mobile-nav-link',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power4.out', delay: 0.1 }
      )
    } else {
      gsap.to(menuRef.current, {
        y: -12,
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.4,
        ease: 'power3.in',
      })
    }
  }, [menuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 pt-6 px-4 md:px-0">
        <nav className="mx-auto w-max rounded-full p-1.5 bg-[#050505]/60 border border-white/10 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center gap-4">
          
          <div className="pl-4 pr-2 py-1 flex items-center">
            <span className="font-extrabold text-white text-lg tracking-tight">vCloudOps</span>
          </div>

          <ul className="hidden md:flex items-center gap-1 px-4 border-l border-white/10">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === href
              return (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => setActive(href)}
                    className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="relative z-10">{label}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] pointer-events-none" />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="hidden md:flex pr-1">
            <a href="#contact" className="group flex items-center gap-2 pl-4 pr-1 py-1 rounded-full bg-white text-slate-900 font-bold text-sm transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-slate-200 hover:scale-[0.98]">
              Join
              <div className="w-7 h-7 rounded-full bg-[#050505]/10 flex items-center justify-center transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:-translate-y-[1px] group-hover:translate-x-[1px]">
                <ArrowUpRight weight="bold" className="w-3 h-3" />
              </div>
            </a>
          </div>

          {/* Mobile hamburger morph */}
          <button
            className="md:hidden relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X weight="bold" className="text-white w-5 h-5" /> : <List weight="bold" className="text-white w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Massive Mobile Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-3xl pt-32 px-6 opacity-0 pointer-events-none"
      >
        <div className="flex flex-col gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => { setActive(href); setMenuOpen(false); }}
              className="mobile-nav-link text-4xl font-bold text-slate-400 hover:text-white transition-colors duration-300"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mobile-nav-link mt-8 w-full group flex justify-between items-center pl-6 pr-2 py-2 rounded-full bg-white text-slate-900 font-bold text-xl transition-all hover:bg-slate-200"
          >
            Join Community
            <div className="w-12 h-12 rounded-full bg-[#050505]/10 flex items-center justify-center">
              <ArrowUpRight weight="bold" className="w-5 h-5" />
            </div>
          </a>
        </div>
      </div>
    </>
  )
}
