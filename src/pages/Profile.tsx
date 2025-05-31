
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, LogOut, Shield, BarChart3, Bell } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
  };

  const profileSections = [
    {
      icon: User,
      title: 'Account Information',
      description: 'Manage your personal information and account settings',
      action: 'Edit Profile'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Update your password and security preferences',
      action: 'Security Settings'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Control how you receive updates and notifications',
      action: 'Notification Settings'
    },
    {
      icon: BarChart3,
      title: 'Usage Statistics',
      description: 'View your knowledge management metrics and insights',
      action: 'View Stats'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Profile - Accio</title>
        <meta name="description" content="Manage your Accio account settings, preferences, and view your knowledge management statistics." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-12 w-12 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {user?.email}
              </p>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
        </section>

        {/* Profile Sections */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6">
              {profileSections.map((section, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <section.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      {section.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Your Knowledge Stats</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">247</CardTitle>
                  <CardDescription>Documents Organized</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">52</CardTitle>
                  <CardDescription>Collections Created</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">1,432</CardTitle>
                  <CardDescription>Searches Performed</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Account Actions */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold">Account Actions</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/">
                    <Settings className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  variant="destructive" 
                  size="lg"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
