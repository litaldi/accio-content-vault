
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accessibility } from 'lucide-react';
import { cn } from '@/lib/utils';
import AccessibilityToolbar from './AccessibilityToolbar';

interface AccessibilityButtonProps {
  className?: string;
  variant?: 'floating' | 'inline';
}

const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({ 
  className, 
  variant = 'floating' 
}) => {
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  const buttonClasses = cn(
    variant === 'floating' && [
      "fixed bottom-4 left-4 z-40",
      "w-12 h-12 rounded-full",
      "shadow-lg hover:shadow-xl",
      "bg-primary text-primary-foreground",
      "hover:bg-primary/90",
      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    ],
    variant === 'inline' && [
      "w-10 h-10"
    ],
    className
  );

  return (
    <>
      <Button
        className={buttonClasses}
        onClick={() => setIsToolbarOpen(true)}
        aria-label="Open accessibility toolbar"
        title="Accessibility Options"
        size={variant === 'floating' ? 'icon' : 'icon'}
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      <AccessibilityToolbar 
        isOpen={isToolbarOpen}
        onClose={() => setIsToolbarOpen(false)}
      />
    </>
  );
};

export default AccessibilityButton;
