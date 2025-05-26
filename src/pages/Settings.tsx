
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EnhancedUnifiedLayout from '@/components/layout/EnhancedUnifiedLayout';
import { UnifiedTypography, UnifiedSpacing } from '@/components/ui/unified-design-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { User, Bell, Shield, Download, Trash2 } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      digest: true
    },
    privacy: {
      publicProfile: false,
      shareUsage: true
    },
    preferences: {
      autoTag: true,
      smartSearch: true
    }
  });
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your data export will be ready for download shortly.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Please check your email to confirm account deletion.",
      variant: "destructive",
    });
  };

  return (
    <EnhancedUnifiedLayout>
      <Helmet>
        <title>Settings - Accio Knowledge Library</title>
        <meta name="description" content="Manage your Accio account settings, privacy preferences, and data." />
      </Helmet>

      <UnifiedSpacing.Section>
        <UnifiedSpacing.Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <UnifiedTypography.H1>Settings</UnifiedTypography.H1>
              <UnifiedTypography.Lead>
                Manage your account preferences and privacy settings.
              </UnifiedTypography.Lead>
            </div>

            <div className="space-y-8">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and account details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" defaultValue="john@example.com" />
                    </div>
                  </div>
                  <Button onClick={handleSave}>Save Changes</Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>
                    Configure how you want to receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, email: checked }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive browser push notifications
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, push: checked }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Weekly Digest</div>
                      <div className="text-sm text-muted-foreground">
                        Get a weekly summary of your activity
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.digest}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, digest: checked }
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>
                    Control your privacy settings and data sharing preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Auto-tagging</div>
                      <div className="text-sm text-muted-foreground">
                        Let AI automatically tag your content
                      </div>
                    </div>
                    <Switch
                      checked={settings.preferences.autoTag}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, autoTag: checked }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Smart Search</div>
                      <div className="text-sm text-muted-foreground">
                        Enable AI-powered search features
                      </div>
                    </div>
                    <Switch
                      checked={settings.preferences.smartSearch}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, smartSearch: checked }
                        }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Share Usage Data</div>
                      <div className="text-sm text-muted-foreground">
                        Help improve Accio by sharing anonymous usage data
                      </div>
                    </div>
                    <Switch
                      checked={settings.privacy.shareUsage}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, shareUsage: checked }
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Data Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Data Management
                  </CardTitle>
                  <CardDescription>
                    Export or delete your data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Export Data</div>
                      <div className="text-sm text-muted-foreground">
                        Download all your saved content and data
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleExport}>
                      Export
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                    <div>
                      <div className="font-medium text-destructive">Delete Account</div>
                      <div className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </div>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </UnifiedSpacing.Container>
      </UnifiedSpacing.Section>
    </EnhancedUnifiedLayout>
  );
};

export default Settings;
