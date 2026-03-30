"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../../components/Logo";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../components/ThemeToggle";

const EXAMPLES_DATA = [
  {
    title: "Hello World",
    description: "A simple script to print text to the console.",
    code: `VANAKKAM DA MAPLA

    COMMENT PANDRAN Simple hello world
    SOLLU "Vanakkam da mapla!" ;
    SOLLU "Welcome to Tharunpp!" ;

NANDRI VANNAKAM`,
  },
  {
    title: "Calculator with If-Else",
    description: "Variables, basic arithmetic operations and a conditional statement.",
    code: `VANAKKAM DA MAPLA

    VAA a = 20 ;
    VAA b = 5 ;

    SOLLU "Addition:" ;
    SOLLU a + b ;

    SOLLU "Subtraction:" ;
    SOLLU a - b ;

    ADHAVUDHU a > b :
        SOLLU "a is bigger da!" ;
    ILLAATI :
        SOLLU "b is bigger da!" ;
    DA

NANDRI VANNAKAM`,
  },
  {
    title: "Functions",
    description: "Defining your own functions using 'ENDRA SHANMUGHAM' and returning values using 'INDHAA LEY PATHUKO'.",
    code: `VANAKKAM DA MAPLA

    ENDRA SHANMUGHAM add(a, b) :
        INDHAA LEY PATHUKO a + b ;
    VELI JOWW

    ENDRA SHANMUGHAM greet(name) :
        SOLLU "Vanakkam da," ;
        SOLLU name ;
    VELI JOWW

    VAA result = VAA MA MINNAL add(10, 20) ;
    SOLLU result ;

    VAA MA MINNAL greet("Tharun") ;

NANDRI VANNAKAM`,
  },
  {
    title: "Loops",
    description: "Repeating code using while loops (TICKTOCK TICKTOCK) and for loops (FIRST_LA).",
    code: `VANAKKAM DA MAPLA

    COMMENT PANDRAN While loop
    VAA i = 0 ;
    TICKTOCK TICKTOCK i < 5 :
        SOLLU i ;
        VAA i = i + 1 ;
    DA

    COMMENT PANDRAN For loop
    FIRST_LA j IRUNDHU 0 VARAI 5 :
        SOLLU j ;
    DA

NANDRI VANNAKAM`,
  },
  {
    title: "Lists (Arrays)",
    description: "Create lists with 'PATTI POTTU', push items with 'ULLAYE POD', grab items with 'EDUTHU KO', and check length with 'YEVLO IRUKU'.",
    code: `VANAKKAM DA MAPLA

    VAA nums = PATTI POTTU [10, 20, 30] ;
    ULLAYE POD nums 40 ;

    SOLLU "List length:" ;
    SOLLU YEVLO IRUKU nums ;

    VAA first = EDUTHU KO nums [0] ;
    SOLLU "First element:" ;
    SOLLU first ;

NANDRI VANNAKAM`,
  },
  {
    title: "Error Handling",
    description: "Catching runtime errors safely so the program can continue.",
    code: `VANAKKAM DA MAPLA

    PAAKALAM :
        SOLLU "Trying something risky..." ;
        AIYAYO "Aiyayo! Something went wrong!" ;
    PUDRA IVANA err :
        SOLLU "Caught the error:" ;
        SOLLU err ;
    DA

    SOLLU "Program continues after error!" ;

NANDRI VANNAKAM`,
  },
];

