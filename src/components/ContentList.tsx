
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SavedContent, Tag } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { File, FileText, Image, Link, Sparkles } from 'lucide-react';
import { SummaryButton } from './summaries/SummaryButton';
import ContentDetailView from './ContentDetailView';

interface ContentListProps {
  contents: SavedContent[];
  searchQuery?: string;
}

const ContentList: React.FC<ContentListProps> = ({ contents, searchQuery }) => {
  const [selectedContent, setSelectedContent] = useState<SavedContent | null>(null);

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

  const handleCardClick = (content: SavedContent) => {
    setSelectedContent(content);
  };

  const getContentText = (content: SavedContent) => {
    return [content.title, content.description].filter(Boolean).join(' ');
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
        <Card 
          key={content.id} 
          className="overflow-hidden card-hover cursor-pointer" 
          onClick={() => handleCardClick(content)}
        >
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
                  <div className="flex items-center gap-2 flex-1">
                    {renderContentIcon(content)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="line-clamp-2 flex-1">
                          {content.url ? (
                            <span className="hover:text-primary transition-colors">
                              {searchQuery 
                                ? highlightText(content.title, searchQuery) 
                                : content.title}
                            </span>
                          ) : (
                            <span>
                              {searchQuery 
                                ? highlightText(content.title, searchQuery) 
                                : content.title}
                            </span>
                          )}
                        </CardTitle>
                        <div className="ml-2" onClick={(e) => e.stopPropagation()}>
                          <SummaryButton 
                            contentId={content.id}
                            contentText={getContentText(content)}
                            size="sm"
                            variant="ghost"
                          />
                        </div>
                      </div>
                      <CardDescription className="text-xs mt-1 flex items-center gap-2">
                        {formatDistanceToNow(new Date(content.created_at), { addSuffix: true })}
                        {content.file_size && (
                          <span className="ml-2">
                            {(content.file_size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        )}
                        {content.has_summary && (
                          <span className="flex items-center gap-1 text-primary">
                            <Sparkles className="h-3 w-3" />
                            Summary
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
      
      {selectedContent && (
        <ContentDetailView 
          content={selectedContent}
          isOpen={!!selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  );
};

export default ContentList;
