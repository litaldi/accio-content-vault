
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, BookOpen } from 'lucide-react';

interface AIInsightsProps {
  currentContent?: any;
  allContent: any[];
  onContentClick: (content: any) => void;
  onSearchResults: (results: any[]) => void;
  onApplyTags: (tags: string[]) => void;
}

export const AIInsights: React.FC<AIInsightsProps> = ({
  currentContent,
  allContent,
  onContentClick,
  onSearchResults,
  onApplyTags,
}) => {
  const suggestedTags = ['productivity', 'learning', 'technology'];
  const relatedContent = allContent.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Insights</CardTitle>
            <Sparkles className="h-4 w-4 ml-auto text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allContent.length}</div>
            <p className="text-xs text-muted-foreground">
              Total items saved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Tags</CardTitle>
            <TrendingUp className="h-4 w-4 ml-auto text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {suggestedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suggestions</CardTitle>
            <BookOpen className="h-4 w-4 ml-auto text-primary" />
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onApplyTags(suggestedTags)}
              className="w-full"
            >
              Apply AI Tags
            </Button>
          </CardContent>
        </Card>
      </div>

      {relatedContent.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Content</CardTitle>
            <CardDescription>
              Content that might interest you based on your recent activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {relatedContent.map((item) => (
                <div
                  key={item.id}
                  className="p-2 rounded border cursor-pointer hover:bg-muted/50"
                  onClick={() => onContentClick(item)}
                >
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
