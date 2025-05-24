
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedNavigation from '@/components/navigation/EnhancedNavigation';
import ImprovedFooter from '@/components/Footer/ImprovedFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useOnboardingContext } from '@/contexts/OnboardingContext';
import { PlayCircle, User, Bell, Shield, Palette } from 'lucide-react';

const Settings = () => {
  const { resetOnboarding } = useOnboardingContext();

  const handleRestartOnboarding = () => {
    resetOnboarding();
    window.location.reload(); // Refresh to show onboarding
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Settings - Accio Knowledge Library</title>
        <meta name="description" content="Manage your account settings and preferences." />
      </Helmet>
      
      <EnhancedNavigation />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-4">Settings</h1>
            <p className="text-xl text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5" />
                  Onboarding
                </CardTitle>
                <CardDescription>
                  Restart the onboarding process to learn about Accio's features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleRestartOnboarding} variant="outline">
                  Restart Onboarding
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account
                </CardTitle>
                <CardDescription>
                  Manage your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">user@example.com</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Configure your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly digest</p>
                    <p className="text-sm text-muted-foreground">Get a summary of your activity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Manage your privacy and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-factor authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data export</p>
                    <p className="text-sm text-muted-foreground">Download your data</p>
                  </div>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how Accio looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark mode</p>
                    <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compact view</p>
                    <p className="text-sm text-muted-foreground">Show more content on screen</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <ImprovedFooter />
    </div>
  );
};

export default Settings;
