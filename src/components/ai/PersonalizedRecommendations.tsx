
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  Star,
  ArrowRight,
  RefreshCw,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'trending' | 'similar' | 'skill-gap' | 'follow-up';
  relevanceScore: number;
  timeToRead: string;
  tags: string[];
  source?: string;
}

interface PersonalizedRecommendationsProps {
  userInterests?: string[];
  recentContent?: string[];
  className?: string;
}

export const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  userInterests = [],
  recentContent = [],
  className
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    generateRecommendations();
  }, [userInterests, recentContent]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      // Simulate AI recommendation generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          title: 'Advanced React Patterns for 2024',
          description: 'Explore compound components, render props, and modern React patterns.',
          type: 'trending',
          relevanceScore: 0.95,
          timeToRead: '8 min read',
          tags: ['react', 'javascript', 'patterns'],
          source: 'Based on your React interest'
        },
        {
          id: '2',
          title: 'TypeScript Best Practices Guide',
          description: 'Level up your TypeScript skills with advanced typing techniques.',
          type: 'skill-gap',
          relevanceScore: 0.88,
          timeToRead: '12 min read',
          tags: ['typescript', 'programming', 'best-practices']
        },
        {
          id: '3',
          title: 'Building Accessible Web Components',
          description: 'Learn to create inclusive UI components with proper ARIA support.',
          type: 'similar',
          relevanceScore: 0.82,
          timeToRead: '6 min read',
          tags: ['accessibility', 'web', 'components'],
          source: 'Similar to your recent saves'
        },
        {
          id: '4',
          title: 'API Design Principles and REST Best Practices',
          description: 'Master API design with practical examples and real-world patterns.',
          type: 'follow-up',
          relevanceScore: 0.79,
          timeToRead: '10 min read',
          tags: ['api', 'backend', 'design'],
          source: 'Follow-up to your API content'
        },
        {
          id: '5',
          title: 'Modern CSS Grid and Flexbox Techniques',
          description: 'Advanced layout techniques for responsive web design.',
          type: 'trending',
          relevanceScore: 0.76,
          timeToRead: '7 min read',
          tags: ['css', 'layout', 'responsive']
        }
      ];

      setRecommendations(mockRecommendations);
      
      toast({
        title: "Recommendations Updated!",
        description: `Found ${mockRecommendations.length} personalized recommendations for you.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trending': return <TrendingUp className="h-4 w-4" />;
      case 'similar': return <Star className="h-4 w-4" />;
      case 'skill-gap': return <Target className="h-4 w-4" />;
      case 'follow-up': return <ArrowRight className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trending': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'similar': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'skill-gap': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'follow-up': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredRecommendations = selectedType === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === selectedType);

  const typeFilters = [
    { key: 'all', label: 'All Recommendations' },
    { key: 'trending', label: 'Trending' },
    { key: 'similar', label: 'Similar Content' },
    { key: 'skill-gap', label: 'Skill Building' },
    { key: 'follow-up', label: 'Follow-ups' }
  ];

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Personalized Recommendations
              <Badge variant="secondary">AI-Powered</Badge>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={generateRecommendations}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((filter) => (
              <Button
                key={filter.key}
                variant={selectedType === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(filter.key)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Recommendations List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Generating recommendations...</span>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRecommendations.map((rec) => (
                <Card key={rec.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm mb-1">{rec.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                        </div>
                        <div className="ml-3 text-right">
                          <div className="text-xs text-muted-foreground mb-1">
                            {Math.round(rec.relevanceScore * 100)}% match
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {rec.timeToRead}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(rec.type)}>
                            {getTypeIcon(rec.type)}
                            <span className="ml-1 capitalize">{rec.type.replace('-', ' ')}</span>
                          </Badge>
                          <div className="flex gap-1">
                            {rec.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button size="sm" variant="ghost">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {rec.source && (
                        <div className="text-xs text-muted-foreground italic">
                          {rec.source}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredRecommendations.length === 0 && (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No recommendations available. Save more content to get personalized suggestions!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
