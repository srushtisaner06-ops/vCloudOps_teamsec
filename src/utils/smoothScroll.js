import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

/**
 * Initialize Lenis smooth scroll and connect with GSAP ScrollTrigger
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null

  // Destroy existing instance if any
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }

  // Check user prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    return null
  }

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
    wheelMultiplier: 0.95,
    infinite: false,
  })

  // Synchronize Lenis scroll with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update)

  const onTick = (time) => {
    if (lenisInstance) {
      lenisInstance.raf(time * 1000)
    }
  }

  gsap.ticker.add(onTick)
  gsap.ticker.lagSmoothing(500, 33)

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}

/**
 * Smoothly scroll to a specific target (selector or DOM element)
 * Automatically accounts for sticky/fixed navigation offset
 */
export function scrollToTarget(target, customOffset = -80) {
  if (!target) return

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: customOffset,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  } else {
    // Fallback if Lenis is disabled or reduced motion
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + customOffset
      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth',
      })
    }
  }
}
