
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  TrendingUp,
  Target,
  CheckCircle,
  BarChart3,
  Flame,
  Award,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LearningHabit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  currentStreak: number;
  bestStreak: number;
  completionRate: number;
  category: string;
  isActive: boolean;
}

interface HabitInsight {
  type: 'streak' | 'improvement' | 'recommendation';
  title: string;
  description: string;
  actionable: string;
}

interface SmartHabitTrackerProps {
  className?: string;
}

export const SmartHabitTracker: React.FC<SmartHabitTrackerProps> = ({ className }) => {
  const [habits, setHabits] = useState<LearningHabit[]>([]);
  const [insights, setInsights] = useState<HabitInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadHabitsAndInsights();
  }, []);

  const loadHabitsAndInsights = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockHabits: LearningHabit[] = [
        {
          id: '1',
          name: 'Daily Coding Practice',
          description: 'Spend at least 30 minutes coding or learning programming concepts',
          frequency: 'daily',
          currentStreak: 12,
          bestStreak: 25,
          completionRate: 85,
          category: 'Programming',
          isActive: true
        },
        {
          id: '2',
          name: 'Read Tech Articles',
          description: 'Read and save at least 2 technical articles or tutorials',
          frequency: 'daily',
          currentStreak: 7,
          bestStreak: 15,
          completionRate: 78,
          category: 'Learning',
          isActive: true
        },
        {
          id: '3',
          name: 'UI Design Study',
          description: 'Study UI/UX design patterns and best practices',
          frequency: 'weekly',
          currentStreak: 3,
          bestStreak: 8,
          completionRate: 92,
          category: 'Design',
          isActive: true
        },
        {
          id: '4',
          name: 'Knowledge Review',
          description: 'Review and organize saved content and notes',
          frequency: 'weekly',
          currentStreak: 0,
          bestStreak: 4,
          completionRate: 45,
          category: 'Organization',
          isActive: false
        }
      ];

      const mockInsights: HabitInsight[] = [
        {
          type: 'streak',
          title: 'Amazing Coding Streak! 🔥',
          description: 'You\'re on a 12-day coding streak, just 13 days away from your personal best!',
          actionable: 'Keep the momentum going - schedule your next coding session.'
        },
        {
          type: 'improvement',
          title: 'Knowledge Review Needs Attention',
          description: 'Your content review habit has a low completion rate (45%). Regular review improves retention.',
          actionable: 'Try setting a weekly reminder or reducing the time commitment.'
        },
        {
          type: 'recommendation',
          title: 'Perfect Time for a New Habit',
          description: 'Based on your consistent learning pattern, you could add a "Daily Reflection" habit.',
          actionable: 'Consider spending 5 minutes daily reflecting on what you learned.'
        }
      ];

      setHabits(mockHabits);
      setInsights(mockInsights);
    } finally {
      setIsLoading(false);
    }
  };

  const markHabitComplete = (habitId: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { ...habit, currentStreak: habit.currentStreak + 1 }
        : habit
    ));
    
    toast({
      title: "Habit Completed! 🎉",
      description: "Great job maintaining your learning routine!",
    });
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'weekly': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'monthly': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'streak': return <Flame className="h-4 w-4 text-orange-600" />;
      case 'improvement': return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'recommendation': return <Target className="h-4 w-4 text-green-600" />;
      default: return <BarChart3 className="h-4 w-4 text-purple-600" />;
    }
  };

  if (isLoading) {
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
          {/* Active Habits */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Active Learning Habits</h3>
              <Button size="sm" variant="outline" className="gap-1">
                <Plus className="h-3 w-3" />
                Add Habit
              </Button>
            </div>
            
            {habits.filter(habit => habit.isActive).map((habit) => (
              <Card key={habit.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{habit.name}</h4>
                        <p className="text-sm text-muted-foreground">{habit.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getFrequencyColor(habit.frequency)}>
                          {habit.frequency}
                        </Badge>
                        <Badge variant="outline">{habit.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current Streak</span>
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="font-bold text-lg">{habit.currentStreak}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Best Streak</span>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{habit.bestStreak}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Success Rate</span>
                        <div className="font-medium">{habit.completionRate}%</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Completion Rate</span>
                        <span>{habit.completionRate}%</span>
                      </div>
                      <Progress value={habit.completionRate} className="h-2" />
                    </div>
                    
                    <Button
                      onClick={() => markHabitComplete(habit.id)}
                      className="w-full gap-2"
                      size="sm"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Mark Complete Today
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Insights */}
          <div className="space-y-3">
            <h4 className="font-medium">AI Insights & Recommendations</h4>
            {insights.map((insight, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-start gap-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{insight.title}</h5>
                    <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                    <p className="text-xs font-medium text-primary">{insight.actionable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Habit Performance Overview */}
          <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Weekly Performance</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-xs text-muted-foreground">Habits Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-xs text-muted-foreground">Current Best Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">78%</div>
                <div className="text-xs text-muted-foreground">Overall Success</div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🌱 Habit Building Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Start small - consistency beats intensity</li>
              <li>• AI tracks patterns to suggest optimal habit scheduling</li>
              <li>• Review and adjust habits based on your success rates</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
