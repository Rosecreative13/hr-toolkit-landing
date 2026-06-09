import React, { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface CircledWordProps {
  children: React.ReactNode
  color?: string
  strokeWidth?: number
  inView?: boolean
}

/**
 * Wraps its text child with a rough hand-drawn cobalt ellipse SVG.
 * Pass `inView={true}` to trigger the draw-on animation when the section enters view.
 */
export default function CircledWord({
  children,
  color = 'var(--color-magenta)',
  strokeWidth = 2.5,
  inView = true,
}: CircledWordProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const [dims, setDims] = useState({ w: 120, h: 32 })
  const prefersReducedMotion = useReducedMotion()
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return

    let raf = 0
    const measure = () => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.width > 0) {
        setDims((prev) =>
          Math.abs(prev.w - rect.width) > 0.5 || Math.abs(prev.h - rect.height) > 0.5
            ? { w: rect.width, h: rect.height }
            : prev
        )
      }
    }

    // Measure now + on the next two frames (after layout settles)
    measure()
    raf = requestAnimationFrame(() => requestAnimationFrame(measure))

    // Re-measure once web fonts have loaded (display font on mobile loads late)
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(measure).catch(() => {})
    }

    // Re-measure on any size change: viewport resize, orientation, line re-wrap,
    // or the mobile `display:block` override kicking in.
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [children])

  useEffect(() => {
    if (!inView) return
    const el = spanRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView])

  const padX = 12
  const padY = 7
  const svgW = dims.w + padX * 2
  const svgH = dims.h + padY * 2

  const rx = svgW / 2
  const ry = svgH / 2
  const cx = svgW / 2
  const cy = svgH / 2

  // Slightly offset control points for hand-drawn feel
  const ellipsePath = [
    `M ${(cx - rx + 4).toFixed(1)} ${cy.toFixed(1)}`,
    `C ${(cx - rx + 2).toFixed(1)} ${(cy - ry + 2).toFixed(1)}, ${(cx - 4).toFixed(1)} ${(cy - ry - 2).toFixed(1)}, ${(cx + 6).toFixed(1)} ${(cy - ry + 1).toFixed(1)}`,
    `C ${(cx + rx - 4).toFixed(1)} ${(cy - ry + 3).toFixed(1)}, ${(cx + rx + 2).toFixed(1)} ${(cy - 4).toFixed(1)}, ${(cx + rx - 2).toFixed(1)} ${(cy + 4).toFixed(1)}`,
    `C ${(cx + rx).toFixed(1)} ${(cy + ry - 2).toFixed(1)}, ${(cx + 6).toFixed(1)} ${(cy + ry + 2).toFixed(1)}, ${(cx - 4).toFixed(1)} ${(cy + ry - 1).toFixed(1)}`,
    `C ${(cx - rx + 2).toFixed(1)} ${(cy + ry - 1).toFixed(1)}, ${(cx - rx - 2).toFixed(1)} ${(cy + 4).toFixed(1)}, ${(cx - rx + 4).toFixed(1)} ${cy.toFixed(1)}`,
  ].join(' ')

  const shouldAnimate = triggered && !prefersReducedMotion

  return (
    <span
      ref={spanRef}
      className="circled-word"
      style={{
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
      }}
    >
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -padY,
          left: -padX,
          width: svgW,
          height: svgH,
          overflow: 'visible',
          pointerEvents: 'none',
        }}
        viewBox={`0 0 ${svgW} ${svgH}`}
      >
        <path
          data-circle
          d={ellipsePath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={shouldAnimate ? {
            strokeDasharray: '2000',
            strokeDashoffset: '2000',
            animation: 'circleDrawOn 0.85s cubic-bezier(0.16,1,0.3,1) 0.15s forwards',
          } : prefersReducedMotion ? {
            strokeDasharray: 'none',
            strokeDashoffset: 0,
          } : {
            strokeDasharray: '2000',
            strokeDashoffset: '2000',
          }}
        />
      </svg>
      {children}
    </span>
  )
}
