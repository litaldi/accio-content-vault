
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, ExternalLink, FileText, Image, Check, Tag as TagIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SavedContent, Tag as TagType } from '@/types';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
  searchResults: { content: SavedContent; score?: number }[];
  searchQuery: string;
  onTagsChange: (contentId: string, tags: TagType[]) => void;
  onTagConfirmRequest?: (tag: TagType) => void;
}

const SearchResults = ({ 
  searchResults, 
  searchQuery, 
  onTagsChange, 
  onTagConfirmRequest 
}: SearchResultsProps) => {
  // No results state
  if (searchResults.length === 0 && searchQuery) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-medium mb-1">No results found</h3>
        <p className="text-muted-foreground">Try a different search term or browse all content</p>
      </div>
    );
  }

  const getFileIcon = (fileType?: string) => {
    if (fileType === 'image') return <Image className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  const handleTagClick = (tag: TagType, contentId: string) => {
    // If the tag is auto-generated and not confirmed yet, show confirmation dialog
    if (tag.auto_generated && !tag.confirmed && onTagConfirmRequest) {
      onTagConfirmRequest(tag);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {searchResults.map(({ content, score }) => (
        <Card key={content.id} className={cn("h-full flex flex-col", 
          score && score > 0.8 && "border-primary/30 dark:border-primary/20"
        )}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg line-clamp-2">
              {content.title || 'Untitled Content'}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              {format(new Date(content.created_at), 'MMM d, yyyy')}
              
              {score && (
                <Badge variant="outline" className="ml-auto">
                  Match: {Math.round(score * 100)}%
                </Badge>
              )}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-2 flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
              {content.description || 'No description provided.'}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {content.tags.map((tag) => (
                <Badge 
                  key={tag.id} 
                  variant={tag.auto_generated && !tag.confirmed ? "outline" : "default"}
                  className={cn(
                    "cursor-pointer group",
                    tag.auto_generated && !tag.confirmed && "border-yellow-500 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300"
                  )}
                  onClick={() => handleTagClick(tag, content.id)}
                >
                  {tag.auto_generated && !tag.confirmed && (
                    <TagIcon className="h-3 w-3 mr-1 text-yellow-600 dark:text-yellow-400" />
                  )}
                  {tag.name}
                  {tag.auto_generated && !tag.confirmed && onTagConfirmRequest && (
                    <span className="ml-1 text-xs opacity-70 group-hover:opacity-100">
                      (Verify?)
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex gap-2 flex-wrap">
            {content.url && (
              <Button variant="outline" size="sm" asChild>
                <a href={content.url} target="_blank" rel="noopener noreferrer">
                  <span className="inline-flex items-center">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Open Original
                  </span>
                </a>
              </Button>
            )}
            
            {content.file_url && (
              <Button variant="outline" size="sm" asChild>
                <a href={content.file_url} target="_blank" rel="noopener noreferrer">
                  <span className="inline-flex items-center">
                    {getFileIcon(content.file_type)}
                    <span className="ml-2">View {content.file_type || 'file'}</span>
                  </span>
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
