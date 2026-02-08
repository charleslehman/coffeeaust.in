import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="safe-area-bottom border-t border-[hsl(var(--border))] py-5 text-center text-xs text-[hsl(var(--muted-foreground))]">
      <p>
        32 curated shops &middot;{' '}
        <a
          href="https://charleslehman.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-[hsl(var(--foreground))]"
        >
          Charlie Lehman
        </a>
      </p>
    </footer>
  );
};
