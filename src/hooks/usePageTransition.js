import { useContext } from 'react'
import { TransitionContext } from '../context/transition-context-base'

export function usePageTransition() {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('usePageTransition must be used within a TransitionProvider')
  }
  return context
}
