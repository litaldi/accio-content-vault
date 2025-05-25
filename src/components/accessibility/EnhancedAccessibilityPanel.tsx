
import React, { useEffect, useRef } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';
import { trapFocus } from '@/utils/accessibility';
import { 
  Eye, 
  Type, 
  Keyboard, 
  Volume2, 
  Pause, 
  Palette, 
  RotateCcw,
  Plus,
  Minus,
  Sun,
  Moon,
  Contrast,
  Link,
  AlignLeft,
  AudioLines,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedAccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedAccessibilityPanel: React.FC<EnhancedAccessibilityPanelProps> = ({ isOpen, onClose }) => {
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
  const { isMobile } = useResponsiveLayout();
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus management and keyboard navigation
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const cleanup = trapFocus(panelRef.current);
      return cleanup;
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleTextToSpeech = () => {
    const newValue = !preferences.textToSpeech;
    updatePreferences({ textToSpeech: newValue });
    
    if (newValue && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Text-to-speech enabled');
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
    
    announceToUser(`Text-to-speech ${newValue ? 'enabled' : 'disabled'}`);
  };

  const handleScreenReaderMode = () => {
    const newValue = !preferences.screenReaderMode;
    updatePreferences({ screenReaderMode: newValue });
    announceToUser(`Screen reader mode ${newValue ? 'enabled' : 'disabled'}`);
  };

  const AccessibilityContent = () => (
    <div 
      ref={panelRef}
      className="space-y-6 max-h-[80vh] overflow-y-auto"
      role="dialog"
      aria-labelledby="accessibility-panel-title"
      aria-describedby="accessibility-panel-description"
    >
      <div className="space-y-2">
        <h2 id="accessibility-panel-title" className="text-lg font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5" aria-hidden="true" />
          Accessibility Settings
        </h2>
        <p id="accessibility-panel-description" className="text-sm text-muted-foreground">
          Customize your experience with accessibility options. Changes are saved automatically.
        </p>
        
        {/* Active Features Badge */}
        {Object.values(preferences).some(value => value !== false && value !== 'medium' && value !== 'normal' && value !== 'light') && (
          <Badge variant="secondary" className="text-xs">
            {Object.entries(preferences).filter(([key, value]) => 
              value !== false && value !== 'medium' && value !== 'normal' && value !== 'light'
            ).length} features active
          </Badge>
        )}
      </div>

      {/* Font Size Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Type className="h-4 w-4" aria-hidden="true" />
            Text Size
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Current size: <strong>{preferences.fontSize}</strong></span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  decreaseFontSize();
                  announceToUser('Font size decreased');
                }}
                disabled={preferences.fontSize === 'small'}
                aria-label="Decrease font size"
                className="h-8 w-8 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  increaseFontSize();
                  announceToUser('Font size increased');
                }}
                disabled={preferences.fontSize === 'large'}
                aria-label="Increase font size"
                className="h-8 w-8 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Spacing */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <AlignLeft className="h-4 w-4" aria-hidden="true" />
            Line Spacing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'normal', label: 'Normal' },
              { value: 'relaxed', label: 'Relaxed' },
              { value: 'loose', label: 'Loose' }
            ].map(({ value, label }) => (
              <Button
                key={value}
                variant={preferences.lineSpacing === value ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  updatePreferences({ lineSpacing: value as any });
                  announceToUser(`Line spacing set to ${label}`);
                }}
                className="text-xs"
                aria-pressed={preferences.lineSpacing === value}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Scheme */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Palette className="h-4 w-4" aria-hidden="true" />
            Color Scheme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'light', icon: Sun, label: 'Light' },
              { value: 'dark', icon: Moon, label: 'Dark' },
              { value: 'high-contrast', icon: Contrast, label: 'High Contrast' }
            ].map(({ value, icon: Icon, label }) => (
              <Button
                key={value}
                variant={preferences.colorScheme === value ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  updatePreferences({ colorScheme: value as any });
                  announceToUser(`Color scheme changed to ${label}`);
                }}
                className="flex flex-col gap-1 h-auto py-3"
                aria-pressed={preferences.colorScheme === value}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Visual Accessibility Options */}
      <div className="space-y-4">
        <h3 className="font-medium text-sm">Visual Accessibility</h3>
        
        <div className="space-y-4">
          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <label htmlFor="high-contrast" className="text-sm font-medium cursor-pointer">
                  High Contrast Mode
                </label>
                <p className="text-xs text-muted-foreground">Enhanced contrast for better visibility</p>
              </div>
            </div>
            <Switch
              id="high-contrast"
              checked={preferences.highContrast}
              onCheckedChange={(checked) => {
                updatePreferences({ highContrast: checked });
                announceToUser(`High contrast ${checked ? 'enabled' : 'disabled'}`);
              }}
            />
          </div>

          {/* Grayscale Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <label htmlFor="grayscale" className="text-sm font-medium cursor-pointer">
                  Grayscale Mode
                </label>
                <p className="text-xs text-muted-foreground">Convert interface to grayscale for color blindness support</p>
              </div>
            </div>
            <Switch
              id="grayscale"
              checked={preferences.grayscaleMode}
              onCheckedChange={(checked) => {
                updatePreferences({ grayscaleMode: checked });
                announceToUser(`Grayscale mode ${checked ? 'enabled' : 'disabled'}`);
              }}
            />
          </div>

          {/* Highlight Links */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <label htmlFor="highlight-links" className="text-sm font-medium cursor-pointer">
                  Highlight Links & Buttons
                </label>
                <p className="text-xs text-muted-foreground">Make interactive elements more visible</p>
              </div>
            </div>
            <Switch
              id="highlight-links"
              checked={preferences.highlightLinks}
              onCheckedChange={(checked) => {
                updatePreferences({ highlightLinks: checked });
                announceToUser(`Link highlighting ${checked ? 'enabled' : 'disabled'}`);
              }}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Interaction Accessibility Options */}
      <div className="space-y-4">
        <h3 className="font-medium text-sm">Interaction & Navigation</h3>
        
        <div className="space-y-4">
          {/* Keyboard Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Keyboard className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <label htmlFor="keyboard-nav" className="text-sm font-medium cursor-pointer">
                  Enhanced Keyboard Navigation
                </label>
                <p className="text-xs text-muted-foreground">Improved focus indicators and shortcuts</p>
              </div>
            </div>
            <Switch
              id="keyboard-nav"
              checked={preferences.keyboardNavigation}
              onCheckedChange={(checked) => {
                updatePreferences({ keyboardNavigation: checked });
                announceToUser(`Enhanced keyboard navigation ${checked ? 'enabled' : 'disabled'}`);
              }}
            />
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Pause className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <label htmlFor="reduce-motion" className="text-sm font-medium cursor-pointer">
                  Pause Animations
                </label>
                <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
              </div>
            </div>
            <Switch
              id="reduce-motion"
              checked={preferences.reducedMotion}
              onCheckedChange={(checked) => {
                updatePreferences({ 
                  reducedMotion: checked,
                  reduceAnimations: checked 
                });
                announceToUser(`Animations ${checked ? 'paused' : 'enabled'}`);
              }}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Screen Reader & Audio Options */}
      <div className="space-y-4">
        <h3 className="font-medium text-sm">Screen Reader & Audio</h3>
        
        <div className="space-y-4">
          {/* Screen Reader Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AudioLines className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <label htmlFor="screen-reader" className="text-sm font-medium cursor-pointer">
                  Screen Reader Mode
                </label>
                <p className="text-xs text-muted-foreground">Enhanced screen reader announcements</p>
              </div>
            </div>
            <Switch
              id="screen-reader"
              checked={preferences.screenReaderMode}
              onCheckedChange={handleScreenReaderMode}
            />
          </div>

          {/* Text-to-Speech */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <label htmlFor="text-to-speech" className="text-sm font-medium cursor-pointer">
                  Text-to-Speech
                </label>
                <p className="text-xs text-muted-foreground">Enable voice feedback for important actions</p>
              </div>
            </div>
            <Switch
              id="text-to-speech"
              checked={preferences.textToSpeech}
              onCheckedChange={handleTextToSpeech}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Reset Button */}
      <div className="flex justify-center pt-2">
        <Button
          variant="outline"
          onClick={() => {
            resetPreferences();
            announceToUser('All accessibility settings have been reset to default');
          }}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to Default
        </Button>
      </div>

      {/* Help Text */}
      <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
        <p>💡 These settings are automatically saved</p>
        <p>🎯 Use Tab key to navigate between options</p>
        <p>♿ Changes apply immediately across the entire app</p>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Accessibility Settings</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <AccessibilityContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
        </DialogHeader>
        <AccessibilityContent />
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedAccessibilityPanel;
