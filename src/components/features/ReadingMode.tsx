
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  X, 
  Settings, 
  ZoomIn, 
  ZoomOut,
  Moon,
  Sun,
  Type,
  Bookmark,
  Share
} from 'lucide-react';

interface ReadingModeProps {
  isOpen: boolean;
  onClose: () => void;
  content?: {
    title: string;
    url?: string;
    content: string;
    tags: string[];
    readingTime?: number;
  };
}

export const ReadingMode: React.FC<ReadingModeProps> = ({ 
  isOpen, 
  onClose, 
  content 
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontFamily, setFontFamily] = useState('serif');

  if (!isOpen || !content) return null;

  const fontFamilies = [
    { value: 'serif', label: 'Serif', className: 'font-serif' },
    { value: 'sans', label: 'Sans', className: 'font-sans' },
    { value: 'mono', label: 'Mono', className: 'font-mono' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-medium">Reading Mode</span>
            {content.readingTime && (
              <Badge variant="outline">
                {content.readingTime} min read
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Font Size Controls */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm w-8 text-center">{fontSize}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            {/* Font Family */}
            <div className="flex gap-1 ml-2">
              {fontFamilies.map(font => (
                <Button
                  key={font.value}
                  variant={fontFamily === font.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFontFamily(font.value)}
                >
                  <Type className="h-4 w-4" />
                </Button>
              ))}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="ml-2"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Actions */}
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white'} min-h-screen`}>
        <div className="max-w-3xl mx-auto px-6 py-8">
          <article
            className={`
              prose prose-lg max-w-none
              ${fontFamilies.find(f => f.value === fontFamily)?.className}
              ${isDarkMode ? 'prose-invert' : ''}
            `}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
          >
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
              
              {content.url && (
                <p className="text-sm text-muted-foreground mb-4">
                  Source: <a href={content.url} className="underline">{content.url}</a>
                </p>
              )}
              
              {content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {content.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>
            
            <div 
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </article>
        </div>
      </div>
    </div>
  );
};

// Hook for easy reading mode usage
export const useReadingMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<any>(null);

  const openReadingMode = (contentData: any) => {
    setContent(contentData);
    setIsOpen(true);
  };

  const closeReadingMode = () => {
    setIsOpen(false);
    setContent(null);
  };

  return {
    isOpen,
    content,
    openReadingMode,
    closeReadingMode,
    ReadingModeComponent: () => (
      <ReadingMode
        isOpen={isOpen}
        onClose={closeReadingMode}
        content={content}
      />
    )
  };
};
