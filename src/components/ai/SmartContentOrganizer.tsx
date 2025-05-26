
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FolderPlus, 
  RefreshCw,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrganizationSuggestion {
  type: 'collection' | 'merge' | 'archive' | 'tag';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  itemCount: number;
  action: string;
}

interface SmartContentOrganizerProps {
  contentCount?: number;
  onApplySuggestion?: (suggestion: OrganizationSuggestion) => void;
  className?: string;
}

export const SmartContentOrganizer: React.FC<SmartContentOrganizerProps> = ({
  contentCount = 156,
  onApplySuggestion,
  className
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [suggestions, setSuggestions] = useState<OrganizationSuggestion[]>([]);
  const [organizationScore, setOrganizationScore] = useState(78);
  const { toast } = useToast();

  useEffect(() => {
    analyzeCurrent();
  }, []);

  const analyzeCurrent = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Simulate AI analysis with progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => Math.min(prev + 12, 90));
      }, 250);

      await new Promise(resolve => setTimeout(resolve, 2000));
      clearInterval(progressInterval);
      setAnalysisProgress(100);

      // Generate smart organization suggestions
      const mockSuggestions: OrganizationSuggestion[] = [
        {
          type: 'collection',
          title: 'Create "Frontend Development" Collection',
          description: 'Group 23 React, JavaScript, and CSS resources together',
          impact: 'high',
          itemCount: 23,
          action: 'Auto-create collection'
        },
        {
          type: 'merge',
          title: 'Merge Similar AI/ML Content',
          description: 'Combine scattered machine learning resources into unified collection',
          impact: 'medium',
          itemCount: 15,
          action: 'Merge & organize'
        },
        {
          type: 'tag',
          title: 'Add Missing Tags',
          description: 'AI detected 8 items that could benefit from better tagging',
          impact: 'medium',
          itemCount: 8,
          action: 'Auto-tag content'
        },
        {
          type: 'archive',
          title: 'Archive Old Tutorials',
          description: 'Move outdated content (6+ months old) to archive',
          impact: 'low',
          itemCount: 12,
          action: 'Move to archive'
        }
      ];

      setSuggestions(mockSuggestions);
      
      toast({
        title: "Analysis Complete!",
        description: `Found ${mockSuggestions.length} optimization opportunities.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setAnalysisProgress(0), 1000);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'collection': return <FolderPlus className="h-4 w-4" />;
      case 'merge': return <ArrowRight className="h-4 w-4" />;
      case 'tag': return <Target className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const applySuggestion = (suggestion: OrganizationSuggestion) => {
    onApplySuggestion?.(suggestion);
    setSuggestions(prev => prev.filter(s => s !== suggestion));
    
    // Update organization score
    setOrganizationScore(prev => Math.min(prev + 5, 100));
    
    toast({
      title: "Suggestion Applied!",
      description: `${suggestion.title} has been implemented.`,
    });
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Smart Content Organizer
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Organization Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Organization Score</span>
              <Badge variant="outline" className="gap-1">
                <BarChart3 className="h-3 w-3" />
                {organizationScore}/100
              </Badge>
            </div>
            <Progress value={organizationScore} className="h-3" />
            <p className="text-xs text-muted-foreground">
              Based on tagging consistency, collection structure, and content distribution
            </p>
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing {contentCount} items...</span>
                <span>{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Organization Suggestions</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={analyzeCurrent}
                  disabled={isAnalyzing}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Re-analyze
                </Button>
              </div>
              
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(suggestion.type)}
                            <span className="font-medium">{suggestion.title}</span>
                            <Badge className={getImpactColor(suggestion.impact)}>
                              {suggestion.impact} impact
                            </Badge>
                          </div>
                          <Badge variant="outline">
                            {suggestion.itemCount} items
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {suggestion.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            Action: {suggestion.action}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => applySuggestion(suggestion)}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🚀 Organization Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• AI analyzes content patterns to suggest optimal organization</li>
              <li>• Higher organization scores improve search and discovery</li>
              <li>• Regular analysis helps maintain clean, efficient collections</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
