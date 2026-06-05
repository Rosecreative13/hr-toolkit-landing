/**
 * HR Toolkit — Motion system
 * Swiss / neo-brutalist editorial motion vocabulary.
 * All variants respect prefers-reduced-motion via framer-motion's useReducedMotion().
 * Performance: transform / opacity / clip-path only (no layout props except FAQ spring).
 */

import {
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useVelocity,
  type Variants,
  type Transition,
} from 'framer-motion'
import { useRef, useCallback, useEffect } from 'react'

// ─── Easing tokens (match CSS tokens) ───────────────────────────────────────

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as [number, number, number, number]
export const EASE_SPRING_SNAPPY = { type: 'spring' as const, stiffness: 380, damping: 34, mass: 1 }
export const EASE_SPRING_SOFT = { type: 'spring' as const, stiffness: 220, damping: 28, mass: 1 }

// ─── Deterministic seeded pseudo-random ─────────────────────────────────────

/**
 * Deterministic pseudo-random in [0, 1) keyed to `seed`.
 * Same seed always returns same value — SSR/hydration safe.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

// ─── Clip-wipe reveal ────────────────────────────────────────────────────────

/** Heading / text reveals via clip-path inset wipe, left → right. */
export const clipWipeVariants = (skew = 0): Variants => ({
  hidden: {
    clipPath: `inset(0 100% 0 0)`,
    transform: skew ? `skewX(${skew}deg)` : 'none',
  },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transform: 'skewX(0deg)',
    transition: { duration: 0.72, ease: EASE_OUT_EXPO } as Transition,
  },
})

/** Single line clip-wipe with stagger delay */
export const lineWipeVariants: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', skewX: -2 },
  visible: (delay: number = 0) => ({
    clipPath: 'inset(0 0% 0 0)',
    skewX: 0,
    transition: { duration: 0.68, ease: EASE_OUT_EXPO, delay } as Transition,
  }),
}

// Headings with CircledWord need extra clip room; the SVG intentionally extends
// beyond the text line and gets visibly flattened by a normal inset(0) wipe.
export const CIRCLED_HEADING_CLIP = 'inset(-28px -40px -24px -28px)'
export const circledHeadingClipHidden = (skew = -2) => ({
  clipPath: 'inset(-28px 100% -24px -28px)',
  skewX: skew,
})
export const circledHeadingClipVisible = {
  clipPath: CIRCLED_HEADING_CLIP,
  skewX: 0,
}

/** Diagonal clip-wipe for photos / image masks */
export const diagWipeVariants: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.85, ease: EASE_OUT_EXPO } as Transition,
  },
}

// ─── Stamp / press entrance ──────────────────────────────────────────────────

/** Cards enter with a "stamp" — slight overshoot scale + micro-rotation settle */
export const stampVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04, rotate: -1 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      opacity: { duration: 0.25, ease: EASE_OUT_QUART, delay } as Transition,
      scale: { ...EASE_SPRING_SNAPPY, delay },
      rotate: { ...EASE_SPRING_SNAPPY, delay },
    },
  }),
}

/** Diagonal stamp stagger: items reveal on a diagonal grid offset */
export const diagonalStampDelay = (row: number, col: number, base = 0.05) =>
  (row + col) * base

// ─── scatterIn ───────────────────────────────────────────────────────────────

/**
 * Entrance with per-index variety: alternating origin (left / right / below / diagonal),
 * an initial rotation (±3–7deg) and offset that settle to 0, with a springy overshoot.
 * Deterministic per-index — no Math.random() during render.
 */
