
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  RefreshCw,
  Target,
  Zap,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QualityMetric {
  name: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement';
  suggestions: string[];
}

interface ContentAnalysis {
  overallScore: number;
  readabilityScore: number;
  engagementScore: number;
  structureScore: number;
  metrics: QualityMetric[];
  insights: string[];
  improvements: string[];
}

interface ContentQualityAnalyzerProps {
  initialContent?: string;
  onAnalysisComplete?: (analysis: ContentAnalysis) => void;
  className?: string;
}

export const ContentQualityAnalyzer: React.FC<ContentQualityAnalyzerProps> = ({
  initialContent = '',
  onAnalysisComplete,
  className
}) => {
  const [content, setContent] = useState(initialContent);
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeContent = async () => {
    if (!content.trim()) {
      toast({
        title: "No Content",
        description: "Please enter some content to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // Simulate AI content analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAnalysis = generateAnalysis(content);
      setAnalysis(mockAnalysis);
      onAnalysisComplete?.(mockAnalysis);
      
      toast({
        title: "Analysis Complete!",
        description: `Overall quality score: ${mockAnalysis.overallScore}/100`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateAnalysis = (text: string): ContentAnalysis => {
    const wordCount = text.split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]+/).length - 1;
    const paragraphCount = text.split(/\n\s*\n/).length;
    
    // Calculate basic metrics
    const avgWordsPerSentence = wordCount / Math.max(sentenceCount, 1);
    const avgSentencesPerParagraph = sentenceCount / Math.max(paragraphCount, 1);
    
    // Generate scores based on content analysis
    const readabilityScore = Math.min(100, Math.max(20, 100 - (avgWordsPerSentence - 15) * 3));
    const structureScore = Math.min(100, Math.max(30, 70 + (paragraphCount > 1 ? 20 : 0) + (text.includes('#') ? 10 : 0)));
    const engagementScore = Math.min(100, Math.max(40, 60 + (text.includes('?') ? 10 : 0) + (text.includes('!') ? 5 : 0)));
    
    const overallScore = Math.round((readabilityScore + structureScore + engagementScore) / 3);

    const metrics: QualityMetric[] = [
      {
        name: 'Readability',
        score: readabilityScore,
        status: readabilityScore >= 80 ? 'excellent' : readabilityScore >= 60 ? 'good' : 'needs-improvement',
        suggestions: readabilityScore < 80 ? [
          'Consider shorter sentences for better readability',
          'Use simpler vocabulary where possible',
          'Break up long paragraphs'
        ] : ['Great readability score!']
      },
      {
        name: 'Structure',
        score: structureScore,
        status: structureScore >= 80 ? 'excellent' : structureScore >= 60 ? 'good' : 'needs-improvement',
        suggestions: structureScore < 80 ? [
          'Add clear headings to organize content',
          'Use bullet points for lists',
          'Create distinct paragraphs for different ideas'
        ] : ['Well-structured content!']
      },
      {
        name: 'Engagement',
        score: engagementScore,
        status: engagementScore >= 80 ? 'excellent' : engagementScore >= 60 ? 'good' : 'needs-improvement',
        suggestions: engagementScore < 80 ? [
          'Ask questions to engage readers',
          'Use active voice',
          'Add compelling examples or stories'
        ] : ['Highly engaging content!']
      }
    ];

    const insights = [
      `Content length: ${wordCount} words (${wordCount < 300 ? 'short' : wordCount > 1000 ? 'long' : 'medium'})`,
      `Average sentence length: ${Math.round(avgWordsPerSentence)} words`,
      `Reading time: ~${Math.ceil(wordCount / 200)} minutes`,
      `Paragraph count: ${paragraphCount}`
    ];

    const improvements = [
      ...(wordCount < 100 ? ['Consider expanding the content for better coverage'] : []),
      ...(avgWordsPerSentence > 25 ? ['Break down complex sentences'] : []),
      ...(paragraphCount === 1 && wordCount > 200 ? ['Split into multiple paragraphs'] : []),
      ...(text.toLowerCase() === text ? ['Consider using proper capitalization'] : [])
    ];

    return {
      overallScore,
      readabilityScore,
      engagementScore,
      structureScore,
      metrics,
      insights,
      improvements
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'good': return <Info className="h-4 w-4 text-blue-600" />;
      case 'needs-improvement': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'needs-improvement': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Content Quality Analyzer
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Content Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Content to Analyze</label>
            <Textarea
              placeholder="Paste your content here for AI quality analysis..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="text-sm"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {content.split(/\s+/).filter(word => word.length > 0).length} words
              </span>
              <Button
                onClick={analyzeContent}
                disabled={!content.trim() || isAnalyzing}
                className="gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="h-4 w-4" />
                    Analyze Quality
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-4">
              {/* Overall Score */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Overall Quality Score</h3>
                    <div className="text-2xl font-bold text-primary">
                      {analysis.overallScore}/100
                    </div>
                  </div>
                  <Progress value={analysis.overallScore} className="h-3" />
                </CardContent>
              </Card>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysis.metrics.map((metric) => (
                  <Card key={metric.name}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium flex items-center gap-2">
                            {metric.name === 'Readability' && <Eye className="h-4 w-4" />}
                            {metric.name === 'Structure' && <Target className="h-4 w-4" />}
                            {metric.name === 'Engagement' && <Zap className="h-4 w-4" />}
                            {metric.name}
                          </h4>
                          <Badge className={getStatusColor(metric.status)}>
                            {getStatusIcon(metric.status)}
                            <span className="ml-1">{metric.score}</span>
                          </Badge>
                        </div>
                        
                        <Progress value={metric.score} className="h-2" />
                        
                        <div className="space-y-1">
                          {metric.suggestions.map((suggestion, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground">
                              • {suggestion}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Content Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {analysis.insights.map((insight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Info className="h-4 w-4 text-blue-600" />
                      {insight}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Improvement Suggestions */}
              {analysis.improvements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Improvement Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {analysis.improvements.map((improvement, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        {improvement}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">📊 Quality Analysis Features:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Comprehensive readability assessment</li>
              <li>• Structure and organization analysis</li>
              <li>• Engagement and tone evaluation</li>
              <li>• Actionable improvement recommendations</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
