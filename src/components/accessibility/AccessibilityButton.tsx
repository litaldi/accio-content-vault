
import React from 'react';
import { Button } from '@/components/ui/button';
import { Accessibility } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface AccessibilityButtonProps {
  className?: string;
}

export const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({ className }) => {
  const { toggleHighContrast, isHighContrast } = useAccessibility();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleHighContrast}
      className={className}
      aria-label={`${isHighContrast ? 'Disable' : 'Enable'} high contrast mode`}
    >
      <Accessibility className="h-4 w-4" />
    </Button>
  );
};

export default AccessibilityButton;
