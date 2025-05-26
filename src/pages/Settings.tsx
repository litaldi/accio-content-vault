
import React, { useState } from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Globe, 
  Database,
  Download,
  Trash2,
  Key,
  Mail,
  Smartphone,
  Volume2,
  Eye,
  Zap
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      digest: true,
      marketing: false
    },
    privacy: {
      profilePublic: true,
      analyticsSharing: false,
      activityVisible: true
    },
    preferences: {
      language: 'en',
      timezone: 'America/Los_Angeles',
      itemsPerPage: '20',
      autoSave: true,
      soundEffects: true
    }
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value }
    }));
  };

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    }));
  };

  return (
    <UnifiedPageLayout
      title="Settings - Customize Your Experience | Accio"
      description="Manage your account settings, preferences, and privacy controls for your Accio knowledge management experience."
    >
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Customize your Accio experience and manage your account preferences.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <a href="#general" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium">
                    <SettingsIcon className="h-4 w-4" />
                    General
                  </a>
                  <a href="#notifications" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </a>
                  <a href="#privacy" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Shield className="h-4 w-4" />
                    Privacy & Security
                  </a>
                  <a href="#data" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Database className="h-4 w-4" />
                    Data Management
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Settings */}
            <Card id="general">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure your basic preferences and appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred color scheme
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="gap-2"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="h-4 w-4" />
                        Light
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4" />
                        Dark
                      </>
                    )}
                  </Button>
                </div>

                <Separator />

                {/* Language */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Language</Label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred language
                    </p>
                  </div>
                  <Select value={settings.preferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Auto-save */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Auto-save</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically save your work as you type
                    </p>
                  </div>
                  <Switch
                    checked={settings.preferences.autoSave}
                    onCheckedChange={(checked) => handlePreferenceChange('autoSave', checked)}
                  />
                </div>

                <Separator />

                {/* Sound Effects */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for actions and notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.preferences.soundEffects}
                    onCheckedChange={(checked) => handlePreferenceChange('soundEffects', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card id="notifications">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important updates via email
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get instant notifications on your device
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Summary of your weekly activity and insights
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.digest}
                    onCheckedChange={(checked) => handleNotificationChange('digest', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">
                      Product updates, tips, and promotional content
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.marketing}
                    onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card id="privacy">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Manage your privacy settings and account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow others to see your profile and collections
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.privacy.profilePublic}
                    onCheckedChange={(checked) => handlePrivacyChange('profilePublic', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Analytics Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve Accio by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.analyticsSharing}
                    onCheckedChange={(checked) => handlePrivacyChange('analyticsSharing', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="gap-1">
                        <Key className="h-3 w-3" />
                        Not Enabled
                      </Badge>
                      <Button size="sm">Enable 2FA</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Active Sessions</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage devices where you're currently signed in
                    </p>
                    <Button variant="outline" size="sm">
                      View Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card id="data">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Export, backup, or delete your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Export Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Download all your saved content and collections
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Storage Usage</Label>
                    <p className="text-sm text-muted-foreground">
                      You're using 2.3 GB of 10 GB available
                    </p>
                    <div className="w-64 bg-muted rounded-full h-2 mt-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '23%'}}></div>
                    </div>
                  </div>
                  <Badge variant="secondary">23% used</Badge>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium text-destructive">Delete Account</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive" size="sm" className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UnifiedPageLayout>
  );
};

export default Settings;
