
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Eye, Volume2, Type } from 'lucide-react';

const AccessibilityButton: React.FC = () => {
  const { preferences, updatePreferences } = useAccessibility();

  const toggleHighContrast = () => {
    updatePreferences({ highContrast: !preferences.highContrast });
  };

  const toggleReducedMotion = () => {
    updatePreferences({ reducedMotion: !preferences.reducedMotion });
  };

  const cycleFontSize = () => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(preferences.fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    updatePreferences({ fontSize: sizes[nextIndex] });
  };

  return (
    <div className="flex gap-2 p-2 bg-background border rounded">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleHighContrast}
        aria-label="Toggle high contrast"
        className={preferences.highContrast ? 'bg-accent' : ''}
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={toggleReducedMotion}
        aria-label="Toggle reduced motion"
        className={preferences.reducedMotion ? 'bg-accent' : ''}
      >
        <Volume2 className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={cycleFontSize}
        aria-label={`Current font size: ${preferences.fontSize}`}
      >
        <Type className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AccessibilityButton;
export { AccessibilityButton };
