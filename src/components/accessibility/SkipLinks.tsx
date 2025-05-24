
import React from 'react';
import { cn } from '@/lib/utils';

const SkipLinks: React.FC = () => {
  const skipToContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skipToNavigation = () => {
    const navigation = document.querySelector('nav, [role="navigation"]');
    if (navigation) {
      (navigation as HTMLElement).focus();
      navigation.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skipToFooter = () => {
    const footer = document.querySelector('footer, [role="contentinfo"]');
    if (footer) {
      (footer as HTMLElement).focus();
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sr-only focus-within:not-sr-only">
      <nav
        className="fixed top-0 left-0 z-[9999] bg-primary text-primary-foreground p-4 space-x-4"
        aria-label="Skip navigation links"
      >
        <button
          onClick={skipToContent}
          className={cn(
            "px-4 py-2 bg-background text-foreground rounded",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          Skip to main content
        </button>
        <button
          onClick={skipToNavigation}
          className={cn(
            "px-4 py-2 bg-background text-foreground rounded",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          Skip to navigation
        </button>
        <button
          onClick={skipToFooter}
          className={cn(
            "px-4 py-2 bg-background text-foreground rounded",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          Skip to footer
        </button>
      </nav>
    </div>
  );
};

export default SkipLinks;
