import React from 'react'

interface DotTripletProps {
  color?: string
  size?: number
  style?: React.CSSProperties
}

/** Three magenta dots (•••) inline accent mark. */
export default function DotTriplet({
  color = 'var(--color-magenta)',
  size = 6,
  style,
}: DotTripletProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        gap: size * 0.7,
        alignItems: 'center',
        verticalAlign: 'middle',
        ...style,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: size,
            height: size,
            borderRadius: '50%',
            background: color,
            flexShrink: 0,
          }}
        />
      ))}
    </span>
  )
}
