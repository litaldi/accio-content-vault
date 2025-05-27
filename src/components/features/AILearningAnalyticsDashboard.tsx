
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Target,
  Clock,
  Award,
  Activity,
  Eye,
  Calendar,
  Users
} from 'lucide-react';

interface LearningMetric {
  id: string;
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: string;
  unit: string;
}

interface ActivityData {
  date: string;
  hours: number;
  topics: number;
  retention: number;
}

export const AILearningAnalyticsDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('week');
  
  const [metrics] = useState<LearningMetric[]>([
    {
      id: '1',
      name: 'Learning Velocity',
      value: 85,
      trend: 'up',
      change: '+12%',
      unit: 'score'
    },
    {
      id: '2',
      name: 'Knowledge Retention',
      value: 92,
      trend: 'up',
      change: '+8%',
      unit: '%'
    },
    {
      id: '3',
      name: 'Focus Duration',
      value: 45,
      trend: 'stable',
      change: '0%',
      unit: 'min'
    },
    {
      id: '4',
      name: 'Skill Progression',
      value: 78,
      trend: 'up',
      change: '+15%',
      unit: 'points'
    }
  ]);

  const [weeklyActivity] = useState<ActivityData[]>([
    { date: 'Mon', hours: 2.5, topics: 3, retention: 85 },
    { date: 'Tue', hours: 3.2, topics: 4, retention: 88 },
    { date: 'Wed', hours: 2.8, topics: 2, retention: 92 },
    { date: 'Thu', hours: 4.1, topics: 5, retention: 87 },
    { date: 'Fri', hours: 3.5, topics: 3, retention: 90 },
    { date: 'Sat', hours: 2.2, topics: 2, retention: 85 },
    { date: 'Sun', hours: 1.8, topics: 1, retention: 88 }
  ]);

  const getTrendIcon = (trend: LearningMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      default: return <Activity className="h-3 w-3 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: LearningMetric['trend']) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            AI Learning Analytics Dashboard
            <Badge variant="secondary">Advanced Intelligence</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timeframe Selector */}
          <div className="flex gap-2">
            {['week', 'month', 'quarter'].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(period as any)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{metric.name}</span>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {metric.value}{metric.unit === 'score' ? '' : metric.unit}
                  </div>
                  <div className={`text-xs ${getTrendColor(metric.trend)}`}>
                    {metric.change} from last {timeframe}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Weekly Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Activity This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyActivity.map((day) => (
                  <div key={day.date} className="grid grid-cols-4 gap-4 items-center">
                    <div className="font-medium">{day.date}</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Hours</span>
                        <span>{day.hours}h</span>
                      </div>
                      <Progress value={(day.hours / 5) * 100} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Topics</span>
                        <span>{day.topics}</span>
                      </div>
                      <Progress value={(day.topics / 5) * 100} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Retention</span>
                        <span>{day.retention}%</span>
                      </div>
                      <Progress value={day.retention} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">AI Performance Insights</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Your peak learning hours are 9-11 AM</li>
                  <li>• Best retention with 25-minute focused sessions</li>
                  <li>• Visual content improves comprehension by 23%</li>
                  <li>• Thursday shows highest productivity patterns</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Goal Progress</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weekly Learning Goal</span>
                      <span>18/20 hours</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Monthly Skills Target</span>
                      <span>7/10 skills</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
