import React from 'react'
import { motion, useReducedMotion, type Transition } from 'framer-motion'

interface BlobProps {
  size?: number
  color?: string
  /** Slight slow float animation */
  float?: boolean
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

/**
 * Soft pastel circle/blob — sits behind illustrated characters.
 * Uses the --ill-* palette tokens.
 */
export default function Blob({
  size = 280,
  color = 'var(--ill-teal-pale)',
  float = false,
  style,
  className,
  children,
}: BlobProps) {
  const prefersReducedMotion = useReducedMotion()
  const shouldFloat = float && !prefersReducedMotion

  const floatTransition: Transition = {
    repeat: Infinity,
    repeatType: 'mirror' as const,
    duration: 4.5,
    ease: 'easeInOut' as const,
  }

  return (
    <motion.div
      className={className}
      animate={shouldFloat ? { y: [0, -8, 0] } : {}}
      transition={shouldFloat ? floatTransition : {}}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}
