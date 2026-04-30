import { Apple, Wifi, Battery, Search, Command } from 'lucide-react';

interface MacosMenuBarProps {
  time: string;
  activeWindowId: string | undefined;
  windows: any[];
}

export const MacosMenuBar = ({ time, activeWindowId, windows }: MacosMenuBarProps) => {
  const activeWindow = windows.find(w => w.id === activeWindowId);
  
  return (
    <div className="h-7 macos-glass flex items-center justify-between px-4 text-[13px] font-semibold text-white macos-text-shadow z-[200]">
      <div className="flex items-center gap-4">
        <Apple size={16} className="fill-white hover:opacity-70 transition-opacity cursor-pointer" />
        <span className="font-bold tracking-tight cursor-default">{activeWindow ? activeWindow.title.split('.')[0] : 'Finder'}</span>
        <div className="hidden sm:flex items-center gap-4 ml-2">
          {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(item => (
            <span key={item} className="font-medium opacity-90 hover:opacity-100 cursor-pointer transition-opacity px-1">{item}</span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3.5 opacity-90">
          <Wifi size={15} strokeWidth={2.5} className="cursor-pointer hover:opacity-100" />
          <Search size={15} strokeWidth={2.5} className="cursor-pointer hover:opacity-100" />
          <Command size={15} strokeWidth={2.5} className="cursor-pointer hover:opacity-100" />
          <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-100">
            <span className="text-[11px] font-bold">100%</span>
            <Battery size={18} strokeWidth={2.5} />
          </div>
        </div>
        <span className="tabular-nums font-bold tracking-tighter">{time}</span>
      </div>
    </div>
  );
};
