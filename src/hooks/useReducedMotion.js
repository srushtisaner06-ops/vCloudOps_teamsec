import { useEffect, useRef } from 'react'

/**
 * useReducedMotion — returns true if the user prefers reduced motion.
 * Falls back to false on SSR / browsers without matchMedia.
 */
export function useReducedMotion() {
  const ref = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    ref.current = mq.matches

    const handler = (e) => { ref.current = e.matches }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
