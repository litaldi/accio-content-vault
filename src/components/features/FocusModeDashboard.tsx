
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Focus, 
  Clock, 
  Target, 
  Brain,
  Play,
  Pause,
  Square,
  Coffee,
  CheckCircle,
  Book,
  FileText,
  Zap,
  Timer
} from 'lucide-react';

export const FocusModeDashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentSession, setCurrentSession] = useState({
    type: 'Deep Work',
    duration: 25,
    elapsed: 12,
    task: 'Review AI Research Papers'
  });
  const [sessionType, setSessionType] = useState<'focus' | 'break' | 'long-break'>('focus');

  const sessionTypes = [
    { id: 'focus', label: 'Deep Work', duration: 25, icon: Brain, color: 'bg-blue-500' },
    { id: 'break', label: 'Short Break', duration: 5, icon: Coffee, color: 'bg-green-500' },
    { id: 'long-break', label: 'Long Break', duration: 15, icon: Coffee, color: 'bg-purple-500' }
  ];

  const todayStats = {
    sessionsCompleted: 6,
    totalFocusTime: 150, // minutes
    tasksCompleted: 4,
    currentStreak: 3
  };

  const focusTasks = [
    { id: 1, title: 'Review AI Research Papers', completed: false, priority: 'high', estimatedTime: 45 },
    { id: 2, title: 'Update Knowledge Base', completed: true, priority: 'medium', estimatedTime: 30 },
    { id: 3, title: 'Team Knowledge Sync', completed: false, priority: 'medium', estimatedTime: 25 },
    { id: 4, title: 'Content Curation', completed: false, priority: 'low', estimatedTime: 20 }
  ];

  const recentSessions = [
    { type: 'Deep Work', duration: 25, completed: true, task: 'Research Analysis', time: '2 hours ago' },
    { type: 'Short Break', duration: 5, completed: true, task: 'Refresh', time: '2.5 hours ago' },
    { type: 'Deep Work', duration: 25, completed: true, task: 'Documentation', time: '3 hours ago' }
  ];

  const progress = (currentSession.elapsed / currentSession.duration) * 100;

  const toggleSession = () => {
    setIsActive(!isActive);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-950';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-950';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Focus className="h-5 w-5 text-primary" />
            Focus Mode Dashboard
            <Badge variant="secondary">Productivity Boost</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Session */}
          <Card className={`border-2 ${isActive ? 'border-primary bg-primary/5' : 'border-muted'}`}>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{currentSession.type} Session</h3>
                <div className="text-6xl font-mono mb-4">
                  {Math.floor((currentSession.duration - currentSession.elapsed) / 60)}:
                  {String((currentSession.duration - currentSession.elapsed) % 60).padStart(2, '0')}
                </div>
                
                <Progress value={progress} className="mb-4" />
                
                <p className="text-muted-foreground mb-4">
                  Current Task: {currentSession.task}
                </p>
                
                <div className="flex gap-4 justify-center">
                  <Button onClick={toggleSession} size="lg">
                    {isActive ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                    {isActive ? 'Pause' : 'Start'}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Square className="h-5 w-5 mr-2" />
                    Stop
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Type Selection */}
          <div>
            <h4 className="font-medium mb-3">Session Types</h4>
            <div className="grid grid-cols-3 gap-3">
              {sessionTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Button
                    key={type.id}
                    variant={sessionType === type.id ? 'default' : 'outline'}
                    className="h-auto p-4 flex-col"
                    onClick={() => setSessionType(type.id as any)}
                  >
                    <div className={`w-8 h-8 ${type.color} rounded-full flex items-center justify-center mb-2`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-sm font-medium">{type.label}</div>
                    <div className="text-xs text-muted-foreground">{type.duration} min</div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Today's Stats */}
          <div>
            <h4 className="font-medium mb-3">Today's Progress</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{todayStats.sessionsCompleted}</div>
                  <p className="text-xs text-muted-foreground">Sessions Done</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{Math.floor(todayStats.totalFocusTime / 60)}h {todayStats.totalFocusTime % 60}m</div>
                  <p className="text-xs text-muted-foreground">Focus Time</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{todayStats.tasksCompleted}</div>
                  <p className="text-xs text-muted-foreground">Tasks Done</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{todayStats.currentStreak}</div>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Focus Tasks */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Focus Tasks Queue
            </h4>
            <div className="space-y-3">
              {focusTasks.map((task) => (
                <Card key={task.id} className={`border-l-4 ${getPriorityColor(task.priority)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {task.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                        )}
                        <div>
                          <h5 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h5>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Timer className="h-3 w-3" />
                            <span>{task.estimatedTime} min</span>
                            <Badge variant="outline" className="text-xs capitalize">
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Sessions */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Sessions
            </h4>
            <div className="space-y-2">
              {recentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">{session.type} • {session.duration}min</div>
                      <div className="text-xs text-muted-foreground">{session.task}</div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{session.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Book className="h-4 w-4 mr-2" />
              Reading Mode
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Note Taking
            </Button>
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Quick Capture
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
