
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  AlertTriangle,
  BookOpen,
  Target,
  Plus,
  TrendingUp,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KnowledgeGap {
  id: string;
  topic: string;
  category: string;
  severity: 'critical' | 'important' | 'nice-to-have';
  reason: string;
  suggestedResources: string[];
  relatedTopics: string[];
  completionEstimate: string;
}

interface ContentGapAnalyzerProps {
  className?: string;
}

export const ContentGapAnalyzer: React.FC<ContentGapAnalyzerProps> = ({ className }) => {
  const [gaps, setGaps] = useState<KnowledgeGap[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [knowledgeScore, setKnowledgeScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    analyzeContentGaps();
  }, []);

  const analyzeContentGaps = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Simulate AI analysis with progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => Math.min(prev + 15, 90));
      }, 300);

      await new Promise(resolve => setTimeout(resolve, 2000));
      clearInterval(progressInterval);
      setAnalysisProgress(100);

      const mockGaps: KnowledgeGap[] = [
        {
          id: '1',
          topic: 'Advanced TypeScript Patterns',
          category: 'Programming',
          severity: 'critical',
          reason: 'You have React content but lack advanced TypeScript knowledge for complex patterns',
          suggestedResources: ['TypeScript Deep Dive', 'Advanced TS Patterns Course', 'Generic Programming Guide'],
          relatedTopics: ['React', 'JavaScript', 'Type Safety'],
          completionEstimate: '2-3 weeks'
        },
        {
          id: '2',
          topic: 'Performance Optimization',
          category: 'Frontend',
          severity: 'important',
          reason: 'Your frontend skills are strong but missing performance optimization techniques',
          suggestedResources: ['Web Performance Guide', 'Chrome DevTools Mastery', 'Bundle Analysis Tools'],
          relatedTopics: ['React', 'JavaScript', 'Build Tools'],
          completionEstimate: '1-2 weeks'
        },
        {
          id: '3',
          topic: 'Testing Strategies',
          category: 'Development',
          severity: 'important',
          reason: 'You have development content but limited testing methodology knowledge',
          suggestedResources: ['Jest Documentation', 'Testing Library Guide', 'E2E Testing Best Practices'],
          relatedTopics: ['JavaScript', 'React', 'Quality Assurance'],
          completionEstimate: '1 week'
        },
        {
          id: '4',
          topic: 'Design Systems',
          category: 'Design',
          severity: 'nice-to-have',
          reason: 'Would complement your UI development skills with systematic design approach',
          suggestedResources: ['Design Systems Handbook', 'Component Library Patterns', 'Figma to Code Workflow'],
          relatedTopics: ['UI/UX', 'Frontend', 'Collaboration'],
          completionEstimate: '3-4 weeks'
        }
      ];

      setGaps(mockGaps);
      
      // Calculate knowledge score based on gaps
      const criticalGaps = mockGaps.filter(gap => gap.severity === 'critical').length;
      const importantGaps = mockGaps.filter(gap => gap.severity === 'important').length;
      const score = Math.max(40, 100 - (criticalGaps * 20) - (importantGaps * 10));
      setKnowledgeScore(score);
      
      toast({
        title: "Gap Analysis Complete!",
        description: `Found ${mockGaps.length} knowledge gaps to explore.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setAnalysisProgress(0), 1000);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'important': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'important': return <Target className="h-4 w-4 text-yellow-600" />;
      default: return <BookOpen className="h-4 w-4 text-blue-600" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const addToLearningPlan = (gap: KnowledgeGap) => {
    toast({
      title: "Added to Learning Plan!",
      description: `${gap.topic} has been added to your learning queue.`,
    });
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
          {/* Knowledge Completeness Score */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Knowledge Completeness</span>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(knowledgeScore)}`}>
              {knowledgeScore}%
            </div>
            <Progress value={knowledgeScore} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Based on your content library and learning goals
            </p>
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing knowledge patterns...</span>
                <span>{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          )}

          {/* Knowledge Gaps */}
          {gaps.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Identified Knowledge Gaps</h3>
                <Button variant="outline" size="sm" onClick={analyzeContentGaps}>
                  <Search className="h-4 w-4 mr-1" />
                  Re-analyze
                </Button>
              </div>
              
              <div className="space-y-3">
                {gaps.map((gap) => (
                  <Card key={gap.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getSeverityIcon(gap.severity)}
                            <div>
                              <h4 className="font-medium">{gap.topic}</h4>
                              <p className="text-sm text-muted-foreground">{gap.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getSeverityColor(gap.severity)}>
                              {gap.severity}
                            </Badge>
                            <Badge variant="outline">
                              {gap.completionEstimate}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          <strong>Why this matters:</strong> {gap.reason}
                        </p>
                        
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Suggested Resources:</h5>
                          <div className="flex flex-wrap gap-2">
                            {gap.suggestedResources.map((resource, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <BookOpen className="h-3 w-3 mr-1" />
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Related Topics:</h5>
                          <div className="flex flex-wrap gap-1">
                            {gap.relatedTopics.map((topic, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Find Resources
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => addToLearningPlan(gap)}
                            className="gap-1"
                          >
                            <Plus className="h-3 w-3" />
                            Add to Plan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="text-center p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Critical</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {gaps.filter(gap => gap.severity === 'critical').length}
              </div>
            </Card>
            <Card className="text-center p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Important</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {gaps.filter(gap => gap.severity === 'important').length}
              </div>
            </Card>
            <Card className="text-center p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Nice-to-Have</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {gaps.filter(gap => gap.severity === 'nice-to-have').length}
              </div>
            </Card>
          </div>

          {/* Tips */}
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🎯 Gap Analysis Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Focus on critical gaps first for maximum impact</li>
              <li>• Build on existing knowledge to fill related gaps efficiently</li>
              <li>• Regular analysis helps identify new gaps as you grow</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
