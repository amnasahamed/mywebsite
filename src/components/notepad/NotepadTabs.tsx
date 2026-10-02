import React, { useEffect, useRef, useState } from 'react';
import { UserRound, Layers, BriefcaseBusiness, Route, Mail, PencilLine, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
export type NotepadTab = 'about' | 'projects' | 'ventures' | 'journey' | 'contact' | 'scratchpad';
export const TAB_NAMES: Record<NotepadTab, string> = { about: 'About me', projects: 'Selected work', ventures: 'Ventures', journey: 'My journey', contact: 'Leave a note', scratchpad: 'Scratchpad' };
const icons = [UserRound, Layers, BriefcaseBusiness, Route, Mail, PencilLine];
export const NotepadTabs: React.FC<{activeTab: NotepadTab; onSelectTab: (tab: NotepadTab) => void}> = ({activeTab, onSelectTab}) => {
  const navRef = useRef<HTMLElement>(null);
  const [edges, setEdges] = useState({left: false, right: false});
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const update = () => setEdges({left: nav.scrollLeft > 2, right: nav.scrollWidth - nav.clientWidth - nav.scrollLeft > 2});
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    nav.addEventListener('scroll', update, {passive:true});
    update();
    return () => { observer.disconnect(); nav.removeEventListener('scroll', update); };
  }, []);
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !active || nav.scrollWidth <= nav.clientWidth) return;
    const left = active.offsetLeft - nav.offsetLeft;
    if (left < nav.scrollLeft + 46) nav.scrollLeft = Math.max(0, left - 46);
    else if (left + active.offsetWidth > nav.scrollLeft + nav.clientWidth - 46) nav.scrollLeft = left + active.offsetWidth - nav.clientWidth + 46;
  }, [activeTab]);
  const move = (direction: number) => navRef.current?.scrollBy({left: direction * 190, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  return (
    <aside className="notebook-index">
      <div className="index-heading">IN THIS NOTEBOOK <span>06</span></div>
      <div className={`index-scroll ${edges.left ? 'has-left' : ''} ${edges.right ? 'has-right' : ''}`}>
        <nav ref={navRef} aria-label="Notebook sections">
          {(Object.keys(TAB_NAMES) as NotepadTab[]).map((id, i) => { const Icon = icons[i]; return (
            <button key={id} className={`index-link ${activeTab === id ? 'is-active' : ''}`} aria-current={activeTab === id ? 'page' : undefined} onClick={() => onSelectTab(id)}>
              <Icon size={18}/><span>{TAB_NAMES[id]}</span><small>{String(i + 1).padStart(2, '0')}</small>
            </button>
          ); })}
        </nav>
        {edges.left && <button className="nav-edge nav-edge-left" aria-label="Show previous sections" onClick={() => move(-1)}><ChevronLeft size={17}/></button>}
        {edges.right && <button className="nav-edge nav-edge-right" aria-label="Show more sections" onClick={() => move(1)}><ChevronRight size={17}/></button>}
      </div>
      <div className="index-note"><span className="hand-note">A little corner<br/>of the internet.</span><p>Things I build, lessons I learn,<br/>and ideas worth keeping.</p></div>
      <a className="index-social" href="https://www.linkedin.com/in/amnasahamed/" target="_blank" rel="noreferrer">Find me on LinkedIn <ArrowUpRight size={15}/></a>
    </aside>
  );
};
