import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { X, Square, Minus } from 'lucide-react';
import type { RetroWindowProps } from '../types';

const MIN_W = 250;
const MIN_H = 200;

interface ExtendedRetroWindowProps extends RetroWindowProps {
  zIndex?: number;
}

export const RetroWindow: React.FC<ExtendedRetroWindowProps> = ({
  title,
  icon,
  children,
  onClose,
  onMinimize,
  isActive,
  onClick,
  defaultPos,
  defaultSize,
  isMobile,
  theme,
  zIndex,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ w: defaultSize.w, h: defaultSize.h });
  const isMacos = theme === 'macos';

  const handleResize = useCallback(
    (e: React.MouseEvent, direction: string) => {
      if (isMobile) return;
      e.preventDefault();
      e.stopPropagation();

      const startX = e.clientX;
      const startY = e.clientY;
      const startW = size.w;
      const startH = size.h;

      const onMouseMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;

        setSize((prev) => ({
          w: direction.includes('e')
            ? Math.max(MIN_W, startW + dx)
            : direction.includes('w')
              ? Math.max(MIN_W, startW - dx)
              : prev.w,
          h: direction.includes('s')
            ? Math.max(MIN_H, startH + dy)
            : direction.includes('n')
              ? Math.max(MIN_H, startH - dy)
              : prev.h,
        }));
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [size.w, size.h, isMobile]
  );

  const resizeHandles = [
    { dir: 'n', cls: 'top-0 left-2 right-2 h-1 cursor-n-resize' },
    { dir: 's', cls: 'bottom-0 left-2 right-2 h-1 cursor-s-resize' },
    { dir: 'e', cls: 'right-0 top-2 bottom-2 w-1 cursor-e-resize' },
    { dir: 'w', cls: 'left-0 top-2 bottom-2 w-1 cursor-w-resize' },
    { dir: 'ne', cls: 'top-0 right-0 w-3 h-3 cursor-ne-resize' },
    { dir: 'nw', cls: 'top-0 left-0 w-3 h-3 cursor-nw-resize' },
    { dir: 'se', cls: 'bottom-0 right-0 w-3 h-3 cursor-se-resize' },
    { dir: 'sw', cls: 'bottom-0 left-0 w-3 h-3 cursor-sw-resize' },
  ];

  const windowStyles = isMaximized
    ? {
        top: isMacos ? '28px' : 0,
        left: 0,
        width: '100vw',
        height: isMacos ? 'calc(100vh - 28px)' : 'calc(100vh - 40px)',
      }
    : isMobile
      ? {
          top: isMacos ? '35px' : '5px',
          left: '5px',
          right: '5px',
          bottom: isMacos ? '70px' : '45px',
          width: 'calc(100vw - 10px)',
          height: 'auto',
        }
      : {
          top: defaultPos.y,
          left: defaultPos.x,
          width: size.w,
          height: size.h,
        };

  return (
    <motion.div
      drag={!isMobile && !isMaximized}
      dragMomentum={false}
      dragHandle=".title-bar"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      style={{
        position: 'absolute',
        zIndex: zIndex || (isActive ? 50 : 10),
        ...windowStyles,
      }}
      className={`${
        theme === 'retro'
          ? 'bg-[#c0c0c0] retro-border shadow-[2px_2px_10px_rgba(0,0,0,0.5)]'
          : 'macos-glass rounded-2xl macos-window-shadow border border-white/30'
      } flex flex-col overflow-hidden transition-all duration-300`}
    >
      {/* Resize Handles */}
      {!isMaximized &&
        !isMobile &&
        theme === 'retro' &&
        resizeHandles.map(({ dir, cls }) => (
          <div
            key={dir}
            className={`absolute z-10 ${cls}`}
            onMouseDown={(e) => handleResize(e, dir)}
          />
        ))}

      {/* Title Bar */}
      <div
        className={`title-bar px-3 py-2 flex items-center font-bold text-sm cursor-default select-none ${
          theme === 'retro'
            ? isActive
              ? 'bg-[#000080] text-white'
              : 'bg-[#808080] text-[#c0c0c0]'
            : 'bg-white/10 backdrop-blur-md text-gray-800 border-b border-black/5'
        } ${isMacos ? 'flex-row' : 'justify-between'}`}
      >
        {/* Controls for macOS */}
        {isMacos && (
          <div className="flex gap-2 group/controls mr-4">
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:brightness-90 transition-all flex items-center justify-center relative group"
            >
              <X size={8} className="opacity-0 group-hover:opacity-100 text-black/60 stroke-[3]" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="w-3.5 h-3.5 rounded-full bg-[#febc2e] border border-[#d8a023] hover:brightness-90 transition-all flex items-center justify-center relative group"
            >
              <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/60 stroke-[3]" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
              className="w-3.5 h-3.5 rounded-full bg-[#28c840] border border-[#1aab29] hover:brightness-90 transition-all flex items-center justify-center relative group"
            >
              <Square size={6} className="opacity-0 group-hover:opacity-100 text-black/60 stroke-[3]" />
            </button>
          </div>
        )}

        <div className={`flex items-center gap-2 overflow-hidden whitespace-nowrap ${isMacos ? 'flex-1 justify-center pr-14' : ''}`}>
          {icon}
          <span className={`truncate ${isMacos ? 'font-bold text-gray-700 tracking-tight text-xs' : ''}`}>{title}</span>
        </div>

        {/* Controls for Retro */}
        {theme === 'retro' && (
          <div className="flex gap-[2px] ml-2 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="bg-[#c0c0c0] text-black retro-border w-4 h-4 flex items-center justify-center active:retro-border-inset"
            >
              <Minus size={10} strokeWidth={3} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized(!isMaximized);
              }}
              className="bg-[#c0c0c0] text-black retro-border w-4 h-4 flex items-center justify-center active:retro-border-inset"
            >
              <Square size={10} strokeWidth={3} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="bg-[#c0c0c0] text-black retro-border w-4 h-4 flex items-center justify-center active:retro-border-inset"
            >
              <X size={10} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
      {/* Content */}
      <div className={`p-1 flex-1 overflow-hidden flex flex-col ${theme === 'retro' ? 'bg-[#c0c0c0]' : 'bg-transparent'}`}>
        <div className={`flex-1 overflow-auto p-3 md:p-4 text-sm ${
          theme === 'retro' 
            ? 'retro-border-inset bg-white text-black retro-scrollbar' 
            : 'bg-white/70 backdrop-blur-xl text-gray-900 rounded-xl m-1 md:m-1.5 shadow-inner border border-white/20'
        }`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};
