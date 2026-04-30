import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

interface MacosDockProps {
  windows: any[];
  activeWindowId: string | undefined;
  focusWindow: (id: string) => void;
  openWindow: (id: string) => void;
}

interface DockIconProps {
  w: any;
  activeWindowId: string | undefined;
  focusWindow: (id: string) => void;
  key?: string | number;
}

const DockIcon = ({ w, activeWindowId, focusWindow }: DockIconProps) => {
  const mouseX = useMotionValue(Infinity);
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - (bounds.x + bounds.width / 2);
  });

  // Magnification only on larger screens
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const widthSync = useTransform(distance, [-150, 0, 150], isMobile ? [40, 40, 40] : [44, 70, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      whileTap={{ scale: 0.8 }}
      className="relative group cursor-pointer flex flex-col items-center justify-end h-full macos-dock-item pb-1.5"
      onClick={() => focusWindow(w.id)}
    >
      <div className={`aspect-square w-full flex items-center justify-center rounded-[10px] md:rounded-[12px] bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-md border border-white/40 shadow-lg transition-all ${activeWindowId === w.id ? 'from-white/60 to-white/30 border-white/70 ring-1 ring-white/20 scale-105' : ''}`}>
        <div className="scale-110 md:scale-125 group-hover:scale-110 transition-transform">
          {w.icon}
        </div>
      </div>
      
      {/* Indicator Dot */}
      <div className={`absolute -bottom-0.5 w-1 h-1 rounded-full transition-all duration-300 ${activeWindowId === w.id ? 'bg-white scale-125 opacity-100' : 'bg-white/40 opacity-0 group-hover:opacity-100'}`} />
      
      {/* Tooltip - Hide on mobile */}
      {!isMobile && (
        <div className="absolute -top-12 px-3 py-1 macos-glass rounded-lg text-[12px] font-bold text-white macos-text-shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {w.title.split('.')[0]}
        </div>
      )}
    </motion.div>
  );
};

export const MacosDock = ({ windows, activeWindowId, focusWindow, openWindow }: MacosDockProps) => {
  const openWindows = windows.filter(w => w.isOpen);
  if (openWindows.length === 0) return null;

  return (
    <div className="fixed bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 z-[200] max-w-[95vw]">
      <motion.div 
        layout
        className="macos-glass px-2 md:px-3 py-1.5 md:py-2 rounded-[20px] md:rounded-[24px] flex items-end gap-1.5 md:gap-2 macos-dock-shadow border border-white/20 h-[56px] md:h-[64px]"
      >
        {openWindows.map((w) => (
          <DockIcon key={w.id} w={w} activeWindowId={activeWindowId} focusWindow={focusWindow} />
        ))}
      </motion.div>
    </div>
  );
};
