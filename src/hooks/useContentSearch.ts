
import { useState } from 'react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  url?: string;
  created_at: string;
  tags: Array<{ id: string; name: string; }>;
}

interface SearchResult {
  content: ContentItem;
  score: number;
}

export const useContentSearch = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([
    {
      content: {
        id: '1',
        title: 'Introduction to React',
        description: 'Learn the basics of React development',
        url: 'https://react.dev',
        created_at: new Date().toISOString(),
        tags: [{ id: '1', name: 'react' }, { id: '2', name: 'javascript' }]
      },
      score: 0.9
    },
    {
      content: {
        id: '2',
        title: 'Advanced TypeScript Patterns',
        description: 'Explore advanced TypeScript patterns and techniques',
        created_at: new Date().toISOString(),
        tags: [{ id: '3', name: 'typescript' }, { id: '4', name: 'patterns' }]
      },
      score: 0.8
    }
  ]);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // In a real app, this would make an API call
  };

  return {
    searchResults,
    handleSearch,
  };
};
