
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';

interface RecommendationItem {
  id: string;
  title: string;
  reason: string;
  tags: string[];
  estimatedReadTime?: number;
}

interface ContentRecommendationsProps {
  maxItems?: number;
}

const ContentRecommendations: React.FC<ContentRecommendationsProps> = ({
  maxItems = 5
}) => {
  // Mock recommendations - in real app, this would come from an API
  const recommendations: RecommendationItem[] = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      reason: 'Based on your recent React searches',
      tags: ['React', 'JavaScript', 'Patterns'],
      estimatedReadTime: 8
    },
    {
      id: '2',
      title: 'TypeScript Best Practices',
      reason: 'Popular in your network',
      tags: ['TypeScript', 'Development'],
      estimatedReadTime: 12
    },
    {
      id: '3',
      title: 'Design System Guidelines',
      reason: 'Trending in tech',
      tags: ['Design', 'UI/UX'],
      estimatedReadTime: 15
    }
  ].slice(0, maxItems);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recommendations.map((item) => (
          <div key={item.id} className="space-y-2 border-b pb-4 last:border-b-0 last:pb-0">
            <h4 className="font-medium text-sm leading-tight">{item.title}</h4>
            
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {item.reason}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {item.estimatedReadTime && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.estimatedReadTime}m
                </div>
              )}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-2">
              View Article
            </Button>
          </div>
        ))}
        
        <Button variant="ghost" className="w-full mt-4">
          See All Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentRecommendations;
