import { Suspense, lazy, useEffect } from 'react'
import './index.css'
import Home from './pages/Home'
import GlowCursor from './components/GlowCursor'
import { useHashRoute } from './hooks/useHashRoute'

// Recruitment portal pages load on demand so they stay out of the home-page bundle.
const JoinPage = lazy(() => import('./pages/JoinPage'))
const ApplyPortal = lazy(() => import('./pages/ApplyPortal'))
const MyApplication = lazy(() => import('./pages/MyApplication'))

function App() {
  const { path, params } = useHashRoute()

  // New page → start at the top (section anchors on Home handle their own scrolling).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  let page = <Home />
  if (path === '/join') page = <JoinPage />
  else if (path === '/apply') page = <ApplyPortal key={params[0] || 'any'} initialDomain={params[0]} />
  else if (path === '/application') page = <MyApplication />

  return (
    <GlowCursor
      color="#67E8F9"
      secondaryColor="#A78BFA"
      trailLength={40}
      trailWidth={8}
      trailTaper={0.8}
      followSpeed={0.16}
      glowIntensity={1.9}
      glowSpread={1.2}
      hotspot={0.65}
      brightness={1.25}
      opacity={1}
      pulseSpeed={1.1}
      noiseStrength={0.035}
      idleFade
      idleTimeout={700}
      fadeDuration={900}
      blendMode="screen"
      global
    >
      <Suspense fallback={<div className="min-h-[100dvh] bg-[#050B18]" />}>{page}</Suspense>
    </GlowCursor>
  )
}

export default App
