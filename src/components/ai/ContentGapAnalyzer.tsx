
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  AlertTriangle,
  TrendingUp,
  BookOpen,
  Target,
  Lightbulb,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KnowledgeGap {
  id: string;
  topic: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  description: string;
  suggestedResources: string[];
  relatedTopics: string[];
  estimatedLearningTime: string;
}

interface LearningGoal {
  id: string;
  title: string;
  progress: number;
  missingSkills: string[];
}

interface ContentGapAnalyzerProps {
  className?: string;
}

export const ContentGapAnalyzer: React.FC<ContentGapAnalyzerProps> = ({ className }) => {
  const [gaps, setGaps] = useState<KnowledgeGap[]>([]);
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedGap, setSelectedGap] = useState<KnowledgeGap | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    analyzeContentGaps();
  }, []);

  const analyzeContentGaps = async () => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockGaps: KnowledgeGap[] = [
        {
          id: '1',
          topic: 'Advanced TypeScript Patterns',
          category: 'Programming',
          priority: 'high',
          confidence: 92,
          description: 'You have solid TypeScript basics but lack knowledge in advanced patterns like conditional types and template literals.',
          suggestedResources: ['TypeScript Handbook Advanced Types', 'Conditional Types Deep Dive', 'TypeScript 4.9 Features'],
          relatedTopics: ['Generic Constraints', 'Mapped Types', 'Utility Types'],
          estimatedLearningTime: '2-3 weeks'
        },
        {
          id: '2',
          topic: 'Testing Strategies',
          category: 'Development',
          priority: 'high',
          confidence: 88,
          description: 'Limited content on testing frameworks and best practices. This is crucial for professional development.',
          suggestedResources: ['Jest Testing Framework', 'React Testing Library', 'E2E Testing with Cypress'],
          relatedTopics: ['Unit Testing', 'Integration Testing', 'Test-Driven Development'],
          estimatedLearningTime: '3-4 weeks'
        },
        {
          id: '3',
          topic: 'System Design Principles',
          category: 'Architecture',
          priority: 'medium',
          confidence: 78,
          description: 'Your frontend skills are strong, but backend architecture and system design knowledge could be improved.',
          suggestedResources: ['Designing Data-Intensive Applications', 'System Design Primer', 'Microservices Patterns'],
          relatedTopics: ['Scalability', 'Database Design', 'Distributed Systems'],
          estimatedLearningTime: '4-6 weeks'
        },
        {
          id: '4',
          topic: 'DevOps & Deployment',
          category: 'Operations',
          priority: 'medium',
          confidence: 72,
          description: 'Gap in deployment strategies and DevOps practices for modern web applications.',
          suggestedResources: ['Docker Fundamentals', 'CI/CD Pipelines', 'AWS/Azure Basics'],
          relatedTopics: ['Containerization', 'Cloud Services', 'Monitoring'],
          estimatedLearningTime: '3-5 weeks'
        }
      ];

      const mockGoals: LearningGoal[] = [
        {
          id: '1',
          title: 'Become Full-Stack Developer',
          progress: 65,
          missingSkills: ['Backend APIs', 'Database Design', 'System Architecture']
        },
        {
          id: '2',
          title: 'Master Modern Frontend',
          progress: 85,
          missingSkills: ['Advanced TypeScript', 'Testing Strategies']
        }
      ];

      setGaps(mockGaps);
      setGoals(mockGoals);
      
      toast({
        title: "Gap Analysis Complete!",
        description: `Found ${mockGaps.length} knowledge gaps to address.`,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const createLearningPlan = (gap: KnowledgeGap) => {
    toast({
      title: "Learning Plan Created!",
      description: `Created a personalized plan for ${gap.topic}.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Programming': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Development': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Architecture': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Operations': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Content Gap Analyzer
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex gap-2">
            <Button
              onClick={analyzeContentGaps}
              disabled={isAnalyzing}
              className="gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Analyze Knowledge Gaps
                </>
              )}
            </Button>
          </div>

          {/* Learning Goals Progress */}
          {goals.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium">Learning Goals Progress</h3>
              {goals.map((goal) => (
                <Card key={goal.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{goal.title}</h4>
                        <span className="text-sm font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-muted-foreground">Missing skills:</span>
                        {goal.missingSkills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Knowledge Gaps */}
          <div className="space-y-4">
            <h3 className="font-medium">Identified Knowledge Gaps</h3>
            {gaps.length === 0 ? (
              <div className="text-center py-8">
                <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-1">No Analysis Yet</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Analyze Knowledge Gaps" to discover areas for improvement.
                </p>
              </div>
            ) : (
              gaps.map((gap) => (
                <Card key={gap.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{gap.topic}</h4>
                          <p className="text-sm text-muted-foreground">{gap.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(gap.priority)}>
                            {gap.priority}
                          </Badge>
                          <Badge className={getCategoryColor(gap.category)}>
                            {gap.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">Confidence: {gap.confidence}%</span>
                          <span className="text-muted-foreground">⏱️ {gap.estimatedLearningTime}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Suggested Resources:</h5>
                        <div className="flex flex-wrap gap-1">
                          {gap.suggestedResources.slice(0, 3).map((resource, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {resource}
                            </Badge>
                          ))}
                          {gap.suggestedResources.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{gap.suggestedResources.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => createLearningPlan(gap)}
                          className="gap-1"
                        >
                          <Target className="h-3 w-3" />
                          Create Learning Plan
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedGap(gap)}
                          className="gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Selected Gap Details */}
          {selectedGap && (
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{selectedGap.topic}</h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedGap(null)}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium mb-1">Related Topics:</h5>
                      <div className="flex flex-wrap gap-1">
                        {selectedGap.relatedTopics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-1">All Suggested Resources:</h5>
                      <div className="space-y-1">
                        {selectedGap.suggestedResources.map((resource, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <BookOpen className="h-3 w-3 text-muted-foreground" />
                            <span>{resource}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Gap Analysis Summary */}
          <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Gap Analysis Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600">{gaps.filter(g => g.priority === 'high').length}</div>
                <div className="text-xs text-muted-foreground">High Priority</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{gaps.filter(g => g.priority === 'medium').length}</div>
                <div className="text-xs text-muted-foreground">Medium Priority</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{gaps.filter(g => g.priority === 'low').length}</div>
                <div className="text-xs text-muted-foreground">Low Priority</div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">💡 Gap Analysis Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Focus on high-priority gaps that align with your goals</li>
              <li>• AI analyzes your content to identify missing knowledge areas</li>
              <li>• Regular gap analysis helps maintain comprehensive skill development</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
