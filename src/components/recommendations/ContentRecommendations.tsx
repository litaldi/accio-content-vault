
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContentItem {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  readTime: number;
  url?: string;
  relevanceScore: number;
  type: 'trending' | 'related' | 'unread' | 'similar';
}

interface ContentRecommendationsProps {
  currentContentId?: string;
  userTags?: string[];
  maxRecommendations?: number;
}

const ContentRecommendations: React.FC<ContentRecommendationsProps> = ({
  currentContentId,
  userTags = [],
  maxRecommendations = 6
}) => {
  const [recommendations, setRecommendations] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from your API
  const mockRecommendations: ContentItem[] = [
    {
      id: '1',
      title: 'Advanced React Patterns for Large Applications',
      summary: 'Learn about compound components, render props, and custom hooks for scalable apps.',
      tags: ['React', 'JavaScript', 'Architecture'],
      readTime: 8,
      relevanceScore: 0.95,
      type: 'trending'
    },
    {
      id: '2',
      title: 'Building Accessible Web Applications',
      summary: 'Complete guide to WCAG compliance and inclusive design principles.',
      tags: ['Accessibility', 'Web Development', 'UX'],
      readTime: 12,
      relevanceScore: 0.88,
      type: 'related'
    },
    {
      id: '3',
      title: 'TypeScript Best Practices for Teams',
      summary: 'Improve code quality and developer experience with these TypeScript patterns.',
      tags: ['TypeScript', 'Best Practices', 'Team'],
      readTime: 6,
      relevanceScore: 0.82,
      type: 'similar'
    },
    {
      id: '4',
      title: 'Modern CSS Layout Techniques',
      summary: 'Master Grid, Flexbox, and Container Queries for responsive design.',
      tags: ['CSS', 'Layout', 'Responsive'],
      readTime: 10,
      relevanceScore: 0.75,
      type: 'unread'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchRecommendations = async () => {
      setLoading(true);
      // Filter and sort based on relevance and user preferences
      const filtered = mockRecommendations
        .filter(item => item.id !== currentContentId)
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, maxRecommendations);
      
      setTimeout(() => {
        setRecommendations(filtered);
        setLoading(false);
      }, 800);
    };

    fetchRecommendations();
  }, [currentContentId, maxRecommendations]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trending': return <TrendingUp className="h-3 w-3" />;
      case 'unread': return <Eye className="h-3 w-3" />;
      default: return <Sparkles className="h-3 w-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trending': return 'bg-orange-500/10 text-orange-600';
      case 'related': return 'bg-blue-500/10 text-blue-600';
      case 'similar': return 'bg-green-500/10 text-green-600';
      case 'unread': return 'bg-purple-500/10 text-purple-600';
      default: return 'bg-gray-500/10 text-gray-600';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-5 bg-muted rounded w-12"></div>
                  <div className="h-5 bg-muted rounded w-16"></div>
                </div>
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
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="group p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${getTypeColor(item.type)} flex items-center gap-1 text-xs`}
                >
                  {getTypeIcon(item.type)}
                  {item.type}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {item.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 2}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.readTime}m
                </div>
              </div>
            </div>
          ))}
          
          <Button variant="outline" size="sm" className="w-full mt-4" asChild>
            <Link to="/discover">
              View All Recommendations
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentRecommendations;
