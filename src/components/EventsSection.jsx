import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  CalendarBlank,
  MapPin,
  ArrowUpRight,
  Sparkle,
  CheckCircle,
  X,
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  {
    id: 'k8s-lab',
    title: 'Kubernetes Multi-Node Cluster Lab',
    badge: 'Hands-On Lab',
    status: 'Registration Open',
    date: 'Oct 18, 2026 • 2:00 PM - 5:00 PM',
    venue: 'Engineering Hall 302 & Discord Sync',
    desc: 'Build a production-grade 3-node Kubernetes cluster from scratch, configure Helm ingress controllers, and deploy a self-healing microservice.',
    tags: ['Kubernetes', 'Docker', 'Helm', 'MetalLB'],
    featured: true,
  },
  {
    id: 'cicd-gitops',
    title: 'GitOps & CI/CD with GitHub Actions & ArgoCD',
    badge: 'Technical Workshop',
    status: 'Upcoming',
    date: 'Nov 02, 2026 • 3:30 PM - 6:00 PM',
    venue: 'Virtual Workshop • Discord Live Stage',
    desc: 'Master the GitOps philosophy: configure automated test pipelines, container vulnerability scanning, and zero-downtime blue/green rollouts.',
    tags: ['GitHub Actions', 'ArgoCD', 'AWS EKS', 'Docker'],
    featured: false,
  },
  {
    id: 'devsecops-audit',
    title: 'DevSecOps & Zero-Trust Infrastructure',
    badge: 'Security Clinic',
    status: 'Upcoming',
    date: 'Nov 21, 2026 • 4:00 PM - 6:30 PM',
    venue: 'Lab 405 & Online Sync',
    desc: 'Audit infrastructure security, write least-privilege IAM policies, and eliminate plaintext credentials using automated HashiCorp Vault secrets.',
    tags: ['HashiCorp Vault', 'Trivy', 'IAM', 'Terraform'],
    featured: false,
  },
  {
    id: 'cloud-hacksprint',
    title: 'vCloudOps HackSprint 2026',
    badge: '48H Hackathon',
    status: 'RSVP Open',
    date: 'Dec 05 - 07, 2026 • 48 Hours',
    venue: 'Main Innovation Center & Global Discord',
    desc: '48-hour student hackathon creating resilient distributed cloud architectures evaluated on high availability, cost efficiency, and automation.',
    tags: ['Terraform', 'Prometheus', 'Serverless', 'Go'],
    featured: true,
  },
]

export default function EventsSection() {
  const containerRef = useRef(null)
  const [modalEvent, setModalEvent] = useState(null)
  const [registered, setRegistered] = useState({})
  const [userEmail, setUserEmail] = useState('')

  useGSAP(() => {
    gsap.from('.events-header', {
      y: 25,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.events-header', start: 'top 85%' },
    })

    gsap.from('.event-card', {
      y: 35,
      opacity: 0,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.events-grid', start: 'top 85%' },
    })
  }, { scope: containerRef })

  const handleRegister = (e, ev) => {
    e.preventDefault()
    setModalEvent(ev)
  }

  const handleConfirmRegister = (e) => {
    e.preventDefault()
    if (!userEmail) return
    setRegistered((prev) => ({ ...prev, [modalEvent.id]: true }))
    setTimeout(() => {
      setModalEvent(null)
      setUserEmail('')
    }, 1200)
  }

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8 flex flex-col items-center text-center scroll-mt-24 z-10"
    >
      {/* Header */}
      <div className="events-header flex flex-col items-center max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-sky-400/20 backdrop-blur-xl mb-6">
          <Sparkle weight="fill" className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold text-sky-400">
            Workshops & Sprints
          </span>
        </div>

        <h2
          className="font-extrabold text-white leading-tight tracking-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Level Up Your Cloud Craft
        </h2>

        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          From zero-cost AWS labs to continuous deployment sprints, our events focus on practical, industry-aligned engineering skills with peer collaboration.
        </p>
      </div>

      {/* Events Grid */}
      <div className="events-grid grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-6xl w-full text-left">
        {EVENTS.map((ev) => {
          const isDone = registered[ev.id]
          return (
            <div
              key={ev.id}
              className={`event-card relative p-1 rounded-3xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between ${
                ev.featured
                  ? 'bg-gradient-to-b from-sky-500/25 via-white/5 to-white/5 border border-sky-400/30 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_24px_rgba(56,189,248,0.15)]'
                  : 'bg-white/5 border border-white/10 hover:border-sky-400/30 shadow-[0_12px_32px_rgba(0,0,0,0.5)]'
              }`}
            >
              <div className="flex flex-col justify-between p-6 sm:p-8 rounded-[calc(1.5rem-2px)] bg-[#050505]/85 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] h-full">
                <div>
                  {/* Top Bar: Badge & Status */}
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <span className="text-[11px] font-mono font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 text-sky-300 border border-white/10">
                      {ev.badge}
                    </span>

                    <span
                      className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                        ev.status.includes('Open')
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-sky-500/15 text-sky-300 border border-sky-500/20'
                      }`}
                    >
                      {ev.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                    {ev.title}
                  </h3>

                  {/* Date & Venue */}
                  <div className="flex flex-col gap-1.5 mb-4 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <CalendarBlank weight="bold" className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin weight="bold" className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <span className="truncate">{ev.venue}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-slate-400 mb-6">
                    {ev.desc}
                  </p>
                </div>

                {/* Footer: Tags & Action */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {ev.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleRegister(e, ev)}
                    className={`w-full py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-98 ${
                      isDone
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-white hover:bg-slate-200 text-slate-950 shadow-[0_4px_16px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_24px_rgba(56,189,248,0.3)]'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle weight="fill" className="w-4 h-4 text-emerald-400" />
                        <span>Seat Confirmed!</span>
                      </>
                    ) : (
                      <>
                        <span>RSVP / Register Seat</span>
                        <ArrowUpRight weight="bold" className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* RSVP Modal */}
      {modalEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setModalEvent(null)}
        >
          <div
            className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#081226] border border-sky-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.2)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setModalEvent(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <X weight="bold" className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase font-semibold">
              Event Registration
            </span>

            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">
              {modalEvent.title}
            </h3>

            <p className="text-xs text-slate-300 mb-6 flex items-center gap-2">
              <CalendarBlank className="text-sky-400 w-4 h-4" /> {modalEvent.date}
            </p>

            {registered[modalEvent.id] ? (
              <div className="py-6 flex flex-col items-center justify-center gap-2 text-center text-emerald-400">
                <CheckCircle weight="fill" className="w-12 h-12" />
                <h4 className="text-lg font-bold">You are in!</h4>
                <p className="text-xs text-slate-300">
                  Confirmation sent. See you in the session!
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmRegister} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Student Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-normal">
                  Free admission. Attendees will receive cluster credentials and Discord access keys prior to start.
                </p>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-300 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.4)] active:scale-98 transition-transform"
                >
                  Confirm Free Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
