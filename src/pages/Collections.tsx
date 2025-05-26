
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';
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
  MoreHorizontal
} from 'lucide-react';

const Collections = () => {
  // Sample collections data
  const collections = [
    {
      id: 1,
      name: "Research Papers",
      description: "Academic papers and research materials for my thesis",
      itemCount: 24,
      lastUpdated: "2 hours ago",
      starred: true,
      color: "blue"
    },
    {
      id: 2,
      name: "Design Inspiration",
      description: "UI/UX designs, color palettes, and creative references",
      itemCount: 18,
      lastUpdated: "1 day ago",
      starred: false,
      color: "purple"
    },
    {
      id: 3,
      name: "Code Snippets",
      description: "Useful code examples and programming resources",
      itemCount: 32,
      lastUpdated: "3 days ago",
      starred: true,
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Collections - Accio Knowledge Engine</title>
        <meta name="description" content="Organize your saved content into smart collections for easy access and management." />
      </Helmet>

      <Navigation />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Collections</h1>
                <p className="text-muted-foreground">
                  Organize your knowledge into smart collections
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Collection
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <Card key={collection.id} className="hover:shadow-md transition-shadow group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-${collection.color}-500/10 flex items-center justify-center`}>
                          <FolderOpen className={`h-5 w-5 text-${collection.color}-500`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {collection.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
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
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {collection.lastUpdated}
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Share className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Create New Collection Card */}
              <Card className="hover:shadow-md transition-shadow border-dashed hover:border-primary/50">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg mb-2">Create New Collection</CardTitle>
                  <CardDescription className="mb-4">
                    Start organizing your content into themed collections
                  </CardDescription>
                  <Button>Get Started</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
