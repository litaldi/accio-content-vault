import React from 'react';
import { Helmet } from 'react-helmet-async';
import ResponsiveNavigation from '@/components/navigation/ResponsiveNavigation';
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
      color: "purple",
      growth: "+12 this week"
    },
    {
      id: 2,
      name: "Design Mastery Collection",
      description: "Inspiring UI/UX designs, creative patterns, and visual excellence",
      itemCount: 33,
      lastUpdated: "1 day ago",
      starred: false,
      color: "pink",
      growth: "+8 this week"
    },
    {
      id: 3,
      name: "Developer's Goldmine",
      description: "Code snippets, programming wisdom, and development best practices",
      itemCount: 89,
      lastUpdated: "3 hours ago",
      starred: true,
      color: "green",
      growth: "+15 this week"
    },
    {
      id: 4,
      name: "Business Strategy Vault",
      description: "Strategic insights, market analysis, and growth frameworks",
      itemCount: 24,
      lastUpdated: "5 hours ago",
      starred: false,
      color: "blue",
      growth: "+6 this week"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>My Collections - Organized Knowledge Brilliance | Accio</title>
        <meta name="description" content="Your smart collections of organized knowledge. Browse, manage, and discover insights from your AI-organized content libraries." />
        <link rel="canonical" href="/collections" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Helmet>

      <ResponsiveNavigation />

      <main className="flex-grow">
        {/* Enhanced Header Section - Responsive */}
        <section className="py-8 sm:py-12 border-b bg-gradient-to-r from-purple/5 via-blue-50 to-primary/5 dark:from-purple-950/20 dark:via-blue-950/30 dark:to-primary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 flex items-center gap-3">
                  <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  <span className="leading-tight">My Knowledge Collections</span>
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg mb-3 sm:mb-4">
                  Your brilliantly organized content libraries, perfected by AI
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 w-fit">
                    {collections.length} Active Collections
                  </Badge>
                  <span className="text-muted-foreground">
                    {collections.reduce((sum, col) => sum + col.itemCount, 0)} Total Items
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="lg" className="flex items-center gap-2 hover:bg-accent/80">
                  <Search className="h-4 w-4" />
                  Search Collections
                </Button>
                <Button variant="outline" size="lg" className="flex items-center gap-2 hover:bg-accent/80">
                  <Filter className="h-4 w-4" />
                  Smart Filters
                </Button>
                <Button size="lg" className="flex items-center gap-2 shadow-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  <Plus className="h-4 w-4" />
                  Create Collection
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Grid - Responsive */}
        <section className="py-8 sm:py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {collections.map((collection) => (
                <Card key={collection.id} className="hover:shadow-xl transition-all group border-0 bg-gradient-to-br from-background to-accent/10 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-12 h-12 rounded-xl bg-${collection.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <FolderOpen className={`h-6 w-6 text-${collection.color}-500`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors mb-1">
                            {collection.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs font-medium">
                              {collection.itemCount} brilliant items
                            </Badge>
                            {collection.starred && (
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {collection.growth}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent/80">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 line-clamp-2 text-sm leading-relaxed">
                      {collection.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Updated {collection.lastUpdated}
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:text-primary">
                        <Share className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Enhanced Create New Collection Card */}
              <Card className="hover:shadow-xl transition-all border-2 border-dashed border-primary/30 hover:border-primary/60 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/30 cursor-pointer group">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Plus className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-3">Start New Collection</CardTitle>
                  <CardDescription className="mb-6 text-center leading-relaxed">
                    Organize your discoveries into a new themed collection and watch your knowledge grow
                  </CardDescription>
                  <Button className="gap-2 shadow-lg">
                    <Sparkles className="h-4 w-4" />
                    Begin Organizing
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tips Section - Responsive */}
        <section className="py-8 sm:py-10 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/30">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pro Tip: Smart Collections</h3>
                <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                  Let our AI suggest related content for your collections. The more you save, the smarter your organization becomes!
                </p>
                <Button variant="outline" className="hover:bg-primary/10">
                  Learn About Smart Features
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
