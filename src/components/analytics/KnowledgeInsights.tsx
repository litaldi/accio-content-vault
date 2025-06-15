
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/ui/design-system';
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
  Cell,
  LineChart,
  Line
} from 'recharts';
import {
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  Star,
  Calendar,
  Brain,
  Zap
} from 'lucide-react';

const KnowledgeInsights: React.FC = () => {
  // Mock data for demonstration
  const weeklyActivity = [
    { day: 'Mon', saves: 12, reads: 8 },
    { day: 'Tue', saves: 19, reads: 15 },
    { day: 'Wed', saves: 8, reads: 12 },
    { day: 'Thu', saves: 15, reads: 18 },
    { day: 'Fri', saves: 22, reads: 14 },
    { day: 'Sat', saves: 7, reads: 20 },
    { day: 'Sun', saves: 5, reads: 16 }
  ];

  const contentTypes = [
    { name: 'Articles', value: 45, color: '#8884d8' },
    { name: 'Videos', value: 25, color: '#82ca9d' },
    { name: 'Notes', value: 20, color: '#ffc658' },
    { name: 'Documents', value: 10, color: '#ff7300' }
  ];

  const topTags = [
    { name: 'React', count: 34, trend: '+12%' },
    { name: 'AI/ML', count: 28, trend: '+8%' },
    { name: 'Design', count: 22, trend: '+15%' },
    { name: 'Productivity', count: 18, trend: '+5%' },
    { name: 'JavaScript', count: 16, trend: '+3%' }
  ];

  const achievements = [
    { 
      title: 'Knowledge Seeker', 
      description: 'Saved 100 items', 
      progress: 100,
      icon: BookOpen,
      color: 'text-blue-500'
    },
    { 
      title: 'Consistent Learner', 
      description: '7-day learning streak', 
      progress: 85,
      icon: Calendar,
      color: 'text-green-500'
    },
    { 
      title: 'Deep Diver', 
      description: 'Read 50 long articles', 
      progress: 60,
      icon: Brain,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Typography.H2>Knowledge Insights</Typography.H2>
        <Typography.Body className="text-muted-foreground">
          Track your learning progress and discover patterns in your knowledge journey
        </Typography.Body>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">347</p>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% this week
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reading Time</p>
                <p className="text-2xl font-bold">24h</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Learning Streak</p>
                <p className="text-2xl font-bold">7 days</p>
                <p className="text-xs text-orange-500 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Keep it up!
                </p>
              </div>
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Quality</p>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-xs text-muted-foreground">Content rating</p>
              </div>
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="saves" fill="#8884d8" name="Saves" />
                <Bar dataKey="reads" fill="#82ca9d" name="Reads" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Content Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Content Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTags.map((tag, index) => (
                <div key={tag.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{tag.name}</p>
                      <p className="text-sm text-muted-foreground">{tag.count} items</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {tag.trend}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {achievements.map((achievement) => (
                <div key={achievement.title} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                    <div className="flex-1">
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <span className="text-sm font-medium">{achievement.progress}%</span>
                  </div>
                  <Progress value={achievement.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeInsights;
