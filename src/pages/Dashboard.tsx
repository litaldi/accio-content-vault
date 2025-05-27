
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  BookOpen, 
  Search, 
  FolderOpen, 
  BarChart3, 
  Clock,
  TrendingUp,
  Star,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const quickActions = [
    {
      icon: Plus,
      title: 'Add Content',
      description: 'Save a new article, note, or document',
      action: 'Add Now',
      href: '#'
    },
    {
      icon: Search,
      title: 'Search Knowledge',
      description: 'Find information across your entire library',
      action: 'Search',
      href: '/search'
    },
    {
      icon: FolderOpen,
      title: 'Browse Collections',
      description: 'Explore your organized content collections',
      action: 'Browse',
      href: '/collections'
    },
    {
      icon: BarChart3,
      title: 'View Analytics',
      description: 'See insights about your knowledge growth',
      action: 'Analyze',
      href: '/analytics'
    }
  ];

  const stats = [
    { label: 'Total Items', value: '0', icon: BookOpen, trend: '+0%' },
    { label: 'Collections', value: '0', icon: FolderOpen, trend: '+0%' },
    { label: 'Recent Activity', value: '0', icon: Clock, trend: '+0%' },
    { label: 'AI Insights', value: '0', icon: Zap, trend: '+0%' }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Accio | Your Knowledge Hub</title>
        <meta name="description" content="Your personal knowledge management dashboard. Track progress, access content, and discover insights." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to Your Knowledge Hub</h1>
            <p className="text-muted-foreground">
              Start building your personal knowledge base and let AI help you organize and discover insights.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend} from last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <action.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </div>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <Link to={action.href}>{action.action}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Getting Started */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-primary" />
                <CardTitle>Getting Started with Accio</CardTitle>
              </div>
              <CardDescription>
                Follow these steps to make the most of your knowledge management system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-medium">Add Your First Content</h4>
                    <p className="text-sm text-muted-foreground">
                      Start by adding an article, note, or document to your knowledge base
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-medium">Organize with Collections</h4>
                    <p className="text-sm text-muted-foreground">
                      Group related content into collections for better organization
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-medium">Discover AI Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Let our AI analyze your content and provide valuable insights
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
