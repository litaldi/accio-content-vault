
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  Target, 
  CheckCircle, 
  Circle,
  ArrowRight,
  Clock,
  Star,
  Trophy,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  type: 'foundation' | 'practice' | 'project' | 'advanced';
  estimatedTime: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prerequisites: string[];
  completed: boolean;
  resources: {
    type: 'article' | 'video' | 'course' | 'project';
    title: string;
    url?: string;
  }[];
}

interface LearningPath {
  id: string;
  topic: string;
  description: string;
  totalSteps: number;
  estimatedDuration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: LearningStep[];
}

interface LearningPathGeneratorProps {
  className?: string;
}

export const LearningPathGenerator: React.FC<LearningPathGeneratorProps> = ({
  className
}) => {
  const [topic, setTopic] = useState('');
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateLearningPath = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic you'd like to learn about.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate AI learning path generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPath: LearningPath = {
        id: 'path-1',
        topic: topic,
        description: `A comprehensive learning path to master ${topic} from ${skillLevel} to advanced level.`,
        totalSteps: 8,
        estimatedDuration: '6-8 weeks',
        difficulty: skillLevel === 'beginner' ? 'Beginner' : skillLevel === 'intermediate' ? 'Intermediate' : 'Advanced',
        steps: [
          {
            id: 'step-1',
            title: `Understanding ${topic} Fundamentals`,
            description: 'Learn the core concepts and basic principles',
            type: 'foundation',
            estimatedTime: '2-3 hours',
            difficulty: 1,
            prerequisites: [],
            completed: false,
            resources: [
              { type: 'article', title: `Introduction to ${topic}` },
              { type: 'video', title: `${topic} Basics Explained` }
            ]
          },
          {
            id: 'step-2',
            title: 'Hands-on Practice',
            description: 'Apply basic concepts through guided exercises',
            type: 'practice',
            estimatedTime: '3-4 hours',
            difficulty: 2,
            prerequisites: ['Understanding Fundamentals'],
            completed: false,
            resources: [
              { type: 'course', title: `Interactive ${topic} Course` },
              { type: 'project', title: 'Practice Exercises' }
            ]
          },
          {
            id: 'step-3',
            title: 'Building Your First Project',
            description: 'Create a simple project to solidify your understanding',
            type: 'project',
            estimatedTime: '5-6 hours',
            difficulty: 3,
            prerequisites: ['Hands-on Practice'],
            completed: false,
            resources: [
              { type: 'project', title: `Build a ${topic} Application` },
              { type: 'article', title: 'Project Best Practices' }
            ]
          },
          {
            id: 'step-4',
            title: 'Advanced Concepts',
            description: 'Dive deeper into advanced topics and patterns',
            type: 'advanced',
            estimatedTime: '4-5 hours',
            difficulty: 4,
            prerequisites: ['Building Your First Project'],
            completed: false,
            resources: [
              { type: 'article', title: `Advanced ${topic} Patterns` },
              { type: 'course', title: 'Expert-level Techniques' }
            ]
          }
        ]
      };

      setLearningPath(mockPath);
      
      toast({
        title: "Learning Path Generated!",
        description: `Created a personalized ${mockPath.totalSteps}-step path for ${topic}.`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again with a different topic.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleStepCompletion = (stepId: string) => {
    if (!learningPath) return;
    
    setLearningPath({
      ...learningPath,
      steps: learningPath.steps.map(step =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'foundation': return <Circle className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'project': return <Star className="h-4 w-4" />;
      case 'advanced': return <Trophy className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'foundation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'practice': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'project': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const completedSteps = learningPath?.steps.filter(step => step.completed).length || 0;
  const progressPercentage = learningPath ? (completedSteps / learningPath.steps.length) * 100 : 0;

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            AI Learning Path Generator
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!learningPath ? (
            <>
              {/* Input Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">What do you want to learn?</label>
                  <Input
                    placeholder="e.g., React, Python, Machine Learning, etc."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Current Level</label>
                  <div className="flex gap-2">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                      <Button
                        key={level}
                        variant={skillLevel === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSkillLevel(level)}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={generateLearningPath}
                  disabled={!topic.trim() || isGenerating}
                  className="w-full gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating Learning Path...
                    </>
                  ) : (
                    <>
                      <GraduationCap className="h-4 w-4" />
                      Generate Learning Path
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Learning Path Display */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{learningPath.topic}</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLearningPath(null)}
                    >
                      Generate New Path
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{learningPath.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant="outline">
                      {learningPath.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {learningPath.estimatedDuration}
                    </div>
                    <div>
                      {completedSteps}/{learningPath.totalSteps} steps completed
                    </div>
                  </div>
                  
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                {/* Learning Steps */}
                <div className="space-y-3">
                  {learningPath.steps.map((step, index) => (
                    <Card 
                      key={step.id} 
                      className={`transition-all ${step.completed ? 'bg-green-50 dark:bg-green-950' : 'hover:shadow-md'}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 mt-1"
                            onClick={() => toggleStepCompletion(step.id)}
                          >
                            {step.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                          </Button>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-medium ${step.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {index + 1}. {step.title}
                              </h4>
                              <div className="flex items-center gap-2">
                                <Badge className={getTypeColor(step.type)}>
                                  {getTypeIcon(step.type)}
                                  <span className="ml-1 capitalize">{step.type}</span>
                                </Badge>
                                <div className="text-xs text-muted-foreground">
                                  {'★'.repeat(step.difficulty)}
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {step.estimatedTime}
                              </div>
                              {step.prerequisites.length > 0 && (
                                <div>
                                  Prerequisites: {step.prerequisites.join(', ')}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex gap-2 flex-wrap">
                              {step.resources.map((resource, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {resource.type}: {resource.title}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🎯 Learning Path Features:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• AI-generated curriculum based on your skill level</li>
              <li>• Structured progression from basics to advanced topics</li>
              <li>• Time estimates and difficulty ratings for each step</li>
              <li>• Track your progress and mark completed steps</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
