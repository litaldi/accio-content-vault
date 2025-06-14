
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Accessibility, X, Minus, Plus, Eye, Volume2 } from 'lucide-react';

export const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-lg"
        aria-label="Open accessibility toolbar"
        title="Accessibility Options"
      >
        <Accessibility className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">Accessibility</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          aria-label="Close accessibility toolbar"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Font Size Controls */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Text Size</label>
          <div className="flex gap-1">
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

        {/* High Contrast Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">High Contrast</span>
          </div>
          <Button
            variant={isHighContrast ? 'default' : 'outline'}
            size="sm"
            onClick={toggleHighContrast}
            aria-pressed={isHighContrast}
          >
            {isHighContrast ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <span className="text-sm font-medium">Reduce Motion</span>
          </div>
          <Button
            variant={isReducedMotion ? 'default' : 'outline'}
            size="sm"
            onClick={toggleReducedMotion}
            aria-pressed={isReducedMotion}
          >
            {isReducedMotion ? 'On' : 'Off'}
          </Button>
        </div>

        <div className="pt-2 border-t text-xs text-muted-foreground">
          Use Tab to navigate, Space to activate buttons, and Arrow keys in menus.
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilityToolbar;
