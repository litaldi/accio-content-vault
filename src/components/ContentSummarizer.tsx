
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SummaryService, ContentSummary } from '@/services/summaryService';

interface ContentSummarizerProps {
  text: string;
  contentId?: string;
}

const ContentSummarizer: React.FC<ContentSummarizerProps> = ({ text, contentId }) => {
  const [summary, setSummary] = useState<ContentSummary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'long'>('medium');
  const { toast } = useToast();

  // Load existing summary if contentId is provided
  useEffect(() => {
    if (contentId) {
      loadExistingSummary();
    }
  }, [contentId]);

  const loadExistingSummary = async () => {
    if (!contentId) return;
    
    try {
      const existingSummary = await SummaryService.getSummary(contentId);
      if (existingSummary) {
        setSummary(existingSummary);
      }
    } catch (error) {
      console.error('Error loading existing summary:', error);
    }
  };
  
  const generateSummary = async () => {
    if (!text.trim()) {
      toast({
        title: 'No content to summarize',
        description: 'Please provide some text content to generate a summary.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      if (contentId) {
        // Use the actual AI service for real content
        const newSummary = await SummaryService.generateSummary(contentId, text, summaryLength);
        setSummary(newSummary);
        toast({
          title: "Summary generated",
          description: "AI has created a summary of your content"
        });
      } else {
        // Fallback mock implementation for demo/preview purposes
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        let generatedSummary = '';
        
        if (summaryLength === 'short') {
          generatedSummary = `This content discusses the main concepts of the topic and provides key insights.`;
        } else if (summaryLength === 'medium') {
          generatedSummary = `This content explores several important aspects of the topic. It presents the key information and supporting points with relevant examples. The main takeaways include understanding the core concepts and their practical applications.`;
        } else {
          generatedSummary = `This comprehensive content delves into multiple dimensions of the topic. It begins by establishing the fundamental concepts before exploring their implications in detail. Several key points are presented with supporting evidence and practical examples. The content elaborates on specific use cases and provides a thorough analysis of the subject matter. Important considerations are highlighted throughout, and practical guidance is offered for implementation. The discussion concludes with insights into future developments and potential areas for further exploration.`;
        }
        
        setSummary({
          id: 'demo-' + Date.now(),
          content_id: 'demo',
          summary_text: generatedSummary,
          summary_type: 'auto',
          confidence_score: 0.85,
          word_count: generatedSummary.split(/\s+/).length,
          generated_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        
        toast({
          title: "Summary generated",
          description: "AI has created a summary of your content"
        });
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={summaryLength === 'short' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSummaryLength('short')}
        >
          Short
        </Button>
        <Button 
          variant={summaryLength === 'medium' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSummaryLength('medium')}
        >
          Medium
        </Button>
        <Button 
          variant={summaryLength === 'long' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSummaryLength('long')}
        >
          Long
        </Button>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={generateSummary}
          disabled={isGenerating}
          className="ml-auto gap-2"
        >
          {isGenerating ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Summary
            </>
          )}
        </Button>
      </div>
      
      {summary && (
        <Card>
          <CardContent className="pt-4">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI-Generated Summary:
            </h3>
            <p className="text-sm text-muted-foreground mb-3">{summary.summary_text}</p>
            {summary.word_count && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{summary.word_count} words</span>
                {summary.confidence_score && (
                  <span>Confidence: {Math.round(summary.confidence_score * 100)}%</span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentSummarizer;
