
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  TrendingUp, 
  BookOpen, 
  Target,
  Zap,
  Eye,
  X
} from 'lucide-react';

interface Insight {
  id: string;
  type: 'pattern' | 'recommendation' | 'trend' | 'goal';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
}

export const AIInsightsWidget: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate AI-generated insights
    const mockInsights: Insight[] = [
      {
        id: '1',
        type: 'pattern',
        title: 'Learning Pattern Detected',
        description: 'You tend to save more technical content on weekdays. Consider scheduling focused learning sessions.',
        confidence: 85,
        actionable: true
      },
      {
        id: '2',
        type: 'recommendation',
        title: 'Content Gap Identified',
        description: 'Based on your React interest, you might benefit from exploring TypeScript fundamentals.',
        confidence: 92,
        actionable: true
      },
      {
        id: '3',
        type: 'trend',
        title: 'Productivity Trend',
        description: 'Your content consumption has increased 40% this month. Great momentum!',
        confidence: 100,
        actionable: false
      }
    ];

    setInsights(mockInsights);
    
    // Show widget after a delay
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'pattern': return Brain;
      case 'recommendation': return Target;
      case 'trend': return TrendingUp;
      case 'goal': return BookOpen;
      default: return Zap;
    }
  };

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'pattern': return 'bg-blue-100 text-blue-800';
      case 'recommendation': return 'bg-green-100 text-green-800';
      case 'trend': return 'bg-purple-100 text-purple-800';
      case 'goal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isVisible || insights.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-30 max-w-sm">
      <Card className="shadow-lg border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Brain className="h-4 w-4 text-primary" />
              AI Insights
              <Badge variant="secondary" className="text-xs">Live</Badge>
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.slice(0, 2).map((insight) => {
            const Icon = getInsightIcon(insight.type);
            return (
              <div key={insight.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-3 w-3" />
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getInsightColor(insight.type)}`}
                  >
                    {insight.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {insight.confidence}% confidence
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {insight.description}
                  </p>
                </div>
                {insight.actionable && (
                  <Button size="sm" variant="outline" className="w-full text-xs h-7">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                )}
              </div>
            );
          })}
          
          {insights.length > 2 && (
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View {insights.length - 2} more insights
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
