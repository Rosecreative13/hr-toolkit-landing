import React from 'react'

interface GridBgProps {
  style?: React.CSSProperties
  className?: string
}

/** Faint square-grid paper background overlay. Place as first child inside a `position:relative` container. */
export default function GridBg({ style, className }: GridBgProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(var(--color-grid-line) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    />
  )
}
