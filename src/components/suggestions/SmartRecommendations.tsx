
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface SmartRecommendationsProps {
  allContent: any[];
  onContentClick: (content: any) => void;
  maxRecommendations?: number;
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  allContent,
  onContentClick,
  maxRecommendations = 3
}) => {
  // Simple recommendation: show recent content
  const recommendations = allContent
    .slice(0, maxRecommendations)
    .filter(item => item.title);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5" />
          Recommended
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="p-2 rounded border hover:bg-accent cursor-pointer transition-colors"
            onClick={() => onContentClick(item)}
          >
            <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {item.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
