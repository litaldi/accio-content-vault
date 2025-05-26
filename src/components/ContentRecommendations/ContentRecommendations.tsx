
import React, { useState, useEffect } from 'react';
import { Sparkles, ExternalLink, Heart, Clock, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { SavedContent } from '@/types';

interface ContentRecommendationsProps {
  currentContent?: SavedContent;
  maxItems?: number;
  className?: string;
}

interface RecommendedContent {
  id: string;
  title: string;
  url: string;
  summary: string;
  tags: string[];
  relevanceScore: number;
  reason: 'similar_tags' | 'recent_activity' | 'trending' | 'related_topic';
  createdAt: string;
}

const mockRecommendations: RecommendedContent[] = [
  {
    id: '1',
    title: 'Advanced React Patterns You Should Know',
    url: 'https://example.com/react-patterns',
    summary: 'Learn about compound components, render props, and custom hooks to build more maintainable React applications.',
    tags: ['react', 'javascript', 'patterns'],
    relevanceScore: 0.92,
    reason: 'similar_tags',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'TypeScript Best Practices for Large Applications',
    url: 'https://example.com/typescript-best-practices',
    summary: 'Essential TypeScript patterns and configurations for scaling your codebase effectively.',
    tags: ['typescript', 'javascript', 'architecture'],
    relevanceScore: 0.88,
    reason: 'related_topic',
    createdAt: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    title: 'Building Accessible Web Components',
    url: 'https://example.com/accessible-components',
    summary: 'A comprehensive guide to creating inclusive web components with proper ARIA attributes.',
    tags: ['accessibility', 'web-components', 'html'],
    relevanceScore: 0.85,
    reason: 'trending',
    createdAt: '2024-01-13T09:20:00Z',
  },
  {
    id: '4',
    title: 'Modern CSS Layout Techniques',
    url: 'https://example.com/css-layout',
    summary: 'Master CSS Grid, Flexbox, and Container Queries for responsive web design.',
    tags: ['css', 'layout', 'responsive'],
    relevanceScore: 0.82,
    reason: 'recent_activity',
    createdAt: '2024-01-12T14:10:00Z',
  },
];

const getReasonLabel = (reason: RecommendedContent['reason']) => {
  switch (reason) {
    case 'similar_tags':
      return 'Similar topics';
    case 'recent_activity':
      return 'Based on recent activity';
    case 'trending':
      return 'Trending';
    case 'related_topic':
      return 'Related content';
    default:
      return 'Recommended';
  }
};

const getReasonIcon = (reason: RecommendedContent['reason']) => {
  switch (reason) {
    case 'similar_tags':
      return Tag;
    case 'recent_activity':
      return Clock;
    case 'trending':
      return Sparkles;
    case 'related_topic':
      return Heart;
    default:
      return Sparkles;
  }
};

export const ContentRecommendations: React.FC<ContentRecommendationsProps> = ({
  currentContent,
  maxItems = 4,
  className,
}) => {
  const [recommendations, setRecommendations] = useState<RecommendedContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for recommendations
    const fetchRecommendations = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter and sort recommendations based on current content
      let filteredRecs = [...mockRecommendations];
      
      if (currentContent) {
        // Boost relevance for content with similar tags
        filteredRecs = filteredRecs.map(rec => {
          const commonTags = rec.tags.filter(tag => 
            currentContent.tags?.some(currentTag => 
              currentTag.toLowerCase().includes(tag.toLowerCase())
            )
          ).length;
          
          return {
            ...rec,
            relevanceScore: rec.relevanceScore + (commonTags * 0.1),
          };
        });
      }
      
      // Sort by relevance and limit
      filteredRecs.sort((a, b) => b.relevanceScore - a.relevanceScore);
      setRecommendations(filteredRecs.slice(0, maxItems));
      setIsLoading(false);
    };

    fetchRecommendations();
  }, [currentContent, maxItems]);

  const handleItemClick = (recommendation: RecommendedContent) => {
    // Track click for analytics
    console.log('Recommendation clicked:', recommendation.id);
    
    // Open in new tab
    window.open(recommendation.url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="flex gap-1">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No recommendations available yet.</p>
            <p className="text-sm">Save more content to get personalized suggestions!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((recommendation) => {
          const ReasonIcon = getReasonIcon(recommendation.reason);
          
          return (
            <div
              key={recommendation.id}
              className="group cursor-pointer p-3 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 transition-all duration-200"
              onClick={() => handleItemClick(recommendation)}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {recommendation.title}
                </h4>
                <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {recommendation.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {recommendation.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                  {recommendation.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                      +{recommendation.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ReasonIcon className="h-3 w-3" />
                  <span>{getReasonLabel(recommendation.reason)}</span>
                </div>
              </div>
            </div>
          );
        })}
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-2 text-xs"
          onClick={() => console.log('View all recommendations')}
        >
          View All Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentRecommendations;
