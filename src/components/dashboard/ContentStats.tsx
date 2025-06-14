
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Tags, 
  TrendingUp, 
  Clock,
  Target,
  Zap
} from 'lucide-react';

export const ContentStats: React.FC = () => {
  // Mock data - in real app, this would come from API
  const stats = {
    totalContent: 247,
    totalTags: 89,
    thisWeek: 23,
    avgPerDay: 3.2,
    topTags: [
      { name: 'React', count: 45 },
      { name: 'JavaScript', count: 38 },
      { name: 'Design', count: 29 },
      { name: 'AI', count: 22 },
    ],
    weeklyProgress: 75,
    learningStreak: 12,
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Total Content</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalContent}</div>
            <div className="text-sm text-muted-foreground">Knowledge items</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Tags className="h-4 w-4 text-green-500" />
              <span className="font-medium">Tags</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalTags}</div>
            <div className="text-sm text-muted-foreground">Organized topics</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span className="font-medium">This Week</span>
            </div>
            <div className="text-2xl font-bold">{stats.thisWeek}</div>
            <div className="text-sm text-muted-foreground">New additions</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Learning Streak</span>
            </div>
            <div className="text-2xl font-bold">{stats.learningStreak}</div>
            <div className="text-sm text-muted-foreground">Days active</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Weekly Goal Progress</span>
                <span>{stats.weeklyProgress}%</span>
              </div>
              <Progress value={stats.weeklyProgress} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                Target: 30 items per week
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <h4 className="font-medium mb-3">Top Tags This Week</h4>
                <div className="space-y-2">
                  {stats.topTags.map((tag, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Badge variant="outline">{tag.name}</Badge>
                      <span className="text-sm text-muted-foreground">{tag.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Activity Insights</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>Avg {stats.avgPerDay} items per day</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3" />
                    <span>+15% vs last week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3" />
                    <span>Most active on weekdays</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
