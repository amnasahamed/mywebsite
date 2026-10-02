import React from 'react';
import { Download, BookOpen } from 'lucide-react';
export type PaperTheme = 'legal' | 'cream' | 'dark';
export const NotepadBinding: React.FC<{ theme: PaperTheme; onThemeChange: (theme: PaperTheme) => void }> = ({theme,onThemeChange}) => (
  <header className="site-header">
    <a href="#about" className="site-brand" aria-label="Amnas Ahamed home"><span className="brand-mark"><BookOpen size={23}/></span><span>Amnas Ahamed<small>A BUILDER’S NOTEBOOK</small></span></a>
    <div className="header-actions">
      <label className="theme-control"><span>Paper</span><select aria-label="Notebook paper theme" value={theme} onChange={e => onThemeChange(e.target.value as PaperTheme)}><option value="cream">Cream</option><option value="legal">Legal</option><option value="dark">Night</option></select></label>
      <a href="/images/Profile.pdf" target="_blank" rel="noreferrer" className="resume-link" aria-label="Download résumé"><Download size={15}/><span>Résumé</span></a>
    </div>
  </header>
);
