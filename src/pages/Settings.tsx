
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Bell,
  Palette,
  Shield,
  CreditCard,
  Accessibility,
  Brain,
  Save,
  Info,
  Eye,
  Volume2,
  Type,
  Monitor,
  Smartphone
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  // Settings state
  const [profile, setProfile] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    bio: ''
  });
  
  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    itemsPerPage: '20'
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    digest: true,
    mentions: true
  });
  
  const [accessibility, setAccessibility] = useState({
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false
  });
  
  const [aiSettings, setAiSettings] = useState({
    tone: 'professional',
    summaryLength: 'medium',
    autoTag: true,
    smartSuggestions: true
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Updated",
      description: `Your ${section} settings have been saved successfully.`,
    });
  };

  const SettingsSection = ({ 
    icon: Icon, 
    title, 
    description, 
    children 
  }: { 
    icon: any, 
    title: string, 
    description: string, 
    children: React.ReactNode 
  }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );

  const SettingItem = ({ 
    label, 
    description, 
    children, 
    tooltip 
  }: { 
    label: string, 
    description?: string, 
    children: React.ReactNode,
    tooltip?: string 
  }) => (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Label className="font-medium">{label}</Label>
          {tooltip && (
            <Info className="h-4 w-4 text-muted-foreground cursor-help" title={tooltip} />
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Settings - Accio</title>
        <meta name="description" content="Manage your account settings, preferences, and accessibility options" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, preferences, and accessibility settings
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">AI</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Accessibility className="h-4 w-4" />
              <span className="hidden sm:inline">Access</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <SettingsSection
              icon={User}
              title="Profile Information"
              description="Update your personal information and account details"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself"
                />
              </div>
              <Button onClick={() => handleSave('profile')} className="gap-2">
                <Save className="h-4 w-4" />
                Save Profile
              </Button>
            </SettingsSection>
          </TabsContent>

          <TabsContent value="preferences">
            <SettingsSection
              icon={Palette}
              title="Appearance & Preferences"
              description="Customize your interface and general preferences"
            >
              <SettingItem 
                label="Theme" 
                description="Choose your preferred color scheme"
              >
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>

              <SettingItem 
                label="Language" 
                description="Select your preferred language"
              >
                <Select value={preferences.language} onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, language: value }))
                }>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>

              <SettingItem 
                label="Timezone" 
                description="Your local timezone for dates and times"
              >
                <Select value={preferences.timezone} onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, timezone: value }))
                }>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>

              <Button onClick={() => handleSave('preferences')} className="gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </SettingsSection>
          </TabsContent>

          <TabsContent value="notifications">
            <SettingsSection
              icon={Bell}
              title="Notification Settings"
              description="Control how and when you receive notifications"
            >
              <SettingItem 
                label="Email Notifications" 
                description="Receive updates via email"
              >
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, email: checked }))
                  }
                />
              </SettingItem>

              <SettingItem 
                label="Push Notifications" 
                description="Browser notifications for real-time updates"
              >
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, push: checked }))
                  }
                />
              </SettingItem>

              <SettingItem 
                label="Weekly Digest" 
                description="Summary of your activity and insights"
              >
                <Switch 
                  checked={notifications.digest}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, digest: checked }))
                  }
                />
              </SettingItem>

              <Button onClick={() => handleSave('notifications')} className="gap-2">
                <Save className="h-4 w-4" />
                Save Notifications
              </Button>
            </SettingsSection>
          </TabsContent>

          <TabsContent value="ai">
            <SettingsSection
              icon={Brain}
              title="AI Assistant Settings"
              description="Customize how AI features work for you"
            >
              <SettingItem 
                label="AI Tone" 
                description="Choose the communication style for AI responses"
                tooltip="This affects how the AI assistant communicates with you"
              >
                <Select value={aiSettings.tone} onValueChange={(value) => 
                  setAiSettings(prev => ({ ...prev, tone: value }))
                }>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>

              <SettingItem 
                label="Summary Length" 
                description="Default length for AI-generated summaries"
              >
                <Select value={aiSettings.summaryLength} onValueChange={(value) => 
                  setAiSettings(prev => ({ ...prev, summaryLength: value }))
                }>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>

              <SettingItem 
                label="Auto-tagging" 
                description="Automatically suggest tags for saved content"
              >
                <Switch 
                  checked={aiSettings.autoTag}
                  onCheckedChange={(checked) => 
                    setAiSettings(prev => ({ ...prev, autoTag: checked }))
                  }
                />
              </SettingItem>

              <Button onClick={() => handleSave('AI')} className="gap-2">
                <Save className="h-4 w-4" />
                Save AI Settings
              </Button>
            </SettingsSection>
          </TabsContent>

          <TabsContent value="accessibility">
            <SettingsSection
              icon={Accessibility}
              title="Accessibility Options"
              description="Customize the interface for better accessibility"
            >
              <SettingItem 
                label="Reduce Motion" 
                description="Minimize animations and transitions"
                tooltip="Helpful for users sensitive to motion"
              >
                <Switch 
                  checked={accessibility.reduceMotion}
                  onCheckedChange={(checked) => 
                    setAccessibility(prev => ({ ...prev, reduceMotion: checked }))
                  }
                />
              </SettingItem>

              <SettingItem 
                label="High Contrast" 
                description="Increase contrast for better visibility"
              >
                <Switch 
                  checked={accessibility.highContrast}
                  onCheckedChange={(checked) => 
                    setAccessibility(prev => ({ ...prev, highContrast: checked }))
                  }
                />
              </SettingItem>

              <SettingItem 
                label="Large Text" 
                description="Increase text size throughout the app"
              >
                <Switch 
                  checked={accessibility.largeText}
                  onCheckedChange={(checked) => 
                    setAccessibility(prev => ({ ...prev, largeText: checked }))
                  }
                />
              </SettingItem>

              <Button onClick={() => handleSave('accessibility')} className="gap-2">
                <Save className="h-4 w-4" />
                Save Accessibility
              </Button>
            </SettingsSection>
          </TabsContent>

          <TabsContent value="billing">
            <SettingsSection
              icon={CreditCard}
              title="Billing & Subscription"
              description="Manage your subscription and payment methods"
            >
              <div className="flex items-center justify-between p-6 border rounded-lg bg-gradient-to-r from-primary/5 to-background">
                <div>
                  <h3 className="font-semibold mb-1">Current Plan</h3>
                  <p className="text-sm text-muted-foreground mb-2">Pro Plan - $9.99/month</p>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <Button variant="outline">Manage Subscription</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Payment Methods</h4>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline" size="sm">Add Payment Method</Button>
              </div>
            </SettingsSection>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
