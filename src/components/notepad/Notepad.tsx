import React, { useState, useEffect } from 'react';
import { NotepadTabs, type NotepadTab } from './NotepadTabs';
import { NotepadBinding, type PaperTheme } from './NotepadBinding';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { VenturesSection } from './sections/VenturesSection';
import { JourneySection } from './sections/JourneySection';
import { ContactSection } from './sections/ContactSection';
import { ScratchpadSection } from './sections/ScratchpadSection';

export const Notepad: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NotepadTab>('about');
  const [paperTheme, setPaperTheme] = useState<PaperTheme>(() => {
    return (localStorage.getItem('amnas-paper-theme') as PaperTheme) || 'legal';
  });

  const handleThemeChange = (newTheme: PaperTheme) => {
    setPaperTheme(newTheme);
    localStorage.setItem('amnas-paper-theme', newTheme);
  };

  const renderSection = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'ventures':
        return <VenturesSection />;
      case 'journey':
        return <JourneySection />;
      case 'contact':
        return <ContactSection />;
      case 'scratchpad':
        return <ScratchpadSection />;
      default:
        return <AboutSection />;
    }
  };

  const themeClass = 
    paperTheme === 'legal' ? 'paper-theme-legal' :
    paperTheme === 'cream' ? 'paper-theme-cream' : 'paper-theme-dark';

  return (
    <div className={`min-h-screen w-full desk-surface py-6 px-3 sm:px-6 md:px-10 flex flex-col items-center justify-start ${themeClass}`}>
      {/* Container simulating a pad lying on a desk */}
      <div className="w-full max-w-4xl flex flex-col my-auto transition-all duration-300">
        {/* Colorful Folder / Page Index Tabs */}
        <NotepadTabs activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* The Notepad Stack */}
        <div className="notepad-stack w-full rounded-b-md overflow-hidden bg-[var(--paper-bg)] border border-black/10 dark:border-white/10 transition-colors duration-300">
          {/* Top Binding & Perforation */}
          <NotepadBinding theme={paperTheme} onThemeChange={handleThemeChange} />

          {/* Lined Paper Body */}
          <main className="lined-paper relative min-h-[580px] p-6 sm:p-8 md:p-12 overflow-x-hidden">
            {/* Red / Pink Margin Rule on the Left */}
            <div className="margin-rule" />

            {/* Content Area indented past the margin line */}
            <div className="relative z-10 pl-6 sm:pl-10 md:pl-14 max-w-3xl">
              {renderSection()}
            </div>
          </main>
        </div>

        {/* Desk Footnote & Quick Meta */}
        <footer className="mt-8 text-center text-xs text-white/50 space-y-1 font-mono select-none">
          <div>
            © {new Date().getFullYear()} Amnas Ahamed • Crafted with real lined notepad aesthetics
          </div>
          <div className="text-[10px] text-white/30">
            Kerala, India • GenAI Educator @ IIT Madras Pravartak
          </div>
        </footer>
      </div>
    </div>
  );
};
