import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, Sparkle } from '@phosphor-icons/react'
import ScrollCue from './ScrollCue'
import { scrollToTarget } from '../utils/smoothScroll'

const HEADLINE_WORDS = ['Architect', 'the', 'Cloud.', 'Deploy', 'the', 'Future.']

const STATS = [
  { value: '40+', label: 'Active Members' },
  { value: '12+', label: 'Sprints & Labs' },
  { value: '6+', label: 'Live Deployments' },
  { value: '100%', label: 'Student-Driven' },
]

export default function Hero() {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.set('.hero-element', { y: 40, opacity: 0, filter: 'blur(8px)' })
    gsap.set('.word', { y: 30, opacity: 0, filter: 'blur(6px)', rotateX: -15 })

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.to('.hero-badge', {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      delay: 0.15,
    })
      .to(
        '.word',
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          rotateX: 0,
          duration: 0.9,
          stagger: 0.04,
        },
        '-=0.6'
      )
      .to(
        '.hero-desc',
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
        },
        '-=0.7'
      )
      .to(
        '.hero-cta',
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.08,
        },
        '-=0.8'
      )
      .to(
        '.hero-stats',
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
        },
        '-=0.8'
      )
      .to(
        '.hero-scroll',
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
        },
        '-=0.8'
      )
  }, { scope: containerRef })

  const handleNav = (e, href) => {
    e.preventDefault()
    scrollToTarget(href, -85)
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex flex-col items-center justify-center text-center min-h-[100dvh] pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 md:px-8 scroll-mt-24"
      style={{ zIndex: 1 }}
    >
      {/* Subtle Ethereal Ambient Radial Glows */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-30">
        <div className="w-[320px] sm:w-[500px] md:w-[700px] h-[320px] sm:h-[500px] md:h-[700px] bg-sky-500/25 rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="w-[240px] sm:w-[380px] md:w-[500px] h-[240px] sm:h-[380px] md:h-[500px] bg-indigo-500/20 rounded-full blur-[90px] sm:blur-[120px] translate-y-20" />
      </div>

      {/* Floating Community Badge */}
      <div className="hero-element hero-badge mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-sky-400/20 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.15)]">
          <Sparkle weight="fill" className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-sky-300">
            Official Cloud & DevOps Student Club
          </span>
        </div>
      </div>

      {/* Fluid Dynamic Headline */}
      <h1
        className="font-extrabold leading-[1.08] tracking-tight max-w-4xl text-white mb-6 sm:mb-8"
        style={{ fontSize: 'clamp(2.1rem, 6.2vw, 5rem)' }}
      >
        {HEADLINE_WORDS.map((word, i) => {
          const isAccent = word === 'Cloud.' || word === 'Future.'
          return (
            <span
              key={i}
              className={`word inline-block mr-[0.22em] ${isAccent
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-sky-600 drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]'
                : 'text-white'
                }`}
            >
              {word}
            </span>
          )
        })}
      </h1>

      {/* Tagline */}
      <p className="hero-element hero-desc max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-slate-300 font-normal mb-8 sm:mb-10 px-2">
        Where student engineers build, deploy, and scale — real cloud infrastructure, real CI/CD pipelines, real community.
      </p>

      {/* Responsive CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 w-full sm:w-auto mb-14 sm:mb-18">
        {/* Primary CTA */}
        <a
          href="#events"
          onClick={(e) => handleNav(e, '#events')}
          className="hero-element hero-cta group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-6 pr-2 py-2 rounded-full font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-white via-slate-100 to-sky-100 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_30px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Explore Workshops</span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight weight="bold" className="w-4 h-4 text-slate-950" />
          </div>
        </a>

        {/* Secondary CTA */}
        <a
          href="#about"
          onClick={(e) => handleNav(e, '#about')}
          className="hero-element hero-cta group w-full sm:w-auto inline-flex items-center justify-center p-0.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
        >
          <div className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#050B18]/80 text-white font-semibold text-sm sm:text-base border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:border-sky-400/30 transition-all">
            About the Club
          </div>
        </a>
      </div>

      {/* Responsive Stats Grid */}
      <div className="hero-element hero-stats grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 w-full max-w-4xl px-2">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-sky-400/30 hover:scale-[1.02]"
          >
            <div className="flex flex-col items-center justify-center gap-1 py-4 sm:py-5 px-3 rounded-[calc(1rem-2px)] bg-[#050505]/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]">
                {value}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-slate-400 text-center">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Scroll Cue */}
      <div className="hero-element hero-scroll mt-10 sm:mt-14">
        <ScrollCue />
      </div>
    </section>
  )
}
