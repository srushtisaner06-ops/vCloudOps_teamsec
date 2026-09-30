import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrolled } from '../hooks/useScrolled'

/* ─────────────────────────────────────────────────────────────
   Navigation links
───────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',    href: '#home'    },
  { label: 'About',   href: '#about'   },
  { label: 'Events',  href: '#events'  },
  { label: 'Team',    href: '#team'    },
  { label: 'Contact', href: '#contact' },
]

/* ─────────────────────────────────────────────────────────────
   Club Logo — Official brand mark rendered at high clarity
   with Apple-style specular drop shadow for dark mode depth.
───────────────────────────────────────────────────────────── */
function LogoIcon({ className = "h-12 sm:h-14 md:h-16 w-auto" }) {
  return (
    <img
      src="/logo.png"
      alt="vCloudOps Official Logo"
      draggable={false}
      className={`${className} object-contain transition-transform duration-300 group-hover:scale-105`}
      style={{
        display: 'block',
        flexShrink: 0,
        filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.75)) drop-shadow(0 4px 14px rgba(76,214,255,0.40))',
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────
   Navbar — Apple Class Frosted Glass Floating Island
   inspired by Apple VisionOS & GDG Community websites.
───────────────────────────────────────────────────────────── */
export default function Navbar() {
  const scrolled = useScrolled(30)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [active, setActive]         = useState('#home')
  const [hoveredIdx, setHoveredIdx] = useState(null)

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNav = (href) => {
    setActive(href)
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      {/* ── Apple-Class Floating Capsule ── */}
      <nav
        className="pointer-events-auto max-w-7xl mx-auto rounded-2xl sm:rounded-full transition-all duration-500 ease-out"
        style={{
          background: scrolled
            ? 'rgba(5, 11, 24, 0.78)'
            : 'rgba(7, 15, 32, 0.55)',
          backdropFilter: 'blur(24px) saturate(190%)',
          WebkitBackdropFilter: 'blur(24px) saturate(190%)',
          border: scrolled
            ? '1px solid rgba(255, 255, 255, 0.14)'
            : '1px solid rgba(255, 255, 255, 0.10)',
          boxShadow: scrolled
            ? '0 20px 48px -10px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 0 30px rgba(76, 214, 255, 0.12)'
            : '0 12px 32px -8px rgba(0, 0, 0, 0.50), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 18px rgba(76, 214, 255, 0.05)',
        }}
      >
        <div className="px-4 sm:px-6 h-[72px] sm:h-[82px] flex items-center justify-between gap-4">

          {/* ── Left: Official Brand Logo & GDG Status Badge ── */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <a
              href="#home"
              onClick={() => handleNav('#home')}
              className="flex items-center group"
              aria-label="vCloudOps — Home"
            >
              <LogoIcon />
            </a>
          </div>

          {/* ── Center: Apple Sliding Pill Tray Navigation ── */}
          <div className="hidden md:flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <ul className="flex items-center gap-1 list-none m-0 p-0 relative" onMouseLeave={() => setHoveredIdx(null)}>
              {NAV_LINKS.map(({ label, href }, idx) => {
                const isActive = active === href
                const isHovered = hoveredIdx === idx

                return (
                  <li key={label} className="relative">
                    <a
                      href={href}
                      onClick={() => handleNav(href)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      className={`relative z-10 px-4 py-2 rounded-full text-sm transition-colors duration-200 block text-center ${
                        isActive
                          ? 'text-white font-bold'
                          : isHovered
                          ? 'text-white font-semibold'
                          : 'text-slate-100/90 hover:text-white font-medium'
                      }`}
                      style={{
                        fontFamily: 'var(--font-main)',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.85)',
                      }}
                    >
                      {label}

                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.span
                          layoutId="activeDot"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#38BDF8]"
                          style={{ boxShadow: '0 0 8px #38BDF8' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>

                    {/* Apple sliding glass pill behind hovered link */}
                    {isHovered && (
                      <motion.div
                        layoutId="navHoverPill"
                        className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/[0.16] shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ── Right: Apple Class CTA & Mobile Trigger ── */}
          <div className="flex items-center gap-3">
            {/* Apple style gradient glass pill button */}
            <motion.a
              href="#contact"
              onClick={() => handleNav('#contact')}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold rounded-full px-5 py-2.5 transition-all duration-300 relative group overflow-hidden"
              style={{
                fontFamily: 'var(--font-main)',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(2, 132, 199, 0.38) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.55)',
                color: '#FFFFFF',
                boxShadow: '0 4px 20px rgba(56, 189, 248, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.45)',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.85)',
                textDecoration: 'none',
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 6px 28px rgba(56, 189, 248, 0.50), inset 0 1px 2px rgba(255, 255, 255, 0.70)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {/* Shimmer reflection sweep on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <span className="relative z-10 flex items-center gap-2">
                Join Community
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path
                    d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.a>

            {/* Apple styled Hamburger (Mobile) */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 rounded-full gap-1.5 transition-all"
              style={{
                background: menuOpen ? 'rgba(76,214,255,0.15)' : 'rgba(255,255,255,0.06)',
                border: '1px solid ' + (menuOpen ? 'rgba(76,214,255,0.40)' : 'rgba(255,255,255,0.12)'),
                cursor: 'pointer',
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    width: 20,
                    height: 2,
                    borderRadius: 4,
                    background: menuOpen ? '#4CD6FF' : '#EEF7FF',
                    transformOrigin: 'center',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: menuOpen
                      ? i === 0 ? 'translateY(7px) rotate(45deg)'
                      : i === 1 ? 'scaleX(0)'
                      : 'translateY(-7px) rotate(-45deg)'
                      : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                    width: i === 1 && !menuOpen ? 14 : 20,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Apple iOS Style Glass Sheet Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden pointer-events-auto max-w-7xl mx-auto mt-2 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(5, 11, 24, 0.88)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.18)',
            }}
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }, i) => {
                const isActive = active === href
                return (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={() => handleNav(href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-sky-500/15 text-[#38BDF8] border border-sky-500/30'
                        : 'text-slate-100 hover:bg-white/[0.08] hover:text-white'
                    }`}
                    style={{
                      fontFamily: 'var(--font-main)',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
                    )}
                  </motion.a>
                )
              })}

              {/* Mobile CTA */}
              <div className="pt-3 pb-1">
                <a
                  href="#contact"
                  onClick={() => handleNav('#contact')}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white text-center"
                  style={{
                    fontFamily: 'var(--font-main)',
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(2, 132, 199, 0.45) 100%)',
                    border: '1px solid rgba(56, 189, 248, 0.55)',
                    boxShadow: '0 4px 18px rgba(56, 189, 248, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  Join Community
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
