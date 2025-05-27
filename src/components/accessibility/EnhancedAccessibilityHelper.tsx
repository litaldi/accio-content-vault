
import React, { useEffect, useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accessibility, 
  Volume2, 
  Eye, 
  Keyboard,
  MousePointer,
  Settings,
  X,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibilityHelperProps {
  className?: string;
}

export const EnhancedAccessibilityHelper: React.FC<AccessibilityHelperProps> = ({ 
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const { 
    fontSize, 
    setFontSize, 
    highContrast, 
    setHighContrast, 
    reducedMotion, 
    setReducedMotion,
    announceToScreenReader 
  } = useAccessibility();

  // Welcome message for first-time users
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('accio-a11y-welcome');
    if (!hasSeenWelcome && !hasShownWelcome) {
      setTimeout(() => {
        announceToScreenReader(
          'Welcome to Accio! Accessibility features are available. Press Alt+A to open accessibility settings.'
        );
        setHasShownWelcome(true);
        localStorage.setItem('accio-a11y-welcome', 'true');
      }, 2000);
    }
  }, [announceToScreenReader, hasShownWelcome]);

  // Keyboard shortcut to open accessibility panel
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'a') {
        event.preventDefault();
        setIsOpen(!isOpen);
        announceToScreenReader(
          isOpen ? 'Accessibility panel closed' : 'Accessibility panel opened'
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, announceToScreenReader]);

  const handleFontSizeChange = (size: 'normal' | 'large' | 'x-large') => {
    setFontSize(size);
    announceToScreenReader(`Font size changed to ${size.replace('-', ' ')}`);
  };

  const handleContrastToggle = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    announceToScreenReader(
      newValue ? 'High contrast mode enabled' : 'High contrast mode disabled'
    );
  };

  const handleMotionToggle = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    announceToScreenReader(
      newValue ? 'Reduced motion enabled' : 'Reduced motion disabled'
    );
  };

  return (
    <>
      {/* Floating Accessibility Button */}
      <div className={cn('fixed bottom-6 left-6 z-50', className)}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="icon"
          className={cn(
            'w-12 h-12 rounded-full shadow-lg bg-background border-2',
            'hover:scale-110 transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          )}
          aria-label={isOpen ? 'Close accessibility settings' : 'Open accessibility settings'}
          title="Accessibility Settings (Alt+A)"
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      </div>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 w-80 animate-fade-in">
          <Card className="shadow-2xl border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Accessibility</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6"
                aria-label="Close accessibility panel"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Font Size Control */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Text Size</label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['normal', 'large', 'x-large'] as const).map((size) => (
                    <Button
                      key={size}
                      variant={fontSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFontSizeChange(size)}
                      className="text-xs"
                      aria-pressed={fontSize === size}
                    >
                      {size === 'normal' ? 'Normal' : size === 'large' ? 'Large' : 'X-Large'}
                    </Button>
                  ))}
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Display Options</label>
                </div>
                <div className="space-y-2">
                  <Button
                    variant={highContrast ? 'default' : 'outline'}
                    size="sm"
                    onClick={handleContrastToggle}
                    className="w-full justify-start"
                    aria-pressed={highContrast}
                  >
                    {highContrast ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <div className="h-4 w-4 mr-2" />
                    )}
                    High Contrast
                  </Button>
                  <Button
                    variant={reducedMotion ? 'default' : 'outline'}
                    size="sm"
                    onClick={handleMotionToggle}
                    className="w-full justify-start"
                    aria-pressed={reducedMotion}
                  >
                    {reducedMotion ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <div className="h-4 w-4 mr-2" />
                    )}
                    Reduce Motion
                  </Button>
                </div>
              </div>

              {/* Keyboard Shortcuts Help */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Keyboard className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Keyboard Shortcuts</label>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Alt + A</span>
                    <span>Toggle this panel</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alt + S</span>
                    <span>Quick search</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alt + N</span>
                    <span>New save</span>
                  </div>
                </div>
              </div>

              {/* Screen Reader Info */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Screen Reader Support</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This site is optimized for screen readers with proper ARIA labels and live regions for dynamic content updates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default EnhancedAccessibilityHelper;
