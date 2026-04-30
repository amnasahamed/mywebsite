import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Theme } from '../types';

interface AIAssistantProps {
  theme: Theme;
  isNightMode: boolean;
}

export const AIAssistant = ({ theme, isNightMode }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMacos = theme === 'macos';

  // @ts-ignore
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isTyping]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setChat(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const prompt = `You are an AI assistant for Amnas Ahamed's portfolio. Amnas is an entrepreneur and systems builder. 
      He teaches AI at IIT Madras and builds tools like SheetsChat.
      Be helpful, concise, and professional. 
      If asked about his skills, mention n8n automation, no-code, and systems design.
      User asked: ${userMessage}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setChat(prev => [...prev, { role: 'bot', text }]);
    } catch (error) {
      setChat(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting to my brain right now. Try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-16 right-6 z-[500] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`w-80 h-[450px] flex flex-col overflow-hidden ${
              isMacos 
                ? 'macos-glass rounded-3xl macos-window-shadow border border-white/30' 
                : 'bg-[#c0c0c0] retro-border shadow-[2px_2px_10px_rgba(0,0,0,0.5)] font-retro'
            }`}
          >
            {/* Header */}
            <div className={`px-4 py-3 flex items-center justify-between ${
              isMacos ? 'bg-white/10' : 'bg-[#000080] text-white'
            }`}>
              <div className="flex items-center gap-2">
                {isMacos ? <Sparkles size={16} className="text-blue-400" /> : <Bot size={16} />}
                <span className="font-bold text-sm">{isMacos ? 'Amnas AI' : 'Clippy 2.0'}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70">
                <X size={16} />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className={`flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth ${
                !isMacos ? 'bg-white retro-border-inset m-1' : ''
              }`}
            >
              {chat.length === 0 && (
                <div className={`text-center py-10 space-y-2 opacity-60`}>
                  <Bot size={40} className="mx-auto" />
                  <p className="text-xs font-bold">Ask me anything about Amnas!</p>
                </div>
              )}
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? isMacos ? 'bg-blue-500 text-white rounded-2xl rounded-tr-none' : 'bg-blue-100 text-black border border-blue-200'
                      : isMacos ? 'bg-white/50 text-gray-800 rounded-2xl rounded-tl-none' : 'bg-gray-100 text-black border border-gray-300'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`px-3 py-2 rounded-2xl rounded-tl-none ${isMacos ? 'bg-white/30' : 'bg-gray-100 border'}`}>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className={`p-3 ${isMacos ? 'bg-white/5' : 'bg-[#c0c0c0]'}`}>
              <div className={`flex gap-2 p-1.5 ${isMacos ? 'bg-black/5 rounded-2xl' : 'bg-white retro-border-inset'}`}>
                <input 
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none outline-none text-xs px-2 py-1"
                />
                <button 
                  onClick={handleSend}
                  disabled={!message.trim() || isTyping}
                  className={`p-1.5 transition-all ${
                    isMacos ? 'bg-blue-500 text-white rounded-xl' : 'bg-[#c0c0c0] retro-border'
                  } disabled:opacity-50`}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 flex items-center justify-center shadow-2xl transition-all ${
          isMacos 
            ? 'macos-glass rounded-full border border-white/40 text-blue-500' 
            : 'bg-[#ffffcc] retro-border text-black'
        }`}
      >
        {isMacos ? (
          <div className="relative">
            <Bot size={28} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
          </div>
        ) : (
          <Bot size={28} />
        )}
      </motion.button>
    </div>
  );
};
