
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Plus, 
  Search, 
  BarChart3, 
  Clock, 
  Star,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { title: "Total Items", value: "147", icon: BookOpen, change: "+12 this week" },
    { title: "Collections", value: "8", icon: FileText, change: "+2 this month" },
    { title: "Hours Saved", value: "23", icon: Clock, change: "This month" },
    { title: "Knowledge Score", value: "87%", icon: TrendingUp, change: "+5% this week" }
  ];

  const quickActions = [
    {
      title: "Save Content",
      description: "Add something new to your library",
      icon: Plus,
      action: () => navigate('/save'),
      color: "bg-green-500"
    },
    {
      title: "Search Library",
      description: "Find what you're looking for",
      icon: Search,
      action: () => navigate('/search'),
      color: "bg-blue-500"
    },
    {
      title: "View Analytics",
      description: "See your knowledge insights",
      icon: BarChart3,
      action: () => navigate('/analytics'),
      color: "bg-purple-500"
    },
    {
      title: "Browse Collections",
      description: "Organize your content",
      icon: BookOpen,
      action: () => navigate('/collections'),
      color: "bg-orange-500"
    }
  ];

  const recentActivity = [
    { title: "AI in Healthcare Research", type: "Article", time: "2 hours ago" },
    { title: "Product Strategy Notes", type: "Note", time: "5 hours ago" },
    { title: "Design System Guidelines", type: "Document", time: "1 day ago" },
    { title: "Market Research Data", type: "Data", time: "2 days ago" }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Dashboard - Accio Knowledge Library</title>
        <meta name="description" content="Your personal knowledge dashboard. Track your learning progress and manage your content library." />
      </Helmet>

      <div className="py-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening in your knowledge library today.
            </p>
          </div>
          <Badge variant="outline" className="w-fit">
            <Star className="h-3 w-3 mr-1 text-yellow-500" />
            Pro Plan
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 ${action.color} rounded-2xl flex items-center justify-center`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest saved content and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Knowledge Insights</CardTitle>
              <CardDescription>AI-powered insights about your learning patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-medium mb-2">📚 Most Active Topic</h4>
                  <p className="text-sm text-muted-foreground">
                    You've been exploring <strong>AI & Machine Learning</strong> frequently this week.
                  </p>
                </div>
                <div className="p-4 bg-green-500/5 rounded-lg">
                  <h4 className="font-medium mb-2">🎯 Learning Goal</h4>
                  <p className="text-sm text-muted-foreground">
                    You're 73% closer to your monthly reading goal of 50 articles.
                  </p>
                </div>
                <div className="p-4 bg-blue-500/5 rounded-lg">
                  <h4 className="font-medium mb-2">💡 Smart Suggestion</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider creating a collection for your product strategy notes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default Dashboard;
