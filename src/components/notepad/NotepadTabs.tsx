import React from 'react';

export type NotepadTab = 'about' | 'projects' | 'ventures' | 'journey' | 'contact' | 'scratchpad';

interface NotepadTabsProps {
  activeTab: NotepadTab;
  onSelectTab: (tab: NotepadTab) => void;
}

const TABS: { id: NotepadTab; label: string; icon: string; color: string; hoverColor: string }[] = [
  { id: 'about', label: 'About Me', icon: '📝', color: 'bg-amber-100 text-amber-900 border-amber-300', hoverColor: 'hover:bg-amber-200' },
  { id: 'projects', label: 'Projects', icon: '🚀', color: 'bg-blue-100 text-blue-900 border-blue-300', hoverColor: 'hover:bg-blue-200' },
  { id: 'ventures', label: 'Ventures', icon: '💼', color: 'bg-emerald-100 text-emerald-900 border-emerald-300', hoverColor: 'hover:bg-emerald-200' },
  { id: 'journey', label: 'Journey', icon: '⏳', color: 'bg-purple-100 text-purple-900 border-purple-300', hoverColor: 'hover:bg-purple-200' },
  { id: 'contact', label: 'Leave a Note', icon: '✉️', color: 'bg-rose-100 text-rose-900 border-rose-300', hoverColor: 'hover:bg-rose-200' },
  { id: 'scratchpad', label: 'Scratchpad', icon: '✍️', color: 'bg-yellow-100 text-yellow-900 border-yellow-300', hoverColor: 'hover:bg-yellow-200' },
];

export const NotepadTabs: React.FC<NotepadTabsProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav 
      aria-label="Notepad Sections"
      className="flex items-end gap-1 px-2 md:px-6 overflow-x-auto no-scrollbar pt-2 select-none"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`
              relative flex items-center gap-1.5 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold 
              rounded-t-lg transition-all duration-150 border-t border-x shrink-0
              ${tab.color} ${tab.hoverColor}
              ${isActive 
                ? 'shadow-sm translate-y-0 z-10 font-bold border-b-0 pb-2.5 ring-1 ring-black/5' 
                : 'opacity-75 hover:opacity-100 translate-y-1 hover:translate-y-0.5'
              }
            `}
          >
            <span className="text-sm">{tab.icon}</span>
            <span>{tab.label}</span>
            {isActive && (
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[var(--paper-bg)] z-20" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
