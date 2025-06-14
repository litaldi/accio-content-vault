
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb,
  Star,
  ArrowRight
} from 'lucide-react';

export const KnowledgeInsights: React.FC = () => {
  const insights = {
    knowledgeScore: 87,
    learningVelocity: '+23%',
    topInterests: [
      { topic: 'Frontend Development', percentage: 45 },
      { topic: 'AI & Machine Learning', percentage: 30 },
      { topic: 'Design Systems', percentage: 25 },
    ],
    recommendations: [
      'Complete your React learning path',
      'Explore advanced TypeScript patterns',
      'Review saved accessibility guidelines',
    ],
    achievements: [
      { name: 'Knowledge Curator', description: '100+ items saved' },
      { name: 'Tag Master', description: '50+ unique tags' },
      { name: 'Consistent Learner', description: '7 day streak' },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Knowledge Score */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Knowledge Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl font-bold text-primary">{insights.knowledgeScore}</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              {insights.learningVelocity}
            </Badge>
          </div>
          <Progress value={insights.knowledgeScore} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            Based on content diversity and learning patterns
          </p>
        </CardContent>
      </Card>

      {/* Top Interests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Your Interests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.topInterests.map((interest, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{interest.topic}</span>
                  <span className="text-muted-foreground">{interest.percentage}%</span>
                </div>
                <Progress value={interest.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {insights.recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <ArrowRight className="h-3 w-3 text-primary" />
                <span className="text-sm">{rec}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">{achievement.name}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
