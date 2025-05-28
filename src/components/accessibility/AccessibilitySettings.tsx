
import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Eye, Volume2, Keyboard } from 'lucide-react';

export const AccessibilitySettings: React.FC = () => {
  const { 
    fontSize, 
    setFontSize, 
    highContrast, 
    setHighContrast, 
    reducedMotion, 
    setReducedMotion 
  } = useAccessibility();

  const resetToDefaults = () => {
    setFontSize('medium');
    setHighContrast(false);
    setReducedMotion(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Accessibility Settings
        </CardTitle>
        <CardDescription>
          Customize your experience with accessibility features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Visual</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">High Contrast</Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size</Label>
            <Select
              value={fontSize}
              onValueChange={(value: 'small' | 'medium' | 'large') =>
                setFontSize(value)
              }
            >
              <SelectTrigger id="font-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Motion Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Motion</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduced-motion">Reduced Motion</Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions
              </p>
            </div>
            <Switch
              id="reduced-motion"
              checked={reducedMotion}
              onCheckedChange={setReducedMotion}
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={resetToDefaults}
          >
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilitySettings;
