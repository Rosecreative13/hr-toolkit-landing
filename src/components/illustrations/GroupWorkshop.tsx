/**
 * GroupWorkshop — three people around a table, workshop vibe.
 * Used in: HowItWorks step circles (step 5 — mentoring circles).
 */
export default function GroupWorkshop({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Group workshop"
      role="img"
    >
      {/* Table */}
      <ellipse cx="40" cy="52" rx="28" ry="10" fill="var(--ill-navy)" opacity="0.12" />
      <rect x="16" y="46" width="48" height="6" rx="3" fill="var(--ill-navy)" opacity="0.18" />

      {/* Left person */}
      <ellipse cx="15" cy="28" rx="8" ry="9" fill="var(--ill-skin-dark)" />
      <path d="M7 22 Q15 15 23 22 Q23 17 15 15 Q7 17 7 22Z" fill="var(--ill-navy)" />
      <circle cx="12" cy="28" r="1.3" fill="var(--ill-navy)" />
      <circle cx="18" cy="28" r="1.3" fill="var(--ill-navy)" />
      <path d="M12 33 Q15 35 18 33" stroke="var(--ill-navy)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <rect x="7" y="39" width="16" height="16" rx="5" fill="var(--ill-teal)" />
      <rect x="22" y="41" width="8" height="7" rx="3.5" fill="var(--ill-skin-dark)" />
      <rect x="3" y="43" width="6" height="12" rx="3" fill="var(--ill-skin-dark)" />

      {/* Center person (taller, standing) */}
      <ellipse cx="40" cy="18" rx="9" ry="10" fill="var(--ill-skin)" />
      <path d="M31 12 Q40 5 49 12 Q49 7 40 5 Q31 7 31 12Z" fill="var(--ill-amber)" opacity="0.9" />
      <circle cx="36.5" cy="18" r="1.5" fill="var(--ill-navy)" />
      <circle cx="43.5" cy="18" r="1.5" fill="var(--ill-navy)" />
      <path d="M36.5 24 Q40 27 43.5 24" stroke="var(--ill-navy)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <rect x="31" y="30" width="18" height="20" rx="6" fill="var(--ill-teal-bright)" />
      <rect x="22" y="34" width="10" height="7" rx="3.5" fill="var(--ill-skin)" />
      <rect x="48" y="34" width="10" height="7" rx="3.5" fill="var(--ill-skin)" />

      {/* Right person */}
      <ellipse cx="65" cy="28" rx="8" ry="9" fill="var(--ill-skin)" />
      <path d="M57 22 Q65 15 73 22 Q73 17 65 15 Q57 17 57 22Z" fill="var(--ill-teal)" opacity="0.8" />
      <circle cx="62" cy="28" r="1.3" fill="var(--ill-navy)" />
      <circle cx="68" cy="28" r="1.3" fill="var(--ill-navy)" />
      <path d="M62 33 Q65 35 68 33" stroke="var(--ill-navy)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <rect x="57" y="39" width="16" height="16" rx="5" fill="var(--ill-teal)" />
      <rect x="50" y="41" width="8" height="7" rx="3.5" fill="var(--ill-skin)" />
      <rect x="71" y="43" width="6" height="12" rx="3" fill="var(--ill-skin)" />

      {/* Shared document on table */}
      <rect x="30" y="46" width="20" height="12" rx="2" fill="var(--ill-navy-pale)" />
      <rect x="30" y="46" width="20" height="12" rx="2" stroke="var(--ill-teal)" strokeWidth="1" />
      <rect x="33" y="49" width="10" height="2" rx="1" fill="var(--ill-teal)" opacity="0.6" />
      <rect x="33" y="53" width="7" height="2" rx="1" fill="var(--ill-navy)" opacity="0.3" />
    </svg>
  )
}
