
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Plus, 
  Search, 
  TrendingUp,
  Clock,
  Star,
  FolderOpen,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const recentItems = [
    {
      id: 1,
      title: "AI in Knowledge Management",
      type: "Article",
      saved: "2 hours ago",
      tags: ["AI", "Knowledge", "Research"]
    },
    {
      id: 2,
      title: "React Best Practices 2024",
      type: "Documentation",
      saved: "1 day ago",
      tags: ["React", "Development", "Frontend"]
    },
    {
      id: 3,
      title: "Design System Guidelines",
      type: "Guide",
      saved: "2 days ago",
      tags: ["Design", "UI/UX", "Guidelines"]
    }
  ];

  const quickStats = [
    { label: "Items Saved", value: "247", icon: BookOpen, color: "blue" },
    { label: "Collections", value: "12", icon: FolderOpen, color: "green" },
    { label: "This Week", value: "+18", icon: TrendingUp, color: "purple" },
    { label: "Reading Time", value: "24h", icon: Clock, color: "orange" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Dashboard - Accio Knowledge Engine</title>
        <meta name="description" content="Your personal knowledge dashboard - manage saved content, collections, and insights." />
      </Helmet>

      <Navigation />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your knowledge collection
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Save Content
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl py-8 space-y-8">
          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest saved content and interactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                        <span className="text-sm text-muted-foreground">{item.saved}</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" asChild>
                    <a href="/collections">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Browse Collections
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/analytics">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Starred Items
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

export default Dashboard;
