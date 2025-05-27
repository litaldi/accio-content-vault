
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  Maximize2,
  Search,
  Tag,
  Lightbulb,
  FileText,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  action: string;
}

export const AIContentAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI assistant. I can help you search your content, suggest tags, summarize articles, or answer questions about your saved items. What would you like to do?",
      timestamp: new Date(),
      suggestions: ['Search my content', 'Suggest tags', 'Summarize recent saves', 'Find forgotten items']
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions: QuickAction[] = [
    { id: 'search', label: 'Smart Search', icon: Search, action: 'Help me search for specific content' },
    { id: 'tags', label: 'Suggest Tags', icon: Tag, action: 'Suggest tags for my recent content' },
    { id: 'summarize', label: 'Summarize', icon: FileText, action: 'Summarize my recent saves' },
    { id: 'ideas', label: 'Find Ideas', icon: Lightbulb, action: 'Help me rediscover forgotten ideas' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(currentMessage),
        timestamp: new Date(),
        suggestions: generateSuggestions(currentMessage)
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('search') || lowerInput.includes('find')) {
      return "I can help you search through your content using natural language. Try asking something like 'Find articles about productivity from last month' or 'Show me notes tagged with work'. What are you looking for?";
    }
    
    if (lowerInput.includes('tag') || lowerInput.includes('organize')) {
      return "Based on your recent content, I suggest these tags: #productivity, #research, #ideas, #work-notes. I can also auto-tag your future saves. Would you like me to analyze specific content for better tags?";
    }
    
    if (lowerInput.includes('summarize') || lowerInput.includes('summary')) {
      return "I've found 12 items you saved this week. Here's a quick summary: 3 productivity articles, 5 research papers on AI, 2 design inspiration pieces, and 2 personal notes. Would you like me to create detailed summaries for any category?";
    }
    
    return "I understand you're looking for help with your content. I can assist with searching, organizing, summarizing, or finding connections between your saved items. What specific task can I help you with?";
  };

  const generateSuggestions = (input: string): string[] => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('search')) {
      return ['Search by date range', 'Find by content type', 'Search by tags', 'Find similar items'];
    }
    
    if (lowerInput.includes('tag')) {
      return ['Auto-tag recent saves', 'Organize by topic', 'Create new collections', 'Merge similar tags'];
    }
    
    return ['Show recent activity', 'Find trending topics', 'Suggest related content', 'Export summaries'];
  };

  const handleQuickAction = (action: string) => {
    setCurrentMessage(action);
    handleSendMessage();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMessage(suggestion);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className={cn(
          "fixed bottom-6 left-6 z-40 rounded-full shadow-lg",
          "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
          "transition-all duration-300 hover:scale-110"
        )}
        aria-label="Open AI Assistant"
      >
        <Bot className="h-5 w-5 mr-2" />
        AI Assistant
      </Button>
    );
  }

  return (
    <Card className={cn(
      "fixed bottom-6 left-6 z-40 w-96 shadow-xl border-0",
      "bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-md",
      isMinimized && "h-16"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            AI Assistant
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="h-2 w-2 mr-1" />
              Online
            </Badge>
          </CardTitle>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="space-y-4">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.action)}
                className="gap-2 text-xs h-8"
              >
                <action.icon className="h-3 w-3" />
                {action.label}
              </Button>
            ))}
          </div>

          {/* Messages */}
          <ScrollArea className="h-64 pr-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.type === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p>{message.content}</p>
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="h-6 text-xs p-1 w-full justify-start hover:bg-background/50"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Ask me anything..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              className="px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
