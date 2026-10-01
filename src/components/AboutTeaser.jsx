import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  CloudArrowUp,
  Gear,
  ShieldCheck,
  ChartLineUp,
  Rocket,
  HardDrives,
  ArrowRight,
} from '@phosphor-icons/react'
import { scrollToTarget } from '../utils/smoothScroll'

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
  {
    icon: CloudArrowUp,
    label: 'Cloud Architecture',
    desc: 'Architecting resilient multi-region infrastructure across AWS, GCP, and Azure using IaC tools like Terraform & Pulumi.',
    tag: 'Infrastructure',
  },
  {
    icon: Gear,
    label: 'CI/CD Automation',
    desc: 'Designing end-to-end automated pipelines with GitHub Actions, GitLab CI, and ArgoCD for zero-downtime shipping.',
    tag: 'Pipelines',
  },
  {
    icon: HardDrives,
    label: 'Containers & Kubernetes',
    desc: 'Containerizing microservices with Docker and orchestrating production-grade clusters with Helm, K8s, and Service Meshes.',
    tag: 'Cloud-Native',
  },
  {
    icon: ShieldCheck,
    label: 'DevSecOps & Zero-Trust',
    desc: 'Embedding automated vulnerability scanning, secret management with HashiCorp Vault, and IAM hardening into every stage.',
    tag: 'Security',
  },
  {
    icon: ChartLineUp,
    label: 'Observability & Metrics',
    desc: 'Real-time telemetry, log aggregation, and alerting stacks with Prometheus, Grafana, OpenTelemetry, and Datadog.',
    tag: 'Monitoring',
  },
  {
    icon: Rocket,
    label: 'Hackathons & Sprints',
    desc: 'Hands-on architectural challenges, chaos engineering game-days, and open-source contributions with direct industry mentors.',
    tag: 'Community',
  },
]

export default function AboutTeaser() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Reveal Line
    gsap.from('.about-line', {
      scaleY: 0,
      opacity: 0,
      transformOrigin: 'top',
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.about-line', start: 'top 85%' },
    })

    // Mission Label
    gsap.from('.mission-label', {
      y: 20,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.mission-label', start: 'top 85%' },
    })

    // Words
    gsap.from('.mission-word', {
      y: 30,
      opacity: 0,
      filter: 'blur(6px)',
      duration: 0.9,
      stagger: 0.04,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.mission-word-container', start: 'top 82%' },
    })

    // Sub-copy
    gsap.from('.about-sub', {
      y: 24,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.mission-word-container', start: 'top 82%' },
    })

    // Features Bento cascade
    gsap.from('.feature-card', {
      y: 40,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.features-grid', start: 'top 85%' },
    })
  }, { scope: containerRef })

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8 flex flex-col items-center text-center scroll-mt-24 z-10"
    >
      {/* Separator Line */}
      <div className="about-line w-px h-16 sm:h-24 mx-auto mb-10 sm:mb-14 bg-gradient-to-b from-transparent via-sky-400/40 to-transparent" />

      {/* Mission Label */}
      <div className="mission-label mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-sky-400/20 backdrop-blur-xl">
          <img src="/Logo/logo-icon.png" alt="vCloudOps" className="w-4 h-4 object-contain drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
          <span className="text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
            Our Core Mission
          </span>
        </div>
      </div>

      {/* Large Mission Statement */}
      <h2
        className="mission-word-container max-w-4xl leading-[1.12] mb-6 sm:mb-8 font-extrabold tracking-tight px-2"
        style={{ fontSize: 'clamp(1.9rem, 5.2vw, 3.8rem)' }}
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
      <p className="about-sub max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-slate-300 font-normal mb-14 sm:mb-20 px-2">
        vCloudOps is a student-led engineering collective bridging the gap between university coursework and production engineering. From self-healing Kubernetes clusters to immutable infrastructure — we ship real systems with measurable impact.
      </p>

      {/* Feature Bento Grid */}
      <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl w-full">
        {FEATURES.map((feat, i) => {
          const Icon = feat.icon
          return (
            <div
              key={i}
              className="feature-card p-1 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-sky-400/30 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_24px_rgba(56,189,248,0.12)] group text-left"
            >
              <div className="flex flex-col justify-between p-6 sm:p-7 rounded-[calc(1.5rem-2px)] bg-[#050505]/85 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] h-full">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-sky-500/20 group-hover:border-sky-500/40">
                      <Icon weight="duotone" className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-sky-200 transition-colors">
                    {feat.label}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
                    {feat.desc}
                  </p>
                </div>

                <a
                  href="#events"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToTarget('#events', -80)
                  }}
                  className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-sky-300 transition-colors"
                >
                  <span>Explore Track & Sprints</span>
                  <ArrowRight weight="bold" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
