import React from 'react'
import { motion, useReducedMotion, type Transition } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GridBg from './marks/GridBg'
import Arrow from './marks/Arrow'
import DotGrid from './marks/DotGrid'
import { flyInFrom, VIEWPORT_ONCE } from '../lib/motion'
import {
  Blob,
  PersonAtLaptop,
  TwoPeopleTalking,
  PersonAtWhiteboard,
  PersonWithChecklist,
  GroupWorkshop,
  PersonReviewingChart,
} from './illustrations'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

type Step = { number: number; title: string; description: string }

/** Illustration component per step */
const STEP_ILLUSTRATIONS = [
  PersonAtLaptop,
  TwoPeopleTalking,
  PersonAtWhiteboard,
  PersonWithChecklist,
  GroupWorkshop,
  PersonReviewingChart,
] as const

/** Blob color per step — alternating teal / navy pale */
const BLOB_COLORS = [
  'var(--ill-teal-pale)',
  'var(--ill-navy-pale)',
  'var(--ill-teal-pale)',
  'var(--ill-navy-pale)',
  'var(--ill-teal-pale)',
  'var(--ill-navy-pale)',
] as const

/** Blob border colors */
const BLOB_BORDERS = [
  'var(--ill-teal)',
  'var(--ill-navy)',
  'var(--ill-teal)',
  'var(--ill-navy)',
  'var(--ill-teal)',
  'var(--ill-navy)',
] as const

/** Fly directions per step — Z-flow: top row L→R, bottom row R→L */
const FLY_DIRS: Array<'up' | 'diag-left' | 'right' | 'left' | 'diag-right' | 'down'> = [
  'up', 'diag-left', 'right',
  'left', 'diag-right', 'down',
]

/** Amber squiggle near section heading */
function AmberSquiggle({ style }: { style?: React.CSSProperties }) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <svg width="80" height="20" viewBox="0 0 80 20" fill="none" aria-hidden="true" style={style}>
      {prefersReducedMotion ? (
        <path d="M2 10 Q12 2 22 10 Q32 18 42 10 Q52 2 62 10 Q72 18 78 10" stroke="var(--ill-amber)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      ) : (
        <motion.path
          d="M2 10 Q12 2 22 10 Q32 18 42 10 Q52 2 62 10 Q72 18 78 10"
          stroke="var(--ill-amber)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ pathLength: { duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.35 }, opacity: { duration: 0.1, delay: 0.35 } } as Transition}
        />
      )}
    </svg>
  )
}

