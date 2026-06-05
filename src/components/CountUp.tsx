import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface CountUpProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  /** Trigger the count when this becomes true */
  inView: boolean
}

/**
 * Odometer-style number roll-up.
 * Uses requestAnimationFrame — no layout triggers.
 * Falls back to static number on reduced-motion.
 */
export default function CountUp({
  target,
  suffix = '',
  prefix = '',
  duration = 900,
  inView,
}: CountUpProps) {
  const prefersReducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)
  const rafId = useRef<number | null>(null)
  const startTime = useRef<number | null>(null)
  const fired = useRef(false)

  useEffect(() => {
    if (!inView || fired.current || prefersReducedMotion) {
      if (prefersReducedMotion) setDisplay(target)
      return
    }
    fired.current = true

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out-quart
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.round(eased * target))
      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate)
      }
    }
    rafId.current = requestAnimationFrame(animate)
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current) }
  }, [inView, target, duration, prefersReducedMotion])

  return <>{prefix}{display}{suffix}</>
}
