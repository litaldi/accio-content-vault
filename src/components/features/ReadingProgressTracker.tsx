
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
  CheckCircle,
  BarChart3,
  Flame
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
    { title: "Speed Reader", description: "Read 5 articles in one day", unlocked: true },
    { title: "Consistent Learner", description: "7-day reading streak", unlocked: true },
    { title: "Deep Diver", description: "Spent 2+ hours on complex content", unlocked: false },
    { title: "Knowledge Explorer", description: "Read across 5 different topics", unlocked: false }
  ];

  const weeklyData = [
    { day: 'Mon', articles: 3, time: 45 },
    { day: 'Tue', articles: 2, time: 30 },
    { day: 'Wed', articles: 4, time: 65 },
    { day: 'Thu', articles: 3, time: 40 },
    { day: 'Fri', articles: 5, time: 80 },
    { day: 'Sat', articles: 1, time: 15 },
    { day: 'Sun', articles: 0, time: 0 }
  ];

  const currentData = progressData[selectedPeriod];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Reading Progress Tracker
            <Badge variant="secondary">AI-Enhanced</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Period Selector */}
          <div className="flex gap-2">
            {(['week', 'month', 'year'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="capitalize"
              >
                This {period}
              </Button>
            ))}
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{currentData.articlesRead}</div>
                <div className="text-sm text-muted-foreground">Articles Read</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{currentData.timeSpent}m</div>
                <div className="text-sm text-muted-foreground">Time Spent</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {Math.round((currentData.timeSpent / currentData.goal) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Goal Progress</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{currentData.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>
          </div>

          {/* Reading Goal Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Weekly Reading Goal</h4>
                <span className="text-sm text-muted-foreground">
                  {currentData.timeSpent} / {currentData.goal} minutes
                </span>
              </div>
              <Progress 
                value={(currentData.timeSpent / currentData.goal) * 100} 
                className="h-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0 min</span>
                <span>{currentData.goal} min</span>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Chart */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Weekly Activity
              </h4>
              <div className="space-y-3">
                {weeklyData.map((day, index) => (
                  <div key={day.day} className="flex items-center gap-3">
                    <div className="w-8 text-xs text-muted-foreground">{day.day}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${(day.articles / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{day.articles}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground w-12">{day.time}m</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reading */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Recent Reading Activity
            </h4>
            <div className="space-y-3">
              {recentReading.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium mb-2">{item.title}</h5>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                          <span>{item.date}</span>
                          <span>{item.timeSpent} min</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              item.difficulty === 'Easy' ? 'border-green-500 text-green-700' :
                              item.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                              'border-red-500 text-red-700'
                            }`}
                          >
                            {item.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-300"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{item.progress}%</span>
                        </div>
                      </div>
                      {item.progress === 100 && (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-4" />
                      )}
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
                <Card key={index} className={achievement.unlocked ? 'bg-green-50 dark:bg-green-900/20' : 'opacity-50'}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Award className={`h-6 w-6 ${achievement.unlocked ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                      <div>
                        <h5 className="font-medium text-sm">{achievement.title}</h5>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
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
              Set Reading Schedule
            </Button>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Update Goals
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
