
import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const NavbarHeader: React.FC = () => {
  const { preferences } = useAccessibility();

  return (
    <div className="flex items-center">
      <Link 
        to="/" 
        className={`flex items-center gap-2 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm ${
          preferences.highContrast ? 'focus-visible:ring-offset-background' : ''
        }`}
        aria-label="Accio - Go to homepage"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className="text-2xl font-bold text-primary">Accio</span>
        </div>
      </Link>
    </div>
  );
};

export default NavbarHeader;