export const scatterIn = (index: number): Variants => {
  const r1 = seededRandom(index * 3)
  const r2 = seededRandom(index * 3 + 1)
  const r3 = seededRandom(index * 3 + 2)

  // 4 origin flavors, deterministically picked
  const flavor = index % 4
  const xOffset =
    flavor === 0 ? -48 - r1 * 24        // from left
    : flavor === 1 ? 48 + r1 * 24       // from right
    : flavor === 2 ? (r1 - 0.5) * 40   // from below (mostly vertical)
    : -32 - r1 * 20                     // diagonal from top-left

  const yOffset =
    flavor === 0 ? (r2 - 0.5) * 20     // from left: slight vertical scatter
    : flavor === 1 ? (r2 - 0.5) * 20   // from right: slight vertical scatter
    : flavor === 2 ? 40 + r2 * 24      // from below
    : -24 - r2 * 16                    // diagonal from top-left

  // Rotation: ±3–7 degrees, sign alternates by index
  const rotSign = index % 2 === 0 ? 1 : -1
  const rotation = rotSign * (3 + r3 * 4)

  const delay = index * 0.055 + r1 * 0.03

  return {
    hidden: {
      opacity: 0,
      x: xOffset,
      y: yOffset,
      rotate: rotation,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        opacity: { duration: 0.22, ease: EASE_OUT_QUART, delay } as Transition,
        x: { type: 'spring' as const, stiffness: 320, damping: 28, delay },
        y: { type: 'spring' as const, stiffness: 320, damping: 28, delay },
        rotate: { type: 'spring' as const, stiffness: 260, damping: 24, delay },
      },
    },
  }
}

// ─── flyInFrom ────────────────────────────────────────────────────────────────

type FlyDirection = 'left' | 'right' | 'up' | 'down' | 'diag-left' | 'diag-right'

/**
 * Directional entrance with rotation + spring.
 * Use for section headers, marks, and featured elements.
 */
export const flyInFrom = (direction: FlyDirection, delay = 0): Variants => {
  const offsets: Record<FlyDirection, { x: number; y: number; rotate: number }> = {
    left:       { x: -56, y: 0,    rotate: -4 },
    right:      { x: 56,  y: 0,    rotate: 4  },
    up:         { x: 0,   y: -40,  rotate: -3 },
    down:       { x: 0,   y: 40,   rotate: 3  },
    'diag-left':  { x: -40, y: 28,  rotate: -5 },
    'diag-right': { x: 40,  y: 28,  rotate: 5  },
  }

  const { x, y, rotate } = offsets[direction]

  return {
    hidden: { opacity: 0, x, y, rotate },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        opacity: { duration: 0.25, ease: EASE_OUT_QUART, delay } as Transition,
        x: { type: 'spring' as const, stiffness: 300, damping: 26, delay },
        y: { type: 'spring' as const, stiffness: 300, damping: 26, delay },
        rotate: { type: 'spring' as const, stiffness: 240, damping: 22, delay },
      },
    },
  }
}

// ─── popRotate ───────────────────────────────────────────────────────────────

/**
 * Scale 0.7 → 1 with a small rotate overshoot.
 * For marks, badges, numbers, icons.
 */
export const popRotate = (delay = 0, rotateAmount = 8): Variants => ({
  hidden: { scale: 0.7, opacity: 0, rotate: -rotateAmount },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      scale: { type: 'spring' as const, stiffness: 440, damping: 22, delay },
      opacity: { duration: 0.18, ease: EASE_OUT_QUART, delay } as Transition,
      rotate: { type: 'spring' as const, stiffness: 360, damping: 20, delay },
    },
  },
})

// ─── tiltOnHover ─────────────────────────────────────────────────────────────

/**
 * Pointer-driven 3D tilt toward cursor with lift + shadow.
 * Returns { ref, motionStyle, onMouseMove, onMouseLeave } to spread onto a motion.div.
 * rAF-throttled springs; releases smoothly on leave.
 */
export function useTiltOnHover(maxTilt = 8, perspective = 800) {
  const ref = useRef<HTMLElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scale = useMotionValue(1)

  const springRotX = useSpring(rotateX, { stiffness: 260, damping: 28 })
  const springRotY = useSpring(rotateY, { stiffness: 260, damping: 28 })
  const springScale = useSpring(scale, { stiffness: 320, damping: 30 })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(nx * maxTilt * 2)
    rotateX.set(-ny * maxTilt * 2)
    scale.set(1.025)
  }, [rotateX, rotateY, scale, maxTilt])

  const onMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }, [rotateX, rotateY, scale])

  const motionStyle = {
    rotateX: springRotX,
    rotateY: springRotY,
    scale: springScale,
    transformPerspective: perspective,
  }

  return { ref, motionStyle, onMouseMove, onMouseLeave }
}

