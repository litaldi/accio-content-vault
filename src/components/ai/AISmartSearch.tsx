
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Sparkles, 
  Clock, 
  Filter,
  Brain,
  Zap
} from 'lucide-react';

export const AISmartSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSmartSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate AI-powered search
    setTimeout(() => {
      setSearchResults([
        {
          id: '1',
          title: 'React Performance Article',
          type: 'article',
          relevance: 95,
          reason: 'Matches your query about React optimization'
        },
        {
          id: '2',
          title: 'Performance Notes',
          type: 'note',
          relevance: 87,
          reason: 'Contains similar concepts and keywords'
        }
      ]);
      setIsSearching(false);
    }, 2000);
  };

  const exampleQueries = [
    "What did I save last week about branding?",
    "Find articles about React performance",
    "Show me notes from meetings",
    "Articles I haven't read yet"
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Smart Search
          <Badge variant="secondary">Natural Language</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ask me anything about your content..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              onKeyDown={(e) => e.key === 'Enter' && handleSmartSearch()}
            />
          </div>
          <Button onClick={handleSmartSearch} disabled={isSearching}>
            {isSearching ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((example, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => setQuery(example)}
              >
                {example}
              </Badge>
            ))}
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium">Search Results</h4>
            {searchResults.map((result) => (
              <div key={result.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{result.title}</h5>
                  <Badge variant="secondary">{result.relevance}% match</Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {result.reason}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
