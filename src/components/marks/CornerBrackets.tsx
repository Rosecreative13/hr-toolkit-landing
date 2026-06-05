import React, { useId } from 'react'

interface CornerBracketsProps {
  size?: number
  thickness?: number
  color?: string
  style?: React.CSSProperties
  inset?: number
  /** Responsive size on ≤768px viewports. Defaults to ~70% of `size`. */
  mobileSize?: number
  /** Responsive inset on ≤768px viewports. Defaults to `inset + 32` so brackets clear sticky header / page edges. */
  mobileInset?: number
}

/** Thin charcoal L-shaped corner frames. Place inside `position:relative` parent with `overflow:visible`. */
export default function CornerBrackets({
  size = 28,
  thickness = 1.5,
  color = 'var(--color-ink)',
  style,
  inset = 0,
  mobileSize,
  mobileInset,
}: CornerBracketsProps) {
  const uid = useId().replace(/:/g, '')
  const wrapClass = `cb-${uid}`

  const mSize = mobileSize ?? Math.round(size * 0.7)
  const mInset = mobileInset ?? inset + 32

  const corners = [
    { pos: { top: inset, left: inset }, mPos: { top: mInset, left: mInset }, rot: 0 },
    { pos: { top: inset, right: inset }, mPos: { top: mInset, right: mInset }, rot: 90 },
    { pos: { bottom: inset, right: inset }, mPos: { bottom: mInset, right: mInset }, rot: 180 },
    { pos: { bottom: inset, left: inset }, mPos: { bottom: mInset, left: mInset }, rot: 270 },
  ]

  const LBracket = ({ rotation }: { rotation: number }) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rotation}deg)`, display: 'block' }}
    >
      <path
        d={`M 2 ${28 - 2} L 2 2 L ${28 - 2} 2`}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="square"
        fill="none"
      />
    </svg>
  )

  return (
    <>
      {corners.map((corner, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`${wrapClass} cb-corner cb-corner-${i}`}
          style={{
            position: 'absolute',
            ...corner.pos,
            width: size,
            height: size,
            pointerEvents: 'none',
            zIndex: 2,
            ...style,
          }}
        >
          <LBracket rotation={corner.rot} />
        </div>
      ))}
      <style>{`
        @media (max-width: 768px) {
          .${wrapClass}.cb-corner { width: ${mSize}px; height: ${mSize}px; }
          .${wrapClass}.cb-corner-0 { top: ${mInset}px !important; left: ${mInset}px !important; right: auto !important; bottom: auto !important; }
          .${wrapClass}.cb-corner-1 { top: ${mInset}px !important; right: ${mInset}px !important; left: auto !important; bottom: auto !important; }
          .${wrapClass}.cb-corner-2 { bottom: ${mInset}px !important; right: ${mInset}px !important; top: auto !important; left: auto !important; }
          .${wrapClass}.cb-corner-3 { bottom: ${mInset}px !important; left: ${mInset}px !important; top: auto !important; right: auto !important; }
        }
      `}</style>
    </>
  )
}
