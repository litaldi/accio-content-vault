
import React, { useState } from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  AlertTriangle,
  Save,
  Moon,
  Sun,
  Monitor,
  Mail,
  Smartphone,
  Eye,
  Lock,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    learningReminders: true,
    
    // Privacy
    profileVisibility: 'private',
    dataSharing: false,
    analyticsTracking: true,
    
    // Preferences
    language: 'en',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    autoSave: true,
    
    // AI Settings
    aiSuggestions: true,
    autoTagging: true,
    smartCategories: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Your data export will be emailed to you shortly.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Please check your email to confirm this action.",
      variant: "destructive",
    });
  };

  const settingSections = [
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage how you receive updates and alerts',
      icon: Bell,
      settings: [
        {
          key: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Receive notifications via email',
          type: 'switch'
        },
        {
          key: 'pushNotifications',
          label: 'Push Notifications',
          description: 'Get browser push notifications',
          type: 'switch'
        },
        {
          key: 'weeklyDigest',
          label: 'Weekly Digest',
          description: 'Summary of your week\'s activity',
          type: 'switch'
        },
        {
          key: 'learningReminders',
          label: 'Learning Reminders',
          description: 'Reminders to review saved content',
          type: 'switch'
        }
      ]
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Customize how Accio looks and feels',
      icon: Palette,
      settings: [
        {
          key: 'theme',
          label: 'Theme',
          description: 'Choose your preferred color scheme',
          type: 'theme-select'
        }
      ]
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Language, timezone, and display options',
      icon: Globe,
      settings: [
        {
          key: 'language',
          label: 'Language',
          description: 'Choose your display language',
          type: 'select',
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
            { value: 'fr', label: 'Français' },
            { value: 'de', label: 'Deutsch' }
          ]
        },
        {
          key: 'timezone',
          label: 'Timezone',
          description: 'Your local timezone',
          type: 'select',
          options: [
            { value: 'America/Los_Angeles', label: 'Pacific Time' },
            { value: 'America/Denver', label: 'Mountain Time' },
            { value: 'America/Chicago', label: 'Central Time' },
            { value: 'America/New_York', label: 'Eastern Time' }
          ]
        },
        {
          key: 'autoSave',
          label: 'Auto-save',
          description: 'Automatically save your work',
          type: 'switch'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Control your data and security settings',
      icon: Shield,
      settings: [
        {
          key: 'profileVisibility',
          label: 'Profile Visibility',
          description: 'Who can see your profile',
          type: 'select',
          options: [
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' },
            { value: 'friends', label: 'Friends Only' }
          ]
        },
        {
          key: 'dataSharing',
          label: 'Data Sharing',
          description: 'Share anonymous usage data to improve Accio',
          type: 'switch'
        },
        {
          key: 'analyticsTracking',
          label: 'Analytics Tracking',
          description: 'Allow analytics to improve your experience',
          type: 'switch'
        }
      ]
    },
    {
      id: 'ai',
      title: 'AI & Automation',
      description: 'Configure AI-powered features',
      icon: SettingsIcon,
      settings: [
        {
          key: 'aiSuggestions',
          label: 'AI Suggestions',
          description: 'Get AI-powered content recommendations',
          type: 'switch'
        },
        {
          key: 'autoTagging',
          label: 'Auto-tagging',
          description: 'Automatically tag saved content',
          type: 'switch'
        },
        {
          key: 'smartCategories',
          label: 'Smart Categories',
          description: 'AI-suggested content categorization',
          type: 'switch'
        }
      ]
    }
  ];

  return (
    <UnifiedPageLayout
      title="Settings - Configure Your Experience | Accio"
      description="Customize your Accio experience with personal preferences, privacy settings, and notification controls."
    >
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Customize your Accio experience and manage your account preferences.
            </p>
          </div>
          <Button onClick={handleSave} className="mt-4 lg:mt-0 gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {settingSections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    className="w-full justify-start gap-3"
                  >
                    <section.icon className="h-4 w-4" />
                    {section.title}
                  </Button>
                ))}
                <Separator className="my-4" />
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Billing
                  <Badge variant="outline" className="ml-auto">Pro</Badge>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-8">
            {settingSections.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <section.icon className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.settings.map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div className="flex-1">
                        <Label className="text-sm font-medium">{setting.label}</Label>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <div className="ml-4">
                        {setting.type === 'switch' && (
                          <Switch
                            checked={settings[setting.key as keyof typeof settings] as boolean}
                            onCheckedChange={(checked) => handleSettingChange(setting.key, checked)}
                          />
                        )}
                        {setting.type === 'select' && setting.options && (
                          <Select
                            value={settings[setting.key as keyof typeof settings] as string}
                            onValueChange={(value) => handleSettingChange(setting.key, value)}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {setting.options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        {setting.type === 'theme-select' && (
                          <Select value={theme} onValueChange={setTheme}>
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">
                                <div className="flex items-center gap-2">
                                  <Sun className="h-4 w-4" />
                                  Light
                                </div>
                              </SelectItem>
                              <SelectItem value="dark">
                                <div className="flex items-center gap-2">
                                  <Moon className="h-4 w-4" />
                                  Dark
                                </div>
                              </SelectItem>
                              <SelectItem value="system">
                                <div className="flex items-center gap-2">
                                  <Monitor className="h-4 w-4" />
                                  System
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}

            {/* Account Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Account Management
                </CardTitle>
                <CardDescription>
                  Manage your account data and security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h4 className="font-medium">Export Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Download a copy of all your data
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleExportData} className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div>
                    <h4 className="font-medium text-destructive">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button variant="destructive" onClick={handleDeleteAccount} className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
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
