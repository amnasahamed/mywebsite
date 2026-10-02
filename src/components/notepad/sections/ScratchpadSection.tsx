import React, { useState, useEffect } from 'react';
import { Copy, Trash2, Download, Check, Sparkles } from 'lucide-react';

const DEFAULT_NOTE = `• Welcome to the real lined notepad!
• Feel free to write anything down here — thoughts, to-dos, meeting notes.
• Everything you write here automatically saves to your browser.
• [ ] Check out CloseList (calm wedding guest manager)
• [ ] Connect with Amnas on LinkedIn`;

export const ScratchpadSection: React.FC = () => {
  const [content, setContent] = useState<string>(() => {
    try { return localStorage.getItem('amnas-visitor-scratchpad') ?? DEFAULT_NOTE; } catch { return DEFAULT_NOTE; }
  });
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [previousNote, setPreviousNote] = useState<string | null>(null);

  useEffect(() => {
    try { localStorage.setItem('amnas-visitor-scratchpad', content); } catch { setFeedback('Browser storage is unavailable. Download your note to keep a copy.'); }
  }, [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setFeedback('Could not copy. Select the text and copy it manually.');
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
    URL.revokeObjectURL(element.href);
  };

  const handleClear = () => {
    setPreviousNote(content);
    setContent('');
    setFeedback('Note cleared. You can undo this.');
  };

  const handleReset = () => {
    setPreviousNote(content);
    setContent(DEFAULT_NOTE);
    setFeedback('Sample restored. You can undo this.');
  };

  return (
    <div className="space-y-6 text-[var(--text-main)]">

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-handwriting text-blue-900 dark:text-blue-200">
            A space for your thoughts.
          </h2>
          <p className="text-xs md:text-sm opacity-80">
            Jot down an idea or draft something here. Your notes stay in this browser.
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

      <div role="status" aria-live="polite" className="text-xs text-[var(--text-muted)]">
        {feedback} {previousNote !== null && <button className="underline ml-2" onClick={() => { setContent(previousNote); setPreviousNote(null); setFeedback('Note restored.'); }}>Undo</button>}
      </div>
      {/* Interactive Ruled Textarea */}
      <div className="relative rounded-sm border border-[var(--line-color)] bg-transparent">
        <textarea
          aria-label="Your personal notes"
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
