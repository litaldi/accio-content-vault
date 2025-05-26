
import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Save, Link, FileText, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QuickCaptureData {
  title: string;
  content: string;
  url?: string;
  type: 'note' | 'link' | 'idea';
}

export const QuickCaptureWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [captureData, setCaptureData] = useState<QuickCaptureData>({
    title: '',
    content: '',
    type: 'note'
  });
  const [isSaving, setIsSaving] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Keyboard shortcut to open quick capture (Ctrl/Cmd + Shift + C)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        setIsOpen(true);
        setIsExpanded(true);
      }
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus title input when opened
  useEffect(() => {
    if (isExpanded && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isExpanded]);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setIsExpanded(true), 100);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setTimeout(() => {
      setIsOpen(false);
      setCaptureData({ title: '', content: '', type: 'note' });
    }, 200);
  };

  const handleSave = async () => {
    if (!captureData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your content",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call - in real app, this would save to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage as demo
      const savedItems = JSON.parse(localStorage.getItem('quickCapturedItems') || '[]');
      const newItem = {
        ...captureData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      savedItems.unshift(newItem);
      localStorage.setItem('quickCapturedItems', JSON.stringify(savedItems));

      toast({
        title: "Content saved!",
        description: `Your ${captureData.type} has been captured successfully.`,
      });
      
      handleClose();
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Unable to save content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'link': return Link;
      case 'idea': return Lightbulb;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'link': return 'bg-blue-500';
      case 'idea': return 'bg-purple-500';
      default: return 'bg-green-500';
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={handleOpen}
        size="lg"
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg",
          "bg-primary hover:bg-primary/90 transition-all duration-300",
          "hover:scale-110 active:scale-95"
        )}
        aria-label="Quick capture content"
      >
        <Plus className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-200"
        onClick={handleClose}
      />
      
      <Card className={cn(
        "relative w-full max-w-lg transition-all duration-200",
        isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Quick Capture</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Type selector */}
          <div className="flex gap-2 mb-4">
            {(['note', 'link', 'idea'] as const).map((type) => {
              const Icon = getTypeIcon(type);
              const isSelected = captureData.type === type;
              
              return (
                <Button
                  key={type}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCaptureData(prev => ({ ...prev, type }))}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-3 w-3" />
                  <span className="capitalize">{type}</span>
                </Button>
              );
            })}
          </div>

          <div className="space-y-4">
            <Input
              ref={titleRef}
              placeholder="Enter a title..."
              value={captureData.title}
              onChange={(e) => setCaptureData(prev => ({ ...prev, title: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleSave();
                }
              }}
            />
            
            {captureData.type === 'link' && (
              <Input
                placeholder="Paste URL here..."
                value={captureData.url || ''}
                onChange={(e) => setCaptureData(prev => ({ ...prev, url: e.target.value }))}
              />
            )}
            
            <Textarea
              placeholder="Add details, notes, or thoughts..."
              value={captureData.content}
              onChange={(e) => setCaptureData(prev => ({ ...prev, content: e.target.value }))}
              className="min-h-[100px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleSave();
                }
              }}
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <Badge variant="outline" className="text-xs">
              ⌨️ Ctrl+Shift+C to open • Ctrl+Enter to save
            </Badge>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickCaptureWidget;
