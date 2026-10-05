import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Sparkle } from '@phosphor-icons/react'
import AccordionGallery from './AccordionGallery'

gsap.registerPlugin(ScrollTrigger)

/* ────────────────────────────────────────────────────────
   Event dataset strictly aligned with club document & roadmap:
   1. GitHub Basics (13th Oct, 2026 with VIT Bibwewadi Google Maps link)
   2. Weekly AWS Builder Workshops (Every Sunday · Online)
   3. Stay Tuned (Semester Roadmap · 2026–27)
──────────────────────────────────────────────────────── */
const EVENTS = [
  {
    id: 'github-basics',
    title: 'GitHub Basics',
    tagline: 'Version Control, Branching & GitOps Foundations',
    mode: 'Offline Workshop',
    date: '13th Oct, 2026',
    venue: 'VIT Bibwewadi College, Pune',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vishwakarma+Institute+of+Technology+Bibwewadi+Pune',
    desc: 'Hands-on code-along workshop on campus. Get direct CLI and console experience, master core Git workflows, branch lifecycle strategies, conflict resolution, collaborative pull requests, and automated repository actions with live in-person mentor debugging.',
    src: '/images/events/github-basics.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=2076&auto=format&fit=crop',
  },
  {
    id: 'weekly-aws-workshops',
    title: 'Weekly AWS Builder Workshops',
    tagline: '100% Interactive Cloud Architecture Builds',
    mode: 'Online Live',
    date: 'Every Sunday',
    venue: null,
    mapsUrl: null,
    desc: 'Interactive live builds from scratch. Deploy live static websites on Amazon S3, architect serverless APIs with AWS Lambda & API Gateway, spin up cloud databases, and explore Generative AI deployments with Amazon Bedrock — every project is pushed directly to your GitHub portfolio.',
    src: '/images/events/aws-builder.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
  },
  {
    id: 'upcoming-flagship-event',
    title: 'Stay Tuned',
    tagline: 'Tool-Driven Hackathon & Agentic AI Sprint',
    mode: 'Coming Soon',
    date: 'Semester Roadmap · 2026–27',
    venue: null,
    mapsUrl: null,
    desc: 'Collaborate in teams to design and deploy innovative, practical, and scalable cloud solutions solving real-world challenges, earn AWS credits, win badges and swag, and walk away with working demos that elevate your engineering resume.',
    src: '/images/events/upcoming-event.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
  },
]

export default function EventsSection() {
  const containerRef = useRef(null)

  /* GSAP scroll entrance animation */
  useGSAP(
    () => {
      gsap.from('.events-header', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.events-header', start: 'top 88%' },
      })

      gsap.from('.events-gallery-wrap', {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.events-gallery-wrap', start: 'top 88%' },
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative py-16 sm:py-24 md:py-32 flex flex-col items-center scroll-mt-24 z-10 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="events-header flex flex-col items-center text-center max-w-3xl px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-sky-400/20 backdrop-blur-xl mb-4">
          <Sparkle weight="fill" className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold text-sky-400">
            Workshops & Gatherings
          </span>
        </div>

        <h2
          className="font-extrabold text-white leading-tight tracking-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Level Up Your Cloud Craft
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
          Don&apos;t just learn the cloud — code it live. From hands-on Git essentials at VIT campus to weekly cloud builds and hackathon sprints.
        </p>
      </div>

      {/* ── ReactBits Accordion Gallery Container ── */}
      <div className="events-gallery-wrap w-full max-w-6xl px-3 sm:px-6">
        <AccordionGallery
          items={EVENTS}
          defaultIndex={0}
          enableWheelScroll={true}
          autoPlay={false}
        />
      </div>
    </section>
  )
}
