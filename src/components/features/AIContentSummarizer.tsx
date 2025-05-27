
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Sparkles, 
  Clock, 
  Copy,
  Download,
  Share2,
  Zap,
  BookOpen,
  Brain
} from 'lucide-react';

export const AIContentSummarizer = () => {
  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const [summaryType, setSummaryType] = useState<'brief' | 'detailed' | 'bullets'>('brief');

  const sampleContent = `Artificial Intelligence has revolutionized the way we approach knowledge management in modern organizations. Traditional methods of storing and retrieving information have given way to intelligent systems that can understand context, identify patterns, and provide personalized recommendations. These AI-powered platforms leverage machine learning algorithms to automatically categorize content, suggest relevant connections between different pieces of information, and even predict what knowledge workers might need before they realize it themselves. The integration of natural language processing allows users to search using conversational queries rather than specific keywords, making information discovery more intuitive and efficient. Furthermore, AI can analyze reading patterns and learning behaviors to create personalized knowledge paths, ensuring that each user receives the most relevant content for their specific role and interests.`;

  const handleSummarize = async () => {
    const textToSummarize = content || sampleContent;
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const summaries = {
      brief: {
        text: "AI has transformed knowledge management by enabling intelligent content organization, personalized recommendations, and intuitive natural language search capabilities.",
        wordCount: 20,
        readingTime: "30 seconds"
      },
      detailed: {
        text: "Artificial Intelligence has fundamentally changed knowledge management by replacing traditional storage methods with intelligent systems. These platforms use machine learning for automatic categorization, pattern recognition, and personalized recommendations. Natural language processing enables conversational search, while AI analysis of user behavior creates customized learning paths for optimal knowledge discovery.",
        wordCount: 52,
        readingTime: "1.5 minutes"
      },
      bullets: {
        text: "• AI replaces traditional knowledge management with intelligent systems\n• Machine learning enables automatic categorization and pattern recognition\n• Natural language processing allows conversational search queries\n• AI analyzes user behavior to create personalized learning paths\n• Systems predict knowledge needs before users realize them",
        wordCount: 45,
        readingTime: "1 minute"
      }
    };
    
    setSummary(summaries[summaryType]);
    setIsProcessing(false);
  };

  const keyInsights = [
    { title: "Main Topic", value: "AI in Knowledge Management" },
    { title: "Key Benefits", value: "Automation, Personalization, Efficiency" },
    { title: "Technologies", value: "ML, NLP, Pattern Recognition" },
    { title: "Impact Level", value: "Revolutionary" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Content Summarizer
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Summary Type Selection */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Summary Type:</span>
            {(['brief', 'detailed', 'bullets'] as const).map((type) => (
              <Button
                key={type}
                variant={summaryType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSummaryType(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Content Input */}
          <div>
            <h4 className="font-medium mb-3">Content to Summarize</h4>
            <Textarea
              placeholder="Paste your content here or use the sample content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-32"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-muted-foreground">
                {content ? `${content.split(' ').length} words` : 'Using sample content'}
              </p>
              <Button onClick={handleSummarize} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Summarize
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Processing Progress */}
          {isProcessing && (
            <Card className="bg-muted/20">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">AI Analysis in Progress</span>
                  </div>
                  <Progress value={66} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Analyzing content structure and extracting key insights...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Summary Results */}
          {summary && (
            <div className="space-y-4">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Generated Summary
                    </h4>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm whitespace-pre-line mb-3">{summary.text}</div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{summary.wordCount} words</span>
                    <span>•</span>
                    <span><Clock className="h-3 w-3 inline mr-1" />{summary.readingTime}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Key Insights */}
              <div>
                <h4 className="font-medium mb-3">Key Insights</h4>
                <div className="grid grid-cols-2 gap-3">
                  {keyInsights.map((insight, index) => (
                    <Card key={index}>
                      <CardContent className="p-3">
                        <div className="text-xs text-muted-foreground">{insight.title}</div>
                        <div className="text-sm font-medium">{insight.value}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Save Summary
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Insights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
