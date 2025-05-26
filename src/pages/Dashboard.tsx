
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoData } from '@/hooks/useDemoData';
import DemoBanner from '@/components/demo/DemoBanner';
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
                <div key={i} className="h-24 bg-muted/30 rounded animate-pulse" />
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
        <meta name="description" content="Your personal knowledge dashboard" />
      </Helmet>

      <div className="py-8">
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
        <section aria-labelledby="stats-heading" className="mb-8">
          <h2 id="stats-heading" className="sr-only">Dashboard Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold" aria-label={`${stat.label}: ${stat.value}`}>
                        {stat.value}
                      </p>
                    </div>
                    <stat.icon className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section aria-labelledby="quick-actions-heading" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle id="quick-actions-heading">Quick Actions</CardTitle>
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
                    className="h-auto p-6 flex-col items-start text-left hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Link to={action.href} aria-describedby={`action-${index}-desc`}>
                      <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                        <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{action.title}</h3>
                        <p id={`action-${index}-desc`} className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Content */}
          <section aria-labelledby="recent-content-heading">
            <Card>
              <CardHeader>
                <CardTitle id="recent-content-heading">Recent Content</CardTitle>
              </CardHeader>
              <CardContent>
                {savedItems.length > 0 ? (
                  <div className="space-y-4" role="list" aria-label="Recent saved items">
                    {savedItems.slice(0, 5).map((item) => (
                      <article 
                        key={item.id} 
                        className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent focus-within:bg-accent transition-colors"
                        role="listitem"
                      >
                        <div className="flex-shrink-0" aria-hidden="true">
                          <FileText className={cn(
                            "h-5 w-5",
                            item.type === 'article' && "text-blue-500",
                            item.type === 'video' && "text-red-500",
                            item.type === 'document' && "text-green-500",
                            item.type === 'pdf' && "text-purple-500"
                          )} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate">{item.title}</h3>
                            {item.favorite && (
                              <Star 
                                className="h-4 w-4 text-yellow-500 fill-current" 
                                aria-label="Favorited"
                              />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {item.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {item.readTime}
                            </span>
                          </div>
                        </div>
                        {item.url && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            aria-label={`Open ${item.title} in new tab`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      {isDemoUser ? 'Loading your demo content...' : 'Start saving content to see it here'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Collections & Analytics */}
          <section aria-labelledby="collections-analytics-heading">
            <Card>
              <CardHeader>
                <CardTitle id="collections-analytics-heading">Collections & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Collections */}
                  <div>
                    <h3 className="font-medium mb-3">Your Collections</h3>
                    {collections.length > 0 ? (
                      <div className="space-y-2" role="list" aria-label="Your collections">
                        {collections.slice(0, 3).map((collection) => (
                          <div 
                            key={collection.id} 
                            className="flex items-center justify-between p-2 rounded border hover:bg-accent transition-colors"
                            role="listitem"
                          >
                            <div className="flex items-center gap-2">
                              <div 
                                className={`w-3 h-3 rounded-full ${collection.color}`}
                                aria-hidden="true"
                              />
                              <span className="font-medium">{collection.name}</span>
                            </div>
                            <Badge variant="outline" aria-label={`${collection.itemCount} items`}>
                              {collection.itemCount}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No collections yet</p>
                    )}
                  </div>

                  {/* Quick Analytics */}
                  <div>
                    <h3 className="font-medium mb-3">Quick Analytics</h3>
                    {analytics?.topTags && analytics.topTags.length > 0 ? (
                      <div className="space-y-2" role="list" aria-label="Top tags">
                        {analytics.topTags.slice(0, 3).map((tag, index) => (
                          <div key={index} className="flex items-center justify-between" role="listitem">
                            <span className="text-sm">{tag.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-2 bg-primary rounded-full transition-all"
                                  style={{ width: `${(tag.count / analytics.topTags[0].count) * 100}%` }}
                                  aria-hidden="true"
                                />
                              </div>
                              <span className="text-sm text-muted-foreground" aria-label={`${tag.count} items`}>
                                {tag.count}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No analytics data yet</p>
                    )}
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
          </section>
        </div>
      </div>
    </ImprovedUnifiedLayout>
  );
};

export default Dashboard;
