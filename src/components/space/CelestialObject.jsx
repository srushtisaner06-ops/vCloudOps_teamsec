import { motion, useTransform } from 'framer-motion'

/**
 * CelestialObject — Modular GPU-Accelerated Parallax Layer Primitive
 *
 * Drives position, scale, rotation, and opacity transforms strictly via GPU-accelerated
 * translate3d, scale, and opacity properties, honoring prefers-reduced-motion and responsive budgets.
 */
export default function CelestialObject({
  progress,
  range = [0, 0.1, 0.9, 1],
  yRange = [0, 0, 0, 0],
  xRange = null,
  opacityRange = [0, 1, 1, 0],
  scaleRange = null,
  rotateRange = null,
  className = '',
  style = {},
  reduced = false,
  children,
}) {
  // Compute transforms using Framer Motion's useTransform (unconditionally)
  const defaultZero = [0, 0, 0, 0]
  const defaultOne = [1, 1, 1, 1]
  const y = useTransform(progress, range, yRange)
  const opacity = useTransform(progress, range, opacityRange)
  const x = useTransform(progress, range, xRange || defaultZero)
  const scale = useTransform(progress, range, scaleRange || defaultOne)
  const rotate = useTransform(progress, range, rotateRange || defaultZero)

  // When prefers-reduced-motion is true, freeze parallax translation offsets, but preserve scroll-driven opacity
  const motionStyle = reduced
    ? {
        ...style,
        opacity,
        transform: 'translate3d(0, 0, 0)',
        contain: 'paint',
      }
    : {
        ...style,
        y,
        opacity,
        ...(xRange ? { x } : {}),
        ...(scaleRange ? { scale } : {}),
        ...(rotateRange ? { rotate } : {}),
        willChange: 'transform, opacity',
        contain: 'paint',
      }

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={motionStyle}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  )
}
