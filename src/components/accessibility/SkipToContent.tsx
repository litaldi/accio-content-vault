
import React from 'react';
import { cn } from '@/lib/utils';

const SkipToContent: React.FC = () => {
  const skipLinks = [
    { href: '#main-content', label: 'Skip to main content' },
    { href: '#navigation', label: 'Skip to navigation' },
    { href: '#footer', label: 'Skip to footer' },
  ];

  return (
    <div className="sr-only focus-within:not-sr-only fixed top-0 left-0 z-[100] bg-background border border-border shadow-lg">
      <div className="flex gap-2 p-4">
        {skipLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={cn(
              "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium",
              "bg-primary text-primary-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "hover:bg-primary/90 transition-colors duration-200"
            )}
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector(link.href);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (target instanceof HTMLElement && target.tabIndex >= 0) {
                  target.focus();
                }
              }
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SkipToContent;
