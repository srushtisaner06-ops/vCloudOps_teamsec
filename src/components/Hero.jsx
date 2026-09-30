import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import ScrollCue from './ScrollCue'

const HEADLINE_WORDS = ['Architect', 'the', 'Cloud.', 'Deploy', 'the', 'Future.']

export default function Hero() {
  const containerRef = useRef(null)
  
  useGSAP(() => {
    gsap.set('.hero-element', { y: 64, opacity: 0, filter: 'blur(12px)' })
    gsap.set('.word', { y: 40, opacity: 0, filter: 'blur(8px)', rotateX: -20 })
    
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    
    tl.to('.hero-badge', {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      delay: 0.2
    })
    .to('.word', {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      rotateX: 0,
      duration: 1.2,
      stagger: 0.05,
    }, '-=0.8')
    .to('.hero-desc', {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
    }, '-=0.9')
    .to('.hero-cta', {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.1,
    }, '-=1.0')
    .to('.hero-stats', {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
    }, '-=1.0')
    .to('.hero-scroll', {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
    }, '-=1.0')
    
  }, { scope: containerRef })

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex flex-col items-center justify-center text-center min-h-[100dvh] px-5 sm:px-8 py-32 sm:py-40 scroll-mt-28 perspective-1000"
      style={{ zIndex: 1 }}
    >
      {/* Ethereal Glow / Mesh Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="absolute w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] mix-blend-screen translate-y-24" />
      </div>

      {/* ── Floating Community Badge ── */}
      <div className="hero-element hero-badge mb-10">
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-sky-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
          Official Cloud & DevOps Club
        </span>
      </div>

      {/* ── Headline ── */}
      <h1 className="font-extrabold leading-[1.05] tracking-tight max-w-5xl text-white mb-8"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
        {HEADLINE_WORDS.map((word, i) => {
          const isAccent = word === 'Cloud.' || word === 'Future.'
          return (
            <span
              key={i}
              className={`word inline-block mr-[0.25em] ${isAccent ? 'text-transparent bg-clip-text bg-gradient-to-br from-sky-300 to-sky-600 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]' : ''}`}
            >
              {word}
            </span>
          )
        })}
      </h1>

      {/* ── Tagline ── */}
      <p className="hero-element hero-desc max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-300 font-medium mb-12">
        Where student engineers build, deploy, and scale — real infrastructure, real pipelines, real community.
      </p>

      {/* ── CTA buttons ── */}
      <div className="flex flex-col sm:flex-row items-center gap-5 mb-24">
        {/* Primary CTA: Island Architecture */}
        <a href="#events" className="hero-element hero-cta group relative inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full font-bold text-sm sm:text-base text-slate-900 bg-white transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98]">
          <span>Explore Events</span>
          {/* Nested Button-in-Button */}
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-slate-200 group-hover:scale-105 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
            <ArrowUpRight weight="bold" className="w-4 h-4 text-slate-900" />
          </div>
        </a>

        {/* Secondary CTA: Double Bezel */}
        <a href="#about" className="hero-element hero-cta group p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10 hover:scale-[0.98]">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-[#050505]/80 text-white font-semibold text-sm sm:text-base shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-colors duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#0a0a0a]">
            About the Club
          </div>
        </a>
      </div>

      {/* ── Stats strip ── */}
      <div className="hero-element hero-stats flex items-center gap-4 sm:gap-6 flex-wrap justify-center w-full max-w-4xl">
        {[
          { value: '40+', label: 'Members' },
          { value: '0',   label: 'Events Hosted' },
          { value: '0',   label: 'Projects Live' },
          { value: '0',   label: 'Years Strong' },
        ].map(({ value, label }) => (
          <div key={label} className="p-1.5 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl transition-transform duration-700 hover:scale-[1.02]">
            <div className="flex flex-col items-center justify-center gap-1 min-w-[120px] px-6 py-5 rounded-[calc(2rem-0.375rem)] bg-[#050505]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.1)]">
                {value}
              </span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-slate-400 mt-1">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="hero-element hero-scroll mt-16">
        <ScrollCue />
      </div>
    </section>
  )
}
