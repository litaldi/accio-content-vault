
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Link, 
  Copy, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Sparkles,
  BookOpen,
  Target,
  Eye
} from 'lucide-react';
import { SavedContent } from '@/types';
import { contentIntelligenceService } from '@/services/contentIntelligenceService';
import { useToast } from '@/hooks/use-toast';

interface ContentAnalysisPanelProps {
  content: SavedContent;
  allContent: SavedContent[];
  className?: string;
}

export const ContentAnalysisPanel: React.FC<ContentAnalysisPanelProps> = ({
  content,
  allContent,
  className
}) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [enhancedSummary, setEnhancedSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSummaryLength, setSelectedSummaryLength] = useState<'short' | 'medium' | 'long' | 'bullets'>('medium');
  const { toast } = useToast();

  useEffect(() => {
    analyzeContent();
  }, [content.id]);

  const analyzeContent = async () => {
    setIsLoading(true);
    try {
      const result = await contentIntelligenceService.analyzeContent(content, allContent);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing content:', error);
      toast({
        title: 'Analysis failed',
        description: 'Could not analyze content intelligence',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateEnhancedSummary = async (length: typeof selectedSummaryLength) => {
    setIsLoading(true);
    try {
      const result = await contentIntelligenceService.generateEnhancedSummary(content, length);
      setEnhancedSummary(result);
      setSelectedSummaryLength(length);
      toast({
        title: 'Summary generated',
        description: `Created ${length} summary with AI insights`
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: 'Summary failed',
        description: 'Could not generate enhanced summary',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800 dark:bg-green-900';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900';
      default: return 'bg-red-100 text-red-800 dark:bg-red-900';
    }
  };

  if (!analysis) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 animate-pulse" />
            <span>Analyzing content intelligence...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Content Intelligence
          <Badge variant="secondary">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
            <TabsTrigger value="duplicates">Duplicates</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Enhanced AI Summary</h3>
              <div className="flex gap-2">
                {(['short', 'medium', 'long', 'bullets'] as const).map((length) => (
                  <Button
                    key={length}
                    variant={selectedSummaryLength === length ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => generateEnhancedSummary(length)}
                    disabled={isLoading}
                  >
                    {length.charAt(0).toUpperCase() + length.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {enhancedSummary ? (
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-medium">AI Summary</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(enhancedSummary.confidence * 100)}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {enhancedSummary.summary}
                  </p>
                </div>

                {enhancedSummary.keyPoints.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      Key Points
                    </h4>
                    <ul className="space-y-1">
                      {enhancedSummary.keyPoints.map((point: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {enhancedSummary.actionableItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Actionable Items
                    </h4>
                    <ul className="space-y-1">
                      {enhancedSummary.actionableItems.map((item: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-green-600 mt-1">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{enhancedSummary.wordCount} words</span>
                  <span>•</span>
                  <span>Reading time: {analysis.readingTime}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Button onClick={() => generateEnhancedSummary('medium')} disabled={isLoading}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Enhanced Summary
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="related" className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Link className="h-4 w-4" />
              Related Content ({analysis.relatedContent.length})
            </h3>
            
            {analysis.relatedContent.length > 0 ? (
              <div className="space-y-3">
                {analysis.relatedContent.map((link: any, index: number) => {
                  const relatedItem = allContent.find(item => item.id === link.targetId);
                  if (!relatedItem) return null;
                  
                  return (
                    <div key={index} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{relatedItem.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(link.relevanceScore * 100)}% match
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{link.linkReason}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {link.linkType}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-xs h-6">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Link className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No related content found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="duplicates" className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Duplicate Detection ({analysis.duplicateClusters.length})
            </h3>
            
            {analysis.duplicateClusters.length > 0 ? (
              <div className="space-y-4">
                {analysis.duplicateClusters.map((cluster: any, index: number) => (
                  <div key={index} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-950 space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-sm">Duplicate Cluster</span>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(cluster.similarityScore * 100)}% similar
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{cluster.clusterReason}</p>
                    <div className="space-y-2">
                      {cluster.items.map((item: SavedContent, itemIndex: number) => (
                        <div key={itemIndex} className={`text-sm p-2 rounded ${item.id === cluster.primaryItem.id ? 'bg-green-100 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{item.title}</span>
                            {item.id === cluster.primaryItem.id && (
                              <Badge variant="default" className="text-xs">Primary</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Merge Items
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Keep Separate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Copy className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No duplicates detected</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Content Insights
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Reading Time</label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{analysis.readingTime}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Complexity</label>
                <Badge className={getComplexityColor(analysis.complexity)}>
                  {analysis.complexity}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Summary Quality</label>
                <Badge variant={analysis.summaryQuality === 'high' ? 'default' : 'secondary'}>
                  {analysis.summaryQuality}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Type</label>
                <Badge variant="outline">{analysis.content.content_type}</Badge>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
              <h4 className="font-medium mb-2">💡 AI Recommendations:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Consider adding more tags for better organization</li>
                <li>• This content pairs well with {analysis.relatedContent.length} related items</li>
                {analysis.duplicateClusters.length > 0 && (
                  <li>• Review duplicate content to avoid redundancy</li>
                )}
                <li>• {analysis.complexity === 'complex' ? 'Break down into smaller sections for easier reading' : 'Well-structured content for quick consumption'}</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
