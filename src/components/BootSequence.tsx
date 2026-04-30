import React, { useState, useEffect } from 'react';
import type { Theme } from '../types';

interface BootSequenceProps {
  theme: Theme;
  onComplete: () => void;
}

export const BootSequence = ({ theme, onComplete }: BootSequenceProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const isRetro = theme === 'retro';

  // Retro BIOS Lines
  const biosLines = [
    'AMNAS_BIOS(C) 1998 PROPRIETARY INC.',
    'CPU: VIBE_PROCESSOR @ 4.20GHz',
    'MEMORY TEST: 65536KB OK',
    '',
    'DETECTING PRIMARY MASTER... FOUND (HDD-0)',
    'DETECTING PRIMARY SLAVE... NONE',
    '',
    'LOADING AMNAS_OS KERNEL...',
    'INITIALIZING DRIVERS...',
    'MOUNTING C:/WINDOW/SYSTEM32...',
    'READY.',
  ];

  useEffect(() => {
    if (isRetro) {
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < biosLines.length) {
          setLines(prev => [...prev, biosLines[currentLine]]);
          currentLine++;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 500);
        }
      }, 100);
      return () => clearInterval(interval);
    } else {
      // Modern Progress Bar
      let currentProgress = 0;
      const interval = setInterval(() => {
        if (currentProgress < 100) {
          currentProgress += Math.random() * 15;
          if (currentProgress > 100) currentProgress = 100;
          setProgress(currentProgress);
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 800);
        }
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isRetro, onComplete]);

  return (
    <div className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center font-mono ${isRetro ? 'bg-black text-white p-10 items-start justify-start' : 'bg-black text-white'}`}>
      {/* Skip Button */}
      <button 
        onClick={onComplete}
        className={`absolute bottom-8 right-8 px-4 py-1.5 text-xs font-bold transition-all ${
          isRetro 
            ? 'retro-border bg-[#c0c0c0] text-black active:retro-border-inset' 
            : 'bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md'
        }`}
      >
        {isRetro ? 'SKIP BOOT' : 'Skip'}
      </button>

      {isRetro ? (
        <div className="space-y-1 text-sm md:text-base uppercase">
          {lines.map((line, i) => (
            <div key={i} className={line === 'READY.' ? 'text-green-500 font-bold mt-4' : ''}>
              {line || '\u00A0'}
            </div>
          ))}
          <div className="w-2 h-5 bg-white animate-pulse inline-block align-middle ml-1" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-12 w-full max-w-xs animate-in fade-in zoom-in duration-700">
          {/* Minimal Apple-like Logo */}
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-2xl shadow-white/20">
            <div className="w-10 h-10 border-4 border-black rounded-full border-t-transparent animate-spin" />
          </div>
          
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
