
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, TrendingUp, Clock, Lightbulb } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PromptPattern {
  type: 'accessibility' | 'cleanup' | 'ux_improvement' | 'security';
  count: number;
  lastUsed: Date;
  suggestions: string[];
}

interface FeedbackData {
  totalPrompts: number;
  patterns: Record<string, PromptPattern>;
  shortcuts: string[];
}

const FeedbackSystem: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    totalPrompts: 0,
    patterns: {},
    shortcuts: []
  });
  const [isOpen, setIsOpen] = useState(false);

  // Load feedback data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('accio-feedback-data');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFeedbackData(parsed);
      } catch (error) {
        console.warn('Failed to parse feedback data');
      }
    }
  }, []);

  // Detect and track prompt patterns
  useEffect(() => {
    const detectPatterns = () => {
      const currentPatterns = { ...feedbackData.patterns };
      
      // Simulate pattern detection based on common requests
      const commonPatterns: PromptPattern[] = [
        {
          type: 'accessibility',
          count: 3,
          lastUsed: new Date(),
          suggestions: [
            'Create a custom accessibility preset',
            'Set up keyboard shortcuts for common actions',
            'Enable auto-save for accessibility preferences'
          ]
        },
        {
          type: 'cleanup',
          count: 2,
          lastUsed: new Date(),
          suggestions: [
            'Schedule regular code audits',
            'Set up automated dead code detection',
            'Create a cleanup checklist template'
          ]
        },
        {
          type: 'ux_improvement',
          count: 4,
          lastUsed: new Date(),
          suggestions: [
            'Implement user testing feedback loops',
            'Create design system documentation',
            'Set up A/B testing for UI changes'
          ]
        }
      ];

      commonPatterns.forEach(pattern => {
        currentPatterns[pattern.type] = pattern;
      });

      const updatedData = {
        ...feedbackData,
        totalPrompts: feedbackData.totalPrompts + 1,
        patterns: currentPatterns,
        shortcuts: generateShortcuts(currentPatterns)
      };

      setFeedbackData(updatedData);
      localStorage.setItem('accio-feedback-data', JSON.stringify(updatedData));
    };

    // Only run pattern detection if dialog is opened
    if (isOpen) {
      detectPatterns();
    }
  }, [isOpen]);

  const generateShortcuts = (patterns: Record<string, PromptPattern>): string[] => {
    const shortcuts: string[] = [];
    
    Object.entries(patterns).forEach(([type, pattern]) => {
      if (pattern.count >= 2) {
        switch (type) {
          case 'accessibility':
            shortcuts.push('Quick accessibility audit and improvements');
            shortcuts.push('Apply WCAG 2.1 AA standards check');
            break;
          case 'cleanup':
            shortcuts.push('Full code cleanup and optimization');
            shortcuts.push('Remove unused code and assets');
            break;
          case 'ux_improvement':
            shortcuts.push('UX/UI enhancement review');
            shortcuts.push('Responsive design check');
            break;
        }
      }
    });

    return [...new Set(shortcuts)]; // Remove duplicates
  };

  const getMostFrequentPattern = () => {
    const patterns = Object.entries(feedbackData.patterns);
    if (patterns.length === 0) return null;
    
    return patterns.reduce((prev, current) => 
      prev[1].count > current[1].count ? prev : current
    );
  };

  const frequentPattern = getMostFrequentPattern();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-foreground"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Feedback & Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Usage Insights & Shortcuts
          </DialogTitle>
          <DialogDescription>
            Track your prompt patterns and discover time-saving shortcuts
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Usage Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Usage Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Prompts</p>
                  <p className="text-lg font-semibold">{feedbackData.totalPrompts}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pattern Types</p>
                  <p className="text-lg font-semibold">{Object.keys(feedbackData.patterns).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Most Frequent Pattern */}
          {frequentPattern && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Most Frequent Request</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-1">
                      {frequentPattern[0].replace('_', ' ')}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Used {frequentPattern[1].count} times
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Suggested Shortcuts */}
          {feedbackData.shortcuts.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Suggested Shortcuts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feedbackData.shortcuts.slice(0, 3).map((shortcut, index) => (
                    <div key={index} className="p-2 bg-muted/50 rounded text-xs">
                      "{shortcut}"
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Use these phrases to quickly request common improvements
                </p>
              </CardContent>
            </Card>
          )}

          {/* Pattern Breakdown */}
          {Object.keys(feedbackData.patterns).length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Request Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(feedbackData.patterns).map(([type, pattern]) => (
                    <div key={type} className="flex items-center justify-between text-xs">
                      <span className="capitalize">{type.replace('_', ' ')}</span>
                      <Badge variant="outline" className="text-xs">
                        {pattern.count}x
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackSystem;
