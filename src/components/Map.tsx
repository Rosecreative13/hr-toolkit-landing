import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import GridBg from './marks/GridBg'
import Star from './marks/Star'
import Arrow from './marks/Arrow'
import DotGrid from './marks/DotGrid'
import { flyInFrom, VIEWPORT_ONCE } from '../lib/motion'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const criteria = [
  'Employs or is willing to employ young people',
  'Has current or planned hiring needs',
  'Wants to improve recruitment and onboarding practices',
  'Is open to testing practical HR tools',
  'Can designate a contact person for the programme',
]

const regions = [
  { name: 'Edineț', x: 30, y: 12 },
  { name: 'Bălți', x: 42, y: 26 },
  { name: 'Soroca', x: 64, y: 18 },
  { name: 'Orhei', x: 54, y: 45 },
  { name: 'Chișinău', x: 44, y: 62 },
  { name: 'Ungheni', x: 24, y: 52 },
]

const moldovaSilhouette = `
  M 38 5
  C 42 4, 50 5, 58 8
  C 66 11, 72 15, 74 22
  C 76 29, 73 35, 70 42
  C 68 47, 68 52, 65 58
  C 62 64, 60 70, 56 76
  C 52 82, 48 88, 44 92
  C 40 96, 36 97, 32 94
  C 28 91, 26 86, 24 80
  C 22 74, 22 68, 20 62
  C 18 56, 16 50, 18 44
  C 20 38, 24 34, 26 28
  C 28 22, 30 16, 34 10
  Z
`

// Stagger directions for pin pop-ins — varied
const pinPops = [
  { rotate: -12, delay: 0.5 },
  { rotate: 10, delay: 0.62 },
  { rotate: -8, delay: 0.72 },
  { rotate: 14, delay: 0.55 },
  { rotate: -10, delay: 0.8 },
  { rotate: 7, delay: 0.65 },
]

