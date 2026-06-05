import { motion, useReducedMotion, type Transition } from 'framer-motion'
import GridBg from './marks/GridBg'
import Star from './marks/Star'
import DotGrid from './marks/DotGrid'
import Arrow from './marks/Arrow'
import { scatterIn, useTiltOnHover, VIEWPORT_ONCE } from '../lib/motion'
import { RECEIVE_ICONS } from './illustrations'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const deliverables = [
  { num: 1, title: 'Practical HR Toolkit', description: 'A structured set of documents and templates you can put to work immediately.' },
  { num: 2, title: 'Recruitment templates', description: 'Ready-to-use job description formats and screening checklists.' },
  { num: 3, title: 'Structured interview tools', description: 'Question guides and scoring sheets that make candidate comparison consistent.' },
  { num: 4, title: 'Onboarding checklists', description: 'Step-by-step lists that ensure every new hire starts well.' },
  { num: 5, title: 'Supervisor guidance', description: 'Simple reference materials that help team leaders set expectations clearly.' },
  { num: 6, title: 'Retention and feedback tools', description: 'Check-in templates and early-warning indicators for engagement.' },
  { num: 7, title: 'Workshops', description: "Practical, facilitated sessions built around your company's real situations." },
  { num: 8, title: 'Mentoring circles', description: 'Small-group sessions with expert facilitators and peer SMEs.' },
  { num: 9, title: 'Peer learning', description: 'Structured opportunities to learn from companies in similar situations across the region.' },
]

function DeliverableCard({ item, i }: { item: typeof deliverables[0]; i: number }) {
  const prefersReducedMotion = useReducedMotion()
  const scatter = scatterIn(i)
  const { ref, motionStyle, onMouseMove, onMouseLeave } = useTiltOnHover(4, 700)

  const IconComponent = RECEIVE_ICONS[i]

  // Card uses amber-pale tint for last row to break the grid monotony
  const isHighlight = i === 6 || i === 7 || i === 8
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
        padding: 'clamp(1.25rem, 2vw, 1.75rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
        position: 'relative',
        minHeight: 180,
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
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ type: 'spring' as const, stiffness: 440, damping: 20, delay: i * 0.05 + 0.1 }}
          style={{
            width: 32,
            height: 32,
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
              fontSize: '0.75rem',
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
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ type: 'spring' as const, stiffness: 380, damping: 22, delay: i * 0.05 + 0.15 }}
          style={{
            background: 'var(--ill-navy-pale)',
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconComponent size={28} />
        </motion.div>
      </div>

      <div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)',
            color: 'var(--ill-navy)',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            marginBottom: '0.5rem',
          }}
        >
          {item.title}
        </h3>
        {/* Teal underline accent — draws on */}
        <motion.div
          initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 + 0.1 } as Transition}
          style={{
            width: 28,
            height: 2,
            background: 'var(--ill-teal)',
            marginBottom: '0.625rem',
            transformOrigin: 'left',
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
          {item.description}
        </p>
      </div>

      {/* Teal dotgrid decoration (replacing cobalt) */}
      <DotGrid
        cols={3}
        rows={3}
        gap={6}
        dotR={1.5}
        color="var(--ill-teal)"
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          opacity: 0.28,
        }}
      />

      {/* Border-draw stroke on hover */}
      {!prefersReducedMotion && (
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            overflow: 'visible',
          }}
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
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="receive"
      style={{
        background: 'var(--color-paper)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
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
        {/* Section rule draw */}
        <motion.div
          initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '1px', background: 'var(--color-border)', marginBottom: 'clamp(3rem, 6vw, 5rem)', transformOrigin: 'left' }}
        />

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
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={prefersReducedMotion ? {} : { clipPath: 'inset(0 100% 0 0)', skewX: -2 }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)', skewX: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.72, ease: EASE_OUT_EXPO, delay: 0.05 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: '-0.035em',
                color: 'var(--color-ink)',
              }}
            >
              What SMEs{' '}
              <span style={{ color: 'var(--ill-teal)' }}>receive</span>
            </motion.h2>
          </div>

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
              Nine concrete deliverables — tools, workshops, and peer support — for SMEs without dedicated HR departments.
            </p>
          </motion.div>
        </div>

        {/* 3×3 card grid — scatter entrance */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0',
            border: '1px solid var(--color-border)',
            background: 'var(--color-border)',
          }}
          className="receive-grid"
        >
          {deliverables.map((item, i) => (
            <DeliverableCard key={item.num} item={item} i={i} />
          ))}
        </div>

        {/* Bottom annotation strip — teal palette now */}
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
            Designed for SMEs{' '}
            <span style={{ color: 'var(--ill-teal)' }}>without dedicated HR departments</span>.
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
        @media (max-width: 900px) {
          .receive-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .receive-header { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
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
