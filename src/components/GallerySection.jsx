import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Sparkle } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export default function GallerySection() {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.gallery-header', {
        y: 25,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: containerRef.current, start: 'top 90%', once: true },
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative pt-2 sm:pt-4 md:pt-4 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 flex flex-col items-center text-center z-10"
    >
      {/* Header */}
      <div className="gallery-header flex flex-col items-center max-w-3xl mb-5 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-sky-400/20 backdrop-blur-xl mb-3 sm:mb-4">
          <Sparkle weight="fill" className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold text-sky-400">
            Community Moments
          </span>
        </div>

        <h2
          className="font-extrabold text-white leading-tight tracking-tight mb-2 sm:mb-3"
          style={{ fontSize: 'clamp(1.85rem, 4.2vw, 3.25rem)' }}
        >
          Orbiting Memories
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed">
          Snapshots and highlights from our cloud architecture workshops, hackathons, and student sprints.
        </p>
      </div>
    </section>
  )
}
