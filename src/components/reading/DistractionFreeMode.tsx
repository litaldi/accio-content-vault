
import React, { useState, useEffect } from 'react';
import { X, Maximize2, Minimize2, Eye, EyeOff, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SavedContent } from '@/types';

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState('text-base');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Track reading progress
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      const container = document.getElementById('reading-content');
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    const container = document.getElementById('reading-content');
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const cycleFontSize = () => {
    const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      {/* Reading Progress Bar */}
      {showProgress && (
        <div className="h-1 bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold truncate max-w-md">{content.title}</h1>
          <Badge variant="outline" className="text-xs">
            {Math.round(readingProgress)}% read
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProgress(!showProgress)}
            className="h-8 w-8 p-0"
          >
            {showProgress ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleFontSize}
            className="h-8 w-8 p-0"
          >
            <span className="text-xs font-bold">Aa</span>
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
            onClick={toggleFullscreen}
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
      </div>

      {/* Reading Content */}
      <div 
        id="reading-content"
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-4xl mx-auto px-8 py-12">
          <article className={`prose prose-lg max-w-none ${isDarkMode ? 'prose-invert' : ''} ${fontSize}`}>
            <header className="mb-8">
              <h1 className="mb-4">{content.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span>Added {new Date(content.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span>{content.source}</span>
                {content.tags.length > 0 && (
                  <>
                    <span>•</span>
                    <div className="flex gap-1">
                      {content.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </header>
            
            <div className="leading-relaxed">
              <p className="text-lg mb-6">{content.description}</p>
              
              {/* Simulated content - in real app this would be the actual content */}
              <p>
                This is where the full content would be displayed in a clean, distraction-free format. 
                The reading mode provides optimal typography, spacing, and focus for an immersive reading experience.
              </p>
              
              <p>
                Features include:
              </p>
              
              <ul>
                <li>Customizable font sizes for comfortable reading</li>
                <li>Dark mode for low-light environments</li>
                <li>Progress tracking to see how much you've read</li>
                <li>Fullscreen mode for maximum immersion</li>
                <li>Keyboard shortcuts for quick navigation</li>
              </ul>
              
              <p>
                The content is presented with optimal line spacing, margins, and typography 
                to reduce eye strain and enhance comprehension during extended reading sessions.
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span><kbd className="px-1 bg-gray-100 dark:bg-gray-800 rounded">Esc</kbd> Exit</span>
          <span><kbd className="px-1 bg-gray-100 dark:bg-gray-800 rounded">F11</kbd> Fullscreen</span>
          <span><kbd className="px-1 bg-gray-100 dark:bg-gray-800 rounded">A</kbd> Font Size</span>
          <span><kbd className="px-1 bg-gray-100 dark:bg-gray-800 rounded">D</kbd> Dark Mode</span>
        </div>
      </div>
    </div>
  );
};
