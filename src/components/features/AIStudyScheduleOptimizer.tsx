
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Brain, 
  Clock, 
  Target,
  TrendingUp,
  Zap,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface StudySession {
  id: string;
  subject: string;
  timeSlot: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  energyLevel: 'high' | 'medium' | 'low';
  priority: number;
  type: 'learning' | 'practice' | 'review';
}

interface OptimizationInsight {
  type: 'energy' | 'timing' | 'difficulty' | 'retention';
  message: string;
  impact: 'high' | 'medium' | 'low';
}

export const AIStudyScheduleOptimizer: React.FC = () => {
  const [schedule] = useState<StudySession[]>([
    {
      id: '1',
      subject: 'Machine Learning Fundamentals',
      timeSlot: '09:00 - 10:30',
      duration: 90,
      difficulty: 'hard',
      energyLevel: 'high',
      priority: 1,
      type: 'learning'
    },
    {
      id: '2',
      subject: 'React Practice Project',
      timeSlot: '11:00 - 12:00',
      duration: 60,
      difficulty: 'medium',
      energyLevel: 'high',
      priority: 2,
      type: 'practice'
    },
    {
      id: '3',
      subject: 'Review Previous Notes',
      timeSlot: '14:00 - 14:30',
      duration: 30,
      difficulty: 'easy',
      energyLevel: 'medium',
      priority: 3,
      type: 'review'
    }
  ]);

  const [optimizationInsights] = useState<OptimizationInsight[]>([
    {
      type: 'energy',
      message: 'Schedule demanding topics during your peak energy hours (9-11 AM)',
      impact: 'high'
    },
    {
      type: 'timing',
      message: 'Add 15-minute breaks between sessions for better retention',
      impact: 'medium'
    },
    {
      type: 'difficulty',
      message: 'Balance hard and easy topics throughout the day',
      impact: 'medium'
    },
    {
      type: 'retention',
      message: 'Review sessions scheduled 24 hours after initial learning',
      impact: 'high'
    }
  ]);

  const [stats] = useState({
    optimizationScore: 87,
    productivityGain: '+23%',
    retentionImprovement: '+31%',
    burnoutRisk: 'Low'
  });

  const getDifficultyColor = (difficulty: StudySession['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
    }
  };

  const getTypeIcon = (type: StudySession['type']) => {
    switch (type) {
      case 'learning': return BookOpen;
      case 'practice': return Target;
      case 'review': return CheckCircle2;
    }
  };

  const getInsightIcon = (type: OptimizationInsight['type']) => {
    switch (type) {
      case 'energy': return Zap;
      case 'timing': return Clock;
      case 'difficulty': return Target;
      case 'retention': return Brain;
    }
  };

  const getImpactColor = (impact: OptimizationInsight['impact']) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            AI Study Schedule Optimizer
            <Badge variant="secondary">Smart Planning</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Optimization Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">AI Score</span>
                </div>
                <div className="text-2xl font-bold">{stats.optimizationScore}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Productivity</span>
                </div>
                <div className="text-2xl font-bold">{stats.productivityGain}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">Retention</span>
                </div>
                <div className="text-2xl font-bold">{stats.retentionImprovement}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Burnout Risk</span>
                </div>
                <div className="text-2xl font-bold">{stats.burnoutRisk}</div>
              </CardContent>
            </Card>
          </div>

          {/* Optimized Schedule */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Today's Optimized Schedule</h3>
              <Button size="sm">
                <Calendar className="h-3 w-3 mr-1" />
                Regenerate
              </Button>
            </div>
            
            {schedule.map((session) => {
              const TypeIcon = getTypeIcon(session.type);
              return (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <TypeIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{session.subject}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {session.timeSlot} ({session.duration} min)
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Priority {session.priority}
                        </Badge>
                        <Badge className={`text-xs ${getDifficultyColor(session.difficulty)}`}>
                          {session.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {session.energyLevel} energy
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Optimization Insights */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-4 w-4 text-primary" />
                <h4 className="font-medium">AI Optimization Insights</h4>
              </div>
              <div className="space-y-3">
                {optimizationInsights.map((insight, index) => {
                  const InsightIcon = getInsightIcon(insight.type);
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <InsightIcon className="h-4 w-4 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">{insight.message}</p>
                        <span className={`text-xs font-medium ${getImpactColor(insight.impact)}`}>
                          {insight.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Apply Schedule
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Customize
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
