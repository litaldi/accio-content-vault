
import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Type, 
  Eye, 
  Palette, 
  Link, 
  AlignLeft, 
  Play, 
  Volume2,
  RotateCcw,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedAccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedAccessibilityPanel: React.FC<EnhancedAccessibilityPanelProps> = ({
  isOpen,
  onClose
}) => {
  const {
    preferences,
    updatePreferences,
    resetPreferences,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleGrayscale,
    toggleLinkHighlight,
    announceToUser
  } = useAccessibility();

  const handleFontSizeChange = (value: string) => {
    updatePreferences({ fontSize: value as 'small' | 'medium' | 'large' });
    announceToUser(`Font size changed to ${value}`);
  };

  const handleLineSpacingChange = (value: string) => {
    updatePreferences({ lineSpacing: value as 'normal' | 'relaxed' | 'loose' });
    announceToUser(`Line spacing changed to ${value}`);
  };

  const handleToggle = (key: keyof typeof preferences, label: string) => {
    const newValue = !preferences[key];
    updatePreferences({ [key]: newValue });
    announceToUser(`${label} ${newValue ? 'enabled' : 'disabled'}`);
  };

  const handleReset = () => {
    resetPreferences();
    announceToUser('All accessibility preferences have been reset to defaults');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Eye className="h-5 w-5" />
            Accessibility Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <Label className="text-sm font-medium">Font Size</Label>
            </div>
            <Select
              value={preferences.fontSize}
              onValueChange={handleFontSizeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium (Default)</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Visual Preferences */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <Label className="text-sm font-medium">Visual Preferences</Label>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="text-sm">
                  High Contrast Mode
                </Label>
                <Switch
                  id="high-contrast"
                  checked={preferences.highContrast}
                  onCheckedChange={() => handleToggle('highContrast', 'High contrast mode')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="grayscale" className="text-sm">
                  Grayscale Mode
                </Label>
                <Switch
                  id="grayscale"
                  checked={preferences.grayscaleMode}
                  onCheckedChange={() => handleToggle('grayscaleMode', 'Grayscale mode')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="highlight-links" className="text-sm">
                  Highlight Links
                </Label>
                <Switch
                  id="highlight-links"
                  checked={preferences.highlightLinks}
                  onCheckedChange={() => handleToggle('highlightLinks', 'Link highlighting')}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Line Spacing */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlignLeft className="h-4 w-4" />
              <Label className="text-sm font-medium">Line Spacing</Label>
            </div>
            <Select
              value={preferences.lineSpacing}
              onValueChange={handleLineSpacingChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="relaxed">Relaxed</SelectItem>
                <SelectItem value="loose">Loose</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Motion & Animation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              <Label className="text-sm font-medium">Motion & Animation</Label>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="reduced-motion" className="text-sm">
                  Reduce Motion
                </Label>
                <Switch
                  id="reduced-motion"
                  checked={preferences.reducedMotion}
                  onCheckedChange={() => handleToggle('reducedMotion', 'Reduced motion')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="reduce-animations" className="text-sm">
                  Pause Animations
                </Label>
                <Switch
                  id="reduce-animations"
                  checked={preferences.reduceAnimations}
                  onCheckedChange={() => handleToggle('reduceAnimations', 'Animation pausing')}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Screen Reader Support */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <Label className="text-sm font-medium">Screen Reader Support</Label>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="screen-reader" className="text-sm">
                  Screen Reader Mode
                </Label>
                <Switch
                  id="screen-reader"
                  checked={preferences.screenReaderMode}
                  onCheckedChange={() => handleToggle('screenReaderMode', 'Screen reader mode')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="text-to-speech" className="text-sm">
                  Text-to-Speech
                </Label>
                <Switch
                  id="text-to-speech"
                  checked={preferences.textToSpeech}
                  onCheckedChange={() => handleToggle('textToSpeech', 'Text-to-speech')}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Actions</Label>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="justify-start"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset All Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Settings are saved automatically
          </p>
          <Button onClick={onClose} size="sm">
            <Check className="h-4 w-4 mr-2" />
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedAccessibilityPanel;
