
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Tags, 
  Sparkles,
  Plus,
  X,
  Check,
  Zap,
  Brain,
  Target,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TagSuggestion {
  tag: string;
  confidence: number;
  category: 'topic' | 'skill' | 'type' | 'difficulty' | 'format';
  reason: string;
}

interface SmartTaggingProps {
  className?: string;
}

export const SmartTagging: React.FC<SmartTaggingProps> = ({ className }) => {
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<TagSuggestion[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadPopularTags();
  }, []);

  const loadPopularTags = () => {
    const mockPopularTags = [
      'JavaScript', 'React', 'TypeScript', 'CSS', 'HTML',
      'Node.js', 'Python', 'API', 'Database', 'Frontend',
      'Backend', 'Tutorial', 'Tips', 'Best Practices', 'Performance'
    ];
    setPopularTags(mockPopularTags);
  };

  const analyzeContent = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some content to analyze for tags.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock AI analysis
      const mockSuggestions: TagSuggestion[] = [
        {
          tag: 'React',
          confidence: 95,
          category: 'topic',
          reason: 'Content discusses React components and hooks'
        },
        {
          tag: 'Frontend',
          confidence: 88,
          category: 'type',
          reason: 'Focuses on user interface development'
        },
        {
          tag: 'JavaScript',
          confidence: 82,
          category: 'skill',
          reason: 'Code examples use JavaScript syntax'
        },
        {
          tag: 'Intermediate',
          confidence: 76,
          category: 'difficulty',
          reason: 'Requires prior knowledge of basic concepts'
        },
        {
          tag: 'Tutorial',
          confidence: 70,
          category: 'format',
          reason: 'Step-by-step instructional content'
        },
        {
          tag: 'Hooks',
          confidence: 65,
          category: 'topic',
          reason: 'Mentions useState and useEffect patterns'
        }
      ];

      setSuggestedTags(mockSuggestions);
      
      toast({
        title: "Analysis Complete!",
        description: `Found ${mockSuggestions.length} tag suggestions.`,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags(prev => [...prev, customTag.trim()]);
      setCustomTag('');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'topic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'skill': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'type': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'difficulty': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const applySuggestedTags = () => {
    const highConfidenceTags = suggestedTags
      .filter(s => s.confidence >= 70)
      .map(s => s.tag)
      .filter(tag => !selectedTags.includes(tag));
    
    setSelectedTags(prev => [...prev, ...highConfidenceTags]);
    
    toast({
      title: "Tags Applied!",
      description: `Added ${highConfidenceTags.length} high-confidence tags.`,
    });
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tags className="h-5 w-5 text-primary" />
            Smart Tagging
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Content Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Content to Analyze</label>
            <Textarea
              placeholder="Paste your content here for AI tag suggestions..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              onClick={analyzeContent}
              disabled={isAnalyzing || !content.trim()}
              className="w-full gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="h-4 w-4 animate-pulse" />
                  Analyzing Content...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analyze & Suggest Tags
                </>
              )}
            </Button>
          </div>

          {/* AI Suggestions */}
          {suggestedTags.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">AI Tag Suggestions</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={applySuggestedTags}
                  className="gap-1"
                >
                  <Zap className="h-3 w-3" />
                  Apply All
                </Button>
              </div>
              
              <div className="space-y-2">
                {suggestedTags.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Badge className={getCategoryColor(suggestion.category)}>
                        {suggestion.category}
                      </Badge>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{suggestion.tag}</span>
                          <span className={`text-sm font-medium ${getConfidenceColor(suggestion.confidence)}`}>
                            {suggestion.confidence}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={selectedTags.includes(suggestion.tag) ? "default" : "outline"}
                      onClick={() => {
                        if (selectedTags.includes(suggestion.tag)) {
                          removeTag(suggestion.tag);
                        } else {
                          addTag(suggestion.tag);
                        }
                      }}
                      className="gap-1"
                    >
                      {selectedTags.includes(suggestion.tag) ? (
                        <>
                          <Check className="h-3 w-3" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3" />
                          Add
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Tags */}
          <div className="space-y-3">
            <h3 className="font-medium">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      removeTag(tag);
                    } else {
                      addTag(tag);
                    }
                  }}
                  className="gap-1 h-auto py-1 px-2 text-xs"
                >
                  {selectedTags.includes(tag) ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Plus className="h-3 w-3" />
                  )}
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Tag Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Add Custom Tag</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter custom tag..."
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
                className="flex-1"
              />
              <Button
                onClick={addCustomTag}
                disabled={!customTag.trim()}
                size="sm"
                className="gap-1"
              >
                <Plus className="h-3 w-3" />
                Add
              </Button>
            </div>
          </div>

          {/* Selected Tags */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Selected Tags ({selectedTags.length})</h3>
              {selectedTags.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTags([])}
                  className="gap-1"
                >
                  <X className="h-3 w-3" />
                  Clear All
                </Button>
              )}
            </div>
            
            {selectedTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 pr-1"
                  >
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(tag)}
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No tags selected. Add some tags to organize your content.
              </p>
            )}
          </div>

          {/* Stats */}
          {selectedTags.length > 0 && (
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">Tagging Stats</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Tags:</span>
                  <span className="ml-2 font-medium">{selectedTags.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Suggested:</span>
                  <span className="ml-2 font-medium">
                    {selectedTags.filter(tag => suggestedTags.some(s => s.tag === tag)).length}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🏷️ Tagging Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• AI analyzes content to suggest relevant tags automatically</li>
              <li>• Use a mix of broad and specific tags for better organization</li>
              <li>• Higher confidence scores indicate more accurate suggestions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
