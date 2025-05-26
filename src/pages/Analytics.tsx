
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Eye, BookmarkPlus, Calendar, Target } from 'lucide-react';

const Analytics = () => {
  const stats = [
    { label: 'Total Items Saved', value: '156', change: '+12%', icon: BookmarkPlus },
    { label: 'Items Viewed', value: '89', change: '+8%', icon: Eye },
    { label: 'Collections Created', value: '12', change: '+3%', icon: BarChart3 },
    { label: 'Knowledge Score', value: '847', change: '+15%', icon: Target }
  ];

  const recentActivity = [
    { action: 'Saved article', title: 'React Performance Tips', time: '2 hours ago' },
    { action: 'Created collection', title: 'Frontend Development', time: '1 day ago' },
    { action: 'Viewed content', title: 'TypeScript Best Practices', time: '2 days ago' },
    { action: 'Added tags', title: 'AI in Web Development', time: '3 days ago' }
  ];

  return (
    <>
      <Helmet>
        <title>Analytics - Accio Knowledge Management</title>
        <meta name="description" content="Track your knowledge growth and usage patterns with detailed analytics and insights." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analytics</h1>
            <p className="text-muted-foreground">
              Track your knowledge growth and discover usage patterns
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change} from last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Knowledge Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Knowledge Growth
                </CardTitle>
                <CardDescription>
                  Your content saved and viewed over the past 30 days
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-center justify-center bg-muted/30 rounded-lg border border-dashed">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">
                      Chart visualization would appear here
                    </p>
                    <Badge variant="outline">
                      Knowledge growing steadily
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest interactions with your knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {item.action.includes('Saved') && <BookmarkPlus className="h-4 w-4 text-primary" />}
                        {item.action.includes('Created') && <BarChart3 className="h-4 w-4 text-primary" />}
                        {item.action.includes('Viewed') && <Eye className="h-4 w-4 text-primary" />}
                        {item.action.includes('Added') && <Target className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item.action}</div>
                        <div className="text-base">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