export default function TharunppExamples() {
  const router = useRouter();
  const pathname = usePathname();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { isDark, toggleTheme, isMounted } = useTheme();

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleRunInPlayground = (code: string) => {
    const encoded = btoa(encodeURIComponent(code));
    router.push(`/tharunpp?code=${encoded}`);
  };

  return (
    <div className="shell">
      <header className="header">
        <div className="brand-group">
          <div className="brand-left">
            <Logo className="brand-logo" size={28} />
            <span className="brand-title">THARUNPP</span>
            <span className="playground-badge">EXAMPLES</span>
          </div>
          <span className="version-badge">v1.0.1</span>
        </div>

        <nav className="nav-tabs" aria-label="Primary">
          <button
            type="button"
            className={`nav-tab nav-btn${pathname === "/tharunpp" ? " active" : ""}`}
            tabIndex={0}
            onClick={() => router.push("/tharunpp")}
          >
            Playground
          </button>
          <button
            type="button"
            className={`nav-tab nav-btn${pathname === "/tharunpp/docs" ? " active" : ""}`}
            tabIndex={0}
            onClick={() => router.push("/tharunpp/docs")}
          >
            Docs
          </button>
          <button
            type="button"
            className={`nav-tab nav-btn${pathname === "/tharunpp/examples" ? " active" : ""}`}
            tabIndex={0}
            onClick={() => router.push("/tharunpp/examples")}
          >
            Examples
          </button>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} isMounted={isMounted} />
        </nav>

        <div className="external-links">
          <a
            className="icon-link"
            href="https://github.com/Tharun007-TK/Tharunpp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.06 1.84 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.24-3.24-.13-.31-.54-1.53.12-3.2 0 0 1.01-.32 3.3 1.24a11.4 11.4 0 0 1 6 0c2.3-1.56 3.3-1.24 3.3-1.24.66 1.67.25 2.89.12 3.2.77.85 1.24 1.92 1.24 3.24 0 4.64-2.8 5.66-5.47 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.58A12 12 0 0 0 12 .5Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            className="icon-link"
            href="https://pypi.org/project/tharunpp/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open PyPI"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M12 2C7.59 2 4 5.59 4 10v5h2v-2h3a7 7 0 0 0 0-14h3Zm0 2h3a5 5 0 0 1 0 10H8v4h-2v2h14v-8a8 8 0 0 0-8-8Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </header>

      <main className="content">
        <div className="examples-container">
          <h1 className="title">Tharunpp Examples</h1>
          <p className="subtitle">Learn by referring to these cinematic code snippets.</p>

          <div className="examples-grid">
            {EXAMPLES_DATA.map((example, index) => (
              <div key={index} className="example-card">
                <div className="card-header">
                  <h2>{example.title}</h2>
                  <p>{example.description}</p>
                </div>
                
                <div className="code-block">
                  <pre><code>{example.code}</code></pre>
                  
                  <div className="code-actions">
                    <button 
                      className="action-btn copy-btn"
                      onClick={() => handleCopy(example.code, index)}
                    >
                      {copiedIndex === index ? "Copied!" : "Copy"}
                    </button>
                    <button 
                      className="action-btn run-btn"
                      onClick={() => handleRunInPlayground(example.code)}
                    >
                      Run in Playground ➔
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <span>pip install tharunpp</span>
        <span>Made with passion in Tamil Nadu</span>
        <a
          href="https://tharunkumar.dev/tharunpp"
          target="_blank"
          rel="noopener noreferrer"
        >
          tharunkumar.dev/tharunpp
        </a>
      </footer>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap");

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .shell {
          --bg: #06080f;
          --panel: #0f131e;
          --panel-2: #131928;
          --border: #293042;
          --text: #e5e7eb;
          --muted: #8e9aae;
          --accent: #f59e0b;
          min-height: 100vh;
          background: #06080f;
          color: var(--text);
          display: flex;
          flex-direction: column;
          font-family: "Space Grotesk", "Segoe UI", sans-serif;
        }

        .header {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 0.75rem;
          align-items: center;
          min-height: 68px;
          padding: 0.8rem 1.2rem;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(
            180deg,
            rgba(16, 21, 32, 0.96),
            rgba(10, 14, 23, 0.96)
          );
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .brand-left {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .brand-logo {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .brand-title {
          letter-spacing: 0.12em;
          font-size: 0.95rem;
          font-weight: 800;
        }

        .playground-badge {
          font-size: 0.64rem;
          letter-spacing: 0.18em;
          padding: 0.25rem 0.45rem;
          border-radius: 999px;
          color: #fef3c7;
          border: 1px solid rgba(245, 158, 11, 0.45);
          background: rgba(245, 158, 11, 0.18);
        }

        .version-badge {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.7rem;
          color: #c9d2e1;
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 0.2rem 0.55rem;
          background: rgba(10, 14, 23, 0.9);
        }

        .nav-tabs {
          display: inline-flex;
          justify-self: center;
          align-items: center;
          gap: 0.45rem;
          padding: 0.24rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(8, 11, 18, 0.9);
        }

        .nav-tab.nav-btn {
          border: none;
          outline: none;
          background: transparent;
          color: #98a3b7;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.4rem 0.8rem;
          border-radius: 999px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .nav-tab.nav-btn.active {
          color: #1a1102;
          background: linear-gradient(135deg, #fbbf24, var(--accent));
          font-weight: 800;
        }

        .external-links {
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }

        .icon-link {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: #b8c2d5;
          text-decoration: none;
          background: rgba(9, 12, 19, 0.95);
        }

        .content {
          flex: 1;
          display: flex;
          justify-content: center;
          padding: 0 1.5rem 2rem;
        }

        .examples-container {
          max-width: 900px;
          width: 100%;
        }

        .title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 1.1rem;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }

        .examples-grid {
          display: grid;
          gap: 2rem;
        }

        .example-card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .card-header {
          padding: 1.5rem 1.5rem 1rem;
        }

        .card-header h2 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #fff;
        }

        .card-header p {
          color: #cbd5e1;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .code-block {
          background: #0d111a;
          border-top: 1px solid var(--border);
          padding: 1.5rem;
          position: relative;
        }

        .code-block pre {
          margin: 0;
          overflow-x: auto;
          white-space: pre;
        }

        .code-block code {
          font-family: "JetBrains Mono", monospace;
          color: #e2e8f0;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .code-actions {
          display: flex;
          gap: 0.5rem;
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .action-btn {
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 0.4rem 0.8rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          background: rgba(14, 19, 30, 0.95);
          color: #d1d9e8;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: rgba(245, 158, 11, 0.1);
          border-color: rgba(245, 158, 11, 0.3);
          color: #fff;
        }

        .run-btn {
          background: rgba(245, 158, 11, 0.15);
          color: #fca5a5;
          border-color: rgba(245, 158, 11, 0.3);
          color: #fbbf24;
        }

        .run-btn:hover {
          background: rgba(245, 158, 11, 0.25);
          color: #fcd34d;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: #0a0d14;
          border-top: 1px solid var(--border);
          font-size: 0.75rem;
          color: var(--muted);
          margin-top: auto;
        }

        .footer a {
          color: var(--accent);
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }

        :global(.light-theme) {
          --bg: #f8fafc;
          --panel: #ffffff;
          --panel-2: #f1f5f9;
          --border: #e2e8f0;
          --text: #0f172a;
          --muted: #64748b;
          --accent: #d97706;
          --good: #059669;
          --bad: #dc2626;
        }

        :global(.light-theme) .shell,
        :global(.light-theme) body,
        :global(.light-theme) html {
          --bg: #f8fafc;
          --panel: #ffffff;
          --panel-2: #f1f5f9;
          --border: #cbd5e1;
          --text: #0f172a;
          --muted: #64748b;
          --accent: #d97706;
          --good: #059669;
          --bad: #dc2626;
          background: var(--bg) !important;
        }

        :global(.light-theme) .header {
          background: rgba(255, 255, 255, 0.96) !important;
          border-bottom: 1px solid var(--border) !important;
        }

        :global(.light-theme) .brand-title {
          color: #0f172a !important;
        }

        :global(.light-theme) .icon-link {
          background: #f1f5f9 !important;
          color: #334155 !important;
          border-color: var(--border) !important;
        }

        :global(.light-theme) .icon-link:hover {
          background: #e2e8f0 !important;
          color: #d97706 !important;
        }

        :global(.light-theme) .playground-badge {
          color: #b45309 !important;
          background: rgba(245, 158, 11, 0.2) !important;
          border-color: rgba(245, 158, 11, 0.5) !important;
        }

        :global(.light-theme) .version-badge {
          color: #334155 !important;
          background: #e2e8f0 !important;
          border-color: #cbd5e1 !important;
        }

        :global(.light-theme) .nav-tabs {
          background: rgba(241, 245, 249, 0.9) !important;
          border: 1px solid var(--border) !important;
        }

        :global(.light-theme) .nav-btn {
          color: #64748b !important;
        }

        :global(.light-theme) .nav-btn:hover {
          color: #0f172a !important;
        }

        :global(.light-theme) .nav-btn.active {
          background: #ffffff !important;
          color: #0f172a !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
        }

        :global(.light-theme) .example-card {
          background: var(--panel) !important;
          border: 1px solid var(--border) !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
        }

        :global(.light-theme) .example-card h2 {
          color: var(--text) !important;
        }

        :global(.light-theme) .card-header p {
          color: #334155 !important;
        }

        :global(.light-theme) .code-block {
          background: var(--panel-2) !important;
          border: 1px solid var(--border) !important;
        }

        :global(.light-theme) .code-block code {
          color: #0f172a !important;
        }

        :global(.light-theme) .copy-btn {
          background: #ffffff !important;
          border: 1px solid var(--border) !important;
          color: #475569 !important;
        }

        :global(.light-theme) .copy-btn:hover {
          background: #f1f5f9 !important;
          color: #0f172a !important;
        }

        :global(.light-theme) .footer {
          background: rgba(255, 255, 255, 0.95) !important;
          border-top: 1px solid var(--border) !important;
          color: #475569 !important;
        }

        :global(.light-theme) .title {
          background: linear-gradient(135deg, #d97706, #b45309) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
        }

        :global(.light-theme) .code-block pre {
          color: #0f172a !important;
        }
      `}</style>
    </div>
  );
}
