import { motion, useTransform } from 'framer-motion'

/**
 * NebulaDustClouds — Far Background Layer (z = -300px to -500px / Speed: 0.02x–0.04x)
 *
 * Implements smooth ambient color temperature shifts across the 4 journey phases:
 *   - Phase 1 (0% - 15%): Signature vCloudOps Cyan & Azure lunar auras
 *   - Phase 2 (15% - 45%): Electric Cobalt & Indigo inner-system dust lanes
 *   - Phase 3 (45% - 75%): Cool Deep Void & Ultraviolet gas giant atmosphere
 *   - Phase 4 (75% - 100%): Rich Magenta & Electric Cyan outer nebula nursery
 */
export default function NebulaDustClouds({ progress, reduced = false }) {
  // Slow background drift (0.025x speed)
  const nebulaY = useTransform(progress, [0, 1], [0, -110])

  // Phase 1 (Hero): Visible at start, dissolves as we exit upper orbit
  const p1Opacity = useTransform(progress, [0, 0.15, 0.22], [1, 0.8, 0])

  // Phase 2 (Inner System): Rises during 15% - 45%
  const p2Opacity = useTransform(progress, [0.12, 0.20, 0.38, 0.48], [0, 0.95, 0.95, 0])

  // Phase 3 (Deep Void): Shading becomes deep ultraviolet & midnight cyan
  const p3Opacity = useTransform(progress, [0.42, 0.50, 0.68, 0.76], [0, 1, 1, 0])

  // Phase 4 (Nebula Core): Rich cosmic nursery glow near footer
  const p4Opacity = useTransform(progress, [0.70, 0.80, 1], [0, 1, 1])

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{ contain: 'paint', ...(reduced ? {} : { y: nebulaY }) }}
      aria-hidden="true"
    >
      {/* ── Phase 1: Signature Cyan/Azure Hero Auras ── */}
      <motion.div
        style={reduced ? {} : { opacity: p1Opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute -top-16 -right-16 w-[70vw] h-[60vh] max-w-[700px] max-h-[600px]"
          style={{
            background:
              'radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.16) 0%, rgba(14, 165, 233, 0.08) 35%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-[65vw] h-[60vh] max-w-[650px] max-h-[600px]"
          style={{
            background:
              'radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.18) 0%, rgba(2, 132, 199, 0.09) 40%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* ── Phase 2: Electric Cobalt & Indigo Dust Lanes (15% - 45%) ── */}
      <motion.div
        style={reduced ? {} : { opacity: p2Opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-[20%] right-[5%] w-[65vw] h-[55vh] max-w-[680px] max-h-[580px]"
          style={{
            background:
              'radial-gradient(ellipse at 60% 40%, rgba(79, 70, 229, 0.15) 0%, rgba(37, 99, 235, 0.08) 40%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-[35%] -left-10 w-[50vw] h-[45vh] max-w-[500px]"
          style={{
            background:
              'radial-gradient(ellipse at 30% 60%, rgba(2, 132, 199, 0.14) 0%, rgba(15, 23, 42, 0) 70%)',
          }}
        />
      </motion.div>

      {/* ── Phase 3: Deep Void & Ultraviolet Ambience (45% - 75%) ── */}
      <motion.div
        style={reduced ? {} : { opacity: p3Opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-[38%] left-[5%] w-[70vw] h-[60vh] max-w-[750px] max-h-[620px]"
          style={{
            background:
              'radial-gradient(ellipse at 40% 50%, rgba(124, 58, 237, 0.14) 0%, rgba(67, 56, 202, 0.08) 40%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-[50%] right-[10%] w-[55vw] h-[45vh] max-w-[600px]"
          style={{
            background:
              'radial-gradient(circle at 65% 50%, rgba(14, 116, 144, 0.12) 0%, transparent 65%)',
          }}
        />
      </motion.div>

      {/* ── Phase 4: Outer Frontier / Nebula Core (75% - 100%) ── */}
      <motion.div
        style={reduced ? {} : { opacity: p4Opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute bottom-0 left-[15%] w-[80vw] h-[65vh] max-w-[850px]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 70%, rgba(217, 70, 239, 0.16) 0%, rgba(147, 51, 234, 0.10) 35%, rgba(6, 182, 212, 0.08) 60%, transparent 75%)',
          }}
        />
        <div
          className="absolute bottom-10 right-0 w-[50vw] h-[40vh] max-w-[550px]"
          style={{
            background:
              'radial-gradient(circle at 70% 80%, rgba(6, 182, 212, 0.14) 0%, transparent 65%)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}
