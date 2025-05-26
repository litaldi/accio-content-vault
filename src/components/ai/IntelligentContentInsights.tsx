
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Brain,
  Calendar,
  Tag,
  Users,
  Clock,
  Target,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentInsight {
  metric: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface ContentPattern {
  pattern: string;
  frequency: number;
  recommendation: string;
}

interface IntelligentContentInsightsProps {
  userId?: string;
  className?: string;
}

export const IntelligentContentInsights: React.FC<IntelligentContentInsightsProps> = ({
  userId,
  className
}) => {
  const [insights, setInsights] = useState<ContentInsight[]>([]);
  const [patterns, setPatterns] = useState<ContentPattern[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    generateInsights();
  }, [userId]);

  const generateInsights = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Simulate analysis progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => Math.min(prev + 15, 90));
      }, 300);

      await new Promise(resolve => setTimeout(resolve, 2000));
      clearInterval(progressInterval);
      setAnalysisProgress(100);

      // Generate mock insights
      const mockInsights: ContentInsight[] = [
        {
          metric: 'Content Velocity',
          value: '12 items/week',
          trend: 'up',
          description: 'You\'re saving content 23% more frequently than last month'
        },
        {
          metric: 'Tag Consistency',
          value: '87%',
          trend: 'stable',
          description: 'Your tagging patterns show good organization habits'
        },
        {
          metric: 'Knowledge Domains',
          value: '8 active areas',
          trend: 'up',
          description: 'You\'re exploring 2 new knowledge domains this month'
        },
        {
          metric: 'Engagement Score',
          value: '94/100',
          trend: 'up',
          description: 'High interaction with saved content indicates effective curation'
        }
      ];

      const mockPatterns: ContentPattern[] = [
        {
          pattern: 'JavaScript & React Content',
          frequency: 68,
          recommendation: 'Consider creating a dedicated collection for frontend development'
        },
        {
          pattern: 'Weekend Learning Sessions',
          frequency: 45,
          recommendation: 'Your weekend study pattern is strong - keep it up!'
        },
        {
          pattern: 'AI/ML Interest Growing',
          frequency: 34,
          recommendation: 'Trending topic for you - explore advanced AI courses'
        },
        {
          pattern: 'Short-form Content Preference',
          frequency: 78,
          recommendation: 'You prefer concise content - look for summary formats'
        }
      ];

      setInsights(mockInsights);
      setPatterns(mockPatterns);

      toast({
        title: "Insights Generated!",
        description: "AI has analyzed your content patterns and behavior.",
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <Target className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'down': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Intelligent Content Insights
              <Badge variant="secondary">AI Analytics</Badge>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={generateInsights}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing content patterns...</span>
                <span>{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          )}

          {/* Key Insights */}
          {insights.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Key Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.map((insight, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{insight.metric}</span>
                          <Badge className={getTrendColor(insight.trend)}>
                            {getTrendIcon(insight.trend)}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {insight.value}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {insight.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Content Patterns */}
          {patterns.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Behavioral Patterns
              </h3>
              <div className="space-y-3">
                {patterns.map((pattern, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{pattern.pattern}</span>
                          <Badge variant="outline">{pattern.frequency}% frequency</Badge>
                        </div>
                        <Progress value={pattern.frequency} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          💡 {pattern.recommendation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Calendar className="h-6 w-6 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">28</div>
              <div className="text-xs text-muted-foreground">Days Active</div>
            </div>
            <div className="text-center">
              <Tag className="h-6 w-6 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">156</div>
              <div className="text-xs text-muted-foreground">Tags Used</div>
            </div>
            <div className="text-center">
              <Users className="h-6 w-6 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">89%</div>
              <div className="text-xs text-muted-foreground">Above Average</div>
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">2.3h</div>
              <div className="text-xs text-muted-foreground">Daily Usage</div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">🎯 Personalized Recommendations</h4>
              <ul className="text-sm space-y-1">
                <li>• Create a "Weekly Learning" collection for weekend content</li>
                <li>• Set up automated tags for JavaScript-related content</li>
                <li>• Explore our new AI summarization for long-form articles</li>
                <li>• Join the community discussion on trending AI topics</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
