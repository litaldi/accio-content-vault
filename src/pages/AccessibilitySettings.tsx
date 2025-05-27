
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { UnifiedMainNavigation } from '@/components/navigation/UnifiedMainNavigation';
import Footer from '@/components/Footer';
import { Accessibility, Eye, Type, MousePointer, Volume2 } from 'lucide-react';

const AccessibilitySettings: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Accessibility Settings - Accio Knowledge Engine</title>
        <meta name="description" content="Customize accessibility features and preferences for your Accio experience." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <UnifiedMainNavigation />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Accessibility className="h-8 w-8 text-primary" />
                Accessibility Settings
              </h1>
              <p className="text-muted-foreground">
                Customize your experience with accessibility features designed to help everyone use Accio effectively.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Visual Preferences
                </CardTitle>
                <CardDescription>
                  Adjust visual settings to improve readability and reduce eye strain.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="high-contrast">High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase color contrast for better visibility
                    </p>
                  </div>
                  <Switch id="high-contrast" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="large-text">Large Text</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase text size throughout the application
                    </p>
                  </div>
                  <Switch id="large-text" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="reduced-motion">Reduce Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimize animations and transitions
                    </p>
                  </div>
                  <Switch id="reduced-motion" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="h-5 w-5" />
                  Navigation Preferences
                </CardTitle>
                <CardDescription>
                  Customize how you navigate and interact with the interface.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="keyboard-navigation">Enhanced Keyboard Navigation</Label>
                    <p className="text-sm text-muted-foreground">
                      Show focus indicators and enable keyboard shortcuts
                    </p>
                  </div>
                  <Switch id="keyboard-navigation" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="skip-links">Skip Links</Label>
                    <p className="text-sm text-muted-foreground">
                      Show skip navigation links for screen readers
                    </p>
                  </div>
                  <Switch id="skip-links" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Audio & Feedback
                </CardTitle>
                <CardDescription>
                  Configure audio cues and haptic feedback options.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="screen-reader">Screen Reader Optimization</Label>
                    <p className="text-sm text-muted-foreground">
                      Enhanced compatibility with screen reading software
                    </p>
                  </div>
                  <Switch id="screen-reader" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="sound-feedback">Sound Feedback</Label>
                    <p className="text-sm text-muted-foreground">
                      Play audio cues for important actions and notifications
                    </p>
                  </div>
                  <Switch id="sound-feedback" />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button className="flex-1">Save Preferences</Button>
              <Button variant="outline">Reset to Defaults</Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AccessibilitySettings;
