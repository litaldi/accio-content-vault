
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/hooks/useSubscription';
import SubscriptionButton from '@/components/pricing/SubscriptionButton';

const AccountSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscription, currentTier, isLoading } = useSubscription();
  const [email, setEmail] = useState('user@example.com');
  const [name, setName] = useState('Demo User');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating profile:', { email, name });
    
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'The new password and confirmation do not match.',
        variant: 'destructive',
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive',
      });
      return;
    }
    
    console.log('Updating password');
    
    toast({
      title: 'Password Updated',
      description: 'Your password has been successfully changed.',
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const getSubscriptionDisplayName = (tier: string) => {
    switch (tier) {
      case 'pro': return 'Pro Plan';
      case 'team': return 'Team Plan';
      default: return 'Free Plan';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={true} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
          
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <form onSubmit={handleProfileUpdate}>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="password">
              <Card>
                <form onSubmit={handlePasswordUpdate}>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                      Cancel
                    </Button>
                    <Button type="submit">Update Password</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="subscription">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>Manage your subscription and billing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading subscription details...</p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-secondary rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {getSubscriptionDisplayName(currentTier)}
                            </h3>
                            <p className="text-muted-foreground">
                              {currentTier === 'free' 
                                ? 'Limited features with basic functionality' 
                                : 'Full access to premium features'}
                            </p>
                            {subscription?.subscription_end && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {subscription.subscribed ? 'Renews' : 'Expires'} on {' '}
                                {new Date(subscription.subscription_end).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className={`px-3 py-1 rounded text-xs font-medium ${
                            currentTier === 'free' ? 'bg-muted' : 'bg-primary/20 text-primary'
                          }`}>
                            {currentTier === 'free' ? 'FREE' : currentTier.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      
                      {currentTier === 'free' ? (
                        <div className="text-center p-6">
                          <h4 className="text-lg font-medium mb-2">Upgrade for More Features</h4>
                          <p className="text-muted-foreground mb-6">
                            Get unlimited content storage, advanced search, file uploads, and more.
                          </p>
                          <div className="space-y-3">
                            <SubscriptionButton tier="pro" currentTier={currentTier} isPopular />
                            <SubscriptionButton tier="team" currentTier={currentTier} />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">Plan</span>
                              <span className="font-medium">{getSubscriptionDisplayName(currentTier)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                              <span className="text-muted-foreground">Status</span>
                              <span className={`font-medium ${subscription?.subscribed ? 'text-green-600' : 'text-red-600'}`}>
                                {subscription?.subscribed ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="pt-4 space-y-3">
                            <Button variant="outline" className="w-full" disabled>
                              Manage Billing (Coming Soon)
                            </Button>
                            {currentTier !== 'team' && (
                              <SubscriptionButton tier="team" currentTier={currentTier} />
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 border-t pt-6">
            <Button 
              variant="destructive" 
              onClick={() => {
                if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  toast({
                    title: 'Account Deletion Requested',
                    description: 'Your account deletion has been initiated.',
                  });
                }
              }}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;
