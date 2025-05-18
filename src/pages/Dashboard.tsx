
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SemanticSearchBar from '@/components/SemanticSearchBar';
import ContentList from '@/components/ContentList';
import TagEditor from '@/components/TagEditor';
import { SavedContent, Tag, SearchResult } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Mock data for initial development
const mockContents: SavedContent[] = [
  {
    id: '1',
    user_id: 'user123',
    url: 'https://example.com/article1',
    title: 'How to Build a React App',
    description: 'Learn the basics of React and build your first application with this step-by-step tutorial.',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070',
    created_at: new Date(2025, 4, 10).toISOString(),
    tags: [
      { id: 't1', name: 'react', auto_generated: true, confirmed: true },
      { id: 't2', name: 'javascript', auto_generated: true, confirmed: true },
      { id: 't3', name: 'tutorial', auto_generated: true, confirmed: false }
    ]
  },
  {
    id: '2',
    user_id: 'user123',
    url: 'https://example.com/article2',
    title: 'Job Interview Tips',
    description: 'Top 10 tips to prepare for your next tech job interview and stand out from other candidates.',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2688',
    created_at: new Date(2025, 4, 15).toISOString(),
    tags: [
      { id: 't4', name: 'job', auto_generated: true, confirmed: true },
      { id: 't5', name: 'interview', auto_generated: true, confirmed: true },
      { id: 't6', name: 'career', auto_generated: true, confirmed: true }
    ]
  },
  {
    id: '3',
    user_id: 'user123',
    url: 'https://example.com/article3',
    title: 'Productivity Tools for Developers',
    description: 'A curated list of the best productivity tools that every developer should try in 2025.',
    created_at: new Date(2025, 4, 18).toISOString(),
    tags: [
      { id: 't7', name: 'productivity', auto_generated: true, confirmed: true },
      { id: 't8', name: 'tools', auto_generated: true, confirmed: true },
      { id: 't9', name: 'development', auto_generated: true, confirmed: true }
    ]
  },
  // Add a file example
  {
    id: '4',
    user_id: 'user123',
    title: 'Project Requirements.pdf',
    description: 'Project specifications and requirements document',
    file_url: 'https://example.com/files/requirements.pdf',
    file_type: 'pdf',
    file_size: 2500000,
    created_at: new Date(2025, 4, 19).toISOString(),
    tags: [
      { id: 't10', name: 'project', auto_generated: true, confirmed: true },
      { id: 't11', name: 'documentation', auto_generated: true, confirmed: true }
    ]
  }
];

const Dashboard = () => {
  const [contents, setContents] = useState<SavedContent[]>(mockContents);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(
    mockContents.map(content => ({ content }))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSemanticSearch, setIsSemanticSearch] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // This would be replaced with actual authentication check
  const isLoggedIn = true;

  // In a real app, we would fetch content from Supabase/API
  useEffect(() => {
    // Simulate loading data
    const fetchContent = async () => {
      try {
        // This would be a real API call in the full implementation
        console.log('Fetching content for dashboard...');
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setContents(mockContents);
        setSearchResults(mockContents.map(content => ({ content })));
      } catch (error) {
        console.error('Error fetching content:', error);
        toast({
          title: 'Error loading content',
          description: 'Failed to load your saved content',
          variant: 'destructive',
        });
      }
    };

    fetchContent();
  }, [toast]);

  // Mock function to simulate semantic search
  const simulateSemanticSearch = (query: string, contents: SavedContent[]): SearchResult[] => {
    // In a real implementation, this would use vector embeddings and similarity search
    
    // For now, we'll do simple text matching but add relevance scores
    const results = contents.map(content => {
      // Calculate a mock relevance score based on simple text matching
      let score = 0;
      
      // Check title (highest weight)
      if (content.title.toLowerCase().includes(query.toLowerCase())) {
        score += 0.6;
      }
      
      // Check description
      if (content.description.toLowerCase().includes(query.toLowerCase())) {
        score += 0.3;
      }
      
      // Check tags
      if (content.tags.some(tag => tag.name.toLowerCase().includes(query.toLowerCase()))) {
        score += 0.4;
      }
      
      return { content, score };
    });
    
    // Filter out low-relevance results
    const filteredResults = results.filter(result => result.score! > 0);
    
    // Sort by relevance score
    return filteredResults.sort((a, b) => (b.score || 0) - (a.score || 0));
  };

  // Basic keyword search function
  const basicSearch = (query: string, contents: SavedContent[]): SearchResult[] => {
    const lowercaseQuery = query.toLowerCase();
    
    const filtered = contents.filter(content => {
      // Check title and description
      if (
        content.title.toLowerCase().includes(lowercaseQuery) ||
        content.description.toLowerCase().includes(lowercaseQuery)
      ) {
        return true;
      }
      
      // Check tags
      return content.tags.some(tag => 
        tag.name.toLowerCase().includes(lowercaseQuery)
      );
    });
    
    return filtered.map(content => ({ content }));
  };

  const handleSearch = (query: string, useSemanticSearch: boolean) => {
    setSearchQuery(query);
    setIsSemanticSearch(useSemanticSearch);
    
    let results: SearchResult[];
    
    if (useSemanticSearch) {
      // Use semantic search
      results = simulateSemanticSearch(query, contents);
    } else {
      // Use basic search
      results = basicSearch(query, contents);
    }
    
    setSearchResults(results);
    
    // In a real app, track searches for analytics
    console.log(`Search performed: ${query} (Semantic: ${useSemanticSearch})`);
    
    if (results.length === 0) {
      toast({
        title: 'No results found',
        description: `No content matches "${query}"`,
      });
    }
  };

  const handleTagsChange = (contentId: string, newTags: Tag[]) => {
    // Update tags for the specific content
    const updatedContents = contents.map(content => {
      if (content.id === contentId) {
        return { ...content, tags: newTags };
      }
      return content;
    });
    
    setContents(updatedContents);
    
    // Update search results
    const updatedResults = searchResults.map(result => {
      if (result.content.id === contentId) {
        return { ...result, content: { ...result.content, tags: newTags } };
      }
      return result;
    });
    
    setSearchResults(updatedResults);
    
    // In a real app, save to database
    console.log(`Updated tags for content ${contentId}:`, newTags);
    
    toast({
      title: 'Tags updated',
      description: 'Your changes have been saved',
    });
  };

  const handleLogout = () => {
    // In a real app, this would call Supabase auth.signOut()
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Content</h1>
          <Button onClick={() => navigate('/save')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Save New
          </Button>
        </div>
        
        <div className="mb-8">
          <SemanticSearchBar onSearch={handleSearch} />
        </div>

        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-2">
              {isSemanticSearch ? 'Results for: ' : 'Search results for: '}
              <span className="text-primary">"{searchQuery}"</span>
            </h2>
            <p className="text-muted-foreground">
              Found {searchResults.length} {searchResults.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        )}
        
        <div className="space-y-6">
          {searchResults.map(result => (
            <div key={result.content.id} className="space-y-2">
              <ContentList 
                contents={[result.content]} 
                searchQuery={searchQuery} 
              />
              <div className="pl-4 pr-4 pb-4">
                <TagEditor 
                  tags={result.content.tags}
                  onTagsChange={(newTags) => handleTagsChange(result.content.id, newTags)}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
