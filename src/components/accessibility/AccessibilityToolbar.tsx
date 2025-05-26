
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { 
  Type, 
  Eye, 
  Move3D, 
  Palette, 
  Volume2, 
  Monitor,
  Accessibility,
  X
} from 'lucide-react';

interface AccessibilityToolbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { preferences, updatePreferences, announceToScreenReader } = useAccessibility();

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    updatePreferences({ fontSize: size });
    announceToScreenReader(`Font size changed to ${size}`);
  };

  const handleHighContrastToggle = (enabled: boolean) => {
    updatePreferences({ highContrast: enabled });
    announceToScreenReader(`High contrast ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleReducedMotionToggle = (enabled: boolean) => {
    updatePreferences({ reducedMotion: enabled });
    announceToScreenReader(`Reduced motion ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleLineSpacingChange = (spacing: 'normal' | 'relaxed' | 'loose') => {
    updatePreferences({ lineSpacing: spacing });
    announceToScreenReader(`Line spacing changed to ${spacing}`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-80 overflow-y-auto"
        aria-label="Accessibility settings"
      >
        <SheetHeader className="pb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5" />
              Accessibility Settings
            </SheetTitle>
            <SheetClose asChild>
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Close accessibility toolbar"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <p className="text-sm text-muted-foreground">
            Customize your experience for better accessibility
          </p>
        </SheetHeader>

        <div className="space-y-8">
          {/* Font Size */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <Label className="text-base font-medium">Font Size</Label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <Button
                  key={size}
                  variant={preferences.fontSize === size ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFontSizeChange(size)}
                  className="capitalize"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Line Spacing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Move3D className="h-4 w-4" />
              <Label className="text-base font-medium">Line Spacing</Label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'relaxed', 'loose'] as const).map((spacing) => (
                <Button
                  key={spacing}
                  variant={preferences.lineSpacing === spacing ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLineSpacingChange(spacing)}
                  className="capitalize"
                >
                  {spacing}
                </Button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <Label htmlFor="high-contrast" className="text-base font-medium">
                  High Contrast
                </Label>
              </div>
              <Switch
                id="high-contrast"
                checked={preferences.highContrast}
                onCheckedChange={handleHighContrastToggle}
                aria-describedby="high-contrast-description"
              />
            </div>
            <p id="high-contrast-description" className="text-sm text-muted-foreground">
              Increases color contrast for better visibility
            </p>
          </div>

          {/* Reduced Motion */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <Label htmlFor="reduced-motion" className="text-base font-medium">
                  Reduced Motion
                </Label>
              </div>
              <Switch
                id="reduced-motion"
                checked={preferences.reducedMotion}
                onCheckedChange={handleReducedMotionToggle}
                aria-describedby="reduced-motion-description"
              />
            </div>
            <p id="reduced-motion-description" className="text-sm text-muted-foreground">
              Reduces animations and transitions
            </p>
          </div>

          {/* Keyboard Navigation Help */}
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <Label className="text-base font-medium">Keyboard Navigation</Label>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Navigate:</span>
                <Badge variant="outline">Tab</Badge>
              </div>
              <div className="flex justify-between">
                <span>Activate:</span>
                <Badge variant="outline">Enter / Space</Badge>
              </div>
              <div className="flex justify-between">
                <span>Skip to content:</span>
                <Badge variant="outline">Tab from top</Badge>
              </div>
            </div>
          </div>

          {/* Screen Reader Support */}
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <Label className="text-base font-medium">Screen Reader Support</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              This site is optimized for screen readers with proper ARIA labels, 
              landmarks, and announcements.
            </p>
          </div>

          {/* Reset Button */}
          <Button 
            variant="outline" 
            onClick={() => {
              updatePreferences({
                fontSize: 'medium',
                lineSpacing: 'normal',
                highContrast: false,
                reducedMotion: false
              });
              announceToScreenReader('Accessibility settings reset to defaults');
            }}
            className="w-full"
          >
            Reset to Defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccessibilityToolbar;
