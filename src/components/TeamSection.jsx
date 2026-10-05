import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { GithubLogo, LinkedinLogo, X } from '@phosphor-icons/react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getLenis } from '../utils/smoothScroll'
import './TeamSection.css'

gsap.registerPlugin(ScrollTrigger)

const MEMBERS = [
  { id: 'aditya-katare', name: 'Aditya Katare', role: 'President', domain: 'Core leadership', github: 'https://github.com/ADITYA-K-07', linkedin: 'https://www.linkedin.com/in/aditya-katare-873a56385', accent: '#4aa9db', portrait: '/team-members/roster/aditya-katare.webp' },
  { id: 'aryan-khade', name: 'Aryan Khade', role: 'Vice President', domain: 'Core leadership', github: 'https://github.com/Aryan886', linkedin: 'https://www.linkedin.com/in/aryankhade005', accent: '#4aa9db', portrait: '/team-members/roster/aryan-khade.webp' },
  { id: 'mrugesh-kulkarni', name: 'Mrugesh Kulkarni', role: 'Head', domain: 'Cloud', github: 'https://github.com/Pixel-Stock', linkedin: 'https://www.linkedin.com/in/mrugeshkulkarni/', accent: '#57c7ff', portrait: '/team-members/roster/mrugesh-kulkarni.webp' },
  { id: 'anup-dubey', name: 'Anup Dubey', role: 'Co-Head', domain: 'Cloud', github: 'https://github.com/Anup1dubey', linkedin: 'https://www.linkedin.com/in/anup-dubey-646433328/', accent: '#57c7ff', portrait: '/team-members/roster/anup-dubey.webp' },
  { id: 'pranav-amdekar', name: 'Pranav Amdekar', role: 'Co-Head', domain: 'Cloud', github: 'https://github.com/0xprxnav', linkedin: 'https://www.linkedin.com/in/pranav-amdekar-04b304386', accent: '#57c7ff', portrait: '/team-members/roster/pranav-amdekar.webp' },
  { id: 'ishani-bharsakade', name: 'Ishani Bharsakade', role: 'Co-Head', domain: 'Finance & Sponsorship', github: 'https://github.com/RealSpidey69', linkedin: 'https://www.linkedin.com/in/ishani-bharsakade-3a1866229/', accent: '#a98bff', portrait: '/team-members/roster/ishani-bharsakade.webp' },
  { id: 'govind-agrawal', name: 'Govind Agrawal', role: 'Co-Head', domain: 'Finance & Sponsorship', linkedin: 'https://www.linkedin.com/in/govind-agrawal-a85806384', accent: '#a98bff', portrait: '/team-members/roster/govind-agrawal.webp' },
  { id: 'krishna-gangshettiwar', name: 'Krishna Gangshettiwar', role: 'Co-Head', domain: 'Finance & Sponsorship', github: 'https://github.com/Krishna5670', linkedin: 'https://www.linkedin.com/in/krishna-gangshettiwar-198a5a385', accent: '#a98bff', portrait: '/team-members/roster/krishna-gangshettiwar.webp' },
  { id: 'satyajit-gaikwad', name: 'Satyajit Gaikwad', role: 'Head', domain: 'Web Development', github: 'https://github.com/CodeBySatyajit', linkedin: 'https://www.linkedin.com/in/satyajit-gaikwad-092381372/', accent: '#6b9cff', portrait: '/team-members/roster/satyajit-gaikwad.webp' },
  { id: 'tanushka-patil', name: 'Tanushka Patil', role: 'Co-Head', domain: 'Web Development', github: 'https://github.com/Tanushka-sp2007', linkedin: 'https://www.linkedin.com/in/tanushka-sunil-patil-a87090389', accent: '#6b9cff', portrait: '/team-members/roster/tanushka-patil.webp' },
  { id: 'aryan-durgude', name: 'Aryan Durgude', role: 'Head', domain: 'Multimedia', github: 'https://github.com/NotAl2', linkedin: 'https://www.linkedin.com/in/aryan-durgude-777816385', accent: '#36d9c4', portrait: '/team-members/roster/aryan-durgude.webp' },
  { id: 'harsh-chendwankar', name: 'Harsh Chendwankar', role: 'Co-Head', domain: 'Multimedia', github: 'https://github.com/Harsh20-06', linkedin: 'https://www.linkedin.com/in/harsh-chendwankar', accent: '#36d9c4', portrait: '/team-members/roster/harsh-chendwankar.webp' },
  { id: 'vaishnavi-bhagwat', name: 'Vaishnavi Bhagwat', role: 'Co-Head', domain: 'Multimedia', github: 'https://github.com/vaishnavibhagwat', linkedin: 'https://www.linkedin.com/in/vaishnavi-bhagwat-509a5037a', accent: '#36d9c4', portrait: '/team-members/roster/vaishnavi-bhagwat.webp' },
  { id: 'naisha-sahni', name: 'Naisha Sahni', role: 'Co-Head', domain: 'Multimedia', github: 'https://github.com/naishasahni', accent: '#36d9c4', portrait: '/team-members/roster/naisha-sahni.webp' },
  { id: 'sanskar-babar', name: 'Sanskar Babar', role: 'Video Editor', domain: 'Multimedia', github: 'https://github.com/sanskarbabar', linkedin: 'https://www.linkedin.com/in/sanskar-babar-1079021b9', accent: '#36d9c4', portrait: '/team-members/roster/sanskar-babar.webp' },
  { id: 'jiteesh-ghodke', name: 'Jiteesh Ghodke', role: 'Co-Head', domain: 'Competitive Programming', github: 'https://github.com/jiteeshghodke456-del', linkedin: 'https://www.linkedin.com/in/jiteesh-ghodke-642832398', accent: '#58d8e8', portrait: '/team-members/roster/jiteesh-ghodke.webp' },
  { id: 'jayesh-khandelwal', name: 'Jayesh Khandelwal', role: 'Co-Head', domain: 'Competitive Programming', github: 'https://github.com/itsjayeshk', linkedin: 'https://www.linkedin.com/in/jayesh-khandelwal-vit', accent: '#58d8e8', portrait: '/team-members/roster/jayesh-khandelwal.webp' },
  { id: 'manthan-devi', name: 'Manthan Devi', role: 'Co-Head', domain: 'Competitive Programming', github: 'https://github.com/coder-manthan-007', linkedin: 'https://www.linkedin.com/in/manthan-devi-8764a3386/', accent: '#58d8e8', portrait: '/team-members/roster/manthan-devi.webp' },
  { id: 'vipul-bangar', name: 'Vipul Bangar', role: 'Co-Head', domain: 'Operations', github: 'https://github.com/thevipulbangar', linkedin: 'https://www.linkedin.com/in/vipul-bangar-8a4a9937b/', accent: '#f6b75d', portrait: '/team-members/roster/vipul-bangar.webp' },
  { id: 'aryaan-antarkar', name: 'Aryaan Antarkar', role: 'Co-Head', domain: 'Operations', github: 'https://github.com/aryaanantarkar-byte', linkedin: 'https://www.linkedin.com/in/aryaan-antarkar-74565b386/', accent: '#f6b75d', portrait: '/team-members/roster/aryaan-antarkar.webp' },
  { id: 'sanskar-dhonde', name: 'Sanskar Dhonde', role: 'Head', domain: 'App Development', github: 'https://github.com/dhonde290-netizen', linkedin: 'https://www.linkedin.com/in/sanskardhonde/', accent: '#ff8fbd', portrait: '/team-members/roster/sanskar-dhonde.webp' },
  { id: 'arnav-agarwal', name: 'Arnav Agarwal', role: 'Co-Head', domain: 'App Development', github: 'https://github.com/Arnav-Code-hub', linkedin: 'https://www.linkedin.com/in/arnav-agarwal-727323375', accent: '#ff8fbd', portrait: '/team-members/roster/arnav-agarwal.webp' },
  { id: 'sara-tamboli', name: 'Sara Tamboli', role: 'Co-Head', domain: 'App Development', github: 'https://github.com/TamboliSara', linkedin: 'https://www.linkedin.com/in/sara-tamboli-bb0823385/', accent: '#ff8fbd', portrait: '/team-members/roster/sara-tamboli.webp' },
  { id: 'srushti-saner', name: 'Srushti Saner', role: 'Co-Head', domain: 'App Development', github: 'https://github.com/srushtisaner06-ops', linkedin: 'https://www.linkedin.com/in/srushti-saner-b7b55422a', accent: '#ff8fbd', portrait: '/team-members/roster/srushti-saner.webp' },
  { id: 'raghav-kumar', name: 'Raghav Kumar', role: 'Head', domain: 'AI/ML', github: 'https://github.com/Raghs3', linkedin: 'https://www.linkedin.com/in/raghav-kumar2803', accent: '#b3a0ff', portrait: '/team-members/roster/raghav-kumar.webp' },
  { id: 'anand-nair', name: 'Anand Nair', role: 'Co-Head', domain: 'AI/ML', github: 'https://github.com/Dazzanova', linkedin: 'https://www.linkedin.com/in/heyy-anand-here', accent: '#b3a0ff', portrait: '/team-members/roster/anand-nair.webp' },
  { id: 'varad-takale', name: 'Varad Takale', role: 'Head', domain: 'Publicity and Outreach', github: 'https://github.com/varadtakale45-sudo', linkedin: 'https://www.linkedin.com/in/varad-takale-189967378', accent: '#7ce4a5', portrait: '/team-members/roster/varad-takale.webp' },
  { id: 'shubham-jadhav', name: 'Shubham Jadhav', role: 'Head', domain: 'Publicity and Outreach', github: 'https://github.com/Shoya0002', linkedin: 'https://www.linkedin.com/in/shubham-jadhav-2615093b6', accent: '#7ce4a5', portrait: '/team-members/roster/shubham-jadhav.webp' },
  { id: 'harsh-kukade', name: 'Harsh Kukade', role: 'Co-Head', domain: 'Publicity and Outreach', github: 'https://github.com/Harsh150707', linkedin: 'https://www.linkedin.com/in/harsh-kukade-83b81a385', accent: '#7ce4a5', portrait: '/team-members/roster/harsh-kukade.webp' },
  { id: 'parth-birari', name: 'Parth Birari', role: 'Co-Head', domain: 'Publicity and Outreach', github: 'https://github.com/birariparth-ui', linkedin: 'https://www.linkedin.com/in/parth-birari-07344b383', accent: '#7ce4a5', portrait: '/team-members/roster/parth-birari.webp' },
]

