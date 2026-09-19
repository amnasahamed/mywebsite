import React, { useState, useEffect } from 'react';
import { Copy, Trash2, Download, Check, Sparkles } from 'lucide-react';

const DEFAULT_NOTE = `• Welcome to the real lined notepad!
• Feel free to write anything down here — thoughts, to-dos, meeting notes.
• Everything you write here automatically saves to your browser.
• [ ] Check out CloseList (calm wedding guest manager)
• [ ] Connect with Amnas on LinkedIn`;

export const ScratchpadSection: React.FC = () => {
  const [content, setContent] = useState<string>(() => {
    return localStorage.getItem('amnas-visitor-scratchpad') ?? DEFAULT_NOTE;
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('amnas-visitor-scratchpad', content);
  }, [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `notepad-note-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClear = () => {
    if (window.confirm('Clear all your notes on this page?')) {
      setContent('');
    }
  };

  const handleReset = () => {
    setContent(DEFAULT_NOTE);
  };

  return (
    <div className="space-y-6 text-[var(--text-main)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line-color)] pb-2 text-xs font-mono opacity-70">
        <span>Section: 06 • Interactive Visitor Scratchpad</span>
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Auto-saving to browser</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-handwriting text-blue-900 dark:text-blue-200">
            Your Personal Scratchpad ✍️
          </h2>
          <p className="text-xs md:text-sm opacity-80">
            A real notepad you can write on! Type notes, draft thoughts, or copy them when you're done.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 rounded-sm transition-colors"
            title="Copy Note"
          >
            {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 rounded-sm transition-colors"
            title="Download as text file"
          >
            <Download size={12} />
            <span>Save</span>
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-2.5 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-sm transition-colors"
            title="Clear note"
          >
            <Trash2 size={12} />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Interactive Ruled Textarea */}
      <div className="relative rounded-sm border border-[var(--line-color)] bg-transparent">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Click here and start jotting down anything on your mind..."
          rows={14}
          className="w-full p-4 bg-transparent outline-none resize-y font-mono text-sm leading-8 tracking-wide text-[var(--text-main)]"
          style={{ lineHeight: '32px' }}
        />
      </div>

      <div className="flex justify-between items-center text-[11px] font-mono opacity-60">
        <span>Characters: {content.length} • Lines: {content.split('\n').length}</span>
        <button
          onClick={handleReset}
          className="underline hover:opacity-100"
        >
          Reset to sample notes
        </button>
      </div>
    </div>
  );
};
