
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Plus, 
  Search, 
  Filter,
  BarChart3,
  Bookmark,
  Tag,
  Clock,
  TrendingUp,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const recentItems = [
    { 
      id: '1', 
      title: 'React Performance Optimization', 
      type: 'article', 
      saved: '2 hours ago',
      tags: ['React', 'Performance'],
      readTime: '8 min'
    },
    { 
      id: '2', 
      title: 'Design System Ideas', 
      type: 'note', 
      saved: '5 hours ago',
      tags: ['Design', 'Systems'],
      readTime: '3 min'
    },
    { 
      id: '3', 
      title: 'Meeting Notes - Q1 Planning', 
      type: 'note', 
      saved: '1 day ago',
      tags: ['Meetings', 'Planning'],
      readTime: '5 min'
    },
  ];

  const stats = [
    { label: 'Total Saved', value: '247', icon: Bookmark, change: '+12 this week' },
    { label: 'This Week', value: '12', icon: Clock, change: '+3 from last week' },
    { label: 'Collections', value: '8', icon: Tag, change: '+2 new' },
    { label: 'Trending', value: '5', icon: TrendingUp, change: 'Hot topics' },
  ];

  const quickActions = [
    { label: 'Save Content', href: '/save', icon: Plus, description: 'Quickly save new content' },
    { label: 'Search', href: '/search', icon: Search, description: 'Find saved items' },
    { label: 'Collections', href: '/collections', icon: Tag, description: 'Organize content' },
    { label: 'Analytics', href: '/analytics', icon: BarChart3, description: 'View insights' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal knowledge command center" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Here's what's happening with your knowledge empire.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/search">
                <Search className="h-4 w-4" />
                Search
              </Link>
            </Button>
            <Button className="gap-2" asChild>
              <Link to="/save">
                <Plus className="h-4 w-4" />
                Quick Save
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                  asChild
                >
                  <Link to={action.href}>
                    <div className="flex items-center gap-2 w-full">
                      <action.icon className="h-4 w-4 text-primary" />
                      <span className="font-medium">{action.label}</span>
                      <ArrowRight className="h-3 w-3 ml-auto" />
                    </div>
                    <p className="text-xs text-muted-foreground text-left">
                      {action.description}
                    </p>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/saved" className="gap-2">
                    View All
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium line-clamp-1">{item.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                          <span>{item.saved}</span>
                          <span>• {item.readTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Weekly Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Save 10 items</span>
                    <span className="text-sm font-medium">8/10</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You're almost there! 2 more items to reach your goal.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Items saved</div>
                  </div>
                  <div className="text-center py-4 text-muted-foreground">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Detailed analytics coming soon!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
