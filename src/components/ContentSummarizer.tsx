
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentSummarizerProps {
  text: string;
}

const ContentSummarizer: React.FC<ContentSummarizerProps> = ({ text }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'long'>('medium');
  const { toast } = useToast();
  
  const generateSummary = async () => {
    setIsGenerating(true);
    try {
      // In a real implementation, this would call an API to generate the summary
      // This is a mock implementation that simulates an API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let generatedSummary = '';
      
      // Generate different summary lengths
      if (summaryLength === 'short') {
        generatedSummary = `This content discusses the main concepts of the topic and provides key insights.`;
      } else if (summaryLength === 'medium') {
        generatedSummary = `This content explores several important aspects of the topic. It presents the key information and supporting points with relevant examples. The main takeaways include understanding the core concepts and their practical applications.`;
      } else {
        generatedSummary = `This comprehensive content delves into multiple dimensions of the topic. It begins by establishing the fundamental concepts before exploring their implications in detail. Several key points are presented with supporting evidence and practical examples. The content elaborates on specific use cases and provides a thorough analysis of the subject matter. Important considerations are highlighted throughout, and practical guidance is offered for implementation. The discussion concludes with insights into future developments and potential areas for further exploration.`;
      }
      
      setSummary(generatedSummary);
      toast({
        title: "Summary generated",
        description: "AI has created a summary of your content"
      });
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
          className="ml-auto"
        >
          {isGenerating ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Summary'
          )}
        </Button>
      </div>
      
      {summary && (
        <Card>
          <CardContent className="pt-4">
            <h3 className="text-sm font-medium mb-2">AI-Generated Summary:</h3>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentSummarizer;
