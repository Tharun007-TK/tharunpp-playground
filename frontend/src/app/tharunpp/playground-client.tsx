"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useRouter, usePathname } from "next/navigation";
import Logo from "../components/Logo";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "../components/ThemeToggle";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://tharunpp-api.onrender.com";

const EXAMPLES = [
  {
    label: "Hello World",
    code: `VANAKKAM DA MAPLA

    COMMENT PANDRAN Simple hello world
    SOLLU "Vanakkam da mapla!" ;
    SOLLU "Welcome to Tharunpp!" ;

NANDRI VANNAKAM`,
  },
  {
    label: "Calculator",
    code: `VANAKKAM DA MAPLA

    VAA a = 20 ;
    VAA b = 5 ;

    SOLLU "Addition:" ;
    SOLLU a + b ;

    SOLLU "Subtraction:" ;
    SOLLU a - b ;

    SOLLU "Multiplication:" ;
    SOLLU a * b ;

    SOLLU "Division:" ;
    SOLLU a / b ;

    ADHAVUDHU a > b :
        SOLLU "a is bigger da!" ;
    ILLAATI :
        SOLLU "b is bigger da!" ;
    DA

NANDRI VANNAKAM`,
  },
  {
    label: "Functions",
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
    label: "Loops",
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
    label: "Lists",
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
    label: "Error Handling",
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

const THARUNPP_KEYWORDS = [
  "VANAKKAM DA MAPLA",
  "NANDRI VANNAKAM",
  "SOLLU",
  "KALAAI",
  "IRUNGH BHAII",
  "VAA",
  "SARI",
  "THAPPU",
  "ONNUMEY ILLA",
  "MATUM",
  "ILLA",
  "VENDAM",
  "ADHAVUDHU",
  "ILLA ADHAVUDHU",
  "ILLAATI",
  "DA",
  "TICKTOCK TICKTOCK",
  "FIRST_LA",
  "IRUNDHU",
  "VARAI",
  "EZHUNDHIRI",
  "ADUTHADUTHU",
  "ENDRA SHANMUGHAM",
  "VELI JOWW",
  "VAA MA MINNAL",
  "INDHAA LEY PATHUKO",
  "PAAKALAM",
  "PUDRA IVANA",
  "AIYAYO",
  "NIL GAVANI SEL",
  "THALA_OK",
  "PATTI POTTU",
  "ULLAYE POD",
  "EDUTHU KO",
  "YEVLO IRUKU",
  "MASS",
  "COMMENT PANDRAN",
  "VINVELI NAYAGAN",
];

function registerTharunppLanguage(monacoInstance: typeof monaco) {
  monacoInstance.languages.register({ id: "tharunpp" });

  monacoInstance.languages.setMonarchTokensProvider("tharunpp", {
    keywords: THARUNPP_KEYWORDS,
    tokenizer: {
      root: [
        [/COMMENT PANDRAN.*$/, "comment"],
        [/VANAKKAM DA MAPLA|NANDRI VANNAKAM/, "keyword.control"],
        [
          /ENDRA SHANMUGHAM|VELI JOWW|INDHAA LEY PATHUKO|VAA MA MINNAL/,
          "keyword.function",
        ],
        [/ADHAVUDHU|ILLA ADHAVUDHU|ILLAATI|DA/, "keyword.control"],
        [
          /TICKTOCK TICKTOCK|FIRST_LA|IRUNDHU|VARAI|EZHUNDHIRI|ADUTHADUTHU/,
          "keyword.control",
        ],
        [/PAAKALAM|PUDRA IVANA|AIYAYO|NIL GAVANI SEL/, "keyword.error"],
        [/PATTI POTTU|ULLAYE POD|EDUTHU KO|YEVLO IRUKU/, "keyword.list"],
        [/SOLLU|KALAAI|IRUNGH BHAII/, "keyword.output"],
        [/VAA/, "keyword"],
        [/SARI|THAPPU|ONNUMEY ILLA/, "constant"],
        [/MATUM|ILLA|VENDAM/, "keyword.operator"],
        [/"[^"]*"/, "string"],
        [/'[^']*'/, "string"],
        [/\d+(\.\d+)?/, "number"],
        [/[a-z_][a-z0-9_]*/, "identifier"],
        [/[+\-*/%=<>!]+/, "operator"],
      ],
    },
  });

  monacoInstance.editor.defineTheme("tharunpp-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6B7280", fontStyle: "italic" },
      { token: "keyword.control", foreground: "F59E0B", fontStyle: "bold" },
      { token: "keyword.function", foreground: "A78BFA", fontStyle: "bold" },
      { token: "keyword.error", foreground: "F87171", fontStyle: "bold" },
      { token: "keyword.list", foreground: "34D399", fontStyle: "bold" },
      { token: "keyword.output", foreground: "60A5FA", fontStyle: "bold" },
      { token: "keyword", foreground: "FB923C" },
      { token: "keyword.operator", foreground: "E879F9" },
      { token: "constant", foreground: "4ADE80" },
      { token: "string", foreground: "86EFAC" },
      { token: "number", foreground: "FCD34D" },
      { token: "identifier", foreground: "E2E8F0" },
      { token: "operator", foreground: "94A3B8" },
    ],
    colors: {
      "editor.background": "#0F1117",
      "editor.foreground": "#E2E8F0",
      "editor.lineHighlightBackground": "#1E2333",
      "editor.selectionBackground": "#2D3748",
      "editorCursor.foreground": "#F59E0B",
      "editorLineNumber.foreground": "#4B5563",
      "editorLineNumber.activeForeground": "#F59E0B",
    },
  });

  monacoInstance.editor.defineTheme("tharunpp-light", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6B7280", fontStyle: "italic" },
      { token: "keyword.control", foreground: "D97706", fontStyle: "bold" },
      { token: "keyword.function", foreground: "7C3AED", fontStyle: "bold" },
      { token: "keyword.error", foreground: "DC2626", fontStyle: "bold" },
      { token: "keyword.list", foreground: "059669", fontStyle: "bold" },
      { token: "keyword.output", foreground: "2563EB", fontStyle: "bold" },
      { token: "keyword", foreground: "EA580C" },
      { token: "keyword.operator", foreground: "C026D3" },
      { token: "constant", foreground: "16A34A" },
      { token: "string", foreground: "059669" },
      { token: "number", foreground: "D97706" },
      { token: "identifier", foreground: "0F172A" },
      { token: "operator", foreground: "475569" },
    ],
    colors: {
      "editor.background": "#f8fafc",
      "editor.foreground": "#0f172a",
      "editor.lineHighlightBackground": "#f1f5f9",
      "editor.selectionBackground": "#e2e8f0",
      "editorCursor.foreground": "#d97706",
      "editorLineNumber.foreground": "#94a3b8",
      "editorLineNumber.activeForeground": "#d97706",
    },
  });

  monacoInstance.languages.registerCompletionItemProvider("tharunpp", {
    provideCompletionItems: (model, position) => {
      const suggestions = THARUNPP_KEYWORDS.map((kw) => ({
        label: kw,
        kind: monacoInstance.languages.CompletionItemKind.Keyword,
        insertText: kw,
        range: {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column,
          endColumn: position.column,
        },
      }));
      return { suggestions };
    },
  });
}

