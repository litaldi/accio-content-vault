
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { 
  Type, 
  Eye, 
  Palette, 
  MousePointer, 
  Volume2,
  RotateCcw,
  Minus,
  Plus
} from 'lucide-react';

const AccessibilityToolbar: React.FC = () => {
  const { preferences, updatePreferences, announceToScreenReader } = useAccessibility();

  const handleFontSizeChange = (size: 'normal' | 'large' | 'larger') => {
    updatePreferences({ fontSize: size });
    announceToScreenReader(`Font size changed to ${size}`);
  };

  const handleLineSpacingChange = (spacing: 'normal' | 'relaxed' | 'loose') => {
    updatePreferences({ lineSpacing: spacing });
    announceToScreenReader(`Line spacing changed to ${spacing}`);
  };

  const handleToggle = (key: keyof typeof preferences, label: string) => {
    const newValue = !preferences[key];
    updatePreferences({ [key]: newValue });
    announceToScreenReader(`${label} ${newValue ? 'enabled' : 'disabled'}`);
  };

  const resetToDefaults = () => {
    updatePreferences({
      fontSize: 'normal',
      lineSpacing: 'normal',
      highContrast: false,
      reducedMotion: false,
      grayscale: false,
      keyboardNavigation: true,
      screenReaderMode: false,
    });
    announceToScreenReader('Accessibility settings reset to defaults');
  };

  const accessibilityOptions = [
    {
      key: 'highContrast' as const,
      label: 'High Contrast',
      description: 'Increases color contrast for better visibility',
      icon: Eye
    },
    {
      key: 'reducedMotion' as const,
      label: 'Reduced Motion',
      description: 'Minimizes animations and transitions',
      icon: MousePointer
    },
    {
      key: 'grayscale' as const,
      label: 'Grayscale Mode',
      description: 'Removes colors for focus enhancement',
      icon: Palette
    },
    {
      key: 'screenReaderMode' as const,
      label: 'Screen Reader Mode',
      description: 'Optimizes for screen reader navigation',
      icon: Volume2
    }
  ];

  return (
    <div className="space-y-6 max-w-sm mx-auto">
      {/* Font Size Controls */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4" />
          <Label className="text-sm font-medium">Font Size</Label>
        </div>
        <div className="flex gap-2">
          {(['normal', 'large', 'larger'] as const).map((size) => (
            <Button
              key={size}
              variant={preferences.fontSize === size ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFontSizeChange(size)}
              className="flex-1 capitalize"
              aria-pressed={preferences.fontSize === size}
            >
              {size === 'normal' && <Minus className="h-3 w-3 mr-1" />}
              {size === 'larger' && <Plus className="h-3 w-3 mr-1" />}
              {size}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Line Spacing Controls */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Line Spacing</Label>
        <div className="flex gap-2">
          {(['normal', 'relaxed', 'loose'] as const).map((spacing) => (
            <Button
              key={spacing}
              variant={preferences.lineSpacing === spacing ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleLineSpacingChange(spacing)}
              className="flex-1 capitalize"
              aria-pressed={preferences.lineSpacing === spacing}
            >
              {spacing}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Toggle Options */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Display Options</Label>
        {accessibilityOptions.map((option) => (
          <div key={option.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <option.icon className="h-4 w-4" />
                <Label 
                  htmlFor={option.key}
                  className="text-sm font-medium cursor-pointer"
                >
                  {option.label}
                </Label>
                {preferences[option.key] && (
                  <Badge variant="secondary" className="text-xs">
                    On
                  </Badge>
                )}
              </div>
              <Switch
                id={option.key}
                checked={preferences[option.key] as boolean}
                onCheckedChange={() => handleToggle(option.key, option.label)}
                aria-describedby={`${option.key}-description`}
              />
            </div>
            <p 
              id={`${option.key}-description`}
              className="text-xs text-muted-foreground ml-6"
            >
              {option.description}
            </p>
          </div>
        ))}
      </div>

      <Separator />

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={resetToDefaults}
        className="w-full"
        aria-describedby="reset-description"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset to Defaults
      </Button>
      <p id="reset-description" className="text-xs text-muted-foreground text-center">
        Restore all accessibility settings to their default values
      </p>
    </div>
  );
};

export default AccessibilityToolbar;
