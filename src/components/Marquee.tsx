import { useRef, useReducer } from 'react'
import { useReducedMotion } from 'framer-motion'

interface MarqueeProps {
  items: string[]
  separator?: string
  speed?: number // px per second
  className?: string
  style?: React.CSSProperties
}

/**
 * Seamless horizontal marquee. Pauses on hover.
 * Uses CSS animation (no layout triggers). Respects reduced-motion.
 */
export default function Marquee({
  items,
  separator = ' · ',
  speed = 60,
  className,
  style,
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion()
  const contentRef = useRef<HTMLSpanElement>(null)
  const [paused, setPaused] = useReducer((s: boolean) => !s, false)

  // Build a string that repeats for seamless loop
  const full = items.join(separator) + separator
  // Double it so the second copy starts right after the first
  const doubled = full + full

  if (prefersReducedMotion) {
    // Static, wrapped layout for reduced-motion
    return (
      <span
        style={{
          display: 'block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          ...style,
        }}
        className={className}
      >
        {full}
      </span>
    )
  }

  // Width of one copy (we can't measure at this point, so we animate from 0 to -50%)
  // The doubled string has 2 copies → translate -50% scrolls exactly 1 copy width
  const duration = `${(full.length * 10) / speed}s`

  return (
    <span
      style={{ display: 'block', overflow: 'hidden', ...style }}
      className={className}
      onMouseEnter={() => !paused && setPaused()}
      onMouseLeave={() => paused && setPaused()}
    >
      <span
        ref={contentRef}
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          animation: `marqueeScroll ${duration} linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {doubled}
      </span>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes marqueeScroll { from { transform: none; } to { transform: none; } }
        }
      `}</style>
    </span>
  )
}
