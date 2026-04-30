import React, { useState, useEffect, useCallback } from 'react';

export const WALLPAPERS = [
  { id: 'teal', name: 'Teal (Default)', color: '#008080' },
  { id: 'darkblue', name: 'Midnight Blue', color: '#000033' },
  { id: 'forest', name: 'Forest Green', color: '#003300' },
  { id: 'wine', name: 'Wine Red', color: '#4a0028' },
  { id: 'slate', name: 'Slate Gray', color: '#2c3e50' },
  { id: 'clouds', name: 'Clouds', color: '#87CEEB' },
  { id: 'dark', name: 'Dark Mode', color: '#1a1a2e' },
  { id: 'purple', name: 'Amethyst', color: '#2d1b69' },
] as const;

export type WallpaperId = (typeof WALLPAPERS)[number]['id'];

interface ContextMenuState {
  x: number;
  y: number;
  show: boolean;
  wallpaperOpen: boolean;
}

export const useContextMenu = (
  onWallpaperChange: (id: WallpaperId) => void,
  onNightModeToggle?: () => void,
  onRefresh?: () => void
) => {
  const [menu, setMenu] = useState<ContextMenuState>({
    x: 0,
    y: 0,
    show: false,
    wallpaperOpen: false,
  });

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setMenu({
      x: Math.min(e.clientX, window.innerWidth - 200),
      y: Math.min(e.clientY, window.innerHeight - 250),
      show: true,
      wallpaperOpen: false,
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenu((prev) => ({ ...prev, show: false, wallpaperOpen: false }));
  }, []);

  const toggleWallpaper = useCallback(() => {
    setMenu((prev) => ({ ...prev, wallpaperOpen: !prev.wallpaperOpen }));
  }, []);

  useEffect(() => {
    if (!menu.show) return;
    const handleClick = () => closeMenu();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [menu.show, closeMenu]);

  const ContextMenu = menu.show ? (
    <div
      className="fixed bg-[#c0c0c0] retro-border shadow-[2px_2px_10px_rgba(0,0,0,0.5)] z-[200] min-w-[180px] py-1 font-retro"
      style={{ left: menu.x, top: menu.y }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="w-full text-left px-4 py-1.5 text-sm hover:bg-[#000080] hover:text-white flex items-center gap-2"
        onClick={() => {
          onNightModeToggle?.();
          closeMenu();
        }}
      >
        🌙 Night Mode
      </button>
      
      <button
        className="w-full text-left px-4 py-1.5 text-sm hover:bg-[#000080] hover:text-white flex items-center gap-2"
        onClick={() => {
          onRefresh?.();
          closeMenu();
        }}
      >
        🔄 Refresh
      </button>

      <div className="border-t border-gray-400 my-1" />

      <button
        className="w-full text-left px-4 py-1.5 text-sm hover:bg-[#000080] hover:text-white flex items-center justify-between"
        onClick={toggleWallpaper}
      >
        <span>🖼️ Wallpaper</span>
        <span className="text-xs">▸</span>
      </button>

      {menu.wallpaperOpen && (
        <div className="ml-4 border-l-2 border-gray-400">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.id}
              className="w-full text-left px-4 py-1 text-sm hover:bg-[#000080] hover:text-white flex items-center gap-2"
              onClick={() => {
                onWallpaperChange(wp.id);
                closeMenu();
              }}
            >
              <span
                className="w-3 h-3 retro-border-thin inline-block"
                style={{ backgroundColor: wp.color }}
              />
              {wp.name}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-gray-400 my-1" />

      <button
        className="w-full text-left px-4 py-1.5 text-sm hover:bg-[#000080] hover:text-white flex items-center gap-2"
        onClick={closeMenu}
      >
        📋 Properties
      </button>
    </div>
  ) : null;

  return { ContextMenu, handleContextMenu, closeMenu };
};
