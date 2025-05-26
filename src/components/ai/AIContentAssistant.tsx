
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  X, 
  Send, 
  Lightbulb, 
  Sparkles,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIContentAssistantProps {
  onClose?: () => void;
}

export const AIContentAssistant: React.FC<AIContentAssistantProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // Get contextual suggestions based on current page
  const getContextualSuggestions = () => {
    const path = location.pathname;
    const suggestions = {
      '/': ['How can I get started?', 'What features are available?', 'Show me a quick tutorial'],
      '/dashboard': ['How to organize my content?', 'Best practices for tagging?', 'How to use collections?'],
      '/search': ['How does semantic search work?', 'Search tips and tricks', 'Using natural language queries'],
      '/collections': ['Creating smart collections', 'Auto-organizing content', 'Collection best practices'],
      '/features': ['Tell me about AI features', 'How to maximize productivity?', 'Advanced usage tips']
    };
    
    return suggestions[path as keyof typeof suggestions] || suggestions['/'];
  };

  const suggestions = getContextualSuggestions();

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate AI response (in real implementation, call your AI service)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = generateContextualResponse(content, location.pathname);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateContextualResponse = (question: string, path: string): string => {
    const responses = {
      'how can i get started': "Welcome to Accio! Start by saving your first piece of content using the 'Save Content' button. The AI will automatically suggest tags and help organize your knowledge base.",
      'what features are available': "Accio offers AI-powered search, smart tagging, content summarization, collections, and analytics. Check out the Features page for a complete overview!",
      'how to organize my content': "Use collections to group related content, let AI suggest tags automatically, and leverage the search function to find anything quickly. The system learns from your behavior to improve organization over time.",
      'how does semantic search work': "Semantic search understands the meaning behind your query, not just keywords. Try asking questions like 'Show me learning resources about AI' or 'Find recent programming tutorials'.",
      'search tips and tricks': "Use natural language queries, combine multiple concepts, and don't worry about exact keywords. The AI understands context and can find relevant content even with different terminology."
    };

    const lowerQuestion = question.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }

    // Default contextual response based on page
    const contextResponses = {
      '/dashboard': "I can help you organize your content, create collections, or explain any features. What would you like to know about managing your knowledge base?",
      '/search': "I'm here to help you find what you're looking for! Try using natural language queries or ask me about search techniques.",
      '/collections': "Collections are great for organizing related content. I can help you create smart collections or explain organization strategies.",
      '/features': "I can explain any of our AI features in detail. What specific capability interests you most?"
    };

    return contextResponses[path as keyof typeof contextResponses] || 
           "I'm your AI assistant for Accio! I can help you navigate the app, understand features, or answer questions about knowledge management. What can I help you with?";
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 shadow-2xl border-2 transition-all duration-200 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Assistant
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex flex-col h-[520px] p-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Lightbulb className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-4">
                  Hi! I'm your AI assistant. How can I help you today?
                </p>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs w-full"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
