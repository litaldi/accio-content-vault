
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader, Sparkles, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SummaryService, ContentSummary } from '@/services/summaryService';

interface SummaryDisplayProps {
  contentId: string;
  contentText: string;
  className?: string;
}

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({
  contentId,
  contentText,
  className = '',
}) => {
  const [summary, setSummary] = useState<ContentSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { toast } = useToast();

  // Load existing summary on mount
  useEffect(() => {
    loadSummary();
  }, [contentId]);

  const loadSummary = async () => {
    try {
      const existingSummary = await SummaryService.getSummary(contentId);
      setSummary(existingSummary);
    } catch (error) {
      console.error('Error loading summary:', error);
    }
  };

  const generateSummary = async (type: 'short' | 'medium' | 'long' = 'medium') => {
    if (!contentText.trim()) {
      toast({
        title: 'No content to summarize',
        description: 'This item does not have enough text content to generate a summary.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const newSummary = await SummaryService.generateSummary(contentId, contentText, type);
      setSummary(newSummary);
      toast({
        title: 'Summary generated',
        description: `AI has created a ${type} summary of your content.`,
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate summary. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (score?: number) => {
    if (!score) return 'secondary';
    if (score >= 0.8) return 'default';
    if (score >= 0.6) return 'secondary';
    return 'destructive';
  };

  const getConfidenceText = (score?: number) => {
    if (!score) return 'Unknown';
    if (score >= 0.8) return 'High';
    if (score >= 0.6) return 'Medium';
    return 'Low';
  };

  if (!summary && !isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4" />
            AI Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Generate an AI-powered summary to quickly understand the key points of this content.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => generateSummary('short')}
              disabled={isLoading}
            >
              Short Summary
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => generateSummary('medium')}
              disabled={isLoading}
            >
              Medium Summary
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => generateSummary('long')}
              disabled={isLoading}
            >
              Long Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4" />
            AI Summary
            {summary?.confidence_score && (
              <Badge variant={getConfidenceColor(summary.confidence_score)} className="text-xs">
                {getConfidenceText(summary.confidence_score)} Confidence
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => generateSummary('medium')}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      {isVisible && (
        <CardContent>
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader className="h-4 w-4 animate-spin" />
              Generating summary...
            </div>
          ) : summary ? (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{summary.summary_text}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{summary.word_count} words</span>
                <span>Generated {new Date(summary.generated_at).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => generateSummary('short')}
                  disabled={isLoading}
                >
                  Shorter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => generateSummary('long')}
                  disabled={isLoading}
                >
                  Longer
                </Button>
              </div>
            </div>
          ) : null}
        </CardContent>
      )}
    </Card>
  );
};
