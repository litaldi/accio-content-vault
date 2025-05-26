
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb,
  BarChart3,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';

export const AIContentAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalysis({
      totalContent: 247,
      knowledgeGaps: [
        { topic: "Machine Learning", confidence: 85 },
        { topic: "Data Visualization", confidence: 72 },
        { topic: "API Design", confidence: 68 }
      ],
      insights: [
        "You have strong coverage in frontend development",
        "Consider adding more backend architecture content",
        "Your learning pattern shows preference for visual content"
      ],
      recommendations: [
        { title: "Complete React Advanced Patterns", priority: "High" },
        { title: "Explore GraphQL Documentation", priority: "Medium" },
        { title: "Review System Design Principles", priority: "High" }
      ],
      productivityScore: 87
    });
    
    setIsAnalyzing(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Content Analysis
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <Button 
            onClick={runAnalysis} 
            disabled={isAnalyzing}
            size="lg"
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Your Knowledge Base...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze My Content
              </>
            )}
          </Button>
        </div>

        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing content...</span>
              <span>87%</span>
            </div>
            <Progress value={87} className="w-full" />
          </div>
        )}

        {analysis && (
          <div className="space-y-6">
            {/* Productivity Score */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Knowledge Productivity Score</h3>
                    <p className="text-sm text-muted-foreground">Based on content organization and usage patterns</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{analysis.productivityScore}%</div>
                    <Badge variant="secondary" className="mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Excellent
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Knowledge Gaps */}
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Knowledge Gaps to Fill
              </h3>
              <div className="space-y-2">
                {analysis.knowledgeGaps.map((gap: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{gap.topic}</span>
                    <Badge variant="outline">{gap.confidence}% confidence</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                AI Insights
              </h3>
              <div className="space-y-2">
                {analysis.insights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Recommended Actions
              </h3>
              <div className="space-y-2">
                {analysis.recommendations.map((rec: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="font-medium">{rec.title}</span>
                    <Badge variant={rec.priority === 'High' ? 'destructive' : 'secondary'}>
                      {rec.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
