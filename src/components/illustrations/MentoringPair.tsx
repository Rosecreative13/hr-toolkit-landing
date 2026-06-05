/**
 * MentoringPair — mentor (left, standing, pointing) + mentee (right, seated, laptop).
 * Flat geometric style. Palette: --ill-teal shirts, --ill-navy trousers, --ill-amber accents.
 * Used in: Why section.
 */
export default function MentoringPair({ size = 220 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      fill="none"
      aria-label="Mentor and mentee illustration"
      role="img"
    >
      {/* ── MENTEE (right, seated at laptop) ── */}
      {/* Desk */}
      <rect x="112" y="150" width="82" height="8" rx="3" fill="var(--ill-navy)" opacity="0.18" />
      {/* Chair back */}
      <rect x="168" y="120" width="10" height="36" rx="4" fill="var(--ill-navy)" opacity="0.35" />
      {/* Laptop screen */}
      <rect x="128" y="125" width="40" height="26" rx="3" fill="var(--ill-navy)" />
      <rect x="131" y="128" width="34" height="20" rx="2" fill="var(--ill-teal-pale)" />
      {/* Laptop lines on screen */}
      <rect x="134" y="132" width="14" height="2" rx="1" fill="var(--ill-teal)" />
      <rect x="134" y="136" width="20" height="2" rx="1" fill="var(--ill-teal)" opacity="0.5" />
      <rect x="134" y="140" width="10" height="2" rx="1" fill="var(--ill-teal)" opacity="0.3" />
      {/* Laptop base */}
      <rect x="126" y="150" width="44" height="4" rx="2" fill="var(--ill-navy)" />
      {/* Body — torso */}
      <rect x="136" y="105" width="24" height="28" rx="8" fill="var(--ill-teal)" />
      {/* Arms resting on desk */}
      <rect x="124" y="138" width="20" height="9" rx="4" fill="var(--ill-skin)" />
      <rect x="152" y="138" width="16" height="9" rx="4" fill="var(--ill-skin)" />
      {/* Head */}
      <ellipse cx="148" cy="96" rx="13" ry="14" fill="var(--ill-skin)" />
      {/* Hair */}
      <ellipse cx="148" cy="84" rx="13" ry="8" fill="var(--ill-navy)" />
      {/* Eyes */}
      <circle cx="144" cy="95" r="1.8" fill="var(--ill-navy)" />
      <circle cx="152" cy="95" r="1.8" fill="var(--ill-navy)" />
      {/* Smile */}
      <path d="M144 101 Q148 104 152 101" stroke="var(--ill-navy)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Trousers */}
      <rect x="136" y="130" width="10" height="22" rx="4" fill="var(--ill-navy)" />
      <rect x="150" y="130" width="10" height="22" rx="4" fill="var(--ill-navy)" />

      {/* ── MENTOR (left, standing, arm extended pointing) ── */}
      {/* Body — torso */}
      <rect x="44" y="108" width="28" height="38" rx="10" fill="var(--ill-teal-bright)" />
      {/* Left arm — down */}
      <rect x="38" y="112" width="9" height="24" rx="4" fill="var(--ill-skin)" />
      {/* Right arm — extended pointing right */}
      <rect x="71" y="110" width="26" height="9" rx="4" fill="var(--ill-skin)" />
      {/* Pointing hand tip */}
      <circle cx="97" cy="114" r="5" fill="var(--ill-skin)" />
      {/* Collar / collar detail */}
      <rect x="52" y="108" width="12" height="6" rx="3" fill="var(--ill-navy)" opacity="0.25" />
      {/* Trousers */}
      <rect x="44" y="142" width="11" height="30" rx="5" fill="var(--ill-navy)" />
      <rect x="60" y="142" width="11" height="30" rx="5" fill="var(--ill-navy)" />
      {/* Shoes */}
      <ellipse cx="49" cy="172" rx="8" ry="4" fill="var(--ill-navy)" />
      <ellipse cx="66" cy="172" rx="8" ry="4" fill="var(--ill-navy)" />
      {/* Head */}
      <ellipse cx="58" cy="97" rx="16" ry="17" fill="var(--ill-skin-dark)" />
      {/* Hair */}
      <path d="M42 90 Q58 78 74 90 Q74 84 58 80 Q42 84 42 90Z" fill="var(--ill-navy)" />
      {/* Eyes */}
      <circle cx="53" cy="96" r="2" fill="var(--ill-navy)" />
      <circle cx="63" cy="96" r="2" fill="var(--ill-navy)" />
      {/* Eyebrows */}
      <path d="M50 91 Q53 89 56 91" stroke="var(--ill-navy)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M60 91 Q63 89 66 91" stroke="var(--ill-navy)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Smile */}
      <path d="M53 103 Q58 107 63 103" stroke="var(--ill-navy)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* ── Amber sparkle accents ── */}
      {/* Star top-right */}
      <g transform="translate(185, 46)">
        <path d="M0-8 L1.5-1.5 L8 0 L1.5 1.5 L0 8 L-1.5 1.5 L-8 0 L-1.5-1.5Z" fill="var(--ill-amber)" />
      </g>
      {/* Small star mid-left */}
      <g transform="translate(22, 120)">
        <path d="M0-5 L1 -1 L5 0 L1 1 L0 5 L-1 1 L-5 0 L-1-1Z" fill="var(--ill-amber)" opacity="0.7" />
      </g>
      {/* Squiggle between figures */}
      <path d="M100 138 Q104 133 108 138 Q112 143 116 138" stroke="var(--ill-amber)" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Ground shadow */}
      <ellipse cx="68" cy="177" rx="28" ry="5" fill="var(--ill-navy)" opacity="0.08" />
      <ellipse cx="153" cy="158" rx="22" ry="4" fill="var(--ill-navy)" opacity="0.06" />
    </svg>
  )
}
