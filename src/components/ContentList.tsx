
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SavedContent } from '@/types';
import { Clock, ExternalLink, Star, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentListProps {
  contents: SavedContent[];
  searchQuery?: string;
  onContentClick?: (content: SavedContent) => void;
  className?: string;
}

const ContentList: React.FC<ContentListProps> = ({
  contents,
  searchQuery,
  onContentClick,
  className
}) => {
  if (contents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          {searchQuery ? 'No results found for your search.' : 'No content saved yet.'}
        </div>
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search terms or browse all content.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {contents.map((content) => (
        <Card 
          key={content.id}
          className="group cursor-pointer hover:shadow-md transition-all duration-200"
          onClick={() => onContentClick?.(content)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                {content.title}
              </CardTitle>
              {content.is_favorite && (
                <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0 ml-2" />
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {content.description && (
              <p className="text-muted-foreground line-clamp-3">
                {content.description}
              </p>
            )}
            
            {content.tags && content.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {content.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag.id} variant="secondary" className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
                {content.tags.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{content.tags.length - 4}
                  </Badge>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(content.created_at).toLocaleDateString()}</span>
                </div>
                
                {content.reading_time && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{content.reading_time} min read</span>
                  </div>
                )}
                
                {content.content_type && (
                  <Badge variant="outline" className="text-xs capitalize">
                    {content.content_type}
                  </Badge>
                )}
              </div>
              
              {content.url && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(content.url, '_blank');
                  }}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentList;
