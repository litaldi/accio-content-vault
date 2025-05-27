
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface KnowledgeArea {
  id: string;
  name: string;
  proficiency: number;
  importance: 'high' | 'medium' | 'low';
  gapScore: number;
  suggestedResources: string[];
  relatedSkills: string[];
}

export const AIKnowledgeGapAnalyzer: React.FC = () => {
  const [knowledgeAreas] = useState<KnowledgeArea[]>([
    {
      id: '1',
      name: 'Machine Learning Algorithms',
      proficiency: 45,
      importance: 'high',
      gapScore: 85,
      suggestedResources: ['ML Course on Coursera', 'Hands-On ML Book', 'Kaggle Competitions'],
      relatedSkills: ['Python', 'Statistics', 'Data Science']
    },
    {
      id: '2',
      name: 'System Design',
      proficiency: 60,
      importance: 'high',
      gapScore: 70,
      suggestedResources: ['System Design Interview', 'Distributed Systems Course'],
      relatedSkills: ['Architecture', 'Scalability', 'Databases']
    },
    {
      id: '3',
      name: 'Cloud Architecture',
      proficiency: 75,
      importance: 'medium',
      gapScore: 40,
      suggestedResources: ['AWS Solutions Architect', 'Cloud Patterns'],
      relatedSkills: ['AWS', 'DevOps', 'Microservices']
    }
  ]);

  const [overallAnalysis] = useState({
    totalGaps: 12,
    criticalGaps: 3,
    improvementPotential: 67,
    learningEfficiency: 85
  });

  const getImportanceColor = (importance: KnowledgeArea['importance']) => {
    switch (importance) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getGapSeverity = (score: number) => {
    if (score >= 80) return { color: 'text-red-600', label: 'Critical' };
    if (score >= 60) return { color: 'text-orange-600', label: 'High' };
    if (score >= 40) return { color: 'text-yellow-600', label: 'Medium' };
    return { color: 'text-green-600', label: 'Low' };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Knowledge Gap Analyzer
            <Badge variant="secondary">Smart Insights</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overview Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="font-medium">Total Gaps</span>
                </div>
                <div className="text-2xl font-bold">{overallAnalysis.totalGaps}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Critical</span>
                </div>
                <div className="text-2xl font-bold">{overallAnalysis.criticalGaps}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Potential</span>
                </div>
                <div className="text-2xl font-bold">{overallAnalysis.improvementPotential}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Efficiency</span>
                </div>
                <div className="text-2xl font-bold">{overallAnalysis.learningEfficiency}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Knowledge Areas Analysis */}
          <div className="space-y-4">
            <h3 className="font-semibold">Knowledge Areas Analysis</h3>
            {knowledgeAreas.map((area) => {
              const gapSeverity = getGapSeverity(area.gapScore);
              return (
                <Card key={area.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{area.name}</h4>
                          <Badge className={getImportanceColor(area.importance)}>
                            {area.importance} priority
                          </Badge>
                          <Badge variant="outline" className={gapSeverity.color}>
                            {gapSeverity.label} Gap
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Current Proficiency</span>
                              <span>{area.proficiency}%</span>
                            </div>
                            <Progress value={area.proficiency} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Gap Score</span>
                              <span>{area.gapScore}%</span>
                            </div>
                            <Progress value={area.gapScore} className="h-2 [&>div]:bg-red-500" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium">Suggested Resources:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {area.suggestedResources.map((resource, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {resource}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-sm font-medium">Related Skills:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {area.relatedSkills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button size="sm" className="ml-4">
                        <ArrowRight className="h-3 w-3 mr-1" />
                        Start Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Recommendations */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-primary" />
                <h4 className="font-medium">AI Learning Recommendations</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li>• Focus on Machine Learning first - highest impact for your goals</li>
                <li>• Complete System Design fundamentals before advanced topics</li>
                <li>• Practice hands-on projects to bridge theory-practice gaps</li>
                <li>• Schedule 2-3 hours weekly for gap-filling activities</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
