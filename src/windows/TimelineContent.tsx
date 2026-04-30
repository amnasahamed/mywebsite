import { History } from 'lucide-react';
import type { Theme } from '../types';

export const TimelineContent = ({ theme }: { theme?: Theme }) => {
  const isMacos = theme === 'macos';

  return (
    <div className={`p-4 min-h-full ${isMacos ? 'text-gray-800' : 'bg-[#f8f8f8] text-black font-retro'}`}>
      <h2 className={`text-2xl font-bold mb-6 border-b-2 pb-2 flex items-center gap-2 ${isMacos ? 'border-gray-100 text-black' : 'border-gray-400'}`}>
        <History size={24} /> My Journey
      </h2>
      <div className={`relative border-l-2 ml-3 space-y-8 pb-4 ${isMacos ? 'border-gray-200' : 'border-gray-400'}`}>
        
        {[
          {
            tag: 'Current',
            title: 'Edapt × IIT Madras Pravartak',
            role: 'GenAI Educator & Product Manager',
            desc: 'Collaborating on the Applied AI Mastery Program. Teaching practical AI adoption and responsibility.',
            color: 'bg-blue-500'
          },
          {
            tag: 'Since 2022',
            title: 'Pelago Consultants',
            role: 'Founding Partner',
            desc: 'Strategic consulting for business growth and operational optimization.',
            color: 'bg-gray-400'
          },
          {
            tag: 'Since 2021',
            title: 'CLAPS Learn',
            role: 'Co-Founder',
            desc: 'Embedded AI chatbots to understand visitor intent and increase engagement.',
            color: 'bg-gray-400'
          },
          {
            tag: 'Active',
            title: 'DesGro',
            role: 'Founding Partner',
            desc: 'Creative operations agency delivering digital experiences and design.',
            color: 'bg-gray-400'
          }
        ].map((item, i) => (
          <div key={i} className="relative pl-6">
            <div className={`absolute w-3 h-3 rounded-full -left-[7.5px] top-1.5 ${isMacos ? item.color : 'bg-[#000080] retro-border-thin'}`}></div>
            <div className={`text-[10px] font-bold mb-1 inline-block px-2 py-0.5 ${
              isMacos ? 'bg-gray-100 text-gray-500 rounded-full' : 'bg-[#e6f2ff] text-[#000080] retro-border-thin'
            }`}>
              {item.tag}
            </div>
            <h3 className={`font-bold text-lg ${isMacos ? 'text-black' : ''}`}>{item.title}</h3>
            <div className={`text-sm font-semibold mb-1 ${isMacos ? 'text-blue-600' : 'text-gray-700'}`}>{item.role}</div>
            <p className={`text-sm leading-relaxed ${isMacos ? 'opacity-70' : 'text-gray-600'}`}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
