
import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Eye, Volume2, Keyboard, Globe } from 'lucide-react';

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

          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size</Label>
            <Select
              value={preferences.fontSize}
              onValueChange={(value: 'small' | 'medium' | 'large') =>
                updatePreferences({ fontSize: value })
              }
            >
              <SelectTrigger id="font-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
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
              <Label htmlFor="announcements">Screen Reader Announcements</Label>
              <p className="text-sm text-muted-foreground">
                Enable audio announcements for actions
              </p>
            </div>
            <Switch
              id="announcements"
              checked={preferences.announcements}
              onCheckedChange={(checked) => 
                updatePreferences({ announcements: checked })
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

        {/* Language Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Language
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="language">Interface Language</Label>
            <Select
              value={preferences.language}
              onValueChange={(value: 'en' | 'he' | 'ar') =>
                updatePreferences({ language: value })
              }
            >
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (LTR)</SelectItem>
                <SelectItem value="he">עברית (RTL)</SelectItem>
                <SelectItem value="ar">العربية (RTL)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => updatePreferences({
              highContrast: false,
              reducedMotion: false,
              fontSize: 'medium',
              language: 'en',
              announcements: true,
              keyboardNavigation: true,
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