export default function TharunppPlayground() {
  const router = useRouter();
  const pathname = usePathname();
  const [code, setCode] = useState(EXAMPLES[0].code);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [execTime, setExecTime] = useState<number | null>(null);
  const [selectedExample, setSelectedExample] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<any>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { isDark, toggleTheme, isMounted } = useTheme();

  useEffect(() => {
    if (monacoRef.current && isMounted) {
      monacoRef.current.editor.setTheme(isDark ? "tharunpp-dark" : "tharunpp-light");
    }
  }, [isDark, isMounted]);

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoRef.current = monacoInstance;
    registerTharunppLanguage(monacoInstance);
    monacoInstance.editor.setTheme(isDark ? "tharunpp-dark" : "tharunpp-light");
  };

  const runCode = useCallback(async () => {
    const start = performance.now();
    setIsRunning(true);
    setOutput("");
    setError(null);
    setExecTime(null);

    try {
      const res = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setOutput(data.output || "");
      setError(data.error || null);
      if (typeof data.execution_time === "number") {
        setExecTime(data.execution_time);
      } else {
        setExecTime((performance.now() - start) / 1000);
      }
    } catch (e) {
      setError("Could not connect to server. Is the backend running?");
      setExecTime((performance.now() - start) / 1000);
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const handleExampleChange = (idx: number) => {
    setSelectedExample(idx);
    setCode(EXAMPLES[idx].code);
    setMenuOpen(false);
    setOutput("");
    setError(null);
    setExecTime(null);
  };

  const handleShare = () => {
    const encoded = btoa(encodeURIComponent(code));
    const url = `${window.location.origin}/tharunpp?code=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  // Load shared code from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("code");
    if (encoded) {
      try {
        setCode(decodeURIComponent(atob(encoded)));
      } catch {}
    }
  }, []);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!dropdownRef.current) {
        return;
      }
      if (!dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", closeMenu);
    return () => window.removeEventListener("mousedown", closeMenu);
  }, []);

  // Ctrl+Enter to run
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [runCode]);

  return (
    <div className="shell">
      <header className="header">
        <div className="brand-group">
          <div className="brand-left">
            <Logo className="brand-logo" size={28} />
            <span className="brand-title">THARUNPP</span>
            <span className="playground-badge">PLAYGROUND</span>
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

      <section className="toolbar">
        <div className="dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="toolbar-button dropdown-trigger"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span>Example: {EXAMPLES[selectedExample].label}</span>
            <span aria-hidden="true">▾</span>
          </button>
          {menuOpen && (
            <div className="dropdown-menu" role="menu" aria-label="Examples">
              {EXAMPLES.map((example, index) => (
                <button
                  key={example.label}
                  type="button"
                  className={`menu-item ${selectedExample === index ? "selected" : ""}`}
                  onClick={() => handleExampleChange(index)}
                >
                  {example.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="run-button"
          onClick={runCode}
          disabled={isRunning}
        >
          {isRunning ? "RUNNING..." : "▶ RUN"}
          <span className="shortcut">⌘↵</span>
        </button>

        <button type="button" className="toolbar-button" onClick={handleShare}>
          {copied ? "Copied!" : "Share"}
        </button>

        <div className="exec-time" aria-live="polite">
          {execTime !== null
            ? `Execution: ${execTime.toFixed(3)}s`
            : "Execution: --"}
        </div>
      </section>

      <main className="workspace playground-grid">
        <section className="pane pane-editor">
          <div className="pane-label">EDITOR • program.tpp</div>
          <div className="editor-host">
            <Editor
              height="100%"
              defaultLanguage="tharunpp"
              value={code}
              onChange={(val) => setCode(val || "")}
              onMount={handleEditorMount}
              options={{
                lineNumbers: "on",
                fontSize: 14,
                lineHeight: 22,
                fontFamily: "'JetBrains Mono', monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: "line",
                smoothScrolling: true,
                cursorBlinking: "smooth",
                tabSize: 4,
              }}
              theme="tharunpp-dark"
            />
          </div>
        </section>

        <section className="pane pane-output">
          <div className="pane-label">OUTPUT</div>
          <div className="output-content">
            {!output && !error && !isRunning && (
              <p className="placeholder">Press ▶ RUN or ⌘↵ to execute</p>
            )}

            {isRunning && (
              <p className="running">TICKTOCK TICKTOCK... running...</p>
            )}

            {output && <pre className="output-text">{output}</pre>}

            {error && (
              <div className="error-box">
                <div className="error-title">AIYAYO! ERROR</div>
                <pre className="error-text">{error}</pre>
              </div>
            )}

            {execTime !== null && (
              <span className="panel-time">{execTime.toFixed(3)}s</span>
            )}
          </div>
        </section>
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
          --good: #4ade80;
          --bad: #ef4444;
          height: 100dvh;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 8% 10%,
              rgba(245, 158, 11, 0.16),
              transparent 35%
            ),
            radial-gradient(
              circle at 90% 100%,
              rgba(37, 99, 235, 0.18),
              transparent 40%
            ),
            linear-gradient(180deg, #070b13 0%, var(--bg) 100%);
          color: var(--text);
          display: grid;
          grid-template-rows: auto auto minmax(0, 1fr) auto;
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
          backdrop-filter: blur(8px);
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          min-width: 0;
        }

        .brand-left {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 0;
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
          white-space: nowrap;
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
          box-shadow: none;
          position: relative;
        }

        .nav-tab.nav-btn:focus {
          box-shadow: 0 0 0 2px #f59e0b55;
          z-index: 1;
        }

        .nav-tab.nav-btn:hover {
          color: #fbbf24;
          background: rgba(245, 158, 11, 0.08);
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
          transition: all 0.2s ease;
        }

        .icon-link:hover {
          color: #fff7ed;
          border-color: rgba(245, 158, 11, 0.45);
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.2);
        }

        .toolbar {
          min-height: 62px;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.72rem 1.2rem;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(
            180deg,
            rgba(13, 18, 28, 0.95),
            rgba(9, 13, 22, 0.95)
          );
        }

        .dropdown {
          position: relative;
          min-width: 220px;
          max-width: 320px;
        }

        .dropdown-trigger {
          justify-content: space-between;
          width: 100%;
        }

        .dropdown-menu {
          position: absolute;
          left: 0;
          top: calc(100% + 0.4rem);
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: #101625;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.45);
          z-index: 40;
          padding: 0.4rem;
        }

        .menu-item {
          width: 100%;
          text-align: left;
          border: 0;
          background: transparent;
          color: #c5cfde;
          border-radius: 8px;
          padding: 0.5rem 0.55rem;
          font-size: 0.82rem;
          cursor: pointer;
        }

        .menu-item:hover,
        .menu-item.selected {
          color: #fff7ed;
          background: rgba(245, 158, 11, 0.16);
        }

        .toolbar-button,
        .run-button {
          border: 1px solid var(--border);
          height: 38px;
          border-radius: 10px;
          padding: 0 0.8rem;
          color: #d1d9e8;
          background: rgba(14, 19, 30, 0.95);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
        }

        .run-button {
          border-color: rgba(245, 158, 11, 0.5);
          color: #211503;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .run-button:disabled {
          cursor: not-allowed;
          opacity: 0.65;
          color: #e5e7eb;
          background: #2d3342;
          border-color: #3a455f;
        }

        .shortcut {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.68rem;
          color: rgba(27, 18, 4, 0.78);
        }

        .exec-time {
          margin-left: auto;
          border: 1px dashed var(--border);
          border-radius: 999px;
          padding: 0.4rem 0.7rem;
          font-size: 0.76rem;
          color: #9cadc7;
          font-family: "JetBrains Mono", monospace;
        }

        .workspace {
          min-height: 0;
          display: grid;
          grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
        }

        .pane {
          min-height: 0;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, var(--panel), #0c111b);
        }

        .pane-editor {
          border-right: 1px solid var(--border);
        }

        .pane-output {
          background: linear-gradient(180deg, var(--panel-2), #101726);
        }

        .pane-label {
          height: 38px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--border);
          padding: 0 0.95rem;
          font-size: 0.68rem;
          letter-spacing: 0.19em;
          color: #8fa0bd;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(7, 10, 18, 0.6);
        }

        .editor-host {
          flex: 1;
          min-height: 0;
        }

        .output-content {
          position: relative;
          flex: 1;
          min-height: 0;
          overflow: auto;
          padding: 1rem 1rem 2.2rem;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.86rem;
          line-height: 1.55;
        }

        .placeholder {
          color: #6f7f97;
          margin: 0;
        }

        .running {
          color: var(--accent);
          margin: 0;
        }

        .output-text {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
          color: var(--good);
        }

        .error-box {
          margin-top: 1rem;
          border: 1px solid rgba(239, 68, 68, 0.4);
          border-radius: 12px;
          background: rgba(60, 14, 14, 0.35);
          padding: 0.78rem;
        }

        .error-title {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: #fca5a5;
          font-weight: 700;
          margin-bottom: 0.45rem;
        }

        .error-text {
          margin: 0;
          color: #fecaca;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .panel-time {
          position: absolute;
          right: 0.95rem;
          bottom: 0.75rem;
          color: #9eadc7;
          font-size: 0.7rem;
          font-family: "JetBrains Mono", monospace;
          border: 1px solid rgba(142, 154, 174, 0.35);
          border-radius: 999px;
          padding: 0.15rem 0.5rem;
          background: rgba(10, 14, 23, 0.7);
        }

        .footer {
          min-height: 42px;
          border-top: 1px solid var(--border);
          padding: 0.55rem 1.2rem;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          color: #8a97ad;
          font-size: 0.76rem;
          background: rgba(10, 14, 23, 0.95);
        }

        .footer a {
          color: #d4af64;
          text-decoration: none;
          justify-self: end;
        }

        @media (max-width: 980px) {
          .header {
            grid-template-columns: 1fr;
            justify-items: stretch;
            row-gap: 0.65rem;
          }

          .nav-tabs {
            justify-self: start;
          }

          .external-links {
            justify-self: start;
          }

          .toolbar {
            flex-wrap: wrap;
          }

          .exec-time {
            margin-left: 0;
          }
        }

        @media (max-width: 820px) {
          .workspace {
            grid-template-columns: 1fr;
            grid-template-rows: minmax(240px, 1fr) minmax(200px, 0.9fr);
          }

          .pane-editor {
            border-right: 0;
            border-bottom: 1px solid var(--border);
          }

          .footer {
            grid-template-columns: 1fr;
            gap: 0.35rem;
            text-align: center;
          }

          .footer a {
            justify-self: center;
          }
        }
      `}</style>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          background: #06080f;
          overflow: hidden;
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

        :global(.light-theme) .toolbar {
          background: rgba(255, 255, 255, 0.85) !important;
          border-bottom: 1px solid var(--border) !important;
        }

        :global(.light-theme) .toolbar-button {
          background: #ffffff !important;
          color: #334155 !important;
          border: 1px solid var(--border) !important;
        }

        :global(.light-theme) .run-button {
          background: linear-gradient(135deg, #fbbf24, #f59e0b) !important;
          color: #1a1102 !important;
          border: none !important;
          font-weight: 800 !important;
        }
        
        :global(.light-theme) .run-button .shortcut {
          color: rgba(27, 18, 4, 0.7) !important;
        }

        :global(.light-theme) .dropdown-menu {
          background: #ffffff !important;
          border: 1px solid var(--border) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        }

        :global(.light-theme) .menu-item {
          color: #475569 !important;
        }

        :global(.light-theme) .menu-item:hover,
        :global(.light-theme) .menu-item.selected {
          color: #d97706 !important;
          background: rgba(245, 158, 11, 0.1) !important;
        }

        :global(.light-theme) .pane {
          background: var(--panel) !important;
        }

        :global(.light-theme) .pane-output {
          background: var(--panel-2) !important;
        }

        :global(.light-theme) .pane-label {
          background: rgba(241, 245, 249, 0.9) !important;
          color: #334155 !important;
          border-bottom: 1px solid var(--border) !important;
          font-weight: 800 !important;
        }

        :global(.light-theme) .placeholder {
          color: #64748b !important;
        }

        :global(.light-theme) .running {
          color: #d97706 !important;
        }

        :global(.light-theme) .output-text {
          color: #059669 !important;
        }

        :global(.light-theme) .footer {
          background: rgba(255, 255, 255, 0.95) !important;
          border-top: 1px solid var(--border) !important;
          color: #475569 !important;
        }

        :global(.light-theme) .error-box {
          background: rgba(254, 226, 226, 0.5) !important;
          border: 1px solid rgba(239, 68, 68, 0.3) !important;
        }

        :global(.light-theme) .error-title {
          color: #991b1b !important;
        }

        :global(.light-theme) .error-text {
          color: #b91c1c !important;
        }

        :global(.light-theme) .panel-time {
          background: rgba(255, 255, 255, 0.9) !important;
          border: 1px solid var(--border) !important;
          color: #64748b !important;
        }
      `}</style>
    </div>
  );
}
