import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';

export default function InputBar() {
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText]     = useState('');
  const [isSending, setIsSending]     = useState(false);
  const inputRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleMicClick = () => {
    if (isSending) return;
    setIsRecording(prev => !prev);
    setInputText('');
  };

  const handleSend = () => {
    if (!inputText.trim() || isSending) return;
    setIsSending(true);
    // Simulate API call (Phase 4 will wire the real one)
    setTimeout(() => {
      setInputText('');
      setIsSending(false);
      inputRef.current?.focus();
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = inputText.trim().length > 0 && !isRecording && !isSending;

  return (
    <div
      className={`
        relative flex items-center gap-2 rounded-2xl px-2 py-2
        bg-white dark:bg-dark-card
        border transition-all duration-200
        ${isRecording
          ? 'border-red-400 dark:border-red-500 shadow-lg shadow-red-500/10'
          : 'border-slate-200 dark:border-dark-border shadow-lg shadow-slate-200/50 dark:shadow-black/30 hover:border-forest-400 dark:hover:border-forest-600 focus-within:border-forest-500 dark:focus-within:border-forest-500'
        }
      `}
    >
      {/* Recording indicator strip */}
      {isRecording && (
        <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-red-400 via-red-500 to-red-400 animate-pulse" />
      )}

      {/* Text input */}
      <input
        ref={inputRef}
        id="legal-query-input"
        type="text"
        dir="auto"
        placeholder={
          isRecording
            ? '🎙 Listening... speak your question'
            : 'Ask your legal question in English or اردو...'
        }
        className="
          flex-1 bg-transparent px-3 py-2.5 outline-none
          text-slate-800 dark:text-slate-100
          placeholder:text-slate-400 dark:placeholder:text-dark-muted
          text-[1rem] leading-relaxed min-w-0
        "
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isRecording || isSending}
        maxLength={500}
        autoComplete="off"
      />

      {/* Character counter — visible when typing */}
      {inputText.length > 400 && (
        <span className="text-xs text-slate-400 dark:text-dark-muted flex-shrink-0 pr-1">
          {500 - inputText.length}
        </span>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-1.5 flex-shrink-0">

        {/* Mic button */}
        <button
          id="mic-button"
          onClick={handleMicClick}
          disabled={isSending}
          aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
          className={`
            p-3 rounded-xl transition-all duration-200 flex items-center justify-center
            disabled:opacity-40 disabled:cursor-not-allowed
            ${isRecording
              ? 'bg-red-50 dark:bg-red-950 text-red-500 border border-red-300 dark:border-red-800 recording-pulse hover:bg-red-100 dark:hover:bg-red-900'
              : 'text-slate-500 dark:text-dark-muted hover:bg-slate-100 dark:hover:bg-dark-surface hover:text-forest-700 dark:hover:text-forest-400'
            }
          `}
        >
          {isRecording
            ? <MicOff size={20} />
            : <Mic    size={20} />
          }
        </button>

        {/* Send button — only enabled when there's text */}
        <button
          id="send-button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send query"
          className={`
            p-3 rounded-xl transition-all duration-200 flex items-center justify-center
            ${canSend
              ? 'bg-forest-800 dark:bg-forest-700 text-white hover:bg-forest-700 dark:hover:bg-forest-600 shadow-md shadow-forest-900/20 hover:scale-105 active:scale-95'
              : 'bg-slate-100 dark:bg-dark-surface text-slate-300 dark:text-dark-muted cursor-not-allowed'
            }
          `}
        >
          {isSending
            ? <Loader2 size={20} className="animate-spin" />
            : <Send    size={20} />
          }
        </button>
      </div>
    </div>
  );
}
