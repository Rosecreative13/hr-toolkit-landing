/**
 * PersonAtWhiteboard — figure standing beside a board, marker in hand.
 * Used in: HowItWorks step circles (step 3).
 */
export default function PersonAtWhiteboard({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Person at whiteboard"
      role="img"
    >
      {/* Whiteboard */}
      <rect x="8" y="14" width="40" height="34" rx="3" fill="var(--ill-navy-pale)" />
      <rect x="8" y="14" width="40" height="34" rx="3" stroke="var(--ill-navy)" strokeWidth="1.5" />
      {/* Board content lines */}
      <path d="M14 24 L32 24" stroke="var(--ill-teal)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 30 L26 30" stroke="var(--ill-teal)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 36 L36 36" stroke="var(--ill-amber)" strokeWidth="1.8" strokeLinecap="round" />
      {/* Board stand */}
      <line x1="18" y1="48" x2="14" y2="58" stroke="var(--ill-navy)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="48" x2="42" y2="58" stroke="var(--ill-navy)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="58" x2="45" y2="58" stroke="var(--ill-navy)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Person */}
      {/* Head */}
      <ellipse cx="63" cy="22" rx="9" ry="10" fill="var(--ill-skin)" />
      <path d="M54 16 Q63 9 72 16 Q72 11 63 9 Q54 11 54 16Z" fill="var(--ill-teal)" opacity="0.9" />
      <circle cx="60" cy="22" r="1.4" fill="var(--ill-navy)" />
      <circle cx="66" cy="22" r="1.4" fill="var(--ill-navy)" />
      <path d="M60 27 Q63 29 66 27" stroke="var(--ill-navy)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Torso */}
      <rect x="55" y="34" width="16" height="24" rx="6" fill="var(--ill-teal-bright)" />
      {/* Left arm — reaching toward board with marker */}
      <rect x="36" y="30" width="20" height="7" rx="3.5" fill="var(--ill-skin)" />
      {/* Marker */}
      <rect x="30" y="31" width="7" height="3.5" rx="1.5" fill="var(--ill-amber)" />
      <circle cx="29" cy="32.75" r="1.5" fill="var(--ill-amber)" opacity="0.7" />
      {/* Right arm */}
      <rect x="70" y="37" width="7" height="14" rx="3.5" fill="var(--ill-skin)" />
      {/* Legs */}
      <rect x="55" y="56" width="6" height="16" rx="3" fill="var(--ill-navy)" />
      <rect x="65" y="56" width="6" height="16" rx="3" fill="var(--ill-navy)" />
    </svg>
  )
}
