import React, { useState, useEffect } from 'react';
import { Activity, Clock, Zap } from 'lucide-react';
import type { Theme } from '../types';

interface WidgetProps {
  theme: Theme;
}

export const DesktopWidgets = ({ theme }: WidgetProps) => {
  const [cpu, setCpu] = useState(24);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const isMacos = theme === 'macos';

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setCpu(prev => Math.max(10, Math.min(95, prev + (Math.random() * 10 - 5))));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isMacos) {
    return (
      <div className="absolute top-12 right-6 flex flex-col gap-4 z-0 pointer-events-none opacity-80">
        <div className="macos-glass p-4 rounded-[24px] w-36 h-36 flex flex-col items-center justify-center gap-2 shadow-xl border border-white/40">
          <Clock size={32} className="text-blue-500" />
          <span className="text-xl font-bold tracking-tight text-white macos-text-shadow tabular-nums">{time.split(' ')[0]}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">System Clock</span>
        </div>

        <div className="macos-glass p-4 rounded-[24px] w-36 h-36 flex flex-col items-center justify-center gap-3 shadow-xl border border-white/40">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
              <circle cx="32" cy="32" r="28" fill="none" stroke="#34C759" strokeWidth="6" strokeDasharray={176} strokeDashoffset={176 - (cpu / 100) * 176} className="transition-all duration-1000" />
            </svg>
            <Activity className="absolute text-white opacity-50" size={20} />
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-white macos-text-shadow tabular-nums">{Math.round(cpu)}%</span>
            <p className="text-[9px] font-bold uppercase tracking-widest text-green-300">Vibe Usage</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-16 right-6 flex flex-col gap-4 z-0 font-retro">
      <div className="bg-[#c0c0c0] retro-border p-3 w-40 space-y-2 shadow-lg">
        <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
          <Clock size={14} />
          <span className="text-xs font-bold uppercase">System Info</span>
        </div>
        <div className="bg-white retro-border-inset p-2 text-center">
          <span className="text-xl font-bold tabular-nums tracking-tighter">{time}</span>
        </div>
      </div>

      <div className="bg-[#c0c0c0] retro-border p-3 w-40 space-y-3 shadow-lg">
        <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
          <Zap size={14} className="text-yellow-600" />
          <span className="text-xs font-bold uppercase">Resources</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold uppercase">
            <span>CPU</span>
            <span>{Math.round(cpu)}%</span>
          </div>
          <div className="h-4 w-full bg-white retro-border-inset flex p-0.5 gap-0.5">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 h-full transition-colors ${i < cpu / 10 ? 'bg-green-600' : 'bg-transparent'}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
