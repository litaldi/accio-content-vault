
import React, { useState, useEffect } from 'react';
import { X, Type, Moon, Sun, Bookmark, Share2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface ReadingModeProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    id: string;
    title: string;
    content: string;
    url?: string;
    tags?: string[];
    estimatedReadTime?: number;
  };
}

const ReadingMode: React.FC<ReadingModeProps> = ({ isOpen, onClose, content }) => {
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-semibold text-lg">{content.title}</h1>
            {content.estimatedReadTime && (
              <p className="text-sm text-muted-foreground">
                {content.estimatedReadTime} min read
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Font Size Control */}
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <Slider
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              max={24}
              min={12}
              step={1}
              className="w-20"
            />
          </div>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <article>
          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {content.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none"
            style={{ fontSize: `${fontSize}px`, lineHeight: '1.7' }}
            dangerouslySetInnerHTML={{ __html: content.content }}
          />

          {/* Source Link */}
          {content.url && (
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Original source: <a href={content.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{content.url}</a>
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default ReadingMode;
