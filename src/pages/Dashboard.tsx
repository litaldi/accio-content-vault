
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BookmarkPlus, 
  Search, 
  Settings, 
  BarChart3,
  FileText,
  Tags,
  TrendingUp,
  Clock,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Save Content',
      description: 'Add new articles, links, or documents',
      icon: BookmarkPlus,
      href: '/save',
      color: 'bg-blue-500'
    },
    {
      title: 'Search Library',
      description: 'Find your saved content',
      icon: Search,
      href: '/search',
      color: 'bg-green-500'
    },
    {
      title: 'Settings',
      description: 'Customize your experience',
      icon: Settings,
      href: '/settings',
      color: 'bg-purple-500'
    }
  ];

  const stats = [
    { label: 'Total Items', value: '24', icon: FileText },
    { label: 'Collections', value: '8', icon: Tags },
    { label: 'This Week', value: '+5', icon: TrendingUp },
    { label: 'Reading Time', value: '2.5h', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal knowledge dashboard" />
      </Helmet>

      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="text-xl font-bold">Accio</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/settings">Settings</Link>
            </Button>
            <Button asChild>
              <Link to="/save">
                <Plus className="mr-2 h-4 w-4" />
                Save Content
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <main id="main-content" className="container mx-auto px-4 py-8 max-w-7xl" aria-label="Dashboard content">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your knowledge library today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with these common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  asChild
                  className="h-auto p-6 flex-col items-start text-left"
                >
                  <Link to={action.href}>
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">Sample Article Saved</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge variant="secondary">Article</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg border">
                  <Tags className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium">New Collection Created</p>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                  </div>
                  <Badge variant="secondary">Collection</Badge>
                </div>
                
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    Start saving content to see your activity here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reading Progress</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[45%]"></div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm">Storage Used</span>
                  <span className="text-sm font-medium">2.1 GB of 10 GB</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[21%]"></div>
                </div>

                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Full Analytics
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
