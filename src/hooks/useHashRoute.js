import { useEffect, useState } from 'react'

const parse = () => {
  const hash = window.location.hash
  if (!hash.startsWith('#/')) return { path: '/', params: [] }
  const parts = hash.slice(2).split('/').filter(Boolean)
  return { path: `/${parts[0] || ''}`, params: parts.slice(1) }
}

/**
 * useHashRoute — minimal router for `#/page/param` URLs.
 * Plain section anchors (`#about`) stay on the home page.
 */
export function useHashRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const onChange = () => setRoute(parse())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
