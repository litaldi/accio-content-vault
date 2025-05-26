
import React from 'react';
import { cn } from '@/lib/utils';

const SkipLinks: React.FC = () => {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className={cn(
          "absolute top-4 left-4 z-[100]",
          "bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200 hover:bg-primary/90",
          "focus:not-sr-only focus:absolute"
        )}
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className={cn(
          "absolute top-4 left-32 z-[100]",
          "bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200 hover:bg-secondary/90",
          "focus:not-sr-only focus:absolute"
        )}
      >
        Skip to navigation
      </a>
    </div>
  );
};

export default SkipLinks;
