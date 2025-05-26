
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Bookmark, 
  Tag, 
  Calendar,
  Clock,
  Target
} from 'lucide-react';

const Analytics = () => {
  const metrics = [
    {
      title: 'Total Saved Items',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: Bookmark,
      color: 'text-blue-600'
    },
    {
      title: 'Monthly Views',
      value: '2.4K',
      change: '+8%',
      trend: 'up',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Collections',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: Tag,
      color: 'text-purple-600'
    },
    {
      title: 'Avg. Daily Usage',
      value: '45min',
      change: '+15%',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const topTags = [
    { name: 'React', count: 32, percentage: 85 },
    { name: 'JavaScript', count: 28, percentage: 75 },
    { name: 'Tutorial', count: 24, percentage: 65 },
    { name: 'Productivity', count: 18, percentage: 48 },
    { name: 'Career', count: 15, percentage: 40 }
  ];

  const monthlyData = [
    { month: 'Jan', saved: 8, viewed: 120 },
    { month: 'Feb', saved: 12, viewed: 180 },
    { month: 'Mar', saved: 15, viewed: 240 },
    { month: 'Apr', saved: 18, viewed: 320 },
    { month: 'May', saved: 22, viewed: 380 }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Analytics - Accio | Your Usage Insights</title>
        <meta name="description" content="View your Accio usage analytics and insights." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Insights into your knowledge management patterns
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'}>
                    {metric.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Most Used Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTags.map((tag, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{tag.name}</span>
                      <span className="text-muted-foreground">{tag.count} items</span>
                    </div>
                    <Progress value={tag.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Usage Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Monthly Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Save 25 items</span>
                    <span className="text-muted-foreground">22/25</span>
                  </div>
                  <Progress value={88} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">3 more to reach your goal!</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Create 5 collections</span>
                    <span className="text-muted-foreground">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">2 more collections needed</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Daily usage streak</span>
                    <span className="text-muted-foreground">7 days</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-green-600 mt-1">Great job! Keep it up!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Activity Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-4 text-center">
                {monthlyData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-sm font-medium">{data.month}</div>
                    <div className="space-y-1">
                      <div 
                        className="bg-primary rounded w-full mx-auto" 
                        style={{ height: `${(data.saved / 25) * 60}px` }}
                      ></div>
                      <div className="text-xs text-muted-foreground">{data.saved} saved</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span>Items Saved</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default Analytics;
