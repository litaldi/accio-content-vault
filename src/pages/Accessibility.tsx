
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Accessibility, 
  Eye, 
  Type, 
  Contrast, 
  VolumeX, 
  MousePointer,
  Keyboard,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AccessibilityPage = () => {
  return (
    <>
      <Helmet>
        <title>Accessibility Settings - Accio</title>
        <meta name="description" content="Customize accessibility settings to improve your experience with Accio." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Accessibility className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Accessibility Settings</h1>
                <p className="text-muted-foreground">Customize your experience for better accessibility</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            
            {/* Visual Accessibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Visual Accessibility
                </CardTitle>
                <CardDescription>
                  Adjust visual settings to improve readability and contrast
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="high-contrast">High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <Switch id="high-contrast" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="large-text">Large Text</Label>
                    <p className="text-sm text-muted-foreground">Increase font size throughout the app</p>
                  </div>
                  <Switch id="large-text" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="reduce-motion">Reduce Motion</Label>
                    <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                  </div>
                  <Switch id="reduce-motion" />
                </div>
              </CardContent>
            </Card>

            {/* Keyboard Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Keyboard className="h-5 w-5" />
                  Keyboard Navigation
                </CardTitle>
                <CardDescription>
                  Enhanced keyboard navigation and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="focus-indicators">Enhanced Focus Indicators</Label>
                    <p className="text-sm text-muted-foreground">Show clear focus outlines for keyboard navigation</p>
                  </div>
                  <Switch id="focus-indicators" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="skip-links">Skip Links</Label>
                    <p className="text-sm text-muted-foreground">Enable quick navigation shortcuts</p>
                  </div>
                  <Switch id="skip-links" defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Screen Reader Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <VolumeX className="h-5 w-5" />
                  Screen Reader Support
                </CardTitle>
                <CardDescription>
                  Optimize the experience for screen readers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="descriptive-labels">Descriptive Labels</Label>
                    <p className="text-sm text-muted-foreground">Add detailed descriptions for all interactive elements</p>
                  </div>
                  <Switch id="descriptive-labels" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="live-regions">Live Region Announcements</Label>
                    <p className="text-sm text-muted-foreground">Announce dynamic content changes</p>
                  </div>
                  <Switch id="live-regions" defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Keyboard Shortcuts */}
            <Card>
              <CardHeader>
                <CardTitle>Keyboard Shortcuts</CardTitle>
                <CardDescription>Common keyboard shortcuts for navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>Navigate to search</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl + K</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Open accessibility menu</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + A</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Skip to main content</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Tab</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Open user menu</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + U</kbd>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1">Save Settings</Button>
              <Button variant="outline" className="flex-1">Reset to Defaults</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessibilityPage;
