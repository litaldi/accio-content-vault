
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SavedContent, Tag, SearchResult } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { File, FileText, Image, Link } from 'lucide-react';

interface ContentListProps {
  contents: SavedContent[];
  searchQuery?: string;
}

const ContentList: React.FC<ContentListProps> = ({ contents, searchQuery }) => {
  // Helper function to highlight search term in text
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? <mark key={index} className="bg-yellow-200">{part}</mark> : part
    );
  };

  const renderContentIcon = (content: SavedContent) => {
    if (content.file_type === 'pdf') {
      return <FileText className="h-6 w-6 text-primary" />;
    } else if (content.file_type === 'image') {
      return <Image className="h-6 w-6 text-primary" />;
    } else {
      return <Link className="h-6 w-6 text-primary" />;
    }
  };

  if (contents.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No content saved yet.</p>
        {searchQuery && (
          <p className="mt-2">Try a different search term or save some new content!</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contents.map((content) => (
        <Card key={content.id} className="overflow-hidden card-hover">
          <div className="flex flex-col md:flex-row">
            {content.image_url && !content.file_type && (
              <div className="md:w-1/4">
                <img 
                  src={content.image_url} 
                  alt={content.title} 
                  className="h-48 md:h-full w-full object-cover"
                />
              </div>
            )}
            
            {content.file_type === 'image' && content.file_url && (
              <div className="md:w-1/4">
                <img 
                  src={content.file_url} 
                  alt={content.title} 
                  className="h-48 md:h-full w-full object-cover"
                />
              </div>
            )}
            
            <div className={`flex-1 ${(content.image_url || (content.file_type === 'image' && content.file_url)) ? 'md:w-3/4' : 'w-full'}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {renderContentIcon(content)}
                    <div>
                      <CardTitle className="line-clamp-2">
                        {content.url ? (
                          <a 
                            href={content.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            {searchQuery 
                              ? highlightText(content.title, searchQuery) 
                              : content.title}
                          </a>
                        ) : (
                          <span>
                            {searchQuery 
                              ? highlightText(content.title, searchQuery) 
                              : content.title}
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                        {content.file_size && (
                          <span className="ml-2">
                            {(content.file_size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3 line-clamp-2 text-muted-foreground">
                  {searchQuery 
                    ? highlightText(content.description, searchQuery) 
                    : content.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {content.tags.map((tag: Tag) => (
                    <span key={tag.id} className="tag">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ContentList;
