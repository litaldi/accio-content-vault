
import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const AccessibilitySettings: React.FC = () => {
  const {
    fontSize,
    setFontSize,
    isHighContrast,
    toggleHighContrast,
    isReducedMotion,
    toggleReducedMotion
  } = useAccessibility();

  const fontSizes = [
    { key: 'small', label: 'Small', value: 'small' },
    { key: 'medium', label: 'Medium', value: 'medium' },
    { key: 'large', label: 'Large', value: 'large' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>
            Customize how content is displayed to improve readability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Text Size</Label>
            <div className="flex gap-2">
              {fontSizes.map((size) => (
                <Button
                  key={size.key}
                  variant={fontSize === size.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFontSize(size.value as 'small' | 'medium' | 'large')}
                  className="flex-1"
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">High Contrast Mode</Label>
              <p className="text-sm text-muted-foreground">
                Increases contrast for better visibility
              </p>
            </div>
            <Switch
              checked={isHighContrast}
              onCheckedChange={toggleHighContrast}
              aria-label="Toggle high contrast mode"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Motion & Animation</CardTitle>
          <CardDescription>
            Control animations and motion effects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Reduce Motion</Label>
              <p className="text-sm text-muted-foreground">
                Minimizes animations and transitions
              </p>
            </div>
            <Switch
              checked={isReducedMotion}
              onCheckedChange={toggleReducedMotion}
              aria-label="Toggle reduced motion"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyboard Navigation</CardTitle>
          <CardDescription>
            Tips for navigating with your keyboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><kbd className="px-2 py-1 bg-muted rounded">Tab</kbd> - Navigate between elements</p>
            <p><kbd className="px-2 py-1 bg-muted rounded">Space</kbd> - Activate buttons and checkboxes</p>
            <p><kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> - Activate links and buttons</p>
            <p><kbd className="px-2 py-1 bg-muted rounded">Esc</kbd> - Close dialogs and menus</p>
            <p><kbd className="px-2 py-1 bg-muted rounded">Arrow Keys</kbd> - Navigate within menus</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilitySettings;