/** Step circle: pale blob + illustration + teal number badge */
function StepCircle({
  step,
  delay,
  blobColor,
  blobBorder,
  flyDir,
}: {
  step: Step
  delay: number
  blobColor: string
  blobBorder: string
  flyDir: 'up' | 'diag-left' | 'right' | 'left' | 'diag-right' | 'down'
}) {
  const prefersReducedMotion = useReducedMotion()
  const IllComp = STEP_ILLUSTRATIONS[step.number - 1]
  const isEven = step.number % 2 === 0

  return (
    <motion.div
      variants={flyInFrom(flyDir, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
        textAlign: 'center',
        cursor: 'default',
        position: 'relative',
      }}
    >
      {/* Blob + illustration + floating badge */}
      <motion.div
        style={{ position: 'relative' }}
        whileHover={prefersReducedMotion ? {} : {
          y: -5,
          transition: { type: 'spring' as const, stiffness: 360, damping: 26 },
        }}
      >
        <Blob
          size={148}
          color={blobColor}
          float={!prefersReducedMotion}
          style={{
            border: `1.5px solid ${blobBorder}`,
            borderRadius: '50%',
          }}
        >
          <IllComp size={92} />
        </Blob>

        {/* Teal number badge — top-left of blob */}
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0, rotate: -15, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{
            type: 'spring' as const,
            stiffness: 440,
            damping: 20,
            delay: delay + 0.14,
          }}
          style={{
            position: 'absolute',
            top: isEven ? 'auto' : -8,
            bottom: isEven ? -8 : 'auto',
            left: isEven ? 'auto' : -8,
            right: isEven ? -8 : 'auto',
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'var(--ill-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 0 3px var(--color-paper)',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: '#fff',
              lineHeight: 1,
            }}
          >
            {step.number}
          </span>
        </motion.div>
      </motion.div>

      {/* Title */}
      <div style={{ maxWidth: '16ch' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
            color: 'var(--color-ink)',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }}
        >
          {step.title}
        </h3>
        {/* Teal underline accent */}
        <motion.div
          initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0.5' }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: delay + 0.18 }}
          style={{
            width: 24,
            height: 2,
            background: 'var(--ill-teal)',
            margin: '0 auto 0.625rem',
            transformOrigin: 'center',
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--color-ink-muted)',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

/** Horizontal directional arrow connector — vertically centered on the step circle */
function RowArrow({ direction, delay }: { direction: 'right' | 'left'; delay: number }) {
  return (
    <div
      style={{
        alignSelf: 'start',
        height: 148, // = blob size, so the arrow centers on the circle
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Arrow direction={direction} length={48} color="var(--ill-navy)" strokeWidth={1.6} drawOn drawDelay={delay} />
    </div>
  )
}

export default function HowItWorks() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  const steps = [
    { number: 1, title: t('howItWorks.step1.title'), description: t('howItWorks.step1.description') },
    { number: 2, title: t('howItWorks.step2.title'), description: t('howItWorks.step2.description') },
    { number: 3, title: t('howItWorks.step3.title'), description: t('howItWorks.step3.description') },
    { number: 4, title: t('howItWorks.step4.title'), description: t('howItWorks.step4.description') },
    { number: 5, title: t('howItWorks.step5.title'), description: t('howItWorks.step5.description') },
    { number: 6, title: t('howItWorks.step6.title'), description: t('howItWorks.step6.description') },
  ]

  return (
    <section
      id="how-it-works"
      style={{
        background: 'var(--color-paper)',
        paddingTop: 'clamp(3rem, 10vw, 8rem)',
        paddingBottom: 'clamp(3rem, 10vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridBg style={{ opacity: 0.4 }} />

      {/* Teal pale wash — top-left */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '-10%',
          width: '45%',
          height: '60%',
          background: 'var(--ill-teal-pale)',
          borderRadius: '0 0 80% 0',
          opacity: 0.4,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Navy pale wash — bottom-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          right: '-8%',
          width: '40%',
          height: '50%',
          background: 'var(--ill-navy-pale)',
          borderRadius: '80% 0 0 0',
          opacity: 0.4,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <DotGrid
        cols={4}
        rows={4}
        color="var(--ill-teal)"
        animate
        style={{ position: 'absolute', bottom: 60, right: 60, zIndex: 1, opacity: 0.25 }}
      />
      <DotGrid
        cols={3}
        rows={3}
        color="var(--ill-amber)"
        animate
        style={{ position: 'absolute', top: 80, left: 60, zIndex: 1, opacity: 0.35 }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 4rem)',
        }}
      >
        {/* Section rule */}
        <motion.div
          initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '1px', background: 'var(--color-border)', marginBottom: 'clamp(3rem, 6vw, 5rem)', transformOrigin: 'left' }}
        />

        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          {/* Amber squiggle above heading */}
          <AmberSquiggle style={{ marginBottom: '0.75rem' }} />

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: 0,
              color: 'var(--color-ink)',
              marginBottom: '0.75rem',
            }}
          >
            {t('howItWorks.heading')}{' '}
            <span style={{ color: 'var(--ill-teal)' }}>{t('howItWorks.headingColored')}</span>
          </motion.h2>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <Arrow direction="right" length={48} color="var(--ill-teal)" strokeWidth={1.5} drawOn drawDelay={0.3} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-ink-faint)' }}>
              {t('howItWorks.subhead')}
            </span>
          </motion.div>
        </div>

        {/* Top row: steps 1–3 in circles — L → R flow */}
        {/* Grid: step | connector | step | connector | step */}
        <div
          className="how-z-row"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr auto 1fr',
            alignItems: 'start',
            gap: '0 clamp(0.5rem, 2vw, 2rem)',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {steps.slice(0, 3).map((step, i) => (
            <React.Fragment key={step.number}>
              <StepCircle
                step={step}
                delay={i * 0.1}
                blobColor={BLOB_COLORS[i]}
                blobBorder={BLOB_BORDERS[i]}
                flyDir={FLY_DIRS[i]}
              />
              {i < 2 && <RowArrow direction="right" delay={i * 0.1 + 0.2} />}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom row: steps 4–6 in circles — R → L flow */}
        <div
          className="how-z-row"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr auto 1fr',
            alignItems: 'start',
            gap: '0 clamp(0.5rem, 2vw, 2rem)',
          }}
        >
          {steps.slice(3).map((step, i) => (
            <React.Fragment key={step.number}>
              {i > 0 && <RowArrow direction="right" delay={0.32 + i * 0.1} />}
              <StepCircle
                step={step}
                delay={0.32 + i * 0.1}
                blobColor={BLOB_COLORS[step.number - 1]}
                blobBorder={BLOB_BORDERS[step.number - 1]}
                flyDir={FLY_DIRS[step.number - 1]}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Footer annotation */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          style={{
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1.25rem 1.5rem',
            background: 'var(--ill-teal-pale)',
            border: '1.5px solid var(--ill-teal)',
            borderRadius: 0,
          }}
        >
          {/* Teal circle with handshake icon */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--ill-teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M2 10 L5 7 L8 9 L10 7 L16 11" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 7 L7 5 L10 7" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
              color: 'var(--color-ink)',
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            {t('howItWorks.footer')}
          </p>
          <Arrow direction="right" length={36} color="var(--ill-teal)" strokeWidth={1.5} style={{ flexShrink: 0, marginLeft: 'auto' }} />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .how-z-row {
            grid-template-columns: 1fr !important;
          }
          .how-z-row > :nth-child(even) {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
