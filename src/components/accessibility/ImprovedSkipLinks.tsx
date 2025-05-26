
import React from 'react';
import { cn } from '@/lib/utils';

const ImprovedSkipLinks: React.FC = () => {
  const skipLinks = [
    { href: '#main-content', label: 'Skip to main content' },
    { href: '#navigation', label: 'Skip to navigation' },
    { href: '#footer', label: 'Skip to footer' },
    { href: '#search', label: 'Skip to search' },
  ];

  return (
    <>
      {/* Screen reader announcement region */}
      <div
        id="sr-announcements"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      
      {/* Skip navigation links */}
      <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-0 focus-within:left-0 focus-within:z-[9999] focus-within:w-full focus-within:bg-background focus-within:p-4 focus-within:shadow-lg focus-within:border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 justify-start">
            {skipLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={cn(
                  "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium",
                  "bg-primary text-primary-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  "hover:bg-primary/90 transition-colors duration-200",
                  "transform translate-y-0 focus:translate-y-0",
                  "opacity-100 focus:opacity-100"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(link.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Focus the target element if it's focusable
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
          <p className="text-sm text-muted-foreground mt-2">
            Use Tab to navigate between these quick access links
          </p>
        </div>
      </div>
    </>
  );
};

export default ImprovedSkipLinks;
