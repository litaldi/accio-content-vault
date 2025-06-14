
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { SearchExperience } from '@/components/search/SearchExperience';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Shield, Brain } from 'lucide-react';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

// Enhanced Home Component
const EnhancedHome = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <Spacing.Section size="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 -z-10" />
        <Spacing.Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="outline" className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Knowledge Engine
              </Badge>
            </div>
            
            <Typography.H1 className="mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">
              Your AI-Powered Content Vault
            </Typography.H1>
            
            <Typography.Lead className="mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform scattered information into organized intelligence. Save, search, and rediscover 
              everything that matters with the power of AI.
            </Typography.Lead>

            {/* Enhanced Search Experience */}
            <SearchExperience
              variant="hero"
              onSearch={handleSearch}
              showTips={true}
              className="mb-16"
            />
          </div>
        </Spacing.Container>
      </Spacing.Section>

      {/* Features Section */}
      <Spacing.Section size="lg" className="bg-muted/30">
        <Spacing.Container>
          <div className="text-center mb-16">
            <Typography.H2 className="mb-4">Intelligent Knowledge Management</Typography.H2>
            <Typography.Lead>
              Powered by advanced AI to understand, organize, and surface your content
            </Typography.Lead>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/60">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <Typography.H4 className="mb-3">Smart Search</Typography.H4>
                <Typography.Body size="sm" className="text-muted-foreground leading-relaxed">
                  Natural language queries, semantic understanding, and intelligent suggestions 
                  help you find exactly what you need.
                </Typography.Body>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/60">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <Typography.H4 className="mb-3">Instant Organization</Typography.H4>
                <Typography.Body size="sm" className="text-muted-foreground leading-relaxed">
                  AI automatically categorizes and tags your content, creating a perfectly 
                  organized knowledge base without the manual work.
                </Typography.Body>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/60">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <Typography.H4 className="mb-3">Privacy First</Typography.H4>
                <Typography.Body size="sm" className="text-muted-foreground leading-relaxed">
                  Your data stays yours. Built with privacy by design and enterprise-grade 
                  security to protect your valuable information.
                </Typography.Body>
              </CardContent>
            </Card>
          </div>
        </Spacing.Container>
      </Spacing.Section>

      {/* Search Demo Section */}
      <Spacing.Section size="lg">
        <Spacing.Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Typography.H2 className="mb-4">Try It Yourself</Typography.H2>
              <Typography.Lead>
                Experience the power of AI-driven search and content discovery
              </Typography.Lead>
            </div>

            <SearchExperience
              variant="dashboard"
              onSearch={handleSearch}
              showTips={true}
              className="bg-background/60 backdrop-blur-sm border border-border/60 rounded-2xl p-8 shadow-lg"
            />
          </div>
        </Spacing.Container>
      </Spacing.Section>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AccessibilityProvider>
            <Router>
              <AppLayout>
                <div className="min-h-screen">
                  <Routes>
                    <Route path="/" element={<EnhancedHome />} />
                    {/* Add other routes here */}
                  </Routes>
                </div>
              </AppLayout>
              <Toaster />
            </Router>
          </AccessibilityProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
