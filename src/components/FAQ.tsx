import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GridBg from './marks/GridBg'
import Star from './marks/Star'
import CircledWord from './marks/CircledWord'
import { circledHeadingClipHidden, circledHeadingClipVisible, faqContentVariants, scatterIn, VIEWPORT_ONCE } from '../lib/motion'


function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const scatter = scatterIn(index)

  return (
    <motion.div
      variants={scatter}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      whileHover={prefersReducedMotion ? {} : {
        y: open ? 0 : -2,
        transition: { duration: 0.18, ease: [0.25, 1, 0.5, 1] },
      }}
      style={{
        background: 'var(--color-paper-card)',
        border: '1.5px solid var(--color-border)',
        marginBottom: '0.5rem',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          padding: '1.125rem 1.375rem',
          background: open ? 'var(--color-magenta-pale)' : 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.2s ease',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)',
            color: 'var(--color-ink)',
            lineHeight: 1.35,
            letterSpacing: '-0.015em',
          }}
        >
          {faq.question}
        </span>

        {/* +/× toggle — animates bg + border, vertical bar rotates 45deg on open */}
        <motion.span
          aria-hidden="true"
          animate={prefersReducedMotion ? {} : {
            background: open ? 'var(--color-magenta)' : 'transparent',
            borderColor: open ? 'var(--color-magenta)' : 'var(--color-border)',
            rotate: open ? 45 : 0,
          }}
          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
          style={{
            width: 28,
            height: 28,
            border: `1.5px solid`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: 'relative',
              width: 12,
              height: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Cross (+ becomes × via parent rotate) */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <line x1="2" y1="6" x2="10" y2="6" stroke={open ? 'white' : 'var(--color-magenta)'} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6" y1="2" x2="6" y2="10" stroke={open ? 'white' : 'var(--color-magenta)'} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        </motion.span>
      </button>

      {/* Answer — spring open + clip reveal */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            variants={faqContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.75,
                padding: '0 1.375rem 1.375rem',
                margin: 0,
                maxWidth: '68ch',
              }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
    { question: t('faq.q7'), answer: t('faq.a7') },
    { question: t('faq.q8'), answer: t('faq.a8') },
  ]

  return (
    <section
      id="faq"
      style={{
        background: 'var(--color-surface)',
        paddingTop: 'clamp(2.5rem, 6vw, 5rem)',
        paddingBottom: 'clamp(2.5rem, 6vw, 5rem)',
        position: 'relative',
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

        {/* Header — left */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}
          >
            <Star size={12} color="var(--color-magenta)" points={8} idle="twinkle" />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.6875rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-faint)',
              }}
            >
              {t('faq.eyebrow')}
            </span>
          </motion.div>
          <div style={{ overflow: 'visible' }}>
            <motion.h2
              className="circled-heading"
              initial={prefersReducedMotion ? {} : circledHeadingClipHidden(-2)}
              animate={circledHeadingClipVisible}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                color: 'var(--color-ink)',
              }}
            >
              {t('faq.heading')}{' '}
              <CircledWord inView>{t('faq.headingCircled')}</CircledWord>
            </motion.h2>
          </div>
        </div>

        {/* Accordion — items scatter in with per-index variety */}
        <div style={{ maxWidth: 860 }}>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--color-ink-faint)',
            marginTop: '1.5rem',
          }}
        >
          {t('faq.footerNote')}
        </motion.p>
      </div>
    </section>
  )
}
