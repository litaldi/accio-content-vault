
import React from 'react';

export const ImprovedSkipLinks: React.FC = () => {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="fixed top-4 left-4 z-50 bg-background border border-border px-4 py-2 rounded-md font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="fixed top-4 left-32 z-50 bg-background border border-border px-4 py-2 rounded-md font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
      >
        Skip to navigation
      </a>
      <a
        href="#search"
        className="fixed top-4 left-60 z-50 bg-background border border-border px-4 py-2 rounded-md font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
      >
        Skip to search
      </a>
    </div>
  );
};
