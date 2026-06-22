import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Star from './marks/Star'
import DotGrid from './marks/DotGrid'
import { flyInFrom, VIEWPORT_ONCE } from '../lib/motion'

const regions = ['Bălți', 'Chișinău', 'Edineț', 'Orhei', 'Soroca', 'Ungheni']
const partnerLogos = [
  {
    src: '/assets/partners/german-cooperation.png',
    altKey: 'footer.partnerAlts.germanCooperation',
    className: 'footer-partner-logo--compact',
  },
  {
    src: '/assets/partners/giz.png',
    altKey: 'footer.partnerAlts.giz',
    className: 'footer-partner-logo--compact',
  },
  {
    src: '/assets/partners/moldova-labour-ministry.png',
    altKey: 'footer.partnerAlts.labourMinistry',
    className: 'footer-partner-logo--wide',
  },
  {
    src: '/assets/partners/employment-agency.png',
    altKey: 'footer.partnerAlts.employmentAgency',
    className: 'footer-partner-logo--wide',
  },
]

function FooterLink({
  children,
  href = '#',
  style,
}: {
  children: React.ReactNode
  href?: string
  style?: React.CSSProperties
}) {
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
        ...style,
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
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: 'var(--color-magenta)',
                    display: 'inline-block',
                    opacity: 0.6,
                    flexShrink: 0,
                  }}
                />
                <FooterLink href="tel:+37379797947">+373 79 797 947</FooterLink>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: 'var(--color-magenta)',
                    display: 'inline-block',
                    opacity: 0.6,
                    flexShrink: 0,
                    marginTop: '0.55rem',
                  }}
                />
                <FooterLink href="mailto:event.smart.hr@gmail.com" style={{ wordBreak: 'break-word' }}>
                  event.smart.hr@gmail.com
                </FooterLink>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Partners */}
        <motion.section
          aria-labelledby="footer-partners-title"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.12 }}
          style={{
            borderTop: '1px solid rgba(255,255,255,0.09)',
            borderBottom: '1px solid rgba(255,255,255,0.09)',
            padding: 'clamp(1.25rem, 3vw, 1.75rem) 0',
            marginBottom: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 0.34fr) minmax(0, 1fr)',
            gap: 'clamp(1.25rem, 4vw, 3rem)',
            alignItems: 'center',
          }}
          className="footer-partners"
        >
          <div>
            <p
              id="footer-partners-title"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                marginBottom: '0.625rem',
              }}
            >
              {t('footer.partnersLabel')}
            </p>
          </div>
          <div
            style={{
              minWidth: 0,
            }}
            className="footer-partners-grid"
          >
            {partnerLogos.map((logo) => (
              <div className="footer-partner-tile" key={logo.src}>
                <img
                  src={logo.src}
                  alt={t(logo.altKey)}
                  loading="lazy"
                  decoding="async"
                  className={`footer-partner-logo ${logo.className}`}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Bottom bar */}
        <div
          className="footer-bottom"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem 2rem',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.2)' }}>
            {t('footer.copyright')}
          </p>
          <div className="footer-legal-stack">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.2)' }}>
              {t('footer.participationNote')}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.2)' }}>
              {t('footer.supportPrefix')}{' '}
              <a
                href="https://claro.md"
                target="_blank"
                rel="noreferrer"
                className="footer-support-link"
              >
                Claro Plus
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link-hover { color: rgba(255,255,255,0.75) !important; }
        .footer-legal-stack {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          align-items: flex-end;
          text-align: right;
        }
        .footer-support-link {
          color: var(--color-magenta);
          text-decoration: none;
          font-weight: 700;
          transition: color 0.18s ease, opacity 0.18s ease;
        }
        .footer-support-link:hover {
          color: var(--color-magenta-light);
        }
        .footer-support-link:focus-visible {
          outline: 2px solid var(--color-magenta);
          outline-offset: 3px;
          border-radius: 2px;
        }
        .footer-partners-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(240px, 1fr));
          gap: 0.75rem;
        }
        .footer-partner-tile {
          min-width: 0;
          min-height: 132px;
          background: rgba(0,0,0,0.24);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          padding: clamp(0.875rem, 1.8vw, 1.25rem);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-partner-logo {
          display: block;
          width: auto;
          max-width: 100%;
          height: auto;
          max-height: 88px;
          object-fit: contain;
        }
        .footer-partner-logo--compact {
          max-width: 260px;
        }
        .footer-partner-logo--wide {
          max-width: 390px;
        }
        @media (max-width: 760px) {
          .footer-partners {
            grid-template-columns: 1fr !important;
            align-items: start !important;
          }
          .footer-partners-grid {
            grid-template-columns: 1fr;
            gap: 0.625rem;
          }
          .footer-partner-tile {
            min-height: 116px;
            padding: 0.875rem 1rem;
          }
          .footer-partner-logo {
            max-height: 80px;
          }
          .footer-partner-logo--compact,
          .footer-partner-logo--wide {
            max-width: 300px;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 0.75rem !important;
          }
          .footer-legal-stack {
            align-items: flex-start;
            text-align: left;
          }
        }
      `}</style>
    </footer>
  )
}
