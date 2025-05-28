
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { 
  Type, 
  Eye, 
  RotateCcw,
  Zap,
  ZapOff
} from 'lucide-react';

const AccessibilityToolbar: React.FC = () => {
  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    announceToScreenReader
  } = useAccessibility();

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    announceToScreenReader(`Font size changed to ${size}`);
  };

  const handleHighContrastToggle = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    announceToScreenReader(`High contrast ${newValue ? 'enabled' : 'disabled'}`);
  };

  const handleReducedMotionToggle = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    announceToScreenReader(`Reduced motion ${newValue ? 'enabled' : 'disabled'}`);
  };

  const resetSettings = () => {
    setFontSize('medium');
    setHighContrast(false);
    setReducedMotion(false);
    announceToScreenReader('Accessibility settings reset to default');
  };

  return (
    <div className="space-y-6" role="group" aria-label="Accessibility controls">
      {/* Font Size Controls */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Type className="h-4 w-4" />
          Font Size
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={fontSize === 'small' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFontSizeChange('small')}
            className="text-xs"
            aria-pressed={fontSize === 'small'}
          >
            Small
          </Button>
          <Button
            variant={fontSize === 'medium' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFontSizeChange('medium')}
            className="text-sm"
            aria-pressed={fontSize === 'medium'}
          >
            Medium
          </Button>
          <Button
            variant={fontSize === 'large' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFontSizeChange('large')}
            className="text-base"
            aria-pressed={fontSize === 'large'}
          >
            Large
          </Button>
        </div>
      </div>

      <Separator />

      {/* High Contrast Toggle */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Visual
        </h3>
        <Button
          variant={highContrast ? 'default' : 'outline'}
          size="sm"
          onClick={handleHighContrastToggle}
          className="w-full justify-start gap-2"
          aria-pressed={highContrast}
        >
          High Contrast
        </Button>
      </div>

      <Separator />

      {/* Motion Controls */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium flex items-center gap-2">
          {reducedMotion ? <ZapOff className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
          Motion
        </h3>
        <Button
          variant={reducedMotion ? 'default' : 'outline'}
          size="sm"
          onClick={handleReducedMotionToggle}
          className="w-full justify-start gap-2"
          aria-pressed={reducedMotion}
        >
          Reduce Motion
        </Button>
      </div>

      <Separator />

      {/* Reset Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={resetSettings}
        className="w-full justify-start gap-2 hover:bg-muted"
      >
        <RotateCcw className="h-4 w-4" />
        Reset to Default
      </Button>
    </div>
  );
};

export default AccessibilityToolbar;
