
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibilityButtonProps {
  variant?: 'header' | 'sidebar' | 'floating';
  className?: string;
}

const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({ 
  variant = 'header',
  className 
}) => {
  const { toggleHighContrast, highContrast } = useAccessibility();

  const handleClick = () => {
    toggleHighContrast();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={cn(
        "gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        variant === 'header' && "h-9",
        variant === 'floating' && "rounded-full shadow-lg",
        className
      )}
      aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
      title={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
    >
      <Settings className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">
        {highContrast ? 'Disable' : 'Enable'} high contrast mode
      </span>
    </Button>
  );
};

export default AccessibilityButton;
