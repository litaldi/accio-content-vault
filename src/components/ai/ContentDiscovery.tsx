
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Compass, 
  Star,
  ExternalLink,
  Bookmark,
  RefreshCw,
  Filter,
  Zap,
  TrendingUp,
  Clock,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiscoveredContent {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'tool' | 'resource';
  relevanceScore: number;
  source: string;
  estimatedReadTime: string;
  tags: string[];
  aiReason: string;
}

interface ContentDiscoveryProps {
  className?: string;
}

export const ContentDiscovery: React.FC<ContentDiscoveryProps> = ({ className }) => {
  const [discoveries, setDiscoveries] = useState<DiscoveredContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'popular'>('relevance');
  const { toast } = useToast();

  useEffect(() => {
    discoverContent();
  }, []);

  const discoverContent = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockDiscoveries: DiscoveredContent[] = [
        {
          id: '1',
          title: 'Advanced React Patterns You Should Know',
          description: 'Deep dive into compound components, render props, and custom hooks patterns',
          url: 'https://example.com/react-patterns',
          type: 'article',
          relevanceScore: 95,
          source: 'React Blog',
          estimatedReadTime: '12 min',
          tags: ['react', 'patterns', 'advanced'],
          aiReason: 'Matches your React learning path and skill level'
        },
        {
          id: '2',
          title: 'TypeScript Mastery Course',
          description: 'Complete guide to advanced TypeScript features and best practices',
          url: 'https://example.com/typescript-course',
          type: 'course',
          relevanceScore: 88,
          source: 'TypeScript Academy',
          estimatedReadTime: '4 hours',
          tags: ['typescript', 'course', 'advanced'],
          aiReason: 'Identified as a skill gap in your learning analytics'
        },
        {
          id: '3',
          title: 'Modern CSS Grid Layouts',
          description: 'Learn to build complex layouts with CSS Grid and Flexbox',
          url: 'https://example.com/css-grid',
          type: 'video',
          relevanceScore: 82,
          source: 'CSS Tricks',
          estimatedReadTime: '25 min',
          tags: ['css', 'layout', 'frontend'],
          aiReason: 'Complements your frontend development interests'
        },
        {
          id: '4',
          title: 'Productivity Tools for Developers',
          description: 'Essential tools and workflows to boost your development productivity',
          url: 'https://example.com/dev-tools',
          type: 'tool',
          relevanceScore: 75,
          source: 'Dev Tools Weekly',
          estimatedReadTime: '8 min',
          tags: ['productivity', 'tools', 'workflow'],
          aiReason: 'Based on your productivity content preferences'
        }
      ];

      setDiscoveries(mockDiscoveries);
      
      toast({
        title: "New Content Discovered!",
        description: "AI found personalized content recommendations for you.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const types = ['all', ...Array.from(new Set(discoveries.map(d => d.type)))];
  
  const filteredDiscoveries = discoveries
    .filter(d => selectedType === 'all' || d.type === selectedType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'relevance': return b.relevanceScore - a.relevanceScore;
        case 'recent': return a.id.localeCompare(b.id);
        default: return b.relevanceScore - a.relevanceScore;
      }
    });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return '📄';
      case 'video': return '🎥';
      case 'course': return '🎓';
      case 'tool': return '🔧';
      default: return '📚';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'video': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'course': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'tool': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const saveContent = async (content: DiscoveredContent) => {
    toast({
      title: "Content Saved!",
      description: `"${content.title}" has been added to your collection.`,
    });
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            Content Discovery
            <Badge variant="secondary">AI-Curated</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              onClick={discoverContent}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Discovering...
                </>
              ) : (
                <>
                  <Compass className="h-4 w-4" />
                  Discover New Content
                </>
              )}
            </Button>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-sm border rounded"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-sm border rounded"
            >
              <option value="relevance">Most Relevant</option>
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* Discovery Results */}
          <div className="space-y-4">
            {filteredDiscoveries.map((content) => (
              <Card key={content.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getTypeIcon(content.type)}</span>
                          <h3 className="font-semibold">{content.title}</h3>
                          <Badge className={getTypeColor(content.type)} variant="outline">
                            {content.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{content.relevanceScore}%</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{content.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {content.source}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {content.estimatedReadTime}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {content.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="p-2 bg-muted/50 rounded text-xs">
                        <div className="flex items-start gap-1">
                          <Zap className="h-3 w-3 text-primary mt-0.5" />
                          <span><strong>Why this is relevant:</strong> {content.aiReason}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => saveContent(content)}
                      className="gap-1"
                    >
                      <Bookmark className="h-3 w-3" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => window.open(content.url, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Discovery Stats */}
          <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Discovery Insights</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{discoveries.length}</div>
                <div className="text-xs text-muted-foreground">Items Found</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">92%</div>
                <div className="text-xs text-muted-foreground">Relevance Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-xs text-muted-foreground">New Skills</div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🔍 Discovery Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• AI analyzes your interests and skill gaps to find relevant content</li>
              <li>• Higher relevance scores indicate better matches to your learning goals</li>
              <li>• Save interesting content to build your personalized knowledge base</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
