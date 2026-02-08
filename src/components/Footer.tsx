import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="safe-area-bottom mt-auto border-t border-[hsl(var(--border))] py-6 text-xs text-[hsl(var(--muted-foreground))]">
      <p>32 curated Austin coffee shops. No ads, no affiliates.</p>
      <p className="mt-1">
        Made with love by{' '}
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
