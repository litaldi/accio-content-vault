
import React from 'react';
import { cn } from '@/lib/utils';

const SkipToContent: React.FC = () => {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-0 focus-within:left-0 focus-within:z-[100] focus-within:w-full focus-within:bg-background focus-within:border-b focus-within:border-border focus-within:shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-4 justify-center">
          <a
            href="#main-content"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
              "bg-primary text-primary-foreground font-medium text-sm",
              "hover:bg-primary/90 transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            )}
          >
            Skip to main content
          </a>
          <a
            href="#navigation"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
              "bg-secondary text-secondary-foreground font-medium text-sm",
              "hover:bg-secondary/90 transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            )}
          >
            Skip to navigation
          </a>
        </div>
      </div>
    </div>
  );
};

export default SkipToContent;
