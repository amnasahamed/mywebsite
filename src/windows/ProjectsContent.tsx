import type { Theme } from '../types';

export const ProjectsContent = ({ theme }: { theme?: Theme }) => {
  const isMacos = theme === 'macos';

  return (
    <div className={`space-y-8 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`} id="projects">
      <div className="flex flex-col gap-1">
        <h2 className={`text-2xl font-bold tracking-tight ${isMacos ? 'text-black' : ''}`}>Featured Projects</h2>
        <p className={`text-sm opacity-60 font-medium`}>Products built from real problems</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* ClapsBoard */}
        <div className={`p-5 transition-all ${
          isMacos 
            ? 'macos-glass-dark/5 rounded-[20px] border border-black/5 hover:border-blue-200 hover:shadow-lg' 
            : 'retro-border-thin bg-[#f0f0f0]'
        }`}>
          <div className="flex justify-between items-start mb-3">
            <h3 className={`font-bold text-lg ${isMacos ? 'text-blue-600' : 'text-[#000080]'}`}>ClapsBoard</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 ${
              isMacos ? 'bg-green-100 text-green-700 rounded-full' : 'bg-green-200 text-green-800 retro-border-thin'
            }`}>Free Tool</span>
          </div>
          <p className="text-sm mb-2 font-bold opacity-80 uppercase tracking-tighter">The whiteboard that keeps teachers visible</p>
          <p className="text-sm mb-4 leading-relaxed opacity-70">Teaching on Zoom from a phone often turns the camera off when sharing screens. Built ClapsBoard to solve this with a picture-in-picture camera, infinite canvas, and real-time annotation.</p>
          <div className="flex flex-wrap gap-2">
            {['📹 PiP Camera', '✍️ Real-time Annotation', '📱 Mobile First'].map(tag => (
              <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 ${
                isMacos ? 'bg-white/50 border border-black/5 rounded-md' : 'bg-white retro-border-thin'
              }`}>{tag}</span>
            ))}
          </div>
        </div>

        {/* WeddingTracker */}
        <div className={`p-5 transition-all ${
          isMacos 
            ? 'macos-glass-dark/5 rounded-[20px] border border-black/5 hover:border-blue-200 hover:shadow-lg' 
            : 'retro-border-thin bg-[#fafafa]'
        }`}>
          <div className="flex justify-between items-start mb-3">
            <h3 className={`font-bold text-lg ${isMacos ? 'text-blue-600' : 'text-[#000080]'}`}>WeddingTracker</h3>
            <a href="https://invite.vahiy.in/" target="_blank" rel="noreferrer" className={`text-xs font-bold underline ${isMacos ? 'text-blue-500' : 'text-blue-600'}`}>Visit App ↗</a>
          </div>
          <p className="text-sm mb-2 font-bold opacity-80 uppercase tracking-tighter">Guest management made simple</p>
          <p className="text-sm mb-4 leading-relaxed opacity-70">Turned my wedding planning chaos into a simple SaaS. Built to track guest communications (calls, messages, follow-ups) and import contacts easily.</p>
          <div className="flex flex-wrap gap-2">
            {['📥 Gmail Auth', '💬 Interaction Logging', '📱 Responsive'].map(tag => (
              <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 ${
                isMacos ? 'bg-white/50 border border-black/5 rounded-md' : 'bg-white retro-border-thin'
              }`}>{tag}</span>
            ))}
          </div>
        </div>

        {/* RapidSEO Audit */}
        <div className={`p-5 transition-all ${
          isMacos 
            ? 'macos-glass-dark/5 rounded-[20px] border border-black/5 hover:border-blue-200 hover:shadow-lg' 
            : 'retro-border-thin bg-[#f0f0f0]'
        }`}>
          <div className="flex justify-between items-start mb-3">
            <h3 className={`font-bold text-lg ${isMacos ? 'text-blue-600' : 'text-[#000080]'}`}>RapidSEO Audit</h3>
            <a href="http://seo.vahiy.in/" target="_blank" rel="noreferrer" className={`text-xs font-bold underline ${isMacos ? 'text-blue-500' : 'text-blue-600'}`}>Try it ↗</a>
          </div>
          <p className="text-sm mb-2 font-bold opacity-80 uppercase tracking-tighter">AI-Powered Landing Page Analyzer</p>
          <p className="text-sm mb-4 leading-relaxed opacity-70">A simple tool using AI to give quick feedback on landing page conversion potential. Adapted from an n8n community workflow.</p>
          <div className="flex flex-wrap gap-2">
            {['🔍 AI Audit', '🤖 n8n Workflow', '🚀 Fast Feedback'].map(tag => (
              <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 ${
                isMacos ? 'bg-white/50 border border-black/5 rounded-md' : 'bg-white retro-border-thin'
              }`}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
