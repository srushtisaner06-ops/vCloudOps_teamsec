import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { GithubLogo, LinkedinLogo, X } from '@phosphor-icons/react'
import { createPortal } from 'react-dom'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getLenis } from '../utils/smoothScroll'
import './TeamSection.css'

const MEMBERS = [
  { id: 'satyajit', name: 'Satyajit', role: 'Club President & Architect', bio: 'Designs high-availability multi-cloud environments with Kubernetes control planes and Terraform automation.', tags: ['AWS', 'K8s', 'Terraform', 'Go'], github: 'https://github.com', linkedin: 'https://linkedin.com', accent: '#57c7ff' },
  { id: 'ananya', name: 'Ananya S.', role: 'DevOps & Pipeline Lead', bio: 'Architects automated delivery pipelines, GitOps workflows, and deployment safeguards.', tags: ['ArgoCD', 'CI/CD', 'Docker', 'Python'], github: 'https://github.com', linkedin: 'https://linkedin.com', accent: '#a98bff' },
  { id: 'rohan', name: 'Rohan K.', role: 'DevSecOps & Platform Lead', bio: 'Focuses on container hardening, zero-trust security, Vault secrets, and Linux tuning.', tags: ['Vault', 'Linux', 'Trivy', 'Security'], github: 'https://github.com', linkedin: 'https://linkedin.com', accent: '#36d9c4' },
  { id: 'priya', name: 'Priya M.', role: 'Community & DevRel Lead', bio: 'Drives workshops, hackathons, and open-source onboarding for student engineers.', tags: ['DevRel', 'Workshops', 'Open Source'], github: 'https://github.com', linkedin: 'https://linkedin.com', accent: '#ff8fbd' },
]

const TEAMS = [
  { id: 'core', label: 'Core leadership', color: '#4aa9db', members: MEMBERS },
  { id: 'cloud', label: 'Cloud architecture', color: '#57c7ff', members: [MEMBERS[0]] },
  { id: 'delivery', label: 'Delivery systems', color: '#a98bff', members: [MEMBERS[1]] },
  { id: 'platform', label: 'Platform engineering', color: '#6b9cff', members: [MEMBERS[0], MEMBERS[2]] },
  { id: 'security', label: 'Security engineering', color: '#36d9c4', members: [MEMBERS[2]] },
  { id: 'containers', label: 'Containers & Kubernetes', color: '#58d8e8', members: [MEMBERS[0], MEMBERS[2]] },
  { id: 'automation', label: 'Infrastructure automation', color: '#f6b75d', members: [MEMBERS[0], MEMBERS[1]] },
  { id: 'labs', label: 'Cloud labs', color: '#ff8fbd', members: [MEMBERS[1], MEMBERS[3]] },
  { id: 'opensource', label: 'Open source', color: '#b3a0ff', members: [MEMBERS[3]] },
  { id: 'community', label: 'Community & DevRel', color: '#7ce4a5', members: [MEMBERS[3]] },
]

