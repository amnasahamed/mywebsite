import { useState, useCallback } from 'react';
import type { WindowData } from '../types';

export function useWindowManager(initialWindows: WindowData[]) {
  const [windows, setWindows] = useState<WindowData[]>(initialWindows);

  const openWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, isOpen: true, isMinimized: false, zIndex: Math.max(...prev.map(pw => pw.zIndex)) + 1 }
          : w
      )
    );
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isOpen: false } : w)));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w)));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, isMinimized: false, zIndex: Math.max(...prev.map(pw => pw.zIndex)) + 1 }
          : w
      )
    );
  }, []);

  const activeWindowId = windows
    .filter(w => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id;

  return { windows, openWindow, closeWindow, minimizeWindow, focusWindow, activeWindowId };
}