const TEAMS = [
  { id: 'core', label: 'Core leadership', color: '#4aa9db', members: MEMBERS.filter((member) => member.domain === 'Core leadership') },
  { id: 'cloud', label: 'Cloud', color: '#57c7ff', logo: '/team-logos/cloud.webp', members: MEMBERS.filter((member) => member.domain === 'Cloud') },
  { id: 'delivery', label: 'Finance & Sponsorship', color: '#a98bff', logo: '/team-logos/finance.webp', members: MEMBERS.filter((member) => member.domain === 'Finance & Sponsorship') },
  { id: 'platform', label: 'Web Development', color: '#6b9cff', logo: '/team-logos/web-development.webp', members: MEMBERS.filter((member) => member.domain === 'Web Development') },
  { id: 'security', label: 'Multimedia', color: '#36d9c4', logo: '/team-logos/multimedia.webp', members: MEMBERS.filter((member) => member.domain === 'Multimedia') },
  { id: 'containers', label: 'Competitive Programming', color: '#58d8e8', logo: '/team-logos/competitive-programming.webp', members: MEMBERS.filter((member) => member.domain === 'Competitive Programming') },
  { id: 'automation', label: 'Operations', color: '#f6b75d', logo: '/team-logos/operations.webp', members: MEMBERS.filter((member) => member.domain === 'Operations') },
  { id: 'labs', label: 'App Development', color: '#ff8fbd', logo: '/team-logos/app-development.webp', members: MEMBERS.filter((member) => member.domain === 'App Development') },
  { id: 'opensource', label: 'AI/ML', color: '#b3a0ff', logo: '/team-logos/ai-ml.webp', members: MEMBERS.filter((member) => member.domain === 'AI/ML') },
  { id: 'community', label: 'Publicity and Outreach', color: '#7ce4a5', logo: '/team-logos/publicity.webp', members: MEMBERS.filter((member) => member.domain === 'Publicity and Outreach') },
]

