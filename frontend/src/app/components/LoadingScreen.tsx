"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Artificial 1.5s delay to ensure smooth initial entry
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1500);

    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Wait another 500ms for CSS fade out transition

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`loading-overlay ${fading ? "fade-out" : ""}`}>
      <div className="pulse-container">
        <Logo className="loading-logo" size={80} />
        <h1 className="loading-text">Tharunpp</h1>
        <p className="loading-subtext">Compiling Cinema...</p>
      </div>

      <style jsx global>{`
        .loading-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #06080f;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.5s ease-out;
        }

        .loading-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .pulse-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          animation: pulse-bloom 2s infinite ease-in-out;
        }

        .loading-logo {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.5));
        }

        .loading-text {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 800;
          font-size: 2rem;
          margin: 0;
          letter-spacing: 0.1em;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .loading-subtext {
          font-family: "JetBrains Mono", monospace;
          color: #8e9aae;
          font-size: 0.9rem;
          margin: 0;
          letter-spacing: 0.05em;
        }

        @keyframes pulse-bloom {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.2));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 25px rgba(245, 158, 11, 0.6));
          }
        }
      `}</style>
    </div>
  );
}
