import type { Theme } from '../types';

export const CaseStudiesContent = ({ theme }: { theme?: Theme }) => {
  const isMacos = theme === 'macos';

  return (
    <div className={`space-y-8 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`} id="casestudies">
      <div className="flex flex-col gap-1">
        <h2 className={`text-2xl font-bold tracking-tight ${isMacos ? 'text-black' : ''}`}>Base of Stars</h2>
        <p className={`text-sm opacity-60 font-medium`}>Case Studies & Client Work</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Badria Sweets Case Study */}
        <div className={`p-6 transition-all ${
          isMacos 
            ? 'macos-glass-dark/5 rounded-[32px] border border-black/5' 
            : 'retro-border-thin bg-[#f8f8f8]'
        }`}>
          <div className="flex justify-between items-start mb-4">
            <h3 className={`font-bold text-xl ${isMacos ? 'text-blue-600' : 'text-[#000080]'}`}>Badria Sweets</h3>
            <span className={`text-[10px] font-bold px-2 py-1 ${
              isMacos ? 'bg-blue-100 text-blue-700 rounded-full' : 'bg-[#000080] text-white retro-border-thin'
            }`}>Food & Retail AI</span>
          </div>
          
          <p className="text-sm font-bold mb-4 uppercase tracking-tighter opacity-80">AI-Powered WhatsApp Automation</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className={`p-3 ${isMacos ? 'bg-white rounded-2xl shadow-sm border border-black/5' : 'retro-border-inset bg-white'}`}>
              <h4 className="font-bold text-xs opacity-50 mb-2 uppercase tracking-widest">The Challenge</h4>
              <ul className="space-y-1.5 text-xs font-medium opacity-80">
                <li>• High volume of repetitive questions</li>
                <li>• Risk of pricing mistakes by agents</li>
                <li>• Strict brand-safe Arabic requirements</li>
              </ul>
            </div>
            <div className={`p-3 ${isMacos ? 'bg-white rounded-2xl shadow-sm border border-black/5' : 'retro-border-inset bg-white'}`}>
              <h4 className="font-bold text-xs opacity-50 mb-2 uppercase tracking-widest">The Solution</h4>
              <p className="text-xs font-medium opacity-80 mb-2">Hybrid AI workflow using WATI, n8n, and custom LLM agents.</p>
              <div className="flex flex-wrap gap-1">
                {['WATI API', 'n8n', 'AI Agent'].map(t => (
                  <span key={t} className={`text-[9px] font-bold px-1.5 py-0.5 ${isMacos ? 'bg-gray-100 rounded-md' : 'bg-gray-200 border border-gray-400'}`}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <blockquote className={`italic text-xs border-l-4 pl-3 py-1 mb-2 ${isMacos ? 'border-blue-500 bg-blue-50/50 rounded-r-lg' : 'border-[#000080] bg-blue-50 text-gray-700'}`}>
            "AI handles repetition while humans handle relationships."
          </blockquote>
        </div>

        {/* Navakeralam Case Study */}
        <div className={`p-6 transition-all ${
          isMacos 
            ? 'macos-glass-dark/5 rounded-[32px] border border-black/5' 
            : 'retro-border-thin bg-[#f8f8f8]'
        }`}>
          <div className="flex justify-between items-start mb-4">
            <h3 className={`font-bold text-xl ${isMacos ? 'text-blue-600' : 'text-[#000080]'}`}>Navakeralam</h3>
            <span className={`text-[10px] font-bold px-2 py-1 ${
              isMacos ? 'bg-green-100 text-green-700 rounded-full' : 'bg-[#008000] text-white retro-border-thin'
            }`}>Govt. Web Portal</span>
          </div>
          
          <p className="text-sm font-bold mb-1 uppercase tracking-tighter opacity-80">Citizen Response Programme</p>
          <p className={`text-[10px] mb-6 font-mono opacity-60`}>ജനകീയ സർക്കാർ, ജനങ്ങളെ കേൾക്കാൻ</p>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { val: 'State-wide', label: 'Coverage' },
              { val: '2 Months', label: 'Duration' },
              { val: 'Bilingual', label: 'ML & EN' }
            ].map(stat => (
              <div key={stat.label} className={`p-2 text-center transition-all ${isMacos ? 'bg-white rounded-2xl shadow-sm border border-black/5' : 'retro-border-thin bg-[#e0e0e0]'}`}>
                <div className="font-bold text-xs">{stat.val}</div>
                <div className="text-[9px] opacity-50 uppercase font-bold">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed opacity-70 font-medium">A historic digital initiative enabling direct citizen participation in shaping Kerala's development policies.</p>
        </div>
      </div>
    </div>
  );
};