const AUTO_OPEN_DELAY = 900

function PlanetFace({ color, label, variant = 'default' }) {
  const rawId = useId()
  const id = rawId.replace(/:/g, '')
  if (variant === 'core') {
    return (
      <svg className="team-planet-image team-planet-image--core" viewBox="0 0 123 85" role="img" aria-label={`${label} planet`}>
        <defs>
          <radialGradient id={`core-glow-${id}`} cx="50%" cy="50%" r="50%"><stop stopColor="#83eaff" stopOpacity=".55" /><stop offset="1" stopColor="#1b7cff" stopOpacity="0" /></radialGradient>
          <linearGradient id={`core-orbit-${id}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#20206c" /><stop offset=".52" stopColor="#61e5ff" /><stop offset="1" stopColor="#17145e" /></linearGradient>
        </defs>
        <circle cx="61.5" cy="42.5" r="34" fill={`url(#core-glow-${id})`} />
        <ellipse cx="61.5" cy="42.5" rx="24" ry="12" fill="none" stroke={`url(#core-orbit-${id})`} strokeWidth="2.2" transform="rotate(39 61.5 42.5)" />
        <ellipse cx="61.5" cy="42.5" rx="24" ry="12" fill="none" stroke="#2c237c" strokeWidth="2.1" transform="rotate(-39 61.5 42.5)" />
        <circle cx="61.5" cy="42.5" r="18" fill="#172267" stroke="#6bdfff" strokeWidth="1.1" />
        <path d="M61.5 25.5 66 37.8l12.2 4.7L66 47l-4.5 12.5L57 47l-12.2-4.5L57 37.8z" fill="#b7f8ff" stroke="#6bdaff" strokeWidth=".8" />
        <circle cx="43" cy="29" r="3.4" fill="#1bbcff" stroke="#122d80" strokeWidth="1.4" />
        <circle cx="81" cy="25" r="3.4" fill="#b8f5ff" stroke="#122d80" strokeWidth="1.4" />
        <circle cx="44" cy="56" r="3.4" fill="#5fe0ff" stroke="#122d80" strokeWidth="1.4" />
        <circle cx="70" cy="59" r="3.4" fill="#19bfff" stroke="#122d80" strokeWidth="1.4" />
      </svg>
    )
  }
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

function DomainBox({ team, onOpen, isCore = false, isOpen = false }) {
  return (
    <button type="button" data-team-id={team.id} className={`team-domain-box ${isCore ? 'is-core' : ''} ${isOpen ? 'is-open' : ''}`} style={{ '--box-accent': team.color }} onClick={(event) => onOpen(team, event.currentTarget, event.currentTarget.querySelector('.team-domain-box__face > *'))} aria-label={`Open ${team.label}`}>
      <span className="team-domain-box__face">{team.logo ? <img className="team-domain-logo" src={team.logo} alt="" /> : <PlanetFace color={team.color} label={team.label} variant={isCore ? 'core' : 'default'} />}</span>
      <span className="team-domain-lens" aria-hidden="true" />
      <span className="team-domain-box__label">{team.label}</span>
    </button>
  )
}

function MemberCard({ member, index, active, reduced }) {
  const [portraitFailed, setPortraitFailed] = useState(false)
  const distance = index - active
  const isRear = distance !== 0
  const style = reduced ? {} : {
    '--card-x': `${distance * 300}px`,
    '--card-z': `${-Math.abs(distance) * 180}px`,
    '--card-rotate': `${distance > 0 ? Math.min(distance, 1) * 19 : 0}deg`,
    '--card-scale': `${1 - Math.min(Math.abs(distance) * .045, .18)}`,
    '--card-opacity': distance === 0 ? 1 : (Math.abs(distance) === 1 ? .72 : 0),
  }
  return (
    <article className={`team-member-card ${active === index ? 'is-active' : ''} ${isRear ? 'is-rear' : ''}`} style={style} aria-hidden={active !== index}>
      <div className={`team-member-card__portrait${member.portrait ? ' has-image' : ''}`} style={{ '--portrait-accent': member.accent }}>
        {member.portrait && !portraitFailed ? <img className="team-member-portrait-image" src={member.portrait} alt={`${member.name} portrait`} loading="lazy" decoding="async" width="280" height="340" onError={() => setPortraitFailed(true)} /> : null}
        <span className="team-portrait-particles" aria-hidden="true" />
        {!member.portrait || portraitFailed ? <span className="team-member-initial">{member.name.charAt(0)}</span> : null}
        <span className="team-member-index">0{index + 1}</span>
      </div>
      <div className="team-member-card__content">
        <h3>{member.name}</h3>
        <p className="team-member-role">{member.role}</p>
        <p className="team-member-domain">{member.domain}</p>
        <div className="team-member-links">
          {member.github ? <a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} GitHub`}><GithubLogo weight="fill" /></a> : null}
          {member.linkedin ? <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} LinkedIn`}><LinkedinLogo weight="fill" /></a> : null}
        </div>
      </div>
    </article>
  )
}

function MemberView({ team, activeIndex, setActiveIndex, onClose, reduced, openerRef, originRect }) {
  const viewRef = useRef(null)
  const gestureLock = useRef(false)
  const unlockTimer = useRef(null)
  const closeTimer = useRef(null)
  const touchStartY = useRef(null)
  const activeIndexRef = useRef(activeIndex)
  const closingRef = useRef(false)
  const [closing, setClosing] = useState(false)
  useEffect(() => { activeIndexRef.current = activeIndex }, [activeIndex])

  const close = useCallback((reason = 'completed') => {
    if (closingRef.current) return
    gestureLock.current = false
    if (reduced) {
      onClose(reason)
      return
    }
    closingRef.current = true
    setClosing(true)
    closeTimer.current = window.setTimeout(() => onClose(reason), 650)
  }, [onClose, reduced])

  const move = useCallback((direction) => {
    if (gestureLock.current) return
    gestureLock.current = true
    const current = activeIndexRef.current
    if (direction > 0 && current < team.members.length - 1) {
      setActiveIndex((index) => index + 1)
    } else if (direction < 0 && current > 0) {
      setActiveIndex((index) => index - 1)
    } else if (direction < 0 && current === 0) {
      close('completed')
      return
    } else {
      close('completed')
      return
    }
    unlockTimer.current = window.setTimeout(() => { gestureLock.current = false }, reduced ? 40 : 950)
  }, [close, reduced, setActiveIndex, team.members.length])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const lenis = getLenis()
    const lenisWasStopped = Boolean(lenis?.isStopped)
    const saved = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
    }
    const savedFocus = document.activeElement
    const focusTarget = openerRef.current
    // Stop Lenis before locking overflow. Native scroll position remains
    // untouched, so closing does not need to call window.scrollTo().
    lenis?.stop()
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
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
      if (event.key === 'Escape') { event.preventDefault(); close('dismissed'); return }
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
      if (closeTimer.current) window.clearTimeout(closeTimer.current)
      view?.removeEventListener('wheel', onWheel, true)
      view?.removeEventListener('touchstart', onTouchStart)
      view?.removeEventListener('touchmove', onTouchMove)
      view?.removeEventListener('touchend', onTouchEnd)
      view?.removeEventListener('keydown', onKeyDown)
      html.style.overflow = saved.htmlOverflow
      body.style.overflow = saved.bodyOverflow
      if (lenis && !lenisWasStopped) lenis.start()
      if (savedFocus instanceof HTMLElement) savedFocus.focus({ preventScroll: true })
      else focusTarget?.focus({ preventScroll: true })
    }
  }, [close, move, openerRef])

  return (
    <div ref={viewRef} className={`team-member-view ${closing ? 'is-closing' : ''}`} style={{ '--box-accent': team.color, '--origin-x': `${originRect?.x ?? window.innerWidth / 2}px`, '--origin-y': `${originRect?.y ?? window.innerHeight / 2}px` }} role="dialog" aria-modal="true" aria-label={`${team.label} members`} tabIndex={-1}>
      <div className="team-member-view__topline"><span>{team.label}</span><button type="button" onClick={() => close('button')} aria-label="Close team members"><X /></button></div>
      <div className="team-carousel" aria-label={`${team.label} member profiles`}>
        {team.members.map((member, index) => <MemberCard key={`${team.id}-${member.id}`} member={member} index={index} active={activeIndex} reduced={reduced} />)}
      </div>
      <div className={`team-orbit-dock ${closing ? 'is-closing' : ''}`} aria-hidden="true">
        <div className="team-orbit-dock__rings"><span className="team-orbit-dock__slot" /></div>
        <span className="team-orbit-dock__logo">{team.logo ? <img src={team.logo} alt="" /> : <PlanetFace color={team.color} label={team.label} variant={team.id === 'core' ? 'core' : 'default'} />}</span>
        <span className="team-orbit-dock__label">{team.label}</span>
      </div>
      <p className="team-member-view__hint">{team.members.length > 1 ? 'Scroll or swipe to move through the team' : 'Scroll or swipe down to return to the overview'}</p>
    </div>
  )
}

