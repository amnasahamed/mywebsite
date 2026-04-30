import React from 'react';
import type { Theme } from '../types';

interface AppIconProps {
  icon: React.ReactNode;
  theme: Theme;
  type?: 'blue' | 'purple' | 'yellow' | 'orange' | 'pink' | 'green' | 'black' | 'white' | 'none';
  size?: number;
  className?: string;
}

export const AppIcon = ({ icon, theme, type = 'none', size = 32, className = '' }: AppIconProps) => {
  const isMacos = theme === 'macos';

  if (!isMacos || type === 'none') {
    return (
      <div className={`icon-base-retro ${className}`}>
        {icon}
      </div>
    );
  }

  return (
    <div 
      className={`icon-base-macos icon-${type}-macos ${className}`}
      style={{ width: size + 16, height: size + 16 }}
    >
      <div className={`flex items-center justify-center ${type === 'white' ? 'text-black' : 'text-white'}`}>
        {React.cloneElement(icon as React.ReactElement, { size })}
      </div>
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
    </div>
  );
};
