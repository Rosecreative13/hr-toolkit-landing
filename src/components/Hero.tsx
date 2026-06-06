import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Easing } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GridBg from './marks/GridBg'
import Star from './marks/Star'
import Arrow from './marks/Arrow'
import DotGrid from './marks/DotGrid'
import DotTriplet from './marks/DotTriplet'
import CircledWord from './marks/CircledWord'
import RotatingBadge from './marks/RotatingBadge'
import CornerBrackets from './marks/CornerBrackets'
import Marquee from './Marquee'
import { useMagnetic, popRotate, flyInFrom } from '../lib/motion'

const regions = ['Bălți', 'Chișinău', 'Edineț', 'Orhei', 'Soroca', 'Ungheni']

// Verified Unsplash 200 OK
const HERO_PHOTO =
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80&auto=format&fit=crop'

const HERO_ARCH_PATH = 'M 40 434 L 40 174 A 170 170 0 0 1 380 174 L 380 434'
const EASE_OUT_EXPO: Easing = [0.16, 1, 0.3, 1] as [number, number, number, number]

function MagneticButton({ children, style, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { ref, style: magStyle } = useMagnetic(0.3)
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      style={{ ...style, ...magStyle }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring' as const, stiffness: 360, damping: 22 }}
      {...(props as Parameters<typeof motion.button>[0])}
    >
      {children}
    </motion.button>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  // Parallax: marks drift subtly as you scroll away from hero
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const starParallax = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -40])
  const dotParallax = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -20])
  const badgeParallax = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 30])

  // Wipe variants for h1 lines — uneven stagger + skew
  // Negative insets on all sides allow CircledWord SVG to fully overflow line bounds
  const lineVariant = (delay: number, skew = -3) => ({
    hidden: prefersReducedMotion
      ? { clipPath: 'inset(-24px -32px -16px -24px)', skewX: 0 }
      : { clipPath: 'inset(-24px 100% -16px -24px)', skewX: skew },
    visible: {
      clipPath: 'inset(-24px -32px -16px -24px)',
      skewX: 0,
      transition: { duration: 0.72, ease: EASE_OUT_EXPO, delay },
    },
  })

  const eyebrowVariant = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 14 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.05 },
    },
  }

  const subVariant = {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 18 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.44 },
    },
  }

  const ctaVariant = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.56 },
    },
  }

  return (
    <>
      {/* ── HERO ── */}
      <section
        id="hero"
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100dvh',
          background: 'var(--color-paper)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          overflow: 'hidden',
        }}
        className="hero-section"
      >
        <GridBg />
        <CornerBrackets size={32} inset={24} />

        {/* ── LEFT COLUMN ── */}
        <div
          className="hero-left"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: 0,
            padding: 'clamp(7rem, 10vw, 9rem) clamp(1.5rem, 4vw, 4rem) clamp(4rem, 6vw, 5rem) clamp(1.5rem, 6vw, 6rem)',
          }}
        >
          {/* Eyebrow — flies in from below */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={eyebrowVariant}
            style={{ marginBottom: '1.75rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
              <Star size={10} color="var(--color-magenta)" points={8} idle="twinkle" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink-muted)',
                }}
              >
                {t('hero.eyebrow')}
              </span>
            </div>
          </motion.div>

          {/* Headline — per-line mask wipe with uneven skew */}
          <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            <h1
              className="hero-h1"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: 'var(--color-ink)',
                marginBottom: 0,
              }}
            >
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span
                  initial="hidden"
                  animate="visible"
                  variants={lineVariant(0.1, -4)}
                  style={{ display: 'block' }}
                >
                  {t('hero.line1')}
                </motion.span>
              </span>
              <span style={{ display: 'block', overflow: 'visible' }}>
                <motion.span
                  initial="hidden"
                  animate="visible"
                  variants={lineVariant(0.24, -2)}
                  style={{ display: 'block' }}
                >
                  {t('hero.line2')}{' '}
                  <CircledWord inView>{t('hero.line2Circled')}</CircledWord>
                  <span className="hero-heading-comma">,</span>
                </motion.span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span
                  initial="hidden"
                  animate="visible"
                  variants={lineVariant(0.38, -5)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}
                >
                  {t('hero.line3')}
                  <DotTriplet color="var(--color-magenta)" size={7} />
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Subhead — body1 */}
          <motion.p
            className="hero-body"
            initial="hidden"
            animate="visible"
            variants={subVariant}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
              color: 'var(--color-ink-muted)',
              maxWidth: '46ch',
              lineHeight: 1.7,
              marginBottom: '0.875rem',
            }}
          >
            {t('hero.subhead')}
          </motion.p>

          {/* Body2 */}
          <motion.p
            className="hero-body"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.52 } },
            }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
              color: 'var(--color-ink-muted)',
              maxWidth: '46ch',
              lineHeight: 1.7,
              marginBottom: '1.25rem',
            }}
          >
            {t('hero.body2')}
          </motion.p>

          {/* Tagline chip */}
          <motion.div
            className="hero-tagline"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.6 } },
            }}
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.75rem',
              padding: '0.4rem 0.875rem',
              background: 'var(--color-magenta-pale)',
              border: '1px solid var(--color-magenta-tint)',
              borderRadius: 100,
              maxWidth: '100%',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-magenta)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-magenta-dark)', letterSpacing: '0.01em' }}>
              {t('hero.tagline')}
            </span>
          </motion.div>

          {/* Email pill CTA — magnetic button */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ctaVariant}
            style={{ marginBottom: '0.75rem' }}
          >
            <form
              className="hero-form"
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                border: '1.5px solid var(--color-border)',
                borderRadius: 100,
                padding: '0.25rem 0.25rem 0.25rem 1.25rem',
                gap: '0.5rem',
                width: '100%',
                maxWidth: 420,
                boxShadow: '0 2px 12px rgba(22,22,22,0.06)',
              }}
            >
              <label htmlFor="hero-email" className="sr-only">
                {t('hero.emailPlaceholder')}
              </label>
              <input
                id="hero-email"
                type="email"
                placeholder={t('hero.emailPlaceholder')}
                required
                aria-label={t('hero.emailPlaceholder')}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: 'var(--color-ink)',
                  minWidth: 0,
                }}
              />
              <MagneticButton
                type="submit"
                style={{
                  background: 'var(--color-magenta)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 100,
                  padding: '0.6rem 1.25rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>{t('hero.cta')}</span>
                {/* Fill-slide on hover */}
                {!prefersReducedMotion && (
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleX: 0, originX: '0%' }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: 100,
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </MagneticButton>
            </form>
          </motion.div>

          {/* Programme capacity note */}
          <motion.div
            className="hero-note"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE_OUT_EXPO, delay: 0.6 } },
            }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.625rem',
              maxWidth: 460,
              marginBottom: '1.25rem',
            }}
          >
            <Arrow direction="right" length={28} color="var(--color-magenta)" strokeWidth={1.5} drawOn drawDelay={0.65} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                lineHeight: 1.55,
                color: 'var(--color-ink-faint)',
              }}
            >
              {t('hero.note')}
            </span>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO, delay: 0.62 } },
            }}
            style={{ marginBottom: '1.75rem' }}
          >
            <a
              href="#why"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                color: 'var(--color-ink-muted)',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                textDecorationColor: 'var(--color-border)',
                cursor: 'pointer',
              }}
            >
              {t('hero.ctaSecondary')}
            </a>
          </motion.div>

          {/* Arrow + regions hint */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5, delay: 0.68 } },
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}
          >
            <Arrow direction="right" length={40} color="var(--color-magenta)" strokeWidth={1.5} drawOn drawDelay={0.7} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--color-ink-faint)',
                letterSpacing: '0.01em',
              }}
            >
              {regions.join(' · ')}
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — photo + marks ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '7rem 4rem 4rem 2rem',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 'min(420px, 90%)',
            }}
          >
            {/* Arc SVG behind — draws on */}
            <svg
              aria-hidden="true"
              viewBox="0 0 420 520"
              style={{
                position: 'absolute',
                inset: '-10px -10px -10px -10px',
                width: 'calc(100% + 20px)',
                height: 'calc(100% + 20px)',
                zIndex: 0,
              }}
            >
              {/* Fill */}
              <path
                d={HERO_ARCH_PATH}
                fill="var(--color-magenta-tint)"
              />
              {/* Stroked arc that draws on */}
              {!prefersReducedMotion ? (
                <motion.path
                  d={HERO_ARCH_PATH}
                  fill="none"
                  stroke="var(--color-magenta)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.2 }}
                />
              ) : (
                <path
                  d={HERO_ARCH_PATH}
                  fill="none"
                  stroke="var(--color-magenta)"
                  strokeWidth="2"
                />
              )}
            </svg>

            {/* Arch-masked photo — reveals via clip-path diagonal wipe */}
            <motion.div
              initial={prefersReducedMotion ? {} : { clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.32 }}
              whileHover={prefersReducedMotion ? {} : {
                scale: 1.015,
                transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
              }}
              style={{
                position: 'relative',
                zIndex: 1,
                overflow: 'hidden',
                borderRadius: '200px 200px 0 0',
                aspectRatio: '4/5',
                border: '2px solid var(--color-magenta)',
                cursor: 'default',
              }}
            >
              <img
                src={HERO_PHOTO}
                alt={t('hero.imageAlt')}
                fetchPriority="high"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  filter: 'grayscale(1) contrast(1.1)',
                  display: 'block',
                }}
              />
            </motion.div>

            {/* Rotating badge — scroll-velocity coupled + parallax drift */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: -20,
                left: -40,
                zIndex: 3,
                y: badgeParallax,
              }}
              initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring' as const, stiffness: 260, damping: 22, delay: 0.9 }}
            >
              <RotatingBadge size={110} text={t('hero.rotatingBadge')} />
            </motion.div>

            {/* Star top right — pop + rotate overshoot from top-right + parallax */}
            <motion.div
              style={{
                position: 'absolute',
                top: -16,
                right: -16,
                zIndex: 3,
                y: starParallax,
              }}
              initial="hidden"
              animate="visible"
              variants={popRotate(0.7, 12)}
            >
              <Star
                size={32}
                color="var(--color-magenta)"
                points={8}
                idle="twinkle"
              />
            </motion.div>

            {/* DotGrid — fly in from bottom-right + parallax drift */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: 10,
                right: -36,
                zIndex: 3,
                y: dotParallax,
              }}
              initial="hidden"
              animate="visible"
              variants={flyInFrom('diag-right', 0.55)}
            >
              <DotGrid
                cols={4}
                rows={4}
                color="var(--color-magenta)"
                animate
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BELOW-HERO BAND — Marquee regions ── */}
      <div
        style={{
          background: 'var(--color-paper)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          position: 'relative',
          overflow: 'hidden',
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
          {/* Marquee regions strip */}
          <div
            style={{
              padding: '1rem 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Star size={10} color="var(--color-magenta)" points={6} idle="spin" />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: 'var(--color-ink-faint)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              {t('hero.regionsLabel')}:
            </span>
            <Marquee
              items={regions}
              separator=" · "
              speed={55}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--color-ink-muted)',
                fontWeight: 500,
                flex: 1,
              }}
            />
          </div>

          {/* Icon row */}
          <div
            style={{
              padding: '1.25rem 0 1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            {[
              { label: t('hero.icon1') },
              { label: t('hero.icon2') },
              { label: t('hero.icon3') },
              { label: t('hero.icon4') },
            ].map((item, i) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {i > 0 && (
                  <Arrow
                    direction="right"
                    length={24}
                    color="var(--color-border)"
                    strokeWidth={1}
                    style={{ marginRight: '0.5rem' }}
                  />
                )}
                <Star size={12} color="var(--color-magenta)" points={6} idle="twinkle" />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .hero-heading-comma { margin-left: 0.08em; }
        @media (max-width: 768px) {
          .hero-section { grid-template-columns: 1fr !important; min-height: auto !important; }
          .hero-section > div:last-child { display: none !important; }
          .hero-left {
            padding: 5.5rem 1.25rem 3rem 1.25rem !important;
          }
          .hero-h1 {
            font-size: clamp(1.5625rem, 7vw, 2rem) !important;
            word-break: break-word !important;
          }
          .hero-body {
            max-width: 100% !important;
            font-size: 0.9375rem !important;
          }
          .hero-tagline {
            max-width: 100% !important;
          }
          .hero-tagline > span:last-child {
            white-space: normal !important;
            line-height: 1.4 !important;
          }
          .hero-form {
            max-width: 100% !important;
            flex-wrap: wrap !important;
            padding: 0.5rem !important;
          }
          .hero-form input {
            width: 100% !important;
            padding: 0.5rem 0.75rem !important;
            min-height: 2.5rem !important;
          }
          .hero-form button {
            width: 100% !important;
            white-space: normal !important;
            text-align: center !important;
            padding: 0.7rem 1rem !important;
          }
          .hero-note {
            max-width: 100% !important;
          }
        }
      `}</style>
    </>
  )
}
