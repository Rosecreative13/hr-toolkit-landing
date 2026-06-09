import React from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GridBg from './marks/GridBg'
import Star from './marks/Star'
import Arrow from './marks/Arrow'
import CircledWord from './marks/CircledWord'
import DotGrid from './marks/DotGrid'
import CountUp from './CountUp'
import { VIEWPORT_ONCE, circledHeadingClipHidden, circledHeadingClipVisible, flyInFrom, popRotate } from '../lib/motion'
import { Blob, MentoringPair, TwoPeopleTalking } from './illustrations'
import type { Transition } from 'framer-motion'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

function StatBlock({
  stat,
  i,
  isLast,
}: {
  stat: { num: string; label: string; sub: string; numericVal?: number; suffix?: string }
  i: number
  isLast: boolean
}) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const directions = (['up', 'down', 'up'] as const)
  const flyDir = directions[i % directions.length]

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: flyDir === 'up' ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: i * 0.12 }}
      style={{
        borderRight: !isLast ? '1.5px solid var(--color-border)' : 'none',
        padding: '2rem 2rem 2rem 0',
        paddingLeft: i === 0 ? 0 : '2rem',
      }}
    >
      <motion.div
        initial={prefersReducedMotion ? {} : { scale: 0.65, opacity: 0, rotate: i % 2 === 0 ? -6 : 6 }}
        animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
        transition={{
          type: 'spring' as const,
          stiffness: 400,
          damping: 18,
          delay: i * 0.12 + 0.18,
        }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          color: 'var(--color-magenta)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          marginBottom: '0.375rem',
          display: 'inline-block',
        }}
      >
        {stat.numericVal !== undefined ? (
          <CountUp target={stat.numericVal} suffix={stat.suffix ?? ''} inView={inView} duration={900} />
        ) : (
          stat.num
        )}
      </motion.div>
      <motion.div
        initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: i * 0.12 + 0.3 }}
        style={{
          width: 24,
          height: 2,
          background: 'var(--color-magenta)',
          marginBottom: '0.5rem',
          transformOrigin: 'left',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '0.9375rem',
          color: 'var(--color-ink)',
          marginBottom: '0.2rem',
        }}
      >
        {stat.label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          color: 'var(--color-ink-faint)',
          lineHeight: 1.5,
        }}
      >
        {stat.sub}
      </div>
    </motion.div>
  )
}

const TOPIC_CHIPS_KEYS = ['why.topicRecruitment', 'why.topicOnboarding', 'why.topicRetention']

/** Amber hand-drawn squiggle SVG */
function AmberSquiggle({ style }: { style?: React.CSSProperties }) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <svg width="72" height="18" viewBox="0 0 72 18" fill="none" aria-hidden="true" style={style}>
      {prefersReducedMotion ? (
        <path d="M2 9 Q10 2 18 9 Q26 16 34 9 Q42 2 50 9 Q58 16 70 9" stroke="var(--ill-amber)" strokeWidth="2" strokeLinecap="round" fill="none" />
      ) : (
        <motion.path
          d="M2 9 Q10 2 18 9 Q26 16 34 9 Q42 2 50 9 Q58 16 70 9"
          stroke="var(--ill-amber)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ pathLength: { duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3 }, opacity: { duration: 0.1, delay: 0.3 } } as Transition}
        />
      )}
    </svg>
  )
}

/** Amber sparkle burst mark */
function Sparkle({ size = 10, style }: { size?: number; style?: React.CSSProperties }) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={style}
      animate={prefersReducedMotion ? {} : { scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' as const, repeatDelay: 0.8 }}
    >
      <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5Z" fill="var(--ill-amber)" />
    </motion.svg>
  )
}

/** Soft blob divider between Swiss hero above and illustrated Why section */
function IllustrationBlobDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        pointerEvents: 'none',
        zIndex: 3,
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%"
        height="56"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 0 L1440 0 L1440 40 Q1080 56 720 44 Q360 32 0 56Z"
          fill="var(--ill-teal-pale)"
          opacity="0.55"
        />
      </svg>
    </div>
  )
}

