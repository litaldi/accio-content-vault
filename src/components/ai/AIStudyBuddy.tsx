
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  User,
  Bot,
  Send,
  BookOpen,
  Lightbulb,
  HelpCircle,
  Sparkles,
  Volume2,
  ThumbsUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudyMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'explanation' | 'question' | 'encouragement' | 'suggestion';
}

interface StudyTopic {
  name: string;
  progress: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface AIStudyBuddyProps {
  className?: string;
}

export const AIStudyBuddy: React.FC<AIStudyBuddyProps> = ({ className }) => {
  const [messages, setMessages] = useState<StudyMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<StudyTopic | null>(null);
  const [studyMode, setStudyMode] = useState<'chat' | 'quiz' | 'explain'>('chat');
  const { toast } = useToast();

  useEffect(() => {
    initializeStudyBuddy();
  }, []);

  const initializeStudyBuddy = () => {
    const welcomeMessage: StudyMessage = {
      id: '1',
      role: 'assistant',
      content: "Hey there! I'm your AI Study Buddy 🤖 I'm here to help you learn, explain concepts, answer questions, and keep you motivated. What would you like to study today?",
      timestamp: new Date(),
      type: 'encouragement'
    };
    
    setMessages([welcomeMessage]);
    
    // Set a current topic based on user's recent activity
    setCurrentTopic({
      name: 'React Hooks',
      progress: 65,
      difficulty: 'intermediate'
    });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: StudyMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = generateAIResponse(inputMessage);
      
      setMessages(prev => [...prev, aiResponse]);
      
      toast({
        title: "Study Buddy Response",
        description: "I've provided a helpful response to your question!",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const generateAIResponse = (userInput: string): StudyMessage => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('explain') || lowerInput.includes('what is')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Great question! Let me break this down for you step by step. ${getExplanationResponse(lowerInput)}`,
        timestamp: new Date(),
        type: 'explanation'
      };
    } else if (lowerInput.includes('help') || lowerInput.includes('stuck')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I can see you're working through a challenge! That's completely normal in learning. Let's tackle this together. Can you tell me specifically what part is confusing you?",
        timestamp: new Date(),
        type: 'encouragement'
      };
    } else if (lowerInput.includes('quiz') || lowerInput.includes('test')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Perfect! I love when students want to test their knowledge. Here's a quick question: What are the rules you must follow when using React Hooks? (Hint: there are two main rules)",
        timestamp: new Date(),
        type: 'question'
      };
    } else {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `That's an interesting point about "${userInput}". Based on your current study topic (${currentTopic?.name}), I'd suggest exploring how this connects to your learning goals. Would you like me to explain how this fits into the bigger picture?`,
        timestamp: new Date(),
        type: 'suggestion'
      };
    }
  };

  const getExplanationResponse = (input: string): string => {
    if (input.includes('hooks')) {
      return "React Hooks are functions that let you 'hook into' React state and lifecycle features from function components. They allow you to use state and other React features without writing a class component. The most common hooks are useState (for managing state) and useEffect (for side effects). Think of them as special functions that give your components superpowers! 🦸‍♂️";
    } else if (input.includes('usestate')) {
      return "useState is a Hook that lets you add state to functional components. It returns an array with two elements: the current state value and a function to update it. For example: const [count, setCount] = useState(0). It's like having a memory for your component!";
    }
    return "I'd be happy to explain this concept! Can you be more specific about what you'd like me to clarify?";
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'explanation': return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'question': return <HelpCircle className="h-4 w-4 text-purple-600" />;
      case 'encouragement': return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case 'suggestion': return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      default: return <MessageCircle className="h-4 w-4 text-primary" />;
    }
  };

  const quickActions = [
    { label: "Explain this concept", action: () => setInputMessage("Can you explain ") },
    { label: "Quiz me", action: () => setInputMessage("Give me a quiz question about ") },
    { label: "I'm stuck", action: () => setInputMessage("I'm stuck on ") },
    { label: "Practice problems", action: () => setInputMessage("Give me practice problems for ") }
  ];

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            AI Study Buddy
            <Badge variant="secondary">Interactive Learning</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Study Topic */}
          {currentTopic && (
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Currently Studying: {currentTopic.name}</h4>
                    <p className="text-sm text-muted-foreground">Progress: {currentTopic.progress}%</p>
                  </div>
                  <Badge variant="outline">{currentTopic.difficulty}</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chat Messages */}
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  {message.role === 'assistant' && message.type && (
                    <div className="flex items-center gap-1 mb-1">
                      {getMessageIcon(message.type)}
                      <span className="text-xs font-medium capitalize">{message.type}</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-xs text-muted-foreground ml-2">Study Buddy is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Quick Actions:</h4>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="text-xs"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about your studies..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Study Modes */}
          <div className="flex gap-2">
            {[
              { mode: 'chat', label: 'Chat', icon: MessageCircle },
              { mode: 'quiz', label: 'Quiz Me', icon: HelpCircle },
              { mode: 'explain', label: 'Explain', icon: BookOpen }
            ].map(({ mode, label, icon: Icon }) => (
              <Button
                key={mode}
                variant={studyMode === mode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStudyMode(mode as any)}
                className="gap-1"
              >
                <Icon className="h-3 w-3" />
                {label}
              </Button>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm">
            <h4 className="font-medium mb-1">🤖 Study Buddy Tips:</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Ask me to explain concepts in simple terms</li>
              <li>• Request practice questions to test your knowledge</li>
              <li>• Tell me when you're stuck - I'm here to help!</li>
              <li>• I adapt my responses to your learning style and pace</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
