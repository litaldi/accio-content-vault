
import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, User, Shield, Bell, Palette } from 'lucide-react';

const Settings: React.FC = () => {
  const settingsCategories = [
    {
      icon: User,
      title: 'Profile',
      description: 'Manage your personal information and account details',
      action: 'Edit Profile'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Control your privacy settings and security preferences',
      action: 'Manage Security'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure how and when you receive notifications',
      action: 'Set Preferences'
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize the look and feel of your workspace',
      action: 'Change Theme'
    }
  ];

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Settings - Accio</title>
          <meta name="description" content="Manage your account settings and preferences" />
        </Helmet>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <SettingsIcon className="h-8 w-8 text-primary" />
              Settings
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your account and customize your experience
            </p>
          </div>

          {/* Settings Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {settingsCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{category.description}</p>
                  <Button variant="outline" className="w-full">
                    {category.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Account Actions */}
          <Card className="mt-8 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Irreversible and destructive actions related to your account.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                  Export Data
                </Button>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Settings;
