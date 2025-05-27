
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
import { ResponsiveWrapper } from '@/components/ui/responsive-wrapper';
import { ResponsiveCard } from '@/components/ui/responsive-card';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';
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
  Smartphone,
  Check,
  AlertCircle
} from 'lucide-react';

const EnhancedSettings = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { isMobile } = useResponsiveLayout();
  
  // Settings state
  const [profile, setProfile] = useState({
    name: user?.name || '',
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
    <ResponsiveCard
      title={title}
      subtitle={description}
      icon={<Icon className="h-5 w-5 text-primary" />}
      className="mb-6"
    >
      <div className="space-y-4">
        {children}
      </div>
    </ResponsiveCard>
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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border bg-muted/30">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Label className="font-medium text-sm sm:text-base">{label}</Label>
          {tooltip && (
            <div title={tooltip}>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </div>
          )}
        </div>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );

  const tabItems = [
    { value: 'profile', label: 'Profile', icon: User, mobileLabel: 'Profile' },
    { value: 'preferences', label: 'Preferences', icon: Monitor, mobileLabel: 'Prefs' },
    { value: 'notifications', label: 'Notifications', icon: Bell, mobileLabel: 'Notify' },
    { value: 'ai', label: 'AI Settings', icon: Brain, mobileLabel: 'AI' },
    { value: 'accessibility', label: 'Accessibility', icon: Accessibility, mobileLabel: 'Access' },
    { value: 'billing', label: 'Billing', icon: CreditCard, mobileLabel: 'Billing' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Settings - Accio</title>
        <meta name="description" content="Manage your account settings, preferences, and accessibility options" />
      </Helmet>

      <ResponsiveWrapper maxWidth="5xl" padding="lg">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your account, preferences, and accessibility settings
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6" orientation={isMobile ? "vertical" : "horizontal"}>
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-6'} ${isMobile ? 'h-auto' : ''}`}>
            {tabItems.map((item) => (
              <TabsTrigger 
                key={item.value} 
                value={item.value} 
                className={`flex items-center gap-2 ${isMobile ? 'flex-col text-xs py-3' : 'text-sm'}`}
              >
                <item.icon className="h-4 w-4" />
                <span className={isMobile ? 'text-xs' : 'hidden sm:inline'}>
                  {isMobile ? item.mobileLabel : item.label}
                </span>
              </TabsTrigger>
            ))}
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
                    className="focus-enhanced"
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
                    className="focus-enhanced"
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
                  className="focus-enhanced"
                />
              </div>
              <Button onClick={() => handleSave('profile')} className="gap-2 w-full sm:w-auto">
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
                  <SelectTrigger className="w-full sm:w-32">
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
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>

              <Button onClick={() => handleSave('preferences')} className="gap-2 w-full sm:w-auto">
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

              <Button onClick={() => handleSave('notifications')} className="gap-2 w-full sm:w-auto">
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
                  <SelectTrigger className="w-full sm:w-32">
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

              <Button onClick={() => handleSave('AI')} className="gap-2 w-full sm:w-auto">
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
                  onCheckedChange={(checked) => {
                    setAccessibility(prev => ({ ...prev, reduceMotion: checked }));
                    if (checked) {
                      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
                    } else {
                      document.documentElement.style.removeProperty('--animation-duration');
                    }
                  }}
                />
              </SettingItem>

              <SettingItem 
                label="High Contrast" 
                description="Increase contrast for better visibility"
              >
                <Switch 
                  checked={accessibility.highContrast}
                  onCheckedChange={(checked) => {
                    setAccessibility(prev => ({ ...prev, highContrast: checked }));
                    if (checked) {
                      document.documentElement.classList.add('high-contrast');
                    } else {
                      document.documentElement.classList.remove('high-contrast');
                    }
                  }}
                />
              </SettingItem>

              <SettingItem 
                label="Large Text" 
                description="Increase text size throughout the app"
              >
                <Switch 
                  checked={accessibility.largeText}
                  onCheckedChange={(checked) => {
                    setAccessibility(prev => ({ ...prev, largeText: checked }));
                    if (checked) {
                      document.documentElement.style.fontSize = '18px';
                    } else {
                      document.documentElement.style.fontSize = '';
                    }
                  }}
                />
              </SettingItem>

              <Button onClick={() => handleSave('accessibility')} className="gap-2 w-full sm:w-auto">
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border rounded-lg bg-gradient-to-r from-primary/5 to-background">
                <div>
                  <h3 className="font-semibold mb-1">Current Plan</h3>
                  <p className="text-sm text-muted-foreground mb-2">Pro Plan - $9.99/month</p>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                  Manage Subscription
                </Button>
              </div>
            </SettingsSection>
          </TabsContent>
        </Tabs>
      </ResponsiveWrapper>
    </div>
  );
};

export default EnhancedSettings;
