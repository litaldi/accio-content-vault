
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Star,
  Clock,
  Target,
  Brain,
  ArrowRight
} from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  type: 'article' | 'course' | 'video' | 'book';
  relevanceScore: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  reason: string;
  tags: string[];
}

export const AIContentRecommendations: React.FC = () => {
  const [recommendations] = useState<Recommendation[]>([
    {
      id: '1',
      title: 'Advanced React Patterns for Scalable Applications',
      type: 'article',
      relevanceScore: 95,
      difficulty: 'advanced',
      estimatedTime: '15 min read',
      reason: 'Based on your recent React learning progress',
      tags: ['React', 'Architecture', 'Patterns']
    },
    {
      id: '2',
      title: 'TypeScript Best Practices Masterclass',
      type: 'course',
      relevanceScore: 88,
      difficulty: 'intermediate',
      estimatedTime: '2 hours',
      reason: 'Complements your JavaScript knowledge',
      tags: ['TypeScript', 'Best Practices', 'Development']
    },
    {
      id: '3',
      title: 'Building Scalable APIs with Node.js',
      type: 'video',
      relevanceScore: 82,
      difficulty: 'intermediate',
      estimatedTime: '45 min',
      reason: 'Fills gap in your backend knowledge',
      tags: ['Node.js', 'API', 'Backend']
    }
  ]);

  const getTypeIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'course': return Target;
      case 'video': return TrendingUp;
      case 'book': return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: Recommendation['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Content Recommendations
            <Badge variant="secondary">Smart Discovery</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recommendations List */}
          <div className="space-y-4">
            {recommendations.map((rec) => {
              const TypeIcon = getTypeIcon(rec.type);
              return (
                <Card key={rec.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <TypeIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{rec.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {rec.type}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(rec.difficulty)}`}>
                              {rec.difficulty}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {rec.estimatedTime}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                          <div className="flex flex-wrap gap-1">
                            {rec.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{rec.relevanceScore}%</span>
                        </div>
                        <Progress value={rec.relevanceScore} className="w-16 h-1" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Brain className="h-3 w-3" />
                        AI matched based on your learning patterns
                      </div>
                      <Button size="sm">
                        <ArrowRight className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Insights */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-4 w-4 text-primary" />
                <h4 className="font-medium">AI Discovery Insights</h4>
              </div>
              <ul className="space-y-1 text-sm">
                <li>• AI analyzed your learning history to find relevant content</li>
                <li>• Recommendations updated daily based on your progress</li>
                <li>• Difficulty levels matched to your current skill level</li>
                <li>• Content gaps automatically identified and filled</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
