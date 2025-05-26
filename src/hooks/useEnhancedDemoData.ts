
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  enhancedDemoSavedItems, 
  enhancedDemoCollections, 
  enhancedDemoAnalytics, 
  isEnhancedDemoUser,
  demoUploadedFiles,
  type SavedItem,
  type Collection,
  type AnalyticsData
} from '@/data/enhancedDemoData';

export const useEnhancedDemoData = () => {
  const { user } = useAuth();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEnhancedDemoData = async () => {
      setIsLoading(true);
      
      // Simulate realistic loading delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (user?.email && isEnhancedDemoUser(user.email)) {
        setSavedItems(enhancedDemoSavedItems);
        setCollections(enhancedDemoCollections);
        setAnalytics(enhancedDemoAnalytics);
        setUploadedFiles(demoUploadedFiles);
      } else {
        // For non-demo users, start with empty data
        setSavedItems([]);
        setCollections([]);
        setUploadedFiles([]);
        setAnalytics({
          totalItems: 0,
          itemsThisWeek: 0,
          itemsThisMonth: 0,
          readingTime: '0h',
          readingStreak: 0,
          favoriteTopics: [],
          topTags: [],
          activityData: [],
          categoryBreakdown: [],
          weeklyProgress: []
        });
      }
      
      setIsLoading(false);
    };

    loadEnhancedDemoData();
  }, [user]);

  const addSavedItem = (item: Omit<SavedItem, 'id' | 'savedDate'>) => {
    const newItem: SavedItem = {
      ...item,
      id: Date.now().toString(),
      savedDate: new Date().toISOString().split('T')[0],
    };
    setSavedItems(prev => [newItem, ...prev]);
    
    // Update analytics
    if (analytics) {
      setAnalytics(prev => prev ? {
        ...prev,
        totalItems: prev.totalItems + 1,
        itemsThisWeek: prev.itemsThisWeek + 1,
        itemsThisMonth: prev.itemsThisMonth + 1
      } : null);
    }
  };

  const removeSavedItem = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
    
    // Update analytics
    if (analytics) {
      setAnalytics(prev => prev ? {
        ...prev,
        totalItems: Math.max(0, prev.totalItems - 1)
      } : null);
    }
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

  const addCollection = (collection: Omit<Collection, 'id' | 'createdDate' | 'lastAccessed'>) => {
    const newCollection: Collection = {
      ...collection,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
      lastAccessed: new Date().toISOString().split('T')[0],
    };
    setCollections(prev => [newCollection, ...prev]);
  };

  const removeCollection = (id: string) => {
    setCollections(prev => prev.filter(collection => collection.id !== id));
    // Remove collection reference from saved items
    setSavedItems(prev => 
      prev.map(item => 
        item.collection === collections.find(c => c.id === id)?.name
          ? { ...item, collection: undefined }
          : item
      )
    );
  };

  return {
    savedItems,
    collections,
    analytics,
    uploadedFiles,
    isLoading,
    isDemoUser: user?.email ? isEnhancedDemoUser(user.email) : false,
    addSavedItem,
    removeSavedItem,
    toggleFavorite,
    updateReadStatus,
    addCollection,
    removeCollection
  };
};
