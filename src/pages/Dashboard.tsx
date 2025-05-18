
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import ContentList from '@/components/ContentList';
import { SavedContent, Tag } from '@/types';
import { useNavigate } from 'react-router-dom';

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
  }
];

const Dashboard = () => {
  const [contents, setContents] = useState<SavedContent[]>(mockContents);
  const [filteredContents, setFilteredContents] = useState<SavedContent[]>(mockContents);
  const [searchQuery, setSearchQuery] = useState('');
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
        setFilteredContents(mockContents);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Simple search implementation (case insensitive)
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
    
    setFilteredContents(filtered);
    
    // In a real app, we would track searches for analytics
    console.log(`Search performed: ${query}`);
    
    if (filtered.length === 0) {
      toast({
        title: 'No results found',
        description: `No content matches "${query}"`,
      });
    } else {
      // Track search counts per tag (for analytics)
      const matchedTags = contents.flatMap(content => 
        content.tags.filter(tag => 
          tag.name.toLowerCase().includes(lowercaseQuery)
        )
      );
      
      if (matchedTags.length > 0) {
        console.log('Tags matched in search:', matchedTags.map(t => t.name));
      }
    }
  };

  const handleLogout = () => {
    // In a real app, this would call Supabase auth.signOut()
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">My Content</h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-2">
              Search results for: <span className="text-primary">"{searchQuery}"</span>
            </h2>
            <p className="text-muted-foreground">
              Found {filteredContents.length} {filteredContents.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        )}
        
        <ContentList contents={filteredContents} searchQuery={searchQuery} />
      </main>
    </div>
  );
};

export default Dashboard;
