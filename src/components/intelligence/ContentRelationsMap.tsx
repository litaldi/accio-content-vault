
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Network, 
  Link, 
  Eye, 
  Filter, 
  Maximize2,
  Tags,
  Calendar,
  Globe
} from 'lucide-react';
import { SavedContent } from '@/types';
import { contentIntelligenceService } from '@/services/contentIntelligenceService';

interface ContentRelationsMapProps {
  content: SavedContent[];
  selectedContent?: SavedContent;
  onContentSelect?: (content: SavedContent) => void;
  className?: string;
}

export const ContentRelationsMap: React.FC<ContentRelationsMapProps> = ({
  content,
  selectedContent,
  onContentSelect,
  className
}) => {
  const [relations, setRelations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'semantic' | 'temporal' | 'tag-based' | 'url-domain'>('all');
  const [minRelevance, setMinRelevance] = useState(0.3);

  useEffect(() => {
    if (selectedContent && content.length > 1) {
      findRelations();
    }
  }, [selectedContent, content, filterType, minRelevance]);

  const findRelations = async () => {
    if (!selectedContent) return;
    
    setIsLoading(true);
    try {
      const analysis = await contentIntelligenceService.analyzeContent(selectedContent, content);
      let filteredRelations = analysis.relatedContent;
      
      // Apply filters
      if (filterType !== 'all') {
        filteredRelations = filteredRelations.filter((relation: any) => relation.linkType === filterType);
      }
      
      filteredRelations = filteredRelations.filter((relation: any) => relation.relevanceScore >= minRelevance);
      
      setRelations(filteredRelations);
    } catch (error) {
      console.error('Error finding relations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRelationIcon = (linkType: string) => {
    switch (linkType) {
      case 'semantic': return <Network className="h-3 w-3" />;
      case 'temporal': return <Calendar className="h-3 w-3" />;
      case 'tag-based': return <Tags className="h-3 w-3" />;
      case 'url-domain': return <Globe className="h-3 w-3" />;
      default: return <Link className="h-3 w-3" />;
    }
  };

  const getRelationColor = (linkType: string) => {
    switch (linkType) {
      case 'semantic': return 'bg-purple-100 text-purple-800 dark:bg-purple-900';
      case 'temporal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900';
      case 'tag-based': return 'bg-green-100 text-green-800 dark:bg-green-900';
      case 'url-domain': return 'bg-orange-100 text-orange-800 dark:bg-orange-900';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900';
    }
  };

  if (!selectedContent) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            Content Relations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Network className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Select Content to View Relations</h3>
            <p className="text-sm text-muted-foreground">
              Choose a content item to see its connections and relationships
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            Relations for "{selectedContent.title}"
            {relations.length > 0 && (
              <Badge variant="secondary">{relations.length}</Badge>
            )}
          </div>
          <Button variant="ghost" size="sm">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
          </div>
          {(['all', 'semantic', 'temporal', 'tag-based', 'url-domain'] as const).map((type) => (
            <Button
              key={type}
              variant={filterType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType(type)}
              className="text-xs h-7"
            >
              {type === 'all' ? 'All' : type.replace('-', ' ')}
            </Button>
          ))}
        </div>

        {/* Relations List */}
        {isLoading ? (
          <div className="flex items-center gap-2 py-4">
            <Network className="h-4 w-4 animate-pulse" />
            <span>Finding content relations...</span>
          </div>
        ) : relations.length > 0 ? (
          <div className="space-y-3">
            {relations.map((relation, index) => {
              const relatedItem = content.find(item => item.id === relation.targetId);
              if (!relatedItem) return null;
              
              return (
                <div key={index} className="border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-sm truncate">{relatedItem.title}</h4>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {Math.round(relation.relevanceScore * 100)}%
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {relatedItem.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getRelationColor(relation.linkType)}`}>
                          {getRelationIcon(relation.linkType)}
                          <span className="ml-1">{relation.linkType.replace('-', ' ')}</span>
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {relation.linkReason}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0"
                        onClick={() => onContentSelect?.(relatedItem)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Link className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <Network className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <h3 className="font-medium mb-1">No Relations Found</h3>
            <p className="text-sm text-muted-foreground">
              {filterType === 'all' 
                ? 'This content doesn\'t have strong connections to other items'
                : `No ${filterType.replace('-', ' ')} connections found`
              }
            </p>
            {filterType !== 'all' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => setFilterType('all')}
              >
                Show All Relations
              </Button>
            )}
          </div>
        )}

        {/* Relevance threshold */}
        <div className="border-t pt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Min. relevance:</span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={minRelevance}
                onChange={(e) => setMinRelevance(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-xs">{Math.round(minRelevance * 100)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
