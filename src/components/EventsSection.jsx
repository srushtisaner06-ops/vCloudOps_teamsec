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
  Tag,
} from '@phosphor-icons/react'
import FlexCarousel from './FlexCarousel'

gsap.registerPlugin(ScrollTrigger)

/* ────────────────────────────────────────────────────────
   Event data – each event maps to one carousel "card".
   The `src` image is shown in the carousel, the rest
   is surfaced in the detail overlay when the user
   clicks / focuses a card.
──────────────────────────────────────────────────────── */
const EVENTS = [
  {
    id: 'k8s-lab',
    title: 'Kubernetes Cluster Lab',
    subtitle: 'Hands-On Lab · Oct 18 2026',
    badge: 'Hands-On Lab',
    status: 'Registration Open',
    date: 'Oct 18, 2026 · 2:00 PM IST',
    venue: 'Engineering Hall 302 & Discord Sync',
    desc: 'Build a production-grade 3-node Kubernetes cluster from scratch, configure Helm ingress controllers, and deploy a self-healing microservice.',
    tags: ['Kubernetes', 'Docker', 'Helm', 'MetalLB'],
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    alt: 'Kubernetes cluster visualization from space',
  },
  {
    id: 'cicd-gitops',
    title: 'GitOps & CI/CD with Actions',
    subtitle: 'Technical Workshop · Nov 02 2026',
    badge: 'Technical Workshop',
    status: 'Upcoming',
    date: 'Nov 02, 2026 · 3:30 PM IST',
    venue: 'Virtual Workshop · Discord Live Stage',
    desc: 'Master the GitOps philosophy: configure automated test pipelines, container vulnerability scanning, and zero-downtime blue/green rollouts.',
    tags: ['GitHub Actions', 'ArgoCD', 'AWS EKS'],
    src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop',
    alt: 'Galaxy nebula representing code pipelines',
  },
  {
    id: 'devsecops-audit',
    title: 'DevSecOps & Zero-Trust',
    subtitle: 'Security Clinic · Nov 21 2026',
    badge: 'Security Clinic',
    status: 'Upcoming',
    date: 'Nov 21, 2026 · 4:00 PM IST',
    venue: 'Lab 405 & Online Sync',
    desc: 'Audit infrastructure security, write least-privilege IAM policies, and eliminate plaintext credentials using automated HashiCorp Vault secrets.',
    tags: ['HashiCorp Vault', 'Trivy', 'IAM'],
    src: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2074&auto=format&fit=crop',
    alt: 'Digital security lock on dark background',
  },
  {
    id: 'cloud-hacksprint',
    title: 'vCloudOps HackSprint 2026',
    subtitle: '48H Hackathon · Dec 05–07 2026',
    badge: '48H Hackathon',
    status: 'RSVP Open',
    date: 'Dec 05 – 07, 2026',
    venue: 'Main Innovation Center & Global Discord',
    desc: '48-hour student hackathon creating resilient distributed cloud architectures evaluated on high availability, cost efficiency, and automation depth.',
    tags: ['Terraform', 'Prometheus', 'Serverless'],
    src: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2074&auto=format&fit=crop',
    alt: 'Stars and space representing innovation sprint',
  },
  {
    id: 'aws-cost-bootcamp',
    title: 'AWS Cost Optimization Bootcamp',
    subtitle: 'Bootcamp · Jan 10 2027',
    badge: 'Bootcamp',
    status: 'Upcoming',
    date: 'Jan 10, 2027 · 2:00 PM IST',
    venue: 'Virtual · Discord & Zoom',
    desc: 'Deep dive into Reserved Instances, Savings Plans, Spot workloads, and tagging governance to slash your AWS bill without sacrificing reliability.',
    tags: ['AWS Cost Explorer', 'RI', 'Spot'],
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    alt: 'Cloud cost optimization concept',
  },
]

/* Convert EVENTS to the shape FlexCarousel expects */
const CAROUSEL_ITEMS = EVENTS.map(ev => ({
  src:      ev.src,
  alt:      ev.alt,
  title:    ev.title,
  subtitle: ev.subtitle,
}))

/* ── Status badge colour helper ───────────────────────── */
function statusClass(status) {
  if (status.toLowerCase().includes('open') || status.toLowerCase().includes('rsvp'))
    return 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40'
  return 'bg-sky-500/25 text-sky-300 border-sky-500/40'
}

