
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  X, 
  BookOpen, 
  Type, 
  Moon, 
  Sun, 
  Maximize2, 
  Minimize2,
  Clock,
  Eye
} from 'lucide-react';
import { SavedContent } from '@/types';
import { SummaryDisplay } from '@/components/summaries/SummaryDisplay';

interface DistractionFreeModeProps {
  content: SavedContent;
  isOpen: boolean;
  onClose: () => void;
}

export const DistractionFreeMode: React.FC<DistractionFreeModeProps> = ({
  content,
  isOpen,
  onClose
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(() => {
        setReadingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' && e.ctrlKey) {
        e.preventDefault();
        setFontSize(prev => Math.min(prev + 2, 24));
      } else if (e.key === '-' && e.ctrlKey) {
        e.preventDefault();
        setFontSize(prev => Math.max(prev - 2, 12));
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose]);

  const formatReadingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const estimatedReadingTime = Math.ceil((content.description?.length || 0) / 1000); // ~200 WPM

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`max-w-4xl w-full h-[90vh] p-0 ${isFullscreen ? 'max-w-none w-screen h-screen' : ''} ${
          isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white'
        }`}
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <DialogTitle className="text-lg font-medium line-clamp-1">
              {content.title}
            </DialogTitle>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Reading Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mr-4">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatReadingTime(readingTime)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                ~{estimatedReadingTime}m read
              </span>
            </div>
            
            {/* Controls */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSummary(!showSummary)}
              className="h-8 w-8 p-0"
            >
              <BookOpen className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
              className="h-8 w-8 p-0"
            >
              <Type className="h-3 w-3" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFontSize(prev => Math.min(prev + 2, 24))}
              className="h-8 w-8 p-0"
            >
              <Type className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="h-8 w-8 p-0"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-8 w-8 p-0"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          <ScrollArea className="flex-1 p-6">
            <div 
              className="max-w-3xl mx-auto leading-relaxed"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
            >
              {/* Metadata */}
              <div className="mb-6 pb-4 border-b">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {content.tags.map(tag => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Saved on {new Date(content.created_at).toLocaleDateString()}
                  {content.url && (
                    <>
                      {' • '}
                      <a 
                        href={content.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        View Original
                      </a>
                    </>
                  )}
                </p>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none">
                {content.description && (
                  <div className="whitespace-pre-wrap">
                    {content.description}
                  </div>
                )}
                
                {!content.description && (
                  <div className="text-center text-muted-foreground py-8">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No content text available for this item.</p>
                    {content.url && (
                      <p className="mt-2">
                        <a 
                          href={content.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Visit the original source
                        </a>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>

          {/* Summary Sidebar */}
          {showSummary && (
            <div className="w-80 border-l p-4 bg-muted/30">
              <SummaryDisplay
                contentId={content.id}
                contentText={content.description || content.title}
                className="h-fit"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
