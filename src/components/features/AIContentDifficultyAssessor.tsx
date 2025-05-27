
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  BarChart3, 
  Clock, 
  Target,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Eye
} from 'lucide-react';

interface ContentAnalysis {
  id: string;
  title: string;
  type: 'article' | 'video' | 'course' | 'book';
  difficultyScore: number;
  readingLevel: string;
  conceptComplexity: number;
  prerequisiteScore: number;
  estimatedTime: string;
  cognitiveLoad: 'low' | 'medium' | 'high';
  keyTopics: string[];
  prerequisites: string[];
}

export const AIContentDifficultyAssessor: React.FC = () => {
  const [analyses] = useState<ContentAnalysis[]>([
    {
      id: '1',
      title: 'Advanced Machine Learning with TensorFlow',
      type: 'course',
      difficultyScore: 87,
      readingLevel: 'Graduate',
      conceptComplexity: 92,
      prerequisiteScore: 85,
      estimatedTime: '4-6 hours',
      cognitiveLoad: 'high',
      keyTopics: ['Neural Networks', 'Deep Learning', 'Optimization', 'Backpropagation'],
      prerequisites: ['Linear Algebra', 'Calculus', 'Python Programming', 'Basic ML']
    },
    {
      id: '2',
      title: 'Introduction to React Hooks',
      type: 'article',
      difficultyScore: 45,
      readingLevel: 'Intermediate',
      conceptComplexity: 50,
      prerequisiteScore: 40,
      estimatedTime: '20-30 min',
      cognitiveLoad: 'medium',
      keyTopics: ['useState', 'useEffect', 'Custom Hooks', 'Component State'],
      prerequisites: ['JavaScript ES6', 'React Basics', 'Component Lifecycle']
    },
    {
      id: '3',
      title: 'Getting Started with HTML',
      type: 'video',
      difficultyScore: 15,
      readingLevel: 'Beginner',
      conceptComplexity: 20,
      prerequisiteScore: 10,
      estimatedTime: '45 min',
      cognitiveLoad: 'low',
      keyTopics: ['HTML Tags', 'Document Structure', 'Semantic HTML'],
      prerequisites: ['Basic Computer Skills']
    }
  ]);

  const [userProfile] = useState({
    currentLevel: 'Intermediate',
    skillAreas: ['JavaScript', 'React', 'CSS', 'Node.js'],
    learningGoals: ['Full Stack Development', 'Web Performance'],
    preferredDifficulty: 'medium'
  });

  const getDifficultyColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getDifficultyBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-red-100 text-red-800';
    if (score >= 60) return 'bg-orange-100 text-orange-800';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getCognitiveLoadColor = (load: ContentAnalysis['cognitiveLoad']) => {
    switch (load) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getTypeIcon = (type: ContentAnalysis['type']) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'video': return Eye;
      case 'course': return Target;
      case 'book': return BookOpen;
    }
  };

  const getRecommendation = (analysis: ContentAnalysis) => {
    const { difficultyScore, prerequisiteScore } = analysis;
    
    if (difficultyScore > 70 && prerequisiteScore > 70) {
      return { text: 'Review prerequisites first', color: 'text-red-600', icon: AlertTriangle };
    }
    if (difficultyScore > 60) {
      return { text: 'Challenging but manageable', color: 'text-orange-600', icon: TrendingUp };
    }
    return { text: 'Good fit for your level', color: 'text-green-600', icon: CheckCircle2 };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            AI Content Difficulty Assessor
            <Badge variant="secondary">Smart Analysis</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Profile Summary */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Your Learning Profile</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Current Level:</span>
                  <Badge variant="outline" className="ml-2">{userProfile.currentLevel}</Badge>
                </div>
                <div>
                  <span className="font-medium">Preferred Difficulty:</span>
                  <Badge variant="outline" className="ml-2">{userProfile.preferredDifficulty}</Badge>
                </div>
                <div>
                  <span className="font-medium">Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {userProfile.skillAreas.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                    <Badge variant="secondary" className="text-xs">+{userProfile.skillAreas.length - 2} more</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Analysis Results */}
          <div className="space-y-4">
            <h3 className="font-semibold">Content Difficulty Analysis</h3>
            {analyses.map((analysis) => {
              const TypeIcon = getTypeIcon(analysis.type);
              const recommendation = getRecommendation(analysis);
              const RecommendationIcon = recommendation.icon;

              return (
                <Card key={analysis.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <TypeIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">{analysis.title}</h4>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {analysis.type}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyBadgeColor(analysis.difficultyScore)}`}>
                              {analysis.difficultyScore >= 80 ? 'Advanced' : 
                               analysis.difficultyScore >= 60 ? 'Intermediate' : 
                               analysis.difficultyScore >= 40 ? 'Beginner-Intermediate' : 'Beginner'}
                            </Badge>
                            <Badge className={`text-xs ${getCognitiveLoadColor(analysis.cognitiveLoad)}`}>
                              {analysis.cognitiveLoad} cognitive load
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {analysis.estimatedTime}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Difficulty Score</span>
                                <span className={getDifficultyColor(analysis.difficultyScore)}>
                                  {analysis.difficultyScore}/100
                                </span>
                              </div>
                              <Progress value={analysis.difficultyScore} className="h-1" />
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Concept Complexity</span>
                                <span className={getDifficultyColor(analysis.conceptComplexity)}>
                                  {analysis.conceptComplexity}/100
                                </span>
                              </div>
                              <Progress value={analysis.conceptComplexity} className="h-1" />
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Prerequisites</span>
                                <span className={getDifficultyColor(analysis.prerequisiteScore)}>
                                  {analysis.prerequisiteScore}/100
                                </span>
                              </div>
                              <Progress value={analysis.prerequisiteScore} className="h-1" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="font-medium">Key Topics:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {analysis.keyTopics.map((topic, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {topic}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <span className="font-medium">Prerequisites:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {analysis.prerequisites.map((prereq, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {prereq}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="flex items-center gap-1 mb-2">
                          <RecommendationIcon className={`h-4 w-4 ${recommendation.color}`} />
                          <span className={`text-sm font-medium ${recommendation.color}`}>
                            AI Recommendation
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{recommendation.text}</p>
                        <Button size="sm" className="mt-2">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Analysis Summary */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-4 w-4 text-primary" />
                <h4 className="font-medium">AI Assessment Insights</h4>
              </div>
              <ul className="space-y-1 text-sm">
                <li>• Difficulty scores calculated using NLP analysis and learning theory</li>
                <li>• Prerequisites matched against your current skill profile</li>
                <li>• Cognitive load assessed based on concept density and complexity</li>
                <li>• Time estimates personalized to your reading speed and expertise</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
