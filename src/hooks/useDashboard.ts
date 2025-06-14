
import { useState, useEffect, useMemo } from 'react';
import { SavedContent } from '@/types';

interface DashboardFilters {
  searchQuery: string;
  selectedTab: string;
  activeFilters: string[];
}

interface DashboardState extends DashboardFilters {
  content: SavedContent[];
  filteredContent: SavedContent[];
  recentActivity: SavedContent[];
  isLoading: boolean;
  error: string | null;
}

const initialFilters: DashboardFilters = {
  searchQuery: '',
  selectedTab: 'all',
  activeFilters: [],
};

export const useDashboard = () => {
  const [state, setState] = useState<DashboardState>({
    ...initialFilters,
    content: [],
    filteredContent: [],
    recentActivity: [],
    isLoading: true,
    error: null,
  });

  // Mock data loading - replace with actual API calls
  useEffect(() => {
    const loadContent = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockContent: SavedContent[] = [
          {
            id: '1',
            title: 'React Performance Best Practices',
            url: 'https://react.dev/learn/render-and-commit',
            content: 'Learn about React performance optimization techniques...',
            tags: ['react', 'performance', 'frontend'],
            savedAt: new Date().toISOString(),
            type: 'article',
            favicon: '',
            wordCount: 1200,
          },
        ];

        setState(prev => ({
          ...prev,
          content: mockContent,
          recentActivity: mockContent.slice(0, 3),
          isLoading: false,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Failed to load content',
          isLoading: false,
        }));
      }
    };

    loadContent();
  }, []);

  // Filter content based on current filters
  const filteredContent = useMemo(() => {
    let filtered = [...state.content];

    // Search filter
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Tab filter
    if (state.selectedTab !== 'all') {
      filtered = filtered.filter(item => {
        switch (state.selectedTab) {
          case 'articles':
            return item.type === 'article';
          case 'videos':
            return item.type === 'video';
          case 'notes':
            return item.type === 'note';
          case 'recent':
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(item.savedAt) > weekAgo;
          default:
            return true;
        }
      });
    }

    // Active filters
    if (state.activeFilters.length > 0) {
      filtered = filtered.filter(item =>
        state.activeFilters.some(filter =>
          item.tags.includes(filter) || item.type === filter
        )
      );
    }

    return filtered;
  }, [state.content, state.searchQuery, state.selectedTab, state.activeFilters]);

  // Update state with computed filtered content
  useEffect(() => {
    setState(prev => ({ ...prev, filteredContent }));
  }, [filteredContent]);

  const actions = {
    setSearchQuery: (query: string) =>
      setState(prev => ({ ...prev, searchQuery: query })),
    
    setSelectedTab: (tab: string) =>
      setState(prev => ({ ...prev, selectedTab: tab })),
    
    toggleFilter: (filterId: string) =>
      setState(prev => ({
        ...prev,
        activeFilters: prev.activeFilters.includes(filterId)
          ? prev.activeFilters.filter(id => id !== filterId)
          : [...prev.activeFilters, filterId],
      })),
    
    clearFilters: () =>
      setState(prev => ({ ...prev, activeFilters: [] })),
    
    handleSearch: (query: string) => {
      setState(prev => ({ ...prev, searchQuery: query }));
    },
  };

  return {
    ...state,
    actions,
    tagStats: {
      confirmed: state.content.filter(item => item.tags.length > 0).length,
      rejected: 0,
    },
  };
};
