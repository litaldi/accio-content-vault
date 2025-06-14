
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Settings, Palette, Bell, Eye, Zap } from 'lucide-react';

interface PersonalizationSettings {
  showRecommendations: boolean;
  enableAnimations: boolean;
  autoGenerateSummaries: boolean;
  enableNotifications: boolean;
  compactView: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export const DashboardPersonalization: React.FC = () => {
  const [settings, setSettings] = useState<PersonalizationSettings>(() => {
    try {
      const saved = localStorage.getItem('dashboardPersonalization');
      return saved ? JSON.parse(saved) : {
        showRecommendations: true,
        enableAnimations: true,
        autoGenerateSummaries: false,
        enableNotifications: true,
        compactView: false,
        theme: 'auto'
      };
    } catch {
      return {
        showRecommendations: true,
        enableAnimations: true,
        autoGenerateSummaries: false,
        enableNotifications: true,
        compactView: false,
        theme: 'auto'
      };
    }
  });

  const updateSetting = (key: keyof PersonalizationSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    try {
      localStorage.setItem('dashboardPersonalization', JSON.stringify(newSettings));
    } catch {
      // Handle localStorage errors silently
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Personalize
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Dashboard Preferences
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Display Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-view" className="text-sm">
                  Compact view
                </Label>
                <Switch
                  id="compact-view"
                  checked={settings.compactView}
                  onCheckedChange={(checked) => updateSetting('compactView', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="animations" className="text-sm">
                  Enable animations
                </Label>
                <Switch
                  id="animations"
                  checked={settings.enableAnimations}
                  onCheckedChange={(checked) => updateSetting('enableAnimations', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="recommendations" className="text-sm">
                  Show recommendations
                </Label>
                <Switch
                  id="recommendations"
                  checked={settings.showRecommendations}
                  onCheckedChange={(checked) => updateSetting('showRecommendations', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="h-4 w-4" />
                AI Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-summaries" className="text-sm">
                    Auto-generate summaries
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically create AI summaries for new content
                  </p>
                </div>
                <Switch
                  id="auto-summaries"
                  checked={settings.autoGenerateSummaries}
                  onCheckedChange={(checked) => updateSetting('autoGenerateSummaries', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="notifications" className="text-sm">
                    Smart notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified about important insights
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => updateSetting('enableNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Current Settings Summary */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">Active preferences:</p>
            <div className="flex flex-wrap gap-1">
              {settings.showRecommendations && (
                <Badge variant="secondary" className="text-xs">Recommendations</Badge>
              )}
              {settings.enableAnimations && (
                <Badge variant="secondary" className="text-xs">Animations</Badge>
              )}
              {settings.autoGenerateSummaries && (
                <Badge variant="secondary" className="text-xs">Auto Summaries</Badge>
              )}
              {settings.compactView && (
                <Badge variant="secondary" className="text-xs">Compact</Badge>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
