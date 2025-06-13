
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Target, 
  Calendar,
  BarChart3,
  PieChart,
  Trophy
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Cell } from 'recharts';

const ReadingAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data
  const weeklyReadingData = [
    { day: 'Mon', minutes: 45, articles: 3 },
    { day: 'Tue', minutes: 62, articles: 4 },
    { day: 'Wed', minutes: 38, articles: 2 },
    { day: 'Thu', minutes: 75, articles: 5 },
    { day: 'Fri', minutes: 52, articles: 3 },
    { day: 'Sat', minutes: 28, articles: 2 },
    { day: 'Sun', minutes: 41, articles: 3 }
  ];

  const topicDistribution = [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Design', value: 25, color: '#10b981' },
    { name: 'Business', value: 20, color: '#f59e0b' },
    { name: 'Science', value: 12, color: '#ef4444' },
    { name: 'Other', value: 8, color: '#8b5cf6' }
  ];

  const achievements = [
    { title: 'Reading Streak', value: '7 days', icon: Target, color: 'text-orange-500' },
    { title: 'This Week', value: '341 min', icon: Clock, color: 'text-blue-500' },
    { title: 'Articles Read', value: '22', icon: BookOpen, color: 'text-green-500' },
    { title: 'Knowledge Score', value: '847', icon: Trophy, color: 'text-purple-500' }
  ];

  const readingGoals = [
    { title: 'Daily Reading', current: 45, target: 60, unit: 'minutes' },
    { title: 'Weekly Articles', current: 22, target: 25, unit: 'articles' },
    { title: 'Monthly Learning', current: 12, target: 15, unit: 'hours' }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${achievement.color}`}>
                  <achievement.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{achievement.value}</p>
                  <p className="text-xs text-muted-foreground">{achievement.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Reading Progress Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Reading Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <TabsList>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>
              <TabsContent value="week" className="mt-4">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={weeklyReadingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(label) => `${label}`}
                      formatter={(value, name) => [
                        `${value} ${name === 'minutes' ? 'min' : 'articles'}`,
                        name === 'minutes' ? 'Reading Time' : 'Articles Read'
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="minutes"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Topic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Reading Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={150}>
                <RechartsPieChart>
                  <RechartsPieChart data={topicDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={60}>
                    {topicDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {topicDistribution.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: topic.color }}
                      />
                      <span>{topic.name}</span>
                    </div>
                    <span className="font-medium">{topic.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reading Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Reading Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {readingGoals.map((goal, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{goal.title}</h4>
                  <Badge variant={goal.current >= goal.target ? "default" : "secondary"}>
                    {goal.current}/{goal.target} {goal.unit}
                  </Badge>
                </div>
                <Progress 
                  value={(goal.current / goal.target) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  {goal.current >= goal.target 
                    ? '🎉 Goal achieved!' 
                    : `${goal.target - goal.current} ${goal.unit} to go`
                  }
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingAnalytics;
