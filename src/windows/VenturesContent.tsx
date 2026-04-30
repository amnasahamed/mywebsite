import type { Theme } from '../types';

export const VenturesContent = ({ theme }: { theme?: Theme }) => {
  const isMacos = theme === 'macos';

  const ventures = [
    {
      date: 'Since 2021',
      title: 'CLAPS Learn',
      role: 'Founding Partner',
      desc: 'Co-founding and leading the end-to-end growth of a personalized EdTech platform. Scaled across multiple cities.',
      points: [
        'Designed learning systems and operational workflows.',
        'Built internal tools and automation pipelines.',
        'Driving product innovation and business strategy.'
      ]
    },
    {
      date: 'Since 2022',
      title: 'Pelago Consultants',
      role: 'Founding Partner',
      desc: 'Leading the digital transformation of a modern tax & compliance firm, shifting toward a digital-first model.',
      points: [
        'Built full digital presence and marketing funnels.',
        'Created internal tools for client communication.',
        'Strengthened lead generation through structured strategy.'
      ]
    },
    {
      date: '2023 - 2025',
      title: 'Desgro Creatives',
      role: 'Technology Consultant',
      desc: 'Established foundational systems of a modern creative agency, focusing on process-driven delivery.',
      points: [
        'Hired and onboarded the foundational creative team.',
        'Leading technical consulting for digital experiences.'
      ]
    }
  ];

  return (
    <div className={`space-y-8 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`} id="ventures">
      <div className="flex flex-col gap-1">
        <h2 className={`text-2xl font-bold tracking-tight ${isMacos ? 'text-black' : ''}`}>My Ventures</h2>
        <p className={`text-sm opacity-60 font-medium`}>Building businesses that create impact</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ventures.map((v, i) => (
          <div key={i} className={`p-5 transition-all ${
            isMacos 
              ? 'macos-glass-dark/5 rounded-[24px] border border-black/5 hover:border-blue-200' 
              : 'retro-border-thin bg-white'
          }`}>
            <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isMacos ? 'text-blue-500' : 'text-gray-500'}`}>
              {v.date}
            </div>
            <h3 className={`font-bold text-lg ${isMacos ? 'text-black' : ''}`}>{v.title}</h3>
            <div className={`text-sm font-bold mb-3 ${isMacos ? 'text-blue-600' : 'text-[#000080]'}`}>{v.role}</div>
            <p className="text-sm leading-relaxed mb-4 opacity-80">{v.desc}</p>
            <ul className="space-y-2">
              {v.points.map((p, j) => (
                <li key={j} className="flex gap-2 text-xs font-medium">
                  <span className={isMacos ? 'text-blue-500' : 'text-blue-800'}>•</span>
                  <span className="opacity-70">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
