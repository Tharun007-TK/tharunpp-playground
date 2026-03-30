"use client";

import { useRouter, usePathname } from "next/navigation";
import Logo from "../../components/Logo";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../components/ThemeToggle";

export default function TharunppDocs() {
  const router = useRouter();
  const pathname = usePathname();
  const { isDark, toggleTheme, isMounted } = useTheme();

  return (
    <div className="shell">
      <header className="header">
        <div className="brand-group">
          <div className="brand-left">
            <Logo className="brand-logo" />
            <span className="brand-title">THARUNPP</span>
            <span className="playground-badge">DOCS</span>
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
        <div className="docs-container">
          <div className="main-header">
            <h1 className="title">Tharunpp Documentation</h1>
            <p className="subtitle">An esoteric language made inspired by famous tamil words and dialogues.</p>
          </div>

          <div className="docs-layout">
            <nav className="docs-sidebar">
              <ul className="sidebar-nav">
                <li><a href="#installation">Installation & Setup</a></li>
                <li><a href="#program-structure">Program Structure</a></li>
                <li><a href="#variables">Variables & Values</a></li>
                <li><a href="#io">Output & Input</a></li>
                <li><a href="#operators">Operators</a></li>
                <li><a href="#control-flow">Control Flow</a></li>
                <li><a href="#functions">Functions</a></li>
                <li><a href="#error-handling">Error Handling</a></li>
                <li><a href="#lists">Lists</a></li>
                <li><a href="#other">Other Keywords</a></li>
              </ul>
            </nav>

            <div className="docs-content-area">
              {/* Installation Section */}
              <section id="installation" className="doc-section">
                <h2>Installation & Setup</h2>
                <div className="info-box">
                  <p><strong>Note:</strong> Requires Python &gt;= 3.8.1</p>
                </div>
                <p>Install Tharunpp globally via pip:</p>
                <div className="code-block">
                  <pre><code>pip install tharunpp</code></pre>
                </div>
                <p><strong>Usage Commands:</strong></p>
                <ul className="keyword-list">
                  <li><code>tharunpp run-file program.tpp</code> — Run a program file</li>
                  <li><code>tharunpp shell</code> — Open dynamic interactive REPL</li>
                  <li><code>tharunpp tokenize program.tpp</code> — Show tokens for a file</li>
                  <li><code>tharunpp version</code> — Show current version</li>
                </ul>
              </section>

              {/* Program Structure */}
              <section id="program-structure" className="doc-section">
                <h2>Program Structure</h2>
                <p>Every Tharunpp program must begin and end with standard greetings. Comments are supported for single lines.</p>
                <ul className="keyword-list">
                  <li><span className="kw">VANAKKAM DA MAPLA</span> — The starting point of the program.</li>
                  <li><span className="kw">NANDRI VANNAKAM</span> — The ending point of the program.</li>
                  <li><span className="kw">COMMENT PANDRAN</span> — Used for declaring a comment.</li>
                </ul>
                <div className="code-block">
                  <pre><code>VANAKKAM DA MAPLA
    COMMENT PANDRAN This is a comment!
    SOLLU "Hello World!" ;
NANDRI VANNAKAM</code></pre>
                </div>
              </section>

              {/* Variables */}
              <section id="variables" className="doc-section">
                <h2>Variables & Values</h2>
                <p>Declare variables and assign specialized boolean or null values.</p>
                <ul className="keyword-list">
                  <li><span className="kw">VAA</span> — Used to declare variables. <br/><em>Example:</em> <code>VAA x = 10 ;</code></li>
                  <li><span className="kw">SARI</span> — Represents the boolean value <span className="highlight-code">true</span>.</li>
                  <li><span className="kw">THAPPU</span> — Represents the boolean value <span className="highlight-code">false</span>.</li>
                  <li><span className="kw">ONNUMEY ILLA</span> — Represents a <span className="highlight-code">null</span> value.</li>
                </ul>
              </section>

              {/* Output & Input */}
              <section id="io" className="doc-section">
                <h2>Output & Input</h2>
                <ul className="keyword-list">
                  <li><span className="kw">SOLLU</span> — Print to the console. <br/><em>Example:</em> <code>SOLLU "dei!" ;</code></li>
                  <li><span className="kw">KALAAI</span> — Throws an error/exception. <br/><em>Example:</em> <code>KALAAI x ;</code></li>
                  <li><span className="kw">IRUNGH BHAII</span> — Suspends execution momentarily (sleep/wait).</li>
                </ul>
              </section>

              {/* Operators */}
              <section id="operators" className="doc-section">
                <h2>Operators</h2>
                <p>Mathematical and logical operations for conditionals and assignments.</p>
                <div className="operator-grid">
                  <div className="op-card"><code>+</code> <small>Add</small></div>
                  <div className="op-card"><code>-</code> <small>Subtract</small></div>
                  <div className="op-card"><code>*</code> <small>Multiply</small></div>
                  <div className="op-card"><code>/</code> <small>Divide</small></div>
                  <div className="op-card"><code>%</code> <small>Modulo</small></div>
                  <div className="op-card"><code>==</code> <small>Equal</small></div>
                  <div className="op-card"><code>!=</code> <small>Not Equal</small></div>
                  <div className="op-card"><code>&gt;</code> <small>Greater</small></div>
                  <div className="op-card"><code>&lt;</code> <small>Lesser</small></div>
                  <div className="op-card"><code>&gt;=</code> <small>Greater eq</small></div>
                  <div className="op-card"><code>&lt;=</code> <small>Lesser eq</small></div>
                </div>
                <h3 className="sub-heading">Logical Operators</h3>
                <ul className="keyword-list">
                  <li><span className="kw">MATUM</span> — Equivalent to Logical <code>AND</code></li>
                  <li><span className="kw">ILLA</span> — Equivalent to Logical <code>OR</code></li>
                  <li><span className="kw">VENDAM</span> — Equivalent to Logical <code>NOT</code></li>
                </ul>
              </section>

              {/* Control Flow */}
              <section id="control-flow" className="doc-section">
                <h2>Control Flow</h2>
                <ul className="keyword-list">
                  <li><span className="kw">ADHAVUDHU</span> — Condition statement (<code>if</code>).</li>
                  <li><span className="kw">ILLA ADHAVUDHU</span> — Condition statement (<code>else if</code>).</li>
                  <li><span className="kw">ILLAATI</span> — Condition statement (<code>else</code>).</li>
                  <li><span className="kw">DA</span> — Denotes the end of a block (like closing brace <code>{"}"}</code>).</li>
                </ul>
                <div className="code-block">
                  <pre><code>ADHAVUDHU x &gt; 5 :
    SOLLU "Big" ;
ILLA ADHAVUDHU x == 5 :
    SOLLU "Equal" ;
ILLAATI :
    SOLLU "Small" ;
DA</code></pre>
                </div>
                <h3 className="sub-heading">Loops</h3>
                <ul className="keyword-list">
                  <li><span className="kw">TICKTOCK TICKTOCK</span> — Used to declare a <code>while</code> loop.</li>
                  <li><span className="kw">FIRST_LA ... IRUNDHU ... VARAI ...</span> — Used for <code>for</code> loops. <br/><em>Example:</em> <code>FIRST_LA i IRUNDHU 0 VARAI 5 :</code></li>
                  <li><span className="kw">EZHUNDHIRI</span> — Breaks out of a loop (<code>break</code>).</li>
                  <li><span className="kw">ADUTHADUTHU</span> — Skips to the next iteration (<code>continue</code>).</li>
                </ul>
              </section>

              {/* Functions */}
              <section id="functions" className="doc-section">
                <h2>Functions</h2>
                <ul className="keyword-list">
                  <li><span className="kw">ENDRA SHANMUGHAM</span> — Define a function. <br/><em>Example:</em> <code>ENDRA SHANMUGHAM add(a, b) :</code></li>
                  <li><span className="kw">VELI JOWW</span> — Denotes the end of a function block.</li>
                  <li><span className="kw">VAA MA MINNAL</span> — Calls a function. <br/><em>Example:</em> <code>VAA MA MINNAL add(1, 2) ;</code></li>
                  <li><span className="kw">INDHAA LEY PATHUKO</span> — Returns a value from a function (<code>return</code>). <br/><em>Example:</em> <code>INDHAA LEY PATHUKO x ;</code></li>
                </ul>
              </section>

              {/* Error Handling */}
              <section id="error-handling" className="doc-section">
                <h2>Error Handling</h2>
                <ul className="keyword-list">
                  <li><span className="kw">PAAKALAM</span> — Tries to execute a block of code (<code>try</code>).</li>
                  <li><span className="kw">PUDRA IVANA</span> — Catches an error (<code>catch</code>). <br/><em>Example:</em> <code>PUDRA IVANA err :</code></li>
                  <li><span className="kw">AIYAYO</span> — Throws an exception artificially.</li>
                  <li><span className="kw">NIL GAVANI SEL</span> — Assertion statement. <br/><em>Example:</em> <code>NIL GAVANI SEL x &gt; 0 ;</code></li>
                </ul>
              </section>

              {/* Lists */}
              <section id="lists" className="doc-section">
                <h2>Lists (Arrays)</h2>
                <ul className="keyword-list">
                  <li><span className="kw">PATTI POTTU</span> — Declare a new list. <br/><em>Example:</em> <code>VAA nums = PATTI POTTU [1, 2, 3] ;</code></li>
                  <li><span className="kw">ULLAYE POD</span> — Push a specific item into a list. <br/><em>Example:</em> <code>ULLAYE POD nums 4 ;</code></li>
                  <li><span className="kw">EDUTHU KO</span> — Retrive an item from the list using an index. <br/><em>Example:</em> <code>VAA y = EDUTHU KO nums [0] ;</code></li>
                  <li><span className="kw">YEVLO IRUKU</span> — Get the total number of items in a list.</li>
                </ul>
              </section>

              {/* Other */}
              <section id="other" className="doc-section">
                <h2>Other Keywords</h2>
                <ul className="keyword-list">
                  <li><span className="kw">MASS</span> — Useful built-in utilities/macros.</li>
                  <li><span className="kw">THALA_OK</span> — Miscellaneous operations.</li>
                </ul>
              </section>

            </div>
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

        .shell {
          --bg: #06080f;
          --panel: #0f131e;
          --panel-2: #131928;
          --border: #293042;
          --text: #e5e7eb;
          --muted: #8e9aae;
          --accent: #f59e0b;
          height: 100vh;
          overflow-y: auto;
          background: #06080f;
          color: var(--text);
          display: flex;
          flex-direction: column;
          font-family: "Space Grotesk", "Segoe UI", sans-serif;
          scroll-behavior: smooth;
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
          font-size: 1.12rem;
          filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.35));
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
          padding: 3rem 1.5rem;
        }

        .docs-container {
          max-width: 1000px;
          width: 100%;
        }

        .main-header {
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 2rem;
        }

        .title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.8rem;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 1.15rem;
          color: var(--muted);
          line-height: 1.6;
        }

        .docs-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 3rem;
          align-items: start;
        }

        @media (max-width: 800px) {
          .docs-layout {
            grid-template-columns: 1fr;
          }
          .docs-sidebar {
            display: none;
          }
        }

        .docs-sidebar {
          position: sticky;
          top: 100px;
          border-right: 1px solid var(--border);
          padding-right: 1.5rem;
        }

        .sidebar-nav {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-nav li {
          margin-bottom: 0.75rem;
        }

        .sidebar-nav a {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
          display: block;
          padding: 0.4rem 0.6rem;
          border-radius: 6px;
        }

        .sidebar-nav a:hover {
          color: var(--accent);
          background: rgba(245, 158, 11, 0.08);
        }

        .docs-content-area {
          min-width: 0;
        }

        .doc-section {
          margin-bottom: 4rem;
          scroll-margin-top: 100px;
        }

        .doc-section h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #fff;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.5rem;
        }

        .sub-heading {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 2rem 0 1rem;
          color: #e2e8f0;
        }

        .doc-section p {
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 1.2rem;
          font-size: 1.05rem;
        }

        .info-box {
          background: rgba(59, 130, 246, 0.1);
          border-left: 4px solid #3b82f6;
          padding: 1rem 1.2rem;
          margin-bottom: 1.5rem;
          border-radius: 0 8px 8px 0;
        }

        .info-box p {
          margin: 0;
          color: #bfdbfe;
          font-size: 0.95rem;
        }

        .keyword-list {
          list-style: none;
          padding: 0;
          margin-bottom: 1.5rem;
        }

        .keyword-list li {
          background: var(--panel);
          border: 1px solid var(--border);
          margin-bottom: 0.8rem;
          padding: 1rem 1.2rem;
          border-radius: 8px;
          color: #cbd5e1;
          line-height: 1.6;
        }

        .kw {
          font-family: "JetBrains Mono", monospace;
          color: #fb923c;
          font-weight: 700;
          font-size: 1.05rem;
          margin-right: 0.5rem;
        }

        .highlight-code {
          background: #1e293b;
          color: #38bdf8;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.9em;
        }

        .doc-section code {
          font-family: "JetBrains Mono", monospace;
          background: var(--panel-2);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          color: var(--accent);
          font-size: 0.9em;
        }

        .operator-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .op-card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .op-card:hover {
          border-color: rgba(245, 158, 11, 0.4);
          background: rgba(245, 158, 11, 0.05);
        }

        .op-card code {
          font-size: 1.2rem;
          color: #a78bfa;
          background: transparent;
          padding: 0;
        }

        .op-card small {
          color: #94a3b8;
          font-size: 0.8rem;
        }

        .code-block {
          background: #0d111a;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.2rem;
          margin: 1.5rem 0;
          overflow-x: auto;
        }

        .code-block pre {
          margin: 0;
        }

        .code-block code {
          background: none;
          padding: 0;
          color: #e2e8f0;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: #0a0d14;
          border-top: 1px solid var(--border);
          font-size: 0.8rem;
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

        :global(.light-theme) .docs-sidebar {
          background: var(--bg) !important;
          border-right: 1px solid var(--border) !important;
        }

        :global(.light-theme) .doc-section h2 {
          color: var(--text) !important;
          border-bottom: 1px solid var(--border) !important;
        }

        :global(.light-theme) .sub-heading {
          color: var(--text) !important;
        }

        :global(.light-theme) .doc-section p {
          color: #334155 !important;
        }

        :global(.light-theme) .keyword-list li {
          background: var(--panel) !important;
          color: #334155 !important;
          border: 1px solid var(--border) !important;
        }

        :global(.light-theme) .op-card {
          background: var(--panel) !important;
          border: 1px solid var(--border) !important;
        }

        :global(.light-theme) .op-card h4 {
          color: var(--text) !important;
        }

        :global(.light-theme) .op-card p {
          color: #475569 !important;
        }

        :global(.light-theme) .code-block {
          background: var(--panel-2) !important;
          border: 1px solid var(--border) !important;
        }

        :global(.light-theme) .code-block code {
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

        :global(.light-theme) .sidebar-nav a {
          color: #475569 !important;
        }

        :global(.light-theme) .sidebar-nav a:hover {
          color: #d97706 !important;
          background: rgba(245, 158, 11, 0.08) !important;
        }

        :global(.light-theme) .info-box p {
          color: #1e3a8a !important;
        }

        :global(.light-theme) .kw {
          color: #c2410c !important;
        }

        :global(.light-theme) .highlight-code {
          background: #f1f5f9 !important;
          color: #0369a1 !important;
          border: 1px solid var(--border) !important;
        }

        :global(.light-theme) .op-card code {
          color: #6d28d9 !important;
        }

        :global(.light-theme) .op-card small {
          color: #475569 !important;
        }
      `}</style>
    </div>
  );
}
