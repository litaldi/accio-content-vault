
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Calendar, 
  TrendingUp, 
  CheckCircle2,
  Plus,
  Zap,
  Brain,
  Clock,
  Star
} from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  category: 'learning' | 'productivity' | 'health' | 'skill';
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
  weeklyProgress: number[];
  aiRecommendation?: string;
}

export const AIHabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Read for 30 minutes',
      category: 'learning',
      currentStreak: 7,
      longestStreak: 14,
      completedToday: true,
      weeklyProgress: [1, 1, 1, 1, 1, 0, 1],
      aiRecommendation: 'Consider reading technical articles to enhance your skills'
    },
    {
      id: '2',
      name: 'Practice coding',
      category: 'skill',
      currentStreak: 3,
      longestStreak: 10,
      completedToday: false,
      weeklyProgress: [1, 0, 1, 1, 1, 0, 0],
      aiRecommendation: 'Try coding challenges to maintain consistency'
    },
    {
      id: '3',
      name: 'Review notes',
      category: 'learning',
      currentStreak: 5,
      longestStreak: 8,
      completedToday: true,
      weeklyProgress: [1, 1, 1, 0, 1, 1, 1],
      aiRecommendation: 'Space out review sessions for better retention'
    }
  ]);

  const [newHabit, setNewHabit] = useState('');

  const toggleHabitCompletion = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedToday: !habit.completedToday,
            currentStreak: !habit.completedToday ? habit.currentStreak + 1 : Math.max(0, habit.currentStreak - 1)
          }
        : habit
    ));
  };

  const addHabit = () => {
    if (!newHabit.trim()) return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit,
      category: 'learning',
      currentStreak: 0,
      longestStreak: 0,
      completedToday: false,
      weeklyProgress: [0, 0, 0, 0, 0, 0, 0]
    };
    
    setHabits([...habits, habit]);
    setNewHabit('');
  };

  const getCategoryColor = (category: Habit['category']) => {
    switch (category) {
      case 'learning': return 'bg-blue-100 text-blue-800';
      case 'skill': return 'bg-green-100 text-green-800';
      case 'productivity': return 'bg-purple-100 text-purple-800';
      case 'health': return 'bg-red-100 text-red-800';
    }
  };

  const getWeeklyCompletionRate = (progress: number[]) => {
    return Math.round((progress.reduce((a, b) => a + b, 0) / progress.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            AI Habit Tracker
            <Badge variant="secondary">Smart Insights</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Habit */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a new learning habit..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
              className="flex-1"
            />
            <Button onClick={addHabit}>
              <Plus className="h-4 w-4 mr-2" />
              Add Habit
            </Button>
          </div>

          {/* Habits List */}
          <div className="space-y-4">
            {habits.map((habit) => (
              <Card key={habit.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Button
                        variant={habit.completedToday ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleHabitCompletion(habit.id)}
                        className="rounded-full w-8 h-8 p-0"
                      >
                        {habit.completedToday && <CheckCircle2 className="h-4 w-4" />}
                      </Button>
                      <div>
                        <h4 className="font-medium">{habit.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge className={getCategoryColor(habit.category)}>
                            {habit.category}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            {habit.currentStreak} day streak
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">Best: {habit.longestStreak} days</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Weekly: {getWeeklyCompletionRate(habit.weeklyProgress)}%
                      </div>
                    </div>
                  </div>

                  {/* Weekly Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>This Week</span>
                      <span>{habit.weeklyProgress.reduce((a, b) => a + b, 0)}/7 days</span>
                    </div>
                    <div className="flex gap-1">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <div
                          key={day}
                          className={`flex-1 h-2 rounded ${
                            habit.weeklyProgress[index] 
                              ? 'bg-primary' 
                              : 'bg-muted'
                          }`}
                          title={`${day}: ${habit.weeklyProgress[index] ? 'Completed' : 'Not completed'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendation */}
                  {habit.aiRecommendation && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">AI Suggestion</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{habit.aiRecommendation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall Statistics */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {habits.filter(h => h.completedToday).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(habits.reduce((acc, h) => acc + h.currentStreak, 0) / habits.length)}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.max(...habits.map(h => h.longestStreak))}
                  </div>
                  <div className="text-sm text-muted-foreground">Best Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
