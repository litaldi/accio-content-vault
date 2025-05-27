
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, ArrowRight } from 'lucide-react';

interface LearningGoal {
  goal: string;
  progress: number;
  nextStep: string;
}

interface LearningGoalsProgressProps {
  goals: LearningGoal[];
}

export const LearningGoalsProgress: React.FC<LearningGoalsProgressProps> = ({ goals }) => {
  return (
    <div>
      <h4 className="font-medium mb-3 flex items-center gap-2">
        <Target className="h-4 w-4" />
        Your Learning Goals
      </h4>
      <div className="space-y-3">
        {goals.map((goal, index) => (
          <Card key={index} className="bg-muted/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">{goal.goal}</h5>
                <span className="text-sm text-muted-foreground">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="mb-2" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Next: {goal.nextStep}</span>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
