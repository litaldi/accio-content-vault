
import React from 'react';
import { Button } from '@/components/ui/button';
import { Accessibility, Volume2, Eye, Type } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export const AccessibilityToolbar: React.FC = () => {
  const {
    isHighContrast,
    isReducedMotion,
    fontSize,
    toggleHighContrast,
    toggleReducedMotion,
    setFontSize,
    announceToScreenReader,
  } = useAccessibility();

  const handleFontSizeChange = () => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    const newSize = sizes[nextIndex];
    setFontSize(newSize);
    announceToScreenReader(`Font size changed to ${newSize}`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-background border rounded-lg shadow-lg p-2 flex gap-2">
      <Button
        variant={isHighContrast ? 'default' : 'outline'}
        size="sm"
        onClick={toggleHighContrast}
        aria-label={`${isHighContrast ? 'Disable' : 'Enable'} high contrast`}
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      <Button
        variant={isReducedMotion ? 'default' : 'outline'}
        size="sm"
        onClick={toggleReducedMotion}
        aria-label={`${isReducedMotion ? 'Disable' : 'Enable'} reduced motion`}
      >
        <Volume2 className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleFontSizeChange}
        aria-label={`Current font size: ${fontSize}. Click to change`}
      >
        <Type className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AccessibilityToolbar;
