
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Map, 
  Target,
  Clock,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Zap,
  Brain,
  Trophy,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'read' | 'practice' | 'quiz' | 'project';
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
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: LearningStep[];
}

interface AILearningPathGeneratorProps {
  className?: string;
}

export const AILearningPathGenerator: React.FC<AILearningPathGeneratorProps> = ({ className }) => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadExistingPaths();
  }, []);

  const loadExistingPaths = () => {
    const mockPaths: LearningPath[] = [
      {
        id: '1',
        title: 'React Development Mastery',
        description: 'Complete path from React basics to advanced patterns',
        totalSteps: 8,
        completedSteps: 3,
        estimatedDuration: '6-8 weeks',
        difficulty: 'intermediate',
        steps: [
          {
            id: '1-1',
            title: 'React Fundamentals',
            description: 'Learn components, props, and state',
            estimatedTime: '1 week',
            difficulty: 'beginner',
            type: 'read',
            completed: true,
            resources: ['React Docs', 'Interactive Tutorial']
          },
          {
            id: '1-2',
            title: 'Hooks Deep Dive',
            description: 'Master useState, useEffect, and custom hooks',
            estimatedTime: '1.5 weeks',
            difficulty: 'intermediate',
            type: 'practice',
            completed: true,
            resources: ['Hooks Guide', 'Practice Exercises']
          },
          {
            id: '1-3',
            title: 'State Management',
            description: 'Context API and external state solutions',
            estimatedTime: '1 week',
            difficulty: 'intermediate',
            type: 'project',
            completed: true,
            resources: ['Context Tutorial', 'Redux Basics']
          }
        ]
      }
    ];
    setLearningPaths(mockPaths);
  };

  const generateNewPath = async () => {
    if (!selectedTopic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic to generate a learning path.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPath: LearningPath = {
        id: Date.now().toString(),
        title: `${selectedTopic} Learning Path`,
        description: `AI-generated comprehensive learning journey for ${selectedTopic}`,
        totalSteps: 6,
        completedSteps: 0,
        estimatedDuration: '4-6 weeks',
        difficulty: 'intermediate',
        steps: [
          {
            id: `${Date.now()}-1`,
            title: `${selectedTopic} Fundamentals`,
            description: `Learn the core concepts and principles`,
            estimatedTime: '1 week',
            difficulty: 'beginner',
            type: 'read',
            completed: false,
            resources: ['Documentation', 'Video Tutorials']
          },
          {
            id: `${Date.now()}-2`,
            title: 'Hands-on Practice',
            description: 'Apply concepts through guided exercises',
            estimatedTime: '1.5 weeks',
            difficulty: 'intermediate',
            type: 'practice',
            completed: false,
            resources: ['Practice Lab', 'Code Examples']
          },
          {
            id: `${Date.now()}-3`,
            title: 'Real-world Project',
            description: 'Build a complete project using learned skills',
            estimatedTime: '2 weeks',
            difficulty: 'advanced',
            type: 'project',
            completed: false,
            resources: ['Project Template', 'Best Practices Guide']
          }
        ]
      };

      setLearningPaths(prev => [newPath, ...prev]);
      setSelectedTopic('');
      
      toast({
        title: "Learning Path Generated!",
        description: `AI created a personalized path for ${selectedTopic}.`,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'read': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Zap className="h-4 w-4" />;
      case 'quiz': return <Brain className="h-4 w-4" />;
      default: return <Trophy className="h-4 w-4" />;
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            AI Learning Path Generator
            <Badge variant="secondary">Personalized</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Path Generation */}
          <div className="space-y-4">
            <h3 className="font-medium">Generate New Learning Path</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter topic (e.g., TypeScript, Machine Learning)"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                onKeyPress={(e) => e.key === 'Enter' && generateNewPath()}
              />
              <Button
                onClick={generateNewPath}
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="space-y-4">
            <h3 className="font-medium">Your Learning Paths</h3>
            {learningPaths.map((path) => (
              <Card key={path.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-lg">{path.title}</h4>
                        <p className="text-sm text-muted-foreground">{path.description}</p>
                      </div>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{path.estimatedDuration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>{path.completedSteps}/{path.totalSteps} steps</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <span>{Math.round((path.completedSteps / path.totalSteps) * 100)}% complete</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{path.completedSteps}/{path.totalSteps}</span>
                      </div>
                      <Progress value={(path.completedSteps / path.totalSteps) * 100} className="h-2" />
                    </div>
                    
                    {/* Learning Steps Preview */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Next Steps:</h5>
                      {path.steps.slice(0, 3).map((step, index) => (
                        <div key={step.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(step.type)}
                              <span className="text-sm font-medium">{step.title}</span>
                              <Badge variant="outline" className="text-xs">
                                {step.estimatedTime}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                          </div>
                          {!step.completed && index === path.completedSteps && (
                            <ArrowRight className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full gap-2">
                      <BookOpen className="h-4 w-4" />
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🎯 Learning Path Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• AI creates paths based on your current knowledge level</li>
              <li>• Complete steps in order for optimal learning progression</li>
              <li>• Paths adapt based on your learning speed and preferences</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
