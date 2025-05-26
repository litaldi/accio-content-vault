
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Map, 
  Target, 
  BookOpen, 
  Clock, 
  CheckCircle,
  PlayCircle,
  Plus,
  Brain,
  TrendingUp,
  Award
} from 'lucide-react';

export const LearningPathGenerator = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPath, setCurrentPath] = useState<any>(null);
  
  const [savedPaths, setSavedPaths] = useState([
    {
      id: '1',
      title: 'Frontend Development Mastery',
      description: 'Complete guide to modern frontend development',
      progress: 65,
      totalSteps: 12,
      completedSteps: 8,
      estimatedTime: '6 weeks',
      difficulty: 'Intermediate',
      topics: ['React', 'TypeScript', 'CSS', 'Testing'],
      nextStep: 'Advanced React Patterns'
    },
    {
      id: '2',
      title: 'Data Science Fundamentals',
      description: 'Learn the basics of data science and analytics',
      progress: 30,
      totalSteps: 15,
      completedSteps: 4,
      estimatedTime: '8 weeks',
      difficulty: 'Beginner',
      topics: ['Python', 'Statistics', 'Pandas', 'Visualization'],
      nextStep: 'Data Cleaning Techniques'
    }
  ]);

  const generatePath = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPath = {
      title: `${topic} Learning Path`,
      description: `Comprehensive learning path for ${topic}`,
      difficulty: 'Intermediate',
      estimatedTime: '4-6 weeks',
      steps: [
        {
          id: 1,
          title: `${topic} Fundamentals`,
          description: 'Learn the basic concepts and principles',
          estimatedTime: '1 week',
          resources: ['Introduction Article', 'Video Tutorial', 'Practice Exercises'],
          completed: false
        },
        {
          id: 2,
          title: `Practical ${topic}`,
          description: 'Apply concepts through hands-on projects',
          estimatedTime: '2 weeks',
          resources: ['Project Guide', 'Code Examples', 'Documentation'],
          completed: false
        },
        {
          id: 3,
          title: `Advanced ${topic}`,
          description: 'Master advanced techniques and patterns',
          estimatedTime: '1-2 weeks',
          resources: ['Advanced Guide', 'Case Studies', 'Best Practices'],
          completed: false
        },
        {
          id: 4,
          title: `${topic} in Practice`,
          description: 'Real-world applications and optimization',
          estimatedTime: '1 week',
          resources: ['Industry Examples', 'Performance Tips', 'Tools & Libraries'],
          completed: false
        }
      ]
    };
    
    setCurrentPath(newPath);
    setIsGenerating(false);
    setTopic('');
  };

  const savePath = () => {
    if (currentPath) {
      const savedPath = {
        id: Date.now().toString(),
        title: currentPath.title,
        description: currentPath.description,
        progress: 0,
        totalSteps: currentPath.steps.length,
        completedSteps: 0,
        estimatedTime: currentPath.estimatedTime,
        difficulty: currentPath.difficulty,
        topics: [topic],
        nextStep: currentPath.steps[0].title
      };
      
      setSavedPaths([savedPath, ...savedPaths]);
      setCurrentPath(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            AI Learning Path Generator
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter a topic to learn (e.g., Machine Learning, Web Design)..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && generatePath()}
              />
              <Button 
                onClick={generatePath} 
                disabled={isGenerating || !topic.trim()}
              >
                {isGenerating ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Path
                  </>
                )}
              </Button>
            </div>

            {isGenerating && (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
                  <p className="font-medium">AI is creating your personalized learning path...</p>
                  <p className="text-sm text-muted-foreground">Analyzing content and structuring optimal learning sequence</p>
                </CardContent>
              </Card>
            )}

            {currentPath && (
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{currentPath.title}</CardTitle>
                      <p className="text-muted-foreground">{currentPath.description}</p>
                    </div>
                    <Button onClick={savePath}>
                      <Award className="h-4 w-4 mr-2" />
                      Save Path
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {currentPath.estimatedTime}
                    </Badge>
                    <Badge variant="outline">
                      <div className={`w-2 h-2 rounded-full mr-1 ${getDifficultyColor(currentPath.difficulty)}`} />
                      {currentPath.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {currentPath.steps.map((step: any, index: number) => (
                      <Card key={step.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-sm font-medium">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{step.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>📚 {step.resources.length} resources</span>
                                <span>⏱️ {step.estimatedTime}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Saved Learning Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            My Learning Paths
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-4">
            {savedPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{path.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{path.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {path.estimatedTime}
                        </Badge>
                        <Badge variant="outline">
                          <div className={`w-2 h-2 rounded-full mr-1 ${getDifficultyColor(path.difficulty)}`} />
                          {path.difficulty}
                        </Badge>
                        <span className="text-muted-foreground">
                          {path.completedSteps}/{path.totalSteps} steps completed
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="w-full" />
                  </div>

                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="font-medium">Next: {path.nextStep}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {path.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
