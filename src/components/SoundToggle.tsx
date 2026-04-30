import { Volume2, VolumeX } from 'lucide-react';
import { RetroButton } from './RetroButton';

interface SoundToggleProps {
  soundEnabled: boolean;
  onToggle: () => void;
}

export const SoundToggle = ({ soundEnabled, onToggle }: SoundToggleProps) => (
  <RetroButton
    className="h-full px-2"
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
  >
    {soundEnabled ? (
      <Volume2 size={14} className="text-green-700" />
    ) : (
      <VolumeX size={14} className="text-red-700" />
    )}
  </RetroButton>
);
