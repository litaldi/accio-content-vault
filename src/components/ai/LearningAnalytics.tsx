
import React, { useState, useEffect } from 'react';
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
  BookOpen,
  Zap,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LearningMetric {
  label: string;
  value: number;
  change: number;
  unit: string;
  icon: React.ElementType;
}

interface SkillProgress {
  skill: string;
  level: number;
  progress: number;
  recentActivity: number;
}

interface LearningAnalyticsProps {
  className?: string;
}

export const LearningAnalytics: React.FC<LearningAnalyticsProps> = ({ className }) => {
  const [metrics, setMetrics] = useState<LearningMetric[]>([]);
  const [skills, setSkills] = useState<SkillProgress[]>([]);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('week');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    generateAnalytics();
  }, [timeframe]);

  const generateAnalytics = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockMetrics: LearningMetric[] = [
        {
          label: 'Content Saved',
          value: 47,
          change: 23,
          unit: 'items',
          icon: BookOpen
        },
        {
          label: 'Learning Streak',
          value: 12,
          change: 3,
          unit: 'days',
          icon: Calendar
        },
        {
          label: 'Focus Time',
          value: 18.5,
          change: 8.2,
          unit: 'hours',
          icon: Clock
        },
        {
          label: 'Skills Improved',
          value: 4,
          change: 1,
          unit: 'areas',
          icon: Award
        }
      ];

      const mockSkills: SkillProgress[] = [
        {
          skill: 'React Development',
          level: 3,
          progress: 75,
          recentActivity: 8
        },
        {
          skill: 'TypeScript',
          level: 2,
          progress: 45,
          recentActivity: 12
        },
        {
          skill: 'UI/UX Design',
          level: 2,
          progress: 30,
          recentActivity: 5
        },
        {
          skill: 'Node.js',
          level: 1,
          progress: 60,
          recentActivity: 3
        }
      ];

      setMetrics(mockMetrics);
      setSkills(mockSkills);
      
      toast({
        title: "Analytics Updated",
        description: `Learning analytics refreshed for the past ${timeframe}.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSkillLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 2: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 3: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return 'Expert';
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Learning Analytics
            <Badge variant="secondary">AI-Powered Insights</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timeframe Selection */}
          <div className="flex gap-2">
            {[
              { key: 'week', label: 'This Week' },
              { key: 'month', label: 'This Month' },
              { key: 'quarter', label: 'This Quarter' }
            ].map((period) => (
              <Button
                key={period.key}
                variant={timeframe === period.key ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(period.key as any)}
                disabled={isLoading}
              >
                {period.label}
              </Button>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <metric.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{metric.value}</span>
                        <span className="text-xs text-muted-foreground">{metric.unit}</span>
                        <div className={`flex items-center text-xs ${
                          metric.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change > 0 ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )}
                          {Math.abs(metric.change)}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skills Progress */}
          <div className="space-y-4">
            <h3 className="font-medium">Skill Development</h3>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{skill.skill}</span>
                      <Badge className={getSkillLevelColor(skill.level)} variant="outline">
                        {getSkillLevelText(skill.level)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      {skill.recentActivity} recent items
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Progress value={skill.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{skill.progress}% to next level</span>
                      <span>Level {skill.level}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Insights */}
          <div className="space-y-3">
            <h4 className="font-medium">AI Insights</h4>
            <div className="grid gap-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-2">
                  <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium">Peak Learning Time</h5>
                    <p className="text-xs text-muted-foreground">
                      You're most productive between 9-11 AM. Consider scheduling important learning sessions during this time.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium">Skill Focus Recommendation</h5>
                    <p className="text-xs text-muted-foreground">
                      Based on your progress, focusing on TypeScript could accelerate your React development skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Zap className="h-3 w-3" />
              Set Learning Goal
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-3 w-3" />
              Schedule Study Time
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
