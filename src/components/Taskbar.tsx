import { Monitor } from 'lucide-react';
import { RetroButton } from './RetroButton';
import { StartMenu } from './StartMenu';
import type { TaskbarProps } from '../types';

export const Taskbar = ({
  time,
  startMenuOpen,
  setStartMenuOpen,
  windows,
  activeWindowId,
  focusWindow,
  openWindow,
}: TaskbarProps) => (
  <div className="bg-[#c0c0c0] retro-border-thin h-10 flex items-center px-1 justify-between relative z-[100]">
    <div className="flex items-center gap-1 h-full py-1">
      <RetroButton
        className="font-bold h-full flex items-center gap-1 px-2"
        active={startMenuOpen}
        onClick={() => setStartMenuOpen(!startMenuOpen)}
      >
        <Monitor size={16} className="text-[#000080]" />
        Start
      </RetroButton>

      <div className="w-px h-full bg-gray-400 mx-1 retro-border-inset"></div>

      {/* Open Windows in Taskbar */}
      <div className="flex gap-1 overflow-x-auto h-full items-center">
        {windows.filter(w => w.isOpen).map(w => (
          <RetroButton
            key={w.id}
            className={`h-full min-w-[100px] max-w-[150px] truncate flex items-center gap-1 px-2 ${activeWindowId === w.id && !w.isMinimized ? 'retro-border-inset bg-[#e0e0e0] font-bold' : ''}`}
            onClick={() => focusWindow(w.id)}
          >
            {w.icon}
            <span className="truncate text-xs">{w.title}</span>
          </RetroButton>
        ))}
      </div>
    </div>

    <div className="retro-border-inset px-3 h-full flex items-center text-xs bg-[#c0c0c0] shrink-0">
      {time}
    </div>

    {/* Start Menu */}
    {startMenuOpen && (
      <StartMenu openWindow={openWindow} />
    )}
  </div>
);
