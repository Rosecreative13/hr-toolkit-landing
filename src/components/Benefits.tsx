import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GridBg from './marks/GridBg'
import Star from './marks/Star'
import Arrow from './marks/Arrow'
import DotGrid from './marks/DotGrid'
import Blob from './illustrations/Blob'
import MentoringPair from './illustrations/MentoringPair'
import TwoPeopleTalking from './illustrations/TwoPeopleTalking'
import { scatterIn, VIEWPORT_ONCE } from '../lib/motion'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number]

type BenefitSectionProps = {
  id: string
  eyebrow: string
  heading: string
  subhead: string
  items: string[]
  note: string
  accent: 'teal' | 'amber'
  illustration: ReactNode
  reverse?: boolean
}

function BenefitSection({
  id,
  eyebrow,
  heading,
  subhead,
  items,
  note,
  accent,
  illustration,
  reverse = false,
}: BenefitSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const isTeal = accent === 'teal'
  const accentColor = isTeal ? 'var(--ill-teal)' : 'var(--ill-amber)'
  const accentTint = isTeal ? 'var(--ill-teal-pale)' : 'var(--ill-amber-pale)'
  const accentBorder = isTeal ? 'var(--ill-teal)' : 'var(--ill-amber)'
  const noteText = isTeal ? 'var(--color-ink)' : 'var(--color-ink)'

  return (
    <section
      id={id}
      style={{
        background: isTeal ? 'var(--color-surface)' : 'var(--color-paper)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(2.5rem, 6vw, 5rem) 0',
      }}
    >
      <GridBg style={{ opacity: isTeal ? 0.34 : 0.3 }} />
      <DotGrid
        cols={4}
        rows={4}
        color={accentColor}
        animate
        style={{
          position: 'absolute',
          top: 56,
          right: reverse ? 'auto' : 56,
          left: reverse ? 56 : 'auto',
          zIndex: 1,
          opacity: 0.22,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 4rem)',
        }}
      >
        <motion.div
          initial={prefersReducedMotion ? {} : { scaleX: 0, originX: '0%' }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          style={{ height: 1, background: 'var(--color-border)', marginBottom: 'clamp(3rem, 6vw, 5rem)', transformOrigin: 'left' }}
        />

        <div
          className={`benefits-grid ${reverse ? 'benefits-grid--reverse' : ''}`}
          style={{
            display: 'grid',
            // Text column must always be the wide track. With `reverse`, the
            // illustration (order:1) auto-places into col 1, so col 1 must be
            // the narrow track and col 2 (text, order:2) the wide one.
            gridTemplateColumns: reverse
              ? 'minmax(280px, 0.42fr) minmax(0, 1fr)'
              : 'minmax(0, 1fr) minmax(280px, 0.42fr)',
            gap: 'clamp(2rem, 6vw, 5rem)',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            style={{ order: reverse ? 2 : 1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
              <Star size={12} color={accentColor} points={8} idle="twinkle" />
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
                {eyebrow}
              </span>
            </div>

            <motion.h2
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(2.25rem, 4.4vw, 3.5rem)',
                lineHeight: 1.03,
                letterSpacing: 0,
                color: 'var(--color-ink)',
                marginBottom: '0.5rem',
                maxWidth: '18ch',
              }}
            >
              {heading}
            </motion.h2>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1], delay: 0.12 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}
            >
              <Arrow direction="right" length={40} color={accentColor} strokeWidth={1.5} drawOn drawDelay={0.2} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: 'var(--color-ink-muted)',
                  lineHeight: 1.7,
                  maxWidth: '46ch',
                }}
              >
                {subhead}
              </span>
            </motion.div>

            <ul
              className="benefits-list"
              style={{
                listStyle: 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '0.75rem',
              }}
            >
              {items.map((item, i) => {
                const scatter = scatterIn(i)
                return (
                  <motion.li
                    key={item}
                    variants={scatter}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-6%' }}
                    whileHover={prefersReducedMotion ? {} : { y: -2, x: 2, transition: { duration: 0.18, ease: [0.25, 1, 0.5, 1] } }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.9rem 1rem',
                      border: `1px solid ${isTeal ? 'var(--ill-teal)' : 'var(--ill-amber)'}`,
                      background: accentTint,
                      minHeight: 72,
                      minWidth: 0,
                    }}
                  >
                    <Star size={10} color={accentColor} points={8} idle="twinkle" style={{ flexShrink: 0, marginTop: 4 }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: noteText,
                        lineHeight: 1.55,
                        minWidth: 0,
                        overflowWrap: 'break-word',
                      }}
                    >
                      {item}
                    </span>
                  </motion.li>
                )
              })}
            </ul>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.18 }}
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.25rem',
                border: `1.5px solid ${accentBorder}`,
                background: accentTint,
              }}
            >
              <Star size={14} color={accentColor} points={8} idle="twinkle" />
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(0.9375rem, 1.25vw, 1.0625rem)',
                  color: 'var(--color-ink)',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {note}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: reverse ? -26 : 26, rotate: reverse ? -2 : 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{
              opacity: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
              x: { type: 'spring' as const, stiffness: 220, damping: 24 },
              rotate: { type: 'spring' as const, stiffness: 180, damping: 24 },
            }}
            style={{
              order: reverse ? 1 : 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 'min(100%, 420px)',
                minHeight: 420,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Blob
                size={320}
                color={accentTint}
                float
                style={{
                  border: `1.5px solid ${accentBorder}`,
                  boxShadow: `6px 6px 0 ${isTeal ? 'rgba(31,168,160,0.12)' : 'rgba(245,166,35,0.14)'}`,
                }}
              >
                {illustration}
              </Blob>

              <DotGrid
                cols={3}
                rows={3}
                color={accentColor}
                animate
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 18,
                  opacity: 0.25,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .benefits-grid {
            grid-template-columns: 1fr !important;
          }
          .benefits-grid--reverse {
            grid-template-columns: 1fr !important;
          }
          .benefits-list {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .benefits-grid {
            gap: 1.75rem !important;
          }
        }
      `}</style>
    </section>
  )
}

export function BenefitsSME() {
  const { t } = useTranslation()

  return (
    <BenefitSection
      id="benefits-sme"
      eyebrow={t('benefitsSME.eyebrow')}
      heading={t('benefitsSME.heading')}
      subhead={t('benefitsSME.subhead')}
      items={[
        t('benefitsSME.item1'),
        t('benefitsSME.item2'),
        t('benefitsSME.item3'),
        t('benefitsSME.item4'),
        t('benefitsSME.item5'),
        t('benefitsSME.item6'),
        t('benefitsSME.item7'),
        t('benefitsSME.item8'),
        t('benefitsSME.item9'),
        t('benefitsSME.item10'),
      ]}
      note={t('benefitsSME.note')}
      accent="teal"
      illustration={<MentoringPair size={210} />}
    />
  )
}

export function BenefitsYouth() {
  const { t } = useTranslation()

  return (
    <BenefitSection
      id="benefits-youth"
      eyebrow={t('benefitsYouth.eyebrow')}
      heading={t('benefitsYouth.heading')}
      subhead={t('benefitsYouth.subhead')}
      items={[
        t('benefitsYouth.item1'),
        t('benefitsYouth.item2'),
        t('benefitsYouth.item3'),
        t('benefitsYouth.item4'),
        t('benefitsYouth.item5'),
        t('benefitsYouth.item6'),
        t('benefitsYouth.item7'),
      ]}
      note={t('benefitsYouth.note')}
      accent="amber"
      reverse
      illustration={<TwoPeopleTalking size={210} />}
    />
  )
}
