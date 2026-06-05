import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GridBg from './marks/GridBg'
import Star from './marks/Star'
import Arrow from './marks/Arrow'
import DotGrid from './marks/DotGrid'
import CircledWord from './marks/CircledWord'
import { circledHeadingClipHidden, circledHeadingClipVisible, scatterIn, VIEWPORT_ONCE, flyInFrom, popRotate } from '../lib/motion'
import type { Transition } from 'framer-motion'

// Verified 200 OK
const PAINS_PHOTO =
  'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=900&q=80&auto=format&fit=crop'

const PAINS_ARCH_PATH = 'M 12 480 L 12 170 A 168 168 0 0 1 348 170 L 348 480'
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Pains() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  const pains = [
    { title: t('pains.item1.title'), description: t('pains.item1.description') },
    { title: t('pains.item2.title'), description: t('pains.item2.description') },
    { title: t('pains.item3.title'), description: t('pains.item3.description') },
    { title: t('pains.item4.title'), description: t('pains.item4.description') },
    { title: t('pains.item5.title'), description: t('pains.item5.description') },
    { title: t('pains.item6.title'), description: t('pains.item6.description') },
  ]

  return (
    <section
      id="pains"
      style={{
        background: 'var(--color-surface)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridBg style={{ opacity: 0.35 }} />
      <DotGrid
        cols={3}
        rows={5}
        color="var(--color-ink)"
        animate
        style={{ position: 'absolute', bottom: 60, left: 40, zIndex: 1, opacity: 0.12 }}
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'start',
          }}
          className="pains-grid"
        >
          {/* LEFT — text + list */}
          <div>
            {/* Section rule draw */}
            <motion.div
              initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '1px', background: 'var(--color-border)', marginBottom: '2.5rem', transformOrigin: 'left' }}
            />

            <div style={{ overflow: 'visible', marginBottom: '2.5rem' }}>
              <motion.h2
                className="circled-heading pains-heading"
                initial={prefersReducedMotion ? {} : circledHeadingClipHidden(-3)}
                animate={circledHeadingClipVisible}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.05 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.035em',
                  color: 'var(--color-ink)',
                  marginBottom: '0.75rem',
                  textWrap: 'balance' as React.CSSProperties['textWrap'],
                }}
              >
                {t('pains.heading')}{' '}
                <CircledWord inView>{t('pains.headingCircled')}</CircledWord>
              </motion.h2>
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.22 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}
              >
                <Arrow direction="right" length={36} color="var(--color-magenta)" strokeWidth={1.5} drawOn drawDelay={0.3} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-ink-faint)',
                  }}
                >
                  {t('pains.subhead')}
                </span>
              </motion.div>
            </div>

            {/* Pain list — scatterIn from alternating sides with rotation */}
            <ul style={{ listStyle: 'none' }}>
              {pains.map((pain, i) => {
                const scatter = scatterIn(i)
                return (
                  <motion.li
                    key={i}
                    variants={scatter}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-6%' }}
                    whileHover={prefersReducedMotion ? {} : {
                      x: 3,
                      y: -2,
                      boxShadow: '4px 6px 0 rgba(42,79,224,0.12)',
                      borderColor: 'var(--color-magenta)',
                      background: 'var(--color-magenta-pale)',
                      transition: { duration: 0.18, ease: [0.25, 1, 0.5, 1] },
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.25rem 1rem',
                      background: 'var(--color-paper-card)',
                      marginBottom: '0.25rem',
                      border: '1px solid var(--color-border)',
                      cursor: 'default',
                      transformOrigin: 'top left',
                      position: 'relative',
                    }}
                  >
                    <motion.span
                      whileHover={prefersReducedMotion ? {} : {
                        rotate: [0, 10, -8, 6, 0],
                        transition: { duration: 0.45, ease: 'easeInOut' },
                      }}
                      style={{ flexShrink: 0, marginTop: 4, display: 'flex' }}
                    >
                      <Star
                        size={14}
                        color="var(--color-magenta)"
                        points={8}
                        idle="twinkle"
                      />
                    </motion.span>
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)',
                          color: 'var(--color-ink)',
                          marginBottom: '0.2rem',
                          lineHeight: 1.35,
                        }}
                      >
                        {pain.title}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.875rem',
                          color: 'var(--color-ink-muted)',
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {pain.description}
                      </p>
                    </div>
                  </motion.li>
                )
              })}
            </ul>
          </div>

          {/* RIGHT — B&W photo + fill elements to match card-stack height */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 32, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{
              opacity: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
              x: { type: 'spring' as const, stiffness: 260, damping: 28 },
              rotate: { type: 'spring' as const, stiffness: 220, damping: 24 },
            }}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', paddingTop: '2rem' }}
            className="pains-photo-col"
          >
            {/* Photo composition */}
            <div style={{ position: 'relative', width: 'min(360px, 100%)' }}>
              {/* Arc behind — draws on */}
              <svg
                aria-hidden="true"
                viewBox="0 0 360 480"
                style={{ position: 'absolute', inset: '-12px', width: 'calc(100% + 24px)', height: 'calc(100% + 24px)', zIndex: 0 }}
              >
                <path d={PAINS_ARCH_PATH} fill="var(--color-magenta-tint)" />
                {!prefersReducedMotion ? (
                  <motion.path
                    d={PAINS_ARCH_PATH}
                    fill="none"
                    stroke="var(--color-magenta)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.2 } as Transition}
                  />
                ) : (
                  <path d={PAINS_ARCH_PATH} fill="none" stroke="var(--color-magenta)" strokeWidth="2" />
                )}
              </svg>

              {/* Photo — clip reveal from bottom edge */}
              <motion.div
                initial={prefersReducedMotion ? {} : { clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.25 } as Transition}
                whileHover={prefersReducedMotion ? {} : {
                  scale: 1.015,
                  filter: 'grayscale(0.5) contrast(1.1)',
                  transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: '180px 180px 0 0',
                  overflow: 'hidden',
                  aspectRatio: '3/4',
                  border: '2px solid var(--color-magenta)',
                  cursor: 'default',
                }}
              >
                <img
                  src={PAINS_PHOTO}
                  alt={t('pains.photoAlt')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(1) contrast(1.1)',
                    display: 'block',
                    transition: 'filter 0.35s ease',
                  }}
                />
              </motion.div>

              <DotGrid
                cols={4}
                rows={4}
                color="var(--color-magenta)"
                animate
                style={{ position: 'absolute', top: -20, right: -20, zIndex: 2 }}
              />

              {/* "Can help" annotation — stamp pop with overshoot */}
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0.75, opacity: 0, rotate: -6 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ type: 'spring' as const, stiffness: 380, damping: 22, delay: 0.65 }}
                style={{
                  position: 'absolute',
                  bottom: -12,
                  left: -12,
                  zIndex: 2,
                  background: 'var(--color-magenta)',
                  borderRadius: 12,
                  padding: '0.625rem 1.125rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Star size={12} color="#fff" points={6} />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    color: '#fff',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t('pains.badge')}
                </span>
                <Arrow direction="right" length={20} color="#fff" strokeWidth={1.5} />
              </motion.div>
            </div>

            {/* ── FILL ELEMENT: cobalt reassurance card ── */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{
                opacity: { duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.55 },
                y: { type: 'spring' as const, stiffness: 280, damping: 26, delay: 0.55 },
                rotate: { type: 'spring' as const, stiffness: 240, damping: 24, delay: 0.55 },
              }}
              style={{
                width: 'min(360px, 100%)',
                background: 'var(--color-magenta)',
                border: '2px solid var(--color-magenta-dark)',
                borderRadius: 4,
                padding: '1.5rem 1.625rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle cobalt dot grid decoration inside card */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: -8,
                  right: -8,
                  opacity: 0.15,
                  pointerEvents: 'none',
                }}
              >
                <DotGrid cols={4} rows={3} color="#ffffff" animate={false} />
              </div>

              {/* Pull quote text */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <motion.span
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  variants={popRotate(0.65, 8)}
                  style={{ display: 'flex' }}
                >
                  <Star size={10} color="rgba(255,255,255,0.7)" points={6} />
                </motion.span>
                {t('pains.insightEyebrow')}
              </div>

              <blockquote
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1rem, 1.5vw, 1.1875rem)',
                  color: '#ffffff',
                  lineHeight: 1.4,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  marginBottom: '1.25rem',
                  textWrap: 'balance' as React.CSSProperties['textWrap'],
                }}
              >
                {t('pains.insightText')}
              </blockquote>

              {/* Arrow indicator down toward next section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  variants={flyInFrom('left', 0.7)}
                >
                  <Arrow direction="right" length={28} color="rgba(255,255,255,0.7)" strokeWidth={1.5} drawOn drawDelay={0.75} />
                </motion.div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'rgba(255,255,255,0.75)',
                    fontWeight: 500,
                  }}
                >
                  {t('pains.insightNote')}
                </span>
              </div>
            </motion.div>

            {/* Decorative down-arrow + dot cluster pointing toward next section */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.7 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            >
              <DotGrid cols={3} rows={2} color="var(--color-magenta)" animate style={{ opacity: 0.4 }} />
              <svg width="18" height="26" viewBox="0 0 18 26" fill="none" aria-hidden="true">
                {prefersReducedMotion ? (
                  <path d="M9 2 L9 20 M3 14 L9 21 L15 14" stroke="var(--color-magenta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                ) : (
                  <motion.path
                    d="M9 2 L9 20 M3 14 L9 21 L15 14"
                    stroke="var(--color-magenta)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.55 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{ pathLength: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.8 }, opacity: { duration: 0.15, delay: 0.8 } } as Transition}
                  />
                )}
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pains-grid { grid-template-columns: 1fr !important; }
          .pains-photo-col { display: none !important; }
        }
      `}</style>
    </section>
  )
}
