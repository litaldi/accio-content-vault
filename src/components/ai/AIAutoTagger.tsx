
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Tag, 
  Sparkles, 
  Check, 
  X,
  Brain,
  Zap
} from 'lucide-react';

export const AIAutoTagger: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<Array<{ name: string; confidence: number; applied: boolean }>>([]);

  const analyzeTags = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setSuggestedTags([
        { name: 'productivity', confidence: 92, applied: false },
        { name: 'web-development', confidence: 88, applied: false },
        { name: 'react', confidence: 85, applied: false },
        { name: 'performance', confidence: 79, applied: false },
        { name: 'tutorial', confidence: 73, applied: false },
      ]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const applyTag = (index: number) => {
    setSuggestedTags(prev => 
      prev.map((tag, i) => 
        i === index ? { ...tag, applied: true } : tag
      )
    );
  };

  const rejectTag = (index: number) => {
    setSuggestedTags(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          AI Auto-Tagger
          <Badge variant="secondary">Smart</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isAnalyzing && suggestedTags.length === 0 && (
          <div className="text-center py-4">
            <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">
              Let AI analyze your recent content and suggest relevant tags
            </p>
            <Button onClick={analyzeTags} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Analyze Content
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm">AI is analyzing your content...</span>
            </div>
            <Progress value={33} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Processing 12 recent items and identifying patterns...
            </p>
          </div>
        )}

        {suggestedTags.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Suggested Tags
            </h4>
            
            {suggestedTags.map((tag, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={tag.applied ? "default" : "outline"}
                    className={tag.applied ? "bg-green-500" : ""}
                  >
                    {tag.name}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {tag.confidence}% confidence
                  </span>
                </div>
                
                {!tag.applied && (
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => applyTag(index)}
                      className="h-6 w-6 p-0 hover:bg-green-100 hover:text-green-600"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => rejectTag(index)}
                      className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            <Button 
              className="w-full gap-2" 
              onClick={() => setSuggestedTags([])}
            >
              <Check className="h-4 w-4" />
              Apply All Selected Tags
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
