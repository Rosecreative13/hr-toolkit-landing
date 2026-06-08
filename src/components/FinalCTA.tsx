import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Star from './marks/Star'
import Arrow from './marks/Arrow'
import DotGrid from './marks/DotGrid'
import CircledWord from './marks/CircledWord'
import RotatingBadge from './marks/RotatingBadge'
import { circledHeadingClipHidden, circledHeadingClipVisible, useMagnetic, popRotate, flyInFrom, VIEWPORT_ONCE } from '../lib/motion'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

function MagneticSubmit({ children, href }: { children: React.ReactNode; href?: string }) {
  const { ref, style: magStyle } = useMagnetic(0.32)
  const prefersReducedMotion = useReducedMotion()

  const commonStyle: React.CSSProperties = {
    ...(magStyle as unknown as React.CSSProperties),
    background: 'var(--color-magenta)',
    color: '#fff',
    border: 'none',
    borderRadius: 100,
    padding: '0.8rem 2rem',
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '0.9375rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
    position: 'relative' as const,
    overflow: 'hidden' as const,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: '1rem',
  }

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={commonStyle}
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.94 }}
      transition={{ type: 'spring' as const, stiffness: 360, damping: 22 }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      {/* Fill-slide on hover */}
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0, originX: '0%' }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 100,
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.a>
  )
}

export default function FinalCTA() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="apply"
      style={{
        background: 'var(--color-ink)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid bg */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Magenta circle accent — subtle */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'var(--color-magenta)',
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      />

      {/* DotGrid decorations */}
      <DotGrid
        cols={5}
        rows={5}
        color="var(--color-magenta)"
        animate
        style={{ position: 'absolute', top: 60, left: 60, zIndex: 1, opacity: 0.3 }}
      />
      <DotGrid
        cols={4}
        rows={4}
        color="#fff"
        style={{ position: 'absolute', bottom: 60, right: 80, zIndex: 1, opacity: 0.1 }}
      />

      {/* Corner star bursts — popRotate from corners */}
      <motion.div
        style={{ position: 'absolute', top: 32, right: 140, zIndex: 2 }}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={popRotate(0.4, 15)}
      >
        <Star size={22} color="var(--color-magenta)" points={8} idle="twinkle" />
      </motion.div>
      <motion.div
        style={{ position: 'absolute', bottom: 32, left: 140, zIndex: 2 }}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={popRotate(0.55, 20)}
      >
        <Star size={14} color="rgba(42,79,224,0.4)" points={6} idle="spin" />
      </motion.div>

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
            gridTemplateColumns: '1fr auto',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center',
          }}
          className="cta-grid"
        >
          {/* Left: content */}
          <div>
            {/* Eyebrow — flies in from left */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}
            >
              <Star size={12} color="var(--color-magenta)" points={8} idle="twinkle" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                {t('cta.eyebrow')}
              </span>
            </motion.div>

            {/* Headline — clip wipe on dark bg */}
            <div style={{ overflow: 'visible', marginBottom: '1.25rem' }}>
              <motion.h2
                className="circled-heading"
                initial={prefersReducedMotion ? {} : circledHeadingClipHidden(-2)}
                animate={circledHeadingClipVisible}
                transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: 0.08 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.04em',
                  color: '#fff',
                }}
              >
                {t('cta.heading')}{' '}
                <CircledWord inView color="var(--color-magenta)">
                  {t('cta.headingCircled')}
                </CircledWord>
              </motion.h2>
            </div>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay: 0.16 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                maxWidth: '52ch',
                marginBottom: '2rem',
              }}
            >
              {t('cta.body')}
            </motion.p>

            {/* Email pill CTA — magnetic button */}
            <motion.div
              variants={flyInFrom('up', 0.24)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <MagneticSubmit href={t('formUrl')}>{t('cta.button')}</MagneticSubmit>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Arrow direction="right" length={28} color="var(--color-magenta)" strokeWidth={1.5} drawOn drawDelay={0.3} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  {t('cta.note')}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Rotating badge — pop in with rotate overshoot */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.75, rotate: -25 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ type: 'spring' as const, stiffness: 260, damping: 22, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            className="cta-badge"
          >
            <RotatingBadge size={140} text={t('hero.rotatingBadge')} />
            {/* Star bursts — pop in staggered from diagonal */}
            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0, rotate: 30 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ type: 'spring' as const, stiffness: 380, damping: 22, delay: 0.52 }}
            >
              <Star size={36} color="rgba(42,79,224,0.3)" points={12} idle="spin" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        @media (max-width: 768px) {
          .cta-grid { grid-template-columns: 1fr !important; }
          .cta-badge { display: none !important; }
        }
      `}</style>
    </section>
  )
}