function PlanetFace({ color, label }) {
  const rawId = useId()
  const id = rawId.replace(/:/g, '')
  return (
    <svg className="team-planet-image" viewBox="0 0 123 85" role="img" aria-label={`${label} planet`} style={{ '--planet-accent': color }}>
      <defs>
        <radialGradient id={`team-planet-${id}`} cx="34%" cy="27%" r="72%"><stop stopColor="#8be8ff" /><stop offset=".46" stopColor="#1b9dce" /><stop offset="1" stopColor="#071a4b" /></radialGradient>
        <linearGradient id={`team-rim-${id}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d2f8ff" /><stop offset=".6" stopColor="#4bc8ef" /><stop offset="1" stopColor="#0d386c" /></linearGradient>
        <clipPath id={`team-clip-${id}`}><circle cx="62" cy="42" r="20" /></clipPath>
      </defs>
      <ellipse cx="62" cy="42" rx="43" ry="13" fill="none" stroke="#62dfff" strokeWidth="1.5" opacity=".85" transform="rotate(-8 62 42)" />
      <circle cx="62" cy="42" r="23" fill="#37c9f7" opacity=".12" />
      <circle cx="62" cy="42" r="20" fill={`url(#team-planet-${id})`} stroke={`url(#team-rim-${id})`} strokeWidth="1.2" />
      <g clipPath={`url(#team-clip-${id})`} opacity=".72">
        <path d="M38 34c14-6 31-5 49 1v5c-17-5-33-5-49 1z" fill="#9aeaff" opacity=".34" />
        <path d="M39 47c16-5 32-4 48 2v5c-17-5-31-5-48 1z" fill="#063d79" opacity=".52" />
        <ellipse cx="53" cy="36" rx="4" ry="2.5" fill="#7ae4ff" opacity=".5" />
        <ellipse cx="70" cy="49" rx="3.4" ry="2" fill="#062d62" opacity=".7" />
        <path d="M44 55c10-4 23-4 35 0" stroke="#baf3ff" strokeWidth="1" opacity=".45" />
      </g>
      <path d="M20 47c20 9 63 11 84-5" fill="none" stroke="#75e5ff" strokeWidth="1.7" opacity=".9" transform="rotate(-8 62 42)" />
    </svg>
  )
}

function DomainBox({ team, onOpen, isCore = false }) {
  return (
    <button type="button" className={`team-domain-box ${isCore ? 'is-core' : ''}`} style={{ '--box-accent': team.color }} onClick={(event) => onOpen(team, event.currentTarget)} aria-label={`Open ${team.label}`}>
      <span className="team-domain-box__face"><PlanetFace color={team.color} label={team.label} /></span>
      <span className="team-domain-box__label">{team.label}</span>
    </button>
  )
}

function MemberCard({ member, index, active, reduced }) {
  const distance = index - active
  const isRear = distance !== 0
  const style = reduced ? {} : {
    '--card-x': `${distance * 74}px`,
    '--card-z': `${-Math.abs(distance) * 180}px`,
    '--card-rotate': `${distance > 0 ? Math.min(distance, 1) * 19 : 0}deg`,
    '--card-scale': `${1 - Math.min(Math.abs(distance) * .045, .18)}`,
    '--card-opacity': distance === 0 ? 1 : (Math.abs(distance) === 1 ? .72 : 0),
  }
  return (
    <article className={`team-member-card ${active === index ? 'is-active' : ''} ${isRear ? 'is-rear' : ''}`} style={style} aria-hidden={active !== index}>
      <div className="team-member-card__portrait" style={{ '--portrait-accent': member.accent }}>
        <span className="team-portrait-particles" aria-hidden="true" />
        <span className="team-member-initial">{member.name.charAt(0)}</span>
        <span className="team-member-index">0{index + 1}</span>
      </div>
      <div className="team-member-card__content">
        <div className="team-member-links">
          <a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} GitHub`}><GithubLogo weight="fill" /></a>
          <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} LinkedIn`}><LinkedinLogo weight="fill" /></a>
        </div>
        <h3>{member.name}</h3>
        <p className="team-member-role">{member.role}</p>
        <p className="team-member-bio">{member.bio}</p>
        <div className="team-member-tags">{member.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  )
}

function MemberView({ team, activeIndex, setActiveIndex, onClose, reduced, openerRef, originRect }) {
  const viewRef = useRef(null)
  const gestureLock = useRef(false)
  const unlockTimer = useRef(null)
  const touchStartY = useRef(null)
  const savedScrollY = useRef(0)
  const activeIndexRef = useRef(activeIndex)
  useEffect(() => { activeIndexRef.current = activeIndex }, [activeIndex])

  const close = useCallback(() => { gestureLock.current = false; onClose() }, [onClose])

  const move = useCallback((direction) => {
    if (gestureLock.current) return
    gestureLock.current = true
    const current = activeIndexRef.current
    if (direction > 0 && current < team.members.length - 1) {
      setActiveIndex((index) => index + 1)
    } else if (direction < 0 && current > 0) {
      setActiveIndex((index) => index - 1)
    } else if (direction < 0 && current === 0) {
      // Consume the gesture at the first card. Closing here would allow the
      // same trackpad/touch momentum to leak into the page behind the view.
    } else {
      close()
      return
    }
    unlockTimer.current = window.setTimeout(() => { gestureLock.current = false }, reduced ? 40 : 950)
  }, [close, reduced, setActiveIndex, team.members.length])

  useEffect(() => {
    const scrollRoot = document.scrollingElement || document.documentElement
    savedScrollY.current = scrollRoot.scrollTop
    const html = document.documentElement
    const body = document.body
    const lenis = getLenis()
    const lenisWasStopped = Boolean(lenis?.isStopped)
    const saved = {
      htmlOverflow: html.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
      bodyOverflow: body.style.overflow,
      bodyTouchAction: body.style.touchAction,
    }
    const savedFocus = document.activeElement
    const focusTarget = openerRef.current
    const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth)
    // Lenis must stop before any fixed-body/overflow mutation. Otherwise its
    // next RAF can overwrite the scroll root while the lock is being applied.
    lenis?.stop()
    html.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${savedScrollY.current}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    body.style.touchAction = 'none'
    if (scrollbarWidth) body.style.paddingRight = `${scrollbarWidth}px`
    viewRef.current?.focus({ preventScroll: true })

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return
      if (Math.abs(event.deltaY) < 8) return
      event.preventDefault()
      move(event.deltaY > 0 ? 1 : -1)
    }
    const onTouchStart = (event) => { touchStartY.current = event.touches[0]?.clientY ?? null }
    const onTouchMove = (event) => { if (event.touches.length === 1) event.preventDefault() }
    const onTouchEnd = (event) => {
      const endY = event.changedTouches[0]?.clientY
      if (touchStartY.current == null || endY == null) return
      const delta = touchStartY.current - endY
      if (Math.abs(delta) > 22) move(delta > 0 ? 1 : -1)
      touchStartY.current = null
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); return }
      if (event.repeat) return
      const down = ['ArrowDown', 'PageDown'].includes(event.key) || (event.key === ' ' && !event.shiftKey)
      const up = ['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey)
      if (down || up) { event.preventDefault(); move(down ? 1 : -1) }
    }
    const view = viewRef.current
    view?.addEventListener('wheel', onWheel, { passive: false, capture: true })
    view?.addEventListener('touchstart', onTouchStart, { passive: true })
    view?.addEventListener('touchmove', onTouchMove, { passive: false })
    view?.addEventListener('touchend', onTouchEnd, { passive: true })
    view?.addEventListener('keydown', onKeyDown)
    return () => {
      if (unlockTimer.current) window.clearTimeout(unlockTimer.current)
      view?.removeEventListener('wheel', onWheel, true)
      view?.removeEventListener('touchstart', onTouchStart)
      view?.removeEventListener('touchmove', onTouchMove)
      view?.removeEventListener('touchend', onTouchEnd)
      view?.removeEventListener('keydown', onKeyDown)
      html.style.overflow = saved.htmlOverflow
      body.style.position = saved.bodyPosition
      body.style.top = saved.bodyTop
      body.style.width = saved.bodyWidth
      body.style.paddingRight = saved.bodyPaddingRight
      body.style.overflow = saved.bodyOverflow
      body.style.touchAction = saved.bodyTouchAction
      scrollRoot.scrollTop = savedScrollY.current
      window.scrollTo({ top: savedScrollY.current, behavior: 'auto' })
      if (lenis && !lenisWasStopped) lenis.start()
      if (savedFocus instanceof HTMLElement) savedFocus.focus({ preventScroll: true })
      else focusTarget?.focus({ preventScroll: true })
    }
  }, [close, move, openerRef])

  return (
    <div ref={viewRef} className="team-member-view" style={{ '--box-accent': team.color, '--origin-x': `${originRect?.x ?? window.innerWidth / 2}px`, '--origin-y': `${originRect?.y ?? window.innerHeight / 2}px` }} role="dialog" aria-modal="true" aria-label={`${team.label} members`} tabIndex={-1}>
      <div className="team-member-view__topline"><span>{team.label}</span><button type="button" onClick={close} aria-label="Close team members"><X /></button></div>
      <div className="team-member-view__planet"><PlanetFace color={team.color} label={team.label} /></div>
      <div className="team-carousel" aria-label={`${team.label} member profiles`}>
        {team.members.map((member, index) => <MemberCard key={`${team.id}-${member.id}`} member={member} index={index} active={activeIndex} reduced={reduced} />)}
      </div>
      <p className="team-member-view__hint">{team.members.length > 1 ? 'Scroll or swipe to move through the team' : 'Scroll or swipe down to return to the overview'}</p>
    </div>
  )
}

