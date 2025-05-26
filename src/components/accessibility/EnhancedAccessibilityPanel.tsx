
import React, { useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { X, Type, Eye, Volume2, Contrast, Palette, RotateCcw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedAccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedAccessibilityPanel: React.FC<EnhancedAccessibilityPanelProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { preferences, updatePreferences, resetPreferences } = useAccessibility();
  const [activeSection, setActiveSection] = useState<string>('display');

  if (!isOpen) return null;

  const sections = [
    { id: 'display', label: 'Display', icon: Eye },
    { id: 'motion', label: 'Motion', icon: Volume2 },
    { id: 'navigation', label: 'Navigation', icon: Type },
    { id: 'content', label: 'Content', icon: Palette },
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ] as const;

  const lineSpacingOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'relaxed', label: 'Relaxed' },
    { value: 'loose', label: 'Loose' },
  ] as const;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-panel-title"
    >
      <div 
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-300 border-l",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 id="accessibility-panel-title" className="text-xl font-semibold">
              Accessibility Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Customize your experience
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close accessibility panel"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Section Navigation */}
        <div className="flex border-b bg-muted/30">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium transition-colors",
                "hover:bg-accent focus:bg-accent focus:outline-none",
                activeSection === section.id 
                  ? "text-primary bg-background border-b-2 border-primary" 
                  : "text-muted-foreground"
              )}
              aria-pressed={activeSection === section.id}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeSection === 'display' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Text Size
                  </CardTitle>
                  <CardDescription>
                    Adjust text size for better readability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {fontSizeOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={preferences.fontSize === option.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => updatePreferences({ fontSize: option.value })}
                        className="flex-1"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Contrast className="h-4 w-4" />
                    Visual Enhancements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">High Contrast</label>
                      <p className="text-xs text-muted-foreground">Increase contrast for better visibility</p>
                    </div>
                    <Switch
                      checked={preferences.highContrast}
                      onCheckedChange={(checked) => updatePreferences({ highContrast: checked })}
                      aria-describedby="high-contrast-desc"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Grayscale Mode</label>
                      <p className="text-xs text-muted-foreground">Remove colors for focus</p>
                    </div>
                    <Switch
                      checked={preferences.grayscaleMode}
                      onCheckedChange={(checked) => updatePreferences({ grayscaleMode: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Highlight Links</label>
                      <p className="text-xs text-muted-foreground">Make links more visible</p>
                    </div>
                    <Switch
                      checked={preferences.highlightLinks}
                      onCheckedChange={(checked) => updatePreferences({ highlightLinks: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === 'motion' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Motion & Animations
                </CardTitle>
                <CardDescription>
                  Control motion and animation preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Reduce Motion</label>
                    <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
                  </div>
                  <Switch
                    checked={preferences.reducedMotion}
                    onCheckedChange={(checked) => updatePreferences({ reducedMotion: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Reduce Animations</label>
                    <p className="text-xs text-muted-foreground">Disable decorative animations</p>
                  </div>
                  <Switch
                    checked={preferences.reduceAnimations}
                    onCheckedChange={(checked) => updatePreferences({ reduceAnimations: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'navigation' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Navigation & Input
                </CardTitle>
                <CardDescription>
                  Improve navigation and interaction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Keyboard Navigation</label>
                    <p className="text-xs text-muted-foreground">Enhanced keyboard support</p>
                  </div>
                  <Switch
                    checked={preferences.keyboardNavigation}
                    onCheckedChange={(checked) => updatePreferences({ keyboardNavigation: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Screen Reader Mode</label>
                    <p className="text-xs text-muted-foreground">Optimize for screen readers</p>
                  </div>
                  <Switch
                    checked={preferences.screenReaderMode}
                    onCheckedChange={(checked) => updatePreferences({ screenReaderMode: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'content' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Content & Spacing
                </CardTitle>
                <CardDescription>
                  Adjust content layout and spacing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Line Spacing</label>
                    <div className="flex gap-2">
                      {lineSpacingOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={preferences.lineSpacing === option.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => updatePreferences({ lineSpacing: option.value })}
                          className="flex-1"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-6 space-y-3">
          <Button
            variant="outline"
            onClick={resetPreferences}
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          
          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              <Check className="h-3 w-3 mr-1" />
              Settings saved automatically
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAccessibilityPanel;
