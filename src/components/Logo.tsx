export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className}>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff7a47" />
          <stop offset="1" stopColor="#e14a1b" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="11" fill="url(#logo-grad)" />
      <path
        d="M18 10v16M10 18h16"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
