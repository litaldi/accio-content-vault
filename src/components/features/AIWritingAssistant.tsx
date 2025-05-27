
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Wand2, 
  Edit3, 
  FileText, 
  Copy,
  RotateCcw
} from 'lucide-react';

export const AIWritingAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'improve' | 'summarize' | 'expand' | 'simplify'>('improve');

  const modes = [
    { id: 'improve', label: 'Improve Writing', icon: Edit3 },
    { id: 'summarize', label: 'Summarize', icon: FileText },
    { id: 'expand', label: 'Expand Ideas', icon: Wand2 },
    { id: 'simplify', label: 'Simplify', icon: RotateCcw }
  ];

  const processText = async () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const responses = {
      improve: `Here's an improved version of your text with enhanced clarity and flow: ${input.slice(0, 50)}... [Enhanced with better structure and professional tone]`,
      summarize: `Key points: This text discusses the main concepts and provides essential insights in a concise format.`,
      expand: `Expanded version: ${input} This concept can be further developed by considering additional perspectives, practical applications, and real-world examples that demonstrate the underlying principles.`,
      simplify: `Simplified: ${input.slice(0, 30)}... [Rewritten in clear, easy-to-understand language]`
    };
    
    setOutput(responses[selectedMode]);
    setIsProcessing(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Writing Assistant
            <Badge variant="secondary">Enhanced</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {modes.map((mode) => {
              const Icon = mode.icon;
              return (
                <Button
                  key={mode.id}
                  variant={selectedMode === mode.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMode(mode.id as any)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {mode.label}
                </Button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Input Text</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your text here for AI enhancement..."
                className="min-h-32"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">AI Enhanced Output</label>
                {output && (
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Textarea
                value={output}
                readOnly
                placeholder="AI-enhanced text will appear here..."
                className="min-h-32 bg-muted"
              />
            </div>
          </div>

          <Button 
            onClick={processText}
            disabled={!input.trim() || isProcessing}
            className="w-full gap-2"
          >
            {isProcessing ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Enhance with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
