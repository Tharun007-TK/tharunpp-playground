export default function ThemeToggle({
  isDark,
  toggleTheme,
  isMounted,
}: {
  isDark: boolean;
  toggleTheme: () => void;
  isMounted: boolean;
}) {
  if (!isMounted) {
    return (
      <button className="theme-toggle" aria-label="Loading Theme Placeholder" disabled>
        <span className="icon-placeholder"></span>
      </button>
    );
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      )}

      <style jsx>{`
        .theme-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: rgba(8, 11, 18, 0.4);
          color: var(--text);
          cursor: pointer;
          transition: all 0.2s ease;
          margin-left: 0.5rem;
        }

        :global(.light-theme) .theme-toggle {
          background: rgba(255, 255, 255, 0.5);
        }

        .theme-toggle:hover {
          background: rgba(245, 158, 11, 0.15);
          color: var(--accent);
          border-color: rgba(245, 158, 11, 0.45);
        }

        .icon-placeholder {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px dashed var(--muted);
          opacity: 0.5;
        }
      `}</style>
    </button>
  );
}
