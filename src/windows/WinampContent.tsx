import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, AlertCircle } from 'lucide-react';
import type { Theme } from '../types';

export const WinampContent = ({ theme }: { theme?: Theme }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isMacos = theme === 'macos';

  // Use a more reliable public audio URL
  const trackUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const handleError = () => {
      console.error('Audio playback failed');
      setError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('error', handleError);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('error', handleError);
      // Ensure audio stops if window is unmounted
      audio.pause();
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // If there's an ongoing play promise, wait for it before pausing
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        setError(false);
        playPromiseRef.current = audio.play();
        await playPromiseRef.current;
        setIsPlaying(true);
      } catch (err) {
        // Interrupted by pause or removal
        if (err instanceof DOMException && err.name === 'AbortError') {
          console.log('Playback interrupted');
        } else {
          setError(true);
        }
      } finally {
        playPromiseRef.current = null;
      }
    }
  };

  return (
    <div className={`h-full flex flex-col p-4 space-y-6 ${isMacos ? 'text-gray-800' : 'font-retro text-black bg-[#c0c0c0]'}`}>
      <audio ref={audioRef} src={trackUrl} loop crossOrigin="anonymous" />

      {/* Visualizer Area */}
      <div className={`h-32 flex items-end justify-center gap-1 p-2 relative ${
        isMacos ? 'bg-black/5 rounded-2xl border border-black/5' : 'bg-black retro-border-inset'
      }`}>
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 gap-2">
            <AlertCircle size={24} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Connection Failed</span>
          </div>
        ) : (
          [...Array(12)].map((_, i) => (
            <div 
              key={i}
              className={`w-2 transition-all duration-150 ${isMacos ? 'bg-blue-500/60 rounded-t-sm' : 'bg-green-500'}`}
              style={{ 
                height: isPlaying ? `${Math.random() * 80 + 20}%` : '10%',
                opacity: isPlaying ? 1 : 0.3
              }}
            />
          ))
        )}
      </div>

      {/* Song Info */}
      <div className="text-center">
        <h3 className={`font-bold text-sm truncate ${isMacos ? 'text-black' : ''}`}>Lo-fi Vibe Track #01</h3>
        <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest mt-1">Amnas Records • 1998</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className={`h-1.5 w-full relative overflow-hidden ${isMacos ? 'bg-black/10 rounded-full' : 'bg-white retro-border-inset'}`}>
          <div 
            className={`h-full transition-all duration-300 ${isMacos ? 'bg-blue-500' : 'bg-[#000080]'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-bold opacity-50">
          <span>0:00</span>
          <span>4:20</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <button className="opacity-50 hover:opacity-100 transition-opacity disabled:opacity-20" disabled={error}>
          <SkipBack size={18} fill="currentColor" />
        </button>
        <button 
          onClick={togglePlay}
          disabled={error}
          className={`w-12 h-12 flex items-center justify-center transition-all ${
            isMacos 
              ? 'bg-blue-500 text-white rounded-full shadow-lg hover:scale-105 active:scale-95' 
              : 'bg-[#c0c0c0] retro-border active:retro-border-inset p-1'
          } disabled:opacity-50`}
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>
        <button className="opacity-50 hover:opacity-100 transition-opacity disabled:opacity-20" disabled={error}>
          <SkipForward size={18} fill="currentColor" />
        </button>
      </div>

      {/* Volume / Extra */}
      <div className="flex items-center gap-3 px-4 opacity-70">
        <Volume2 size={14} />
        <div className={`h-1 flex-1 ${isMacos ? 'bg-black/10 rounded-full' : 'bg-white retro-border-inset'}`}>
          <div className={`h-full w-3/4 ${isMacos ? 'bg-gray-800' : 'bg-[#000080]'}`} />
        </div>
      </div>
    </div>
  );
};
