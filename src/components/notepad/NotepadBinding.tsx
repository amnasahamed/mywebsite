import React from 'react';
import { Download, ExternalLink, Moon, Sun, Palette } from 'lucide-react';

export type PaperTheme = 'legal' | 'cream' | 'dark';

interface NotepadBindingProps {
  theme: PaperTheme;
  onThemeChange: (theme: PaperTheme) => void;
}

export const NotepadBinding: React.FC<NotepadBindingProps> = ({ theme, onThemeChange }) => {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="relative select-none">
      {/* Leatherette / Stitched Top Header */}
      <div 
        className="w-full px-4 py-3 md:px-6 md:py-3.5 flex flex-wrap items-center justify-between gap-3 text-white rounded-t-sm shadow-inner transition-colors duration-300"
        style={{ backgroundColor: 'var(--header-bg)' }}
      >
        {/* Brass binding staples / stitch marks on left & right */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 opacity-60">
            <span className="w-2.5 h-1 bg-amber-200/50 rounded-xs shadow-inner" />
            <span className="w-2.5 h-1 bg-amber-200/50 rounded-xs shadow-inner" />
          </div>

          <div className="flex flex-col">
            <span 
              className="text-xs md:text-sm font-bold tracking-widest uppercase font-mono"
              style={{ color: 'var(--header-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
              Amnas Ahamed
            </span>
            <span className="text-[10px] md:text-xs opacity-70 tracking-wider">
              Entrepreneur • Technology Consultant • Educator
            </span>
          </div>
        </div>

        {/* Action Controls: Paper Theme Switcher & Resume */}
        <div className="flex items-center gap-2 md:gap-3 text-xs">
          {/* Paper Theme Pills */}
          <div className="flex items-center bg-black/30 rounded-full p-0.5 border border-white/10 backdrop-blur-xs">
            <button
              title="Yellow Legal Pad"
              onClick={() => onThemeChange('legal')}
              className={`px-2 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all ${
                theme === 'legal' 
                  ? 'bg-[#fbf4c4] text-[#1f242d] font-bold shadow-xs' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span>🟡</span>
              <span className="hidden sm:inline">Legal Pad</span>
            </button>
            <button
              title="Cream Notebook"
              onClick={() => onThemeChange('cream')}
              className={`px-2 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all ${
                theme === 'cream' 
                  ? 'bg-[#faf7ee] text-[#22262e] font-bold shadow-xs' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span>⚪</span>
              <span className="hidden sm:inline">Cream</span>
            </button>
            <button
              title="Night Mode"
              onClick={() => onThemeChange('dark')}
              className={`px-2 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all ${
                theme === 'dark' 
                  ? 'bg-[#1c2026] text-white font-bold border border-white/20 shadow-xs' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span>🌑</span>
              <span className="hidden sm:inline">Night</span>
            </button>
          </div>

          {/* Download Resume Link */}
          <a
            href="/images/Profile.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-[11px] font-semibold text-white transition-colors"
            title="Download Amnas Resume"
          >
            <Download size={12} />
            <span className="hidden sm:inline">Resume</span>
          </a>
        </div>
      </div>

      {/* Perforation Tear Line with tiny holes */}
      <div className="perforation-line w-full" />
    </header>
  );
};
