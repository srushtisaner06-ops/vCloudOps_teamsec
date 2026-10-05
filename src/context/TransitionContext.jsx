import { useState, useCallback, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TransitionContext } from './transition-context-base'

export function TransitionProvider({ children }) {
  const [isWarping, setIsWarping] = useState(false)
  const [warpPhase, setWarpPhase] = useState('idle') // 'idle' | 'enter' | 'exit'
  const navigate = useNavigate()
  const location = useLocation()
  const timeoutRef = useRef(null)

  const transitionTo = useCallback((targetPath) => {
    if (location.pathname === targetPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // Phase 1: Enter hyperspace warp (acceleration & blur)
    setIsWarping(true)
    setWarpPhase('enter')

    timeoutRef.current = setTimeout(() => {
      // Phase 2: Route change at peak warp opacity
      navigate(targetPath)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setWarpPhase('exit')

      // Phase 3: Deceleration & arrival
      timeoutRef.current = setTimeout(() => {
        setIsWarping(false)
        setWarpPhase('idle')
      }, 340)
    }, 280)
  }, [location.pathname, navigate])

  return (
    <TransitionContext.Provider value={{ isWarping, warpPhase, transitionTo }}>
      {children}
    </TransitionContext.Provider>
  )
}
