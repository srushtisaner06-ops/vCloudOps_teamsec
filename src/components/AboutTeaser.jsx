import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CloudArrowUp, Gear, ShieldCheck, ChartLineUp, Rocket, HardDrives } from '@phosphor-icons/react'

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

const FEATURES = [
  { icon: CloudArrowUp, label: 'Cloud Architecture' },
  { icon: Gear, label: 'CI/CD Automation' },
  { icon: HardDrives, label: 'Containers & Kubernetes' },
  { icon: ShieldCheck, label: 'DevSecOps' },
  { icon: ChartLineUp, label: 'Observability' },
  { icon: Rocket, label: 'Hackathons & Workshops' },
]

export default function AboutTeaser() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Reveal Line
    gsap.from('.about-line', {
      scaleY: 0,
      opacity: 0,
      transformOrigin: 'top',
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.about-line', start: 'top 85%' }
    })

    // Mission Label
    gsap.from('.mission-label', {
      y: 30, opacity: 0, filter: 'blur(10px)', duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: '.mission-label', start: 'top 85%' }
    })

    // Words
    gsap.from('.mission-word', {
      y: 40,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1.2,
      stagger: 0.05,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.mission-word-container', start: 'top 80%' }
    })

    // Sub-copy
    gsap.from('.about-sub', {
      y: 30, opacity: 0, duration: 1, delay: 0.4, ease: 'power4.out',
      scrollTrigger: { trigger: '.mission-word-container', start: 'top 80%' }
    })

    // Features Bento cascade
    gsap.from('.feature-card', {
      y: 60,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.features-grid', start: 'top 85%' }
    })

  }, { scope: containerRef })

  return (
    <section id="about" ref={containerRef} className="relative py-32 px-5 sm:px-8 flex flex-col items-center text-center scroll-mt-24 z-10">
      
      {/* Separator line */}
      <div className="about-line w-px h-24 mx-auto mb-16 bg-gradient-to-b from-transparent via-sky-400/40 to-transparent" />

      {/* Mission label */}
      <div className="mission-label mb-10">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl">
          <span className="text-[10px] tracking-[0.22em] uppercase font-bold text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
            Mission Statement
          </span>
        </div>
      </div>

      {/* Large mission statement */}
      <h2 className="mission-word-container max-w-4xl leading-[1.1] mb-8 font-extrabold"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
        {MISSION_WORDS.map((w, i) => (
          <span
            key={i}
            className={`mission-word inline-block mr-[0.3em] ${w.accent ? 'text-transparent bg-clip-text bg-gradient-to-br from-sky-300 to-sky-600 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]' : 'text-white'}`}
          >
            {w.text}
          </span>
        ))}
      </h2>

      {/* Sub-copy */}
      <p className="about-sub max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-300 font-medium mb-20">
        vCloudOps is a student-led technical community at the intersection of cloud infrastructure, DevOps automation, and open-source contribution. From Kubernetes clusters to CI/CD pipelines — we ship real things.
      </p>

      {/* Feature Bento Grid */}
      <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {FEATURES.map((feat, i) => {
          const Icon = feat.icon
          return (
            <div key={i} className="feature-card p-1.5 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl transition-transform duration-700 hover:-translate-y-2 hover:bg-white/10 group">
              <div className="flex flex-col items-start text-left gap-4 p-8 rounded-[calc(2rem-0.375rem)] bg-[#050505]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] h-full">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors duration-500 group-hover:bg-sky-500/20 group-hover:border-sky-500/40">
                  <Icon weight="duotone" className="w-6 h-6 text-sky-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">{feat.label}</h3>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
