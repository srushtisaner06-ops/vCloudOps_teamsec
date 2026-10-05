import './index.css'
import Home from './pages/Home'
import GlowCursor from './components/GlowCursor'

function App() {
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
      <Home />
    </GlowCursor>
  )
}

export default App
