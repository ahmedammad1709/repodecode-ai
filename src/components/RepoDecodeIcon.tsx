export function RepoDecodeIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="100" fill="currentColor" opacity="0.1" />

      {/* Document shape */}
      <rect x="60" y="50" width="80" height="100" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />

      {/* Document lines (representing code) */}
      <line x1="70" y1="65" x2="120" y2="65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="70" y1="80" x2="135" y2="80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="70" y1="95" x2="125" y2="95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="70" y1="110" x2="130" y2="110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="70" y1="125" x2="120" y2="125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

      {/* Left code bracket */}
      <path d="M 50 70 L 58 70 L 58 130 L 50 130" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Right code bracket */}
      <path d="M 150 70 L 142 70 L 142 130 L 150 130" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
