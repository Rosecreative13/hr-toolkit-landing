import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import Star from './marks/Star'
import { useMagnetic } from '../lib/motion'

function MagneticCTA() {
  const { t } = useTranslation()
  const { ref, style: magStyle } = useMagnetic(0.28)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.a
      href="#apply"
      ref={ref as React.RefObject<HTMLAnchorElement>}
      className="cta-btn"
      style={{
        ...(magStyle as unknown as React.CSSProperties),
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: '0.8125rem',
        background: 'var(--color-magenta)',
        color: '#fff',
        border: 'none',
        padding: '0.5rem 1.25rem',
        borderRadius: 100,
        cursor: 'pointer',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.04 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      {t('nav.expressInterest')}
    </motion.a>
  )
}

function LangSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { i18n: i18next } = useTranslation()
  const langs = ['RO', 'RU', 'EN'] as const
  const current = i18next.language?.slice(0, 2).toLowerCase()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        ...(mobile
          ? { marginTop: '0.75rem' }
          : {}),
      }}
    >
      {langs.map((lang) => {
        const code = lang.toLowerCase()
        const isActive = current === code
        return (
          <button
            key={lang}
            onClick={() => i18n.changeLanguage(code)}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.75rem',
              padding: '0.25rem 0.625rem',
              borderRadius: 100,
              border: isActive ? 'none' : '1px solid var(--color-border)',
              background: isActive ? 'var(--color-magenta)' : 'transparent',
              color: isActive ? '#fff' : 'var(--color-ink-faint)',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'all 0.18s ease',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-magenta-pale)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              }
            }}
            aria-label={`Switch to ${lang}`}
            aria-pressed={isActive}
          >
            {lang}
          </button>
        )
      })}
    </div>
  )
}

function NavLink({
  label,
  href,
  isActive,
  onClick,
}: {
  label: string
  href: string
  isActive: boolean
  onClick: () => void
}) {
  const prefersReducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: '0.8125rem',
        color: isActive ? '#fff' : 'var(--color-ink-muted)',
        background: isActive ? 'var(--color-magenta)' : 'transparent',
        borderRadius: 100,
        padding: '0.35rem 0.875rem',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        position: 'relative',
      }}
    >
      {label}
      {!isActive && !prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0, originX: '0%' }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            left: '0.875rem',
            right: '0.875rem',
            bottom: 4,
            height: '1.5px',
            background: 'var(--color-magenta)',
            transformOrigin: 'left',
            display: 'block',
          }}
        />
      )}
    </a>
  )
}

export default function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const navLinks = [
    { label: t('nav.programme'), href: '#why' },
    { label: t('nav.forSMEs'), href: '#pains' },
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.faq'), href: '#faq' },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        transition: 'background 0.35s ease, border-color 0.35s ease',
        background: scrolled ? 'rgba(244,242,236,0.96)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 4rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Logo lockup */}
        <a
          href="#"
          aria-label="HR Toolkit Programme home"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
        >
          <Star size={18} color="var(--color-magenta)" points={8} idle="spin" />
          <div style={{ lineHeight: 1.1 }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
              }}
            >
              HR Toolkit
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-faint)',
              }}
            >
              Programme
            </div>
          </div>
        </a>

        {/* Desktop pill nav */}
        <nav aria-label="Main navigation" className="desktop-nav">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: scrolled ? 'var(--color-surface)' : 'rgba(244,242,236,0.55)',
              border: '1px solid var(--color-border)',
              borderRadius: 100,
              padding: '0.25rem',
              gap: '0.125rem',
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                label={link.label}
                href={link.href}
                isActive={activeLink === link.href}
                onClick={() => setActiveLink(link.href)}
              />
            ))}
          </div>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LangSwitcher />
          <MagneticCTA />

          {/* Hamburger */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              width: 28,
            }}
          >
            <span style={{ display: 'block', height: 1.5, background: 'var(--color-ink)', borderRadius: 2, width: '100%', transition: 'all 0.2s ease', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', height: 1.5, background: 'var(--color-ink)', borderRadius: 2, width: '100%', transition: 'all 0.2s ease', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', height: 1.5, background: 'var(--color-ink)', borderRadius: 2, width: '100%', transition: 'all 0.2s ease', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            style={{
              background: 'rgba(244,242,236,0.98)',
              borderTop: '1px solid var(--color-border)',
              padding: '1.5rem clamp(1.25rem, 5vw, 4rem) 2rem',
              backdropFilter: 'blur(12px)',
            }}
          >
            <nav aria-label="Mobile navigation">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: 'var(--color-ink)',
                        display: 'block',
                        padding: '0.25rem 0',
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li style={{ marginTop: '0.5rem' }}>
                  <a
                    href="#apply"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'inline-block',
                      background: 'var(--color-magenta)',
                      color: 'white',
                      fontWeight: 700,
                      padding: '0.625rem 1.5rem',
                      borderRadius: 100,
                    }}
                  >
                    {t('nav.expressInterest')}
                  </a>
                </li>
                <li>
                  <LangSwitcher mobile />
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex; }
        .hamburger-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .cta-btn { display: none !important; }
        }
      `}</style>
    </header>
  )
}
