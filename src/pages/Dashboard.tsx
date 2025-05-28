
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, Plus, TrendingUp, Clock, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Saved Items',
      value: '1,234',
      change: '+12%',
      icon: BookOpen
    },
    {
      title: 'AI Categories',
      value: '48',
      change: '+5%',
      icon: Brain
    },
    {
      title: 'Searches Today',
      value: '23',
      change: '+8%',
      icon: Search
    },
    {
      title: 'Time Saved',
      value: '2.5h',
      change: '+15%',
      icon: Clock
    }
  ];

  const recentItems = [
    {
      title: 'React Performance Best Practices',
      category: 'Development',
      time: '2 hours ago',
      source: 'Medium'
    },
    {
      title: 'AI in Knowledge Management',
      category: 'Research',
      time: '5 hours ago',
      source: 'Research Paper'
    },
    {
      title: 'Team Productivity Tips',
      category: 'Productivity',
      time: '1 day ago',
      source: 'Blog Post'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Your Knowledge Overview | Accio</title>
        <meta name="description" content="Overview of your knowledge base, recent activity, and AI insights. Manage your saved content and discover new connections." />
      </Helmet>

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your knowledge base today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.change} from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Content
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Search Knowledge Base
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Brain className="h-4 w-4 mr-2" />
                    View AI Insights
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest saved content and interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{item.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{item.category}</Badge>
                            <span>•</span>
                            <span>{item.source}</span>
                            <span>•</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI Insights */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Insights
              </CardTitle>
              <CardDescription>
                Patterns and connections discovered in your knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Trending Topics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">React Development</span>
                      <Badge variant="secondary">15 items</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">AI & Machine Learning</span>
                      <Badge variant="secondary">12 items</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Productivity</span>
                      <Badge variant="secondary">8 items</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Recommendations</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• You might want to review your React notes from last month</p>
                    <p>• Consider creating a collection for your AI research</p>
                    <p>• 3 items are similar to your recent productivity saves</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
