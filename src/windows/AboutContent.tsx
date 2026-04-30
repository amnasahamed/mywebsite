import type { Theme } from '../types';

export const AboutContent = ({ theme }: { theme?: Theme }) => {
  const isMacos = theme === 'macos';

  return (
    <div className={`space-y-6 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`} id="about">
      <div className="flex flex-col gap-1">
        <h1 className={`text-3xl font-bold tracking-tight ${isMacos ? 'text-black' : ''}`}>
          Hey, I'm Amnas Ahamed 👋
        </h1>
        <p className={`text-lg font-semibold ${isMacos ? 'text-blue-600' : 'text-[#000080]'}`}>
          I build things that actually work 
          <br/>
          <span className="text-sm font-normal opacity-70">(and occasionally fix things that don't)</span>
        </p>
      </div>
      
      <div className={`p-3 text-sm ${
        isMacos 
          ? 'bg-blue-50/50 border border-blue-100 rounded-2xl shadow-sm' 
          : 'bg-[#ffffcc] retro-border-thin'
      }`}>
        <strong>Currently:</strong> Turning curiosity into products • Teaching AI at IIT Madras • Vibe coding my way through problems
      </div>

      <section>
        <h2 className={`text-lg font-bold border-b pb-1 mb-3 ${isMacos ? 'border-gray-200 text-black' : 'border-gray-400'}`}>
          About Me
        </h2>
        <div className="space-y-3 leading-relaxed">
          <p>Entrepreneur passionate about building clear systems, strong operations, and meaningful digital experiences.</p>
          <p>I'm that person who sees something broken and thinks "I could probably fix that." Then spends 2 months actually fixing it while everyone else says "that's just how it works."</p>
          <p>My background is a bit of a patchwork — MBA in Operations & Marketing, UGC NET qualified, and somehow found myself in PR, content, media, and creative work before landing in tech.</p>
        </div>
      </section>
      
      <blockquote className={`italic text-sm border-l-4 pl-4 py-2 my-6 ${
        isMacos 
          ? 'border-blue-500 bg-blue-50/30 rounded-r-lg text-gray-700' 
          : 'border-blue-800 bg-blue-50 text-gray-700'
      }`}>
        "Sessions with learners remind me how far simple curiosity can really go... today, helping others understand AI practically feels like the most important work I can do."
      </blockquote>
      
      <section>
        <h2 className={`text-lg font-bold border-b pb-1 mb-3 ${isMacos ? 'border-gray-200 text-black' : 'border-gray-400'}`}>
          Top Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className={`${isMacos ? 'bg-gray-50 p-3 rounded-xl' : ''}`}>
            <h3 className={`font-bold text-[10px] uppercase opacity-50 mb-2 underline tracking-widest`}>Technical</h3>
            <ul className="list-disc pl-5 text-sm space-y-1 font-medium">
              <li>n8n Automation</li>
              <li>No-Code Development</li>
              <li>Systems Design</li>
              <li>WordPress / Web Dev</li>
            </ul>
          </div>
          <div className={`${isMacos ? 'bg-gray-50 p-3 rounded-xl' : ''}`}>
            <h3 className={`font-bold text-[10px] uppercase opacity-50 mb-2 underline tracking-widest`}>Business</h3>
            <ul className="list-disc pl-5 text-sm space-y-1 font-medium">
              <li>Operations Management</li>
              <li>Online Marketing</li>
              <li>Sales Forecasting</li>
              <li>Creative Operations</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className={`text-lg font-bold border-b pb-1 mb-3 ${isMacos ? 'border-gray-200 text-black' : 'border-gray-400'}`}>
          Education
        </h2>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-start">
            <div>
              <strong className="block">MBA - Operations & Marketing</strong>
              <div className="text-xs opacity-60">Pondicherry University • 2021 - 2023</div>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 font-bold ${
              isMacos ? 'bg-blue-100 text-blue-700 rounded-full' : 'bg-blue-100 text-blue-800 retro-border-thin'
            }`}>UGC NET</span>
          </div>
          <div>
            <strong className="block">B.Sc Computer Science</strong>
            <div className="text-xs opacity-60">University of Calicut • 2016 - 2020</div>
          </div>
        </div>
      </section>
    </div>
  );
};
