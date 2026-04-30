import { useCallback, useRef } from 'react';

const SOUNDS = {
  startup: { freq: [523, 659, 784, 1047], duration: 0.8, type: 'sine' as OscillatorType },
  click: { freq: [800], duration: 0.05, type: 'square' as OscillatorType },
  open: { freq: [400, 600], duration: 0.12, type: 'sine' as OscillatorType },
  close: { freq: [600, 400], duration: 0.1, type: 'sine' as OscillatorType },
  minimize: { freq: [500, 350], duration: 0.08, type: 'sine' as OscillatorType },
  maximize: { freq: [350, 500], duration: 0.08, type: 'sine' as OscillatorType },
  error: { freq: [200, 150], duration: 0.3, type: 'square' as OscillatorType },
  menu: { freq: [600], duration: 0.04, type: 'square' as OscillatorType },
} as const;

export type SoundName = keyof typeof SOUNDS;

export function useSounds(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      try {
        const ctx = getCtx();
        const sound = SOUNDS[name];
        const now = ctx.currentTime;

        sound.freq.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = sound.type;
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + sound.duration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          const startOffset = i * (sound.duration / sound.freq.length);
          osc.start(now + startOffset);
          osc.stop(now + startOffset + sound.duration);
        });
      } catch {
        // AudioContext might not be available
      }
    },
    [enabled, getCtx]
  );

  return { play };
}
