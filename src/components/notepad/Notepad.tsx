import React, { useState, useEffect, useRef } from 'react';
import { NotepadTabs, TAB_NAMES, type NotepadTab } from './NotepadTabs';
import { NotepadBinding, type PaperTheme } from './NotepadBinding';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { VenturesSection } from './sections/VenturesSection';
import { JourneySection } from './sections/JourneySection';
import { ContactSection } from './sections/ContactSection';
import { ScratchpadSection } from './sections/ScratchpadSection';
const readTab = (): NotepadTab => { const id = window.location.hash.slice(1); return Object.prototype.hasOwnProperty.call(TAB_NAMES, id) ? id as NotepadTab : 'about'; };
export const Notepad: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NotepadTab>(readTab);
  const [paperTheme, setPaperTheme] = useState<PaperTheme>(() => { try { const t = localStorage.getItem('amnas-paper-theme'); return t === 'legal' || t === 'dark' ? t : 'cream'; } catch { return 'cream'; } });
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => { const sync = () => { if (Object.prototype.hasOwnProperty.call(TAB_NAMES, window.location.hash.slice(1))) setActiveTab(readTab()); }; window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync); }, []);
  const selectTab = (tab: NotepadTab) => { window.location.hash = tab; setActiveTab(tab); mainRef.current?.focus({preventScroll: true}); window.scrollTo({top: 0, behavior: 'smooth'}); };
  const changeTheme = (theme: PaperTheme) => { setPaperTheme(theme); try { localStorage.setItem('amnas-paper-theme', theme); } catch {} };
  const sections = { about: <AboutSection onNavigate={selectTab}/>, projects: <ProjectsSection/>, ventures: <VenturesSection/>, journey: <JourneySection/>, contact: <ContactSection/>, scratchpad: <ScratchpadSection/> };
  return (
    <div className={`portfolio-shell paper-theme-${paperTheme}`}>
      <a className="skip-link" href="#notebook-content">Skip to notebook</a>
      <div className="site-container">
        <NotepadBinding theme={paperTheme} onThemeChange={changeTheme}/>
        <div className="notebook-layout">
          <NotepadTabs activeTab={activeTab} onSelectTab={selectTab}/>
          <div className="notebook-page">
            <div className="page-binding"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
            <main ref={mainRef} id="notebook-content" tabIndex={-1} className="notebook-content" aria-label={TAB_NAMES[activeTab]}>
              <div className="page-meta"><span>PERSONAL NOTES / {TAB_NAMES[activeTab].toUpperCase()}</span><span>PAGE {String(Object.keys(TAB_NAMES).indexOf(activeTab) + 1).padStart(2,'0')}</span></div>
              <div key={activeTab} className="section-enter">{sections[activeTab]}</div>
              <div className="page-bottom"><span>Always curious. Always building.</span><span>amnas.</span></div>
            </main>
          </div>
        </div>
        <footer className="site-footer"><span>© {new Date().getFullYear()} Amnas Ahamed</span><span>Made with curiosity, in Kerala. <span className="footer-star">✳</span></span><a href="mailto:amnaskt05@gmail.com">Say hello ↗</a></footer>
      </div>
    </div>
  );
};
