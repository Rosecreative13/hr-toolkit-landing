import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface DotGridProps {
  cols?: number
  rows?: number
  gap?: number
  dotR?: number
  color?: string
  style?: React.CSSProperties
  className?: string
  /** If true, dots animate in with a diagonal ripple stagger on viewport enter */
  animate?: boolean
}

/** Grid of small dots — corner decoration and section accent. */
export default function DotGrid({
  cols = 4,
  rows = 4,
  gap = 10,
  dotR = 2,
  color = 'var(--color-magenta)',
  style,
  className,
  animate = false,
}: DotGridProps) {
  const prefersReducedMotion = useReducedMotion()
  const w = (cols - 1) * gap + dotR * 2
  const h = (rows - 1) * gap + dotR * 2
  const dots: React.ReactNode[] = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // diagonal stagger index
      const diagDelay = animate && !prefersReducedMotion ? (r + c) * 0.04 : 0
      dots.push(
        animate && !prefersReducedMotion ? (
          <motion.circle
            key={`${r}-${c}`}
            cx={dotR + c * gap}
            cy={dotR + r * gap}
            r={dotR}
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.45, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              delay: diagDelay,
              duration: 0.35,
              ease: [0.25, 1, 0.5, 1],
            }}
          />
        ) : (
          <circle
            key={`${r}-${c}`}
            cx={dotR + c * gap}
            cy={dotR + r * gap}
            r={dotR}
            fill={color}
            opacity="0.45"
          />
        )
      )
    }
  }

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      style={style}
      className={className}
    >
      {dots}
    </svg>
  )
}
