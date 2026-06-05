import React from 'react'

interface CornerBracketsProps {
  size?: number
  thickness?: number
  color?: string
  style?: React.CSSProperties
  inset?: number
}

/** Thin charcoal L-shaped corner frames. Place inside `position:relative` parent with `overflow:visible`. */
export default function CornerBrackets({
  size = 28,
  thickness = 1.5,
  color = 'var(--color-ink)',
  style,
  inset = 0,
}: CornerBracketsProps) {
  const corners = [
    // top-left
    { top: inset, left: inset, rot: 0 },
    // top-right
    { top: inset, right: inset, rot: 90 },
    // bottom-right
    { bottom: inset, right: inset, rot: 180 },
    // bottom-left
    { bottom: inset, left: inset, rot: 270 },
  ]

  const LBracket = ({ rotation }: { rotation: number }) => (
    <svg
      width={size}
      height={size}
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
          style={{
            position: 'absolute',
            ...corner,
            pointerEvents: 'none',
            zIndex: 2,
            ...style,
          }}
        >
          <LBracket rotation={corner.rot} />
        </div>
      ))}
    </>
  )
}