export default function EventsSection() {
  const containerRef    = useRef(null)
  const panelRef        = useRef(null)
  const [selected, setSelected] = useState(null)   // event object shown in detail panel
  const [registered, setRegistered] = useState({})
  const [userEmail, setUserEmail]   = useState('')
  const [showForm, setShowForm]     = useState(false)

  /* ── GSAP scroll entrance ───────────────────────────── */
  useGSAP(() => {
    gsap.from('.events-header', {
      y: 30, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.events-header', start: 'top 88%' },
    })
    gsap.from('.events-carousel-wrap', {
      y: 50, opacity: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.events-carousel-wrap', start: 'top 88%' },
    })
  }, { scope: containerRef })

  /* ── Carousel select handler ────────────────────────── */
  function handleSelect(index) {
    const ev = EVENTS[index]
    if (!ev) return
    setSelected(ev)
    setShowForm(false)
    setUserEmail('')
    // Animate panel in
    if (panelRef.current) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      )
    }
  }

  function closePanel() {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        opacity: 0, y: 16, duration: 0.3, ease: 'power2.in',
        onComplete: () => setSelected(null),
      })
    } else {
      setSelected(null)
    }
  }

  function handleRegister(e) {
    e.preventDefault()
    if (!userEmail) return
    setRegistered(prev => ({ ...prev, [selected.id]: true }))
    setTimeout(() => {
      setShowForm(false)
      setUserEmail('')
    }, 1200)
  }

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative py-24 sm:py-32 md:py-40 flex flex-col items-center scroll-mt-24 z-10 overflow-hidden"
    >
      {/* ── Section header ───────────────────────────────── */}
      <div className="events-header flex flex-col items-center text-center max-w-3xl px-6 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-sky-400/20 backdrop-blur-xl mb-5">
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

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          From zero-cost AWS labs to continuous-deployment sprints — our events focus on
          practical, industry-aligned engineering with real peer collaboration.
        </p>
      </div>

      {/* ── Carousel ─────────────────────────────────────── */}
      <div
        className="events-carousel-wrap w-full"
        style={{ height: 'clamp(360px, 52vh, 520px)' }}
      >
        <FlexCarousel
          items={CAROUSEL_ITEMS}
          preset="liquid"
          intro="rise"
          cardHeight={0.82}
          gap={14}
          radius={18}
          fit="landscape"
          squeeze={0.18}
          focusOnClick
          captions
          captureWheel
          onSelect={handleSelect}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* ── Hint text ─────────────────────────────────────── */}
      <p className="mt-4 text-[11px] tracking-widest uppercase text-slate-500 font-mono select-none">
        Drag to browse · Click card to see details
      </p>

      {/* ── Event detail panel ───────────────────────────── */}
      {selected && (
        <div
          ref={panelRef}
          className="relative mt-10 w-full max-w-3xl mx-auto px-4 sm:px-6"
        >
          <div
            className="relative rounded-3xl overflow-hidden border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(5,11,24,0.96) 0%, rgba(10,23,48,0.96) 100%)',
              backdropFilter: 'blur(28px)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(56,189,248,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Top image strip */}
            <div
              className="w-full h-40 sm:h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${selected.src})` }}
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent to-[#050b18]/90" />
            </div>

            {/* Close button */}
            <button
              type="button"
              aria-label="Close event detail"
              onClick={closePanel}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all backdrop-blur-md"
            >
              <X weight="bold" className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="text-[11px] font-mono font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/15 text-white border border-white/20 backdrop-blur-md">
                  {selected.badge}
                </span>
                <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border backdrop-blur-md ${statusClass(selected.status)}`}>
                  {selected.status}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
                {selected.title}
              </h3>

              {/* Meta */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 mb-5 text-sm font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <CalendarBlank weight="bold" className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{selected.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin weight="bold" className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{selected.venue}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-5">
                {selected.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Tag weight="fill" className="w-3.5 h-3.5 text-sky-400 self-center" />
                {selected.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/8 text-slate-200 border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA / Registration */}
              {registered[selected.id] ? (
                <div className="flex items-center gap-3 py-4 px-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30">
                  <CheckCircle weight="fill" className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-emerald-300 font-bold text-sm">Seat Confirmed!</p>
                    <p className="text-xs text-slate-400 mt-0.5">Check your email for confirmation & join link.</p>
                  </div>
                </div>
              ) : showForm ? (
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                  <label className="block text-xs font-mono text-slate-300">
                    Student Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@university.edu"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-sky-400 transition-colors"
                  />
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Free admission. Attendees receive cluster credentials & Discord access keys before the session.
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-300 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_30px_rgba(56,189,248,0.55)] transition-shadow active:scale-[0.98]"
                    >
                      Confirm Free Registration
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-sm shadow-[0_4px_24px_rgba(255,255,255,0.22)] hover:shadow-[0_4px_36px_rgba(56,189,248,0.45)] hover:bg-slate-100 transition-all active:scale-[0.97]"
                >
                  <span>RSVP / Register Free Seat</span>
                  <ArrowUpRight weight="bold" className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
