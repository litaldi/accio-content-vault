
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Eye, 
  Clock,
  Target,
  Lightbulb,
  X
} from 'lucide-react';

interface Insight {
  id: string;
  type: 'trend' | 'recommendation' | 'achievement' | 'pattern';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  timestamp: Date;
}

export const AIInsightsWidget: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI generating insights
    const generateInsights = () => {
      const mockInsights: Insight[] = [
        {
          id: '1',
          type: 'trend',
          title: 'Learning Pattern Detected',
          description: 'You read 40% more AI-related content this week. Consider exploring machine learning fundamentals.',
          confidence: 87,
          actionable: true,
          timestamp: new Date()
        },
        {
          id: '2',
          type: 'recommendation',
          title: 'Knowledge Gap Identified',
          description: 'You have strong frontend skills but limited backend knowledge. Time to explore APIs?',
          confidence: 92,
          actionable: true,
          timestamp: new Date()
        },
        {
          id: '3',
          type: 'achievement',
          title: 'Reading Milestone',
          description: 'Congratulations! You\'ve maintained a 7-day reading streak.',
          confidence: 100,
          actionable: false,
          timestamp: new Date()
        }
      ];
      
      setInsights(mockInsights);
      setLoading(false);
    };

    const timer = setTimeout(generateInsights, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return TrendingUp;
      case 'recommendation': return Lightbulb;
      case 'achievement': return Target;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'trend': return 'text-blue-600';
      case 'recommendation': return 'text-purple-600';
      case 'achievement': return 'text-green-600';
      default: return 'text-primary';
    }
  };

  const dismissInsight = (id: string) => {
    setInsights(prev => prev.filter(insight => insight.id !== id));
  };

  if (!isVisible || insights.length === 0) return null;

  return (
    <Card className="fixed bottom-6 left-6 w-80 z-40 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-primary" />
            AI Insights
            <Badge variant="secondary" className="text-xs">
              {insights.length} new
            </Badge>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {loading ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm text-muted-foreground">Analyzing your patterns...</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        ) : (
          insights.slice(0, 3).map((insight) => {
            const Icon = getInsightIcon(insight.type);
            return (
              <div key={insight.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${getInsightColor(insight.type)}`} />
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissInsight(insight.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">{insight.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span>{insight.confidence}% confidence</span>
                  </div>
                  
                  {insight.actionable && (
                    <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                      Take Action
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            View All
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            <Brain className="h-3 w-3 mr-1" />
            Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
