import React from 'react'
import { motion, useReducedMotion, type Transition } from 'framer-motion'

interface StarProps {
  size?: number
  color?: string
  points?: number
  style?: React.CSSProperties
  className?: string
  /** 'spin' — slow idle rotation; 'twinkle' — scale pulse; 'none' */
  idle?: 'spin' | 'twinkle' | 'none'
  /** If true, enter with a scale-pop */
  popIn?: boolean
  popDelay?: number
}

/** Spiky star/asterisk burst mark. Used as accent near headings and as bullets. */
export default function Star({
  size = 24,
  color = 'var(--color-magenta)',
  points = 8,
  style,
  className,
  idle = 'none',
  popIn = false,
  popDelay = 0,
}: StarProps) {
  const prefersReducedMotion = useReducedMotion()
  const cx = size / 2
  const cy = size / 2
  const outerR = size / 2
  const innerR = size * 0.2

  const pathParts: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI / points) * i - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    pathParts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  pathParts.push('Z')
  const d = pathParts.join(' ')

  // Idle animation props
  const idleAnimate = prefersReducedMotion ? {} :
    idle === 'spin'
      ? { rotate: 360 }
      : idle === 'twinkle'
        ? { scale: [1, 1.18, 1, 0.92, 1] }
        : {}

  const idleTransition: Transition =
    idle === 'spin'
      ? { repeat: Infinity, duration: 14, ease: 'linear' as const }
      : idle === 'twinkle'
        ? { repeat: Infinity, duration: 3.2, ease: 'easeInOut' as const, repeatDelay: 1.5 }
        : {}

  const popProps = popIn && !prefersReducedMotion ? {
    initial: { scale: 0, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, margin: '-10%' },
    transition: {
      scale: { type: 'spring' as const, stiffness: 420, damping: 22, delay: popDelay },
      opacity: { duration: 0.15, delay: popDelay },
    },
  } : {}

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={color}
      aria-hidden="true"
      style={style}
      className={className}
      animate={idleAnimate}
      transition={idle !== 'none' ? idleTransition : undefined}
      {...popProps}
    >
      <path d={d} />
    </motion.svg>
  )
}
