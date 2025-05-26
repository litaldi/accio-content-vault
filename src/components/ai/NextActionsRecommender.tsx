
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Target,
  Clock,
  Star,
  ArrowRight,
  BookOpen,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NextAction {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'learning' | 'organization' | 'productivity' | 'discovery';
  estimatedTime: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NextActionsRecommenderProps {
  userActivity?: any;
  className?: string;
}

export const NextActionsRecommender: React.FC<NextActionsRecommenderProps> = ({
  userActivity,
  className
}) => {
  const [actions, setActions] = useState<NextAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    generateRecommendations();
  }, [userActivity]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockActions: NextAction[] = [
        {
          id: '1',
          title: 'Review Your JavaScript Learning Path',
          description: 'You have 5 unread JavaScript tutorials. Perfect time to continue your learning journey.',
          priority: 'high',
          category: 'learning',
          estimatedTime: '15 min',
          icon: BookOpen
        },
        {
          id: '2',
          title: 'Organize Recent AI Articles',
          description: 'Create a collection for the 8 AI articles you saved this week.',
          priority: 'medium',
          category: 'organization',
          estimatedTime: '5 min',
          icon: Target
        },
        {
          id: '3',
          title: 'Explore Trending React Content',
          description: 'Based on your interests, check out the latest React 18 features and updates.',
          priority: 'medium',
          category: 'discovery',
          estimatedTime: '20 min',
          icon: TrendingUp
        },
        {
          id: '4',
          title: 'Set Up Study Reminders',
          description: 'Configure smart reminders for your saved learning materials.',
          priority: 'low',
          category: 'productivity',
          estimatedTime: '10 min',
          icon: Clock
        }
      ];

      setActions(mockActions);
    } finally {
      setIsLoading(false);
    }
  };

  const executeAction = (action: NextAction) => {
    setActions(prev => prev.filter(a => a.id !== action.id));
    
    toast({
      title: "Action Started!",
      description: `Working on: ${action.title}`,
    });
  };

  const dismissAction = (actionId: string) => {
    setActions(prev => prev.filter(a => a.id !== actionId));
    
    toast({
      title: "Action Dismissed",
      description: "We'll suggest similar actions later.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'organization': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'productivity': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    }
  };

  if (isLoading) {
    return (
      <div className={className}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm text-muted-foreground">Generating personalized recommendations...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Next Actions for You
            <Badge variant="secondary">Personalized</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {actions.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-medium mb-1">All caught up!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Great job staying on top of your knowledge management.
              </p>
              <Button variant="outline" onClick={generateRecommendations}>
                <ArrowRight className="h-4 w-4 mr-1" />
                Check for new suggestions
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {actions.map((action) => (
                <Card key={action.id} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-primary/10 rounded">
                            <action.icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{action.title}</span>
                        </div>
                        <div className="flex gap-1">
                          <Badge className={getPriorityColor(action.priority)}>
                            {action.priority}
                          </Badge>
                          <Badge className={getCategoryColor(action.category)}>
                            {action.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {action.estimatedTime}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => dismissAction(action.id)}
                          >
                            Dismiss
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => executeAction(action)}
                          >
                            <ArrowRight className="h-3 w-3 mr-1" />
                            Start
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Insight */}
          <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">💡 AI Insights:</h4>
            <p className="text-muted-foreground">
              Recommendations are based on your recent activity, saved content patterns, and optimal learning schedules.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
