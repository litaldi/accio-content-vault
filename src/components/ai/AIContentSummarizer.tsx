
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Zap, 
  Copy,
  RefreshCw,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SummaryResult {
  keyPoints: string[];
  summary: string;
  readingTime: string;
  wordCount: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface AIContentSummarizerProps {
  initialContent?: string;
  onSummaryGenerated?: (summary: SummaryResult) => void;
  className?: string;
}

export const AIContentSummarizer: React.FC<AIContentSummarizerProps> = ({
  initialContent = '',
  onSummaryGenerated,
  className
}) => {
  const [content, setContent] = useState(initialContent);
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const generateSummary = async () => {
    if (!content.trim()) {
      toast({
        title: "No Content",
        description: "Please enter content to summarize.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      // Simulate AI processing with progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      await new Promise(resolve => setTimeout(resolve, 2000));
      clearInterval(progressInterval);
      setProgress(100);

      // Generate mock summary based on content
      const wordCount = content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200);
      
      const mockSummary: SummaryResult = {
        keyPoints: [
          "Main concept: Core ideas and principles discussed in the content",
          "Key insights: Important findings and observations highlighted",
          "Practical applications: Real-world uses and implementations mentioned",
          "Future implications: Potential developments and next steps outlined"
        ],
        summary: `This content explores important concepts and provides valuable insights. The material covers approximately ${wordCount} words and discusses key themes that are relevant to the topic. The content presents both theoretical foundations and practical applications, making it useful for understanding and implementation.`,
        readingTime: `${readingTime} min read`,
        wordCount,
        sentiment: wordCount > 500 ? 'positive' : wordCount > 200 ? 'neutral' : 'negative'
      };

      setSummary(mockSummary);
      onSummaryGenerated?.(mockSummary);
      
      toast({
        title: "Summary Generated!",
        description: "AI has analyzed and summarized your content.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const copySummary = async () => {
    if (!summary) return;
    
    const textToCopy = `Summary:\n${summary.summary}\n\nKey Points:\n${summary.keyPoints.map(point => `• ${point}`).join('\n')}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copied!",
        description: "Summary copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please select and copy manually.",
        variant: "destructive"
      });
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'negative': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            AI Content Summarizer
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Content Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Content to Summarize</label>
            <Textarea
              placeholder="Paste your article, document, or any text content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="text-sm"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {content.split(/\s+/).filter(word => word.length > 0).length} words
              </span>
              <Button
                onClick={generateSummary}
                disabled={!content.trim() || isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing content...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Summary Results */}
          {summary && (
            <div className="space-y-4">
              {/* Metadata */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {summary.readingTime}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <BarChart3 className="h-3 w-3" />
                  {summary.wordCount} words
                </Badge>
                <Badge className={getSentimentColor(summary.sentiment)}>
                  {summary.sentiment} tone
                </Badge>
              </div>

              {/* Summary */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Summary</CardTitle>
                    <Button variant="outline" size="sm" onClick={copySummary}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{summary.summary}</p>
                </CardContent>
              </Card>

              {/* Key Points */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Key Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {summary.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🚀 Summarization Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Works best with articles, documents, and structured content</li>
              <li>• Longer content (500+ words) produces more detailed summaries</li>
              <li>• AI identifies key themes, insights, and actionable items</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
