import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GridBg from './marks/GridBg'
import Star from './marks/Star'
import Arrow from './marks/Arrow'
import DotGrid from './marks/DotGrid'
import { VIEWPORT_ONCE } from '../lib/motion'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function ProgrammeSummary() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="summary"
      style={{
        background: 'var(--color-paper)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(2.5rem, 6vw, 5rem) 0',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <GridBg style={{ opacity: 0.55 }} />
      <DotGrid
        cols={4}
        rows={4}
        color="var(--color-magenta)"
        animate
        style={{ position: 'absolute', top: 48, right: 60, zIndex: 1, opacity: 0.28 }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 4rem)',
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 0.42fr) minmax(0, 1fr)',
          gap: 'clamp(2rem, 6vw, 5rem)',
          alignItems: 'start',
        }}
        className="summary-grid"
      >
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        >
          <motion.div
            initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            style={{ height: 1, background: 'var(--color-border)', marginBottom: '1.75rem', transformOrigin: 'left' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <Star size={12} color="var(--color-magenta)" points={8} idle="twinkle" />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.6875rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-muted)',
              }}
            >
              {t('summary.eyebrow')}
            </span>
          </div>
          <h2
            className="summary-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.875rem, 3.8vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: 0,
              color: 'var(--color-ink)',
              textWrap: 'balance',
            }}
          >
            {t('summary.heading')}
          </h2>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.58, ease: EASE_OUT_EXPO, delay: 0.08 }}
          style={{
            background: '#fff',
            border: '1.5px solid var(--color-border)',
            boxShadow: '6px 6px 0 var(--color-magenta-tint)',
            padding: 'clamp(1.25rem, 3vw, 2.25rem)',
            position: 'relative',
          }}
        >
          <Arrow
            direction="right"
            length={44}
            color="var(--color-magenta)"
            strokeWidth={1.5}
            drawOn
            drawDelay={0.15}
            style={{ marginBottom: '1.25rem' }}
          />
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.25rem, 2.3vw, 1.75rem)',
              lineHeight: 1.25,
              letterSpacing: 0,
              color: 'var(--color-ink)',
              marginBottom: '1rem',
              maxWidth: '34ch',
            }}
          >
            {t('summary.subheading')}
          </p>
          <div
            style={{
              display: 'grid',
              gap: '0.875rem',
              maxWidth: '72ch',
            }}
          >
            <p className="summary-copy">{t('summary.body1')}</p>
            <p className="summary-copy">{t('summary.body2')}</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .summary-copy {
          font-family: var(--font-body);
          font-size: clamp(0.9375rem, 1.35vw, 1.0625rem);
          color: var(--color-ink-muted);
          line-height: 1.75;
          margin: 0;
        }
        @media (max-width: 860px) {
          .summary-grid {
            grid-template-columns: 1fr !important;
          }
          .summary-heading {
            font-size: clamp(1.75rem, 7vw, 2.25rem) !important;
          }
        }
      `}</style>
    </section>
  )
}
