import CloudBackground from '../components/CloudBackground'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutTeaser from '../components/AboutTeaser'

/* ─────────────────────────────────────────────
   Home page
   Stacks: fixed sky background → Navbar → Hero → AboutTeaser
   The CloudBackground stays fixed so subsequent
   sections (Events, Team, etc.) share the same sky.
───────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* ── Persistent sky backdrop (z-index: 0, position: fixed) ── */}
      <CloudBackground />

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Main content stack ── */}
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <AboutTeaser />

        {/* Placeholder anchors for future sections */}
        <section id="events"  style={{ minHeight: '40vh', zIndex: 1, position: 'relative' }} />
        <section id="team"    style={{ minHeight: '20vh', zIndex: 1, position: 'relative' }} />
        <section id="contact" style={{ minHeight: '20vh', zIndex: 1, position: 'relative' }} />
      </main>

      {/* ── Footer strip ── */}
      <footer
        className="relative py-8 text-center"
        style={{
          zIndex: 1,
          borderTop: '1px solid rgba(76,214,255,0.08)',
          background: 'rgba(5,11,24,0.6)',
          backdropFilter: 'blur(12px)',
          fontFamily: 'var(--font-mono)',
          color: 'rgba(142,197,255,0.35)',
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
        }}
      >
        © {new Date().getFullYear()} vCloudOps — Built by the community, for the community.
      </footer>
    </div>
  )
}
