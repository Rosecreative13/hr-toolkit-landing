import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Star from './marks/Star'
import GridBg from './marks/GridBg'
import { flyInFrom, popRotate, VIEWPORT_ONCE } from '../lib/motion'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Confidentiality() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="confidentiality"
      style={{
        background: 'var(--color-paper)',
        paddingTop: 'clamp(4rem, 8vw, 6rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        position: 'relative',
      }}
    >
      <GridBg style={{ opacity: 0.3 }} />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 4rem)',
        }}
      >
        {/* Section rule draw */}
        <motion.div
          initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '1px', background: 'var(--color-border)', marginBottom: 'clamp(2.5rem, 5vw, 4rem)', transformOrigin: 'left' }}
        />

        {/* Card — wipes in from bottom */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 28, rotate: -0.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{
            opacity: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
            y: { type: 'spring' as const, stiffness: 260, damping: 28 },
            rotate: { type: 'spring' as const, stiffness: 220, damping: 24 },
          }}
          style={{
            background: 'var(--color-paper-card)',
            border: '1.5px solid var(--color-border)',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '0',
          }}
          className="confid-grid"
        >
          {/* Left: shield draw-on icon + heading */}
          <div
            style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
              borderRight: '1.5px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
            className="confid-left"
          >
            {/* Shield SVG — draws on enter */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={popRotate(0.05, 8)}
              style={{ width: 36, height: 36 }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                {!prefersReducedMotion ? (
                  <>
                    {/* Shield outline — draws on */}
                    <motion.path
                      d="M18 4 L32 8 L32 18 C32 25 25 31 18 34 C11 31 4 25 4 18 L4 8 Z"
                      fill="var(--color-magenta-pale)"
                      stroke="var(--color-magenta)"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={VIEWPORT_ONCE}
                      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2 }}
                    />
                    {/* Checkmark inside shield */}
                    <motion.polyline
                      points="12,18 16,22 24,14"
                      fill="none"
                      stroke="var(--color-magenta)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={VIEWPORT_ONCE}
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.8 }}
                    />
                  </>
                ) : (
                  <>
                    <path d="M18 4 L32 8 L32 18 C32 25 25 31 18 34 C11 31 4 25 4 18 L4 8 Z" fill="var(--color-magenta-pale)" stroke="var(--color-magenta)" strokeWidth="1.5" strokeLinejoin="round" />
                    <polyline points="12,18 16,22 24,14" fill="none" stroke="var(--color-magenta)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                )}
              </svg>
            </motion.div>

            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={prefersReducedMotion ? {} : { clipPath: 'inset(0 100% 0 0)', skewX: -2 }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)', skewX: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.68, ease: EASE_OUT_EXPO, delay: 0.1 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 700,
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                }}
              >
                {t('confidentiality.heading')}
              </motion.h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={flyInFrom('left', 0.2)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
            >
              <Star size={10} color="var(--color-magenta)" points={6} idle="twinkle" />
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-magenta-dark)',
                  fontWeight: 600,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {t('confidentiality.subheading')}
              </p>
            </motion.div>
          </div>

          {/* Right: body text — staggered clip reveals */}
          <div
            style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              color: 'var(--color-ink-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              lineHeight: 1.75,
            }}
          >
            {[
              t('confidentiality.para1'),
              t('confidentiality.para2'),
              t('confidentiality.para3'),
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{
                  opacity: { duration: 0.45, ease: [0.25, 1, 0.5, 1], delay: 0.1 + i * 0.09 },
                  x: { type: 'spring' as const, stiffness: 280, damping: 26, delay: 0.1 + i * 0.09 },
                }}
                style={{ margin: 0 }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .confid-grid { grid-template-columns: 1fr !important; }
          .confid-left { border-right: none !important; border-bottom: 1.5px solid var(--color-border); }
        }
      `}</style>
    </section>
  )
}
