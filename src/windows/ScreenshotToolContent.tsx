import React, { useState } from 'react';
import { Camera, Download, RefreshCcw, AlertTriangle } from 'lucide-react';
import domtoimage from 'dom-to-image-more';
import type { Theme } from '../types';

export const ScreenshotToolContent = ({ theme }: { theme?: Theme }) => {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMacos = theme === 'macos';

  const takeScreenshot = async () => {
    setIsCapturing(true);
    setError(null);
    
    // Select the desktop element specifically
    const element = document.body;
    
    try {
      // Use dom-to-image-more which handles complex CSS and modern colors better
      const dataUrl = await domtoimage.toPng(element, {
        cacheBust: true,
        style: {
          // Force some basic styles during capture to prevent glitches
          overflow: 'visible'
        }
      });
      setScreenshot(dataUrl);
    } catch (err: any) {
      console.error('Capture Error:', err);
      setError('System capture failed. This is likely due to high-res wallpaper textures.');
    } finally {
      setIsCapturing(false);
    }
  };

  const downloadScreenshot = () => {
    if (!screenshot) return;
    const link = document.createElement('a');
    link.download = `amnasos-capture-${Date.now()}.png`;
    link.href = screenshot;
    link.click();
  };

  return (
    <div className={`h-full flex flex-col p-6 space-y-6 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`}>
      <div className="text-center space-y-2">
        <div className={`w-16 h-16 mx-auto flex items-center justify-center ${isMacos ? 'bg-blue-500 text-white rounded-[16px] shadow-lg' : 'bg-[#c0c0c0] retro-border p-1'}`}>
          <Camera size={32} />
        </div>
        <h3 className="font-bold">System Capture</h3>
        <p className="text-xs opacity-60">Capture and share your workspace</p>
      </div>

      <div className={`flex-1 flex items-center justify-center border-2 border-dashed overflow-hidden ${isMacos ? 'border-black/10 rounded-2xl bg-black/5' : 'border-gray-400 bg-gray-100'}`}>
        {screenshot ? (
          <img src={screenshot} alt="Capture Preview" className="max-h-full max-w-full object-contain shadow-md" />
        ) : (
          <div className="text-center px-4 space-y-2">
            {error ? (
              <>
                <AlertTriangle className="mx-auto text-amber-500" size={24} />
                <p className="text-[10px] text-amber-700 font-bold uppercase">{error}</p>
              </>
            ) : (
              <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">No capture yet</p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {screenshot ? (
          <>
            <button 
              onClick={() => setScreenshot(null)}
              className={`flex-1 py-2 font-bold flex items-center justify-center gap-2 transition-all ${isMacos ? 'bg-gray-100 rounded-xl hover:bg-gray-200' : 'bg-[#c0c0c0] retro-border active:retro-border-inset'}`}
            >
              <RefreshCcw size={14} />
              Retake
            </button>
            <button 
              onClick={downloadScreenshot}
              className={`flex-1 py-2 font-bold flex items-center justify-center gap-2 transition-all ${isMacos ? 'bg-blue-500 text-white rounded-xl hover:bg-blue-600' : 'bg-[#c0c0c0] retro-border active:retro-border-inset'}`}
            >
              <Download size={14} />
              Save PNG
            </button>
          </>
        ) : (
          <button 
            disabled={isCapturing}
            onClick={takeScreenshot}
            className={`w-full py-3 font-bold flex items-center justify-center gap-2 transition-all ${
              isMacos ? 'bg-blue-500 text-white rounded-xl hover:bg-blue-600' : 'bg-[#c0c0c0] retro-border active:retro-border-inset'
            } disabled:opacity-50 active:scale-[0.98]`}
          >
            <Camera size={16} />
            {isCapturing ? 'Capturing...' : 'Capture Desktop'}
          </button>
        )}
      </div>
    </div>
  );
};
