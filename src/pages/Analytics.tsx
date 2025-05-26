
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  BookOpen,
  Target,
  Zap,
  Calendar,
  Award
} from 'lucide-react';

const Analytics = () => {
  const stats = [
    {
      title: "Items Saved",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: BookOpen,
      color: "blue"
    },
    {
      title: "Time Saved",
      value: "24.5 hrs",
      change: "+8%",
      trend: "up",
      icon: Clock,
      color: "green"
    },
    {
      title: "Collections",
      value: "18",
      change: "+3",
      trend: "up",
      icon: Target,
      color: "purple"
    },
    {
      title: "Knowledge Score",
      value: "92%",
      change: "+5%",
      trend: "up",
      icon: Award,
      color: "orange"
    }
  ];

  const insights = [
    {
      title: "Most Active Day",
      value: "Tuesday",
      description: "You save 40% more content on Tuesdays"
    },
    {
      title: "Top Category",
      value: "Research",
      description: "45% of your saved content is research-related"
    },
    {
      title: "Average Read Time",
      value: "8 minutes",
      description: "Perfect for focused learning sessions"
    },
    {
      title: "Streak",
      value: "12 days",
      description: "Current knowledge building streak"
    }
  ];

  const recentActivity = [
    { action: "Saved article", title: "AI in Knowledge Management", time: "2 hours ago" },
    { action: "Created collection", title: "Machine Learning Papers", time: "5 hours ago" },
    { action: "Added tags", title: "React Best Practices", time: "1 day ago" },
    { action: "Shared collection", title: "Design Resources", time: "2 days ago" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Analytics - Accio Knowledge Engine</title>
        <meta name="description" content="Track your knowledge management progress and discover insights about your learning patterns." />
      </Helmet>

      <Navigation />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Analytics</h1>
                <p className="text-muted-foreground">
                  Track your knowledge management journey and discover insights
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last 30 days
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 max-w-6xl py-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                      <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
                    </div>
                    <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts and Insights */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Activity Chart Placeholder */}
            <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Saving Activity
                </CardTitle>
                <CardDescription>
                  Your content saving patterns over the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 rounded-lg bg-muted/20 flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive chart coming soon</p>
                    <p className="text-sm text-muted-foreground">Track your daily saving habits</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <div className="space-y-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Quick Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.map((insight, index) => (
                    <div key={index} className="pb-4 border-b border-border/50 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{insight.title}</p>
                        <p className="text-sm font-bold text-primary">{insight.value}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{insight.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span>:{" "}
                          <span className="text-muted-foreground">{activity.title}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
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

export default Analytics;
