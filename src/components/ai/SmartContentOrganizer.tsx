
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FolderTree, 
  Sparkles,
  Archive,
  Merge,
  Tag,
  CheckCircle,
  ArrowRight,
  Wand2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrganizationSuggestion {
  id: string;
  type: 'create_folder' | 'merge_similar' | 'archive_old' | 'tag_untagged';
  title: string;
  description: string;
  itemCount: number;
  confidence: number;
  estimatedTime: string;
}

interface SmartContentOrganizerProps {
  className?: string;
}

export const SmartContentOrganizer: React.FC<SmartContentOrganizerProps> = ({ className }) => {
  const [suggestions, setSuggestions] = useState<OrganizationSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    analyzeSuggestions();
  }, []);

  const analyzeSuggestions = async () => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSuggestions: OrganizationSuggestion[] = [
        {
          id: '1',
          type: 'create_folder',
          title: 'Create "Frontend Development" Collection',
          description: 'Group 15 React, CSS, and JavaScript articles together',
          itemCount: 15,
          confidence: 92,
          estimatedTime: '2 min'
        },
        {
          id: '2',
          type: 'tag_untagged',
          title: 'Auto-tag 8 Programming Articles',
          description: 'Add relevant tags to recently saved coding tutorials',
          itemCount: 8,
          confidence: 87,
          estimatedTime: '1 min'
        },
        {
          id: '3',
          type: 'merge_similar',
          title: 'Merge Duplicate Productivity Articles',
          description: 'Combine 5 similar articles about time management',
          itemCount: 5,
          confidence: 95,
          estimatedTime: '3 min'
        },
        {
          id: '4',
          type: 'archive_old',
          title: 'Archive Outdated Technology Articles',
          description: 'Move 12 old tech articles (2+ years) to archive',
          itemCount: 12,
          confidence: 78,
          estimatedTime: '1 min'
        }
      ];

      setSuggestions(mockSuggestions);
      
      toast({
        title: "Organization Analysis Complete!",
        description: "AI found several ways to improve your content organization.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const executeSuggestion = async (suggestion: OrganizationSuggestion) => {
    setCompletedTasks(prev => [...prev, suggestion.id]);
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
    
    toast({
      title: "Organization Task Completed!",
      description: `Successfully completed: ${suggestion.title}`,
    });
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'create_folder': return <FolderTree className="h-4 w-4 text-blue-600" />;
      case 'tag_untagged': return <Tag className="h-4 w-4 text-green-600" />;
      case 'merge_similar': return <Merge className="h-4 w-4 text-purple-600" />;
      case 'archive_old': return <Archive className="h-4 w-4 text-orange-600" />;
      default: return <Wand2 className="h-4 w-4 text-primary" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="h-5 w-5 text-primary" />
            Smart Content Organizer
            <Badge variant="secondary">AI-Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex gap-2">
            <Button
              onClick={analyzeSuggestions}
              disabled={isAnalyzing}
              className="gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analyze Organization
                </>
              )}
            </Button>
          </div>

          {/* Organization Suggestions */}
          <div className="space-y-4">
            {suggestions.length === 0 && completedTasks.length === 0 ? (
              <div className="text-center py-8">
                <FolderTree className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium mb-1">Ready to Organize</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Analyze Organization" to get AI-powered suggestions for better content organization.
                </p>
              </div>
            ) : (
              <>
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getSuggestionIcon(suggestion.type)}
                            <span className="font-medium">{suggestion.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${getConfidenceColor(suggestion.confidence)}`}>
                              {suggestion.confidence}%
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {suggestion.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{suggestion.itemCount} items</span>
                            <span>~{suggestion.estimatedTime}</span>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => executeSuggestion(suggestion)}
                            className="gap-1"
                          >
                            <CheckCircle className="h-3 w-3" />
                            Execute
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Completed Tasks */}
                {completedTasks.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Completed Tasks ({completedTasks.length})
                    </h4>
                    <p className="text-xs text-green-600">
                      Great job! Your content is now better organized.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Organization Score */}
          <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Organization Health Score</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Organization</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Good organization! Complete the suggestions above to reach 95%.
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🗂️ Organization Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• AI analyzes your content patterns to suggest optimal organization</li>
              <li>• Higher confidence scores indicate stronger organizational benefits</li>
              <li>• Regular organization helps you find content faster</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
