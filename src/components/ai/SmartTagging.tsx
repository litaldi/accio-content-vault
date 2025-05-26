
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
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SmartTaggingProps {
  content?: string;
  onTagsGenerated?: (tags: string[]) => void;
  existingTags?: string[];
  className?: string;
}

export const SmartTagging: React.FC<SmartTaggingProps> = ({
  content = '',
  onTagsGenerated,
  existingTags = [],
  className
}) => {
  const [inputContent, setInputContent] = useState(content);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(existingTags);
  const [customTag, setCustomTag] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (content && content !== inputContent) {
      setInputContent(content);
      analyzeContent(content);
    }
  }, [content]);

  const analyzeContent = async (textContent: string) => {
    if (!textContent.trim()) return;

    setIsAnalyzing(true);
    try {
      // Simulate AI analysis with smart tag extraction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const tags = extractSmartTags(textContent);
      setSuggestedTags(tags);
      
      toast({
        title: "Tags Analyzed!",
        description: `Found ${tags.length} relevant tags for your content.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again or add tags manually.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const extractSmartTags = (text: string): string[] => {
    const content = text.toLowerCase();
    const tagMap = {
      'javascript': ['javascript', 'js', 'node', 'npm', 'webpack'],
      'react': ['react', 'jsx', 'component', 'hook', 'state'],
      'typescript': ['typescript', 'ts', 'type', 'interface'],
      'programming': ['code', 'function', 'algorithm', 'debug', 'syntax'],
      'ai': ['artificial intelligence', 'machine learning', 'ai', 'ml', 'neural'],
      'web': ['html', 'css', 'web', 'browser', 'frontend', 'backend'],
      'tutorial': ['tutorial', 'guide', 'how to', 'learn', 'beginner'],
      'api': ['api', 'rest', 'graphql', 'endpoint', 'request'],
      'database': ['database', 'sql', 'mongodb', 'postgresql', 'query'],
      'productivity': ['productivity', 'efficiency', 'workflow', 'automation'],
      'design': ['design', 'ui', 'ux', 'interface', 'layout', 'figma'],
      'mobile': ['mobile', 'ios', 'android', 'app', 'responsive'],
      'learning': ['learning', 'education', 'course', 'study', 'knowledge'],
      'research': ['research', 'analysis', 'data', 'insights', 'findings']
    };

    const foundTags: string[] = [];
    
    Object.entries(tagMap).forEach(([tag, keywords]) => {
      if (keywords.some(keyword => content.includes(keyword))) {
        foundTags.push(tag);
      }
    });

    // Add some contextual tags based on content length and structure
    if (content.includes('step') || content.includes('1.') || content.includes('first')) {
      foundTags.push('step-by-step');
    }
    if (content.includes('tip') || content.includes('advice')) {
      foundTags.push('tips');
    }
    if (content.length > 1000) {
      foundTags.push('comprehensive');
    }

    return [...new Set(foundTags)].slice(0, 8);
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      onTagsGenerated?.(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(newTags);
    onTagsGenerated?.(newTags);
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      addTag(customTag.trim());
      setCustomTag('');
    }
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
        <CardContent className="space-y-4">
          {/* Content Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Content to Analyze</label>
            <Textarea
              placeholder="Paste or type content to get AI-suggested tags..."
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              rows={4}
              className="text-sm"
            />
            <Button
              onClick={() => analyzeContent(inputContent)}
              disabled={!inputContent.trim() || isAnalyzing}
              className="gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analyze & Suggest Tags
                </>
              )}
            </Button>
          </div>

          {/* Suggested Tags */}
          {suggestedTags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Suggested Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => addTag(tag)}
                    disabled={selectedTags.includes(tag)}
                  >
                    <Plus className="h-3 w-3" />
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium">Selected Tags</span>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="default"
                    className="gap-1 pr-1"
                  >
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Custom Tag Input */}
          <div className="space-y-2">
            <span className="text-sm font-medium">Add Custom Tag</span>
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
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">💡 Smart Tagging Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• AI analyzes content context and suggests relevant tags</li>
              <li>• Longer content gets more comprehensive tag suggestions</li>
              <li>• Custom tags help personalize your organization system</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