export default function Map() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="who-can-apply"
      style={{
        background: 'var(--color-surface)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridBg style={{ opacity: 0.3 }} />
      <DotGrid
        cols={4}
        rows={4}
        color="var(--color-magenta)"
        animate
        style={{ position: 'absolute', top: 48, right: 48, zIndex: 1, opacity: 0.4 }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 4rem)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
        }}
        className="map-grid"
      >
        {/* Left: criteria */}
        <div>
          {/* Section rule */}
          <motion.div
            initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '1px', background: 'var(--color-border)', marginBottom: '2.5rem', transformOrigin: 'left' }}
          />

          <div style={{ overflow: 'hidden', marginBottom: '0.5rem' }}>
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
              Who{' '}
              <span style={{ color: 'var(--color-magenta)' }}>can</span>
              {' '}apply?
            </motion.h2>
          </div>

          {/* Drawn rule below heading */}
          <motion.div
            initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: 0.2 }}
            style={{ width: 32, height: 2, background: 'var(--color-magenta)', marginBottom: '1.25rem', transformOrigin: 'left' }}
          />

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'var(--color-ink-muted)',
              lineHeight: 1.7,
              marginBottom: '1.75rem',
              maxWidth: '42ch',
            }}
          >
            SMEs from <strong style={{ color: 'var(--color-ink)', fontWeight: 700 }}>six</strong> selected regions of Moldova. The criteria are straightforward.
          </motion.p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
            {criteria.map((c, i) => (
              <motion.li
                key={i}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -14, rotate: -1 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{
                  opacity: { duration: 0.35, ease: [0.25, 1, 0.5, 1], delay: i * 0.07 },
                  x: { type: 'spring' as const, stiffness: 300, damping: 26, delay: i * 0.07 },
                  rotate: { type: 'spring' as const, stiffness: 260, damping: 22, delay: i * 0.07 },
                }}
                whileHover={prefersReducedMotion ? {} : {
                  x: 4,
                  borderColor: 'var(--color-magenta-tint)',
                  background: 'var(--color-magenta-pale)',
                  transition: { duration: 0.18, ease: [0.25, 1, 0.5, 1] },
                }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--color-paper-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Star size={12} color="var(--color-magenta)" points={8} idle="twinkle" style={{ flexShrink: 0, marginTop: 3 }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-ink)',
                    lineHeight: 1.5,
                  }}
                >
                  {c}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
            {['SMEs', 'Young employee focus', 'Practical HR support'].map((tag, i) => (
              <motion.span
                key={tag}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -5 : 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ type: 'spring' as const, stiffness: 380, damping: 24, delay: i * 0.07 + 0.3 }}
                whileHover={prefersReducedMotion ? {} : {
                  scale: 1.05,
                  transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] },
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  background: 'var(--color-magenta-pale)',
                  border: '1px solid var(--color-magenta-tint)',
                  borderRadius: 100,
                  padding: '0.3rem 0.75rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  color: 'var(--color-magenta-dark)',
                  cursor: 'default',
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-magenta)', display: 'inline-block', flexShrink: 0 }} />
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Right: Moldova map — pins pop with springy overshoot, connector lines draw */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
        >
          {/* Diagonal flyIn for the entire map container */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={flyInFrom('diag-right', 0.1)}
          >
            <Arrow
              direction="down-right"
              length={30}
              color="var(--color-magenta)"
              strokeWidth={1.5}
              style={{ position: 'absolute', top: 0, left: 0, opacity: 0.5 }}
            />
          </motion.div>

          <div style={{ position: 'relative', width: '100%', maxWidth: 360, minHeight: 320 }}>
            <svg
              viewBox="0 0 100 105"
              style={{ width: '100%', height: 'auto', overflow: 'visible', display: 'block' }}
              role="img"
              aria-label="Stylised map of Moldova showing 6 programme regions"
            >
              {/* Country silhouette — fades in */}
              {!prefersReducedMotion ? (
                <motion.path
                  d={moldovaSilhouette}
                  fill="var(--color-magenta-tint)"
                  stroke="var(--color-magenta)"
                  strokeOpacity="0.8"
                  strokeWidth="1"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                />
              ) : (
                <path d={moldovaSilhouette} fill="var(--color-magenta-tint)" stroke="var(--color-magenta)" strokeOpacity="0.8" strokeWidth="1" />
              )}

              {/* Region pins */}
              {regions.map((region, i) => {
                const isActive = activeRegion === region.name
                const pop = pinPops[i]
                return (
                  <g
                    key={region.name}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActiveRegion(region.name)}
                    onMouseLeave={() => setActiveRegion(null)}
                    role="button"
                    aria-label={region.name}
                    tabIndex={0}
                    onFocus={() => setActiveRegion(region.name)}
                    onBlur={() => setActiveRegion(null)}
                  >
                    {/* Connector line — draws on enter */}
                    {!prefersReducedMotion ? (
                      <motion.line
                        x1={region.x}
                        y1={region.y - 5}
                        x2={region.x}
                        y2={region.y - 12}
                        stroke="var(--color-magenta)"
                        strokeWidth="0.4"
                        strokeOpacity="0.6"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={VIEWPORT_ONCE}
                        transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: pop.delay + 0.08 }}
                      />
                    ) : (
                      <line x1={region.x} y1={region.y - 5} x2={region.x} y2={region.y - 12} stroke="var(--color-magenta)" strokeWidth="0.4" strokeOpacity="0.6" />
                    )}

                    {/* Magenta dot — pops with rotate overshoot */}
                    {!prefersReducedMotion ? (
                      <motion.circle
                        cx={region.x}
                        cy={region.y}
                        r={isActive ? '4.5' : '3'}
                        fill="var(--color-magenta)"
                        fillOpacity={isActive ? '1' : '0.75'}
                        initial={{ scale: 0, opacity: 0, rotate: pop.rotate }}
                        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                        viewport={VIEWPORT_ONCE}
                        animate={isActive ? { scale: 1.3 } : { scale: 1 }}
                        transition={isActive
                          ? { type: 'spring' as const, stiffness: 420, damping: 18 }
                          : { type: 'spring' as const, stiffness: 440, damping: 22, delay: pop.delay }
                        }
                      />
                    ) : (
                      <circle cx={region.x} cy={region.y} r={isActive ? '4.5' : '3'} fill="var(--color-magenta)" fillOpacity={isActive ? '1' : '0.75'} />
                    )}

                    {/* Pulse ring on active */}
                    {isActive && !prefersReducedMotion && (
                      <motion.circle
                        cx={region.x}
                        cy={region.y}
                        r={3}
                        fill="none"
                        stroke="var(--color-magenta)"
                        strokeWidth="0.5"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', repeat: Infinity }}
                      />
                    )}

                    {/* Pill label — springs in on hover */}
                    {!prefersReducedMotion ? (
                      <motion.g
                        initial={{ opacity: 0.7, y: 0 }}
                        animate={isActive ? { opacity: 1, y: -2 } : { opacity: 0.7, y: 0 }}
                        transition={{ type: 'spring' as const, stiffness: 380, damping: 22 }}
                      >
                        <rect
                          x={region.x - 11}
                          y={region.y - 20}
                          width={22}
                          height={7}
                          rx="3.5"
                          fill={isActive ? 'var(--color-magenta)' : 'var(--color-magenta-tint)'}
                          stroke="var(--color-magenta)"
                          strokeWidth="0.3"
                        />
                        <text
                          x={region.x}
                          y={region.y - 14.5}
                          textAnchor="middle"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '3px',
                            fontWeight: 700,
                            fill: isActive ? 'white' : 'var(--color-magenta-dark)',
                          }}
                        >
                          {region.name}
                        </text>
                      </motion.g>
                    ) : (
                      <>
                        <rect
                          x={region.x - 11}
                          y={region.y - 20}
                          width={22}
                          height={7}
                          rx="3.5"
                          fill={isActive ? 'var(--color-magenta)' : 'var(--color-magenta-tint)'}
                          stroke="var(--color-magenta)"
                          strokeWidth="0.3"
                        />
                        <text
                          x={region.x}
                          y={region.y - 14.5}
                          textAnchor="middle"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '3px',
                            fontWeight: 700,
                            fill: isActive ? 'white' : 'var(--color-magenta-dark)',
                          }}
                        >
                          {region.name}
                        </text>
                      </>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .map-grid {
            grid-template-columns: 1fr !important;
          }
          .map-grid > *:last-child {
            order: -1;
            min-height: 280px;
          }
          .map-grid > *:last-child svg {
            max-width: 280px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
