
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Edit2, 
  Save, 
  X 
} from 'lucide-react';
import { Typography } from '@/components/design-system/DesignSystem';

const Profile: React.FC = () => {
  const { user, isDemoMode } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || user?.user_metadata?.name || '',
    email: user?.email || '',
  });

  const handleSave = async () => {
    try {
      // In a real app, you would update the user profile here
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.user_metadata?.full_name || user?.user_metadata?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Profile - Accio</title>
        <meta name="description" content="Manage your Accio profile and account settings." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Typography.H1 className="mb-2">Profile Settings</Typography.H1>
          <Typography.Lead className="text-muted-foreground">
            Manage your account information and preferences.
          </Typography.Lead>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                {!isEditing && !isDemoMode && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {isDemoMode && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <Shield className="h-4 w-4 inline mr-1" />
                      Demo Mode: Profile editing is disabled in demo mode.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="mt-1 text-sm">
                        {formData.fullName || 'Not provided'}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        disabled
                      />
                    ) : (
                      <p className="mt-1 text-sm">{formData.email}</p>
                    )}
                    {isEditing && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Email cannot be changed directly. Contact support if needed.
                      </p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel} size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Account Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Account Type</Label>
                  <div className="mt-1">
                    <Badge variant={isDemoMode ? "secondary" : "default"}>
                      {isDemoMode ? 'Demo Account' : 'Standard Account'}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Member Since</Label>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {user?.created_at ? formatDate(user.created_at) : 'Unknown'}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Last Sign In</Label>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    {user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Unknown'}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Email Status</Label>
                  <div className="mt-1">
                    <Badge variant={user?.email_confirmed_at ? "default" : "destructive"}>
                      {user?.email_confirmed_at ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <Badge variant="outline" className="mb-2">Free Plan</Badge>
                  <Typography.Body className="text-sm text-muted-foreground mb-4">
                    You're currently on the free plan with unlimited personal use.
                  </Typography.Body>
                  <Button variant="outline" size="sm" className="w-full">
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
