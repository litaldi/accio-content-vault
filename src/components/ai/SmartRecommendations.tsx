
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';
import { SavedContent } from '@/types';
import { smartRecommendationService } from '@/services/smartRecommendationService';

interface SmartRecommendationsProps {
  currentContent?: SavedContent;
  allContent: SavedContent[];
  onContentClick: (content: SavedContent) => void;
  className?: string;
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  currentContent,
  allContent,
  onContentClick,
  className
}) => {
  console.log('SmartRecommendations rendering');
  
  const recommendations = currentContent 
    ? smartRecommendationService.generateRecommendations(currentContent, allContent)
    : [];
  
  const trendingContent = smartRecommendationService.getTrendingContent(allContent);

  if (recommendations.length === 0 && trendingContent.length === 0) {
    return (
      <div className={className}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recommendations available yet. Add more content to get personalized suggestions.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      {recommendations.length > 0 && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec, index) => (
              <div
                key={`rec-${rec.content.id}-${index}`}
                className="p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                onClick={() => onContentClick(rec.content)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm line-clamp-1">
                    {rec.content.title}
                  </h4>
                  <Badge variant="outline" className="text-xs ml-2">
                    {Math.round(rec.score)}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {rec.reason}
                </p>
                <div className="flex flex-wrap gap-1">
                  {rec.content.tags.slice(0, 3).map((tag) => (
                    <Badge key={`tag-${tag.id}`} variant="secondary" className="text-xs">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {trendingContent.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Trending
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingContent.map((content) => (
              <div
                key={`trending-${content.id}`}
                className="p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                onClick={() => onContentClick(content)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm line-clamp-1">
                    {content.title}
                  </h4>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {content.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {content.tags.slice(0, 3).map((tag) => (
                    <Badge key={`trending-tag-${tag.id}`} variant="secondary" className="text-xs">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
