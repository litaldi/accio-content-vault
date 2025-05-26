
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SavedContent, Tag } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { File, FileText, Image, Link, Sparkles, ExternalLink, Calendar, Tag as TagIcon } from 'lucide-react';
import { SummaryButton } from './summaries/SummaryButton';
import ContentDetailView from './ContentDetailView';

interface ContentListProps {
  contents: SavedContent[];
  searchQuery?: string;
}

const ContentList: React.FC<ContentListProps> = ({ contents, searchQuery }) => {
  const [selectedContent, setSelectedContent] = useState<SavedContent | null>(null);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'url':
        return <Link className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const highlightText = (text: string, query?: string) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (contents.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <CardTitle className="mb-2">No content found</CardTitle>
          <CardDescription>
            {searchQuery 
              ? "Try adjusting your search terms or filters"
              : "Start by saving some content to your knowledge library"
            }
          </CardDescription>
          {!searchQuery && (
            <Button className="mt-4" asChild>
              <a href="/save-content">Save Your First Content</a>
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {contents.map((content) => (
          <Card 
            key={content.id} 
            className="hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => setSelectedContent(content)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">
                    {getContentIcon(content.content_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {highlightText(content.title, searchQuery)}
                    </CardTitle>
                    {content.url && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <ExternalLink className="h-3 w-3" />
                        <span className="truncate">{content.url}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {content.content_type}
                  </Badge>
                  <SummaryButton 
                    contentId={content.id} 
                    contentText={content.description || content.title || ''} 
                    size="sm" 
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {content.description && (
                <CardDescription className="mb-4 line-clamp-3">
                  {highlightText(content.description, searchQuery)}
                </CardDescription>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {content.tags?.slice(0, 3).map((tag) => (
                    <Badge 
                      key={tag.id} 
                      variant="secondary" 
                      className="text-xs"
                    >
                      <TagIcon className="h-2 w-2 mr-1" />
                      {tag.name}
                    </Badge>
                  ))}
                  {content.tags && content.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{content.tags.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedContent && (
        <ContentDetailView
          content={selectedContent}
          isOpen={!!selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </>
  );
};

export default ContentList;
