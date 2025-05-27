
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, BookOpen, Star } from 'lucide-react';

interface Recommendation {
  id: number;
  title: string;
  type: string;
  relevanceScore: number;
  reason: string;
  readingTime: string;
  category: string;
  tags: string[];
  source: string;
  difficulty: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return '📄';
      case 'course': return '🎓';
      case 'video': return '🎥';
      case 'research': return '🔬';
      default: return '📝';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="text-2xl">{getTypeIcon(recommendation.type)}</div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h5 className="font-medium">{recommendation.title}</h5>
              <Badge variant="outline" className="ml-2">
                {recommendation.relevanceScore}% match
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">{recommendation.reason}</p>
            
            <div className="flex items-center gap-2 mb-3">
              {recommendation.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {recommendation.readingTime}
                </span>
                <span>{recommendation.source}</span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${getDifficultyColor(recommendation.difficulty)}`}></div>
                  <span>{recommendation.difficulty}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm">
                  <BookOpen className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Star className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
