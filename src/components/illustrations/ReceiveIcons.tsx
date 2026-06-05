/**
 * Receive section mini-icons — 9 flat 2-color SVG icons (teal + navy).
 * One per deliverable card. All 36×36 viewBox.
 */

interface IconProps {
  size?: number
}

export function IconToolkit({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="28" height="20" rx="3" fill="var(--ill-teal-pale)" stroke="var(--ill-teal)" strokeWidth="1.5" />
      <rect x="14" y="6" width="8" height="6" rx="2" fill="var(--ill-navy)" />
      <rect x="10" y="18" width="16" height="3" rx="1.5" fill="var(--ill-teal)" />
      <rect x="10" y="23" width="10" height="3" rx="1.5" fill="var(--ill-navy)" opacity="0.4" />
    </svg>
  )
}

export function IconTemplate({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="6" y="5" width="24" height="26" rx="3" fill="var(--ill-navy-pale)" stroke="var(--ill-navy)" strokeWidth="1.5" />
      <rect x="11" y="11" width="14" height="2.5" rx="1" fill="var(--ill-teal)" />
      <rect x="11" y="16" width="10" height="2" rx="1" fill="var(--ill-navy)" opacity="0.35" />
      <rect x="11" y="20" width="12" height="2" rx="1" fill="var(--ill-navy)" opacity="0.25" />
      <rect x="11" y="24" width="8" height="2" rx="1" fill="var(--ill-navy)" opacity="0.2" />
    </svg>
  )
}

export function IconInterview({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      {/* Two speech bubbles */}
      <rect x="4" y="8" width="18" height="12" rx="4" fill="var(--ill-teal-pale)" stroke="var(--ill-teal)" strokeWidth="1.5" />
      <path d="M8 20 L6 24 L13 20" fill="var(--ill-teal-pale)" stroke="var(--ill-teal)" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="14" y="18" width="18" height="12" rx="4" fill="var(--ill-navy-pale)" stroke="var(--ill-navy)" strokeWidth="1.5" />
      <path d="M28 30 L30 34 L22 30" fill="var(--ill-navy-pale)" stroke="var(--ill-navy)" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Lines inside bubbles */}
      <rect x="8" y="12" width="10" height="2" rx="1" fill="var(--ill-teal)" />
      <rect x="18" y="22" width="10" height="2" rx="1" fill="var(--ill-navy)" opacity="0.5" />
    </svg>
  )
}

export function IconChecklist({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="26" height="26" rx="3" fill="var(--ill-navy-pale)" stroke="var(--ill-navy)" strokeWidth="1.5" />
      {[10, 16, 22].map((y, i) => (
        <g key={y}>
          <rect x="10" y={y} width="6" height="5" rx="1.5" fill={i < 2 ? 'var(--ill-teal)' : 'var(--ill-navy-pale)'} stroke="var(--ill-teal)" strokeWidth="1" />
          {i < 2 && <path d={`M${11} ${y + 2.5} L${13} ${y + 4} L${15} ${y + 1.5}`} stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
          <rect x="19" y={y + 1} width="10" height="3" rx="1" fill="var(--ill-navy)" opacity={i < 2 ? 0.35 : 0.18} />
        </g>
      ))}
    </svg>
  )
}

export function IconGuide({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      {/* Open book */}
      <path d="M18 8 L6 10 L6 28 L18 26 L30 28 L30 10 Z" fill="var(--ill-navy-pale)" />
      <line x1="18" y1="8" x2="18" y2="26" stroke="var(--ill-navy)" strokeWidth="1.5" />
      <rect x="6" y="10" width="12" height="16" rx="1" fill="var(--ill-teal-pale)" />
      <rect x="18" y="10" width="12" height="16" rx="1" fill="var(--ill-navy-pale)" />
      <rect x="9" y="14" width="7" height="2" rx="1" fill="var(--ill-teal)" />
      <rect x="9" y="18" width="5" height="2" rx="1" fill="var(--ill-navy)" opacity="0.3" />
      <rect x="21" y="14" width="7" height="2" rx="1" fill="var(--ill-navy)" opacity="0.4" />
      <rect x="21" y="18" width="5" height="2" rx="1" fill="var(--ill-navy)" opacity="0.25" />
    </svg>
  )
}

export function IconFeedback({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      {/* Bar chart going up */}
      <rect x="5" y="22" width="7" height="10" rx="2" fill="var(--ill-teal)" opacity="0.6" />
      <rect x="15" y="15" width="7" height="17" rx="2" fill="var(--ill-teal)" />
      <rect x="25" y="9" width="7" height="23" rx="2" fill="var(--ill-navy)" />
      {/* Arrow going up-right */}
      <path d="M7 20 L20 10 L29 8" stroke="var(--ill-amber)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="29" cy="8" r="2.5" fill="var(--ill-amber)" />
    </svg>
  )
}

export function IconWorkshop({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      {/* Lightbulb */}
      <path d="M18 6 C12 6 8 11 8 16 C8 20 11 23 13 25 L13 28 L23 28 L23 25 C25 23 28 20 28 16 C28 11 24 6 18 6Z" fill="var(--ill-amber)" opacity="0.85" />
      <rect x="13" y="28" width="10" height="3" rx="1.5" fill="var(--ill-navy)" opacity="0.4" />
      <rect x="14" y="31" width="8" height="2" rx="1" fill="var(--ill-navy)" opacity="0.3" />
      <line x1="15" y1="20" x2="21" y2="20" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="17" x2="18" y2="23" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconMentoring({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      {/* Two heads — mentor + mentee */}
      <circle cx="13" cy="13" r="7" fill="var(--ill-teal-pale)" stroke="var(--ill-teal)" strokeWidth="1.5" />
      <circle cx="25" cy="13" r="5" fill="var(--ill-navy-pale)" stroke="var(--ill-navy)" strokeWidth="1.5" />
      {/* Connection line */}
      <path d="M19 13 Q22 10 22 13" stroke="var(--ill-amber)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Bodies */}
      <path d="M6 30 Q6 24 13 24 Q20 24 20 30" fill="var(--ill-teal)" opacity="0.7" />
      <path d="M20 30 Q20 26 25 26 Q30 26 30 30" fill="var(--ill-navy)" opacity="0.5" />
    </svg>
  )
}

export function IconPeerLearning({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      {/* Three circles connected */}
      <circle cx="18" cy="8" r="5" fill="var(--ill-teal)" opacity="0.8" />
      <circle cx="8" cy="26" r="5" fill="var(--ill-navy)" opacity="0.7" />
      <circle cx="28" cy="26" r="5" fill="var(--ill-teal-bright)" opacity="0.7" />
      {/* Connecting lines */}
      <line x1="14" y1="12" x2="11" y2="22" stroke="var(--ill-amber)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="12" x2="25" y2="22" stroke="var(--ill-amber)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="26" x2="23" y2="26" stroke="var(--ill-amber)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
