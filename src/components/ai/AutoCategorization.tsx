
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Wand2, FolderPlus, Archive, Merge } from 'lucide-react';
import { SavedContent } from '@/types';
import { autoCategorizationService } from '@/services/autoCategorizationService';

interface AutoCategorizationProps {
  content: SavedContent;
  allContent: SavedContent[];
  onApplySuggestion: (tags: string[]) => void;
  className?: string;
}

export const AutoCategorization: React.FC<AutoCategorizationProps> = ({
  content,
  allContent,
  onApplySuggestion,
  className
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const analyzeContent = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const categorySuggestions = autoCategorizationService.categorizeContent(content);
      setSuggestions(categorySuggestions);
    } catch (error) {
      console.error('Auto-categorization error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const collectionSuggestions = autoCategorizationService.suggestCollections(allContent);
  const cleanupActions = autoCategorizationService.suggestCleanupActions(allContent);

  return (
    <div className={className}>
      {/* Content Analysis */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-blue-600" />
            AI Content Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={analyzeContent}
            disabled={isAnalyzing}
            className="w-full gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Analyzing...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Analyze This Content
              </>
            )}
          </Button>

          {suggestions.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Suggested Categories & Tags:</h4>
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{suggestion.category}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={suggestion.confidence} className="w-16 h-2" />
                      <span className="text-xs text-muted-foreground">
                        {suggestion.confidence}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {suggestion.reason}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {suggestion.suggestedTags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onApplySuggestion(suggestion.suggestedTags)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Collection Suggestions */}
      {collectionSuggestions.length > 0 && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderPlus className="h-5 w-5 text-green-600" />
              Suggested Collections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {collectionSuggestions.map((collection, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="font-medium text-sm">{collection.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {collection.criteria} • {collection.count} items
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Create
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cleanup Suggestions */}
      {cleanupActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Archive className="h-5 w-5 text-orange-600" />
              Content Cleanup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cleanupActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="font-medium text-sm flex items-center gap-2">
                      {action.action === 'Merge Duplicates' && <Merge className="h-4 w-4" />}
                      {action.action === 'Archive or Tag' && <Archive className="h-4 w-4" />}
                      {action.action}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {action.reason} • {action.content.length} items
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
