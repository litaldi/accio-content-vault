import { useState, useEffect, useMemo } from 'react';
import { SavedContent, Tag } from '@/types';

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

const tags: Tag[] = [
  { id: '1', name: 'analytics', auto_generated: true, confirmed: true, created_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'dashboard', auto_generated: true, confirmed: true, created_at: '2024-01-02T00:00:00Z' },
  { id: '3', name: 'engagement', auto_generated: false, confirmed: true, created_at: '2024-01-03T00:00:00Z' },
];

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
            user_id: 'user-1',
            title: 'React Performance Best Practices',
            description: 'Learn about React performance optimization techniques...',
            url: 'https://react.dev/learn/render-and-commit',
            content_type: 'article',
            created_at: new Date().toISOString(),
            tags: [
              { id: 'tag-1', name: 'react', auto_generated: true, confirmed: true },
              { id: 'tag-2', name: 'performance', auto_generated: true, confirmed: true },
              { id: 'tag-3', name: 'frontend', auto_generated: false, confirmed: true }
            ],
            has_summary: false,
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
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.name.toLowerCase().includes(query))
      );
    }

    // Tab filter
    if (state.selectedTab !== 'all') {
      filtered = filtered.filter(item => {
        switch (state.selectedTab) {
          case 'articles':
            return item.content_type === 'article';
          case 'videos':
            return item.content_type === 'video';
          case 'notes':
            return item.content_type === 'note';
          case 'recent':
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(item.created_at) > weekAgo;
          default:
            return true;
        }
      });
    }

    // Active filters
    if (state.activeFilters.length > 0) {
      filtered = filtered.filter(item =>
        state.activeFilters.some(filter =>
          item.tags.some(tag => tag.name === filter) || item.content_type === filter
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
      confirmed: state.content.filter(item => item.tags.some(tag => tag.confirmed === true)).length,
      rejected: state.content.filter(item => item.tags.some(tag => tag.confirmed === false)).length,
    },
  };
};
