
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Download,
  Trash2,
  Eye,
  Globe,
  Smartphone,
  Save,
  AlertTriangle
} from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    shareStats: false,
    analytics: true
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Settings - Accio Knowledge Engine</title>
        <meta name="description" content="Customize your account preferences, privacy settings, and notification options." />
      </Helmet>

      <ProfessionalNavigation />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Customize your account preferences and privacy settings
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-4xl py-8 space-y-8">
          {/* Account Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Manage your account preferences and display settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Standard Time</SelectItem>
                      <SelectItem value="est">Eastern Standard Time</SelectItem>
                      <SelectItem value="cst">Central Standard Time</SelectItem>
                      <SelectItem value="mst">Mountain Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
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
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-save enabled</Label>
                    <p className="text-sm text-muted-foreground">Automatically save content as you browse</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Smart categorization</Label>
                    <p className="text-sm text-muted-foreground">Let AI automatically categorize your content</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Offline mode</Label>
                    <p className="text-sm text-muted-foreground">Enable offline access to your content</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about important updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, email: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push notifications</Label>
                  <p className="text-sm text-muted-foreground">Get real-time browser notifications</p>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, push: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly digest</Label>
                  <p className="text-sm text-muted-foreground">Summary of your activity and insights</p>
                </div>
                <Switch 
                  checked={notifications.weekly}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, weekly: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Marketing emails</Label>
                  <p className="text-sm text-muted-foreground">Updates about new features and tips</p>
                </div>
                <Switch 
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications(prev => ({...prev, marketing: checked}))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your privacy settings and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Public profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch 
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked) => setPrivacy(prev => ({...prev, profileVisible: checked}))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Share usage statistics</Label>
                    <p className="text-sm text-muted-foreground">Help improve Accio with anonymous usage data</p>
                  </div>
                  <Switch 
                    checked={privacy.shareStats}
                    onCheckedChange={(checked) => setPrivacy(prev => ({...prev, shareStats: checked}))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Analytics tracking</Label>
                    <p className="text-sm text-muted-foreground">Allow analytics to improve your experience</p>
                  </div>
                  <Switch 
                    checked={privacy.analytics}
                    onCheckedChange={(checked) => setPrivacy(prev => ({...prev, analytics: checked}))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <div className="flex gap-2">
                  <Input id="password" type="password" placeholder="Enter new password" className="flex-1" />
                  <Button variant="outline">Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Data Management
              </CardTitle>
              <CardDescription>
                Export, backup, or delete your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Export Data</h4>
                    <p className="text-sm text-muted-foreground">Download all your content and collections</p>
                  </div>
                </div>
                <Button variant="outline">Export</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">API Access</h4>
                    <p className="text-sm text-muted-foreground">Generate API keys for third-party integrations</p>
                  </div>
                </div>
                <Button variant="outline">Manage</Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <div className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-destructive" />
                  <div>
                    <h4 className="font-medium text-destructive">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                </div>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Changes */}
          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save All Changes
            </Button>
          </div>
        </div>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default Settings;
