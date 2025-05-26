
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp,
  Brain,
  Target,
  Clock,
  Tags,
  BookOpen,
  Zap,
  Eye,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentInsight {
  type: 'trend' | 'pattern' | 'gap' | 'opportunity';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
}

interface KnowledgeMetrics {
  totalContent: number;
  categoriesCount: number;
  avgContentAge: number;
  engagementScore: number;
  learningVelocity: number;
  knowledgeDepth: number;
}

interface IntelligentContentInsightsProps {
  className?: string;
}

export const IntelligentContentInsights: React.FC<IntelligentContentInsightsProps> = ({ className }) => {
  const [insights, setInsights] = useState<ContentInsight[]>([]);
  const [metrics, setMetrics] = useState<KnowledgeMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  const { toast } = useToast();

  useEffect(() => {
    generateInsights();
  }, [selectedTimeframe]);

  const generateInsights = async () => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockInsights: ContentInsight[] = [
        {
          type: 'trend',
          title: 'Growing Interest in AI Tools',
          description: 'Your AI and automation content has increased 40% this month',
          impact: 'high',
          actionable: true
        },
        {
          type: 'pattern',
          title: 'Learning Peak Hours',
          description: 'You save most content between 9-11 AM, optimal for focused learning',
          impact: 'medium',
          actionable: true
        },
        {
          type: 'gap',
          title: 'Missing Practical Examples',
          description: 'Theory-heavy content dominates; consider adding more tutorials',
          impact: 'high',
          actionable: true
        },
        {
          type: 'opportunity',
          title: 'Underutilized Categories',
          description: 'Design and productivity content could be better organized',
          impact: 'medium',
          actionable: true
        }
      ];

      const mockMetrics: KnowledgeMetrics = {
        totalContent: 247,
        categoriesCount: 12,
        avgContentAge: 18,
        engagementScore: 78,
        learningVelocity: 85,
        knowledgeDepth: 72
      };

      setInsights(mockInsights);
      setMetrics(mockMetrics);
      
      toast({
        title: "Insights Generated!",
        description: "AI has analyzed your knowledge patterns and trends.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'pattern': return <BarChart3 className="h-4 w-4 text-blue-600" />;
      case 'gap': return <Target className="h-4 w-4 text-red-600" />;
      default: return <Zap className="h-4 w-4 text-purple-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Intelligent Content Insights
            <Badge variant="secondary">Analytics</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timeframe Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Analysis Period</label>
            <div className="flex gap-2">
              {[
                { key: 'week', label: 'Last Week' },
                { key: 'month', label: 'Last Month' },
                { key: 'quarter', label: 'Last Quarter' }
              ].map((period) => (
                <Button
                  key={period.key}
                  variant={selectedTimeframe === period.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(period.key as any)}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Generate Insights */}
          <Button
            onClick={generateInsights}
            disabled={isAnalyzing}
            className="w-full gap-2"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Analyzing Knowledge Patterns...
              </>
            ) : (
              <>
                <BarChart3 className="h-4 w-4" />
                Generate Fresh Insights
              </>
            )}
          </Button>

          {/* Knowledge Metrics Dashboard */}
          {metrics && (
            <div className="space-y-4">
              <h3 className="font-medium">Knowledge Dashboard</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Card className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Total Content</span>
                  </div>
                  <div className="text-2xl font-bold">{metrics.totalContent}</div>
                  <div className="text-xs text-muted-foreground">items saved</div>
                </Card>
                
                <Card className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Tags className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Categories</span>
                  </div>
                  <div className="text-2xl font-bold">{metrics.categoriesCount}</div>
                  <div className="text-xs text-muted-foreground">active areas</div>
                </Card>

                <Card className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Avg Age</span>
                  </div>
                  <div className="text-2xl font-bold">{metrics.avgContentAge}d</div>
                  <div className="text-xs text-muted-foreground">content age</div>
                </Card>
              </div>

              {/* Performance Scores */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Performance Scores</h4>
                {[
                  { label: 'Engagement Score', value: metrics.engagementScore, icon: Eye },
                  { label: 'Learning Velocity', value: metrics.learningVelocity, icon: Zap },
                  { label: 'Knowledge Depth', value: metrics.knowledgeDepth, icon: Star }
                ].map((score, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <score.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{score.label}</span>
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(score.value)}`}>
                        {score.value}%
                      </span>
                    </div>
                    <Progress value={score.value} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Insights */}
          {insights.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">AI-Discovered Insights</h3>
              {insights.map((insight, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{insight.title}</h4>
                          <Badge className={getImpactColor(insight.impact)} variant="outline">
                            {insight.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                    {insight.actionable && (
                      <Button size="sm" variant="outline" className="gap-1">
                        <Target className="h-3 w-3" />
                        Act
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <BookOpen className="h-3 w-3" />
                Content Audit
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Tags className="h-3 w-3" />
                Organize Tags
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                Growth Report
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Target className="h-3 w-3" />
                Set Goals
              </Button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-indigo-50 dark:bg-indigo-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">📊 Insights Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• AI analyzes patterns in your content consumption and creation</li>
              <li>• Regular insight generation helps optimize your learning strategy</li>
              <li>• Act on high-impact suggestions for maximum improvement</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
