
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  FileText, 
  Tags, 
  TrendingUp, 
  Plus,
  Search,
  Calendar,
  Target
} from 'lucide-react';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { copy } from '@/utils/copy';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { 
      title: 'Saved Items', 
      value: '247', 
      change: '+12%', 
      icon: BookOpen,
      description: 'Articles and resources saved'
    },
    { 
      title: 'Collections', 
      value: '18', 
      change: '+5%', 
      icon: FileText,
      description: 'Organized collections'
    },
    { 
      title: 'Smart Tags', 
      value: '84', 
      change: '+8%', 
      icon: Tags,
      description: 'AI-generated tags'
    },
    { 
      title: 'Knowledge Score', 
      value: '92%', 
      change: '+3%', 
      icon: TrendingUp,
      description: 'Organization efficiency'
    }
  ];

  const quickActions = [
    {
      title: copy.navigation.saveContent,
      description: 'Capture new articles, links, and resources',
      icon: Plus,
      action: () => navigate('/save'),
      color: 'bg-blue-500'
    },
    {
      title: 'Smart Search',
      description: 'Find anything in your knowledge base',
      icon: Search,
      action: () => navigate('/search'),
      color: 'bg-green-500'
    },
    {
      title: copy.navigation.collections,
      description: 'Browse and organize your content',
      icon: BookOpen,
      action: () => navigate('/collections'),
      color: 'bg-purple-500'
    },
    {
      title: copy.navigation.analytics,
      description: 'View insights and progress',
      icon: TrendingUp,
      action: () => navigate('/analytics'),
      color: 'bg-orange-500'
    }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>{copy.navigation.dashboard} - Accio</title>
        <meta name="description" content="Your personal knowledge dashboard with AI-powered insights and organization tools." />
      </Helmet>

      <div className="space-y-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{copy.auth.welcome}</h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening with your knowledge library today.
            </p>
          </div>
          <Button onClick={() => navigate('/save')} className="md:self-start">
            <Plus className="h-4 w-4 mr-2" />
            Save Content
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Card key={action.title} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
              <CardHeader>
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Monthly Goal Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Content Saved</span>
                  <span>67/100</span>
                </div>
                <Progress value={67} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Collections Organized</span>
                  <span>12/20</span>
                </div>
                <Progress value={60} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Saved "React Best Practices" article</span>
                  <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Created "Web Development" collection</span>
                  <span className="text-xs text-muted-foreground ml-auto">5h ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Tagged 5 items with "AI"</span>
                  <span className="text-xs text-muted-foreground ml-auto">1d ago</span>
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
