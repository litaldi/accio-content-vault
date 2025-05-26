
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface NavigationLogoProps {
  onNavigate?: () => void;
}

const NavigationLogo: React.FC<NavigationLogoProps> = ({ onNavigate }) => {
  const { preferences, announceToScreenReader } = useAccessibility();

  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-3 transition-all duration-200 hover:opacity-90 rounded-lg p-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      )}
      aria-label="Accio - Your Knowledge Library - Go to homepage"
      onClick={() => {
        announceToScreenReader('Navigating to homepage');
        onNavigate?.();
      }}
      dir={preferences.language === 'he' || preferences.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
        <span className="text-primary-foreground font-bold text-xl" aria-hidden="true">A</span>
      </div>
      <div className="hidden sm:flex flex-col">
        <span className="text-lg font-bold text-primary leading-none">Accio</span>
        <span className="text-sm text-muted-foreground leading-none">Knowledge Library</span>
      </div>
    </Link>
  );
};

export default NavigationLogo;
