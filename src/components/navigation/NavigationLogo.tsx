
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const NavigationLogo: React.FC = () => {
  const { announceToScreenReader } = useAccessibility();

  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-3 transition-all duration-200 rounded-lg p-2 -ml-2",
        "hover:opacity-90 hover:scale-105 active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "group"
      )}
      aria-label="Accio Knowledge Library - Go to homepage"
      onClick={() => announceToScreenReader('Navigating to homepage')}
    >
      <div className={cn(
        "w-8 h-8 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200",
        "bg-gradient-to-br from-primary via-primary to-primary/80",
        "group-hover:shadow-md group-hover:from-primary/90 group-hover:to-primary/70",
        "dark:from-primary dark:to-primary/90 dark:shadow-primary/20"
      )}>
        <span className="text-primary-foreground font-bold text-lg leading-none" aria-hidden="true">
          A
        </span>
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "text-xl font-bold leading-none transition-colors duration-200",
          "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent",
          "group-hover:from-primary/90 group-hover:to-primary/70"
        )}>
          Accio
        </span>
        <span className="text-xs text-muted-foreground leading-none font-medium">
          Knowledge Library
        </span>
      </div>
    </Link>
  );
};

export default NavigationLogo;
