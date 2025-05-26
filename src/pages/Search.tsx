
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EnterpriseNavigation from '@/components/navigation/EnterpriseNavigation';
import EnterpriseFooter from '@/components/layout/EnterpriseFooter';
import { EnterpriseTypography, EnterpriseSpacing } from '@/components/ui/enterprise-design-system';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search as SearchIcon, 
  Filter, 
  Calendar, 
  User, 
  FileText, 
  Tag,
  Clock,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('all');

  const contentTypes = [
    { id: 'all', label: 'All Content', count: 1247 },
    { id: 'documents', label: 'Documents', count: 456 },
    { id: 'articles', label: 'Articles', count: 234 },
    { id: 'guides', label: 'Guides', count: 189 },
    { id: 'notes', label: 'Notes', count: 156 },
    { id: 'processes', label: 'Processes', count: 89 }
  ];

  const recentSearches = [
    'API authentication methods',
    'customer support workflow',
    'security compliance checklist',
    'team onboarding process',
    'product roadmap Q4'
  ];

  const suggestedQueries = [
    { query: 'Show me recent security updates', type: 'semantic' },
    { query: 'Find onboarding documents for new hires', type: 'semantic' },
    { query: 'What are our API rate limits?', type: 'semantic' },
    { query: 'Customer support escalation process', type: 'semantic' }
  ];

  const searchResults = [
    {
      id: '1',
      title: 'API Authentication Best Practices',
      excerpt: 'Complete guide to implementing secure authentication in our API endpoints including OAuth 2.0, JWT tokens, and rate limiting strategies...',
      type: 'Guide',
      author: 'Sarah Chen',
      date: '2024-01-15',
      tags: ['API', 'Security', 'Authentication'],
      relevance: 95
    },
    {
      id: '2',
      title: 'Customer Support Workflow Documentation',
      excerpt: 'Step-by-step process for handling customer inquiries, escalation procedures, and response time expectations for different priority levels...',
      type: 'Process',
      author: 'Marcus Rodriguez',
      date: '2024-01-10',
      tags: ['Support', 'Process', 'Customer'],
      relevance: 87
    },
    {
      id: '3',
      title: 'Q4 Security Compliance Checklist',
      excerpt: 'Comprehensive checklist for ensuring SOC 2 compliance, including data handling procedures, access controls, and audit requirements...',
      type: 'Document',
      author: 'Emily Watson',
      date: '2024-01-08',
      tags: ['Security', 'Compliance', 'SOC2'],
      relevance: 82
    }
  ];

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <>
      <Helmet>
        <title>Advanced Search - Accio Enterprise</title>
        <meta name="description" content="Search through your organization's knowledge base with powerful filters and AI-powered semantic search." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <EnterpriseNavigation />
        
        <main className="flex-grow">
          <EnterpriseSpacing.Section>
            <EnterpriseSpacing.Container>
              {/* Search Header */}
              <div className="text-center mb-12">
                <EnterpriseTypography.H1 className="mb-4">
                  Knowledge Search
                </EnterpriseTypography.H1>
                <EnterpriseTypography.Lead>
                  Find anything in your organization's knowledge base using natural language or keywords
                </EnterpriseTypography.Lead>
              </div>

              {/* Search Bar */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for documents, processes, or ask a question..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-12 h-14 text-lg bg-card border-2 focus:border-primary"
                  />
                  <Button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    size="sm"
                  >
                    Search
                  </Button>
                </div>
                
                {/* Quick Suggestions */}
                {!searchQuery && (
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQueries.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => setSearchQuery(suggestion.query)}
                          className="text-left justify-start"
                        >
                          <Sparkles className="h-3 w-3 mr-2" />
                          {suggestion.query}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                      </h3>
                      
                      {/* Content Type Filter */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3 text-sm">Content Type</h4>
                        <div className="space-y-2">
                          {contentTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setSelectedType(type.id)}
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                                selectedType === type.id 
                                  ? "bg-primary text-primary-foreground" 
                                  : "hover:bg-muted"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <span>{type.label}</span>
                                <span className="text-xs opacity-70">{type.count}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick Filters */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3 text-sm">Quick Filters</h4>
                        <div className="space-y-2">
                          {['Recent', 'Popular', 'My Content', 'Shared with me'].map((filter) => (
                            <Button
                              key={filter}
                              variant={activeFilters.includes(filter) ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => toggleFilter(filter)}
                              className="w-full justify-start text-sm"
                            >
                              {filter}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Recent Searches */}
                      <div>
                        <h4 className="font-medium mb-3 text-sm flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          Recent Searches
                        </h4>
                        <div className="space-y-1">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => setSearchQuery(search)}
                              className="w-full text-left px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Search Results */}
                <div className="lg:col-span-3">
                  {searchQuery ? (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-muted-foreground">
                          Found <span className="font-semibold">{searchResults.length}</span> results for "{searchQuery}"
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Sort by:</span>
                          <Button variant="ghost" size="sm">Relevance</Button>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {searchResults.map((result) => (
                          <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <FileText className="h-5 w-5 text-primary" />
                                  <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                                    {result.title}
                                  </h3>
                                </div>
                                <Badge variant="outline">{result.relevance}% match</Badge>
                              </div>
                              
                              <p className="text-muted-foreground mb-4 leading-relaxed">
                                {result.excerpt}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {result.author}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {result.date}
                                  </div>
                                  <Badge variant="secondary">{result.type}</Badge>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  {result.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      <Tag className="h-2 w-2 mr-1" />
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Card className="h-96">
                      <CardContent className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <EnterpriseTypography.H3 className="mb-2">
                            Start your search
                          </EnterpriseTypography.H3>
                          <EnterpriseTypography.Body>
                            Search through documents, guides, processes, and more using keywords or natural language questions.
                          </EnterpriseTypography.Body>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </EnterpriseSpacing.Container>
          </EnterpriseSpacing.Section>
        </main>
        
        <EnterpriseFooter />
      </div>
    </>
  );
};

export default Search;
