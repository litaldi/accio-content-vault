
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibilityAnnouncer } from '@/components/accessibility/AccessibilityAnnouncer';
import SmartSearch from '@/components/search/SmartSearch';
import ContentRecommendations from '@/components/recommendations/ContentRecommendations';
import OfflineSync from '@/components/offline/OfflineSync';
import ReadingAnalytics from '@/components/analytics/ReadingAnalytics';
import ReadingMode from '@/components/reading/ReadingMode';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { announceNavigation } = useAccessibilityAnnouncer();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showReadingMode, setShowReadingMode] = useState(false);

  useEffect(() => {
    announceNavigation('Dashboard');
  }, [announceNavigation]);

  const handleSearch = (query: string, filters: any) => {
    console.log('Searching for:', query, 'with filters:', filters);
    // In real app, this would call your search API
  };

  const mockContent = {
    id: '1',
    title: 'Advanced React Patterns for Scalable Applications',
    content: `
      <h1>Advanced React Patterns for Scalable Applications</h1>
      <p>React has evolved significantly since its inception, and with it, the patterns and practices that help us build maintainable, scalable applications. In this comprehensive guide, we'll explore advanced React patterns that can help you architect better applications.</p>
      
      <h2>1. Compound Components Pattern</h2>
      <p>The compound components pattern allows you to create flexible and reusable components that work together seamlessly. This pattern is particularly useful when building component libraries or complex UI elements.</p>
      
      <h2>2. Render Props Pattern</h2>
      <p>Render props provide a powerful way to share code between React components using a prop whose value is a function. This pattern offers maximum flexibility and composability.</p>
      
      <h2>3. Custom Hooks for State Logic</h2>
      <p>Custom hooks allow you to extract component logic into reusable functions. They're perfect for sharing stateful logic between components while keeping your code DRY.</p>
      
      <h2>4. Context with Reducers</h2>
      <p>Combining React Context with useReducer provides a powerful pattern for managing complex state that needs to be shared across multiple components.</p>
      
      <h2>Best Practices and Performance Considerations</h2>
      <p>When implementing these patterns, it's important to consider performance implications and follow React best practices to ensure your applications remain fast and responsive.</p>
    `,
    tags: ['React', 'JavaScript', 'Architecture'],
    estimatedReadTime: 12,
    url: 'https://example.com/article'
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Accio</title>
        <meta name="description" content="Your personalized knowledge dashboard with AI-powered insights and recommendations." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {user?.user_metadata?.name || 'there'}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Your knowledge awaits. What would you like to explore today?
              </p>
            </div>
            <Button size="lg" className="gap-2" asChild>
              <Link to="/save">
                <Plus className="h-4 w-4" />
                Add Content
              </Link>
            </Button>
          </div>

          {/* Smart Search */}
          <div className="mb-8">
            <SmartSearch onSearch={handleSearch} />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Reading Analytics */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Your Reading Journey</h2>
                <ReadingAnalytics />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-24 flex-col gap-2" asChild>
                  <Link to="/save">
                    <Plus className="h-6 w-6" />
                    <span>Save Content</span>
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex-col gap-2"
                  onClick={() => setShowReadingMode(true)}
                >
                  <span>📖</span>
                  <span>Reading Mode</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2" asChild>
                  <Link to="/collections">
                    <span>📚</span>
                    <span>Collections</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2" asChild>
                  <Link to="/search">
                    <span>🔍</span>
                    <span>Advanced Search</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <ContentRecommendations />
              <OfflineSync />
            </div>
          </div>
        </div>

        {/* Reading Mode */}
        <ReadingMode
          isOpen={showReadingMode}
          onClose={() => setShowReadingMode(false)}
          content={mockContent}
        />
      </div>
    </>
  );
};

export default Dashboard;
