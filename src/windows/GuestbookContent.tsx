import React, { useState, useEffect, useCallback } from 'react';
import type { Theme } from '../types';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  mood: string;
  timestamp: number;
}

const STORAGE_KEY = 'amnasos-guestbook';
const MAX_MESSAGE_LENGTH = 200;
const MOODS = ['😊', '😎', '🤔', '🔥', '❤️', '🍵'];

const DEFAULT_ENTRIES: GuestbookEntry[] = [
  {
    id: 'default-1',
    name: 'A Fellow Entrepreneur',
    message: "Let's collaborate! Hit me up. 🔥",
    mood: '🔥',
    timestamp: new Date('2026-04-08T22:30:00').getTime(),
  },
  {
    id: 'default-2',
    name: 'ChatGPT',
    message: "As an AI, I find this website's commitment to retro aesthetics... commendable.",
    mood: '🤔',
    timestamp: new Date('2026-04-08T20:15:00').getTime(),
  }
];

export const GuestbookContent = ({ theme }: { theme?: Theme }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const isMacos = theme === 'macos';

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setEntries(JSON.parse(stored));
    } else {
      setEntries(DEFAULT_ENTRIES);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      mood: selectedMood,
      timestamp: Date.now(),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setName('');
    setMessage('');
    setSelectedMood('');
  };

  return (
    <div className={`space-y-6 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`}>
      <div className="flex flex-col gap-1">
        <h2 className={`text-2xl font-bold tracking-tight ${isMacos ? 'text-black' : ''}`}>Guestbook</h2>
        <p className="text-sm opacity-60 font-medium">Leave your mark on this corner of the internet</p>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className={`p-5 space-y-4 ${isMacos ? 'bg-black/5 rounded-[24px]' : 'retro-border-thin bg-[#e0e0e0]'}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold opacity-50 tracking-widest ml-1">Your Name</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 text-sm outline-none transition-all ${
                isMacos ? 'bg-white rounded-xl border border-black/5 focus:ring-2 focus:ring-blue-500/20' : 'retro-border-inset bg-white'
              }`}
              placeholder="CoolVisitor99"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold opacity-50 tracking-widest ml-1">Mood</label>
            <div className="flex gap-1">
              {MOODS.map(m => (
                <button 
                  key={m}
                  type="button"
                  onClick={() => setSelectedMood(m)}
                  className={`w-8 h-8 flex items-center justify-center transition-all ${
                    selectedMood === m 
                      ? isMacos ? 'bg-blue-500 text-white rounded-lg shadow-md scale-110' : 'retro-border-inset bg-gray-400'
                      : isMacos ? 'bg-white rounded-lg border border-black/5 hover:bg-gray-50' : 'retro-border-thin bg-[#c0c0c0]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold opacity-50 tracking-widest ml-1">Message</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full px-3 py-2 text-sm outline-none transition-all h-20 resize-none ${
              isMacos ? 'bg-white rounded-xl border border-black/5 focus:ring-2 focus:ring-blue-500/20' : 'retro-border-inset bg-white'
            }`}
            placeholder="What's on your mind?"
          />
        </div>

        <button 
          className={`w-full py-3 font-bold transition-all ${
            isMacos ? 'bg-[#007AFF] text-white rounded-xl shadow-lg hover:bg-blue-600' : 'bg-[#c0c0c0] text-black retro-border active:retro-border-inset'
          }`}
        >
          Sign Guestbook
        </button>
      </form>

      <div className={`space-y-3 max-h-[300px] overflow-y-auto pr-2 ${!isMacos ? 'retro-scrollbar' : ''}`}>
        {entries.map(entry => (
          <div 
            key={entry.id} 
            className={`p-4 transition-all ${
              isMacos ? 'bg-white rounded-2xl shadow-sm border border-black/5 hover:shadow-md' : 'retro-border-thin bg-white'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">{entry.mood}</span>
                <span className={`text-xs font-bold ${isMacos ? 'text-black' : 'text-[#000080]'}`}>{entry.name}</span>
              </div>
              <span className="text-[9px] opacity-40 font-bold uppercase tracking-tighter">
                {new Date(entry.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs leading-relaxed opacity-70 font-medium">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
