import React, { useState, useEffect } from 'react';
import { Moon, Sun, Scale, ShieldCheck } from 'lucide-react';
import InputBar from './components/InputBar';
import StructuredResponse from './components/StructuredResponse';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [hasQuery, setHasQuery] = useState(true); // true = show mock response

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="flex-none z-20 bg-forest-900 dark:bg-dark-surface border-b border-forest-800 dark:border-dark-border shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-amber-500 p-2 rounded-xl flex-shrink-0">
              <Scale size={20} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-white font-bold text-lg leading-tight truncate">
                Qanoon Agahi
              </h1>
              <p className="text-forest-300 text-xs dark:text-dark-muted hidden sm:block">
                Legal Rights Awareness · Pakistan
              </p>
            </div>
          </div>

          {/* Right side: disclaimer + toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold">
              <ShieldCheck size={13} />
              Educational Use Only
            </div>

            {/* Dark mode toggle */}
            <button
              id="dark-mode-toggle"
              onClick={() => setIsDark(prev => !prev)}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center
                         bg-white/10 hover:bg-white/20 text-white
                         border border-white/10 hover:border-white/20
                         transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {isDark
                ? <Sun  size={18} className="text-amber-300" />
                : <Moon size={18} className="text-slate-200" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Scroll Area ────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full px-4 pt-8 pb-36 flex flex-col gap-6">

          {/* Welcome / Empty state (shown when no query yet) */}
          {!hasQuery && (
            <div className="animate-fade-in flex flex-col items-center justify-center py-16 gap-5 text-center">
              <div className="bg-forest-100 dark:bg-forest-900/40 p-5 rounded-2xl">
                <Scale size={40} className="text-forest-700 dark:text-forest-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                  Ask a Legal Question
                </h2>
                <p className="text-slate-500 dark:text-dark-muted max-w-sm leading-relaxed text-base">
                  Type or speak your question in English or Urdu.
                  All processing is 100% local — your data never leaves this device.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {['Property transfer kaise hoti hai?', 'How to file for divorce?', 'مزدوری کے حقوق کیا ہیں؟'].map(q => (
                  <button
                    key={q}
                    onClick={() => setHasQuery(true)}
                    className="text-sm bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border
                               text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full
                               hover:border-forest-500 hover:text-forest-700 dark:hover:border-forest-500 dark:hover:text-forest-400
                               transition-all duration-200 hover:shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Response */}
          {hasQuery && (
            <div className="animate-slide-up">
              {/* User query bubble */}
              <div className="flex justify-end mb-5">
                <div className="bg-forest-800 dark:bg-forest-700 text-white px-5 py-3 rounded-2xl rounded-br-sm max-w-[80%] shadow-md text-base leading-relaxed">
                  How do I transfer property ownership in Pakistan?
                </div>
              </div>

              {/* AI response */}
              <StructuredResponse />
            </div>
          )}
        </div>
      </main>

      {/* ── Input Footer ────────────────────────────────────────── */}
      <footer
        className="flex-none fixed bottom-0 left-0 right-0 z-10
                   bg-slate-50/90 dark:bg-dark-bg/90
                   backdrop-blur-md
                   border-t border-slate-200/60 dark:border-dark-border/60
                   px-4 py-3"
      >
        <div className="max-w-4xl mx-auto">
          <InputBar />
          <p className="text-center text-xs text-slate-400 dark:text-dark-muted mt-2">
            Qanoon Agahi provides awareness only — not legal advice. Consult a qualified lawyer for your case.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
