
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
  BarChart3,
  Sparkles,
  Brain
} from 'lucide-react';
import { copy } from '@/utils/copy';

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
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Knowledge Hub - Your AI-Powered Command Center | Accio</title>
        <meta name="description" content="Your personal knowledge command center. Track discoveries, manage collections, and unlock insights from your AI-organized knowledge base." />
      </Helmet>

      <Navigation />

      <main className="flex-grow">
        {/* Enhanced Header Section */}
        <section className="py-8 border-b bg-gradient-to-r from-primary/5 via-blue-50 to-purple-50 dark:from-primary/10 dark:via-blue-950/30 dark:to-purple-950/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <Brain className="h-8 w-8 text-primary" />
                  {copy.common.loading.replace('Working our magic...', 'Welcome back, knowledge architect!')}
                </h1>
                <p className="text-muted-foreground text-lg">
                  Your brilliant discoveries are growing your knowledge empire
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2 hover:bg-accent/80">
                  <Search className="h-4 w-4" />
                  Find Anything
                </Button>
                <Button className="flex items-center gap-2 shadow-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  <Plus className="h-4 w-4" />
                  Capture New Discovery
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl py-8 space-y-8">
          {/* Enhanced Quick Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-all group border-0 bg-gradient-to-br from-background to-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      <Badge variant="secondary" className="mt-2 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                        {stat.growth} this week
                      </Badge>
                    </div>
                    <div className={`w-14 h-14 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`h-7 w-7 text-${stat.color}-500`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Enhanced Recent Activity */}
            <Card className="lg:col-span-2 border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Latest Brilliant Discoveries
                </CardTitle>
                <CardDescription>
                  Your most recent knowledge captures and insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl border hover:bg-accent/50 transition-all group cursor-pointer">
                    <div className={`w-3 h-3 rounded-full mt-2 ${item.impact === 'High' ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h4>
                        {item.impact === 'High' && (
                          <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                        <span className="text-sm text-muted-foreground">{item.saved}</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs hover:bg-primary/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4 hover:bg-accent/80">
                  Explore All My Discoveries
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Quick Actions */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                  <CardDescription>Power up your knowledge workflow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start hover:scale-105 transition-transform" asChild>
                    <a href="/collections">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Browse My Collections
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-accent/80" asChild>
                    <a href="/analytics">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Growth Analytics
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-accent/80">
                    <Star className="h-4 w-4 mr-2" />
                    My Starred Discoveries
                  </Button>
                </CardContent>
              </Card>

              {/* Motivational Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/30">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Knowledge Streak</h3>
                  <p className="text-2xl font-bold text-primary mb-1">12 Days</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    You're building consistent learning habits!
                  </p>
                  <Button size="sm" className="w-full">
                    Keep the Momentum Going
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
