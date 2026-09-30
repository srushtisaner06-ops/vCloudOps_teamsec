import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { scrollToTarget } from '../utils/smoothScroll'

export default function ScrollCue() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })

    tl.to('.mouse-wheel', {
      y: 8,
      opacity: 0.2,
      duration: 1,
    }).to('.mouse-wheel', {
      y: 0,
      opacity: 1,
      duration: 1,
    }, '<')

    gsap.to('.mouse-body', {
      y: 6,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    gsap.to('.chevron', {
      opacity: 1,
      stagger: 0.2,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    })
  }, { scope: containerRef })

  const handleClick = (e) => {
    e.preventDefault()
    scrollToTarget('#about', -80)
  }

  return (
    <button
      ref={containerRef}
      onClick={handleClick}
      type="button"
      className="group flex flex-col items-center gap-1.5 cursor-pointer select-none opacity-80 hover:opacity-100 transition-opacity p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/40"
      aria-label="Scroll to About section"
    >
      <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-sky-400 transition-colors">
        Scroll
      </span>

      {/* Mouse icon */}
      <div
        className="mouse-body flex justify-center pt-1.5 rounded-full border-2 border-white/20 group-hover:border-sky-400/50 bg-[#050505]/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-colors"
        style={{ width: 22, height: 36 }}
      >
        <div className="mouse-wheel w-1 h-2 rounded-full bg-slate-300 shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
      </div>

      {/* Chevrons */}
      <div className="flex flex-col items-center">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="chevron opacity-20 w-2 h-2 border-r-2 border-b-2 border-slate-400 group-hover:border-sky-300 rotate-45 -mt-0.5 transition-colors"
          />
        ))}
      </div>
    </button>
  )
}
