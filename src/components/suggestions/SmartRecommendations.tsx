
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SavedContent } from '@/types';
import { Sparkles, TrendingUp, Clock, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SmartRecommendationsProps {
  currentContent?: SavedContent;
  allContent: SavedContent[];
  onContentClick: (content: SavedContent) => void;
  maxRecommendations?: number;
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  currentContent,
  allContent,
  onContentClick,
  maxRecommendations = 3
}) => {
  // Generate smart recommendations based on tags and content similarity
  const getRecommendations = (): SavedContent[] => {
    if (!currentContent) {
      // If no current content, show trending/recent content
      return allContent
        .filter(content => content.id !== currentContent?.id)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, maxRecommendations);
    }

    const currentTags = currentContent.tags.map(tag => tag.name.toLowerCase());
    
    // Score content based on tag overlap and recency
    const scoredContent = allContent
      .filter(content => content.id !== currentContent.id)
      .map(content => {
        const contentTags = content.tags.map(tag => tag.name.toLowerCase());
        const tagOverlap = currentTags.filter(tag => contentTags.includes(tag)).length;
        const recencyScore = (Date.now() - new Date(content.created_at).getTime()) / (1000 * 60 * 60 * 24); // Days ago
        
        // Higher score = better recommendation
        const score = (tagOverlap * 3) - (recencyScore * 0.1);
        
        return { content, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, maxRecommendations)
      .map(item => item.content);

    return scoredContent;
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-purple-500" />
          Smart Recommendations
        </CardTitle>
        <CardDescription>
          Content you might find interesting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((content) => (
          <div
            key={content.id}
            className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => onContentClick(content)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm line-clamp-2 flex-1">
                {content.title || 'Untitled Content'}
              </h4>
              <div className="flex items-center gap-1 ml-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
              </div>
            </div>
            
            {content.description && (
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {content.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-1">
              {content.tags.slice(0, 2).map((tag) => (
                <Badge key={tag.id} variant="secondary" className="text-xs">
                  {tag.name}
                </Badge>
              ))}
              {content.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{content.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        ))}
        
        <Button variant="ghost" size="sm" className="w-full mt-3">
          <TrendingUp className="h-4 w-4 mr-2" />
          View More Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};
