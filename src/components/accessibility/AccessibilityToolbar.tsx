
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Accessibility, 
  Type, 
  Eye, 
  MousePointer, 
  Palette, 
  Volume2,
  Settings,
  X
} from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    fontSize, 
    setFontSize, 
    highContrast, 
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion
  } = useAccessibility();

  const fontSizeOptions = [
    { value: 'small', label: 'Small', size: 'text-sm' },
    { value: 'medium', label: 'Medium', size: 'text-base' },
    { value: 'large', label: 'Large', size: 'text-lg' },
    { value: 'extra-large', label: 'Extra Large', size: 'text-xl' }
  ] as const;

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 shadow-lg"
        aria-label="Open accessibility options"
      >
        <Accessibility className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Accessibility className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Accessibility Options</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close accessibility options"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Font Size */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Type className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">Font Size</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {fontSizeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={fontSize === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFontSize(option.value)}
                  className="justify-start"
                >
                  <span className={option.size}>{option.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">Visual</label>
            </div>
            <div className="space-y-2">
              <Button
                variant={highContrast ? "default" : "outline"}
                size="sm"
                onClick={toggleHighContrast}
                className="w-full justify-start"
              >
                <Eye className="h-4 w-4 mr-2" />
                High Contrast
                {highContrast && <Badge variant="secondary" className="ml-auto">On</Badge>}
              </Button>
              <Button
                variant={reducedMotion ? "default" : "outline"}
                size="sm"
                onClick={toggleReducedMotion}
                className="w-full justify-start"
              >
                <MousePointer className="h-4 w-4 mr-2" />
                Reduce Motion
                {reducedMotion && <Badge variant="secondary" className="ml-auto">On</Badge>}
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">Quick Actions</label>
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const mainContent = document.getElementById('main-content');
                  if (mainContent) {
                    mainContent.scrollIntoView({ behavior: 'smooth' });
                    mainContent.focus();
                  }
                }}
                className="w-full justify-start"
              >
                Skip to Main Content
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Reset all accessibility settings
                  setFontSize('medium');
                  if (highContrast) toggleHighContrast();
                  if (reducedMotion) toggleReducedMotion();
                }}
                className="w-full justify-start"
              >
                Reset Settings
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilityToolbar;
