
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  PenTool, 
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Wand2,
  RefreshCw,
  BookOpen,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WritingSuggestion {
  type: 'grammar' | 'style' | 'clarity' | 'enhancement';
  text: string;
  suggestion: string;
  reason: string;
  position: { start: number; end: number };
}

interface WritingMetrics {
  readabilityScore: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
  complexityLevel: 'simple' | 'moderate' | 'complex';
}

interface AIWritingAssistantProps {
  className?: string;
}

export const AIWritingAssistant: React.FC<AIWritingAssistantProps> = ({ className }) => {
  const [content, setContent] = useState('');
  const [suggestions, setSuggestions] = useState<WritingSuggestion[]>([]);
  const [metrics, setMetrics] = useState<WritingMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTone, setSelectedTone] = useState<'professional' | 'casual' | 'academic' | 'creative'>('professional');
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content.length > 50) {
        analyzeContent();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [content]);

  const analyzeContent = async () => {
    if (!content.trim()) return;

    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock analysis
      const mockSuggestions: WritingSuggestion[] = [
        {
          type: 'grammar',
          text: 'there are many benefits',
          suggestion: 'there are numerous benefits',
          reason: 'More precise word choice',
          position: { start: 0, end: 20 }
        },
        {
          type: 'style',
          text: 'very important',
          suggestion: 'crucial',
          reason: 'Stronger, more concise language',
          position: { start: 25, end: 39 }
        },
        {
          type: 'clarity',
          text: 'it is obvious that',
          suggestion: '[remove]',
          reason: 'Unnecessary filler phrase',
          position: { start: 45, end: 62 }
        }
      ];

      const mockMetrics: WritingMetrics = {
        readabilityScore: 75,
        sentenceCount: content.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
        avgWordsPerSentence: Math.round(content.split(' ').length / Math.max(1, content.split(/[.!?]+/).filter(s => s.trim().length > 0).length)),
        complexityLevel: content.length > 500 ? 'complex' : content.length > 200 ? 'moderate' : 'simple'
      };

      setSuggestions(mockSuggestions);
      setMetrics(mockMetrics);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applySuggestion = (suggestion: WritingSuggestion) => {
    const { start, end } = suggestion.position;
    const newContent = content.substring(0, start) + 
      (suggestion.suggestion === '[remove]' ? '' : suggestion.suggestion) + 
      content.substring(end);
    
    setContent(newContent);
    setSuggestions(prev => prev.filter(s => s !== suggestion));
    
    toast({
      title: "Suggestion Applied",
      description: "Your text has been improved!",
    });
  };

  const enhanceWithAI = async () => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const enhanced = content.replace(/\b(very|really|quite)\s+/g, '')
        .replace(/\bthat\s+/g, '')
        .replace(/\bin order to\b/g, 'to');
      
      setContent(enhanced);
      toast({
        title: "Content Enhanced!",
        description: `Applied ${selectedTone} tone improvements.`,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'grammar': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'style': return <Wand2 className="h-4 w-4 text-blue-600" />;
      case 'clarity': return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      default: return <Target className="h-4 w-4 text-purple-600" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'grammar': return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
      case 'style': return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800';
      case 'clarity': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800';
      default: return 'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800';
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
        <CardContent className="space-y-6">
          {/* Tone Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Writing Tone</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: 'professional', label: 'Professional', desc: 'Business & formal' },
                { key: 'casual', label: 'Casual', desc: 'Friendly & conversational' },
                { key: 'academic', label: 'Academic', desc: 'Scholarly & precise' },
                { key: 'creative', label: 'Creative', desc: 'Engaging & expressive' }
              ].map((tone) => (
                <Button
                  key={tone.key}
                  variant={selectedTone === tone.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTone(tone.key as any)}
                  className="flex-col h-auto py-2"
                >
                  <span className="font-medium text-xs">{tone.label}</span>
                  <span className="text-xs opacity-70">{tone.desc}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Writing Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Your Text</label>
              {isAnalyzing && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 animate-spin rounded-full border border-primary border-t-transparent" />
                  Analyzing...
                </div>
              )}
            </div>
            <Textarea
              placeholder="Start writing, and I'll help you improve it in real-time..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px]"
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{content.length} characters • {content.split(' ').filter(w => w.length > 0).length} words</span>
              <Button
                onClick={enhanceWithAI}
                disabled={isAnalyzing || !content.trim()}
                size="sm"
                variant="outline"
                className="gap-1"
              >
                <Wand2 className="h-3 w-3" />
                Enhance with AI
              </Button>
            </div>
          </div>

          {/* Writing Metrics */}
          {metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">{metrics.readabilityScore}</div>
                <div className="text-xs text-muted-foreground">Readability</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{metrics.sentenceCount}</div>
                <div className="text-xs text-muted-foreground">Sentences</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{metrics.avgWordsPerSentence}</div>
                <div className="text-xs text-muted-foreground">Avg Length</div>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="text-xs">
                  {metrics.complexityLevel}
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">Complexity</div>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium">Writing Suggestions</h3>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${getSuggestionColor(suggestion.type)}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getSuggestionIcon(suggestion.type)}
                        <span className="text-sm font-medium capitalize">{suggestion.type}</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>
                          <span className="text-red-600 line-through">{suggestion.text}</span>
                          {suggestion.suggestion !== '[remove]' && (
                            <>
                              <span className="mx-2">→</span>
                              <span className="text-green-600 font-medium">{suggestion.suggestion}</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => applySuggestion(suggestion)}
                      className="gap-1"
                    >
                      <CheckCircle className="h-3 w-3" />
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Quick Improvements</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => setContent(content.replace(/\s+/g, ' '))}>
                Fix Spacing
              </Button>
              <Button variant="outline" size="sm" onClick={() => setContent(content.replace(/([.!?])\s*([a-z])/g, '$1 $2'))}>
                Fix Punctuation
              </Button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">✍️ Writing Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• AI analyzes your text as you type for real-time feedback</li>
              <li>• Choose the right tone for your audience and purpose</li>
              <li>• Apply suggestions selectively to maintain your voice</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
