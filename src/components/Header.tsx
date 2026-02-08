import React from 'react';
import { Coffee } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="safe-area-top flex items-center gap-2.5 pb-0 pt-6 sm:pt-8">
      <button
        onClick={onReset}
        className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
        aria-label="Go back to home"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
          <Coffee className="h-4 w-4 text-[hsl(var(--primary))]" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-[hsl(var(--foreground))]">
          coffeeaust.in
        </span>
      </button>
    </header>
  );
};
