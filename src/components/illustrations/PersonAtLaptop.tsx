/**
 * PersonAtLaptop — seated figure working at a laptop, front-facing.
 * Used in: HowItWorks step circles (steps 1, 4).
 */
export default function PersonAtLaptop({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Person at laptop"
      role="img"
    >
      {/* Desk */}
      <rect x="12" y="58" width="56" height="5" rx="2" fill="var(--ill-navy)" opacity="0.2" />
      {/* Laptop screen */}
      <rect x="22" y="40" width="36" height="20" rx="2" fill="var(--ill-navy)" />
      <rect x="24" y="42" width="32" height="16" rx="1" fill="var(--ill-teal-pale)" />
      <rect x="27" y="45" width="10" height="2" rx="1" fill="var(--ill-teal)" />
      <rect x="27" y="49" width="18" height="2" rx="1" fill="var(--ill-teal)" opacity="0.5" />
      {/* Laptop base */}
      <rect x="20" y="59" width="40" height="3" rx="1.5" fill="var(--ill-navy)" opacity="0.7" />
      {/* Torso */}
      <rect x="28" y="28" width="24" height="18" rx="7" fill="var(--ill-teal)" />
      {/* Arms */}
      <rect x="14" y="50" width="18" height="7" rx="3.5" fill="var(--ill-skin)" />
      <rect x="48" y="50" width="18" height="7" rx="3.5" fill="var(--ill-skin)" />
      {/* Head */}
      <ellipse cx="40" cy="19" rx="11" ry="12" fill="var(--ill-skin)" />
      {/* Hair */}
      <path d="M29 14 Q40 6 51 14 Q51 9 40 7 Q29 9 29 14Z" fill="var(--ill-navy)" />
      {/* Eyes */}
      <circle cx="36" cy="19" r="1.5" fill="var(--ill-navy)" />
      <circle cx="44" cy="19" r="1.5" fill="var(--ill-navy)" />
      {/* Smile */}
      <path d="M36 24 Q40 27 44 24" stroke="var(--ill-navy)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  )
}
