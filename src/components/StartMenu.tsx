import { FileText, History, Code, Folder, Briefcase, Image as ImageIcon, Terminal, Mail, Trash2 } from 'lucide-react';
import type { StartMenuProps } from '../types';

export const StartMenu = ({ openWindow }: StartMenuProps) => (
  <div className="absolute bottom-10 left-0 w-64 bg-[#c0c0c0] retro-border flex flex-col shadow-[2px_2px_10px_rgba(0,0,0,0.5)] max-h-[80vh]">
    <div className="flex h-full">
      <div className="w-8 bg-gray-600 flex items-end justify-center py-2 shrink-0">
        <span className="text-white font-bold tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Amnas Ahamed
        </span>
      </div>
      <div className="flex-1 p-1 flex flex-col overflow-y-auto">
        <div className="hover:bg-[#000080] hover:text-white p-2 flex items-center gap-2 cursor-pointer" onClick={() => openWindow('about')}>
          <FileText size={20} className="text-blue-600" /> About Me
        </div>
        <div className="hover:bg-[#000080] hover:text-white p-2 flex items-center gap-2 cursor-pointer" onClick={() => openWindow('timeline')}>
          <History size={20} className="text-blue-800" /> Timeline
        </div>
        <div className="hover:bg-[#000080] hover:text-white p-2 flex items-center gap-2 cursor-pointer" onClick={() => openWindow('projects')}>
          <Code size={20} className="text-purple-600" /> Projects
        </div>
        <div className="hover:bg-[#000080] hover:text-white p-2 flex items-center gap-2 cursor-pointer" onClick={() => openWindow('ventures')}>
          <Folder size={20} className="text-yellow-500 fill-yellow-500" /> Ventures
        </div>
        <div className="hover:bg-[#000080] hover:text-white p-2 flex items-center gap-2 cursor-pointer" onClick={() => openWindow('casestudies')}>
          <Briefcase size={20} className="text-amber-700 fill-amber-700" /> Case Studies
        </div>
        <div className="hover:bg-[#000080] hover:text-white p-2 flex items-center gap-2 cursor-pointer" onClick={() => openWindow('media')}>
          <ImageIcon size={20} className="text-teal-600" /> Media
        </div>
        <div className="hover:bg-[#000080] hover:text-white p-2 flex items-center gap-2 cursor-pointer" onClick={() => openWindow('terminal')}>
          <Terminal size={20} className="text-black" /> Vibe Coding
        </div>
        <div className="border-t border-gray-400 my-1 retro-border-thin-inset"></div>
        <div className="hover:bg-[#000080] hover:text-white p-2 flex items-center gap-2 cursor-pointer" onClick={() => openWindow('contact')}>
          <Mail size={20} className="text-blue-500" /> Contact
        </div>
        <div className="hover:bg-[#000080] hover:text-white p-2 flex items-center gap-2 cursor-pointer" onClick={() => openWindow('recyclebin')}>
          <Trash2 size={20} className="text-gray-600" /> Recycle Bin
        </div>
      </div>
    </div>
  </div>
);
