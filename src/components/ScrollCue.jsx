import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function ScrollCue() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })
    
    tl.to('.mouse-wheel', {
      y: 10,
      opacity: 0.3,
      duration: 1
    }).to('.mouse-wheel', {
      y: 0,
      opacity: 1,
      duration: 1
    }, '<')

    gsap.to('.mouse-body', {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })

    gsap.to('.chevron', {
      opacity: 1,
      stagger: 0.2,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    })

  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      aria-label="Scroll down"
    >
      {/* Mouse icon */}
      <div
        className="mouse-body flex justify-center pt-2 rounded-full border-2 border-white/20 bg-[#050505]/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05),inset_0_0_10px_rgba(255,255,255,0.05)]"
        style={{ width: 26, height: 40 }}
      >
        <div className="mouse-wheel w-1 h-2 rounded-full bg-slate-300 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
      </div>

      {/* Chevrons */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="chevron opacity-20 w-2.5 h-2.5 border-r-[2.5px] border-b-[2.5px] border-slate-400 rotate-45 -mt-1"
        />
      ))}
    </div>
  )
}
