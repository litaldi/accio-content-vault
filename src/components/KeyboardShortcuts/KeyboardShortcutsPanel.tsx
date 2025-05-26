
import React, { useState, useEffect } from 'react';
import { Keyboard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Shortcut {
  key: string;
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  // Navigation
  { key: '/', description: 'Focus search', category: 'Navigation' },
  { key: 'g d', description: 'Go to dashboard', category: 'Navigation' },
  { key: 'g s', description: 'Go to search', category: 'Navigation' },
  { key: 'g c', description: 'Go to collections', category: 'Navigation' },
  { key: 'g a', description: 'Go to analytics', category: 'Navigation' },
  
  // Actions
  { key: 'Ctrl+Shift+C', description: 'Quick capture', category: 'Actions' },
  { key: 'n', description: 'New content', category: 'Actions' },
  { key: 'Ctrl+K', description: 'Command palette', category: 'Actions' },
  { key: 'Ctrl+S', description: 'Save current item', category: 'Actions' },
  
  // Interface
  { key: '?', description: 'Show keyboard shortcuts', category: 'Interface' },
  { key: 'Esc', description: 'Close modal/panel', category: 'Interface' },
  { key: 'Ctrl+/', description: 'Toggle sidebar', category: 'Interface' },
  
  // Content
  { key: 'j/k', description: 'Navigate items', category: 'Content' },
  { key: 'Enter', description: 'Open selected item', category: 'Content' },
  { key: 'Space', description: 'Quick preview', category: 'Content' },
  { key: 'f', description: 'Toggle favorite', category: 'Content' },
  { key: 'r', description: 'Refresh content', category: 'Content' },
];

interface KeyboardShortcutsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsPanel: React.FC<KeyboardShortcutsPanelProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = Array.from(new Set(shortcuts.map(s => s.category)));

  const formatKey = (key: string) => {
    return key.split('+').map((part, index, array) => (
      <React.Fragment key={part}>
        <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border">
          {part}
        </kbd>
        {index < array.length - 1 && <span className="mx-1">+</span>}
      </React.Fragment>
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <Card className={cn(
        "relative w-full max-w-2xl max-h-[80vh] overflow-hidden",
        "transition-all duration-200 opacity-100 scale-100"
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            <CardTitle>Keyboard Shortcuts</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="overflow-y-auto max-h-[60vh]">
          {categories.map((category, categoryIndex) => (
            <div key={category}>
              {categoryIndex > 0 && <Separator className="my-4" />}
              
              <div className="mb-3">
                <Badge variant="outline" className="text-xs font-medium">
                  {category}
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4">
                {shortcuts
                  .filter(shortcut => shortcut.category === category)
                  .map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {formatKey(shortcut.key)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <div className="font-medium">Pro tip:</div>
              <div>
                Most shortcuts work globally. Press <kbd className="px-1 py-0.5 text-xs bg-background rounded">?</kbd> anywhere to open this panel.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyboardShortcutsPanel;
