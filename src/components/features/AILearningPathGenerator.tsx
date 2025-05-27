
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  MapPin, 
  Clock,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Brain,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  resources: string[];
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalSteps: number;
  completedSteps: number;
  estimatedDuration: string;
  difficulty: string;
  steps: LearningStep[];
}

export const AILearningPathGenerator: React.FC = () => {
  const [learningGoal, setLearningGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPath, setGeneratedPath] = useState<LearningPath | null>(null);

  const generateLearningPath = async () => {
    if (!learningGoal.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI path generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPath: LearningPath = {
      id: '1',
      title: `Master ${learningGoal}`,
      description: `A personalized learning path to help you become proficient in ${learningGoal}`,
      totalSteps: 5,
      completedSteps: 1,
      estimatedDuration: '6-8 weeks',
      difficulty: 'Intermediate',
      steps: [
        {
          id: '1',
          title: 'Foundation & Core Concepts',
          description: `Learn the fundamental principles and basic concepts of ${learningGoal}`,
          estimatedTime: '1-2 weeks',
          difficulty: 'Beginner',
          completed: true,
          resources: ['Introduction Guide', 'Basic Tutorial', 'Core Concepts Video']
        },
        {
          id: '2',
          title: 'Practical Implementation',
          description: 'Start building real projects and applying what you\'ve learned',
          estimatedTime: '2 weeks',
          difficulty: 'Intermediate',
          completed: false,
          resources: ['Hands-on Projects', 'Code Examples', 'Practice Exercises']
        },
        {
          id: '3',
          title: 'Advanced Techniques',
          description: 'Explore advanced patterns and best practices',
          estimatedTime: '1-2 weeks',
          difficulty: 'Advanced',
          completed: false,
          resources: ['Advanced Guide', 'Expert Tips', 'Case Studies']
        },
        {
          id: '4',
          title: 'Real-world Applications',
          description: 'Build complex projects that showcase your skills',
          estimatedTime: '2 weeks',
          difficulty: 'Advanced',
          completed: false,
          resources: ['Portfolio Projects', 'Industry Examples', 'Best Practices']
        },
        {
          id: '5',
          title: 'Mastery & Optimization',
          description: 'Perfect your skills and learn optimization techniques',
          estimatedTime: '1 week',
          difficulty: 'Advanced',
          completed: false,
          resources: ['Performance Guide', 'Optimization Tips', 'Expert Resources']
        }
      ]
    };
    
    setGeneratedPath(mockPath);
    setIsGenerating(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const progressPercentage = generatedPath 
    ? (generatedPath.completedSteps / generatedPath.totalSteps) * 100 
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            AI Learning Path Generator
            <Badge variant="secondary">Personalized</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Goal Input */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">What would you like to learn?</label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., React Development, Machine Learning, Photography..."
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && generateLearningPath()}
                  className="flex-1"
                />
                <Button 
                  onClick={generateLearningPath}
                  disabled={isGenerating || !learningGoal.trim()}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Path
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {['React Development', 'AI & Machine Learning', 'Data Science', 'UI/UX Design'].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setLearningGoal(suggestion)}
                  className="text-xs h-7"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Generated Learning Path */}
          {generatedPath && (
            <div className="space-y-6">
              {/* Path Overview */}
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{generatedPath.title}</h3>
                      <p className="text-muted-foreground mb-4">{generatedPath.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{generatedPath.estimatedDuration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{generatedPath.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{generatedPath.totalSteps} steps</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {Math.round(progressPercentage)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Complete</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{generatedPath.completedSteps} of {generatedPath.totalSteps} steps</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Learning Steps */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Your Learning Journey
                </h4>
                
                {generatedPath.steps.map((step, index) => (
                  <Card key={step.id} className={`transition-all ${step.completed ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {step.completed ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : (
                            <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                              <span className="text-sm font-medium">{index + 1}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-medium">{step.title}</h5>
                            <Badge variant="outline" className={getDifficultyColor(step.difficulty)}>
                              {step.difficulty}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {step.estimatedTime}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {step.resources.map((resource, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {resource}
                                </Badge>
                              ))}
                            </div>
                            
                            <Button size="sm" variant={step.completed ? "outline" : "default"}>
                              {step.completed ? 'Review' : 'Start'}
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Brain className="h-4 w-4" />
                  Customize Path
                </Button>
                <Button variant="outline" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Find Resources
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
