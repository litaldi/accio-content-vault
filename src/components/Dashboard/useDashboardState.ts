
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEnhancedToast } from '@/components/feedback/ToastEnhancer';
import { SavedContent } from '@/types';

// Mock data for demonstration
const mockContent: SavedContent[] = [];

export const useDashboardState = () => {
  const navigate = useNavigate();
  const { showSuccess, showInfo } = useEnhancedToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Mock authentication check
  const isLoggedIn = true;
  const userName = "Alex"; // This would come from auth context

  // Mock query for content
  const { data: content = mockContent, isLoading } = useQuery({
    queryKey: ['saved-content'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockContent;
    },
  });

  // Check if this is user's first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedDashboard');
    if (!hasVisited && content.length === 0) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisitedDashboard', 'true');
      showInfo(
        "Welcome to your dashboard! 🎉", 
        "This is where all your saved content will appear. Start by adding your first piece of content."
      );
    } else {
      setIsFirstVisit(false);
    }
  }, [content.length, showInfo]);

  const handleAddContent = useCallback(() => {
    navigate('/save');
    showSuccess(
      "Let's add some content!",
      "You'll be redirected to the save page where you can add URLs or upload files."
    );
  }, [navigate, showSuccess]);

  const handleLogout = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterToggle = useCallback((filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveFilters([]);
  }, []);

  const handleViewContent = useCallback((content: SavedContent) => {
    console.log('Viewing content:', content);
  }, []);

  const handleViewAllActivity = useCallback(() => {
    console.log('View all activity');
  }, []);

  // Apply filters to content
  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || item.tags?.some(tag => 
      tag.name.toLowerCase() === selectedTab.toLowerCase()
    );
    
    // Apply quick filters
    let matchesFilters = true;
    if (activeFilters.includes('recent')) {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      matchesFilters = matchesFilters && new Date(item.created_at) > threeDaysAgo;
    }
    if (activeFilters.includes('this-week')) {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesFilters = matchesFilters && new Date(item.created_at) > weekAgo;
    }
    
    return matchesSearch && matchesTab && matchesFilters;
  });

  const recentActivity = content.filter(item => {
    const itemDate = new Date(item.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return itemDate > weekAgo;
  });

  // Calculate tag stats for DashboardStats
  const tagStats = {
    confirmed: content.reduce((count, item) => 
      count + item.tags.filter(tag => tag.confirmed === true).length, 0),
    rejected: content.reduce((count, item) => 
      count + item.tags.filter(tag => tag.confirmed === false).length, 0)
  };

  return {
    // State
    content,
    filteredContent,
    recentActivity,
    searchQuery,
    selectedTab,
    activeFilters,
    isFirstVisit,
    isLoading,
    isLoggedIn,
    userName,
    tagStats,
    
    // Handlers
    handleAddContent,
    handleLogout,
    handleSearch,
    handleFilterToggle,
    handleClearFilters,
    handleViewContent,
    handleViewAllActivity,
    setSearchQuery,
    setSelectedTab,
  };
};
