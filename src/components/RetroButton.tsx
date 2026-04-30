import type { RetroButtonProps } from '../types';

export const RetroButton = ({
  children,
  className = '',
  active = false,
  ...props
}: RetroButtonProps) => (
  <button
    className={`bg-[#c0c0c0] px-3 py-1 text-sm focus:outline-none flex items-center gap-2
      ${active ? 'retro-border-inset bg-[#e0e0e0]' : 'retro-border active:retro-border-inset active:bg-[#e0e0e0]'}
      ${className}`}
    {...props}
  >
    {children}
  </button>
);
