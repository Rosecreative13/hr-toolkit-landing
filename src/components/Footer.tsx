import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Star from './marks/Star'
import Arrow from './marks/Arrow'
import DotGrid from './marks/DotGrid'
import { flyInFrom, VIEWPORT_ONCE } from '../lib/motion'

const regions = ['Bălți', 'Chișinău', 'Edineț', 'Orhei', 'Soroca', 'Ungheni']

function FooterLink({ children, href = '#' }: { children: React.ReactNode; href?: string }) {
  const [hovered, setHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.875rem',
        color: 'rgba(255,255,255,0.45)',
        display: 'inline-block',
        textDecoration: 'none',
        position: 'relative',
        transition: 'color 0.2s ease',
      }}
      className={hovered ? 'footer-link-hover' : ''}
    >
      {children}
      {/* Hand-drawn underline on hover */}
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0, originX: '0%' }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -2,
            height: '1px',
            background: 'var(--color-magenta)',
            transformOrigin: 'left',
            display: 'block',
          }}
        />
      )}
    </a>
  )
}

export default function Footer() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  return (
    <footer
      style={{
        background: 'var(--color-ink)',
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
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* DotGrid — drifts in from right */}
      <motion.div
        style={{ position: 'absolute', top: 40, right: 60, zIndex: 1 }}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={flyInFrom('right', 0.2)}
      >
        <DotGrid
          cols={4}
          rows={4}
          color="var(--color-magenta)"
          style={{ opacity: 0.2 }}
        />
      </motion.div>

      {/* Tagline strip */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: 'clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.25rem, 5vw, 4rem)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <Arrow direction="right" length={28} color="var(--color-magenta)" strokeWidth={1.5} />
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('footer.tagline')}
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand — star spins slowly */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
              {/* Star that spins slowly on hover */}
              <motion.div
                whileHover={prefersReducedMotion ? {} : {
                  rotate: 360,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <Star size={16} color="var(--color-magenta)" points={8} />
              </motion.div>
              <div style={{ lineHeight: 1.1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#fff',
                  }}
                >
                  HR Toolkit
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: '0.625rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  Programme
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 1.65,
                maxWidth: '26ch',
              }}
            >
              {t('footer.description')}
            </p>
          </motion.div>

          {/* Regions — staggered fly in */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.08 }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                marginBottom: '1rem',
              }}
            >
              {t('footer.regionsLabel')}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {regions.map((r, i) => (
                <motion.li
                  key={r}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1], delay: 0.1 + i * 0.04 }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: 'var(--color-magenta)',
                      display: 'inline-block',
                      opacity: 0.6,
                    }}
                  />
                  <FooterLink>{r}</FooterLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.14 }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                marginBottom: '1rem',
              }}
            >
              {t('footer.contactLabel')}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.3)',
                fontStyle: 'italic',
              }}
            >
              {t('footer.contactPending')}
            </p>
          </motion.div>

          {/* Partners */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                marginBottom: '1rem',
              }}
            >
              {t('footer.partnersLabel')}
            </p>
            <div
              style={{
                width: 120,
                height: 40,
                border: '1px dashed rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
              }}
            >
              <Star size={10} color="rgba(255,255,255,0.2)" points={6} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.2)',
                  fontStyle: 'italic',
                }}
              >
                {t('footer.partnerLogo')}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.2)' }}>
            {t('footer.copyright')}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.2)' }}>
            {t('footer.participationNote')}
          </p>
        </div>
      </div>

      <style>{`
        .footer-link-hover { color: rgba(255,255,255,0.75) !important; }
      `}</style>
    </footer>
  )
}
