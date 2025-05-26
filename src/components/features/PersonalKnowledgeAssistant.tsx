
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Send, 
  Brain, 
  Lightbulb,
  BookOpen,
  Search,
  Clock,
  Sparkles
} from 'lucide-react';

export const PersonalKnowledgeAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your personal knowledge assistant. I can help you find information, summarize content, and generate insights from your saved materials. What would you like to know?',
      timestamp: new Date(Date.now() - 300000),
      suggestions: ['Search my content', 'Summarize recent saves', 'Find learning gaps']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant' as const,
        content: getAIResponse(input),
        timestamp: new Date(),
        suggestions: ['Tell me more', 'Find related content', 'Save this insight']
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string) => {
    const responses = [
      'Based on your content library, I found several relevant articles about this topic. Here are the key insights...',
      'I\'ve analyzed your recent saves and found some interesting patterns. Would you like me to create a summary?',
      'I can help you find connections between this topic and your existing knowledge base. Let me search through your materials...',
      'This relates to several concepts you\'ve saved before. I can show you how they connect and suggest next steps for learning.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Personal Knowledge Assistant
          <Badge variant="secondary" className="ml-2">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {message.type === 'user' ? 'U' : <Brain className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-2">
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {message.timestamp.toLocaleTimeString()}
                  </div>

                  {message.suggestions && message.type === 'assistant' && (
                    <div className="flex flex-wrap gap-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <Brain className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="border-t p-3 bg-muted/20">
          <div className="flex gap-2 mb-3">
            <Button variant="outline" size="sm">
              <Search className="h-3 w-3 mr-1" />
              Search Content
            </Button>
            <Button variant="outline" size="sm">
              <BookOpen className="h-3 w-3 mr-1" />
              Summarize Recent
            </Button>
            <Button variant="outline" size="sm">
              <Lightbulb className="h-3 w-3 mr-1" />
              Find Insights
            </Button>
          </div>
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about your knowledge base..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
