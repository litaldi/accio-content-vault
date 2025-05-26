
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
    const navigation = document.querySelector('[role="banner"] nav');
    if (navigation) {
      (navigation as HTMLElement).focus();
      navigation.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sr-only focus-within:not-sr-only">
      <button
        onClick={skipToContent}
        className={cn(
          "absolute top-4 left-4 z-[100]",
          "bg-primary text-primary-foreground",
          "px-4 py-2 rounded-md font-medium text-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "transition-all duration-200",
          "transform -translate-y-full focus:translate-y-0"
        )}
      >
        Skip to main content
      </button>
      <button
        onClick={skipToNavigation}
        className={cn(
          "absolute top-4 left-36 z-[100]",
          "bg-secondary text-secondary-foreground",
          "px-4 py-2 rounded-md font-medium text-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "transition-all duration-200",
          "transform -translate-y-full focus:translate-y-0"
        )}
      >
        Skip to navigation
      </button>
    </div>
  );
};

export default SkipLinks;
