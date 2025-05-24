
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, CheckCircle, Circle } from 'lucide-react';

interface ProgressStep {
  id: string;
  title: string;
  completed: boolean;
  optional?: boolean;
}

interface ProgressTrackerProps {
  title: string;
  description: string;
  steps: ProgressStep[];
  onStepClick: (stepId: string) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  title,
  description,
  steps,
  onStepClick
}) => {
  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          {title}
          <Badge variant={progressPercentage === 100 ? "default" : "secondary"} className="ml-auto">
            {completedSteps}/{totalSteps}
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => onStepClick(step.id)}
            >
              <div className="flex-shrink-0">
                {step.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.title}
                </p>
              </div>
              {step.optional && (
                <Badge variant="outline" className="text-xs">
                  Optional
                </Badge>
              )}
            </div>
          ))}
        </div>

        {progressPercentage === 100 && (
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              All steps completed! Great job! 🎉
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
