
import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const ImprovedFooter: React.FC = () => {
  const { highContrast } = useAccessibility();

  return (
    <footer className={`border-t py-8 ${highContrast ? 'bg-black text-white' : 'bg-background'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Accio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ImprovedFooter;
