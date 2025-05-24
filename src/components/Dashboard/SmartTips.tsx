
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, X, ArrowRight, BookOpen, Target, Zap } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  description: string;
  category: 'productivity' | 'feature' | 'optimization';
  actionLabel?: string;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

interface SmartTipsProps {
  tips: Tip[];
  onDismissTip: (tipId: string) => void;
  onTipAction: (tip: Tip) => void;
}

const SmartTips: React.FC<SmartTipsProps> = ({
  tips,
  onDismissTip,
  onTipAction
}) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'productivity': return Target;
      case 'feature': return Zap;
      case 'optimization': return BookOpen;
      default: return Lightbulb;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'productivity': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800';
      case 'feature': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800';
      case 'optimization': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800';
      default: return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'secondary';
    }
  };

  if (tips.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Smart Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tips available</p>
            <p className="text-xs">You're doing great!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentTip = tips[currentTipIndex];
  const CategoryIcon = getCategoryIcon(currentTip.category);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Smart Tips
            <Badge variant={getPriorityColor(currentTip.priority)} className="text-xs">
              {currentTip.priority}
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {currentTipIndex + 1} of {tips.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onDismissTip(currentTip.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg border ${getCategoryColor(currentTip.category)}`}>
          <div className="flex items-start gap-3">
            <CategoryIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 flex-1">
              <h4 className="font-medium text-sm">{currentTip.title}</h4>
              <p className="text-sm opacity-90">{currentTip.description}</p>
              
              <div className="flex items-center gap-2 pt-2">
                <Badge variant="outline" className="text-xs capitalize">
                  {currentTip.category}
                </Badge>
                {currentTip.actionLabel && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs p-2"
                    onClick={() => onTipAction(currentTip)}
                  >
                    {currentTip.actionLabel}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {tips.length > 1 && (
          <div className="flex justify-between items-center pt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentTipIndex === 0}
              onClick={() => setCurrentTipIndex(Math.max(0, currentTipIndex - 1))}
            >
              Previous
            </Button>
            <div className="flex gap-1">
              {tips.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTipIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentTipIndex(index)}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={currentTipIndex === tips.length - 1}
              onClick={() => setCurrentTipIndex(Math.min(tips.length - 1, currentTipIndex + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartTips;
