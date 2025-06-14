
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Eye, Volume2, MousePointer, Type } from 'lucide-react';

export const AccessibilitySettings: React.FC = () => {
  const { 
    fontSize, 
    setFontSize, 
    isHighContrast, 
    toggleHighContrast, 
    isReducedMotion, 
    toggleReducedMotion,
    announceToScreenReader 
  } = useAccessibility();

  const handleFontSizeChange = (value: string) => {
    setFontSize(value as 'small' | 'medium' | 'large');
    announceToScreenReader(`Font size changed to ${value}`, 'polite');
  };

  const handleHighContrastToggle = () => {
    toggleHighContrast();
    announceToScreenReader(
      `High contrast ${!isHighContrast ? 'enabled' : 'disabled'}`, 
      'polite'
    );
  };

  const handleReducedMotionToggle = () => {
    toggleReducedMotion();
    announceToScreenReader(
      `Reduced motion ${!isReducedMotion ? 'enabled' : 'disabled'}`, 
      'polite'
    );
  };

  return (
    <div className="space-y-6" role="region" aria-labelledby="accessibility-settings-heading">
      <div>
        <h2 id="accessibility-settings-heading" className="text-xl font-semibold mb-2">
          Accessibility Settings
        </h2>
        <p className="text-muted-foreground">
          Customize your experience to better suit your needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" aria-hidden="true" />
              Text Size
            </CardTitle>
            <CardDescription>
              Adjust the size of text throughout the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label htmlFor="font-size-select">Choose text size</Label>
              <Select value={fontSize} onValueChange={handleFontSizeChange}>
                <SelectTrigger id="font-size-select" aria-describedby="font-size-description">
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium (Default)</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
              <p id="font-size-description" className="text-xs text-muted-foreground">
                Current size: {fontSize}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" aria-hidden="true" />
              Visual Preferences
            </CardTitle>
            <CardDescription>
              Adjust visual elements for better visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="high-contrast-switch" className="text-sm font-medium">
                    High Contrast Mode
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Increase contrast for better visibility
                  </p>
                </div>
                <Switch
                  id="high-contrast-switch"
                  checked={isHighContrast}
                  onCheckedChange={handleHighContrastToggle}
                  aria-describedby="high-contrast-description"
                />
              </div>
              <p id="high-contrast-description" className="sr-only">
                {isHighContrast ? 'High contrast mode is enabled' : 'High contrast mode is disabled'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="h-5 w-5" aria-hidden="true" />
              Motion Preferences
            </CardTitle>
            <CardDescription>
              Control animations and motion effects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="reduced-motion-switch" className="text-sm font-medium">
                    Reduce Motion
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Minimize animations and transitions
                  </p>
                </div>
                <Switch
                  id="reduced-motion-switch"
                  checked={isReducedMotion}
                  onCheckedChange={handleReducedMotionToggle}
                  aria-describedby="reduced-motion-description"
                />
              </div>
              <p id="reduced-motion-description" className="sr-only">
                {isReducedMotion ? 'Reduced motion is enabled' : 'Reduced motion is disabled'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" aria-hidden="true" />
              Screen Reader Test
            </CardTitle>
            <CardDescription>
              Test screen reader announcements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm">
                Click the button below to test screen reader announcements
              </p>
              <Button
                variant="outline"
                onClick={() => announceToScreenReader('This is a test announcement for screen readers', 'polite')}
                className="w-full"
              >
                Test Screen Reader
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">Keyboard Navigation Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Use Tab to navigate between interactive elements</li>
          <li>• Press Enter or Space to activate buttons and links</li>
          <li>• Use arrow keys to navigate within menus and lists</li>
          <li>• Press Escape to close dialogs and menus</li>
        </ul>
      </div>
    </div>
  );
};

export default AccessibilitySettings;
