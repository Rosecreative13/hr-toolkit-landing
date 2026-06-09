import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GridBg from './marks/GridBg'
import Star from './marks/Star'
import DotGrid from './marks/DotGrid'
import Arrow from './marks/Arrow'
import { scatterIn, useTiltOnHover, VIEWPORT_ONCE } from '../lib/motion'
import { RECEIVE_ICONS } from './illustrations'

type Deliverable = { num: number; title: string }

function DeliverableCard({ item, i, total }: { item: Deliverable; i: number; total: number }) {
  const prefersReducedMotion = useReducedMotion()
  const scatter = scatterIn(i)
  const { ref, motionStyle, onMouseMove, onMouseLeave } = useTiltOnHover(4, 700)

  // Cycle the available illustrated icons across all deliverables
  const IconComponent = RECEIVE_ICONS[i % RECEIVE_ICONS.length]

  // Tint the final row (last 4 in the 4-col grid) to break monotony
  const isHighlight = i >= total - 4
  const cardBg = isHighlight ? 'var(--ill-teal-pale)' : 'var(--color-paper-card)'
  const cardBorder = isHighlight ? 'var(--ill-teal)' : 'var(--color-border)'

  return (
    <motion.article
      ref={ref as React.RefObject<HTMLElement>}
      variants={scatter}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-6%' }}
      onMouseMove={prefersReducedMotion ? undefined : onMouseMove}
      onMouseLeave={prefersReducedMotion ? undefined : onMouseLeave}
      style={{
        ...(prefersReducedMotion ? {} : motionStyle),
        background: cardBg,
        padding: 'clamp(1.1rem, 1.6vw, 1.5rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
        position: 'relative',
        minHeight: 138,
        cursor: 'default',
        transformStyle: 'preserve-3d' as const,
        borderRight: `1px solid ${cardBorder}`,
        borderBottom: `1px solid ${cardBorder}`,
      }}
    >
      {/* Top row: teal number badge + icon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Teal circle number badge */}
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0.5, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring' as const, stiffness: 440, damping: 20, delay: i * 0.03 + 0.05 }}
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'var(--ill-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.6875rem',
              color: '#fff',
              lineHeight: 1,
            }}
          >
            {String(item.num).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Teal+navy mini illustration icon */}
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' as const, stiffness: 380, damping: 22, delay: i * 0.03 + 0.1 }}
          style={{
            background: 'var(--ill-navy-pale)',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconComponent size={26} />
        </motion.div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
        {/* Teal tick accent */}
        <motion.span
          initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' as const, stiffness: 460, damping: 20, delay: i * 0.03 + 0.12 }}
          aria-hidden="true"
          style={{ flexShrink: 0, marginTop: 4 }}
        >
          <Star size={9} color="var(--ill-teal)" points={8} idle="twinkle" />
        </motion.span>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(0.875rem, 1.05vw, 0.9375rem)',
            color: 'var(--ill-navy)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            margin: 0,
            overflowWrap: 'break-word',
            minWidth: 0,
          }}
        >
          {item.title}
        </h3>
      </div>

      {/* Teal dotgrid decoration */}
      <DotGrid
        cols={3}
        rows={3}
        gap={6}
        dotR={1.5}
        color="var(--ill-teal)"
        style={{ position: 'absolute', bottom: 10, right: 10, opacity: 0.22 }}
      />

      {/* Border-draw stroke on hover */}
      {!prefersReducedMotion && (
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
          className="card-border-svg"
        >
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            fill="none"
            stroke="var(--ill-teal)"
            strokeWidth="1.5"
            className="card-border-rect"
          />
        </svg>
      )}
    </motion.article>
  )
}

export default function Receive() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  // All 16 deliverables, verbatim from the programme docx (section 5)
  const deliverables: Deliverable[] = Array.from({ length: 16 }, (_, idx) => ({
    num: idx + 1,
    title: t(`receive.item${idx + 1}`),
  }))

  return (
    <section
      id="receive"
      style={{
        background: 'var(--color-paper)',
        paddingTop: 'clamp(2.5rem, 6vw, 5rem)',
        paddingBottom: 'clamp(2.5rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridBg style={{ opacity: 0.35 }} />

      {/* Amber pale wash — top right corner */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '30%',
          height: '45%',
          background: 'var(--ill-amber-pale)',
          borderRadius: '0 0 0 60%',
          opacity: 0.65,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 4rem)',
        }}
      >

        {/* Header — left-aligned, asymmetric */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'end',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
          className="receive-header"
        >
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
            }}
          >
            {t('receive.heading')}{' '}
            <span style={{ color: 'var(--ill-teal)' }}>{t('receive.headingColored')}</span>
          </motion.h2>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.7,
                maxWidth: '42ch',
              }}
            >
              {t('receive.subhead')}
            </p>
          </motion.div>
        </div>

        {/* 4×4 card grid — scatter entrance */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
            border: '1px solid var(--color-border)',
            background: 'var(--color-border)',
          }}
          className="receive-grid"
        >
          {deliverables.map((item, i) => (
            <DeliverableCard key={item.num} item={item} i={i} total={deliverables.length} />
          ))}
        </div>

        {/* Bottom annotation strip — teal palette */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          style={{
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1.25rem 1.5rem',
            background: 'var(--ill-teal-pale)',
            border: '1.5px solid var(--ill-teal)',
          }}
        >
          <Star size={16} color="var(--ill-teal)" points={8} idle="twinkle" />
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
              color: 'var(--color-ink)',
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            {t('receive.footer')}
          </p>
          <Arrow direction="right" length={36} color="var(--ill-teal)" strokeWidth={1.5} style={{ flexShrink: 0, marginLeft: 'auto' }} />
        </motion.div>
      </div>

      {/* Amber dotgrid in corner */}
      <DotGrid
        cols={4}
        rows={4}
        color="var(--ill-amber)"
        animate
        style={{ position: 'absolute', top: 80, right: 64, zIndex: 1, opacity: 0.3 }}
      />

      <style>{`
        @media (max-width: 1100px) {
          .receive-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 820px) {
          .receive-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .receive-header { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .receive-grid { grid-template-columns: 1fr !important; }
        }
        /* Border-draw on card hover */
        .card-border-rect {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          transition: stroke-dashoffset 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        article:hover .card-border-rect {
          stroke-dashoffset: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .card-border-rect { transition: none; }
        }
      `}</style>
    </section>
  )
}