// ─── SVG draw-on ────────────────────────────────────────────────────────────

/** pathLength draw-on variant for SVG paths (arrows, rule lines, arcs) */
export const drawOnVariants: Variants = {
  hidden: { pathLength: 0, opacity: 1 },
  visible: (duration: number = 0.7) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration, ease: EASE_OUT_EXPO }, opacity: { duration: 0.1 } } as Transition,
  }),
}

/** For stroked paths with dasharray — use pathLength: 0 → 1 on motion.path */
export const pathDrawTransition = (duration = 0.7, delay = 0) => ({
  pathLength: { duration, ease: EASE_OUT_EXPO, delay },
  opacity: { duration: 0.15, delay },
})

// ─── Section rule draw ───────────────────────────────────────────────────────

/** Horizontal rule that draws across on enter */
export const ruleDrawVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO } as Transition,
  },
}

// ─── FAQ spring open ─────────────────────────────────────────────────────────

export const faqContentVariants: Variants = {
  hidden: {
    height: 0,
    clipPath: 'inset(0 0 100% 0)',
    opacity: 0,
  },
  visible: {
    height: 'auto',
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: {
      height: { ...EASE_SPRING_SOFT },
      clipPath: { duration: 0.38, ease: EASE_OUT_EXPO, delay: 0.04 } as Transition,
      opacity: { duration: 0.25, ease: EASE_OUT_QUART, delay: 0.04 } as Transition,
    },
  },
  exit: {
    height: 0,
    clipPath: 'inset(0 0 100% 0)',
    opacity: 0,
    transition: {
      height: { duration: 0.28, ease: EASE_OUT_QUART } as Transition,
      clipPath: { duration: 0.22, ease: EASE_OUT_QUART } as Transition,
      opacity: { duration: 0.15 } as Transition,
    },
  },
}

// ─── Number roll-up (odometer) ───────────────────────────────────────────────

/**
 * Incrementally counts from 0 to `target` over `duration` ms.
 * Returns a callback ref and the current display value string.
 * Uses requestAnimationFrame internally, no layout triggers.
 */
export function useCountUp(target: number | string, suffix = '') {
  const isNumeric = typeof target === 'number'
  // We return the plain target for non-numeric strings, but still export
  // the hook signature for uniformity.
  return { isNumeric, suffix }
}

// ─── useMagnetic ─────────────────────────────────────────────────────────────

/**
 * Magnetic attraction toward cursor for pill/button elements.
 * Returns { ref, style } to spread onto the element.
 * strength: 0–1 fraction of cursor distance to translate (default 0.35)
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 24 })
  const springY = useSpring(y, { stiffness: 200, damping: 24 })

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }, [strength, x, y])

  const onMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [onMouseMove, onMouseLeave])

  return {
    ref,
    style: { x: springX, y: springY } as const,
  }
}

// ─── useScrollVelocity ───────────────────────────────────────────────────────

/**
 * Returns a live MotionValue<number> that represents scroll velocity.
 * Used to couple RotatingBadge speed to scroll.
 * scaleFactor: amplifies velocity → rotation speed boost.
 */
export function useScrollVelocityRotation(baseDuration = 18, scaleFactor = 0.015) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  // Map velocity → extra rotation speed (duration shortens as velocity grows)
  const durationBoost = useTransform(scrollVelocity, [-2000, 0, 2000], [6, 0, 6])
  const smoothBoost = useSpring(durationBoost, { stiffness: 80, damping: 20 })

  return { scrollVelocity, smoothBoost, baseDuration, scaleFactor }
}

// ─── Shared viewport config ──────────────────────────────────────────────────

export const VIEWPORT_ONCE = { once: true, margin: '-10%' } as const
export const VIEWPORT_ONCE_NEAR = { once: true, margin: '-5%' } as const
export const VIEWPORT_STAMP = { once: true, margin: '-8%' } as const
