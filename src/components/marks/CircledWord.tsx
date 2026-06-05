import React, { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface CircledWordProps {
  children: React.ReactNode
  color?: string
  strokeWidth?: number
  inView?: boolean
}

/**
 * Wraps its text child with a rough hand-drawn magenta ellipse SVG.
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
    const measure = () => {
      if (!spanRef.current) return
      const rect = spanRef.current.getBoundingClientRect()
      if (rect.width > 0) {
        setDims({ w: rect.width, h: rect.height })
      }
    }

    measure()
    // Re-measure after fonts load
    const id = setTimeout(measure, 400)
    return () => clearTimeout(id)
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
      style={{
        position: 'relative',
        display: 'inline',
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
      <style>{`
        @keyframes circleDrawOn {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          path[data-circle] { animation: none !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>
      {children}
    </span>
  )
}
