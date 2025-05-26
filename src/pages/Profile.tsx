
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Link as LinkIcon,
  Award,
  Settings,
  Camera,
  Save
} from 'lucide-react';

const Profile = () => {
  const userStats = [
    { label: "Items Saved", value: "1,247" },
    { label: "Collections", value: "18" },
    { label: "Days Active", value: "89" },
    { label: "Knowledge Score", value: "92%" }
  ];

  const achievements = [
    { name: "First Save", description: "Saved your first item", earned: true },
    { name: "Organizer", description: "Created 10 collections", earned: true },
    { name: "Knowledge Seeker", description: "Saved 1000+ items", earned: true },
    { name: "Sharing is Caring", description: "Shared 5 collections", earned: false }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Profile - Accio Knowledge Engine</title>
        <meta name="description" content="Manage your profile, view your achievements, and track your knowledge management progress." />
      </Helmet>

      <Navigation />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-2">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account and track your knowledge journey
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <Button size="icon" variant="outline" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">John Doe</h3>
                      <p className="text-muted-foreground">Knowledge enthusiast</p>
                      <Badge variant="secondary" className="mt-1">Premium Member</Badge>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself..."
                      defaultValue="Passionate about learning and knowledge management. I love collecting and organizing information to fuel my personal and professional growth."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="https://yourwebsite.com" />
                  </div>

                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Achievements
                  </CardTitle>
                  <CardDescription>
                    Your knowledge management milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${achievement.earned ? 'bg-primary/5 border-primary/20' : 'bg-muted/20 border-border'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.earned ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            <Award className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{achievement.name}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Account Details */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined March 2024</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
