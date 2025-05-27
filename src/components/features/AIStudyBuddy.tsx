
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  MessageSquare, 
  Target, 
  Trophy,
  Calendar,
  Clock,
  CheckCircle2,
  Star,
  Zap,
  Brain
} from 'lucide-react';

interface StudySession {
  id: string;
  topic: string;
  duration: number;
  participants: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  startTime: string;
  type: 'quiz' | 'discussion' | 'project' | 'review';
}

export const AIStudyBuddy: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [studyStreak, setStudyStreak] = useState(7);
  const [weeklyGoal, setWeeklyGoal] = useState(120); // minutes
  const [currentProgress, setCurrentProgress] = useState(85);

  const upcomingSessions: StudySession[] = [
    {
      id: '1',
      topic: 'React Hooks Deep Dive',
      duration: 45,
      participants: 12,
      difficulty: 'intermediate',
      startTime: '2:00 PM',
      type: 'discussion'
    },
    {
      id: '2',
      topic: 'TypeScript Generics Quiz',
      duration: 30,
      participants: 8,
      difficulty: 'advanced',
      startTime: '4:30 PM',
      type: 'quiz'
    },
    {
      id: '3',
      topic: 'Component Design Patterns',
      duration: 60,
      participants: 15,
      difficulty: 'intermediate',
      startTime: '6:00 PM',
      type: 'project'
    }
  ];

  const achievements = [
    { title: '7 Day Streak', icon: Trophy, earned: true },
    { title: 'Quiz Master', icon: Brain, earned: true },
    { title: 'Team Player', icon: Users, earned: false },
    { title: 'Study Champion', icon: Star, earned: false }
  ];

  const getDifficultyColor = (difficulty: StudySession['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
    }
  };

  const getTypeIcon = (type: StudySession['type']) => {
    switch (type) {
      case 'quiz': return Brain;
      case 'discussion': return MessageSquare;
      case 'project': return Target;
      case 'review': return CheckCircle2;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            AI Study Buddy
            <Badge variant="secondary">Social Learning</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Study Streak</span>
                </div>
                <div className="text-2xl font-bold">{studyStreak} days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Weekly Goal</span>
                </div>
                <div className="space-y-2">
                  <Progress value={currentProgress} className="h-2" />
                  <div className="text-sm">
                    {Math.round((currentProgress / 100) * weeklyGoal)} / {weeklyGoal} min
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Sessions Today</span>
                </div>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Upcoming Study Sessions</h3>
            <div className="space-y-3">
              {upcomingSessions.map((session) => {
                const TypeIcon = getTypeIcon(session.type);
                return (
                  <Card 
                    key={session.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedSession === session.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedSession(selectedSession === session.id ? null : session.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <TypeIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{session.topic}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.duration} min
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {session.participants} joined
                              </span>
                              <span>{session.startTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(session.difficulty)}>
                            {session.difficulty}
                          </Badge>
                          <Badge variant="outline">{session.type}</Badge>
                        </div>
                      </div>
                      
                      {selectedSession === session.id && (
                        <div className="mt-4 pt-4 border-t space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Join this collaborative learning session to study with peers and get AI-powered insights.
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm">
                              Join Session
                            </Button>
                            <Button size="sm" variant="outline">
                              Set Reminder
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card 
                    key={index} 
                    className={achievement.earned ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' : 'opacity-50'}
                  >
                    <CardContent className="p-3 text-center">
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${achievement.earned ? 'text-yellow-600' : 'text-muted-foreground'}`} />
                      <p className="text-sm font-medium">{achievement.title}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Study Buddy Chat */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-5 w-5 text-primary" />
                <h4 className="font-medium">AI Study Assistant</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm">
                    "Great progress today! You've completed 2 study sessions. 
                    Ready for the React Hooks session at 2 PM? I've prepared some practice questions for you."
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Ask your study buddy..." className="flex-1" />
                  <Button size="sm">Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
