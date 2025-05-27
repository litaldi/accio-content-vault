
import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  X, 
  Save, 
  Link, 
  FileText, 
  Lightbulb, 
  Upload,
  Mic,
  Check,
  Sparkles,
  Tag,
  FolderOpen,
  ExternalLink
} from 'lucide-react';
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
  type: 'note' | 'link' | 'idea' | 'file';
  tags?: string[];
  collection?: string;
}

interface AISuggestion {
  type: 'tag' | 'collection' | 'related';
  value: string;
  confidence: number;
}

export const EnhancedQuickCaptureWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [captureData, setCaptureData] = useState<QuickCaptureData>({
    title: '',
    content: '',
    type: 'note'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [savedItemId, setSavedItemId] = useState<string | null>(null);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  
  const titleRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Auto-save draft functionality
  useEffect(() => {
    if (captureData.title || captureData.content) {
      const timer = setTimeout(() => {
        localStorage.setItem('quickCaptureDraft', JSON.stringify(captureData));
        setIsDraftSaved(true);
        setTimeout(() => setIsDraftSaved(false), 2000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [captureData]);

  // Load draft on open
  useEffect(() => {
    if (isOpen && !captureData.title && !captureData.content) {
      const draft = localStorage.getItem('quickCaptureDraft');
      if (draft) {
        try {
          const parsedDraft = JSON.parse(draft);
          setCaptureData(parsedDraft);
        } catch (error) {
          console.error('Failed to load draft:', error);
        }
      }
    }
  }, [isOpen, captureData.title, captureData.content]);

  // Keyboard shortcut to open quick capture (Ctrl/Cmd + Shift + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        handleOpen();
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
      setAiSuggestions([]);
      setSavedItemId(null);
      localStorage.removeItem('quickCaptureDraft');
    }, 200);
  };

  const generateAISuggestions = async (data: QuickCaptureData) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis - in real app, this would call your AI service
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const suggestions: AISuggestion[] = [
      { type: 'tag', value: 'productivity', confidence: 0.9 },
      { type: 'tag', value: 'ideas', confidence: 0.8 },
      { type: 'collection', value: 'Work Notes', confidence: 0.85 },
      { type: 'related', value: 'Similar note from last week', confidence: 0.7 }
    ];
    
    setAiSuggestions(suggestions);
    setIsAnalyzing(false);
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const savedItemId = Date.now().toString();
      setSavedItemId(savedItemId);
      
      // Save to localStorage as demo
      const savedItems = JSON.parse(localStorage.getItem('quickCapturedItems') || '[]');
      const newItem = {
        ...captureData,
        id: savedItemId,
        createdAt: new Date().toISOString(),
      };
      savedItems.unshift(newItem);
      localStorage.setItem('quickCapturedItems', JSON.stringify(savedItems));

      // Generate AI suggestions after save
      await generateAISuggestions(captureData);

      localStorage.removeItem('quickCaptureDraft');

      toast({
        title: "Content saved!",
        description: `Your ${captureData.type} has been captured successfully.`,
      });
      
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCaptureData(prev => ({ 
        ...prev, 
        type: 'file',
        title: prev.title || file.name,
        content: prev.content || `Uploaded file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`
      }));
    }
  };

  const detectContentType = (input: string) => {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (urlRegex.test(input)) {
      setCaptureData(prev => ({ ...prev, type: 'link', url: input }));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'link': return Link;
      case 'idea': return Lightbulb;
      case 'file': return Upload;
      default: return FileText;
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
        aria-label="Quick capture content (Ctrl+Shift+S)"
      >
        <Plus className="h-6 w-6" />
      </Button>
    );
  }

  if (savedItemId && aiSuggestions.length > 0) {
    // Success state with AI suggestions
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-200"
          onClick={handleClose}
        />
        
        <Card className={cn(
          "relative w-full max-w-lg transition-all duration-200",
          "opacity-100 scale-100"
        )}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-600">Content Saved!</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {isAnalyzing ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span>AI is analyzing your content...</span>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      AI Suggestions
                    </h4>
                    <div className="space-y-2">
                      {aiSuggestions.filter(s => s.type === 'tag').length > 0 && (
                        <div>
                          <span className="text-sm text-muted-foreground">Suggested tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {aiSuggestions.filter(s => s.type === 'tag').map((suggestion, index) => (
                              <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                <Tag className="h-2 w-2 mr-1" />
                                {suggestion.value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {aiSuggestions.filter(s => s.type === 'collection').length > 0 && (
                        <div>
                          <span className="text-sm text-muted-foreground">Suggested collection:</span>
                          <div className="mt-1">
                            {aiSuggestions.filter(s => s.type === 'collection').map((suggestion, index) => (
                              <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                <FolderOpen className="h-2 w-2 mr-1" />
                                {suggestion.value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Item
                    </Button>
                    <Button onClick={handleClose}>
                      Done
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
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
            <div className="flex items-center gap-2">
              {isDraftSaved && (
                <Badge variant="outline" className="text-xs animate-pulse">
                  Draft saved
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Type selector */}
          <div className="flex gap-2 mb-4">
            {(['note', 'link', 'idea', 'file'] as const).map((type) => {
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
              onChange={(e) => {
                const value = e.target.value;
                setCaptureData(prev => ({ ...prev, title: value }));
                if (value && !captureData.content) {
                  detectContentType(value);
                }
              }}
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

            {captureData.type === 'file' && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Choose File
                </Button>
              </div>
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
              ⌨️ Ctrl+Shift+S to open • Ctrl+Enter to save
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

export default EnhancedQuickCaptureWidget;
