
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Brain, 
  Award, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Zap,
  BarChart3
} from 'lucide-react';

interface SkillArea {
  id: string;
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  assessmentDate: string;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  subSkills: string[];
  recommendations: string[];
}

interface AssessmentResult {
  id: string;
  skillName: string;
  score: number;
  level: 'novice' | 'intermediate' | 'advanced' | 'expert';
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
}

export const AISkillAssessment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'assessment' | 'results'>('overview');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  
  const [skillAreas] = useState<SkillArea[]>([
    {
      id: '1',
      name: 'React Development',
      category: 'Frontend',
      currentLevel: 78,
      targetLevel: 90,
      assessmentDate: '2024-01-15',
      confidence: 85,
      trend: 'up',
      subSkills: ['Hooks', 'Context', 'Performance', 'Testing'],
      recommendations: ['Study advanced patterns', 'Practice performance optimization']
    },
    {
      id: '2',
      name: 'Machine Learning',
      category: 'AI/ML',
      currentLevel: 45,
      targetLevel: 75,
      assessmentDate: '2024-01-10',
      confidence: 70,
      trend: 'up',
      subSkills: ['Algorithms', 'Data Processing', 'Model Evaluation'],
      recommendations: ['Complete ML course', 'Work on practical projects']
    },
    {
      id: '3',
      name: 'System Design',
      category: 'Architecture',
      currentLevel: 60,
      targetLevel: 85,
      assessmentDate: '2024-01-12',
      confidence: 75,
      trend: 'stable',
      subSkills: ['Scalability', 'Databases', 'Microservices', 'Caching'],
      recommendations: ['Practice interview questions', 'Study distributed systems']
    }
  ]);

  const [recentAssessment] = useState<AssessmentResult>({
    id: '1',
    skillName: 'React Development',
    score: 78,
    level: 'advanced',
    strengths: ['Component Architecture', 'State Management', 'Hooks Usage'],
    improvements: ['Performance Optimization', 'Testing Strategies', 'Advanced Patterns'],
    nextSteps: ['Study React 18 features', 'Practice micro-frontends', 'Learn Suspense patterns']
  });

  const getTrendIcon = (trend: SkillArea['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      default: return <BarChart3 className="h-3 w-3 text-gray-500" />;
    }
  };

  const getLevelBadgeColor = (level: AssessmentResult['level']) => {
    switch (level) {
      case 'novice': return 'bg-gray-100 text-gray-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-yellow-100 text-yellow-800';
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Skill Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Skills Tracked</span>
            </div>
            <div className="text-2xl font-bold">{skillAreas.length}</div>
            <div className="text-xs text-muted-foreground">Active assessments</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="font-medium">Avg Progress</span>
            </div>
            <div className="text-2xl font-bold">
              {Math.round(skillAreas.reduce((acc, skill) => acc + skill.currentLevel, 0) / skillAreas.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Overall skill level</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">Confidence</span>
            </div>
            <div className="text-2xl font-bold">
              {Math.round(skillAreas.reduce((acc, skill) => acc + skill.confidence, 0) / skillAreas.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Assessment accuracy</div>
          </CardContent>
        </Card>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        <h3 className="font-semibold">Your Skill Portfolio</h3>
        {skillAreas.map((skill) => (
          <Card key={skill.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{skill.name}</h4>
                    <Badge variant="outline">{skill.category}</Badge>
                    {getTrendIcon(skill.trend)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Level</span>
                        <span>{skill.currentLevel}%</span>
                      </div>
                      <Progress value={skill.currentLevel} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Target Level</span>
                        <span>{skill.targetLevel}%</span>
                      </div>
                      <Progress value={skill.targetLevel} className="h-2 opacity-50" />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {skill.subSkills.map((subSkill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {subSkill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Last assessed: {skill.assessmentDate} • Confidence: {skill.confidence}%
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                  <Button size="sm" onClick={() => setActiveTab('assessment')}>
                    <Zap className="h-3 w-3 mr-1" />
                    Reassess
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAssessmentTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="font-semibold mb-2">AI Skill Assessment</h3>
        <p className="text-muted-foreground mb-6">
          Select a skill area to begin an intelligent assessment tailored to your experience level
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillAreas.map((skill) => (
          <Card key={skill.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{skill.name}</h4>
                <Badge variant="outline">{skill.category}</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                Current level: {skill.currentLevel}%
              </div>
              <Button className="w-full" onClick={() => setActiveTab('results')}>
                <Zap className="h-3 w-3 mr-1" />
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-4 w-4 text-primary" />
            <h4 className="font-medium">How AI Assessment Works</h4>
          </div>
          <ul className="space-y-1 text-sm">
            <li>• Adaptive questioning based on your current knowledge level</li>
            <li>• Real-world scenario-based evaluations</li>
            <li>• Immediate feedback with personalized improvement plans</li>
            <li>• Progress tracking over time with confidence intervals</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  const renderResultsTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Award className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="font-semibold mb-2">Assessment Complete!</h3>
        <p className="text-muted-foreground">
          Your {recentAssessment.skillName} skills have been evaluated
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-primary mb-2">{recentAssessment.score}%</div>
            <Badge className={`${getLevelBadgeColor(recentAssessment.level)} mb-2`}>
              {recentAssessment.level.toUpperCase()}
            </Badge>
            <p className="text-muted-foreground">Overall Skill Level</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <h4 className="font-medium">Strengths</h4>
                </div>
                <ul className="space-y-1 text-sm">
                  {recentAssessment.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <h4 className="font-medium">Areas for Improvement</h4>
                </div>
                <ul className="space-y-1 text-sm">
                  {recentAssessment.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-orange-500 rounded-full" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Recommended Next Steps</h4>
              </div>
              <ul className="space-y-2 text-sm">
                {recentAssessment.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full mt-0.5">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <div className="flex gap-2 mt-6">
            <Button onClick={() => setActiveTab('overview')}>
              View All Skills
            </Button>
            <Button variant="outline" onClick={() => setActiveTab('assessment')}>
              Take Another Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            AI Skill Assessment
            <Badge variant="secondary">Intelligent Evaluation</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2">
            {[
              { key: 'overview', label: 'Skill Overview', icon: BarChart3 },
              { key: 'assessment', label: 'Take Assessment', icon: Brain },
              { key: 'results', label: 'Latest Results', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab.key as any)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'assessment' && renderAssessmentTab()}
          {activeTab === 'results' && renderResultsTab()}
        </CardContent>
      </Card>
    </div>
  );
};
