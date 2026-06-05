/**
 * TwoPeopleTalking — two figures facing each other, speech-bubble implied.
 * Used in: HowItWorks step circles (step 2, 5).
 */
export default function TwoPeopleTalking({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Two people talking"
      role="img"
    >
      {/* Left figure */}
      {/* Head */}
      <ellipse cx="22" cy="20" rx="9" ry="10" fill="var(--ill-skin)" />
      <path d="M13 15 Q22 8 31 15 Q31 10 22 8 Q13 10 13 15Z" fill="var(--ill-navy)" />
      <circle cx="19" cy="20" r="1.4" fill="var(--ill-navy)" />
      <circle cx="25" cy="20" r="1.4" fill="var(--ill-navy)" />
      <path d="M19 25 Q22 27 25 25" stroke="var(--ill-navy)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Torso */}
      <rect x="14" y="32" width="16" height="22" rx="6" fill="var(--ill-teal)" />
      {/* Right arm extended toward right figure */}
      <rect x="29" y="36" width="14" height="7" rx="3.5" fill="var(--ill-skin)" />
      {/* Left arm */}
      <rect x="8" y="35" width="7" height="14" rx="3.5" fill="var(--ill-skin)" />
      {/* Legs */}
      <rect x="14" y="52" width="6" height="18" rx="3" fill="var(--ill-navy)" />
      <rect x="23" y="52" width="6" height="18" rx="3" fill="var(--ill-navy)" />

      {/* Right figure */}
      {/* Head */}
      <ellipse cx="58" cy="20" rx="9" ry="10" fill="var(--ill-skin-dark)" />
      <path d="M49 13 Q58 6 67 13 Q67 8 58 6 Q49 8 49 13Z" fill="var(--ill-amber)" opacity="0.8" />
      <circle cx="55" cy="20" r="1.4" fill="var(--ill-navy)" />
      <circle cx="61" cy="20" r="1.4" fill="var(--ill-navy)" />
      <path d="M55 25 Q58 28 61 25" stroke="var(--ill-navy)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Torso */}
      <rect x="50" y="32" width="16" height="22" rx="6" fill="var(--ill-teal-bright)" />
      {/* Left arm extended toward left figure */}
      <rect x="37" y="36" width="14" height="7" rx="3.5" fill="var(--ill-skin-dark)" />
      {/* Right arm */}
      <rect x="65" y="35" width="7" height="14" rx="3.5" fill="var(--ill-skin-dark)" />
      {/* Legs */}
      <rect x="50" y="52" width="6" height="18" rx="3" fill="var(--ill-navy)" />
      <rect x="60" y="52" width="6" height="18" rx="3" fill="var(--ill-navy)" />

      {/* Small speech dot between them */}
      <circle cx="40" cy="36" r="2.5" fill="var(--ill-amber)" />
      <circle cx="40" cy="29" r="1.5" fill="var(--ill-amber)" opacity="0.6" />
    </svg>
  )
}
