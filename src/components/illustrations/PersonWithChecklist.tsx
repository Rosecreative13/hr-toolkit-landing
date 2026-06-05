/**
 * PersonWithChecklist — figure holding a clipboard with checkmarks.
 * Used in: HowItWorks step circles (step 4), Receive section mini-icons.
 */
export default function PersonWithChecklist({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Person with checklist"
      role="img"
    >
      {/* Clipboard */}
      <rect x="34" y="22" width="34" height="44" rx="3" fill="var(--ill-navy-pale)" />
      <rect x="34" y="22" width="34" height="44" rx="3" stroke="var(--ill-navy)" strokeWidth="1.2" />
      {/* Clip at top */}
      <rect x="44" y="18" width="14" height="8" rx="3" fill="var(--ill-navy)" opacity="0.5" />
      {/* Checklist rows */}
      {[30, 37, 44, 51].map((y, i) => (
        <g key={y}>
          {/* Checkbox */}
          <rect x="39" y={y} width="7" height="7" rx="1.5" fill={i < 3 ? 'var(--ill-teal)' : 'var(--ill-navy-pale)'} stroke="var(--ill-teal)" strokeWidth="1" />
          {i < 3 && (
            <path d={`M${40.5} ${y + 3.5} L${43} ${y + 5.5} L${45.5} ${y + 2}`} stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          )}
          {/* Text line */}
          <rect x="49" y={y + 2} width="14" height="3" rx="1" fill="var(--ill-navy)" opacity={i < 3 ? 0.3 : 0.15} />
        </g>
      ))}

      {/* Person */}
      {/* Head */}
      <ellipse cx="18" cy="20" rx="10" ry="11" fill="var(--ill-skin)" />
      <path d="M8 14 Q18 6 28 14 Q28 9 18 7 Q8 9 8 14Z" fill="var(--ill-amber)" opacity="0.85" />
      <circle cx="14.5" cy="20" r="1.6" fill="var(--ill-navy)" />
      <circle cx="21.5" cy="20" r="1.6" fill="var(--ill-navy)" />
      <path d="M14.5 26 Q18 29 21.5 26" stroke="var(--ill-navy)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* Torso */}
      <rect x="9" y="33" width="20" height="28" rx="7" fill="var(--ill-teal-bright)" />
      {/* Right arm reaching toward clipboard */}
      <rect x="27" y="32" width="18" height="8" rx="4" fill="var(--ill-skin)" />
      {/* Left arm */}
      <rect x="3" y="36" width="8" height="16" rx="4" fill="var(--ill-skin)" />
      {/* Legs */}
      <rect x="9" y="59" width="7" height="16" rx="3.5" fill="var(--ill-navy)" />
      <rect x="20" y="59" width="7" height="16" rx="3.5" fill="var(--ill-navy)" />
    </svg>
  )
}
