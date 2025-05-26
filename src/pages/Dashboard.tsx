
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CleanNavigation from '@/components/navigation/CleanNavigation';
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
  BarChart3, 
  Brain,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { label: "Knowledge Items", value: "1,247", icon: BookOpen, growth: "+23%" },
    { label: "Collections", value: "18", icon: FolderOpen, growth: "+3" },
    { label: "Weekly Saves", value: "32", icon: TrendingUp, growth: "+41%" },
    { label: "Time Saved", value: "28.5h", icon: Clock, growth: "+12%" }
  ];

  const recentItems = [
    {
      id: 1,
      title: "AI Revolution in Knowledge Management",
      type: "Research Article",
      saved: "2 hours ago",
      tags: ["AI", "Future", "Innovation"]
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      type: "Technical Guide", 
      saved: "1 day ago",
      tags: ["React", "Development"]
    },
    {
      id: 3,
      title: "Psychology of Innovation",
      type: "Insight Collection",
      saved: "2 days ago", 
      tags: ["Psychology", "Innovation"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your knowledge command center. Track discoveries, manage collections, and unlock insights." />
      </Helmet>

      <CleanNavigation />

      <main className="flex-grow">
        {/* Header */}
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <Brain className="h-8 w-8 text-primary" />
                  Welcome back
                </h1>
                <p className="text-muted-foreground text-lg">
                  Your knowledge empire continues to grow
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild>
                  <Link to="/collections">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Browse Collections
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/dashboard">
                    <Plus className="h-4 w-4 mr-2" />
                    Save Content
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-8">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {stat.growth}
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
          </div>
        </section>

        {/* Recent Activity */}
        <section className="py-8">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Items */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Recent Discoveries</h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/collections">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {recentItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span>{item.type}</span>
                              <span>•</span>
                              <span>{item.saved}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Search className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Smart Search</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Find anything in your knowledge base instantly
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Open Search
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                        <FolderOpen className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Create Collection</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Organize your knowledge into themed collections
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/collections">
                          Get Started
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                        <BarChart3 className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Analytics</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Track your learning progress and insights
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/analytics">
                          View Stats
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
