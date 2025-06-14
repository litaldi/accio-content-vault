
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Brain,
  Star
} from 'lucide-react';

interface ReadingStats {
  articlesRead: number;
  totalReadingTime: number;
  averageReadingTime: number;
  readingStreak: number;
  favoriteTopics: string[];
  weeklyGoal: number;
  weeklyProgress: number;
}

interface WeeklyData {
  day: string;
  articles: number;
  minutes: number;
}

interface TopicData {
  name: string;
  value: number;
  color: string;
}

const ReadingAnalytics: React.FC = () => {
  const [stats, setStats] = useState<ReadingStats>({
    articlesRead: 0,
    totalReadingTime: 0,
    averageReadingTime: 0,
    readingStreak: 0,
    favoriteTopics: [],
    weeklyGoal: 10,
    weeklyProgress: 0
  });

  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [topicData, setTopicData] = useState<TopicData[]>([]);

  useEffect(() => {
    // Simulate loading analytics data
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = () => {
    // Mock analytics data
    const mockStats: ReadingStats = {
      articlesRead: 47,
      totalReadingTime: 1260, // minutes
      averageReadingTime: 12,
      readingStreak: 7,
      favoriteTopics: ['React', 'AI/ML', 'Design'],
      weeklyGoal: 10,
      weeklyProgress: 8
    };

    const mockWeeklyData: WeeklyData[] = [
      { day: 'Mon', articles: 2, minutes: 45 },
      { day: 'Tue', articles: 1, minutes: 20 },
      { day: 'Wed', articles: 3, minutes: 60 },
      { day: 'Thu', articles: 0, minutes: 0 },
      { day: 'Fri', articles: 2, minutes: 30 },
      { day: 'Sat', articles: 1, minutes: 15 },
      { day: 'Sun', articles: 2, minutes: 40 }
    ];

    const mockTopicData: TopicData[] = [
      { name: 'React', value: 35, color: '#3b82f6' },
      { name: 'AI/ML', value: 25, color: '#8b5cf6' },
      { name: 'Design', value: 20, color: '#10b981' },
      { name: 'JavaScript', value: 15, color: '#f59e0b' },
      { name: 'Other', value: 5, color: '#6b7280' }
    ];

    setStats(mockStats);
    setWeeklyData(mockWeeklyData);
    setTopicData(mockTopicData);
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Articles Read</p>
                <p className="text-2xl font-bold">{stats.articlesRead}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold">{formatTime(stats.totalReadingTime)}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Time</p>
                <p className="text-2xl font-bold">{stats.averageReadingTime}m</p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-2xl font-bold">{stats.readingStreak}</p>
              </div>
              <Star className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Weekly Reading Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{stats.weeklyProgress} of {stats.weeklyGoal} articles</span>
              <span>{Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}%</span>
            </div>
            <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {stats.weeklyGoal - stats.weeklyProgress} articles to go this week!
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              This Week's Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="articles" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Topic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Reading Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={topicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {topicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {topicData.map((topic) => (
                <Badge key={topic.name} variant="outline" className="text-xs">
                  <div 
                    className="w-2 h-2 rounded-full mr-1" 
                    style={{ backgroundColor: topic.color }}
                  />
                  {topic.name} ({topic.value}%)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReadingAnalytics;
