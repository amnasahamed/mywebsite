import type { Theme } from '../types';

export const SheetsChatContent = ({ theme }: { theme?: Theme }) => {
  const isMacos = theme === 'macos';

  return (
    <div className={`space-y-6 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`}>
      <div className="flex items-center gap-5 border-b border-gray-100 pb-5">
        <img 
          src="/media/sheetschat.png" 
          alt="SheetsChat" 
          className={`w-16 h-16 bg-white p-1.5 ${isMacos ? 'rounded-2xl shadow-xl border border-white/50' : 'retro-border'}`} 
        />
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${isMacos ? 'text-black' : ''}`}>SheetsChat</h1>
          <p className={`text-sm font-medium ${isMacos ? 'text-gray-500' : 'text-gray-600'}`}>Turn your Google Sheets into AI Chatbots</p>
        </div>
      </div>

      <div className={`p-4 shadow-sm ${
        isMacos 
          ? 'bg-blue-50/50 rounded-2xl border border-blue-100' 
          : 'bg-[#e3f2fd] retro-border-thin'
      }`}>
        <p className="text-sm leading-relaxed font-medium">
          Deploy custom AI chat widgets to any website in minutes. Manage knowledge, logs, and leads—all from the comfort of a spreadsheet.
        </p>
        <div className="mt-4">
          <a 
            href="https://sheetschat.amnasahamed.com/post-install" 
            target="_blank" 
            rel="noreferrer"
            className={`inline-block px-5 py-2 text-xs font-bold transition-all ${
              isMacos 
                ? 'bg-[#007AFF] text-white rounded-full hover:bg-blue-600 shadow-md hover:shadow-lg active:scale-95' 
                : 'bg-[#c0c0c0] text-black retro-border active:retro-border-inset'
            }`}
          >
            Install Sheetbot Free
          </a>
        </div>
      </div>

      <section>
        <h2 className={`text-lg font-bold border-b pb-1 mb-4 ${isMacos ? 'border-gray-100 text-black' : 'border-gray-400'}`}>
          Why Choose SheetsChat?
        </h2>
        
        <div className="grid grid-cols-1 gap-5">
          {[
            { icon: '🚀', title: 'Zero Code Deployment', desc: 'Just copy and paste a single script tag to any website.' },
            { icon: '📊', title: 'Sheet-Powered Knowledge', desc: 'Add Q&A pairs to your spreadsheet and your bot learns instantly.' },
            { icon: '🛡️', title: 'Privacy First', desc: 'Your chat logs, leads, and API keys stay in your Google account.' }
          ].map((item) => (
            <div key={item.title} className="flex gap-4 group">
              <span className={`text-2xl transition-transform ${isMacos ? 'group-hover:scale-125' : ''}`}>{item.icon}</span>
              <div>
                <h3 className="font-bold text-sm">{item.title}</h3>
                <p className={`text-xs leading-relaxed opacity-70`}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className={`mt-8 pt-6 border-t flex flex-col items-center gap-5 ${isMacos ? 'border-gray-50' : 'border-gray-400'}`}>
        <a
          href="https://sheetschat.amnasahamed.com"
          target="_blank"
          rel="noreferrer"
          className={`w-full text-center px-6 py-3 font-bold transition-all flex items-center justify-center gap-2 ${
            isMacos 
              ? 'bg-gray-900 text-white rounded-2xl hover:bg-black shadow-xl active:scale-[0.98]' 
              : 'bg-[#c0c0c0] text-black retro-border active:retro-border-inset'
          }`}
        >
          <img src="/media/sheetschat.png" alt="" className="w-5 h-5 brightness-110" />
          Visit SheetsChat.amnasahamed.com
        </a>
        
        <div className={`flex gap-6 text-[10px] uppercase tracking-widest font-bold ${isMacos ? 'text-gray-400' : 'text-gray-500'}`}>
          {['Setup', 'Help Center', 'Support'].map(link => (
            <a key={link} href={`https://sheetschat.amnasahamed.com/${link.toLowerCase().replace(' ', '-')}`} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="text-center text-[10px] opacity-40 mt-4 font-bold">
        © 2026 SheetsChat • Built with Google Apps Script
      </div>
    </div>
  );
};
