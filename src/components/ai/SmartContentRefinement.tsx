
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Wand2, 
  RefreshCw,
  Copy,
  Check,
  Volume2,
  Edit,
  Target,
  Sparkles,
  FileText,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RefinementOption {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  tone: string;
}

interface SmartContentRefinementProps {
  className?: string;
}

export const SmartContentRefinement: React.FC<SmartContentRefinementProps> = ({ className }) => {
  const [originalContent, setOriginalContent] = useState('');
  const [refinedContent, setRefinedContent] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('clarity');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const refinementOptions: RefinementOption[] = [
    {
      id: 'clarity',
      name: 'Improve Clarity',
      description: 'Make content clearer and easier to understand',
      icon: Target,
      tone: 'clear'
    },
    {
      id: 'professional',
      name: 'Professional Tone',
      description: 'Convert to professional business language',
      icon: FileText,
      tone: 'professional'
    },
    {
      id: 'casual',
      name: 'Casual Tone',
      description: 'Make content more conversational and friendly',
      icon: Volume2,
      tone: 'casual'
    },
    {
      id: 'concise',
      name: 'Make Concise',
      description: 'Shorten while keeping key information',
      icon: Zap,
      tone: 'concise'
    },
    {
      id: 'engaging',
      name: 'More Engaging',
      description: 'Add personality and make it more interesting',
      icon: Sparkles,
      tone: 'engaging'
    },
    {
      id: 'academic',
      name: 'Academic Style',
      description: 'Convert to formal academic writing',
      icon: Edit,
      tone: 'academic'
    }
  ];

  const refineContent = async () => {
    if (!originalContent.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some content to refine.",
        variant: "destructive"
      });
      return;
    }

    setIsRefining(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedRefinement = refinementOptions.find(opt => opt.id === selectedOption);
      
      // Mock AI refinement based on selected option
      let mockRefinement = '';
      
      switch (selectedOption) {
        case 'clarity':
          mockRefinement = `**Clarified Version:**

${originalContent}

**Key Improvements:**
- Simplified complex sentences for better readability
- Added clear structure with bullet points
- Removed unnecessary jargon
- Enhanced logical flow between ideas`;
          break;
          
        case 'professional':
          mockRefinement = `**Professional Version:**

We would like to present the following refined content for your consideration:

${originalContent.replace(/I think|maybe|kinda|pretty|really/gi, '').replace(/!/g, '.')}

This revision maintains the core message while adopting a more formal tone appropriate for business communications.`;
          break;
          
        case 'casual':
          mockRefinement = `**Casual Version:**

Hey there! 👋

${originalContent.replace(/shall|must|ought to/gi, 'should').replace(/\./g, '!')}

Hope this helps! Let me know if you have any questions.`;
          break;
          
        case 'concise':
          mockRefinement = `**Concise Version:**

${originalContent.split(' ').slice(0, Math.ceil(originalContent.split(' ').length * 0.6)).join(' ')}...

**Length Reduction:** ${Math.ceil((1 - 0.6) * 100)}% shorter while preserving key points.`;
          break;
          
        case 'engaging':
          mockRefinement = `**Engaging Version:**

✨ ${originalContent.replace(/\./g, '! 🎯')}

**Added Elements:**
- Emojis for visual appeal
- Enthusiastic tone
- Call-to-action phrases
- Personal connection`;
          break;
          
        case 'academic':
          mockRefinement = `**Academic Version:**

The present analysis examines the following content:

${originalContent.replace(/I/g, 'The author').replace(/you/g, 'the reader')}

**Scholarly Enhancements:**
- Objective third-person perspective
- Formal academic terminology
- Structured argumentation
- Citation-ready format`;
          break;
          
        default:
          mockRefinement = `**Refined Version:**\n\n${originalContent}`;
      }
      
      setRefinedContent(mockRefinement);
      
      toast({
        title: "Content Refined!",
        description: `Applied ${selectedRefinement?.name} refinement successfully.`,
      });
    } finally {
      setIsRefining(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(refinedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Refined content copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const useRefinedContent = () => {
    setOriginalContent(refinedContent);
    setRefinedContent('');
    toast({
      title: "Content Updated!",
      description: "Refined content is now your working version.",
    });
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Smart Content Refinement
            <Badge variant="secondary">One-Click</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Content</label>
            <Textarea
              placeholder="Paste or type content you want to refine..."
              value={originalContent}
              onChange={(e) => setOriginalContent(e.target.value)}
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              {originalContent.length} characters • {originalContent.split(' ').filter(w => w.length > 0).length} words
            </p>
          </div>

          {/* Refinement Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Refinement Style</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {refinementOptions.map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all ${
                    selectedOption === option.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <option.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{option.name}</h4>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                      {selectedOption === option.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Refine Button */}
          <Button
            onClick={refineContent}
            disabled={isRefining || !originalContent.trim()}
            className="w-full gap-2"
            size="lg"
          >
            {isRefining ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Refining Content...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Refine Content
              </>
            )}
          </Button>

          {/* Refined Content */}
          {refinedContent && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Refined Content</h3>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={useRefinedContent}
                    className="gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Use This
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg border">
                <pre className="whitespace-pre-wrap text-sm font-sans">
                  {refinedContent}
                </pre>
              </div>
              
              <div className="flex justify-center">
                <Button onClick={refineContent} variant="outline" size="sm" className="gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Try Different Style
                </Button>
              </div>
            </div>
          )}

          {/* Quick Examples */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Quick Examples</h4>
            <div className="grid gap-2">
              {[
                "I think this feature could maybe help users...",
                "The quarterly results exceeded expectations significantly.",
                "Let me explain how this algorithm works step by step."
              ].map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setOriginalContent(example)}
                  className="text-left justify-start text-xs h-auto p-2"
                >
                  "{example}"
                </Button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">✨ Refinement Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Try different styles to see what works best for your audience</li>
              <li>• Professional tone is great for business communications</li>
              <li>• Use "Make Concise" to create summaries or abstracts</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