export default function Why() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  const stats = [
    { num: t('why.stat1.num'), label: t('why.stat1.label'), sub: t('why.stat1.sub'), numericVal: 50 },
    { num: t('why.stat2.num'), label: t('why.stat2.label'), sub: t('why.stat2.sub'), numericVal: 6 },
    { num: t('why.stat3.num'), label: t('why.stat3.label'), sub: t('why.stat3.sub'), suffix: '%', numericVal: 100 },
  ]

  return (
    <section
      id="why"
      style={{
        background: 'var(--color-paper)',
        paddingTop: 'clamp(2.5rem, 6vw, 5rem)',
        paddingBottom: 'clamp(2.5rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridBg style={{ opacity: 0.4 }} />
      <IllustrationBlobDivider />

      {/* Illustration palette DotGrid — teal, top right */}
      <motion.div
        style={{ position: 'absolute', top: 48, right: 48, zIndex: 1 }}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={flyInFrom('right', 0.15)}
      >
        <DotGrid
          cols={5}
          rows={5}
          color="var(--ill-teal)"
          animate
          style={{ opacity: 0.45 }}
        />
      </motion.div>

      {/* Amber sparkle cluster — top left corner */}
      <motion.div
        style={{ position: 'absolute', top: 72, left: 32, zIndex: 1 }}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={flyInFrom('left', 0.2)}
      >
        <Sparkle size={10} style={{ position: 'absolute', top: 0, left: 0 }} />
        <Sparkle size={7} style={{ position: 'absolute', top: 18, left: 22 }} />
        <Sparkle size={12} style={{ position: 'absolute', top: -6, left: 38 }} />
      </motion.div>

      {/* Background teal pale wash — subtle, right quadrant */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: 0,
          width: '45%',
          height: '65%',
          background: 'var(--ill-teal-pale)',
          borderRadius: '50% 0 0 50%',
          opacity: 0.4,
          zIndex: 0,
          pointerEvents: 'none',
        }}
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
        {/* Section divider rule */}
        <motion.div
          initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '1px',
            background: 'var(--color-border)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            transformOrigin: 'left',
          }}
        />

        {/* Two-column: left (heading + chips + second illustration) | right (body + main illustration) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 5vw, 5rem)',
            alignItems: 'start',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
          className="why-grid"
        >
          {/* ── LEFT COLUMN: fully populated ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Eyebrow + heading */}
            <div>
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}
              >
                <motion.span
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  variants={popRotate(0.1, 10)}
                  style={{ display: 'flex' }}
                >
                  <Star size={14} color="var(--ill-teal)" points={8} idle="twinkle" />
                </motion.span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.6875rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ill-teal)',
                  }}
                >
                  {t('why.eyebrow')}
                </span>
              </motion.div>

              <div style={{ overflow: 'visible' }}>
                <motion.h2
                  className="circled-heading"
                  initial={prefersReducedMotion ? {} : circledHeadingClipHidden(-2)}
                  animate={circledHeadingClipVisible}
                  transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-0.035em',
                    color: 'var(--color-ink)',
                    marginBottom: '1.5rem',
                    textWrap: 'balance' as React.CSSProperties['textWrap'],
                  }}
                >
                  {t('why.heading')}{' '}
                  <CircledWord inView color="var(--color-magenta)">
                    {t('why.headingCircled')}
                  </CircledWord>
                </motion.h2>
              </div>

              <motion.div
                initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.15 }}
                style={{ height: '1px', background: 'var(--color-border)', marginBottom: '1.25rem', transformOrigin: 'left' }}
              />

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
              >
                <Arrow direction="right" length={52} color="var(--ill-teal)" strokeWidth={1.5} drawOn drawDelay={0.3} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-ink-faint)',
                    fontWeight: 500,
                  }}
                >
                  {t('why.tag')}
                </span>
              </motion.div>

              {/* Amber squiggle accent */}
              <AmberSquiggle style={{ marginTop: '1.5rem' }} />
            </div>

            {/* Topic chips cluster */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.25 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Sparkle size={9} style={{ flexShrink: 0 }} />
                {TOPIC_CHIPS_KEYS.map((chip, i) => (
                  <motion.span
                    key={chip}
                    initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{
                      type: 'spring' as const,
                      stiffness: 380,
                      damping: 22,
                      delay: 0.28 + i * 0.08,
                    }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--ill-teal)',
                      border: '1.5px solid var(--ill-teal)',
                      borderRadius: '4px',
                      padding: '0.3rem 0.75rem',
                      background: 'var(--ill-teal-pale)',
                      display: 'inline-block',
                    }}
                  >
                    {t(chip)}
                  </motion.span>
                ))}
              </div>
              {/* Dot grid row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <DotGrid cols={6} rows={2} color="var(--ill-teal)" animate style={{ opacity: 0.5 }} />
                <svg width="40" height="14" viewBox="0 0 40 14" fill="none" aria-hidden="true">
                  <motion.path
                    d="M2 7 Q8 2 14 7 Q20 12 26 7 Q32 2 38 7"
                    stroke="var(--ill-amber)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                    initial={prefersReducedMotion ? {} : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{ pathLength: { duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.5 }, opacity: { duration: 0.1, delay: 0.5 } } as Transition}
                  />
                </svg>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--ill-teal)',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
              </div>
            </motion.div>

            {/* Second illustration — TwoPeopleTalking, with amber blob + label */}
            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0.85, opacity: 0, rotate: 3 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{
                scale: { type: 'spring' as const, stiffness: 240, damping: 22, delay: 0.3 },
                opacity: { duration: 0.3, delay: 0.3 },
                rotate: { type: 'spring' as const, stiffness: 200, damping: 20, delay: 0.3 },
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', position: 'relative' }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Sparkle size={10} style={{ position: 'absolute', top: -8, right: -4, zIndex: 3 }} />
                <Blob
                  size={120}
                  color="var(--ill-amber-pale)"
                  float={!prefersReducedMotion}
                  style={{ border: '1.5px solid var(--ill-amber)', borderRadius: '50%' }}
                >
                  <TwoPeopleTalking size={90} />
                </Blob>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: 'var(--color-ink)',
                    marginBottom: '0.25rem',
                    lineHeight: 1.3,
                  }}
                >
                  {t('why.peerTitle')}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-ink-faint)',
                    lineHeight: 1.55,
                    maxWidth: '18ch',
                  }}
                >
                  {t('why.peerBody')}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    marginTop: '0.5rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--ill-amber)',
                  }}
                >
                  <span style={{ width: 14, height: 1.5, background: 'var(--ill-amber)', display: 'inline-block', borderRadius: 1 }} />
                  {t('why.peerNetwork')}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: body copy + main illustration ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Body copy */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 32, rotate: 1 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{
                opacity: { duration: 0.45, ease: [0.25, 1, 0.5, 1], delay: 0.1 },
                x: { type: 'spring' as const, stiffness: 280, damping: 28, delay: 0.1 },
                rotate: { type: 'spring' as const, stiffness: 240, damping: 24, delay: 0.1 },
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.125rem',
                color: 'var(--color-ink-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
                lineHeight: 1.75,
                paddingTop: '0.5rem',
              }}
            >
              <p>{t('why.body1')}</p>
              <p>{t('why.body2')}</p>
              <p>{t('why.body3')}</p>
            </motion.div>

            {/* Main illustration — MentoringPair, larger blob, prominent */}
            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0.82, opacity: 0, rotate: -3 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{
                scale: { type: 'spring' as const, stiffness: 260, damping: 22, delay: 0.2 },
                opacity: { duration: 0.3, delay: 0.2 },
                rotate: { type: 'spring' as const, stiffness: 220, damping: 20, delay: 0.2 },
              }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                paddingTop: '0.25rem',
              }}
            >
              {/* Amber sparkles around the blob */}
              <Sparkle
                size={14}
                style={{ position: 'absolute', top: -6, right: 8, zIndex: 3 }}
              />
              <Sparkle
                size={8}
                style={{ position: 'absolute', top: 32, left: -4, zIndex: 3 }}
              />
              <Sparkle
                size={10}
                style={{ position: 'absolute', bottom: 40, right: -8, zIndex: 3 }}
              />

              <Blob
                size={300}
                color="var(--ill-teal-pale)"
                float={!prefersReducedMotion}
                style={{ border: '1.5px solid var(--ill-teal)', borderRadius: '50%' }}
              >
                <MentoringPair size={270} />
              </Blob>

              {/* Label under blob */}
              <div
                style={{
                  marginTop: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ill-teal)',
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 1.5,
                    background: 'var(--ill-teal)',
                    display: 'inline-block',
                    borderRadius: 1,
                  }}
                />
                {t('why.mentoringLabel')}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stat row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1.5px solid var(--color-border)',
          }}
          className="why-stats"
        >
          {stats.map((stat, i) => (
            <StatBlock key={stat.label} stat={stat} i={i} isLast={i === stats.length - 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .why-grid { gap: clamp(2rem, 4vw, 3rem) !important; }
        }
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .why-stats { grid-template-columns: 1fr !important; }
          .why-stats > div { border-right: none !important; border-bottom: 1.5px solid var(--color-border); padding: 1.5rem 0 !important; }
        }
      `}</style>
    </section>
  )
}
