import React from 'react';
import { Helmet } from 'react-helmet-async';
import UnifiedNavigation from '@/components/navigation/UnifiedNavigation';
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

  const achievements = [
    {
      id: 1,
      title: "12-Day Learning Streak",
      description: "Congratulations on your 12-day learning streak!",
      icon: CheckCircle,
      color: "green"
    },
    {
      id: 2,
      title: "Top Contributor",
      description: "You've contributed to 100 knowledge items!",
      icon: Target,
      color: "blue"
    },
    {
      id: 3,
      title: "Starred Discoveries",
      description: "You've starred 50 knowledge items!",
      icon: Star,
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Knowledge Hub - Your AI-Powered Command Center | Accio</title>
        <meta name="description" content="Your personal knowledge command center. Track discoveries, manage collections, and unlock insights from your AI-organized knowledge base." />
        <link rel="canonical" href="/dashboard" />
      </Helmet>

      <UnifiedNavigation />

      <main className="flex-grow">
        {/* Enhanced Header Section */}
        <section className="py-12 border-b bg-gradient-to-r from-primary/5 via-blue-50 to-purple-50 dark:from-primary/10 dark:via-blue-950/30 dark:to-purple-950/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
                  <Brain className="h-10 w-10 text-primary" />
                  Welcome back, knowledge architect!
                </h1>
                <p className="text-muted-foreground text-lg mb-4">
                  Your brilliant discoveries are growing your knowledge empire
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    <Sparkles className="h-3 w-3 mr-1" />
                    12-day learning streak
                  </Badge>
                  <span className="text-muted-foreground">Last active: Today at 2:30 PM</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button variant="outline" size="lg" className="flex items-center gap-2 hover:bg-accent/80">
                  <Search className="h-5 w-5" />
                  Quick Search
                </Button>
                <Button size="lg" className="flex items-center gap-2 shadow-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  <Plus className="h-5 w-5" />
                  Capture New Discovery
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl py-8 space-y-10">
          {/* Enhanced Quick Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-background to-accent/20 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className={`h-7 w-7 text-${stat.color}-500`} />
                    </div>
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                      {stat.growth}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Enhanced Recent Activity */}
            <Card className="lg:col-span-2 border-0 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Latest Brilliant Discoveries
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Your most recent knowledge captures and insights
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
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
                <Button variant="outline" className="w-full mt-6 hover:bg-accent/80">
                  Explore All My Discoveries
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Power Actions</CardTitle>
                  <CardDescription>Supercharge your workflow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start hover:scale-105 transition-transform" asChild>
                    <Link to="/collections">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Browse Collections
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-accent/80" asChild>
                    <Link to="/analytics">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-accent/80">
                    <Star className="h-4 w-4 mr-2" />
                    Starred Items
                  </Button>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Achievements</CardTitle>
                  <CardDescription>Your learning milestones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-4">
                      <achievement.icon className={`h-5 w-5 text-${achievement.color}-500`} />
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Motivational Card */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/30">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Knowledge Streak</h3>
                  <p className="text-2xl font-bold text-primary mb-1">12 Days</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    You're building incredible learning habits!
                  </p>
                  <Button size="sm" className="w-full">
                    Keep the Momentum
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
