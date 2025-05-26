
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  demoSavedItems, 
  demoCollections, 
  demoAnalytics, 
  isDemoUser,
  type SavedItem,
  type Collection,
  type AnalyticsData
} from '@/data/demoData';

export const useDemoData = () => {
  const { user } = useAuth();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDemoData = async () => {
      setIsLoading(true);
      
      // Simulate loading delay for realism
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (user?.email && isDemoUser(user.email)) {
        setSavedItems(demoSavedItems);
        setCollections(demoCollections);
        setAnalytics(demoAnalytics);
      } else {
        // For non-demo users, start with empty data
        setSavedItems([]);
        setCollections([]);
        setAnalytics({
          totalItems: 0,
          itemsThisWeek: 0,
          itemsThisMonth: 0,
          readingTime: '0h',
          topTags: [],
          activityData: [],
          categoryBreakdown: []
        });
      }
      
      setIsLoading(false);
    };

    loadDemoData();
  }, [user]);

  const addSavedItem = (item: Omit<SavedItem, 'id' | 'savedDate'>) => {
    const newItem: SavedItem = {
      ...item,
      id: Date.now().toString(),
      savedDate: new Date().toISOString().split('T')[0],
    };
    setSavedItems(prev => [newItem, ...prev]);
  };

  const removeSavedItem = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setSavedItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const updateReadStatus = (id: string, status: SavedItem['readStatus']) => {
    setSavedItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, readStatus: status } : item
      )
    );
  };

  return {
    savedItems,
    collections,
    analytics,
    isLoading,
    isDemoUser: user?.email ? isDemoUser(user.email) : false,
    addSavedItem,
    removeSavedItem,
    toggleFavorite,
    updateReadStatus
  };
};
