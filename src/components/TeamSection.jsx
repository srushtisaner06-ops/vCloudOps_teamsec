import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Sparkle,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const TEAM_MEMBERS = [
  {
    name: 'Satyajit',
    role: 'Club President & Architect',
    bio: 'Designs high-availability multi-cloud environments. Passionate about Kubernetes control planes and Terraform automation.',
    tags: ['AWS', 'K8s', 'Terraform', 'Go'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradient: 'from-sky-400 to-blue-600',
  },
  {
    name: 'Ananya S.',
    role: 'DevOps & Pipeline Lead',
    bio: 'Architects automated delivery pipelines, GitOps workflows with ArgoCD, and automated deployment safeguards.',
    tags: ['ArgoCD', 'CI/CD', 'Docker', 'Python'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradient: 'from-indigo-400 to-purple-600',
  },
  {
    name: 'Rohan K.',
    role: 'DevSecOps & Platform Lead',
    bio: 'Focuses on container hardening, zero-trust security postures, HashiCorp Vault secrets, and Linux kernel tuning.',
    tags: ['Vault', 'Linux', 'Trivy', 'Security'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradient: 'from-cyan-400 to-teal-600',
  },
  {
    name: 'Priya M.',
    role: 'Community & DevRel Lead',
    bio: 'Drives workshops, hackathons, and open-source onboarding to make cloud engineering accessible for every student.',
    tags: ['DevRel', 'Workshops', 'Open-Source'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    gradient: 'from-emerald-400 to-sky-600',
  },
]

export default function TeamSection() {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.from('.team-header', {
      y: 30,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.team-header', start: 'top 85%' },
    })

    gsap.from('.team-card', {
      y: 45,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.team-grid', start: 'top 85%' },
    })
  }, { scope: containerRef })

  return (
    <section
      id="team"
      ref={containerRef}
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8 flex flex-col items-center text-center scroll-mt-24 z-10"
    >
      {/* Header */}
      <div className="team-header flex flex-col items-center max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-sky-400/20 backdrop-blur-xl mb-6">
          <Sparkle weight="fill" className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold text-sky-400">
            Core Leadership
          </span>
        </div>

        <h2
          className="font-extrabold text-white leading-tight tracking-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Built by Students, for Students
        </h2>

        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          The team running workshops, mentoring lab sessions, and maintaining community infrastructure.
        </p>
      </div>

      {/* Team Responsive Grid */}
      <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl w-full text-left">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.name}
            className="team-card p-1 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-sky-400/30 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_24px_rgba(56,189,248,0.12)] group flex flex-col justify-between"
          >
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-[calc(1.5rem-2px)] bg-[#050505]/85 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] h-full">
              <div>
                {/* Avatar Initial with glowing planetary ring */}
                <div className="relative mb-5 flex items-center justify-between">
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    <span className="text-xl font-extrabold text-white font-mono">
                      {member.name.charAt(0)}
                    </span>
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-400/20 to-transparent blur-sm pointer-events-none" />
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-2">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} GitHub`}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <GithubLogo weight="fill" className="w-4 h-4" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-300 hover:bg-white/10 transition-colors"
                    >
                      <LinkedinLogo weight="fill" className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-white tracking-tight mb-1 group-hover:text-sky-200 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono font-medium text-sky-400 mb-3">
                  {member.role}
                </p>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                  {member.bio}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {member.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
