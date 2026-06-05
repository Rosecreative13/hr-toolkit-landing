import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Direction = 'right' | 'left' | 'down-right' | 'down-left' | 'up-right'

interface ArrowProps {
  direction?: Direction
  length?: number
  color?: string
  strokeWidth?: number
  style?: React.CSSProperties
  className?: string
  /** If true, the arrow shaft draws on via pathLength animation */
  drawOn?: boolean
  drawDelay?: number
  drawDuration?: number
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

/** Long thin directional arrow — charcoal by default. Used as connectors and compositional accents. */
export default function Arrow({
  direction = 'right',
  length = 60,
  color = 'var(--color-ink)',
  strokeWidth = 1.5,
  style,
  className,
  drawOn = false,
  drawDelay = 0,
  drawDuration = 0.55,
}: ArrowProps) {
  const prefersReducedMotion = useReducedMotion()
  const shouldDraw = drawOn && !prefersReducedMotion
  const head = 8

  const drawProps = shouldDraw ? {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: '-10%' },
    transition: {
      pathLength: { duration: drawDuration, ease: EASE_OUT_EXPO, delay: drawDelay },
      opacity: { duration: 0.1, delay: drawDelay },
    },
  } : {}

  const LineEl = shouldDraw ? motion.line : 'line'
  const PolyEl = shouldDraw ? motion.polyline : 'polyline'

  if (direction === 'right') {
    const w = length
    const h = head * 2 + 4
    const my = h / 2
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true" style={style} className={className}>
        <LineEl x1="0" y1={my} x2={w - head} y2={my} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" {...drawProps} />
        <PolyEl points={`${w - head - 1},${my - head} ${w},${my} ${w - head - 1},${my + head}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
          {...(shouldDraw ? { ...drawProps, transition: { ...drawProps.transition, pathLength: { ...drawProps.transition?.pathLength, delay: drawDelay + drawDuration * 0.6 } } } : {})}
        />
      </svg>
    )
  }

  if (direction === 'left') {
    const w = length
    const h = head * 2 + 4
    const my = h / 2
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true" style={style} className={className}>
        <LineEl x1={w} y1={my} x2={head} y2={my} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" {...drawProps} />
        <PolyEl points={`${head + 1},${my - head} 0,${my} ${head + 1},${my + head}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...drawProps} />
      </svg>
    )
  }

  if (direction === 'down-right') {
    const d = length
    return (
      <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} fill="none" aria-hidden="true" style={style} className={className}>
        <LineEl x1="0" y1="0" x2={d - head} y2={d - head} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" {...drawProps} />
        <PolyEl points={`${d - head * 1.5},${d} ${d},${d} ${d},${d - head * 1.5}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...drawProps} />
      </svg>
    )
  }

  if (direction === 'down-left') {
    const d = length
    return (
      <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} fill="none" aria-hidden="true" style={style} className={className}>
        <LineEl x1={d} y1="0" x2={head} y2={d - head} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" {...drawProps} />
        <PolyEl points={`0,${d - head * 1.5} 0,${d} ${head * 1.5},${d}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...drawProps} />
      </svg>
    )
  }

  if (direction === 'up-right') {
    const d = length
    return (
      <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} fill="none" aria-hidden="true" style={style} className={className}>
        <LineEl x1="0" y1={d} x2={d - head} y2={head} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" {...drawProps} />
        <PolyEl points={`${d - head * 1.5},0 ${d},0 ${d},${head * 1.5}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...drawProps} />
      </svg>
    )
  }

  return null
}
