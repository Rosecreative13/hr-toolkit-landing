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

// Real lon/lat → SVG coords via Mercator projection
// ViewBox: "0 0 200 280"
// Bounding box: lon 26.55–30.25, lat 45.43–48.57
// All pins land inside the silhouette polygon
const regions = [
  { name: 'Edineț',    x: 41.7,  y: 59.6  },
  { name: 'Bălți',     x: 75.1,  y: 74.8  },
  { name: 'Soroca',    x: 94.7,  y: 39.0  },
  { name: 'Orhei',     x: 122.2, y: 108.5 },
  { name: 'Chișinău',  x: 124.4, y: 141.1 },
  { name: 'Ungheni',   x: 67.7,  y: 123.5 },
]

// Accurate Moldova silhouette — Mercator-projected from real border coordinates.
// Key features preserved:
//   • Prut river western border (curved, NW to SW)
//   • Dniester eastern border with Transnistria strip (eastern bulge ~29.5–29.7°E)
//   • Narrow southern tip at Giurgiulești (45.47°N)
//   • Vertically elongated shape (N 48.5° → S 45.47°)
const MOLDOVA_PATH =
  'M 5.7,8.3 L 25.8,8.3 L 41.7,11.0 L 57.6,11.0 L 78.8,9.2 L 91.0,9.2 ' +
  'L 102.1,12.0 L 113.2,17.4 L 126.5,28.2 L 143.4,48.8 L 158.3,71.2 ' +
  'L 166.2,93.5 L 169.9,117.4 L 163.6,142.0 L 155.6,166.6 L 145.0,190.1 ' +
  'L 131.8,216.1 L 118.5,239.4 L 106.4,259.2 L 94.7,272.0 L 89.4,274.6 ' +
  'L 83.0,263.5 L 72.5,242.0 L 60.3,218.7 L 48.1,196.2 L 35.4,172.7 ' +
  'L 25.8,146.4 L 17.9,120.0 L 11.0,93.5 L 6.8,66.7 L 5.7,37.2 Z'

// Stagger directions for pin pop-ins — varied per region
const pinPops: { rotate: number; delay: number }[] = [
  { rotate: -12, delay: 0.50 },
  { rotate:  10, delay: 0.62 },
  { rotate:  -8, delay: 0.72 },
  { rotate:  14, delay: 0.55 },
  { rotate: -10, delay: 0.80 },
  { rotate:   7, delay: 0.65 },
]

