import { motion } from 'motion/react';
import type { DesktopIconProps } from '../types';

export const DesktopIcon = ({ icon, label, onClick, dragConstraints, theme }: DesktopIconProps) => {
  const isMacos = theme === 'macos';
  
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={dragConstraints}
      onClick={(e) => { e.stopPropagation(); onClick(e); }}
      onDoubleClick={(e) => { e.stopPropagation(); onClick(e); }}
      className={`flex flex-col items-center gap-1.5 w-24 p-2 cursor-pointer group rounded-xl transition-all ${isMacos ? 'hover:bg-white/10' : ''}`}
      whileDrag={{ zIndex: 100, scale: 1.05, opacity: 0.8 }}
    >
      <div className={`w-12 h-12 flex items-center justify-center pointer-events-none transition-transform duration-200 ${isMacos ? 'group-hover:scale-110 drop-shadow-xl' : 'group-active:brightness-75'}`}>
        {icon}
      </div>
      <span 
        className={`text-[12px] text-center px-2 py-0.5 line-clamp-2 pointer-events-none transition-all ${
          theme === 'retro' 
            ? 'text-white bg-[#008080] group-hover:bg-[#000080]' 
            : 'text-white font-medium macos-text-shadow rounded-md'
        }`} 
        style={theme === 'retro' ? { textShadow: '1px 1px 0 #000' } : {}}
      >
        {label}
      </span>
    </motion.div>
  );
};