export default function TeamSection() {
  const reduced = useReducedMotion()
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [originRect, setOriginRect] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const openerRef = useRef(null)

  const openTeam = useCallback((team, opener) => {
    setActiveIndex(0)
    openerRef.current = opener
    setOriginRect(opener.getBoundingClientRect())
    setSelectedTeam(team)
  }, [])
  const closeTeam = useCallback(() => setSelectedTeam(null), [])

  return (
    <section id="team" className="team-section" aria-labelledby="team-heading">
      <div className="team-header">
        <span className="team-kicker"><img src="/Logo/logo-icon.png" alt="vCloudOps" /> Core above the constellation</span>
        <h2 id="team-heading">Built by students, for students</h2>
        <p>The team running workshops, mentoring lab sessions, and maintaining community infrastructure.</p>
      </div>
      <div className="team-overview" aria-label="Team domains">
        <DomainBox team={TEAMS[0]} onOpen={openTeam} isCore />
        <div className="team-domain-grid">
          {TEAMS.slice(1).map((team) => <DomainBox key={team.id} team={team} onOpen={openTeam} />)}
        </div>
      </div>
      {selectedTeam && createPortal(<MemberView team={selectedTeam} activeIndex={activeIndex} setActiveIndex={setActiveIndex} onClose={closeTeam} reduced={reduced} openerRef={openerRef} originRect={originRect} />, document.body)}
    </section>
  )
}
