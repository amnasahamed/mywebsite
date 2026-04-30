import React, { useState } from 'react';
import { Lock, Unlock, Zap } from 'lucide-react';
import type { Theme } from '../types';

export const SecretZipContent = ({ theme }: { theme?: Theme }) => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const isMacos = theme === 'macos';

  const handleUnlock = () => {
    if (password.toLowerCase() === 'vibe') {
      setIsUnlocked(true);
    } else {
      alert('Incorrect password! Hint: It starts with "v" and ends with "e".');
    }
  };

  if (isUnlocked) {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-6 text-center space-y-6 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`}>
        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
          <Zap size={40} className="text-white fill-white" />
        </div>
        <h2 className="text-2xl font-bold italic">You found the Secret!</h2>
        <p className="text-sm leading-relaxed max-w-xs">
          "True building happens when the barrier isn't syntax, but clarity of thought." 
          <br/><br/>
          You've unlocked the <strong>Experimental Vibe Mode</strong>. 
          (Just kidding, but you're a real power user!)
        </p>
        <button 
          onClick={() => window.open('https://github.com/amnasahamed', '_blank')}
          className={`px-6 py-2 font-bold ${isMacos ? 'bg-black text-white rounded-full' : 'bg-[#c0c0c0] retro-border active:retro-border-inset'}`}
        >
          View Secret Repos
        </button>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col items-center justify-center p-6 space-y-6 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`}>
      <Lock size={48} className="opacity-20" />
      <div className="text-center space-y-2">
        <h3 className="font-bold">Secret.zip is locked</h3>
        <p className="text-xs opacity-60">Enter password to extract contents</p>
      </div>
      <div className="w-full max-w-xs space-y-3">
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={`w-full px-3 py-2 text-center text-sm ${isMacos ? 'bg-black/5 rounded-xl border border-black/10' : 'bg-white retro-border-inset'}`}
        />
        <button 
          onClick={handleUnlock}
          className={`w-full py-2 font-bold flex items-center justify-center gap-2 transition-all ${
            isMacos ? 'bg-blue-500 text-white rounded-xl hover:bg-blue-600' : 'bg-[#c0c0c0] retro-border active:retro-border-inset'
          }`}
        >
          <Unlock size={14} />
          Extract Files
        </button>
      </div>
    </div>
  );
};
