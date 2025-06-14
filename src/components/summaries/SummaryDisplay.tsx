
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Brain, RefreshCw, Loader2 } from 'lucide-react';
import { SummaryService, ContentSummary } from '@/services/summaryService';

interface SummaryDisplayProps {
  contentId: string;
  contentText: string;
  className?: string;
}

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({
  contentId,
  contentText,
  className
}) => {
  const [summary, setSummary] = useState<ContentSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const existingSummary = await SummaryService.getSummary(contentId);
        setSummary(existingSummary);
      } catch (error) {
        console.error('Error loading summary:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSummary();
  }, [contentId]);

  const generateSummary = async () => {
    if (!contentText.trim()) return;
    
    try {
      setIsGenerating(true);
      const newSummary = await SummaryService.generateSummary(contentId, contentText);
      setSummary(newSummary);
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading summary...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-primary" />
          AI Summary
          {summary && (
            <Badge variant="secondary" className="text-xs">
              {summary.word_count} words
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {summary ? (
          <>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm leading-relaxed">{summary.summary_text}</p>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(summary.generated_at).toLocaleDateString()}
                </span>
                {summary.confidence_score && (
                  <span>Confidence: {Math.round(summary.confidence_score * 100)}%</span>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={generateSummary}
                disabled={isGenerating}
                className="h-6 px-2"
              >
                <RefreshCw className={`h-3 w-3 ${isGenerating ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-3">
              No summary available for this content.
            </p>
            <Button
              onClick={generateSummary}
              disabled={isGenerating || !contentText.trim()}
              size="sm"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Summary
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
