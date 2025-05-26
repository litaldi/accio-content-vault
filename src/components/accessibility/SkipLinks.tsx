
import React from 'react';
import { cn } from '@/lib/utils';

const SkipLinks: React.FC = () => {
  const skipLinks = [
    { href: '#main-content', label: 'Skip to main content' },
    { href: '#navigation', label: 'Skip to navigation' },
    { href: '#footer', label: 'Skip to footer' },
  ];

  return (
    <div className="sr-only focus-within:not-sr-only">
      {skipLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className={cn(
            "absolute top-0 left-0 z-50 p-3 m-3",
            "bg-primary text-primary-foreground",
            "rounded-md font-medium text-sm",
            "focus:not-sr-only focus:absolute focus:top-0 focus:left-0",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "transition-all duration-200"
          )}
          onFocus={(e) => {
            // Ensure the skip link is visible when focused
            e.currentTarget.style.position = 'absolute';
            e.currentTarget.style.top = '1rem';
            e.currentTarget.style.left = '1rem';
            e.currentTarget.style.zIndex = '9999';
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default SkipLinks;
