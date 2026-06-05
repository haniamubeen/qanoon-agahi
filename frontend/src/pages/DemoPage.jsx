import React, { useState, useRef, useEffect } from 'react';
import { Scale, MessageSquare, Plus, Search, Clock, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import InputBar from '../components/InputBar';
import StructuredResponse from '../components/StructuredResponse';

const prompts = [
  'Property transfer kaise hoti hai?',
  'How to file for divorce?',
  'مزدوری کے حقوق کیا ہیں؟',
];

export default function DemoPage() {
  const [messages, setMessages] = useState([]);        // {role: 'user'|'assistant', content: string|object}
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);   // sidebar history entries
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (query) => {
    if (!query.trim() || isLoading) return;

    setError(null);

    // Add user message
    const userMsg = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/query/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      // Add assistant message with structured data (unpacking the data wrapper from FastAPI)
      const assistantMsg = { role: 'assistant', content: data.data };
      setMessages(prev => [...prev, assistantMsg]);

      // Add to sidebar history
      const historyEntry = {
        id: Date.now(),
        title: query.length > 30 ? query.slice(0, 30) + '…' : query,
        time: 'Just now',
        preview: query,
        messages: [...messages, userMsg, assistantMsg],
      };
      setChatHistory(prev => [historyEntry, ...prev]);
      setActiveChat(historyEntry.id);

    } catch (err) {
      setError(err.message || 'Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt) => {
    handleSend(prompt);
  };

  const handleHistoryClick = (chat) => {
    setActiveChat(chat.id);
    setMessages(chat.messages || []);
    setError(null);
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveChat(null);
    setError(null);
  };

  const hasConversation = messages.length > 0;

  return (
    <div className="flex h-screen pt-16 bg-brand-50 dark:bg-dark-bg overflow-hidden">

      {/* ── Left Sidebar: Chat History ─────────────────────── */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} flex-shrink-0 transition-all duration-300 overflow-hidden border-r border-brand-100 dark:border-dark-border bg-brand-50 dark:bg-dark-surface relative`}>
        <div className="w-72 h-full flex flex-col">

          {/* Sidebar Header */}
          <div className="p-4 border-b border-brand-100 dark:border-dark-border">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-all active:scale-95 text-sm shadow-sm"
            >
              <Plus size={16} /> New Chat
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-brand-50 dark:bg-dark-bg border border-brand-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-500 text-brand-700 dark:text-slate-300 placeholder:text-brand-400"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            <p className="px-2 pt-2 pb-1 text-[10px] font-bold text-brand-400 uppercase tracking-widest">Recent</p>
            {chatHistory.length === 0 && (
              <p className="px-3 py-4 text-xs text-brand-400 dark:text-dark-muted text-center">
                No conversations yet. Ask a question to get started!
              </p>
            )}
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleHistoryClick(chat)}
                className={`w-full text-left px-3 py-3 rounded-xl mb-1 transition-all duration-150 group ${activeChat === chat.id ? 'bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800/40' : 'hover:bg-brand-100 dark:hover:bg-dark-card border border-transparent'}`}
              >
                <div className="flex items-start gap-2.5">
                  <MessageSquare size={14} className={`mt-0.5 flex-shrink-0 ${activeChat === chat.id ? 'text-accent-600 dark:text-accent-400' : 'text-brand-400 group-hover:text-brand-600 dark:group-hover:text-slate-300'}`} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium truncate ${activeChat === chat.id ? 'text-accent-700 dark:text-accent-300' : 'text-brand-800 dark:text-slate-200'}`}>
                      {chat.title}
                    </p>
                    <p className="text-xs text-brand-400 dark:text-dark-muted truncate mt-0.5">{chat.preview}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1 ml-6">
                  <Clock size={10} className="text-brand-300" />
                  <span className="text-[10px] text-brand-400">{chat.time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-20 z-30 bg-brand-50 dark:bg-dark-surface border border-brand-200 dark:border-dark-border rounded-r-lg p-1.5 shadow-sm hover:shadow-md transition-all"
        style={{ left: sidebarOpen ? '288px' : '0px' }}
      >
        {sidebarOpen ? <ChevronLeft size={14} className="text-brand-500" /> : <ChevronRight size={14} className="text-brand-500" />}
      </button>

      {/* ── Main Chat Area ────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full px-4 pt-8 pb-36 flex flex-col gap-6">

            {/* Welcome / Empty state */}
            {!hasConversation && !isLoading && (
              <div className="animate-fade-in flex flex-col items-center justify-center py-16 gap-5 text-center mt-12">
                <div className="bg-accent-50 dark:bg-accent-900/20 p-5 rounded-2xl">
                  <Scale size={40} className="text-accent-700 dark:text-accent-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-brand-900 dark:text-slate-100 mb-3">
                    Interactive Demo
                  </h2>
                  <p className="text-brand-600 dark:text-dark-muted max-w-md leading-relaxed text-base mx-auto">
                    Experience how AI Legal Right Awareness breaks down complex legal queries. Select a prompt below or type your own.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {prompts.map(q => (
                    <button
                      key={q}
                      onClick={() => handlePromptClick(q)}
                      disabled={isLoading}
                      className="text-sm bg-brand-50 dark:bg-dark-card border border-brand-200 dark:border-dark-border
                                 text-brand-700 dark:text-slate-300 px-5 py-2.5 rounded-full
                                 hover:border-accent-500 hover:text-accent-700 dark:hover:border-accent-500 dark:hover:text-accent-400
                                 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message History */}
            {messages.map((msg, idx) => (
              <div key={idx} className="animate-slide-up">
                {msg.role === 'user' ? (
                  /* User query bubble */
                  <div className="flex justify-end mb-6">
                    <div className="bg-brand-800 dark:bg-brand-700 text-white px-6 py-4 rounded-2xl rounded-br-sm max-w-[80%] shadow-md text-base leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  /* AI response */
                  <StructuredResponse data={msg.content} />
                )}
              </div>
            ))}

            {/* Loading skeleton */}
            {isLoading && (
              <div className="animate-slide-up">
                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-dark-muted font-medium mb-3">
                  <div className="w-7 h-7 rounded-full bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center flex-shrink-0">
                    <Loader2 size={14} className="text-accent-700 dark:text-accent-400 animate-spin" />
                  </div>
                  <span>AI Legal is thinking…</span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-dark-card rounded-lg animate-pulse w-3/4" />
                  <div className="h-4 bg-slate-200 dark:bg-dark-card rounded-lg animate-pulse w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-dark-card rounded-lg animate-pulse w-5/6" />
                  <div className="h-4 bg-slate-200 dark:bg-dark-card rounded-lg animate-pulse w-2/3" />
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="animate-slide-up bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 text-sm text-red-700 dark:text-red-400">
                <p className="font-semibold mb-1">⚠️ Something went wrong</p>
                <p>{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-xs text-red-600 dark:text-red-400 underline hover:no-underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Footer Area */}
        <div className="flex-none sticky bottom-0 left-0 right-0 z-40 bg-brand-50/90 dark:bg-dark-bg/90 backdrop-blur-md border-t border-brand-200/60 dark:border-dark-border/60 px-4 py-4">
          <div className="max-w-4xl mx-auto relative">
            <InputBar onSend={handleSend} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
