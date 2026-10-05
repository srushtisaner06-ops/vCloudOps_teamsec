import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const MISSION_WORDS = [
  { text: 'We', accent: false },
  { text: "don't", accent: false },
  { text: 'just', accent: false },
  { text: 'learn', accent: true },
  { text: 'the', accent: false },
  { text: 'cloud', accent: true },
  { text: '—', accent: false },
  { text: 'we', accent: false },
  { text: 'build', accent: true },
  { text: 'it.', accent: false },
]

export default function AboutTeaser() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Mission Label
    gsap.from('.mission-label', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: '.mission-label', start: 'top 85%', once: true },
    })

    // Words
    gsap.from('.mission-word', {
      y: 24,
      opacity: 0,
      duration: 0.85,
      stagger: 0.04,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: '.mission-word-container', start: 'top 82%', once: true },
    })

    // Sub-copy
    gsap.from('.about-sub', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.15,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: '.mission-word-container', start: 'top 82%', once: true },
    })
  }, { scope: containerRef })

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 flex flex-col items-center text-center z-10"
    >
      {/* Mission Label */}
      <div className="mission-label mb-4 sm:mb-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-sky-400/20 backdrop-blur-xl">
          <img src="/Logo/aws-logo-white.png" alt="AWS SBG" className="w-4 h-4 object-contain drop-shadow-[0_0_8px_rgba(255,153,0,0.5)]" />
          <span className="text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
            Our Core Mission
          </span>
        </div>
      </div>

      {/* Large Mission Statement */}
      <h2
        className="mission-word-container max-w-4xl leading-[1.15] mb-4 sm:mb-5 font-extrabold tracking-tight px-2"
        style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)' }}
      >
        {MISSION_WORDS.map((w, i) => (
          <span
            key={i}
            className={`mission-word inline-block mr-[0.26em] ${
              w.accent
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-sky-600 drop-shadow-[0_0_24px_rgba(56,189,248,0.3)]'
                : 'text-white'
            }`}
          >
            {w.text}
          </span>
        ))}
      </h2>

      {/* Sub-copy */}
      <p className="about-sub max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-300 font-normal px-2">
        AWS SBG is a student-led engineering collective bridging the gap between university coursework and production engineering. From self-healing Kubernetes clusters to immutable infrastructure — we ship real systems with measurable impact.
      </p>
    </section>
  )
}
