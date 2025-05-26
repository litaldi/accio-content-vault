
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CleanNavigation from '@/components/navigation/CleanNavigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette,
  Download,
  Trash2,
  CheckCircle
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      weekly: true,
      collections: true
    },
    privacy: {
      analytics: true,
      sharing: false,
      public: false
    },
    preferences: {
      darkMode: false,
      autoSave: true,
      smartTags: true
    }
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your data export will be ready shortly. We'll email you when it's done.",
    });
  };

  const settingSections = [
    {
      title: "Notifications",
      description: "Manage how you receive updates and alerts",
      icon: Bell,
      items: [
        { key: "email", label: "Email notifications", description: "Receive updates via email" },
        { key: "push", label: "Push notifications", description: "Browser push notifications" },
        { key: "weekly", label: "Weekly digest", description: "Summary of your week's activity" },
        { key: "collections", label: "Collection updates", description: "Notify when collections are updated" }
      ]
    },
    {
      title: "Privacy & Security",
      description: "Control your data and privacy settings",
      icon: Shield,
      items: [
        { key: "analytics", label: "Usage analytics", description: "Help improve Accio with anonymous data" },
        { key: "sharing", label: "Content sharing", description: "Allow sharing of your collections" },
        { key: "public", label: "Public profile", description: "Make your profile visible to others" }
      ]
    },
    {
      title: "Preferences",
      description: "Customize your Accio experience",
      icon: Palette,
      items: [
        { key: "darkMode", label: "Dark mode", description: "Use dark theme interface" },
        { key: "autoSave", label: "Auto-save", description: "Automatically save changes" },
        { key: "smartTags", label: "Smart tagging", description: "AI-powered automatic tagging" }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Settings - Accio</title>
        <meta name="description" content="Customize your Accio experience with privacy, notification, and preference settings." />
      </Helmet>

      <CleanNavigation />

      <main className="flex-grow">
        {/* Header */}
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <SettingsIcon className="h-8 w-8 text-primary" />
                  Settings
                </h1>
                <p className="text-muted-foreground text-lg">
                  Customize your Accio experience
                </p>
              </div>
              <Button onClick={handleSave}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </section>

        {/* Settings Sections */}
        <section className="py-8">
          <div className="container max-w-4xl">
            <div className="space-y-8">
              {settingSections.map((section, sectionIndex) => (
                <Card key={sectionIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <section.icon className="h-5 w-5 text-primary" />
                      {section.title}
                    </CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base font-medium">{item.label}</Label>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Switch
                            checked={settings[section.title.toLowerCase().replace(' & ', '').replace(' ', '') as keyof typeof settings]?.[item.key as keyof typeof settings.notifications] || false}
                            onCheckedChange={(checked) => {
                              const sectionKey = section.title.toLowerCase().replace(' & ', '').replace(' ', '') as keyof typeof settings;
                              setSettings(prev => ({
                                ...prev,
                                [sectionKey]: {
                                  ...prev[sectionKey],
                                  [item.key]: checked
                                }
                              }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Data Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Data Management
                  </CardTitle>
                  <CardDescription>
                    Export or delete your account data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium">Export your data</div>
                      <div className="text-sm text-muted-foreground">
                        Download all your collections, bookmarks, and settings
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                    <div>
                      <div className="font-medium text-destructive">Delete account</div>
                      <div className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </div>
                    </div>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Account Status</h3>
                      <p className="text-sm text-muted-foreground">Your account is in good standing</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
