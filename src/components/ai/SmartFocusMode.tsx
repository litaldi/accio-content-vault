
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Focus, 
  Target,
  Clock,
  Brain,
  Pause,
  Play,
  SkipForward,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FocusSession {
  id: string;
  title: string;
  description: string;
  estimatedDuration: number; // in minutes
  content: Array<{
    id: string;
    title: string;
    type: 'article' | 'video' | 'tutorial';
    duration: number;
  }>;
}

interface SmartFocusModeProps {
  className?: string;
}

export const SmartFocusMode: React.FC<SmartFocusModeProps> = ({ className }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentSession, setCurrentSession] = useState<FocusSession | null>(null);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  const availableSessions: FocusSession[] = [
    {
      id: '1',
      title: 'React Fundamentals Deep Dive',
      description: 'Comprehensive study session covering React hooks, components, and state management',
      estimatedDuration: 45,
      content: [
        { id: '1', title: 'React Hooks Explained', type: 'article', duration: 15 },
        { id: '2', title: 'Component Lifecycle', type: 'video', duration: 20 },
        { id: '3', title: 'State Management Best Practices', type: 'tutorial', duration: 10 }
      ]
    },
    {
      id: '2',
      title: 'JavaScript ES6+ Features',
      description: 'Modern JavaScript features and patterns for better code',
      estimatedDuration: 30,
      content: [
        { id: '4', title: 'Arrow Functions & Destructuring', type: 'article', duration: 10 },
        { id: '5', title: 'Async/Await Patterns', type: 'tutorial', duration: 15 },
        { id: '6', title: 'Module Systems', type: 'video', duration: 5 }
      ]
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            completeSession();
            return 0;
          }
          return prev - 1;
        });
        
        setSessionProgress(prev => {
          const totalTime = currentSession?.estimatedDuration || 1;
          const elapsed = totalTime * 60 - timeRemaining;
          return (elapsed / (totalTime * 60)) * 100;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeRemaining, currentSession]);

  const startSession = (session: FocusSession) => {
    setCurrentSession(session);
    setTimeRemaining(session.estimatedDuration * 60); // Convert to seconds
    setSessionProgress(0);
    setIsActive(true);
    setIsPaused(false);
    
    toast({
      title: "Focus Session Started!",
      description: `Beginning "${session.title}" - ${session.estimatedDuration} minutes`,
    });
  };

  const pauseSession = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Session Resumed" : "Session Paused",
      description: isPaused ? "Back to focused learning!" : "Take your time.",
    });
  };

  const completeSession = () => {
    setIsActive(false);
    setCurrentSession(null);
    setSessionProgress(100);
    
    toast({
      title: "Session Complete! 🎉",
      description: "Great job on your focused learning session.",
    });
  };

  const skipToNext = () => {
    // In a real implementation, this would move to the next content item
    setSessionProgress(prev => Math.min(prev + 33, 100));
    
    toast({
      title: "Moved to Next Item",
      description: "Continuing with your learning path.",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Focus className="h-5 w-5 text-primary" />
            Smart Focus Mode
            <Badge variant="secondary">AI-Curated</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Active Session */}
          {isActive && currentSession ? (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-medium mb-1">{currentSession.title}</h3>
                <p className="text-sm text-muted-foreground">{currentSession.description}</p>
              </div>
              
              {/* Timer Display */}
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-primary mb-2">
                  {formatTime(timeRemaining)}
                </div>
                <Progress value={sessionProgress} className="h-3 mb-4" />
                <p className="text-sm text-muted-foreground">
                  {Math.round(sessionProgress)}% complete
                </p>
              </div>
              
              {/* Controls */}
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={pauseSession}
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={skipToNext}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={completeSession}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Content Progress */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Session Content:</h4>
                {currentSession.content.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2 p-2 rounded border">
                    <div className={`h-2 w-2 rounded-full ${
                      index < Math.floor((sessionProgress / 100) * currentSession.content.length)
                        ? 'bg-green-500' 
                        : 'bg-gray-300'
                    }`} />
                    <span className="text-sm flex-1">{item.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.duration}m
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Session Selection */
            <div className="space-y-4">
              <div className="text-center">
                <Brain className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-medium mb-1">Choose Your Focus Session</h3>
                <p className="text-sm text-muted-foreground">
                  AI-curated learning sessions based on your saved content
                </p>
              </div>
              
              <div className="space-y-3">
                {availableSessions.map((session) => (
                  <Card key={session.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{session.title}</h4>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {session.estimatedDuration}m
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {session.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {session.content.length} items
                          </span>
                          <Button
                            size="sm"
                            onClick={() => startSession(session)}
                          >
                            <Target className="h-3 w-3 mr-1" />
                            Start Focus
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg space-y-3">
            <h4 className="text-sm font-medium">Focus Settings</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Block distractions</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Background sounds</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Break reminders</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
