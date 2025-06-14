
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { SavedContent } from '@/types';
import { smartRecommendationService } from '@/services/smartRecommendationService';

interface ContentRecommendationsProps {
  currentContent?: SavedContent;
  allContent?: SavedContent[];
  maxItems?: number;
  onContentClick?: (content: SavedContent) => void;
  className?: string;
}

export const ContentRecommendations: React.FC<ContentRecommendationsProps> = ({
  currentContent,
  allContent = [],
  maxItems = 3,
  onContentClick,
  className
}) => {
  const recommendations = currentContent 
    ? smartRecommendationService.generateRecommendations(currentContent, allContent)
        .slice(0, maxItems)
    : [];

  const trendingContent = smartRecommendationService.getTrendingContent(allContent)
    .slice(0, maxItems);

  if (recommendations.length === 0 && trendingContent.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Add more content to get personalized recommendations
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {recommendations.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              For You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec, index) => (
              <div
                key={`rec-${rec.content.id}-${index}`}
                className="group p-3 rounded-lg border hover:bg-accent/50 cursor-pointer transition-all"
                onClick={() => onContentClick?.(rec.content)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {rec.content.title}
                  </h4>
                  <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                    {Math.round(rec.score)}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {rec.reason}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {rec.content.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag.id} variant="secondary" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {trendingContent.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Trending
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingContent.map((content) => (
              <div
                key={`trending-${content.id}`}
                className="group p-3 rounded-lg border hover:bg-accent/50 cursor-pointer transition-all"
                onClick={() => onContentClick?.(content)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {content.title}
                  </h4>
                  <TrendingUp className="h-4 w-4 text-green-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {content.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {content.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag.id} variant="secondary" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(content.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
