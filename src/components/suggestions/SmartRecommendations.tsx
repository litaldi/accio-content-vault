
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ExternalLink } from 'lucide-react';

interface SmartRecommendationsProps {
  allContent: any[];
  onContentClick: (content: any) => void;
  maxRecommendations?: number;
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  allContent,
  onContentClick,
  maxRecommendations = 3
}) => {
  // Simple recommendation logic - get recent items with common tags
  const recommendations = allContent
    .filter(item => item.tags && item.tags.length > 0)
    .slice(0, maxRecommendations);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5" />
          Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.length > 0 ? (
          <>
            {recommendations.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => onContentClick(item)}
              >
                <h4 className="font-medium text-sm mb-1 line-clamp-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags?.slice(0, 2).map((tag: any) => (
                      <Badge key={tag.id} variant="outline" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recommendations available yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};
