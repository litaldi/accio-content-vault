
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Accessibility, Eye, Volume2, Type } from 'lucide-react';

export const EnhancedAccessibilityHelper: React.FC = () => {
  const {
    isHighContrast,
    isReducedMotion,
    fontSize,
    toggleHighContrast,
    toggleReducedMotion,
    setFontSize,
    announceToScreenReader,
  } = useAccessibility();

  const handleTestAnnouncement = () => {
    announceToScreenReader('Screen reader test successful');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Accessibility className="h-5 w-5" />
          Accessibility Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="high-contrast-toggle" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            High Contrast
          </Label>
          <Switch
            id="high-contrast-toggle"
            checked={isHighContrast}
            onCheckedChange={toggleHighContrast}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="reduced-motion-toggle" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Reduced Motion
          </Label>
          <Switch
            id="reduced-motion-toggle"
            checked={isReducedMotion}
            onCheckedChange={toggleReducedMotion}
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Font Size: {fontSize}
          </Label>
          <div className="flex gap-1">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <Button
                key={size}
                variant={fontSize === size ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFontSize(size)}
                className="flex-1"
              >
                {size === 'small' ? 'A' : size === 'medium' ? 'A' : 'A'}
              </Button>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleTestAnnouncement}
          className="w-full"
        >
          Test Screen Reader
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnhancedAccessibilityHelper;
