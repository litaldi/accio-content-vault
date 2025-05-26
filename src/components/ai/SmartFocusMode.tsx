
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Focus, 
  Play,
  Pause,
  RotateCcw,
  Target,
  Clock,
  CheckCircle,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FocusSession {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  items: string[];
}

interface SmartFocusModeProps {
  className?: string;
}

export const SmartFocusMode: React.FC<SmartFocusModeProps> = ({ className }) => {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [activeSession, setActiveSession] = useState<FocusSession | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    generateFocusSessions();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && activeSession) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, activeSession]);

  const generateFocusSessions = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSessions: FocusSession[] = [
        {
          id: '1',
          title: 'React Hooks Deep Dive',
          description: 'Focus session on advanced React hooks patterns and best practices',
          estimatedTime: 25,
          difficulty: 'medium',
          category: 'Frontend Development',
          items: ['Custom Hooks Tutorial', 'useContext Best Practices', 'useReducer vs useState', 'Performance Optimization']
        },
        {
          id: '2',
          title: 'Productivity Techniques Review',
          description: 'Learn and apply time management and productivity methods',
          estimatedTime: 15,
          difficulty: 'easy',
          category: 'Productivity',
          items: ['Pomodoro Technique Guide', 'GTD Principles', 'Time Blocking Methods']
        },
        {
          id: '3',
          title: 'TypeScript Advanced Types',
          description: 'Master complex TypeScript type patterns and utilities',
          estimatedTime: 35,
          difficulty: 'hard',
          category: 'Programming',
          items: ['Conditional Types', 'Mapped Types', 'Template Literal Types', 'Utility Types Deep Dive']
        }
      ];

      setSessions(mockSessions);
    } catch (error) {
      console.error('Error generating focus sessions:', error);
    }
  };

  const startSession = (session: FocusSession) => {
    setActiveSession(session);
    setIsRunning(true);
    setTimeElapsed(0);
    setCurrentItem(0);
    
    toast({
      title: "Focus Session Started!",
      description: `Starting ${session.title} - stay focused!`,
    });
  };

  const pauseSession = () => {
    setIsRunning(false);
    toast({
      title: "Session Paused",
      description: "Take a break and resume when ready.",
    });
  };

  const resumeSession = () => {
    setIsRunning(true);
    toast({
      title: "Session Resumed",
      description: "Back to focused learning!",
    });
  };

  const completeSession = () => {
    setIsRunning(false);
    setActiveSession(null);
    setTimeElapsed(0);
    setCurrentItem(0);
    
    toast({
      title: "Session Completed! 🎉",
      description: "Great job staying focused! Your learning streak continues.",
    });
  };

  const nextItem = () => {
    if (activeSession && currentItem < activeSession.items.length - 1) {
      setCurrentItem(prev => prev + 1);
    } else {
      completeSession();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getProgressPercentage = () => {
    if (!activeSession) return 0;
    return Math.round(((currentItem + 1) / activeSession.items.length) * 100);
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
          {!activeSession ? (
            <>
              {/* Available Sessions */}
              <div className="space-y-4">
                <h3 className="font-medium">Recommended Focus Sessions</h3>
                {sessions.map((session) => (
                  <Card key={session.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{session.title}</h4>
                            <p className="text-sm text-muted-foreground">{session.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getDifficultyColor(session.difficulty)}>
                              {session.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.estimatedTime} min
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {session.items.length} items
                          </span>
                          <Badge variant="outline">{session.category}</Badge>
                        </div>
                        
                        <Button
                          onClick={() => startSession(session)}
                          className="w-full gap-2"
                        >
                          <Play className="h-4 w-4" />
                          Start Focus Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tips */}
              <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg text-sm">
                <h4 className="font-medium mb-1">🎯 Focus Tips:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• AI curates content based on your learning goals and current skill level</li>
                  <li>• Sessions are optimized for maximum retention and engagement</li>
                  <li>• Take breaks between sessions to maintain peak focus</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Active Session */}
              <div className="text-center space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{activeSession.title}</h3>
                  <p className="text-muted-foreground">{activeSession.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{currentItem + 1} of {activeSession.items.length}</span>
                  </div>
                  <Progress value={getProgressPercentage()} className="h-3" />
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Current Item:</h4>
                  <p className="text-lg">{activeSession.items[currentItem]}</p>
                </div>
                
                <div className="flex items-center justify-center gap-8 text-2xl font-mono">
                  <div className="text-center">
                    <div className="text-primary">{formatTime(timeElapsed)}</div>
                    <div className="text-xs text-muted-foreground">Elapsed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">{formatTime(activeSession.estimatedTime * 60)}</div>
                    <div className="text-xs text-muted-foreground">Target</div>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-center">
                  {isRunning ? (
                    <Button onClick={pauseSession} variant="outline" className="gap-2">
                      <Pause className="h-4 w-4" />
                      Pause
                    </Button>
                  ) : (
                    <Button onClick={resumeSession} className="gap-2">
                      <Play className="h-4 w-4" />
                      Resume
                    </Button>
                  )}
                  
                  <Button onClick={nextItem} className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Complete Item
                  </Button>
                  
                  <Button onClick={completeSession} variant="outline" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    End Session
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
