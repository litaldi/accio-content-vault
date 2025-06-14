
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, ExternalLink, Clock, Share, Bookmark } from 'lucide-react';

interface ReadingModeContent {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  estimatedReadTime?: number;
  url?: string;
}

interface ReadingModeProps {
  isOpen: boolean;
  onClose: () => void;
  content: ReadingModeContent | null;
}

const ReadingMode: React.FC<ReadingModeProps> = ({
  isOpen,
  onClose,
  content
}) => {
  if (!content) return null;

  const handleShare = () => {
    if (navigator.share && content.url) {
      navigator.share({
        title: content.title,
        url: content.url
      });
    } else if (content.url) {
      navigator.clipboard.writeText(content.url);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <DialogTitle className="text-xl leading-tight mb-2">
                {content.title}
              </DialogTitle>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {content.estimatedReadTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{content.estimatedReadTime} min read</span>
                  </div>
                )}
                
                {content.tags && content.tags.length > 0 && (
                  <div className="flex gap-1">
                    {content.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              
              {content.url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={content.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-6 py-4">
          <div 
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ReadingMode;
