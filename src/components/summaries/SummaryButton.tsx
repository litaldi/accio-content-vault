
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader } from 'lucide-react';
import { SummaryService } from '@/services/summaryService';
import { useToast } from '@/hooks/use-toast';

interface SummaryButtonProps {
  contentId: string;
  contentText: string;
  onSummaryGenerated?: () => void;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

export const SummaryButton: React.FC<SummaryButtonProps> = ({
  contentId,
  contentText,
  onSummaryGenerated,
  size = 'sm',
  variant = 'outline',
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasSummary, setHasSummary] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkExistingSummary();
  }, [contentId]);

  const checkExistingSummary = async () => {
    try {
      const exists = await SummaryService.hasSummary(contentId);
      setHasSummary(exists);
    } catch (error) {
      console.error('Error checking summary:', error);
    }
  };

  const handleGenerateSummary = async () => {
    if (!contentText.trim()) {
      toast({
        title: 'No content to summarize',
        description: 'This item does not have enough text content to generate a summary.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      await SummaryService.generateSummary(contentId, contentText, 'medium');
      setHasSummary(true);
      onSummaryGenerated?.();
      toast({
        title: 'Summary generated',
        description: 'AI has created a summary of your content.',
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate summary. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleGenerateSummary}
      disabled={isGenerating}
      className="gap-2"
    >
      {isGenerating ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
      {isGenerating ? 'Generating...' : hasSummary ? 'Regenerate Summary' : 'Generate Summary'}
    </Button>
  );
};
