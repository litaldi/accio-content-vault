
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  CheckCircle2, 
  Clock,
  Target,
  TrendingUp,
  Eye,
  Lightbulb
} from 'lucide-react';

interface ReadingSession {
  id: string;
  title: string;
  duration: string;
  comprehensionScore: number;
  keyConceptsGrasped: number;
  totalConcepts: number;
  readingSpeed: number;
  focusLevel: number;
}

export const AIReadingComprehension: React.FC = () => {
  const [sessions] = useState<ReadingSession[]>([
    {
      id: '1',
      title: 'Machine Learning Fundamentals',
      duration: '25 min',
      comprehensionScore: 87,
      keyConceptsGrasped: 8,
      totalConcepts: 10,
      readingSpeed: 245,
      focusLevel: 92
    },
    {
      id: '2',
      title: 'React State Management',
      duration: '18 min',
      comprehensionScore: 94,
      keyConceptsGrasped: 12,
      totalConcepts: 12,
      readingSpeed: 220,
      focusLevel: 88
    }
  ]);

  const [currentAnalysis] = useState({
    averageComprehension: 90,
    readingSpeedTrend: '+12%',
    focusImprovement: '+8%',
    weakAreas: ['Mathematical concepts', 'Algorithm complexity'],
    strengths: ['Practical applications', 'Code examples']
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Reading Comprehension Tracker
            <Badge variant="secondary">Smart Analysis</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Avg Comprehension</span>
                </div>
                <div className="text-2xl font-bold">{currentAnalysis.averageComprehension}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Speed Trend</span>
                </div>
                <div className="text-2xl font-bold">{currentAnalysis.readingSpeedTrend}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">Focus</span>
                </div>
                <div className="text-2xl font-bold">{currentAnalysis.focusImprovement}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Sessions</span>
                </div>
                <div className="text-2xl font-bold">{sessions.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sessions */}
          <div className="space-y-4">
            <h3 className="font-semibold">Recent Reading Sessions</h3>
            {sessions.map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{session.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {session.duration}
                        </span>
                        <span>{session.readingSpeed} WPM</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{session.comprehensionScore}%</div>
                      <div className="text-xs text-muted-foreground">Comprehension</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Concepts Grasped</span>
                        <span>{session.keyConceptsGrasped}/{session.totalConcepts}</span>
                      </div>
                      <Progress value={(session.keyConceptsGrasped / session.totalConcepts) * 100} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Focus Level</span>
                        <span>{session.focusLevel}%</span>
                      </div>
                      <Progress value={session.focusLevel} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Score</span>
                        <span>{session.comprehensionScore}%</span>
                      </div>
                      <Progress value={session.comprehensionScore} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <h4 className="font-medium">Strengths</h4>
                </div>
                <ul className="space-y-1 text-sm">
                  {currentAnalysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 dark:bg-yellow-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <h4 className="font-medium">Areas to Improve</h4>
                </div>
                <ul className="space-y-1 text-sm">
                  {currentAnalysis.weakAreas.map((area, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                      {area}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
