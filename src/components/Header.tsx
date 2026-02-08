import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="safe-area-top border-b border-[hsl(var(--border))] pb-6 pt-10 sm:pt-12">
      <h1 className="font-serif text-[2rem] font-normal tracking-tight text-[hsl(var(--foreground))]">
        coffeeaust.in
      </h1>
      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        one recommendation. no scrolling. just go.
      </p>
    </header>
  );
};
