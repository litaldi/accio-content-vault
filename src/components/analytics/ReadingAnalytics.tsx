
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Clock, Target, TrendingUp } from 'lucide-react';

const ReadingAnalytics: React.FC = () => {
  // Mock data - in real app, this would come from analytics service
  const weeklyData = [
    { day: 'Mon', articles: 3, time: 45 },
    { day: 'Tue', articles: 5, time: 72 },
    { day: 'Wed', articles: 2, time: 28 },
    { day: 'Thu', articles: 7, time: 95 },
    { day: 'Fri', articles: 4, time: 55 },
    { day: 'Sat', articles: 6, time: 80 },
    { day: 'Sun', articles: 3, time: 40 }
  ];

  const stats = {
    articlesThisWeek: 30,
    readingTimeThisWeek: 415, // minutes
    averageArticleTime: 14, // minutes
    completionRate: 78,
    goalProgress: 65
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Reading Stats */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Articles Read</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.articlesThisWeek}</div>
          <p className="text-xs text-muted-foreground">
            +12% from last week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reading Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.floor(stats.readingTimeThisWeek / 60)}h {stats.readingTimeThisWeek % 60}m
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.averageArticleTime}m avg per article
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completionRate}%</div>
          <Progress value={stats.completionRate} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.goalProgress}%</div>
          <Progress value={stats.goalProgress} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            15 more articles to reach goal
          </p>
        </CardContent>
      </Card>

      {/* Weekly Chart */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Weekly Reading Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="articles" fill="#8884d8" name="Articles" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingAnalytics;
