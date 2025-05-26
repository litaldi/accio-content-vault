
import React from 'react';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  BookmarkPlus, 
  Search, 
  TrendingUp, 
  Clock, 
  Star,
  FolderOpen,
  Zap,
  Brain,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { label: "Total Items", value: "1,247", icon: BookmarkPlus, change: "+12%" },
    { label: "Collections", value: "23", icon: FolderOpen, change: "+3%" },
    { label: "This Week", value: "48", icon: Clock, change: "+24%" },
    { label: "AI Insights", value: "156", icon: Brain, change: "+8%" }
  ];

  const recentItems = [
    { title: "The Future of AI in Knowledge Management", type: "Article", time: "2 hours ago" },
    { title: "React Performance Optimization Guide", type: "Tutorial", time: "5 hours ago" },
    { title: "Design System Best Practices", type: "Documentation", time: "1 day ago" },
    { title: "Machine Learning Fundamentals", type: "Course", time: "2 days ago" }
  ];

  const quickActions = [
    { title: "Save Content", description: "Add new content to your collection", icon: BookmarkPlus, href: "/save" },
    { title: "Search Library", description: "Find specific information quickly", icon: Search, href: "/search" },
    { title: "View Collections", description: "Browse organized content", icon: FolderOpen, href: "/collections" },
    { title: "Analytics", description: "Track your learning progress", icon: TrendingUp, href: "/analytics" }
  ];

  return (
    <UnifiedPageLayout
      title="Dashboard - Your Knowledge Hub | Accio"
      description="Access your personal knowledge dashboard. View recent activity, manage collections, and track your learning progress."
    >
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your knowledge collection.
            </p>
          </div>
          <Button size="lg" className="mt-4 lg:mt-0 gap-2" asChild>
            <Link to="/save">
              <Plus className="h-5 w-5" />
              Save Content
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="text-xs mt-2">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common tasks to manage your knowledge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.href} className="block">
                      <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <action.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">{action.title}</h3>
                              <p className="text-sm text-muted-foreground">{action.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest saved content and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Content Saved</span>
                      <span className="text-sm font-medium">48/50</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '96%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Learning Goal</span>
                      <span className="text-sm font-medium">7/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '70%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Collections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Top Collections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Web Development</span>
                    <Badge variant="secondary">324 items</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI & Machine Learning</span>
                    <Badge variant="secondary">187 items</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Design Resources</span>
                    <Badge variant="secondary">156 items</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Business Strategy</span>
                    <Badge variant="secondary">98 items</Badge>
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

export default Dashboard;
