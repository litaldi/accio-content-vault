
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp,
  Calendar,
  Award,
  Eye,
  CheckCircle
} from 'lucide-react';

export const ReadingProgressTracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const progressData = {
    today: {
      articlesRead: 3,
      timeSpent: 45, // minutes
      goal: 60,
      streak: 7
    },
    week: {
      articlesRead: 18,
      timeSpent: 320,
      goal: 400,
      streak: 7
    },
    month: {
      articlesRead: 67,
      timeSpent: 1240,
      goal: 1600,
      streak: 28
    }
  };

  const recentReading = [
    {
      title: "The Future of Artificial Intelligence",
      progress: 100,
      timeSpent: 15,
      date: "Today",
      type: "Article",
      difficulty: "Medium"
    },
    {
      title: "Advanced Machine Learning Techniques",
      progress: 75,
      timeSpent: 22,
      date: "Today",
      type: "Research Paper",
      difficulty: "Hard"
    },
    {
      title: "Productivity Tips for Knowledge Workers",
      progress: 100,
      timeSpent: 8,
      date: "Yesterday",
      type: "Blog Post",
      difficulty: "Easy"
    },
    {
      title: "Understanding Deep Learning Networks",
      progress: 45,
      timeSpent: 18,
      date: "Yesterday",
      type: "Technical Guide",
      difficulty: "Hard"
    }
  ];

  const achievements = [
    { name: "Speed Reader", description: "Read 5 articles in one day", earned: true },
    { name: "Knowledge Seeker", description: "Maintain 7-day reading streak", earned: true },
    { name: "Deep Diver", description: "Complete 3 research papers", earned: false },
    { name: "Consistent Learner", description: "Read for 30 days straight", earned: false }
  ];

  const currentData = progressData[selectedPeriod];
  const progressPercentage = (currentData.timeSpent / currentData.goal) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Reading Progress Tracker
            <Badge variant="secondary">Personal Analytics</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Period Selection */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Time Period:</span>
            {(['week', 'month'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="capitalize"
              >
                {period}
              </Button>
            ))}
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{currentData.articlesRead}</div>
                <p className="text-xs text-muted-foreground">Articles Read</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{Math.floor(currentData.timeSpent / 60)}h {currentData.timeSpent % 60}m</div>
                <p className="text-xs text-muted-foreground">Time Spent</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{currentData.streak}</div>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{Math.round(progressPercentage)}%</div>
                <p className="text-xs text-muted-foreground">Goal Progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Reading Goal Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Reading Goal Progress
                </h4>
                <span className="text-sm text-muted-foreground">
                  {currentData.timeSpent} / {currentData.goal} minutes
                </span>
              </div>
              <Progress value={progressPercentage} className="mb-2" />
              <p className="text-xs text-muted-foreground">
                {currentData.goal - currentData.timeSpent > 0 
                  ? `${currentData.goal - currentData.timeSpent} minutes left to reach your goal`
                  : 'Goal achieved! 🎉'
                }
              </p>
            </CardContent>
          </Card>

          {/* Recent Reading Activity */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Reading Activity
            </h4>
            <div className="space-y-3">
              {recentReading.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium mb-1">{item.title}</h5>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          <div className={`w-2 h-2 rounded-full ${getDifficultyColor(item.difficulty)}`}></div>
                          <span className="text-xs text-muted-foreground">{item.difficulty}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{item.progress}%</span>
                            </div>
                            <Progress value={item.progress} className="h-2" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{item.timeSpent}m</div>
                            <div className="text-xs text-muted-foreground">reading time</div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {item.progress === 100 ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Reading Achievements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`${achievement.earned ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'opacity-50'}`}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{achievement.name}</h5>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Set Reading Goal
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Detailed Stats
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
