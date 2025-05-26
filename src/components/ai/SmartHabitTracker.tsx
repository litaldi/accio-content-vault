
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Target,
  TrendingUp,
  Brain,
  Clock,
  Award,
  Flame,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LearningHabit {
  id: string;
  name: string;
  currentStreak: number;
  longestStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  trend: 'up' | 'down' | 'stable';
  aiSuggestion: string;
}

interface SmartHabitTrackerProps {
  className?: string;
}

export const SmartHabitTracker: React.FC<SmartHabitTrackerProps> = ({ className }) => {
  const [habits, setHabits] = useState<LearningHabit[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    analyzeHabits();
  }, []);

  const analyzeHabits = async () => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const mockHabits: LearningHabit[] = [
        {
          id: '1',
          name: 'Daily Reading',
          currentStreak: 12,
          longestStreak: 25,
          weeklyGoal: 7,
          weeklyProgress: 5,
          trend: 'up',
          aiSuggestion: 'Great consistency! Try adding 10 more minutes per session.'
        },
        {
          id: '2',
          name: 'Code Practice',
          currentStreak: 3,
          longestStreak: 15,
          weeklyGoal: 5,
          weeklyProgress: 3,
          trend: 'stable',
          aiSuggestion: 'Consider practicing at the same time daily for better habit formation.'
        },
        {
          id: '3',
          name: 'Note Taking',
          currentStreak: 0,
          longestStreak: 8,
          weeklyGoal: 4,
          weeklyProgress: 1,
          trend: 'down',
          aiSuggestion: 'Try the 2-minute rule: just write one quick note to restart.'
        },
        {
          id: '4',
          name: 'Knowledge Review',
          currentStreak: 7,
          longestStreak: 20,
          weeklyGoal: 6,
          weeklyProgress: 4,
          trend: 'up',
          aiSuggestion: 'Excellent progress! Consider spaced repetition for better retention.'
        }
      ];

      setHabits(mockHabits);
      
      // Calculate overall score
      const totalProgress = mockHabits.reduce((sum, habit) => 
        sum + (habit.weeklyProgress / habit.weeklyGoal), 0);
      const score = Math.round((totalProgress / mockHabits.length) * 100);
      setOverallScore(score);
      
      toast({
        title: "Habit Analysis Complete!",
        description: "AI has analyzed your learning patterns and streaks.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <BarChart3 className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'down': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isAnalyzing) {
    return (
      <div className={className}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm text-muted-foreground">Analyzing your learning habits...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Smart Habit Tracker
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Score */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Learning Habit Score</span>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}/100
            </div>
            <Progress value={overallScore} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Based on consistency, streaks, and goal achievement
            </p>
          </div>

          {/* Habits Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Your Learning Habits</h3>
              <Button variant="outline" size="sm" onClick={analyzeHabits}>
                <Brain className="h-4 w-4 mr-1" />
                Re-analyze
              </Button>
            </div>
            
            <div className="space-y-3">
              {habits.map((habit) => (
                <Card key={habit.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{habit.name}</h4>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(habit.trend)}
                          <Badge className={getTrendColor(habit.trend)}>
                            {habit.trend}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span>Current: {habit.currentStreak} days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span>Best: {habit.longestStreak} days</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Weekly Progress</span>
                          <span>{habit.weeklyProgress}/{habit.weeklyGoal}</span>
                        </div>
                        <Progress 
                          value={(habit.weeklyProgress / habit.weeklyGoal) * 100} 
                          className="h-2" 
                        />
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded text-xs">
                        <span className="font-medium">💡 AI Tip: </span>
                        {habit.aiSuggestion}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              This Week's Insights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-lg text-green-600">
                  {habits.filter(h => h.trend === 'up').length}
                </div>
                <div className="text-muted-foreground">Improving</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-yellow-600">
                  {habits.filter(h => h.trend === 'stable').length}
                </div>
                <div className="text-muted-foreground">Stable</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-red-600">
                  {habits.filter(h => h.trend === 'down').length}
                </div>
                <div className="text-muted-foreground">Need Attention</div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🎯 Habit Building Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Start small: 2-minute habits are easier to maintain</li>
              <li>• Stack habits: attach new ones to existing routines</li>
              <li>• Track daily: consistency beats intensity</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
