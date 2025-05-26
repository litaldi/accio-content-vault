
import React, { useState, useRef, useEffect } from 'react';
import { Search, Command, Clock, Star, FileText, Folder } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { mockContents } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

interface QuickResult {
  id: string;
  title: string;
  type: 'content' | 'page' | 'collection' | 'recent';
  description?: string;
  path?: string;
  icon: React.ElementType;
}

interface OmniSearchBarProps {
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

export const OmniSearchBar: React.FC<OmniSearchBarProps> = ({
  placeholder = "Search everything... (Ctrl+K)",
  className = "",
  compact = false
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<QuickResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Quick access items
  const quickItems: QuickResult[] = [
    { id: 'dashboard', title: 'Dashboard', type: 'page', path: '/dashboard', icon: FileText },
    { id: 'collections', title: 'Collections', type: 'page', path: '/collections', icon: Folder },
    { id: 'analytics', title: 'Analytics', type: 'page', path: '/analytics', icon: Star },
    { id: 'intelligence', title: 'Content Intelligence', type: 'page', path: '/intelligence', icon: Command },
  ];

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(quickItems);
      return;
    }

    const contentResults: QuickResult[] = mockContents
      .filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5)
      .map(item => ({
        id: item.id,
        title: item.title,
        type: 'content' as const,
        description: item.description,
        icon: FileText
      }));

    const pageResults = quickItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults([...pageResults, ...contentResults]);
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    performSearch(value);
    setSelectedIndex(-1);
  };

  const handleResultSelect = (result: QuickResult) => {
    if (result.path) {
      navigate(result.path);
      toast({
        title: "Navigated",
        description: `Opened ${result.title}`,
      });
    } else if (result.type === 'content') {
      // Navigate to content view (you can implement this based on your routing)
      toast({
        title: "Content found",
        description: `Found: ${result.title}`,
      });
    }
    
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? results.length - 1 : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultSelect(results[selectedIndex]);
        }
        break;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`relative ${compact ? 'max-w-md' : 'max-w-2xl'} mx-auto`}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            setIsOpen(true);
            performSearch(query);
          }}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyNavigation}
          className={`pl-10 pr-16 ${compact ? 'h-10' : 'h-12'} transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          <Badge variant="outline" className="text-xs">
            <Command className="h-3 w-3 mr-1" />
            ⌘K
          </Badge>
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg border max-h-96 overflow-hidden">
          <CardContent className="p-0">
            {results.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                {!query && (
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">
                    Quick Access
                  </div>
                )}
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className={`flex items-center gap-3 px-3 py-2 hover:bg-accent cursor-pointer transition-colors ${
                      index === selectedIndex ? 'bg-accent' : ''
                    }`}
                    onClick={() => handleResultSelect(result)}
                  >
                    <result.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{result.title}</div>
                      {result.description && (
                        <div className="text-xs text-muted-foreground truncate">
                          {result.description}
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {result.type}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <div className="text-sm">No results found</div>
                <div className="text-xs">Try different keywords or browse pages above</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
