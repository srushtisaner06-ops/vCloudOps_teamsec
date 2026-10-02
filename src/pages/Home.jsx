import { useEffect } from 'react'
import { destroySmoothScroll, initSmoothScroll, scrollToTarget } from '../utils/smoothScroll'
import SpaceBackground from '../components/SpaceBackground'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutTeaser from '../components/AboutTeaser'
import EventsSection from '../components/EventsSection'
import TeamSection from '../components/TeamSection'
import JoinSection from '../components/join/JoinSection'
import CommunitySection from '../components/CommunitySection'
import Footer from '../components/Footer'

export default function Home() {
  // Initialize Lenis buttery-smooth scrolling with GSAP ScrollTrigger synchronization
  useEffect(() => {
    const lenis = initSmoothScroll()

    // Arriving from the application portal with a section anchor (e.g. #join).
    const hash = window.location.hash
    let timer
    if (hash.length > 1 && !hash.startsWith('#/') && hash !== '#home') {
      timer = setTimeout(() => scrollToTarget(hash, -85), 120)
    }

    return () => {
      clearTimeout(timer)
      if (lenis) destroySmoothScroll()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#050B18] text-[#F8FAFC] selection:bg-sky-500/30 selection:text-sky-200">
      {/* ── Persistent Cosmic Planet Backdrop ── */}
      <SpaceBackground />

      {/* ── Fixed Floating Island Navigation ── */}
      <Navbar />

      {/* ── Main Content Flow ── */}
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <AboutTeaser />
        <EventsSection />
        <TeamSection />
        <JoinSection />
        <CommunitySection />
      </main>

      {/* ── Polished Community Footer ── */}
      <Footer />
    </div>
  )
}
