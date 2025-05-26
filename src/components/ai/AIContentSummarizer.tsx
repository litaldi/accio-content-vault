
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Zap,
  Copy,
  Check,
  Download,
  BookOpen,
  Clock,
  TrendingDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SummaryResult {
  shortSummary: string;
  keyPoints: string[];
  readingTime: string;
  complexity: 'simple' | 'moderate' | 'complex';
}

interface AIContentSummarizerProps {
  className?: string;
}

export const AIContentSummarizer: React.FC<AIContentSummarizerProps> = ({ className }) => {
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateSummary = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some content to summarize.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSummary: SummaryResult = {
        shortSummary: `AI-generated ${summaryLength} summary: This content discusses key concepts and insights related to the topic. The main focus is on providing valuable information and actionable takeaways for readers.`,
        keyPoints: [
          'Primary concept or methodology explained',
          'Key benefits and applications discussed',
          'Practical implementation strategies outlined',
          'Important considerations and best practices highlighted'
        ],
        readingTime: '3-5 minutes',
        complexity: content.length > 1000 ? 'complex' : content.length > 500 ? 'moderate' : 'simple'
      };

      setSummary(mockSummary);
      toast({
        title: "Summary Generated!",
        description: "AI has created an intelligent summary of your content.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    if (!summary) return;
    
    const summaryText = `${summary.shortSummary}\n\nKey Points:\n${summary.keyPoints.map(point => `• ${point}`).join('\n')}`;
    
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Summary copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            AI Content Summarizer
            <Badge variant="secondary">Intelligent</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Content Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Content to Summarize</label>
            <Textarea
              placeholder="Paste your article, document, or any long-form content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              {content.length} characters • {content.split(' ').filter(w => w.length > 0).length} words
            </p>
          </div>

          {/* Summary Length Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Summary Length</label>
            <div className="flex gap-2">
              {[
                { key: 'short', label: 'Short', desc: '1-2 sentences' },
                { key: 'medium', label: 'Medium', desc: '1 paragraph' },
                { key: 'detailed', label: 'Detailed', desc: 'Key points + summary' }
              ].map((option) => (
                <Button
                  key={option.key}
                  variant={summaryLength === option.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSummaryLength(option.key as any)}
                  className="flex-1 flex-col h-auto py-2"
                >
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs opacity-70">{option.desc}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateSummary}
            disabled={isProcessing || !content.trim()}
            className="w-full gap-2"
            size="lg"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Analyzing Content...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Generate Summary
              </>
            )}
          </Button>

          {/* Summary Results */}
          {summary && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">AI Summary</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-1"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Summary Metadata */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Reading: {summary.readingTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  <Badge className={getComplexityColor(summary.complexity)} variant="outline">
                    {summary.complexity}
                  </Badge>
                </div>
              </div>

              {/* Summary Content */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Summary</h4>
                  <p className="text-sm leading-relaxed">{summary.shortSummary}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Key Points</h4>
                  <ul className="space-y-1">
                    {summary.keyPoints.map((point, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Quick Examples */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Quick Examples</h4>
            <div className="grid gap-2">
              {[
                "Artificial intelligence is transforming how we work and live...",
                "The latest research in productivity shows that focused work sessions...",
                "Climate change impacts are accelerating globally, with rising temperatures..."
              ].map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setContent(example + " [This is a sample text for demonstration purposes. In real usage, you would paste your full content here.]")}
                  className="text-left justify-start text-xs h-auto p-2"
                >
                  "{example}"
                </Button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">📝 Summarization Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Works best with articles, reports, and structured content</li>
              <li>• Try different summary lengths for various use cases</li>
              <li>• Use detailed summaries for complex technical content</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
