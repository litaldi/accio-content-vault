
import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const NavbarHeader: React.FC = () => {
  const { preferences } = useAccessibility();

  return (
    <div className="flex items-center">
      <Link 
        to="/" 
        className={`flex items-center gap-3 transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1 ${
          preferences.highContrast ? 'focus-visible:ring-offset-background' : ''
        }`}
        aria-label="Accio - Go to homepage"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-primary-foreground font-bold text-xl">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary leading-none">Accio</span>
            <span className="text-xs text-muted-foreground leading-none">Knowledge Library</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavbarHeader;