// Label pill geometry — computed so labels stay inside viewBox
// Each label: rect of width labelW, height 8, rx 4; text centred
function getLabelRect(name: string) {
  const chars = name.length
  const w = Math.max(22, chars * 2.9 + 6)
  return { w, h: 8 }
}

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

        {/* Right: Moldova map — accurate silhouette with Mercator-projected pins */}
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

          <div
            className="map-svg-container"
            style={{ position: 'relative', width: '100%', maxWidth: 340 }}
          >
            {/*
              ViewBox: 0 0 200 280
              Moldova bounding box: lon 26.55–30.25 (3.7°), lat 45.43–48.57 (3.14°)
              Mercator projected. Transnistria bulge is visible on the east side (~x 155–170).
              Southern tip narrows to Giurgiulești at y~274.
            */}
            <svg
              viewBox="0 0 200 284"
              style={{ width: '100%', height: 'auto', overflow: 'visible', display: 'block' }}
              role="img"
              aria-label="Map of Moldova showing 6 programme regions: Edineț, Bălți, Soroca, Orhei, Chișinău, Ungheni"
            >
              {/* Country silhouette — fades in with slight scale */}
              {!prefersReducedMotion ? (
                <motion.path
                  d={MOLDOVA_PATH}
                  fill="var(--color-magenta-tint)"
                  stroke="var(--color-magenta)"
                  strokeOpacity="0.9"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VIEWPORT_ONCE}
                  style={{ transformOrigin: '100px 142px' }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                />
              ) : (
                <path
                  d={MOLDOVA_PATH}
                  fill="var(--color-magenta-tint)"
                  stroke="var(--color-magenta)"
                  strokeOpacity="0.9"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              )}

              {/* Region pins */}
              {regions.map((region, i) => {
                const isActive = activeRegion === region.name
                const pop = pinPops[i]
                const label = getLabelRect(region.name)
                // Clamp label rect so it never clips outside viewBox
                const rectX = Math.min(Math.max(region.x - label.w / 2, 2), 200 - label.w - 2)
                const rectY = region.y - label.h - 7

                return (
                  <g
                    key={region.name}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActiveRegion(region.name)}
                    onMouseLeave={() => setActiveRegion(null)}
                    role="button"
                    aria-label={`Region: ${region.name}`}
                    tabIndex={0}
                    onFocus={() => setActiveRegion(region.name)}
                    onBlur={() => setActiveRegion(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveRegion(isActive ? null : region.name)
                      }
                    }}
                  >
                    {/* Connector stem — draws on enter */}
                    {!prefersReducedMotion ? (
                      <motion.line
                        x1={region.x}
                        y1={region.y - 5}
                        x2={region.x}
                        y2={region.y - label.h - 7}
                        stroke="var(--color-magenta)"
                        strokeWidth="0.5"
                        strokeOpacity="0.55"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={VIEWPORT_ONCE}
                        transition={{ duration: 0.35, ease: EASE_OUT_EXPO, delay: pop.delay + 0.08 }}
                      />
                    ) : (
                      <line
                        x1={region.x}
                        y1={region.y - 5}
                        x2={region.x}
                        y2={region.y - label.h - 7}
                        stroke="var(--color-magenta)"
                        strokeWidth="0.5"
                        strokeOpacity="0.55"
                      />
                    )}

                    {/* Pulse ring — shown on active */}
                    {isActive && !prefersReducedMotion && (
                      <motion.circle
                        cx={region.x}
                        cy={region.y}
                        r={4}
                        fill="none"
                        stroke="var(--color-magenta)"
                        strokeWidth="0.6"
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 3.0, opacity: 0 }}
                        transition={{ duration: 0.85, ease: 'easeOut', repeat: Infinity }}
                        style={{ transformOrigin: `${region.x}px ${region.y}px` }}
                      />
                    )}

                    {/* Pin dot — pops in with rotate overshoot, scales on hover */}
                    {!prefersReducedMotion ? (
                      <motion.circle
                        cx={region.x}
                        cy={region.y}
                        r={4}
                        fill="var(--color-magenta)"
                        fillOpacity={isActive ? 1 : 0.82}
                        initial={{ scale: 0, opacity: 0, rotate: pop.rotate }}
                        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                        viewport={VIEWPORT_ONCE}
                        animate={isActive ? { scale: 1.4 } : { scale: 1 }}
                        transition={
                          isActive
                            ? { type: 'spring' as const, stiffness: 420, damping: 18 }
                            : { type: 'spring' as const, stiffness: 440, damping: 22, delay: pop.delay }
                        }
                        style={{ transformOrigin: `${region.x}px ${region.y}px` }}
                      />
                    ) : (
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r={4}
                        fill="var(--color-magenta)"
                        fillOpacity={isActive ? 1 : 0.82}
                      />
                    )}

                    {/* Pill label — springs up on hover */}
                    {!prefersReducedMotion ? (
                      <motion.g
                        initial={{ opacity: 0.72, y: 0 }}
                        animate={isActive ? { opacity: 1, y: -2 } : { opacity: 0.72, y: 0 }}
                        transition={{ type: 'spring' as const, stiffness: 380, damping: 22 }}
                      >
                        <rect
                          x={rectX}
                          y={rectY}
                          width={label.w}
                          height={label.h}
                          rx={4}
                          fill={isActive ? 'var(--color-magenta)' : 'var(--color-magenta-tint)'}
                          stroke="var(--color-magenta)"
                          strokeWidth="0.4"
                        />
                        <text
                          x={rectX + label.w / 2}
                          y={rectY + 5.6}
                          textAnchor="middle"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '4.2px',
                            fontWeight: 700,
                            fill: isActive ? 'white' : 'var(--color-magenta-dark)',
                            letterSpacing: '0.01em',
                          }}
                        >
                          {region.name}
                        </text>
                      </motion.g>
                    ) : (
                      <g>
                        <rect
                          x={rectX}
                          y={rectY}
                          width={label.w}
                          height={label.h}
                          rx={4}
                          fill={isActive ? 'var(--color-magenta)' : 'var(--color-magenta-tint)'}
                          stroke="var(--color-magenta)"
                          strokeWidth="0.4"
                        />
                        <text
                          x={rectX + label.w / 2}
                          y={rectY + 5.6}
                          textAnchor="middle"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '4.2px',
                            fontWeight: 700,
                            fill: isActive ? 'white' : 'var(--color-magenta-dark)',
                            letterSpacing: '0.01em',
                          }}
                        >
                          {region.name}
                        </text>
                      </g>
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
          /* Map column appears ABOVE criteria list on mobile */
          .map-grid > *:last-child {
            order: -1;
            min-height: 320px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .map-svg-container {
            max-width: 320px !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
