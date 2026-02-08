import React from 'react';
import { Coffee } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="safe-area-top flex items-center gap-2.5 pb-0 pt-6 sm:pt-8">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
        <Coffee className="h-4 w-4 text-[hsl(var(--primary))]" />
      </div>
      <span className="text-sm font-semibold tracking-tight text-[hsl(var(--foreground))]">
        coffeeaust.in
      </span>
    </header>
  );
};
