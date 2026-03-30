export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tharunpp-logo ${className}`}
      width="1em"
      height="1em"
      style={{
        filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))",
        color: "#f59e0b",
      }}
      aria-hidden="true"
    >
      {/* Film slate base */}
      <rect x="2" y="8" width="20" height="14" rx="2" ry="2" />
      {/* Film slate top strip */}
      <path d="M2 10l4-4 4 4 4-4 4 4 4-4v4H2z" />
      {/* Code brackets inside */}
      <polyline points="8 14 5 17 8 20" />
      <polyline points="16 14 19 17 16 20" />
      <line x1="14" y1="13" x2="10" y2="21" />
    </svg>
  );
}
