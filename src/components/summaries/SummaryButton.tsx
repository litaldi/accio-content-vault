
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Loader2 } from 'lucide-react';
import { SummaryService } from '@/services/summaryService';
import { useToast } from '@/hooks/use-toast';

interface SummaryButtonProps {
  contentId: string;
  contentText: string;
  onSummaryGenerated?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export const SummaryButton: React.FC<SummaryButtonProps> = ({
  contentId,
  contentText,
  onSummaryGenerated,
  variant = 'outline',
  size = 'sm'
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasSummary, setHasSummary] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkSummary = async () => {
      const exists = await SummaryService.hasSummary(contentId);
      setHasSummary(exists);
    };
    checkSummary();
  }, [contentId]);

  const handleGenerate = async () => {
    if (!contentText.trim()) {
      toast({
        title: "No content to summarize",
        description: "This item does not have enough text content to generate a summary.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);
      await SummaryService.generateSummary(contentId, contentText);
      setHasSummary(true);
      onSummaryGenerated?.();
      
      toast({
        title: "Summary generated",
        description: "AI has created a summary of your content.",
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleGenerate}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Brain className="h-4 w-4 mr-2" />
          {hasSummary ? 'Regenerate Summary' : 'Generate Summary'}
        </>
      )}
    </Button>
  );
};
