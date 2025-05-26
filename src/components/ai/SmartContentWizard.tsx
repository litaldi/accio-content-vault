
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wand2, 
  FileText, 
  BookOpen, 
  CheckList, 
  Lightbulb,
  Copy,
  Download,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: {
    name: string;
    placeholder: string;
    type: 'input' | 'textarea';
  }[];
  generateContent: (inputs: Record<string, string>) => string;
}

const templates: ContentTemplate[] = [
  {
    id: 'article-summary',
    name: 'Article Summary',
    description: 'Create structured summaries from articles or research',
    icon: FileText,
    fields: [
      { name: 'title', placeholder: 'Article title', type: 'input' },
      { name: 'source', placeholder: 'Source URL or publication', type: 'input' },
      { name: 'keyPoints', placeholder: 'Key points or main ideas', type: 'textarea' }
    ],
    generateContent: (inputs) => `# ${inputs.title}

**Source:** ${inputs.source}

## Key Insights
${inputs.keyPoints}

## Summary
This article explores important concepts that contribute to our understanding of the topic. The main takeaways provide valuable insights for further research and practical application.

**Tags:** #research #summary #knowledge`
  },
  {
    id: 'learning-notes',
    name: 'Learning Notes',
    description: 'Structure your learning from courses, tutorials, or books',
    icon: BookOpen,
    fields: [
      { name: 'topic', placeholder: 'What are you learning?', type: 'input' },
      { name: 'source', placeholder: 'Course, book, or tutorial name', type: 'input' },
      { name: 'concepts', placeholder: 'Key concepts and ideas', type: 'textarea' }
    ],
    generateContent: (inputs) => `# Learning Notes: ${inputs.topic}

**Source:** ${inputs.source}
**Date:** ${new Date().toLocaleDateString()}

## Key Concepts
${inputs.concepts}

## Personal Insights
- Important connections to previous knowledge
- Areas for further exploration
- Practical applications

## Next Steps
- [ ] Review and reinforce key concepts
- [ ] Find practical exercises
- [ ] Connect with related topics

**Tags:** #learning #notes #${inputs.topic.toLowerCase().replace(/\s+/g, '-')}`
  },
  {
    id: 'project-plan',
    name: 'Project Planning',
    description: 'Create structured project plans and ideas',
    icon: CheckList,
    fields: [
      { name: 'projectName', placeholder: 'Project name', type: 'input' },
      { name: 'goal', placeholder: 'Project goal or objective', type: 'input' },
      { name: 'details', placeholder: 'Project details, requirements, or scope', type: 'textarea' }
    ],
    generateContent: (inputs) => `# Project: ${inputs.projectName}

## Objective
${inputs.goal}

## Project Details
${inputs.details}

## Milestones
- [ ] Initial planning and research
- [ ] Design and architecture
- [ ] Development/Implementation
- [ ] Testing and refinement
- [ ] Launch and review

## Resources Needed
- Time estimate: TBD
- Tools and technologies: TBD
- Additional research areas: TBD

## Success Metrics
- Clear completion criteria
- Quality benchmarks
- Timeline adherence

**Tags:** #project #planning #${inputs.projectName.toLowerCase().replace(/\s+/g, '-')}`
  }
];

interface SmartContentWizardProps {
  onContentGenerated?: (content: string) => void;
  className?: string;
}

export const SmartContentWizard: React.FC<SmartContentWizardProps> = ({
  onContentGenerated,
  className
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate>(templates[0]);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (fieldName: string, value: string) => {
    setInputs(prev => ({ ...prev, [fieldName]: value }));
  };

  const generateContent = async () => {
    const requiredFields = selectedTemplate.fields.filter(field => 
      !inputs[field.name]?.trim()
    );

    if (requiredFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${requiredFields.map(f => f.placeholder).join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const content = selectedTemplate.generateContent(inputs);
      setGeneratedContent(content);
      
      if (onContentGenerated) {
        onContentGenerated(content);
      }

      toast({
        title: "Content Generated!",
        description: "Your structured content is ready to use.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again or check your inputs.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
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

  const resetWizard = () => {
    setInputs({});
    setGeneratedContent('');
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Smart Content Creator
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={generatedContent ? 'preview' : 'create'} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create" onClick={() => setGeneratedContent('')}>
                Create Content
              </TabsTrigger>
              <TabsTrigger value="preview" disabled={!generatedContent}>
                Preview & Edit
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-4">
              {/* Template Selection */}
              <div className="space-y-3">
                <h3 className="font-medium">Choose a Template</h3>
                <div className="grid grid-cols-1 gap-2">
                  {templates.map((template) => (
                    <Button
                      key={template.id}
                      variant={selectedTemplate.id === template.id ? "default" : "outline"}
                      className="justify-start h-auto p-3"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setInputs({});
                      }}
                    >
                      <template.icon className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs opacity-70">{template.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-3">
                <h3 className="font-medium">Fill in Details</h3>
                {selectedTemplate.fields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="text-sm font-medium">{field.placeholder}</label>
                    {field.type === 'input' ? (
                      <Input
                        placeholder={field.placeholder}
                        value={inputs[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                      />
                    ) : (
                      <Textarea
                        placeholder={field.placeholder}
                        value={inputs[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        rows={3}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateContent}
                disabled={isGenerating}
                className="w-full gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Lightbulb className="h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              {generatedContent && (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Generated Content</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={resetWizard}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        New
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {generatedContent}
                    </pre>
                  </div>
                  
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    rows={12}
                    className="font-mono text-sm"
                    placeholder="Edit your generated content here..."
                  />
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
