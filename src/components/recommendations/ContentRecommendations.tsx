
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, TrendingUp, Clock } from 'lucide-react';
import { SavedContent } from '@/types';
import { Link } from 'react-router-dom';

interface ContentRecommendationsProps {
  currentContent?: SavedContent;
  maxItems?: number;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'trending' | 'related' | 'discover' | 'continue';
  confidence: number;
  tags: string[];
  estimatedReadTime?: number;
  url?: string;
}

const ContentRecommendations: React.FC<ContentRecommendationsProps> = ({
  currentContent,
  maxItems = 5
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateRecommendations();
  }, [currentContent, maxItems]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate AI-powered recommendation generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        title: 'Advanced React Patterns You Should Know',
        description: 'Explore compound components, render props, and custom hooks for scalable React applications.',
        type: 'related',
        confidence: 0.95,
        tags: ['React', 'JavaScript', 'Patterns'],
        estimatedReadTime: 12,
        url: '#'
      },
      {
        id: '2',
        title: 'AI-Powered Development Tools in 2024',
        description: 'Discover the latest AI tools that are transforming how developers write and debug code.',
        type: 'trending',
        confidence: 0.88,
        tags: ['AI', 'Development', 'Tools'],
        estimatedReadTime: 8,
        url: '#'
      },
      {
        id: '3',
        title: 'Building Accessible Web Applications',
        description: 'Complete guide to WCAG 2.1 compliance and creating inclusive user experiences.',
        type: 'discover',
        confidence: 0.82,
        tags: ['Accessibility', 'Web', 'UX'],
        estimatedReadTime: 15,
        url: '#'
      },
      {
        id: '4',
        title: 'TypeScript Best Practices for Large Projects',
        description: 'Learn advanced TypeScript techniques for maintaining large-scale applications.',
        type: 'related',
        confidence: 0.90,
        tags: ['TypeScript', 'Architecture', 'Best Practices'],
        estimatedReadTime: 10,
        url: '#'
      },
      {
        id: '5',
        title: 'Modern CSS Layout Techniques',
        description: 'Master CSS Grid, Flexbox, and Container Queries for responsive design.',
        type: 'continue',
        confidence: 0.75,
        tags: ['CSS', 'Layout', 'Responsive'],
        estimatedReadTime: 6,
        url: '#'
      }
    ];
    
    setRecommendations(mockRecommendations.slice(0, maxItems));
    setIsLoading(false);
  };

  const getTypeIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'trending':
        return <TrendingUp className="h-4 w-4 text-orange-500" />;
      case 'related':
        return <Sparkles className="h-4 w-4 text-purple-500" />;
      case 'discover':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'continue':
        return <Clock className="h-4 w-4 text-green-500" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: Recommendation['type']) => {
    switch (type) {
      case 'trending':
        return 'Trending';
      case 'related':
        return 'Related';
      case 'discover':
        return 'Discover';
      case 'continue':
        return 'Continue Reading';
      default:
        return 'Recommended';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-spin" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Recommendations
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Personalized suggestions based on your interests
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="group border rounded-lg p-3 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(rec.type)}
                  <Badge variant="secondary" className="text-xs">
                    {getTypeLabel(rec.type)}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.round(rec.confidence * 100)}% match
                </div>
              </div>
              
              <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                {rec.title}
              </h4>
              
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {rec.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {rec.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {rec.estimatedReadTime && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {rec.estimatedReadTime}m
                  </div>
                )}
              </div>
              
              <Button variant="ghost" size="sm" className="w-full mt-2 h-8" asChild>
                <Link to={rec.url || '#'}>
                  Read Now
                </Link>
              </Button>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4" onClick={generateRecommendations}>
          <Sparkles className="h-4 w-4 mr-2" />
          Refresh Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentRecommendations;
