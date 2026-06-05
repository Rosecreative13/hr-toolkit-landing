import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useVelocity, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion'
import Star from './Star'

interface RotatingBadgeProps {
  text?: string
  size?: number
  color?: string
}

/** Circular rotated-text badge. Rotation speed couples to scroll velocity on enter. */
export default function RotatingBadge({
  text = 'PRACTICAL HR SUPPORT FOR SMES',
  size = 120,
  color = 'var(--color-magenta)',
}: RotatingBadgeProps) {
  const prefersReducedMotion = useReducedMotion()
  const r = size * 0.37
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  const chars = text.split('')

  // Scroll-velocity coupling
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 60, damping: 20 })

  // Self-driven rotation angle
  const rotation = useMotionValue(0)
  const lastTime = useRef<number | null>(null)

  useAnimationFrame((t) => {
    if (prefersReducedMotion) return
    const dt = lastTime.current !== null ? t - lastTime.current : 16.67
    lastTime.current = t
    // Base: 360deg / 18s = 20deg/s
    const base = 20 * (dt / 1000)
    // Scroll boost: scale velocity to extra deg/frame (capped at ±15)
    const boost = Math.sign(smoothVelocity.get()) * Math.min(Math.abs(smoothVelocity.get()) * 0.005, 15) * (dt / 1000)
    rotation.set(rotation.get() + base + boost)
  })

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        position: 'relative',
        flexShrink: 0,
        rotate: prefersReducedMotion ? 0 : rotation,
      }}
      aria-label={text}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <defs>
          <path
            id="rotatingTextPath"
            d={`M ${cx} ${cy} m ${-r} 0 a ${r} ${r} 0 1 1 ${r * 2} 0 a ${r} ${r} 0 1 1 ${-r * 2} 0`}
          />
        </defs>
        <text
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: size * 0.095,
            fontWeight: 600,
            letterSpacing: `${circumference / chars.length - size * 0.095}px`,
            fill: color,
          }}
        >
          <textPath href="#rotatingTextPath">{text} · </textPath>
        </text>
      </svg>

      {/* Center star — counter-rotates slightly for visual stability */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Star size={size * 0.17} color={color} points={8} />
      </div>
    </motion.div>
  )
}
