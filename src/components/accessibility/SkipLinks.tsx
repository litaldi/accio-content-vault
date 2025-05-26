
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
      {skipLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            "absolute top-4 left-4 z-50 bg-primary text-primary-foreground",
            "px-4 py-2 rounded-md font-medium transition-all",
            "focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "hover:bg-primary/90"
          )}
          onFocus={() => {
            // Announce to screen readers
            const announcement = `Skip link focused: ${link.label}`;
            const announceElement = document.getElementById('announcements');
            if (announceElement) {
              announceElement.textContent = announcement;
            }
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default SkipLinks;
