
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  FileText, 
  Link as LinkIcon, 
  Image, 
  Calendar,
  TrendingUp,
  BookOpen,
  Star
} from 'lucide-react';
import { Typography } from '@/components/design-system/DesignSystem';

interface DashboardStats {
  totalItems: number;
  recentItems: number;
  favoriteItems: number;
  categories: number;
}

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  action: () => void;
  color: string;
}

const Dashboard: React.FC = () => {
  const { user, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    recentItems: 0,
    favoriteItems: 0,
    categories: 0
  });

  // Demo data for demonstration
  const demoStats: DashboardStats = {
    totalItems: 247,
    recentItems: 12,
    favoriteItems: 34,
    categories: 8
  };

  const quickActions: QuickAction[] = [
    {
      icon: Plus,
      label: 'Save Content',
      description: 'Quickly save articles, notes, or links',
      action: () => navigate('/save'),
      color: 'text-blue-500'
    },
    {
      icon: Search,
      label: 'Smart Search',
      description: 'Find content with AI-powered search',
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      },
      color: 'text-green-500'
    },
    {
      icon: BookOpen,
      label: 'Browse Library',
      description: 'Explore your organized content',
      action: () => navigate('/library'),
      color: 'text-purple-500'
    },
    {
      icon: TrendingUp,
      label: 'View Analytics',
      description: 'See insights about your knowledge',
      action: () => navigate('/analytics'),
      color: 'text-orange-500'
    }
  ];

  const recentItems = [
    {
      id: '1',
      title: 'Getting Started with React Hooks',
      type: 'article',
      url: 'https://example.com/react-hooks',
      savedAt: '2 hours ago',
      tags: ['React', 'JavaScript', 'Development']
    },
    {
      id: '2',
      title: 'Design System Best Practices',
      type: 'note',
      content: 'Key principles for building scalable design systems...',
      savedAt: '1 day ago',
      tags: ['Design', 'UI/UX', 'Guidelines']
    },
    {
      id: '3',
      title: 'TypeScript Advanced Types',
      type: 'link',
      url: 'https://example.com/typescript',
      savedAt: '3 days ago',
      tags: ['TypeScript', 'Programming', 'Types']
    }
  ];

  useEffect(() => {
    if (isDemoMode) {
      setStats(demoStats);
    } else {
      // In a real app, fetch user's actual stats
      setStats({
        totalItems: 0,
        recentItems: 0,
        favoriteItems: 0,
        categories: 0
      });
    }
  }, [isDemoMode]);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'link':
        return <LinkIcon className="h-4 w-4" />;
      case 'note':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const statCards = [
    {
      title: 'Total Items',
      value: stats.totalItems.toLocaleString(),
      icon: BookOpen,
      color: 'text-blue-500'
    },
    {
      title: 'Recent Items',
      value: stats.recentItems.toString(),
      icon: Calendar,
      color: 'text-green-500'
    },
    {
      title: 'Favorites',
      value: stats.favoriteItems.toString(),
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      title: 'Categories',
      value: stats.categories.toString(),
      icon: TrendingUp,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal knowledge dashboard - overview of your saved content and insights." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Typography.H1 className="mb-2">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
          </Typography.H1>
          <Typography.Lead className="text-muted-foreground">
            {isDemoMode 
              ? "You're exploring Accio in demo mode. Here's what your dashboard would look like."
              : "Here's what's happening with your knowledge base today."
            }
          </Typography.Lead>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search your knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full h-auto p-4 flex flex-col items-start gap-2"
                    onClick={action.action}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                      <span className="font-medium">{action.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground text-left">
                      {action.description}
                    </p>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="articles">Articles</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="links">Links</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    {isDemoMode ? (
                      <div className="space-y-4">
                        {recentItems.map((item) => (
                          <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                            <div className="mt-1">
                              {getItemIcon(item.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">{item.title}</h3>
                              {item.url && (
                                <p className="text-sm text-muted-foreground truncate">{item.url}</p>
                              )}
                              {item.content && (
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                              )}
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">{item.savedAt}</span>
                                <div className="flex gap-1">
                                  {item.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="text-xs px-2 py-1 bg-muted rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <Typography.H3 className="mb-2">No content yet</Typography.H3>
                        <Typography.Body className="text-muted-foreground mb-4">
                          Start building your knowledge base by saving your first piece of content.
                        </Typography.Body>
                        <Button onClick={() => navigate('/save')}>
                          <Plus className="h-4 w-4 mr-2" />
                          Save Your First Item
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="articles" className="mt-6">
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <Typography.Body className="text-muted-foreground">
                        {isDemoMode ? "Demo articles would appear here" : "No articles saved yet"}
                      </Typography.Body>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="mt-6">
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <Typography.Body className="text-muted-foreground">
                        {isDemoMode ? "Demo notes would appear here" : "No notes saved yet"}
                      </Typography.Body>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="links" className="mt-6">
                    <div className="text-center py-8">
                      <LinkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <Typography.Body className="text-muted-foreground">
                        {isDemoMode ? "Demo links would appear here" : "No links saved yet"}
                      </Typography.Body>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
