import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import GridBg from './marks/GridBg'
import Star from './marks/Star'
import Arrow from './marks/Arrow'
import DotGrid from './marks/DotGrid'
import { VIEWPORT_ONCE } from '../lib/motion'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

const regions: { name: string; lat: number; lng: number }[] = [
  { name: 'Edineț',   lat: 47.93, lng: 27.30 },
  { name: 'Bălți',    lat: 47.76, lng: 27.93 },
  { name: 'Soroca',   lat: 48.16, lng: 28.30 },
  { name: 'Orhei',    lat: 47.38, lng: 28.82 },
  { name: 'Chișinău', lat: 47.01, lng: 28.86 },
  { name: 'Ungheni',  lat: 47.21, lng: 27.79 },
]

// ── Custom DivIcon: cobalt circle 14px + white inner dot + pill label ──
function makeIcon(name: string, active: boolean): L.DivIcon {
  const ring = active
    ? `<span class="map-pin-ring"></span>`
    : ''
  return L.divIcon({
    className: '',
    iconAnchor: [10, 10],
    popupAnchor: [0, -14],
    html: `
      <div class="map-pin-wrap" aria-label="${name}">
        ${ring}
        <div class="map-pin-dot${active ? ' map-pin-dot--active' : ''}">
          <div class="map-pin-inner"></div>
        </div>
        <div class="map-pin-label">${name}</div>
      </div>
    `,
  })
}

