import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Accessibility, Check } from 'lucide-react';
import { announceToScreenReader } from '@/utils/accessibility';
import { useTheme } from '@/components/theme/ThemeProvider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useFocusTrap } from '@/hooks/use-focus-trap';

const EnhancedAccessibilityButton: React.FC = () => {
  const { preferences, updatePreferences, resetPreferences } = useAccessibility();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const popoverRef = useFocusTrap();

  // Count active features for the badge
  const activeFeatures = [
    preferences.highContrast,
    preferences.reducedMotion,
    preferences.grayscaleMode,
    theme === 'high-contrast'
  ].filter(Boolean).length;

  // Handle shortcut keys
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A to open accessibility menu
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Announce accessibility features on mount
  React.useEffect(() => {
    const features = [];
    if (preferences.highContrast) features.push('high contrast');
    if (preferences.reducedMotion) features.push('reduced motion');
    if (preferences.grayscaleMode) features.push('grayscale mode');
    if (theme === 'high-contrast') features.push('high contrast theme');

    if (features.length > 0) {
      announceToScreenReader(`${features.length} accessibility features active: ${features.join(', ')}`);
    }
  }, [preferences, theme]);

  const handleToggle = (feature: keyof typeof preferences, value?: boolean) => {
    const newValue = value !== undefined ? value : !preferences[feature];
    updatePreferences({ [feature]: newValue });
    
    announceToScreenReader(`${feature} ${newValue ? 'enabled' : 'disabled'}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-label="Accessibility options"
          className={cn(
            "relative border-primary focus-visible:ring-offset-4 h-10 w-10 p-0",
            activeFeatures > 0 && "bg-primary/10"
          )}
          onClick={() => setOpen(true)}
        >
          <Accessibility className="h-5 w-5" />
          {activeFeatures > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              {activeFeatures}
            </span>
          )}
          <span className="sr-only">
            Open accessibility menu (Alt+A), {activeFeatures} features active
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent 
        className="w-80" 
        ref={popoverRef as React.RefObject<HTMLDivElement>}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Accessibility Options</h3>
            <span className="text-xs text-muted-foreground">Alt+A</span>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant={preferences.highContrast ? "default" : "outline"}
              onClick={() => handleToggle('highContrast')}
              className="justify-start"
              size="sm"
            >
              {preferences.highContrast && <Check className="h-4 w-4 mr-2" />}
              High Contrast
            </Button>
            
            <Button
              variant={preferences.reducedMotion ? "default" : "outline"}
              onClick={() => handleToggle('reducedMotion')}
              className="justify-start"
              size="sm"
            >
              {preferences.reducedMotion && <Check className="h-4 w-4 mr-2" />}
              Reduce Animation
            </Button>
            
            <Button
              variant={preferences.grayscaleMode ? "default" : "outline"}
              onClick={() => handleToggle('grayscaleMode')}
              className="justify-start"
              size="sm"
            >
              {preferences.grayscaleMode && <Check className="h-4 w-4 mr-2" />}
              Grayscale Mode
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Text Size</h4>
            <div className="flex gap-2">
              <Button
                variant="outline" 
                size="sm"
                onClick={() => updatePreferences({ fontSize: 'small' })}
                className={cn(
                  "flex-1", 
                  preferences.fontSize === 'small' && "border-primary bg-primary/10"
                )}
              >
                Small
              </Button>
              <Button
                variant="outline" 
                size="sm"
                onClick={() => updatePreferences({ fontSize: 'medium' })}
                className={cn(
                  "flex-1", 
                  preferences.fontSize === 'medium' && "border-primary bg-primary/10"
                )}
              >
                Medium
              </Button>
              <Button
                variant="outline" 
                size="sm"
                onClick={() => updatePreferences({ fontSize: 'large' })}
                className={cn(
                  "flex-1", 
                  preferences.fontSize === 'large' && "border-primary bg-primary/10"
                )}
              >
                Large
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Theme</h4>
            <div className="flex gap-2">
              <Button
                variant="outline" 
                size="sm"
                onClick={() => setTheme('light')}
                className={cn(
                  "flex-1", 
                  theme === 'light' && "border-primary bg-primary/10"
                )}
              >
                Light
              </Button>
              <Button
                variant="outline" 
                size="sm"
                onClick={() => setTheme('dark')}
                className={cn(
                  "flex-1", 
                  theme === 'dark' && "border-primary bg-primary/10"
                )}
              >
                Dark
              </Button>
              <Button
                variant="outline" 
                size="sm"
                onClick={() => setTheme('high-contrast')}
                className={cn(
                  "flex-1", 
                  theme === 'high-contrast' && "border-primary bg-primary/10"
                )}
              >
                High Contrast
              </Button>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              resetPreferences();
              setTheme('system');
              announceToScreenReader('Accessibility settings reset to defaults');
            }}
            className="w-full mt-4"
          >
            Reset to Defaults
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EnhancedAccessibilityButton;
