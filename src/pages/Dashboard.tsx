
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoData } from '@/hooks/useDemoData';
import DemoBanner from '@/components/demo/DemoBanner';
import { 
  BookmarkPlus, 
  Search, 
  Settings, 
  BarChart3,
  FileText,
  Tags,
  TrendingUp,
  Clock,
  Plus,
  Star,
  ExternalLink
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { savedItems, collections, analytics, isLoading, isDemoUser } = useDemoData();

  const quickActions = [
    {
      title: 'Save Content',
      description: 'Add new articles, links, or documents',
      icon: BookmarkPlus,
      href: '/save',
      color: 'bg-blue-500'
    },
    {
      title: 'Search Library',
      description: 'Find your saved content',
      icon: Search,
      href: '/search',
      color: 'bg-green-500'
    },
    {
      title: 'Settings',
      description: 'Customize your experience',
      icon: Settings,
      href: '/settings',
      color: 'bg-purple-500'
    }
  ];

  const stats = [
    { label: 'Total Items', value: analytics?.totalItems.toString() || '0', icon: FileText },
    { label: 'Collections', value: collections.length.toString(), icon: Tags },
    { label: 'This Week', value: `+${analytics?.itemsThisWeek || 0}`, icon: TrendingUp },
    { label: 'Reading Time', value: analytics?.readingTime || '0h', icon: Clock }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Dashboard - Accio</title>
          <meta name="description" content="Your personal knowledge dashboard" />
        </Helmet>

        <nav className="border-b bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className="text-xl font-bold">Accio</span>
            </Link>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="space-y-6">
            <div className="h-8 bg-muted/30 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-muted/30 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal knowledge dashboard" />
      </Helmet>

      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="text-xl font-bold">Accio</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/settings">Settings</Link>
            </Button>
            <Button asChild>
              <Link to="/save">
                <Plus className="mr-2 h-4 w-4" />
                Save Content
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <main id="main-content" className="container mx-auto px-4 py-8 max-w-7xl" aria-label="Dashboard content">
        <DemoBanner />
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your knowledge library today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with these common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  asChild
                  className="h-auto p-6 flex-col items-start text-left"
                >
                  <Link to={action.href}>
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Content */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedItems.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="flex-shrink-0">
                      {item.type === 'article' && <FileText className="h-5 w-5 text-blue-500" />}
                      {item.type === 'video' && <FileText className="h-5 w-5 text-red-500" />}
                      {item.type === 'document' && <FileText className="h-5 w-5 text-green-500" />}
                      {item.type === 'pdf' && <FileText className="h-5 w-5 text-purple-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium truncate">{item.title}</h3>
                        {item.favorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                        <span className="text-xs text-muted-foreground">{item.readTime}</span>
                      </div>
                    </div>
                    {item.url && (
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                
                {savedItems.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      {isDemoUser ? 'Loading your demo content...' : 'Start saving content to see it here'}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Collections & Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Collections & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Collections */}
                <div>
                  <h3 className="font-medium mb-3">Your Collections</h3>
                  <div className="space-y-2">
                    {collections.slice(0, 3).map((collection) => (
                      <div key={collection.id} className="flex items-center justify-between p-2 rounded border">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${collection.color}`}></div>
                          <span className="font-medium">{collection.name}</span>
                        </div>
                        <Badge variant="outline">{collection.itemCount}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Analytics */}
                <div>
                  <h3 className="font-medium mb-3">Quick Analytics</h3>
                  <div className="space-y-2">
                    {analytics?.topTags.slice(0, 3).map((tag, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{tag.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full"
                              style={{ width: `${(tag.count / analytics.topTags[0].count) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">{tag.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link to="/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Full Analytics
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