// Re-render markers on active change by forcing key change in parent,
// but we need to update icons imperatively. Use a small bridge component.
function MarkerLayer({
  activeRegion,
  setActiveRegion,
  popupSub,
}: {
  activeRegion: string | null
  setActiveRegion: (n: string | null) => void
  popupSub: string
}) {
  // Access map instance (needed so Popup opens on marker click)
  useMap()

  return (
    <>
      {regions.map((r) => {
        const isActive = activeRegion === r.name
        const icon = makeIcon(r.name, isActive)

        return (
          <Marker
            key={r.name}
            position={[r.lat, r.lng]}
            icon={icon}
            eventHandlers={{
              mouseover: () => setActiveRegion(r.name),
              mouseout: () => setActiveRegion(null),
              click: () => setActiveRegion(isActive ? null : r.name),
            }}
          >
            <Popup
              closeButton={false}
              className="map-popup"
              offset={[0, -6]}
            >
              <div className="map-popup-inner">
                <div className="map-popup-accent" />
                <span className="map-popup-name">{r.name}</span>
                <span className="map-popup-sub">{popupSub}</span>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}

export default function Map() {
  const { t } = useTranslation()
  const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const criteria = [
    t('map.criteria1'),
    t('map.criteria2'),
    t('map.criteria3'),
    t('map.criteria4'),
    t('map.criteria5'),
    t('map.criteria6'),
    t('map.criteria7'),
  ]

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0)
    return () => window.clearTimeout(timer)
  }, [])

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
              {t('map.heading')}{' '}
              <span style={{ color: 'var(--color-magenta)' }}>{t('map.headingColored')}</span>
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
            {t('map.subhead')}
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

          {/* Disclaimer */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'var(--color-ink-faint)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              padding: '0.75rem 1rem',
              background: 'var(--color-paper-card)',
              border: '1px solid var(--color-border)',
              borderLeft: '3px solid var(--color-magenta-tint)',
            }}
          >
            {t('map.disclaimer')}
          </motion.p>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
            {[t('map.tag1'), t('map.tag2'), t('map.tag3')].map((tag, i) => (
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

        {/* Right: Live Leaflet map */}
        <div className="map-col">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Decorative marks */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={{
                hidden: { opacity: 0, x: 12, y: -12 },
                visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
              }}
              style={{ position: 'absolute', top: -10, left: -10, zIndex: 10 }}
            >
              <Arrow
                direction="down-right"
                length={30}
                color="var(--color-magenta)"
                strokeWidth={1.5}
                style={{ opacity: 0.5 }}
              />
            </motion.div>

            {/* Map container */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay: 0.08 }}
              className="map-leaflet-wrap"
            >
              {mounted ? (
                <MapContainer
                  center={[47.2, 28.5]}
                  zoom={7}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  touchZoom={true}
                  zoomControl={true}
                  maxBounds={[[45.3, 26.4], [48.6, 30.3]]}
                  maxBoundsViscosity={0.85}
                  style={{ width: '100%', height: '100%', background: '#F4F2EC' }}
                  attributionControl={false}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    subdomains={['a', 'b', 'c', 'd']}
                    maxZoom={19}
                    detectRetina={true}
                  />
                  <MarkerLayer
                    activeRegion={activeRegion}
                    setActiveRegion={setActiveRegion}
                    popupSub={t('map.popupSub')}
                  />
                </MapContainer>
              ) : (
                <div className="map-placeholder" />
              )}
            </motion.div>

            {/* Attribution (OSM license requirement) */}
            <p className="map-attribution">
              {t('map.attributionPrefix')} &copy;{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenStreetMap
              </a>{' '}
              {t('map.attributionSuffix')}, CartoDB
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ── Layout ── */
        @media (max-width: 768px) {
          .map-grid {
            grid-template-columns: 1fr !important;
          }
          .map-col {
            order: -1;
          }
        }

        /* ── Map wrapper sizing ── */
        .map-leaflet-wrap {
          width: 100%;
          height: 420px;
          border: 1.5px solid var(--color-border);
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        @media (max-width: 1024px) {
          .map-leaflet-wrap { height: 380px; }
        }
        @media (max-width: 768px) {
          .map-leaflet-wrap { height: 320px; }
        }

        .map-placeholder {
          width: 100%;
          height: 100%;
          background: var(--color-paper);
        }

        /* ── Attribution ── */
        .map-attribution {
          margin-top: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.6875rem;
          color: var(--color-ink-faint);
          line-height: 1.4;
        }
        .map-attribution a {
          color: var(--color-ink-faint);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .map-attribution a:hover {
          color: var(--color-magenta);
        }

        /* ── Leaflet zoom control override ── */
        .leaflet-control-zoom {
          border: 1.5px solid var(--color-border) !important;
          border-radius: 8px !important;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06) !important;
        }
        .leaflet-control-zoom a {
          background: var(--color-paper-card) !important;
          color: var(--color-ink) !important;
          border-color: var(--color-border) !important;
          font-family: var(--font-body) !important;
          font-size: 16px !important;
          line-height: 26px !important;
          width: 28px !important;
          height: 28px !important;
        }
        .leaflet-control-zoom a:hover {
          background: var(--color-magenta-pale) !important;
          color: var(--color-magenta) !important;
        }

        /* ── Popup override ── */
        .leaflet-popup-content-wrapper {
          background: var(--color-paper-card) !important;
          border: 1.5px solid var(--color-border) !important;
          border-radius: 10px !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important;
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          line-height: 1 !important;
        }
        .leaflet-popup-tip-container {
          display: none !important;
        }
        .map-popup-inner {
          display: flex;
          flex-direction: column;
          padding: 10px 14px;
          gap: 2px;
          position: relative;
          overflow: hidden;
        }
        .map-popup-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--color-magenta);
          border-radius: 2px 0 0 2px;
        }
        .map-popup-name {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--color-ink);
          padding-left: 4px;
        }
        .map-popup-sub {
          font-family: var(--font-body);
          font-size: 0.6875rem;
          color: var(--color-ink-faint);
          padding-left: 4px;
        }

        /* ── Custom marker pin ── */
        .map-pin-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 20px;
        }
        .map-pin-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #2A4FE0;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 4px rgba(42,79,224,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.18s ease;
          position: relative;
          z-index: 2;
        }
        .map-pin-dot--active {
          background: #1B36AE;
          transform: scale(1.25);
        }
        .map-pin-inner {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.85);
        }
        .map-pin-label {
          margin-top: 3px;
          background: #2A4FE0;
          color: #ffffff;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 9px;
          font-weight: 700;
          line-height: 1;
          padding: 2px 5px 3px;
          border-radius: 100px;
          white-space: nowrap;
          letter-spacing: 0.01em;
          box-shadow: 0 1px 3px rgba(42,79,224,0.25);
          pointer-events: none;
          position: relative;
          z-index: 2;
        }

        /* ── Pulse ring (active marker) ── */
        .map-pin-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid #2A4FE0;
          animation: pin-pulse 1.2s ease-out infinite;
          z-index: 1;
        }
        @keyframes pin-pulse {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .map-pin-ring { animation: none; }
        }
      `}</style>
    </section>
  )
}
