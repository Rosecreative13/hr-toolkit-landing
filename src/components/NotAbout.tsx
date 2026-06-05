import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GridBg from './marks/GridBg'
import Star from './marks/Star'
import Arrow from './marks/Arrow'
import { flyInFrom, popRotate, VIEWPORT_ONCE } from '../lib/motion'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

// Alternate entry directions for the X-list items
const itemDirs = ['right', 'left', 'right', 'left', 'right', 'left'] as const

function XMark({ delay }: { delay: number }) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      initial={prefersReducedMotion ? {} : { scale: 0.6, rotate: -20, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ type: 'spring' as const, stiffness: 440, damping: 22, delay: delay + 0.1 }}
      style={{
        width: 22,
        height: 22,
        border: '1.5px solid var(--color-border)',
        background: 'var(--color-paper)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        {!prefersReducedMotion ? (
          <>
            <motion.line
              x1="2" y1="2" x2="8" y2="8"
              stroke="var(--color-magenta)" strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO, delay: delay + 0.18 }}
            />
            <motion.line
              x1="8" y1="2" x2="2" y2="8"
              stroke="var(--color-magenta)" strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO, delay: delay + 0.3 }}
            />
          </>
        ) : (
          <path d="M2 2l6 6M8 2l-6 6" stroke="var(--color-magenta)" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
    </motion.span>
  )
}

export default function NotAbout() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  const nots = [
    t('notAbout.item1'),
    t('notAbout.item2'),
    t('notAbout.item3'),
    t('notAbout.item4'),
    t('notAbout.item5'),
    t('notAbout.item6'),
  ]

  return (
    <section
      id="not-about"
      style={{
        background: 'var(--color-surface)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridBg style={{ opacity: 0.35 }} />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
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

        {/* Two-column card — flies in from below */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 36, rotate: 0.5 }}
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
            gridTemplateColumns: '1fr 1fr',
            gap: '0',
          }}
          className="notabout-grid"
        >
          {/* Left */}
          <div
            style={{
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              borderRight: '1.5px solid var(--color-border)',
            }}
            className="notabout-left"
          >
            <div style={{ overflow: 'hidden', marginBottom: '1.25rem' }}>
              <motion.h2
                initial={prefersReducedMotion ? {} : { clipPath: 'inset(0 100% 0 0)', skewX: -2 }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)', skewX: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.05 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 700,
                  lineHeight: 1.02,
                  letterSpacing: '-0.035em',
                  color: 'var(--color-ink)',
                }}
              >
                {t('notAbout.heading')}{' '}
                <span style={{ color: 'var(--color-magenta)' }}>{t('notAbout.headingColored')}</span>
              </motion.h2>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9375rem, 1.4vw, 1rem)',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.7,
                maxWidth: '42ch',
                marginBottom: '2rem',
              }}
            >
              {t('notAbout.subhead')}
            </p>

            {/* Magenta-tint restatement box — pops in */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={popRotate(0.3, 4)}
              style={{
                background: 'var(--color-magenta-pale)',
                border: '1.5px solid var(--color-magenta-tint)',
                padding: '1.25rem 1.5rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <Star size={14} color="var(--color-magenta)" points={8} idle="twinkle" style={{ flexShrink: 0, marginTop: 2 }} />
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                    color: 'var(--color-ink)',
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  {t('notAbout.restatement')}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '1.625rem' }}>
                <Arrow direction="right" length={32} color="var(--color-magenta)" strokeWidth={1.5} drawOn drawDelay={0.4} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-magenta-dark)',
                    fontWeight: 600,
                  }}
                >
                  {t('notAbout.restatementSub')}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: X-list — items fly in from alternating sides */}
          <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <ul style={{ listStyle: 'none' }}>
              {nots.map((item, i) => {
                const dir = itemDirs[i % itemDirs.length]
                const delay = i * 0.07
                return (
                  <motion.li
                    key={i}
                    variants={flyInFrom(dir, delay)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    whileHover={prefersReducedMotion ? {} : {
                      x: dir === 'right' ? -3 : 3,
                      transition: { duration: 0.18, ease: [0.25, 1, 0.5, 1] },
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      padding: '0.875rem 0',
                      borderBottom: i < nots.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                    }}
                  >
                    <XMark delay={delay} />
                    {/* Text with struck-line that draws on enter */}
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9375rem',
                          color: 'var(--color-ink-muted)',
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </span>
                    </span>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .notabout-grid { grid-template-columns: 1fr !important; }
          .notabout-left { border-right: none !important; border-bottom: 1.5px solid var(--color-border); }
        }
      `}</style>
    </section>
  )
}
