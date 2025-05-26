
import React, { useState } from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Edit, 
  Save, 
  Camera,
  Trophy,
  BookmarkPlus,
  Brain,
  TrendingUp,
  Settings,
  Shield
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Passionate learner and knowledge curator. I love exploring new technologies and sharing insights with the community.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    joinDate: 'March 2023'
  });

  const stats = [
    { label: "Content Saved", value: "1,247", icon: BookmarkPlus, color: "text-blue-600" },
    { label: "Collections", value: "23", icon: Trophy, color: "text-purple-600" },
    { label: "AI Insights", value: "156", icon: Brain, color: "text-green-600" },
    { label: "Learning Streak", value: "42 days", icon: TrendingUp, color: "text-orange-600" }
  ];

  const achievements = [
    { name: "Early Adopter", description: "Joined in the first month", icon: "🌟" },
    { name: "Knowledge Explorer", description: "Saved 1000+ items", icon: "🔍" },
    { name: "Consistent Learner", description: "40+ day learning streak", icon: "📚" },
    { name: "AI Enthusiast", description: "Generated 100+ insights", icon: "🤖" },
    { name: "Collection Master", description: "Created 20+ collections", icon: "📁" }
  ];

  const recentActivity = [
    { action: "Saved article", item: "The Future of Web Development", time: "2 hours ago" },
    { action: "Created collection", item: "React Best Practices", time: "1 day ago" },
    { action: "Generated insight", item: "AI in Education trends", time: "2 days ago" },
    { action: "Updated collection", item: "Machine Learning Resources", time: "3 days ago" }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <UnifiedPageLayout
      title="Profile - Manage Your Account | Accio"
      description="View and manage your Accio profile, track your learning progress, and customize your account settings."
    >
      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                {/* Avatar Section */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {formData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="text-center font-semibold"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-1">{formData.name}</h2>
                      <p className="text-muted-foreground text-sm">Knowledge Curator</p>
                    </>
                  )}
                </div>

                {/* Profile Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="text-sm"
                      />
                    ) : (
                      <span>{formData.email}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="text-sm"
                      />
                    ) : (
                      <span>{formData.location}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {formData.joinDate}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Bio Section */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="min-h-[80px] text-sm"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{formData.bio}</p>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Action Buttons */}
                <div className="space-y-2">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm" className="flex-1 gap-2">
                        <Save className="h-4 w-4" />
                        Save
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => setIsEditing(true)} 
                      variant="outline" 
                      size="sm" 
                      className="w-full gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                  
                  <Button variant="ghost" size="sm" className="w-full gap-2">
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
                <CardDescription>
                  Overview of your learning and engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-muted/30">
                      <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-2`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>
                  Milestones you've unlocked on your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-lg border">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-semibold">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest interactions and contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span>
                          {' "'}
                          <span className="text-muted-foreground">{activity.item}</span>
                          {'"'}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Manage your privacy settings and account security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Profile Visibility</h4>
                      <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                    </div>
                    <Badge variant="secondary">Public</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Export</h4>
                      <p className="text-sm text-muted-foreground">Download your data anytime</p>
                    </div>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UnifiedPageLayout>
  );
};

export default Profile;
