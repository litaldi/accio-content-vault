
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Target,
  BarChart3,
  Calendar,
  Eye,
  Heart,
  Share2,
  Download
} from 'lucide-react';

export const ContentInsights = () => {
  const stats = {
    totalContent: 247,
    weeklyGrowth: 12,
    avgReadingTime: '8 min',
    completionRate: 78,
    topCategories: [
      { name: 'Development', count: 89, growth: 15 },
      { name: 'Design', count: 67, growth: 8 },
      { name: 'Business', count: 45, growth: -3 },
      { name: 'Learning', count: 31, growth: 22 },
      { name: 'Research', count: 15, growth: 5 }
    ],
    recentActivity: [
      { date: '2024-01-15', saves: 8, views: 34 },
      { date: '2024-01-14', saves: 12, views: 45 },
      { date: '2024-01-13', saves: 6, views: 28 },
      { date: '2024-01-12', saves: 15, views: 52 },
      { date: '2024-01-11', saves: 9, views: 31 },
      { date: '2024-01-10', saves: 11, views: 38 },
      { date: '2024-01-09', saves: 7, views: 22 }
    ],
    engagementMetrics: {
      mostViewed: 'React Best Practices Guide',
      mostShared: 'AI Development Trends 2024',
      longestRead: 'Deep Dive into System Architecture',
      quickestSave: 'CSS Grid Cheat Sheet'
    }
  };

  const formatGrowth = (growth: number) => {
    const symbol = growth >= 0 ? '+' : '';
    const color = growth >= 0 ? 'text-green-600' : 'text-red-600';
    return <span className={color}>{symbol}{growth}%</span>;
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Content</p>
                <p className="text-2xl font-bold">{stats.totalContent}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              {formatGrowth(stats.weeklyGrowth)} this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Reading Time</p>
                <p className="text-2xl font-bold">{stats.avgReadingTime}</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Per content piece
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{stats.completionRate}%</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
            <Progress value={stats.completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">34</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              New saves
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Content by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.topCategories.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 text-center text-sm font-medium text-muted-foreground">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24">
                    <Progress value={(category.count / stats.totalContent) * 100} />
                  </div>
                  <Badge variant="outline" className="min-w-[60px] justify-center">
                    {formatGrowth(category.growth)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentActivity.map((day, index) => (
              <div key={day.date} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {day.saves} saves
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {day.views} views
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(day.saves, 5) }).map((_, i) => (
                    <div key={i} className="w-2 h-6 bg-primary/20 rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Top Performing Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Most Viewed</span>
                </div>
                <p className="font-medium">{stats.engagementMetrics.mostViewed}</p>
                <p className="text-sm text-muted-foreground">342 views this month</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Share2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Most Shared</span>
                </div>
                <p className="font-medium">{stats.engagementMetrics.mostShared}</p>
                <p className="text-sm text-muted-foreground">23 shares this month</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Longest Read</span>
                </div>
                <p className="font-medium">{stats.engagementMetrics.longestRead}</p>
                <p className="text-sm text-muted-foreground">Avg 15 min read time</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Quickest Save</span>
                </div>
                <p className="font-medium">{stats.engagementMetrics.quickestSave}</p>
                <p className="text-sm text-muted-foreground">Saved 89 times</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
