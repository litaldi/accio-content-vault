
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
  Clock,
  Star,
  Brain,
  Lightbulb
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'career' | 'skill' | 'project';
  progress: number;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  milestones: Milestone[];
  aiInsights?: string[];
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export const AIGoalTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Master React & TypeScript',
      description: 'Become proficient in React development with TypeScript',
      category: 'skill',
      progress: 75,
      deadline: '2024-06-30',
      priority: 'high',
      milestones: [
        { id: '1a', title: 'Complete React fundamentals', completed: true, dueDate: '2024-02-15' },
        { id: '1b', title: 'Learn TypeScript basics', completed: true, dueDate: '2024-03-01' },
        { id: '1c', title: 'Build 3 projects', completed: false, dueDate: '2024-05-15' },
        { id: '1d', title: 'Advanced patterns & optimization', completed: false, dueDate: '2024-06-15' }
      ],
      aiInsights: [
        'You\'re making great progress! Focus on practical projects now.',
        'Consider contributing to open source React projects.',
        'Advanced patterns like render props will boost your skills significantly.'
      ]
    },
    {
      id: '2',
      title: 'Complete Machine Learning Course',
      description: 'Finish the comprehensive ML course and apply knowledge',
      category: 'learning',
      progress: 45,
      deadline: '2024-08-30',
      priority: 'medium',
      milestones: [
        { id: '2a', title: 'Linear regression & classification', completed: true, dueDate: '2024-03-30' },
        { id: '2b', title: 'Neural networks basics', completed: false, dueDate: '2024-05-30' },
        { id: '2c', title: 'Deep learning project', completed: false, dueDate: '2024-07-30' },
        { id: '2d', title: 'Final capstone project', completed: false, dueDate: '2024-08-15' }
      ],
      aiInsights: [
        'Break down complex concepts into smaller study sessions.',
        'Practice with real datasets to reinforce learning.',
        'Join ML communities for peer support and feedback.'
      ]
    }
  ]);

  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? {
            ...goal,
            milestones: goal.milestones.map(milestone =>
              milestone.id === milestoneId 
                ? { ...milestone, completed: !milestone.completed }
                : milestone
            )
          }
        : goal
    ));
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getCategoryColor = (category: Goal['category']) => {
    switch (category) {
      case 'learning': return 'bg-blue-100 text-blue-800';
      case 'skill': return 'bg-purple-100 text-purple-800';
      case 'career': return 'bg-indigo-100 text-indigo-800';
      case 'project': return 'bg-orange-100 text-orange-800';
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            AI Goal Tracker
            <Badge variant="secondary">Smart Progress</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Goals Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Active Goals</span>
                </div>
                <div className="text-2xl font-bold">{goals.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Avg Progress</span>
                </div>
                <div className="text-2xl font-bold">
                  {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Next Deadline</span>
                </div>
                <div className="text-2xl font-bold">
                  {Math.min(...goals.map(g => getDaysUntilDeadline(g.deadline)))} days
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Goals List */}
          <div className="space-y-4">
            {goals.map((goal) => (
              <Card 
                key={goal.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedGoal === goal.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge className={getCategoryColor(goal.category)}>
                          {goal.category}
                        </Badge>
                        <Badge className={getPriorityColor(goal.priority)}>
                          {goal.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <div className="text-sm text-muted-foreground">
                        {getDaysUntilDeadline(goal.deadline)} days left
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Due: {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {selectedGoal === goal.id && (
                    <div className="space-y-4 pt-4 border-t">
                      {/* Milestones */}
                      <div>
                        <h5 className="font-medium mb-2">Milestones</h5>
                        <div className="space-y-2">
                          {goal.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center gap-3">
                              <Button
                                variant={milestone.completed ? 'default' : 'outline'}
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMilestone(goal.id, milestone.id);
                                }}
                                className="rounded-full w-6 h-6 p-0"
                              >
                                {milestone.completed && <CheckCircle2 className="h-3 w-3" />}
                              </Button>
                              <div className="flex-1">
                                <span className={`text-sm ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                                  {milestone.title}
                                </span>
                                <div className="text-xs text-muted-foreground">
                                  Due: {new Date(milestone.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Insights */}
                      {goal.aiInsights && (
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">AI Insights</span>
                          </div>
                          <ul className="space-y-1">
                            {goal.aiInsights.map((insight, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                <Lightbulb className="h-3 w-3 mt-0.5 text-yellow-500 flex-shrink-0" />
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Goal */}
          <Card className="border-dashed">
            <CardContent className="p-4">
              <Button variant="outline" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add New Goal
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
