
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  GraduationCap,
  Lightbulb,
  BookOpen,
  Target,
  Zap,
  Send,
  RefreshCw,
  Heart,
  Trophy,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudySession {
  topic: string;
  duration: number;
  questionsAsked: number;
  conceptsLearned: string[];
  mood: 'excited' | 'focused' | 'struggling' | 'confident';
}

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  type: 'question' | 'explanation' | 'encouragement' | 'quiz';
}

interface AIStudyBuddyProps {
  className?: string;
}

export const AIStudyBuddy: React.FC<AIStudyBuddyProps> = ({ className }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [studyMode, setStudyMode] = useState<'chat' | 'quiz' | 'explain'>('chat');
  const { toast } = useToast();

  useEffect(() => {
    startStudySession();
  }, []);

  const startStudySession = () => {
    const session: StudySession = {
      topic: 'General Learning',
      duration: 0,
      questionsAsked: 0,
      conceptsLearned: [],
      mood: 'excited'
    };
    setCurrentSession(session);
    
    // Initial greeting
    const greeting: ChatMessage = {
      id: '1',
      content: "Hi there! I'm your AI Study Buddy! 🎓 I'm here to help you learn, answer questions, and keep you motivated. What would you like to explore today?",
      isUser: false,
      timestamp: new Date(),
      type: 'encouragement'
    };
    setMessages([greeting]);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
      type: 'question'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = generateStudyResponse(content);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        isUser: false,
        timestamp: new Date(),
        type: aiResponse.type
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Update session stats
      if (currentSession) {
        setCurrentSession(prev => prev ? {
          ...prev,
          questionsAsked: prev.questionsAsked + 1,
          duration: prev.duration + 1
        } : null);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const generateStudyResponse = (question: string): { content: string; type: ChatMessage['type'] } => {
    const lowerQuestion = question.toLowerCase();
    
    // Quiz mode responses
    if (lowerQuestion.includes('quiz') || lowerQuestion.includes('test')) {
      return {
        content: "Great! Let's do a quick quiz. Here's a question: What's the main benefit of using TypeScript over JavaScript? A) Better performance B) Type safety C) Smaller bundle size D) Easier syntax",
        type: 'quiz'
      };
    }
    
    // Explanation requests
    if (lowerQuestion.includes('explain') || lowerQuestion.includes('what is') || lowerQuestion.includes('how does')) {
      return {
        content: "I'd be happy to explain! Based on your question, it seems you want to understand a concept better. Let me break it down in simple terms with examples and help you connect it to what you already know. What specific part would you like me to focus on?",
        type: 'explanation'
      };
    }
    
    // Motivational responses
    if (lowerQuestion.includes('difficult') || lowerQuestion.includes('hard') || lowerQuestion.includes('stuck')) {
      return {
        content: "I understand it can feel challenging! 💪 Remember, every expert was once a beginner. Let's break this down into smaller, manageable pieces. What specific part is giving you trouble? We'll tackle it step by step!",
        type: 'encouragement'
      };
    }
    
    // Programming-related questions
    if (lowerQuestion.includes('react') || lowerQuestion.includes('javascript') || lowerQuestion.includes('code')) {
      return {
        content: "Excellent question about programming! 👨‍💻 I love helping with code concepts. Let me provide a clear explanation with examples. Would you like me to show you some code samples or explain the theory first?",
        type: 'explanation'
      };
    }
    
    // Default helpful response
    return {
      content: "That's a great question! I'm here to help you learn and understand. Let me think about the best way to explain this. Would you like me to provide a detailed explanation, give you some examples, or would you prefer a quick overview first?",
      type: 'explanation'
    };
  };

  const quickActions = [
    { label: "Explain a concept", icon: Lightbulb, action: () => sendMessage("Can you explain how React hooks work?") },
    { label: "Start a quiz", icon: Target, action: () => sendMessage("I'd like to take a quiz on JavaScript") },
    { label: "Study tips", icon: BookOpen, action: () => sendMessage("What are some effective study techniques?") },
    { label: "Need motivation", icon: Heart, action: () => sendMessage("I'm feeling stuck and need some encouragement") }
  ];

  const getMessageIcon = (type: ChatMessage['type']) => {
    switch (type) {
      case 'quiz': return <Target className="h-4 w-4 text-blue-600" />;
      case 'explanation': return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      case 'encouragement': return <Heart className="h-4 w-4 text-pink-600" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            AI Study Buddy
            <Badge variant="secondary">Interactive</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Study Session Stats */}
          {currentSession && (
            <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Session</span>
                </div>
                <div className="text-sm font-bold">{currentSession.duration} min</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Questions</span>
                </div>
                <div className="text-sm font-bold">{currentSession.questionsAsked}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Mood</span>
                </div>
                <div className="text-sm font-bold">{currentSession.mood}</div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto space-y-3 p-3 border rounded-lg bg-muted/10">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] space-y-1`}>
                  {!message.isUser && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {getMessageIcon(message.type)}
                      <span>Study Buddy</span>
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground ml-4'
                        : 'bg-white dark:bg-gray-800 border'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border p-3 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="text-muted-foreground">Study Buddy is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={action.action}
                className="justify-start gap-2 h-auto p-3"
              >
                <action.icon className="h-4 w-4" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about learning..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🤖 Study Buddy Features:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Ask questions and get personalized explanations</li>
              <li>• Request quizzes to test your knowledge</li>
              <li>• Get study tips and motivation when you need it</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
