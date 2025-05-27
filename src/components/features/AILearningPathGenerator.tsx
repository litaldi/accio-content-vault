
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Map, 
  CheckCircle2, 
  Circle, 
  Clock,
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  resources: string[];
}

interface LearningPath {
  id: string;
  goal: string;
  description: string;
  totalSteps: number;
  completedSteps: number;
  estimatedDuration: string;
  steps: LearningStep[];
}

export const AILearningPathGenerator: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);

  const generatePath = async () => {
    if (!goal.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI path generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPath: LearningPath = {
      id: '1',
      goal: goal,
      description: `A comprehensive learning path to master ${goal} with structured progression and practical applications.`,
      totalSteps: 6,
      completedSteps: 1,
      estimatedDuration: '4-6 weeks',
      steps: [
        {
          id: '1',
          title: 'Foundation Concepts',
          description: `Learn the fundamental concepts and principles of ${goal}`,
          estimatedTime: '1 week',
          difficulty: 'beginner',
          completed: true,
          resources: ['Articles', 'Video tutorials', 'Documentation']
        },
        {
          id: '2',
          title: 'Core Techniques',
          description: 'Master the essential techniques and methodologies',
          estimatedTime: '1-2 weeks',
          difficulty: 'intermediate',
          completed: false,
          resources: ['Hands-on projects', 'Code examples', 'Practice exercises']
        },
        {
          id: '3',
          title: 'Advanced Applications',
          description: 'Explore advanced use cases and complex implementations',
          estimatedTime: '1 week',
          difficulty: 'advanced',
          completed: false,
          resources: ['Advanced tutorials', 'Case studies', 'Best practices']
        },
        {
          id: '4',
          title: 'Real-world Projects',
          description: 'Build practical projects to solidify your understanding',
          estimatedTime: '1-2 weeks',
          difficulty: 'intermediate',
          completed: false,
          resources: ['Project templates', 'Code repositories', 'Community examples']
        },
        {
          id: '5',
          title: 'Optimization & Performance',
          description: 'Learn optimization techniques and performance best practices',
          estimatedTime: '3-5 days',
          difficulty: 'advanced',
          completed: false,
          resources: ['Performance guides', 'Optimization tools', 'Benchmarking']
        },
        {
          id: '6',
          title: 'Mastery & Beyond',
          description: 'Achieve mastery and explore cutting-edge developments',
          estimatedTime: 'Ongoing',
          difficulty: 'advanced',
          completed: false,
          resources: ['Research papers', 'Expert interviews', 'Community contributions']
        }
      ]
    };
    
    setLearningPath(mockPath);
    setIsGenerating(false);
  };

  const toggleStepCompletion = (stepId: string) => {
    if (!learningPath) return;
    
    setLearningPath(prev => ({
      ...prev!,
      steps: prev!.steps.map(step => 
        step.id === stepId 
          ? { ...step, completed: !step.completed }
          : step
      ),
      completedSteps: prev!.steps.filter(step => 
        step.id === stepId ? !step.completed : step.completed
      ).length
    }));
  };

  const getDifficultyColor = (difficulty: LearningStep['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            AI Learning Path Generator
            <Badge variant="secondary">Personalized</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="What would you like to learn? (e.g., React, Machine Learning, Python)"
              className="flex-1"
            />
            <Button 
              onClick={generatePath}
              disabled={!goal.trim() || isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Map className="h-4 w-4" />
                  Generate Path
                </>
              )}
            </Button>
          </div>

          {learningPath && (
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{learningPath.goal}</h3>
                  <p className="text-muted-foreground mb-4">{learningPath.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{learningPath.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span className="text-sm">{learningPath.totalSteps} steps</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{learningPath.completedSteps}/{learningPath.totalSteps}</span>
                    </div>
                    <Progress 
                      value={(learningPath.completedSteps / learningPath.totalSteps) * 100} 
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {learningPath.steps.map((step, index) => (
                  <Card 
                    key={step.id} 
                    className={`transition-all ${step.completed ? 'bg-green-50 dark:bg-green-900/20' : ''}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleStepCompletion(step.id)}
                          className="mt-1"
                        >
                          {step.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              Step {index + 1}
                            </span>
                            <Badge className={getDifficultyColor(step.difficulty)}>
                              {step.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {step.estimatedTime}
                            </div>
                          </div>
                          
                          <h4 className="font-medium mb-1">{step.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {step.resources.map((resource, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {index < learningPath.steps.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground mt-8" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
