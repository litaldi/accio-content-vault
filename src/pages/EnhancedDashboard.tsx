
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useEnhancedDemoData } from '@/hooks/useEnhancedDemoData';
import EnhancedDemoBanner from '@/components/demo/EnhancedDemoBanner';
import ImprovedUnifiedLayout from '@/components/layout/ImprovedUnifiedLayout';
import { cn } from '@/lib/utils';
import { 
  BookmarkPlus, 
  Search, 
  Settings, 
  BarChart3,
  FileText,
  Tags,
  TrendingUp,
  Clock,
  Star,
  ExternalLink,
  Flame,
  Target,
  Calendar,
  Activity
} from 'lucide-react';

const EnhancedDashboard = () => {
  const { user } = useAuth();
  const { savedItems, collections, analytics, isLoading, isDemoUser } = useEnhancedDemoData();

  const quickActions = [
    {
      title: 'Save Content',
      description: 'Add new articles, links, or documents',
      icon: BookmarkPlus,
      href: '/save',
      color: 'bg-blue-500',
      shortcut: 'Ctrl+S'
    },
    {
      title: 'Search Library',
      description: 'Find your saved content instantly',
      icon: Search,
      href: '/search',
      color: 'bg-green-500',
      shortcut: 'Ctrl+K'
    },
    {
      title: 'Analytics',
      description: 'View your reading insights',
      icon: BarChart3,
      href: '/analytics',
      color: 'bg-purple-500',
      shortcut: 'Ctrl+A'
    },
    {
      title: 'Settings',
      description: 'Customize your experience',
      icon: Settings,
      href: '/settings',
      color: 'bg-orange-500',
      shortcut: 'Ctrl+,'
    }
  ];

  const stats = [
    { 
      label: 'Total Items', 
      value: analytics?.totalItems.toString() || '0', 
      icon: FileText,
      trend: '+5 this week',
      color: 'text-blue-600'
    },
    { 
      label: 'Collections', 
      value: collections.length.toString(), 
      icon: Tags,
      trend: `${collections.filter(c => !c.isPrivate).length} public`,
      color: 'text-green-600'
    },
    { 
      label: 'Reading Streak', 
      value: `${analytics?.readingStreak || 0} days`, 
      icon: Flame,
      trend: 'Keep it up!',
      color: 'text-orange-600'
    },
    { 
      label: 'Reading Time', 
      value: analytics?.readingTime || '0h', 
      icon: Clock,
      trend: 'This month',
      color: 'text-purple-600'
    }
  ];

  if (isLoading) {
    return (
      <ImprovedUnifiedLayout>
        <Helmet>
          <title>Dashboard - Accio</title>
          <meta name="description" content="Your personal knowledge dashboard" />
        </Helmet>

        <div className="py-8">
          <div className="space-y-6">
            <div className="h-8 bg-muted/30 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted/30 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </ImprovedUnifiedLayout>
    );
  }

  return (
    <ImprovedUnifiedLayout>
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personal knowledge dashboard with AI-powered insights" />
      </Helmet>

      <div className="py-8 space-y-8">
        <EnhancedDemoBanner />
        
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}! 
            <span className="inline-block ml-2">👋</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Here's what's happening with your knowledge library today.
          </p>
        </div>

        {/* Stats Overview */}
        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="text-2xl font-semibold mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={cn("h-8 w-8", stat.color)} aria-hidden="true" />
                    <Badge variant="secondary" className="text-xs">
                      {stat.trend}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold" aria-label={`${stat.label}: ${stat.value}`}>
                      {stat.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section aria-labelledby="quick-actions-heading">
          <Card>
            <CardHeader>
              <CardTitle id="quick-actions-heading" className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Get started with these common tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    asChild
                    className="h-auto p-6 flex-col items-start text-left hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary group"
                  >
                    <Link to={action.href} aria-describedby={`action-${index}-desc`}>
                      <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{action.title}</h3>
                        <p id={`action-${index}-desc`} className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {action.shortcut}
                        </Badge>
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Content */}
          <section aria-labelledby="recent-content-heading" className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle id="recent-content-heading" className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Content
                </CardTitle>
                <CardDescription>
                  Your latest saved items and reading progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savedItems.length > 0 ? (
                  <div className="space-y-4" role="list" aria-label="Recent saved items">
                    {savedItems.slice(0, 6).map((item) => (
                      <article 
                        key={item.id} 
                        className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent focus-within:bg-accent transition-colors group"
                        role="listitem"
                      >
                        <div className="flex-shrink-0" aria-hidden="true">
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center",
                            item.type === 'article' && "bg-blue-100 dark:bg-blue-900",
                            item.type === 'video' && "bg-red-100 dark:bg-red-900",
                            item.type === 'document' && "bg-green-100 dark:bg-green-900",
                            item.type === 'pdf' && "bg-purple-100 dark:bg-purple-900"
                          )}>
                            <FileText className={cn(
                              "h-6 w-6",
                              item.type === 'article' && "text-blue-600 dark:text-blue-400",
                              item.type === 'video' && "text-red-600 dark:text-red-400",
                              item.type === 'document' && "text-green-600 dark:text-green-400",
                              item.type === 'pdf' && "text-purple-600 dark:text-purple-400"
                            )} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            {item.favorite && (
                              <Star 
                                className="h-4 w-4 text-yellow-500 fill-current ml-2 flex-shrink-0" 
                                aria-label="Favorited"
                              />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge 
                              variant={item.readStatus === 'completed' ? 'default' : 'secondary'} 
                              className="text-xs"
                            >
                              {item.readStatus}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
                            {item.readTime && (
                              <span className="text-xs text-muted-foreground">
                                {item.readTime}
                              </span>
                            )}
                            {item.difficulty && (
                              <Badge variant="outline" className="text-xs">
                                {item.difficulty}
                              </Badge>
                            )}
                          </div>
                        </div>
                        {item.url && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label={`Open ${item.title} in new tab`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No content yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {isDemoUser ? 'Loading your demo content...' : 'Start saving content to see it here'}
                    </p>
                    <Button asChild>
                      <Link to="/save">
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                        Save Your First Item
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Collections Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tags className="h-5 w-5" />
                  Collections
                </CardTitle>
              </CardHeader>
              <CardContent>
                {collections.length > 0 ? (
                  <div className="space-y-3" role="list" aria-label="Your collections">
                    {collections.slice(0, 4).map((collection) => (
                      <div 
                        key={collection.id} 
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                        role="listitem"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className={`w-4 h-4 rounded-full ${collection.color}`}
                            aria-hidden="true"
                          />
                          <div>
                            <span className="font-medium text-sm">{collection.name}</span>
                            {collection.isPrivate && (
                              <Badge variant="outline" className="ml-2 text-xs">Private</Badge>
                            )}
                          </div>
                        </div>
                        <Badge variant="secondary" aria-label={`${collection.itemCount} items`}>
                          {collection.itemCount}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No collections yet
                  </p>
                )}
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/collections">
                    View All Collections
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Quick Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics?.topTags && analytics.topTags.length > 0 ? (
                  <div className="space-y-3" role="list" aria-label="Top tags">
                    {analytics.topTags.slice(0, 5).map((tag, index) => (
                      <div key={index} className="flex items-center justify-between" role="listitem">
                        <span className="text-sm font-medium">{tag.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-2 bg-primary rounded-full transition-all"
                              style={{ width: `${(tag.count / analytics.topTags[0].count) * 100}%` }}
                              aria-hidden="true"
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8 text-right" aria-label={`${tag.count} items`}>
                            {tag.count}
                          </span>
                          <TrendingUp className={cn(
                            "h-3 w-3",
                            tag.trend === 'up' && "text-green-500",
                            tag.trend === 'down' && "text-red-500",
                            tag.trend === 'stable' && "text-gray-500"
                          )} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No analytics data yet
                  </p>
                )}
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Full Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ImprovedUnifiedLayout>
  );
};

export default EnhancedDashboard;
