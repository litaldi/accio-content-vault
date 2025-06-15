import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentAnalysisPanel } from '@/components/intelligence/ContentAnalysisPanel';
import { DuplicateDetector } from '@/components/intelligence/DuplicateDetector';
import { ContentRelationsMap } from '@/components/intelligence/ContentRelationsMap';
import { AIContentSummarizer } from '@/components/ai/AIContentSummarizer';
import { mockContents } from '@/lib/mock-data';
import { SavedContent } from '@/types';
import { Brain, Sparkles, Network, Copy } from 'lucide-react';

const ContentIntelligence: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<SavedContent | undefined>(mockContents[0]);

  const handleContentSelect = (content: SavedContent) => {
    setSelectedContent(content);
  };

  const handleMergeDuplicates = (clusters: any[]) => {
    // In a real app, this would merge the duplicate content
    console.log('Merging duplicates:', clusters);
  };

  const handleDeleteDuplicate = (contentId: string) => {
    // In a real app, this would delete the duplicate content
    console.log('Deleting duplicate:', contentId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Content Intelligence - Accio</title>
        <meta name="description" content="AI-powered content intelligence with smart summaries, relationship detection, and duplicate analysis." />
      </Helmet>

      <Spacing.Section sectionSize="lg">
        <Spacing.Container>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Typography.H1 className="mb-4 flex items-center justify-center gap-3">
                <Brain className="h-8 w-8 text-primary" />
                Content Intelligence
              </Typography.H1>
              <Typography.Lead>
                AI-powered analysis, smart summaries, and intelligent content relationships
              </Typography.Lead>
            </div>

            <Tabs defaultValue="analysis" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="analysis" className="gap-2">
                  <Brain className="h-4 w-4" />
                  Analysis
                </TabsTrigger>
                <TabsTrigger value="summarizer" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Summarizer
                </TabsTrigger>
                <TabsTrigger value="relations" className="gap-2">
                  <Network className="h-4 w-4" />
                  Relations
                </TabsTrigger>
                <TabsTrigger value="duplicates" className="gap-2">
                  <Copy className="h-4 w-4" />
                  Duplicates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="space-y-6">
                <div className="grid lg:grid-cols-4 gap-6">
                  {/* Content Selection */}
                  <div className="lg:col-span-1">
                    <div className="space-y-3">
                      <h3 className="font-medium">Select Content to Analyze</h3>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {mockContents.slice(0, 10).map((content) => (
                          <Button
                            key={content.id}
                            variant={selectedContent?.id === content.id ? 'default' : 'outline'}
                            className="w-full justify-start text-left h-auto p-3"
                            onClick={() => handleContentSelect(content)}
                          >
                            <div className="truncate">
                              <div className="font-medium text-sm truncate">{content.title}</div>
                              <div className="text-xs text-muted-foreground truncate">{content.description}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Analysis */}
                  <div className="lg:col-span-3">
                    {selectedContent ? (
                      <ContentAnalysisPanel
                        content={selectedContent}
                        allContent={mockContents}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <Typography.H3 className="mb-2">Select Content to Analyze</Typography.H3>
                        <Typography.Body>Choose a content item to see AI-powered insights and analysis</Typography.Body>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="summarizer">
                <AIContentSummarizer />
              </TabsContent>

              <TabsContent value="relations">
                <ContentRelationsMap
                  content={mockContents}
                  selectedContent={selectedContent}
                  onContentSelect={handleContentSelect}
                />
              </TabsContent>

              <TabsContent value="duplicates">
                <DuplicateDetector
                  content={mockContents}
                  onMergeDuplicates={handleMergeDuplicates}
                  onDeleteDuplicate={handleDeleteDuplicate}
                />
              </TabsContent>
            </Tabs>
          </div>
        </Spacing.Container>
      </Spacing.Section>
    </div>
  );
};

export default ContentIntelligence;
