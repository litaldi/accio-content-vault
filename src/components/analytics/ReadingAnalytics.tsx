
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Award
} from 'lucide-react';

const ReadingAnalytics: React.FC = () => {
  // Mock data - in real app, this would come from your analytics service
  const analytics = {
    totalReadTime: 4.5, // hours
    articlesRead: 23,
    weeklyGoal: 5, // hours
    streak: 7, // days
    topCategories: [
      { name: 'Technology', count: 12, percentage: 52 },
      { name: 'Design', count: 6, percentage: 26 },
      { name: 'Business', count: 5, percentage: 22 }
    ],
    weeklyProgress: [
      { day: 'Mon', minutes: 45 },
      { day: 'Tue', minutes: 30 },
      { day: 'Wed', minutes: 60 },
      { day: 'Thu', minutes: 25 },
      { day: 'Fri', minutes: 40 },
      { day: 'Sat', minutes: 0 },
      { day: 'Sun', minutes: 90 }
    ]
  };

  const weeklyGoalProgress = (analytics.totalReadTime / analytics.weeklyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Reading Time */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reading Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.totalReadTime}h</div>
          <p className="text-xs text-muted-foreground">This week</p>
        </CardContent>
      </Card>

      {/* Articles Read */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Articles Read</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.articlesRead}</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(weeklyGoalProgress)}%</div>
          <Progress value={weeklyGoalProgress} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {analytics.totalReadTime}h / {analytics.weeklyGoal}h
          </p>
        </CardContent>
      </Card>

      {/* Reading Streak */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.streak}</div>
          <p className="text-xs text-muted-foreground">Days in a row</p>
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topCategories.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{category.count} articles</span>
                  <Badge variant="secondary">{category.percentage}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-32">
            {analytics.weeklyProgress.map((day, index) => (
              <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="bg-primary rounded-t w-full transition-all duration-300"
                  style={{
                    height: `${Math.max((day.minutes / 90) * 100, 2)}%`,
                    minHeight: day.minutes > 0 ? '8px' : '2px'
                  }}
                />
                <span className="text-xs text-muted-foreground">{day.day}</span>
                <span className="text-xs font-medium">{day.minutes}m</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingAnalytics;
