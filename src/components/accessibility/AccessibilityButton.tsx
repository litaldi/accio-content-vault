
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accessibility } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import AccessibilityToolbar from './AccessibilityToolbar';
import { cn } from '@/lib/utils';

interface AccessibilityButtonProps {
  variant?: 'floating' | 'inline' | 'header';
  className?: string;
}

const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({ 
  variant = 'floating',
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { announceToScreenReader } = useAccessibility();

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    announceToScreenReader(
      newState ? 'Accessibility menu opened' : 'Accessibility menu closed'
    );
  };

  if (variant === 'floating') {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className={cn(
              "fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              "focus-visible:ring-4 focus-visible:ring-primary/50",
              "transition-all duration-300 hover:scale-110",
              "border-2 border-background",
              className
            )}
            onClick={handleToggle}
            aria-label="Open accessibility settings"
            title="Accessibility Settings"
          >
            <Accessibility className="h-5 w-5" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-96 bg-background/95 backdrop-blur-md"
          aria-describedby="accessibility-description"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-xl">
              <Accessibility className="h-5 w-5" />
              Accessibility Settings
            </SheetTitle>
            <p id="accessibility-description" className="text-sm text-muted-foreground">
              Customize your viewing experience for better accessibility
            </p>
          </SheetHeader>
          <div className="mt-6">
            <AccessibilityToolbar />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (variant === 'header') {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 transition-all duration-200",
              "hover:bg-accent/50 hover:scale-105",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              "rounded-md",
              className
            )}
            onClick={handleToggle}
            aria-label="Open accessibility settings"
            title="Accessibility Settings"
          >
            <Accessibility className="h-4 w-4" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-96">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5" />
              Accessibility Settings
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <AccessibilityToolbar />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Inline variant - now also icon-only
  return (
    <div className={cn("space-y-4", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={handleToggle}
        className="w-full h-10"
        aria-expanded={isOpen}
        aria-controls="accessibility-toolbar"
        aria-label="Toggle accessibility settings"
        title="Accessibility Settings"
      >
        <Accessibility className="h-4 w-4" aria-hidden="true" />
      </Button>
      {isOpen && (
        <div id="accessibility-toolbar" className="border rounded-lg p-4 bg-muted/20">
          <AccessibilityToolbar />
        </div>
      )}
    </div>
  );
};

export default AccessibilityButton;
