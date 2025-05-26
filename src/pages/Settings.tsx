
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Settings as SettingsIcon, Palette, Bell, Shield, Database } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const settingsCategories = [
    {
      title: 'Appearance',
      description: 'Customize how Accio looks and feels',
      icon: Palette,
      settings: [
        {
          label: 'Theme',
          description: 'Choose your preferred color scheme',
          type: 'select',
          value: theme,
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' }
          ],
          onChange: setTheme
        },
        {
          label: 'Compact Mode',
          description: 'Show more content in less space',
          type: 'switch',
          value: false
        }
      ]
    },
    {
      title: 'Notifications',
      description: 'Manage how you receive updates',
      icon: Bell,
      settings: [
        {
          label: 'Email Notifications',
          description: 'Receive updates via email',
          type: 'switch',
          value: true
        },
        {
          label: 'Weekly Summary',
          description: 'Get a weekly summary of your activity',
          type: 'switch',
          value: true
        },
        {
          label: 'Feature Updates',
          description: 'Notify me about new features',
          type: 'switch',
          value: false
        }
      ]
    },
    {
      title: 'Privacy & Security',
      description: 'Control your data and privacy settings',
      icon: Shield,
      settings: [
        {
          label: 'Make Profile Public',
          description: 'Allow others to see your public collections',
          type: 'switch',
          value: false
        },
        {
          label: 'Analytics',
          description: 'Help improve Accio by sharing usage data',
          type: 'switch',
          value: true
        }
      ]
    },
    {
      title: 'Data Management',
      description: 'Manage your data and storage',
      icon: Database,
      settings: [
        {
          label: 'Auto-save Frequency',
          description: 'How often to automatically save changes',
          type: 'select',
          value: 'medium',
          options: [
            { value: 'low', label: 'Every 5 minutes' },
            { value: 'medium', label: 'Every 2 minutes' },
            { value: 'high', label: 'Every 30 seconds' }
          ]
        }
      ]
    }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Settings - Accio</title>
        <meta name="description" content="Customize your Accio experience with personalized settings and preferences." />
      </Helmet>

      <div className="max-w-4xl mx-auto py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <SettingsIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Customize your Accio experience</p>
          </div>
        </div>

        {/* Settings Categories */}
        <div className="space-y-6">
          {settingsCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <category.icon className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.settings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-medium">{setting.label}</Label>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <div>
                      {setting.type === 'switch' && (
                        <Switch checked={setting.value} />
                      )}
                      {setting.type === 'select' && setting.options && (
                        <Select value={setting.value} onValueChange={setting.onChange}>
                          <SelectTrigger className="w-40">
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
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Danger Zone */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions that will affect your account permanently
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
              <div>
                <h4 className="font-medium">Export Data</h4>
                <p className="text-sm text-muted-foreground">Download all your saved content and data</p>
              </div>
              <Button variant="outline">Export</Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default Settings;
