
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Lightbulb,
  HelpCircle,
  Zap,
  X,
  Minimize2,
  Maximize2,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface AssistantSuggestion {
  id: string;
  type: 'tip' | 'action' | 'shortcut' | 'workflow';
  title: string;
  description: string;
  context: string;
}

interface ContextualAssistantProps {
  className?: string;
}

export const ContextualAssistant: React.FC<ContextualAssistantProps> = ({ className }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [suggestions, setSuggestions] = useState<AssistantSuggestion[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant', message: string}>>([]);
  const [isThinking, setIsThinking] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    generateContextualSuggestions();
  }, []);

  const generateContextualSuggestions = () => {
    const mockSuggestions: AssistantSuggestion[] = [
      {
        id: '1',
        type: 'tip',
        title: 'Quick Save Tip',
        description: 'Press Ctrl+S to quickly save any webpage you\'re viewing',
        context: 'browsing'
      },
      {
        id: '2',
        type: 'action',
        title: 'Organize Your Content',
        description: 'You have 12 untagged items. Would you like me to suggest tags?',
        context: 'content-management'
      },
      {
        id: '3',
        type: 'workflow',
        title: 'Learning Path Available',
        description: 'Based on your recent saves, I can create a React learning path',
        context: 'learning'
      }
    ];

    setSuggestions(mockSuggestions);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessage = userMessage;
    setUserMessage('');
    setChatHistory(prev => [...prev, { role: 'user', message: newMessage }]);
    setIsThinking(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = `I understand you're asking about "${newMessage}". Based on your current context and content, here are some suggestions to help you move forward effectively.`;
      
      setChatHistory(prev => [...prev, { role: 'assistant', message: aiResponse }]);
      
      toast({
        title: "Assistant Response",
        description: "I've provided contextual suggestions for your question.",
      });
    } finally {
      setIsThinking(false);
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'tip': return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      case 'action': return <Zap className="h-4 w-4 text-blue-600" />;
      case 'shortcut': return <HelpCircle className="h-4 w-4 text-green-600" />;
      default: return <MessageCircle className="h-4 w-4 text-purple-600" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'tip': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800';
      case 'action': return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800';
      case 'shortcut': return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
      default: return 'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800';
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full h-12 w-12 shadow-lg"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`${className} fixed bottom-4 right-4 z-50 w-80`}>
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <MessageCircle className="h-4 w-4 text-primary" />
              AI Assistant
              <Badge variant="secondary" className="text-xs">Context-Aware</Badge>
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-6 w-6 p-0"
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Contextual Suggestions */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">Suggestions for you</h4>
            {suggestions.slice(0, 2).map((suggestion) => (
              <div
                key={suggestion.id}
                className={`p-2 rounded-lg border ${getSuggestionColor(suggestion.type)} cursor-pointer hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-start gap-2">
                  {getSuggestionIcon(suggestion.type)}
                  <div className="flex-1">
                    <h5 className="text-xs font-medium">{suggestion.title}</h5>
                    <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Interface */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">Chat with AI</h4>
            
            {/* Chat History */}
            <div className="max-h-32 overflow-y-auto space-y-2 text-xs">
              {chatHistory.slice(-3).map((chat, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    chat.role === 'user' 
                      ? 'bg-primary/10 ml-4' 
                      : 'bg-muted mr-4'
                  }`}
                >
                  <span className="font-medium">
                    {chat.role === 'user' ? 'You: ' : 'AI: '}
                  </span>
                  {chat.message}
                </div>
              ))}
              {isThinking && (
                <div className="bg-muted mr-4 p-2 rounded text-xs">
                  <span className="font-medium">AI: </span>
                  <span className="animate-pulse">Thinking...</span>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask me anything..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="min-h-[60px] text-xs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                size="sm"
                onClick={handleSendMessage}
                disabled={!userMessage.trim() || isThinking}
                className="self-end"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="text-xs flex-1">
              Help Me Organize
            </Button>
            <Button variant="outline" size="sm" className="text-xs flex-1">
              What's Next?
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
