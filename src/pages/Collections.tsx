
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ModernNavigation from '@/components/navigation/ModernNavigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Filter,
  Star,
  Clock,
  Share,
  MoreHorizontal,
  Sparkles,
  Brain,
  TrendingUp
} from 'lucide-react';

const Collections = () => {
  const collections = [
    {
      id: 1,
      name: "AI & Future Tech Insights",
      description: "Cutting-edge research and breakthrough discoveries in artificial intelligence",
      itemCount: 47,
      lastUpdated: "2 hours ago",
      starred: true,
      growth: "+12 this week"
    },
    {
      id: 2,
      name: "Design Mastery Collection",
      description: "Inspiring UI/UX designs, creative patterns, and visual excellence",
      itemCount: 33,
      lastUpdated: "1 day ago",
      starred: false,
      growth: "+8 this week"
    },
    {
      id: 3,
      name: "Developer's Goldmine",
      description: "Code snippets, programming wisdom, and development best practices",
      itemCount: 89,
      lastUpdated: "3 hours ago",
      starred: true,
      growth: "+15 this week"
    },
    {
      id: 4,
      name: "Business Strategy Vault",
      description: "Strategic insights, market analysis, and growth frameworks",
      itemCount: 24,
      lastUpdated: "5 hours ago",
      starred: false,
      growth: "+6 this week"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Collections - Organized Knowledge Brilliance | Accio</title>
        <meta name="description" content="Your smart collections of organized knowledge. Browse, manage, and discover insights from your AI-organized content libraries." />
        <link rel="canonical" href="/collections" />
      </Helmet>

      <ModernNavigation />

      <main>
        {/* Header Section */}
        <section className="content-spacing gradient-subtle">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="animate-fade-in-up">
              <h1 className="text-title element-spacing-sm flex items-center gap-3">
                <Brain className="h-10 w-10 text-primary" />
                My Knowledge Collections
              </h1>
              <p className="text-body-large text-muted-foreground element-spacing-sm">
                Your brilliantly organized content libraries, perfected by AI
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                <Badge className="badge-modern badge-primary w-fit">
                  {collections.length} Active Collections
                </Badge>
                <span className="text-caption">
                  {collections.reduce((sum, col) => sum + col.itemCount, 0)} Total Items
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button variant="outline" className="btn-secondary">
                <Search className="h-4 w-4 mr-2" />
                Search Collections
              </Button>
              <Button variant="outline" className="btn-secondary">
                <Filter className="h-4 w-4 mr-2" />
                Smart Filters
              </Button>
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Create Collection
              </Button>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="container mx-auto px-6 max-w-7xl pb-12">
          <div className="layout-grid layout-grid-3 animate-stagger">
            {collections.map((collection) => (
              <Card key={collection.id} className="card-modern card-interactive">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FolderOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-subtitle mb-2">
                          {collection.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="badge-modern text-xs">
                            {collection.itemCount} items
                          </Badge>
                          {collection.starred && (
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <Badge className="badge-modern badge-success text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {collection.growth}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-body">
                    {collection.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Updated {collection.lastUpdated}
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                      <Share className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Create New Collection Card */}
            <Card className="card-modern card-interactive border-dashed border-primary/30 hover:border-primary/60 gradient-primary">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-subtitle mb-3">Start New Collection</CardTitle>
                <CardDescription className="mb-6 text-center">
                  Organize your discoveries into a new themed collection and watch your knowledge grow
                </CardDescription>
                <Button className="btn-primary">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Begin Organizing
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
