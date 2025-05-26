
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CleanNavigation from '@/components/navigation/CleanNavigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Star,
  Clock,
  MoreHorizontal,
  Brain,
  TrendingUp
} from 'lucide-react';

const Collections = () => {
  const collections = [
    {
      id: 1,
      name: "AI & Future Tech",
      description: "Cutting-edge research and breakthrough discoveries in artificial intelligence",
      itemCount: 47,
      lastUpdated: "2 hours ago",
      starred: true,
      growth: "+12 this week"
    },
    {
      id: 2,
      name: "Design Mastery",
      description: "Inspiring UI/UX designs, creative patterns, and visual excellence",
      itemCount: 33,
      lastUpdated: "1 day ago",
      starred: false,
      growth: "+8 this week"
    },
    {
      id: 3,
      name: "Developer's Toolkit",
      description: "Code snippets, programming wisdom, and development best practices",
      itemCount: 89,
      lastUpdated: "3 hours ago",
      starred: true,
      growth: "+15 this week"
    },
    {
      id: 4,
      name: "Business Strategy",
      description: "Strategic insights, market analysis, and growth frameworks",
      itemCount: 24,
      lastUpdated: "5 hours ago",
      starred: false,
      growth: "+6 this week"
    }
  ];

  const totalItems = collections.reduce((sum, col) => sum + col.itemCount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Collections - Accio</title>
        <meta name="description" content="Browse and manage your organized knowledge collections. Smart AI-powered content organization." />
      </Helmet>

      <CleanNavigation />

      <main className="flex-grow">
        {/* Header */}
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <Brain className="h-8 w-8 text-primary" />
                  My Collections
                </h1>
                <p className="text-muted-foreground text-lg mb-3">
                  Your brilliantly organized knowledge libraries
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="secondary">
                    {collections.length} Collections
                  </Badge>
                  <span className="text-muted-foreground">
                    {totalItems} Total Items
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search Collections
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Collection
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-8">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <Card key={collection.id} className="hover:shadow-md transition-shadow group cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FolderOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                            {collection.name}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {collection.itemCount} items
                            </Badge>
                            {collection.starred && (
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 line-clamp-2">
                      {collection.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {collection.lastUpdated}
                      </div>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {collection.growth}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Create New Collection Card */}
              <Card className="hover:shadow-md transition-shadow border-2 border-dashed border-primary/30 hover:border-primary/60 cursor-pointer group">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">New Collection</CardTitle>
                  <CardDescription className="mb-4">
                    Start organizing your discoveries into a themed collection
                  </CardDescription>
                  <Button variant="outline">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-8 bg-muted/30">
          <div className="container">
            <Card className="border-0 bg-primary/5">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Organization</h3>
                <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                  Our AI automatically suggests related content and helps organize your collections. 
                  The more you save, the smarter your organization becomes.
                </p>
                <Button variant="outline">
                  Learn More
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
