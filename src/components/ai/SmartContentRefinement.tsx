
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Wand2,
  Target,
  Zap,
  BookOpen,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RefinementOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
}

const refinementOptions: RefinementOption[] = [
  {
    id: 'clarity',
    name: 'Improve Clarity',
    description: 'Make text clearer and more concise',
    icon: Target,
    action: 'clarity'
  },
  {
    id: 'professional',
    name: 'Professional Tone',
    description: 'Adjust tone for professional communication',
    icon: Users,
    action: 'professional'
  },
  {
    id: 'simplify',
    name: 'Simplify Language',
    description: 'Use simpler, more accessible language',
    icon: Zap,
    action: 'simplify'
  },
  {
    id: 'structure',
    name: 'Better Structure',
    description: 'Improve organization and flow',
    icon: BookOpen,
    action: 'structure'
  }
];

interface SmartContentRefinementProps {
  initialContent?: string;
  onContentRefined?: (content: string) => void;
  className?: string;
}

export const SmartContentRefinement: React.FC<SmartContentRefinementProps> = ({
  initialContent = '',
  onContentRefined,
  className
}) => {
  const [originalContent, setOriginalContent] = useState(initialContent);
  const [refinedContent, setRefinedContent] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [selectedRefinement, setSelectedRefinement] = useState<RefinementOption>(refinementOptions[0]);
  const { toast } = useToast();

  const refineContent = async (option: RefinementOption) => {
    if (!originalContent.trim()) {
      toast({
        title: "No Content",
        description: "Please enter some content to refine.",
        variant: "destructive"
      });
      return;
    }

    setIsRefining(true);
    setSelectedRefinement(option);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const refined = generateRefinedContent(originalContent, option.action);
      setRefinedContent(refined);
      
      if (onContentRefined) {
        onContentRefined(refined);
      }

      toast({
        title: "Content Refined!",
        description: `Applied ${option.name.toLowerCase()} improvements.`,
      });
    } catch (error) {
      toast({
        title: "Refinement Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefining(false);
    }
  };

  const generateRefinedContent = (content: string, action: string): string => {
    const improvements = {
      clarity: (text: string) => {
        // Mock clarity improvement
        return text
          .replace(/\b(very|really|quite|pretty|extremely)\s+/gi, '')
          .replace(/\bthat\s+/gi, '')
          .replace(/\bin order to\b/gi, 'to')
          .replace(/\bdue to the fact that\b/gi, 'because')
          + '\n\n[Clarity improvements applied: Removed filler words, simplified phrases, improved directness]';
      },
      professional: (text: string) => {
        // Mock professional tone adjustment
        return text
          .replace(/\bcan't\b/gi, 'cannot')
          .replace(/\bwon't\b/gi, 'will not')
          .replace(/\bI think\b/gi, 'I believe')
          .replace(/\bokay\b/gi, 'acceptable')
          + '\n\n[Professional tone applied: Formal contractions, professional language, authoritative voice]';
      },
      simplify: (text: string) => {
        // Mock simplification
        return text
          .replace(/\butilize\b/gi, 'use')
          .replace(/\bfacilitate\b/gi, 'help')
          .replace(/\bdemonstrate\b/gi, 'show')
          .replace(/\bparticipate\b/gi, 'take part')
          + '\n\n[Simplified language: Complex words replaced with simpler alternatives, improved readability]';
      },
      structure: (text: string) => {
        // Mock structure improvement
        const sentences = text.split('.').filter(s => s.trim());
        const structured = sentences.map((sentence, index) => {
          if (index === 0) return `## Main Point\n${sentence.trim()}.`;
          if (index < sentences.length - 1) return `• ${sentence.trim()}.`;
          return `\n## Conclusion\n${sentence.trim()}.`;
        }).join('\n');
        
        return structured + '\n\n[Structure improvements: Added headings, bullet points, logical flow]';
      }
    };

    const improvementFunction = improvements[action as keyof typeof improvements];
    return improvementFunction ? improvementFunction(content) : content;
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please select and copy manually.",
        variant: "destructive"
      });
    }
  };

  const resetRefinement = () => {
    setRefinedContent('');
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Smart Content Refinement
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={refinedContent ? 'comparison' : 'refine'} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="refine" onClick={resetRefinement}>
                Refine Content
              </TabsTrigger>
              <TabsTrigger value="comparison" disabled={!refinedContent}>
                Compare Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="refine" className="space-y-4">
              {/* Original Content Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Content to Refine</label>
                <Textarea
                  placeholder="Paste or type your content here..."
                  value={originalContent}
                  onChange={(e) => setOriginalContent(e.target.value)}
                  rows={8}
                  className="text-sm"
                />
              </div>

              {/* Refinement Options */}
              <div className="space-y-3">
                <h3 className="font-medium">Choose Refinement Type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {refinementOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      className="justify-start h-auto p-3"
                      onClick={() => refineContent(option)}
                      disabled={isRefining || !originalContent.trim()}
                    >
                      <option.icon className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">{option.name}</div>
                        <div className="text-xs opacity-70">{option.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Processing Status */}
              {isRefining && (
                <div className="flex items-center justify-center gap-2 p-4 bg-muted rounded-lg">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">
                    Applying {selectedRefinement.name.toLowerCase()}...
                  </span>
                </div>
              )}
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              {refinedContent && (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Before & After</h3>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => copyToClipboard(refinedContent)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Refined
                      </Button>
                      <Button variant="outline" size="sm" onClick={resetRefinement}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Try Another
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Original */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">Original</h4>
                        <Badge variant="outline" className="text-xs">
                          {originalContent.split(' ').length} words
                        </Badge>
                      </div>
                      <div className="bg-muted p-3 rounded-lg text-sm max-h-64 overflow-y-auto">
                        <pre className="whitespace-pre-wrap">{originalContent}</pre>
                      </div>
                    </div>

                    {/* Refined */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">Refined</h4>
                        <Badge variant="default" className="text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          {selectedRefinement.name}
                        </Badge>
                      </div>
                      <div className="bg-primary/5 border border-primary/20 p-3 rounded-lg text-sm max-h-64 overflow-y-auto">
                        <pre className="whitespace-pre-wrap">{refinedContent}</pre>
                      </div>
                    </div>
                  </div>

                  {/* Editable Refined Content */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Edit Refined Content</label>
                    <Textarea
                      value={refinedContent}
                      onChange={(e) => setRefinedContent(e.target.value)}
                      rows={8}
                      className="text-sm"
                    />
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
