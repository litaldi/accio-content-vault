
import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Eye, Volume2, Keyboard } from 'lucide-react';

export const AccessibilitySettings: React.FC = () => {
  const { preferences, updatePreferences } = useAccessibility();

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
              checked={preferences.highContrast}
              onCheckedChange={(checked) => 
                updatePreferences({ highContrast: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="grayscale">Grayscale Mode</Label>
              <p className="text-sm text-muted-foreground">
                Remove colors for focus enhancement
              </p>
            </div>
            <Switch
              id="grayscale"
              checked={preferences.grayscale}
              onCheckedChange={(checked) => 
                updatePreferences({ grayscale: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size</Label>
            <Select
              value={preferences.fontSize}
              onValueChange={(value: 'normal' | 'large' | 'larger') =>
                updatePreferences({ fontSize: value })
              }
            >
              <SelectTrigger id="font-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="larger">Larger</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="line-spacing">Line Spacing</Label>
            <Select
              value={preferences.lineSpacing}
              onValueChange={(value: 'normal' | 'relaxed' | 'loose') =>
                updatePreferences({ lineSpacing: value })
              }
            >
              <SelectTrigger id="line-spacing">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="relaxed">Relaxed</SelectItem>
                <SelectItem value="loose">Loose</SelectItem>
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
              checked={preferences.reducedMotion}
              onCheckedChange={(checked) => 
                updatePreferences({ reducedMotion: checked })
              }
            />
          </div>
        </div>

        {/* Audio Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Audio
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="screen-reader">Screen Reader Mode</Label>
              <p className="text-sm text-muted-foreground">
                Optimize for screen reader navigation
              </p>
            </div>
            <Switch
              id="screen-reader"
              checked={preferences.screenReaderMode}
              onCheckedChange={(checked) => 
                updatePreferences({ screenReaderMode: checked })
              }
            />
          </div>
        </div>

        {/* Navigation Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Keyboard className="h-4 w-4" />
            Navigation
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="keyboard-navigation">Enhanced Keyboard Navigation</Label>
              <p className="text-sm text-muted-foreground">
                Improve keyboard navigation support
              </p>
            </div>
            <Switch
              id="keyboard-navigation"
              checked={preferences.keyboardNavigation}
              onCheckedChange={(checked) => 
                updatePreferences({ keyboardNavigation: checked })
              }
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => updatePreferences({
              highContrast: false,
              reducedMotion: false,
              fontSize: 'normal',
              lineSpacing: 'normal',
              grayscale: false,
              keyboardNavigation: true,
              screenReaderMode: false,
            })}
          >
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilitySettings;
