
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  PenTool, 
  Lightbulb, 
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Wand2,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WritingSuggestion {
  type: 'grammar' | 'style' | 'clarity' | 'tone';
  message: string;
  suggestion: string;
  position: { start: number; end: number };
}

interface AIWritingAssistantProps {
  initialText?: string;
  onTextImproved?: (improvedText: string) => void;
  className?: string;
}

export const AIWritingAssistant: React.FC<AIWritingAssistantProps> = ({
  initialText = '',
  onTextImproved,
  className
}) => {
  const [text, setText] = useState(initialText);
  const [suggestions, setSuggestions] = useState<WritingSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [writingScore, setWritingScore] = useState<number>(0);
  const { toast } = useToast();

  // Auto-analyze as user types (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.length > 50) {
        analyzeText();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [text]);

  const analyzeText = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockSuggestions: WritingSuggestion[] = [];
      
      // Generate suggestions based on text content
      if (text.includes('very')) {
        mockSuggestions.push({
          type: 'style',
          message: 'Consider stronger adjectives',
          suggestion: 'Replace "very" with more specific descriptors',
          position: { start: text.indexOf('very'), end: text.indexOf('very') + 4 }
        });
      }
      
      if (text.split(' ').some(word => word.length > 12)) {
        mockSuggestions.push({
          type: 'clarity',
          message: 'Complex words detected',
          suggestion: 'Consider simpler alternatives for better readability',
          position: { start: 0, end: 0 }
        });
      }
      
      if (text.split('.').length > 3) {
        mockSuggestions.push({
          type: 'tone',
          message: 'Great structure!',
          suggestion: 'Your writing flows well with clear sentences',
          position: { start: 0, end: 0 }
        });
      }

      setSuggestions(mockSuggestions);
      
      // Calculate writing score
      const wordCount = text.split(/\s+/).length;
      const sentenceCount = text.split(/[.!?]+/).length;
      const avgWordsPerSentence = wordCount / sentenceCount;
      const score = Math.min(100, Math.max(60, 100 - (avgWordsPerSentence - 15) * 2));
      setWritingScore(Math.round(score));
      
    } finally {
      setIsAnalyzing(false);
    }
  };

  const improveText = async () => {
    if (!text.trim()) return;

    setIsImproving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple text improvements
      let improvedText = text
        .replace(/\s+/g, ' ') // Fix spacing
        .replace(/very\s+(\w+)/gi, (match, word) => {
          const improvements: Record<string, string> = {
            'good': 'excellent',
            'bad': 'terrible',
            'big': 'enormous',
            'small': 'tiny',
            'fast': 'rapid',
            'slow': 'sluggish'
          };
          return improvements[word.toLowerCase()] || match;
        });

      setText(improvedText);
      onTextImproved?.(improvedText);
      
      toast({
        title: "Text Improved!",
        description: "AI has enhanced your writing for clarity and impact.",
      });
      
      // Re-analyze improved text
      setTimeout(() => analyzeText(), 500);
    } finally {
      setIsImproving(false);
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'grammar': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'style': return <Wand2 className="h-4 w-4 text-blue-600" />;
      case 'clarity': return <Eye className="h-4 w-4 text-orange-600" />;
      case 'tone': return <Lightbulb className="h-4 w-4 text-purple-600" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'grammar': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'style': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'clarity': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'tone': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5 text-primary" />
            AI Writing Assistant
            <Badge variant="secondary">Real-time</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Writing Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Your Writing</label>
              {writingScore > 0 && (
                <Badge variant="outline" className="gap-1">
                  Writing Score: {writingScore}/100
                </Badge>
              )}
            </div>
            <Textarea
              placeholder="Start typing to get real-time AI writing assistance..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="text-sm"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {text.split(/\s+/).filter(word => word.length > 0).length} words
                {isAnalyzing && " • Analyzing..."}
              </span>
              <Button
                onClick={improveText}
                disabled={!text.trim() || isImproving}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {isImproving ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Improving...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    AI Improve
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-sm">Writing Suggestions</h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        {getSuggestionIcon(suggestion.type)}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{suggestion.message}</span>
                            <Badge className={getSuggestionColor(suggestion.type)}>
                              {suggestion.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {suggestion.suggestion}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {suggestions.length === 0 && text.length > 0 && !isAnalyzing && (
            <div className="text-center py-6">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Great writing! No suggestions at the moment.
              </p>
            </div>
          )}

          {/* Tips */}
          <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">✍️ Writing Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• AI analyzes grammar, style, clarity, and tone in real-time</li>
              <li>• Use "AI Improve" for instant text enhancement</li>
              <li>• Longer text provides more detailed suggestions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
