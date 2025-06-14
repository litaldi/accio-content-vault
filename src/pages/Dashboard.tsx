
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Plus, Search, Settings, BookOpen, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const userName = user?.user_metadata?.full_name || 
                  user?.user_metadata?.name || 
                  user?.name || 
                  'User';

  const quickActions = [
    {
      title: 'Add Content',
      description: 'Save articles, notes, or documents',
      icon: Plus,
      href: '/add-content',
      color: 'bg-blue-500'
    },
    {
      title: 'Search Knowledge',
      description: 'Find information instantly',
      icon: Search,
      href: '/search',
      color: 'bg-green-500'
    },
    {
      title: 'Browse Library',
      description: 'Explore your saved content',
      icon: BookOpen,
      href: '/library',
      color: 'bg-purple-500'
    },
    {
      title: 'Analytics',
      description: 'View usage insights',
      icon: TrendingUp,
      href: '/analytics',
      color: 'bg-orange-500'
    }
  ];

  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your Accio knowledge management dashboard" />
      </Helmet>

      <main id="main-content" className="flex-1 p-6" aria-label="Dashboard content">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {userName}!
              </h1>
              <p className="text-muted-foreground mt-2">
                Your knowledge vault is ready to help you learn and discover.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <Card key={action.title} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={action.href}>
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Start adding content to build your knowledge base
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Searches</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Your search history will appear here
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Collections</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Organize content into collections
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions and saved content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No recent activity</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding some content to your knowledge vault
                </p>
                <Button asChild>
                  <Link to="/add-content">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Item
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </AuthenticatedLayout>
  );
};

export default Dashboard;
