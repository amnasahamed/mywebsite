import { Trash2 } from 'lucide-react';
import type { Theme } from '../types';

export const RecycleBinContent = ({ theme }: { theme?: Theme }) => {
  const isMacos = theme === 'macos';

  const deletedItems = [
    { title: 'Automatic Trading Tool', desc: 'Spent countless hours building this. Ended up in a loss anyway. The market always wins.' },
    { title: 'DevMind Dashboard', desc: 'A local project database setup. Ironically became another unfinished project that needed organizing.' },
    { title: 'WhatsApp Group Manager', desc: 'Tried to tame the chaos of groups. Turns out, managing people is harder than code.' },
    { title: 'ID Card & Certificate Generators', desc: 'Built these perfect utility tools. Then I realized Canva exists.' }
  ];

  return (
    <div className={`space-y-6 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`}>
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
        <Trash2 size={32} className={isMacos ? 'text-gray-400' : 'text-gray-600'} />
        <div>
          <h2 className={`text-xl font-bold tracking-tight ${isMacos ? 'text-black' : ''}`}>{isMacos ? 'Trash' : 'Recycle Bin'}</h2>
          <p className="text-[10px] font-bold uppercase opacity-40 tracking-widest leading-tight mt-0.5">Graveyard of failed ideas</p>
        </div>
      </div>

      <div className="space-y-4">
        {deletedItems.map((item, i) => (
          <div key={i} className={`p-4 transition-all ${
            isMacos ? 'bg-black/5 rounded-2xl border border-black/5 group hover:bg-black/10' : 'retro-border-thin bg-white'
          }`}>
            <h3 className={`font-bold text-sm line-through ${isMacos ? 'text-gray-500' : 'text-red-700'}`}>{item.title}</h3>
            <p className="text-xs mt-1 leading-relaxed opacity-70 font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-4">
        <button className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
          isMacos ? 'bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-600' : 'bg-[#c0c0c0] retro-border active:retro-border-inset'
        }`}>
          {isMacos ? 'Empty Trash' : 'Empty Recycle Bin'}
        </button>
      </div>
    </div>
  );
};
