import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  DiscordLogo,
  GithubLogo,
  CaretDown,
  ArrowUpRight,
  Sparkle,
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    q: 'Who can join vCloudOps?',
    a: 'Any university student interested in cloud infrastructure, DevOps, backend development, or systems engineering. Whether you are in your first year or nearing graduation, you are welcome to join.',
  },
  {
    q: 'Do I need paid cloud accounts or certifications?',
    a: 'Not at all! We use local environments (like Minikube, Docker Compose, and Kind) and provide student credits and sandbox credentials for cloud provider workshops so everyone can learn without out-of-pocket costs.',
  },
  {
    q: 'How often are workshops and lab sprints held?',
    a: 'We hold bi-weekly technical workshops, monthly hands-on engineering labs, and continuous open-source build sprints coordinated via our Discord server.',
  },
  {
    q: 'How can I contribute to club projects?',
    a: 'Check out our GitHub repositories! We maintain beginner-friendly "good first issue" tags on our documentation, website, and microservice infrastructure projects.',
  },
]

export default function CommunitySection() {
  const containerRef = useRef(null)
  const [openFaq, setOpenFaq] = useState(0)

  useGSAP(() => {
    gsap.from('.community-cta-box', {
      y: 35,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.community-cta-box', start: 'top 85%' },
    })

    gsap.from('.faq-container', {
      y: 30,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.faq-container', start: 'top 85%' },
    })
  }, { scope: containerRef })

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index)
  }

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8 flex flex-col items-center text-center scroll-mt-24 z-10"
    >
      {/* ── Community Main CTA Banner ── */}
      <div className="community-cta-box relative w-full max-w-5xl p-1 rounded-3xl bg-gradient-to-b from-sky-500/30 via-white/10 to-white/5 border border-sky-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(56,189,248,0.2)] mb-20 sm:mb-28">
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 rounded-[calc(1.5rem-2px)] bg-[#050B18]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-sky-500/20 rounded-full blur-[90px] pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-sky-400/20 backdrop-blur-xl mb-6 relative z-10">
            <Sparkle weight="fill" className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold text-sky-300">
              Join 40+ Student Engineers
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-extrabold text-white leading-tight tracking-tight mb-4 max-w-3xl relative z-10"
            style={{ fontSize: 'clamp(2.1rem, 5.5vw, 4rem)' }}
          >
            Ready to Architect the Cloud?
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8 relative z-10">
            Join our active community of builders. Get access to hands-on workshops, cloud project mentorship, and an inclusive student network.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 w-full sm:w-auto relative z-10">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-sky-400 via-sky-300 to-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.4)] hover:shadow-[0_0_36px_rgba(56,189,248,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <DiscordLogo weight="fill" className="w-5 h-5 text-indigo-950" />
              <span>Join Discord Server</span>
              <ArrowUpRight weight="bold" className="w-4 h-4 text-slate-950" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm sm:text-base backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <GithubLogo weight="fill" className="w-5 h-5" />
              <span>Explore GitHub Org</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── FAQ Section ── */}
      <div className="faq-container w-full max-w-3xl text-left">
        <div className="text-center mb-10">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-sky-400 font-bold">
            Got Questions?
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i
            return (
              <div
                key={faq.q}
                className="rounded-2xl border transition-all duration-300 bg-[#050505]/75 border-white/10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left font-bold text-white text-base sm:text-lg focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={isOpen ? 'text-sky-300' : 'text-slate-100'}>
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-sky-400 bg-sky-500/10' : ''
                    }`}
                  >
                    <CaretDown weight="bold" className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
