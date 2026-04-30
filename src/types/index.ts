import type { ReactNode, MouseEvent, RefObject, ButtonHTMLAttributes } from 'react';

export type Theme = 'retro' | 'macos';

export interface WindowData {
  id: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  defaultPos: { x: number; y: number };
  defaultSize: { w: number; h: number };
}

export type RetroButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  active?: boolean;
};

export interface RetroWindowProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  isActive: boolean;
  onClick: (e: MouseEvent) => void;
  defaultPos: { x: number; y: number };
  defaultSize: { w: number; h: number };
  isMobile: boolean;
  theme: Theme;
}

export interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: (e: MouseEvent) => void;
  dragConstraints: RefObject<HTMLElement | null>;
  theme: Theme;
}

export interface StartMenuProps {
  openWindow: (id: string) => void;
}

export interface TaskbarProps {
  time: string;
  startMenuOpen: boolean;
  setStartMenuOpen: (open: boolean) => void;
  windows: WindowData[];
  activeWindowId: string | undefined;
  focusWindow: (id: string) => void;
  openWindow: (id: string) => void;
  theme: Theme;
}
