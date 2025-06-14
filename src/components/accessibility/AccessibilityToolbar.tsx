
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { 
  Accessibility, 
  Type, 
  Contrast, 
  Pause,
  X,
  Settings
} from 'lucide-react';

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

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open accessibility toolbar"
      >
        <Accessibility className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            <span className="font-medium">Accessibility</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close accessibility toolbar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Font Size */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Type className="h-4 w-4" />
              <span className="text-sm font-medium">Font Size</span>
            </div>
            <div className="flex gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <Button
                  key={size}
                  variant={fontSize === size ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFontSize(size)}
                  className="flex-1"
                >
                  {size === 'small' && 'A'}
                  {size === 'medium' && 'A'}
                  {size === 'large' && 'A'}
                </Button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                <span className="text-sm font-medium">High Contrast</span>
              </div>
              <Button
                variant={isHighContrast ? 'default' : 'outline'}
                size="sm"
                onClick={toggleHighContrast}
              >
                {isHighContrast ? 'On' : 'Off'}
              </Button>
            </div>
          </div>

          {/* Reduced Motion */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pause className="h-4 w-4" />
                <span className="text-sm font-medium">Reduce Motion</span>
              </div>
              <Button
                variant={isReducedMotion ? 'default' : 'outline'}
                size="sm"
                onClick={toggleReducedMotion}
              >
                {isReducedMotion ? 'On' : 'Off'}
              </Button>
            </div>
          </div>

          {/* Keyboard Navigation Info */}
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium">Keyboard Shortcuts</span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Search</span>
                <Badge variant="outline" className="text-xs">Ctrl + K</Badge>
              </div>
              <div className="flex justify-between">
                <span>Add Content</span>
                <Badge variant="outline" className="text-xs">Ctrl + N</Badge>
              </div>
              <div className="flex justify-between">
                <span>Help</span>
                <Badge variant="outline" className="text-xs">F1</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
