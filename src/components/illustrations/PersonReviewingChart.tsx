/**
 * PersonReviewingChart — figure with a document/chart in hand, looking at it.
 * Used in: HowItWorks step circles (step 6), Receive cards icon.
 */
export default function PersonReviewingChart({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Person reviewing a chart"
      role="img"
    >
      {/* Document / chart */}
      <rect x="32" y="26" width="30" height="38" rx="3" fill="var(--ill-navy-pale)" />
      <rect x="32" y="26" width="30" height="38" rx="3" stroke="var(--ill-navy)" strokeWidth="1.2" />
      {/* Chart bars */}
      <rect x="37" y="46" width="5" height="12" rx="1.5" fill="var(--ill-teal)" />
      <rect x="44" y="40" width="5" height="18" rx="1.5" fill="var(--ill-teal-bright)" />
      <rect x="51" y="44" width="5" height="14" rx="1.5" fill="var(--ill-amber)" />
      {/* Doc title line */}
      <rect x="37" y="31" width="18" height="2.5" rx="1" fill="var(--ill-navy)" opacity="0.4" />
      <rect x="37" y="36" width="12" height="2" rx="1" fill="var(--ill-navy)" opacity="0.25" />

      {/* Person (left, holding doc) */}
      {/* Head */}
      <ellipse cx="19" cy="22" rx="10" ry="11" fill="var(--ill-skin-dark)" />
      <path d="M9 16 Q19 8 29 16 Q29 11 19 9 Q9 11 9 16Z" fill="var(--ill-navy)" />
      <circle cx="15.5" cy="22" r="1.6" fill="var(--ill-navy)" />
      <circle cx="22.5" cy="22" r="1.6" fill="var(--ill-navy)" />
      <path d="M15.5 28 Q19 31 22.5 28" stroke="var(--ill-navy)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* Torso */}
      <rect x="10" y="35" width="20" height="26" rx="7" fill="var(--ill-teal)" />
      {/* Right arm holding doc (toward right) */}
      <rect x="28" y="34" width="18" height="8" rx="4" fill="var(--ill-skin-dark)" />
      {/* Left arm */}
      <rect x="4" y="38" width="8" height="16" rx="4" fill="var(--ill-skin-dark)" />
      {/* Legs */}
      <rect x="10" y="59" width="7" height="16" rx="3.5" fill="var(--ill-navy)" />
      <rect x="21" y="59" width="7" height="16" rx="3.5" fill="var(--ill-navy)" />
    </svg>
  )
}
