
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ModernNavigation from '@/components/navigation/ModernNavigation';
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
  Sparkles,
  Brain,
  Zap,
  Target,
  Award,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const recentItems = [
    {
      id: 1,
      title: "AI Revolution in Knowledge Management",
      type: "Research Article",
      saved: "2 hours ago",
      tags: ["AI", "Future", "Innovation"],
      impact: "High"
    },
    {
      id: 2,
      title: "Advanced React Patterns That Will Blow Your Mind",
      type: "Technical Guide",
      saved: "1 day ago", 
      tags: ["React", "Development", "Best Practices"],
      impact: "Medium"
    },
    {
      id: 3,
      title: "The Psychology of Breakthrough Innovation",
      type: "Insight Collection",
      saved: "2 days ago",
      tags: ["Psychology", "Innovation", "Creativity"],
      impact: "High"
    }
  ];

  const quickStats = [
    { label: "Knowledge Items", value: "1,247", icon: BookOpen, color: "blue", growth: "+23%" },
    { label: "Smart Collections", value: "18", icon: FolderOpen, color: "green", growth: "+3" },
    { label: "Weekly Discoveries", value: "32", icon: TrendingUp, color: "purple", growth: "+41%" },
    { label: "Time Saved", value: "28.5hrs", icon: Clock, color: "orange", growth: "+12%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Knowledge Hub - Your AI-Powered Command Center | Accio</title>
        <meta name="description" content="Your personal knowledge command center. Track discoveries, manage collections, and unlock insights from your AI-organized knowledge base." />
        <link rel="canonical" href="/dashboard" />
      </Helmet>

      <ModernNavigation />

      <main>
        {/* Header Section */}
        <section className="content-spacing gradient-subtle">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="animate-fade-in-up">
                <h1 className="text-title element-spacing-sm flex items-center gap-3">
                  <Brain className="h-10 w-10 text-primary" />
                  Welcome back, knowledge architect!
                </h1>
                <p className="text-body-large text-muted-foreground element-spacing-sm">
                  Your brilliant discoveries are growing your knowledge empire
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge className="badge-modern badge-success">
                    <CheckCircle className="h-3 w-3" />
                    12-day learning streak
                  </Badge>
                  <span className="text-caption">Last active: Today at 2:30 PM</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="btn-secondary">
                  <Search className="h-4 w-4 mr-2" />
                  Quick Search
                </Button>
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Capture Discovery
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-7xl pb-12 space-y-12">
          {/* Quick Stats */}
          <section className="animate-stagger">
            <div className="layout-grid layout-grid-4">
              {quickStats.map((stat, index) => (
                <Card key={index} className="card-modern text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-subtitle text-primary mb-1">{stat.value}</div>
                    <div className="text-caption mb-2">{stat.label}</div>
                    <Badge className="badge-modern badge-success text-xs">
                      {stat.growth}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Main Content Grid */}
          <section className="layout-grid layout-grid-3">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="card-modern">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-subtitle flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Latest Brilliant Discoveries
                      </CardTitle>
                      <CardDescription className="text-body">
                        Your most recent knowledge captures and insights
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="btn-secondary">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl border hover:bg-muted/50 transition-all group cursor-pointer">
                      <div className={`w-3 h-3 rounded-full mt-2 ${item.impact === 'High' ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="badge-modern text-xs">{item.type}</Badge>
                          <span className="text-caption">{item.saved}</span>
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
                  <Button variant="outline" className="btn-secondary w-full mt-6">
                    Explore All My Discoveries
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="text-subtitle">Power Actions</CardTitle>
                  <CardDescription>Supercharge your workflow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="btn-secondary w-full justify-start" asChild>
                    <Link to="/collections">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Browse Collections
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/analytics">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Starred Items
                  </Button>
                </CardContent>
              </Card>

              {/* Learning Streak */}
              <Card className="card-modern gradient-primary text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-subtitle mb-2">Knowledge Streak</h3>
                  <p className="text-title text-primary mb-1">12 Days</p>
                  <p className="text-caption mb-4">
                    You're building incredible learning habits!
                  </p>
                  <Button className="btn-primary w-full">
                    Keep the Momentum
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
