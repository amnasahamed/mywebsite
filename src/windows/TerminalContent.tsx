import { useState, useEffect, useRef } from 'react';
import type { Theme } from '../types';

export const TerminalContent = ({ theme }: { theme?: Theme }) => {
  const [history, setChatHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'AMNAS_OS [Version 1.0.1998]' },
    { type: 'output', text: '(C) Copyright 1998 Amnas Ahamed. All rights reserved.' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMacos = theme === 'macos';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim();
    const newHistory = [...history, { type: 'input' as const, text: cmd }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Available commands: help, ls, cat [file], clear, whoami, date, theme --modern, theme --retro' });
        break;
      case 'ls':
        newHistory.push({ type: 'output', text: 'about.txt   projects.exe   sheetschat.url   contact.lnk' });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', text: 'Amnas Ahamed - Entrepreneur, AI Educator, Systems Builder.' });
        break;
      case 'date':
        newHistory.push({ type: 'output', text: new Date().toString() });
        break;
      case 'clear':
        setChatHistory([]);
        return;
      case 'cat about.txt':
        newHistory.push({ type: 'output', text: 'I build things that work. Entrepreneur focused on defining the next best iteration. Barrier isn\'t syntax; it\'s clarity of thought.' });
        break;
      case 'theme --modern':
        newHistory.push({ type: 'output', text: 'Switching to modern theme...' });
        // This won't actually trigger the parent state change here, but we could add a callback
        break;
      default:
        if (cleanCmd.startsWith('cat ')) {
          newHistory.push({ type: 'output', text: `File not found: ${cleanCmd.split(' ')[1]}` });
        } else {
          newHistory.push({ type: 'output', text: `Unknown command: ${cleanCmd}` });
        }
    }
    setChatHistory(newHistory);
  };

  return (
    <div 
      className={`h-full flex flex-col p-4 font-mono text-sm leading-relaxed overflow-hidden ${
        isMacos ? 'bg-[#1e1e1e] text-green-400' : 'bg-black text-[#00FF00]'
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className="flex gap-2">
            {line.type === 'input' && <span className="opacity-50">amnas@os:~$</span>}
            <span className="whitespace-pre-wrap">{line.text}</span>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2 mt-2 shrink-0">
        <span className="opacity-50">amnas@os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(input);
              setInput('');
            }
          }}
          className="flex-1 bg-transparent border-none outline-none text-inherit font-mono"
          autoFocus
        />
      </div>
    </div>
  );
};