export default function TeamSection() {
  const reduced = useReducedMotion()
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [autoOpenDisabled, setAutoOpenDisabled] = useState(false)
  const [originRect, setOriginRect] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const openerRef = useRef(null)
  const sectionRef = useRef(null)
  const selectedTeamRef = useRef(null)
  const autoOpenDisabledRef = useRef(false)
  const nextExpectedTeamIdRef = useRef(TEAMS[0].id)
  const autoOpenInFlightRef = useRef(false)
  const automaticallyOpenedTeamRef = useRef(null)
  const sequenceDirectionRef = useRef(1)
  const automaticDirectionRef = useRef(1)
  const autoOpenReadyRef = useRef(true)
  const autoOpenDelayTimerRef = useRef(null)

  useEffect(() => {
    selectedTeamRef.current = selectedTeam
  }, [selectedTeam])

  const openTeam = useCallback((team, opener, logo, source = 'manual') => {
    if (source === 'auto') {
      if (
        autoOpenDisabledRef.current ||
        selectedTeamRef.current ||
        autoOpenInFlightRef.current ||
        !autoOpenReadyRef.current ||
        nextExpectedTeamIdRef.current !== team.id
      ) return
      autoOpenInFlightRef.current = true
      autoOpenReadyRef.current = false
      automaticallyOpenedTeamRef.current = team.id
      automaticDirectionRef.current = sequenceDirectionRef.current
    } else {
      automaticallyOpenedTeamRef.current = null
    }

    // Remove the lens transform before measuring the original logo for the dock.
    sectionRef.current.classList.add('has-open-member')
    selectedTeamRef.current = team
    const initialIndex = source === 'auto' && automaticDirectionRef.current < 0
      ? team.members.length - 1
      : 0
    setActiveIndex(initialIndex)
    openerRef.current = opener
    const rect = (logo ?? opener).getBoundingClientRect()
    setOriginRect({ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 })
    setSelectedTeam(team)
  }, [])

  const tryOpenExpectedTeam = useCallback((box = null, direction = sequenceDirectionRef.current) => {
    if (
      autoOpenDisabledRef.current ||
      selectedTeamRef.current ||
      autoOpenInFlightRef.current ||
      !autoOpenReadyRef.current ||
      sequenceDirectionRef.current !== direction
    ) return

    const expectedTeam = TEAMS.find((team) => team.id === nextExpectedTeamIdRef.current)
    const expectedBox = box?.dataset.teamId === expectedTeam?.id
      ? box
      : sectionRef.current?.querySelector(`[data-team-id="${expectedTeam?.id}"]`)
    if (!expectedTeam || !expectedBox) return

    const rect = expectedBox.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    if (rect.top <= viewportHeight * .85 && rect.bottom >= viewportHeight * .25) {
      openTeam(expectedTeam, expectedBox, expectedBox.querySelector('.team-domain-box__face > *'), 'auto')
    }
  }, [openTeam])

  const closeTeam = useCallback((reason = 'completed') => {
    const automaticallyOpenedTeamId = automaticallyOpenedTeamRef.current

    if (autoOpenDelayTimerRef.current) {
      window.clearTimeout(autoOpenDelayTimerRef.current)
      autoOpenDelayTimerRef.current = null
    }

    if (reason === 'button') {
      autoOpenDisabledRef.current = true
      setAutoOpenDisabled(true)
    } else if (automaticallyOpenedTeamId) {
      const currentIndex = TEAMS.findIndex((team) => team.id === automaticallyOpenedTeamId)
      const nextTeam = TEAMS[currentIndex + automaticDirectionRef.current]
      nextExpectedTeamIdRef.current = nextTeam?.id ?? null
      if (nextTeam && !autoOpenDisabledRef.current) {
        autoOpenReadyRef.current = false
        autoOpenDelayTimerRef.current = window.setTimeout(() => {
          autoOpenDelayTimerRef.current = null
          autoOpenReadyRef.current = true
          tryOpenExpectedTeam(null, automaticDirectionRef.current)
        }, AUTO_OPEN_DELAY)
      }
    }

    automaticallyOpenedTeamRef.current = null
    autoOpenInFlightRef.current = false
    selectedTeamRef.current = null
    setSelectedTeam(null)
  }, [tryOpenExpectedTeam])

  useEffect(() => () => {
    if (autoOpenDelayTimerRef.current) window.clearTimeout(autoOpenDelayTimerRef.current)
  }, [])

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        end: 'bottom 25%',
        onEnter: () => {
          if (autoOpenDisabledRef.current) return
          sequenceDirectionRef.current = 1
          nextExpectedTeamIdRef.current = TEAMS[0].id
          autoOpenReadyRef.current = true
        },
        onEnterBack: () => {
          if (autoOpenDisabledRef.current) return
          sequenceDirectionRef.current = -1
          nextExpectedTeamIdRef.current = TEAMS[TEAMS.length - 1].id
          autoOpenReadyRef.current = true
        },
      })

      sectionRef.current.querySelectorAll('.team-domain-box').forEach((box) => {
        gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: box,
            start: 'top 85%',
            end: 'bottom 25%',
            scrub: true,
            onEnter: (self) => {
              if (self.direction < 1) return
              tryOpenExpectedTeam(box, 1)
            },
            onEnterBack: (self) => {
              if (self.direction > -1) return
              tryOpenExpectedTeam(box, -1)
            },
          },
        })
          .fromTo(box, { '--lens-sweep': '-40%' }, { '--lens-sweep': '140%', duration: 1 }, 0)
          .fromTo(box, { '--lens-strength': 0, '--lens-tilt': '0deg' }, { '--lens-strength': 1, '--lens-tilt': '6deg', duration: .5 }, 0)
          .to(box, { '--lens-strength': 0, '--lens-tilt': '0deg', duration: .5 }, .5)
      })
    })
    return () => media.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="team" className={`team-section${selectedTeam ? ' has-open-member' : ''}`} data-auto-open-disabled={autoOpenDisabled ? 'true' : undefined} aria-labelledby="team-heading">
      <div className="team-header">
        <span className="team-kicker"><img src="/Logo/aws-logo-white.png" alt="AWS SBG" className="w-4 h-4 object-contain inline-block mr-1.5" /> Core above the constellation</span>
        <h2 id="team-heading">Built by students, for students</h2>
        <p>The team running workshops, mentoring lab sessions, and maintaining community infrastructure.</p>
      </div>
      <div className="team-overview" aria-label="Team domains">
        <DomainBox team={TEAMS[0]} onOpen={openTeam} isCore isOpen={selectedTeam?.id === TEAMS[0].id} />
        <div className="team-domain-grid">
          {TEAMS.slice(1).map((team) => <DomainBox key={team.id} team={team} onOpen={openTeam} isOpen={selectedTeam?.id === team.id} />)}
        </div>
      </div>
      {selectedTeam && createPortal(<MemberView team={selectedTeam} activeIndex={activeIndex} setActiveIndex={setActiveIndex} onClose={closeTeam} reduced={reduced} openerRef={openerRef} originRect={originRect} />, document.body)}
    </section>
  )
}

